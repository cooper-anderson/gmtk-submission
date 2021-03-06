import {Vector} from "./vector.js"

export function range(start, end) {
	return [...Array(end - start).keys()].map(x => x + start)
}

export function clamp(value, minimum, maximum) {
	return Math.min(Math.max(value, minimum), maximum)
}

export const standardKeys = [8, 9, 13, 27, 32]
	.concat(range(37, 41))
	.concat(range(48, 58))
	.concat(range(65, 91))
	.concat(range(186, 193))
	.concat(range(219, 223))

let i = 0

export const Direction = {
	LEFT: i++,
	RIGHT: i++,
	UP: i++,
	DOWN: i++,
	inverse(direction) {
		if (direction === this.LEFT) return this.RIGHT
		if (direction === this.RIGHT) return this.LEFT
		if (direction === this.UP) return this.DOWN
		if (direction === this.DOWN) return this.UP
	},
	leftOf(direction) {
		if (direction === this.LEFT) return this.DOWN
		if (direction === this.RIGHT) return this.UP
		if (direction === this.UP) return this.LEFT
		if (direction === this.DOWN) return this.RIGHT
	},
	rightOf(direction) {
		if (direction === this.LEFT) return this.UP
		if (direction === this.RIGHT) return this.DOWN
		if (direction === this.UP) return this.RIGHT
		if (direction === this.DOWN) return this.LEFT
	},
	toVector(direction) {
		if (direction === this.LEFT) return new Vector(-1, 0)
		if (direction === this.RIGHT) return new Vector(1, 0)
		if (direction === this.UP) return new Vector(0, -1)
		if (direction === this.DOWN) return new Vector(0, 1)
	},
	toOrientation(direction) {
		if ([this.LEFT, this.RIGHT].includes(direction)) return Orientation.VERTICAL
		if ([this.UP, this.DOWN].includes(direction)) return Orientation.HORIZONTAL
	},
	toAngle(direction) {
		if (direction === this.LEFT) return 270
		if (direction === this.RIGHT) return 90
		if (direction === this.UP) return 0
		if (direction === this.DOWN) return 180
	},
	toString(direction) {
		if (direction === this.LEFT) return "LEFT"
		if (direction === this.RIGHT) return "RIGHT"
		if (direction === this.UP) return "UP"
		if (direction === this.DOWN) return "DOWN"
	},
	wallCoordinates(position, direction) {
		return new Vector(position.x + (direction === Direction.RIGHT ? 1 : 0), position.y + (direction === Direction.DOWN ? 1 : 0))
	},
	all() {
		return [this.LEFT, this.RIGHT, this.UP, this.DOWN]
	},
	random() {
		return this.all()[Math.floor(Math.random() * 4)]
	}
}

export const Orientation = {
	HORIZONTAL: i++,
	VERTICAL: i++,
	flip(orientation) {
		if (orientation === this.HORIZONTAL) return this.VERTICAL
		if (orientation === this.VERTICAL) return this.HORIZONTAL
	},
	all() {
		return [this.HORIZONTAL, this.VERTICAL]
	},
	random() {
		return this.all()[Math.floor(Math.random() * 2)]
	}
}
