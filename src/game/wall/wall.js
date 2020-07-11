import {Entity} from "../entity.js";
import {Orientation} from "../util.js";
import {Game} from "../game.js";

export class Wall extends Entity {
	orientation = Orientation.HORIZONTAL

	start() {
		super.start()
		this.setOrientation(this.orientation)
	}

	update() {
		super.update();
		let x = 0, y = 0
		if (this.orientation === Orientation.HORIZONTAL) y = 0.5
		if (this.orientation === Orientation.VERTICAL) x = 0.5

		this.sprite.x = (this.position.x + x) * 64
		this.sprite.y = (this.position.y + y) * 64
	}

	setOrientation(orientation) {
		this.orientation = orientation
		// this.sprite.setTexture(Game.resources[this.getLocalRegistryName()])
		// this.sprite.setTexture(PIXI.Texture.from(this.getLocalRegistryName()))
		this.sprite.texture = Game.resources[this.getLocalRegistryName()].texture
	}

	getLocalRegistryName() {
		if (this.orientation === Orientation.HORIZONTAL) return "wall_horizontal"
		if (this.orientation === Orientation.VERTICAL) return "wall_vertical"
	}

	static getRegistryName() {
		return "wall_horizontal"
	}

	static getResourcePath() {
		return "res/drawable/wall_horizontal.svg"
	}

	static getLoadableObject() {
		return [
			{name: "wall_horizontal", url: "res/drawable/wall_horizontal.svg"},
			{name: "wall_vertical", url: "res/drawable/wall_vertical.svg"}
		]
	}
}
