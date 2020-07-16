import {Hazard} from "./wall/hazard.js"
import {Sequence} from "./sequence.js"
import {Wall} from "./wall/wall.js"

class Event {
	constructor(func, time) {
		this.run = func
		this.time = time
		this.done = false
	}
}

export class Progression {
	sequenceLength = 2
	scanDistance = 2
	sequenceInterval = 5000
	sequenceTiming = 250
	hazardFrequency = 0
	regenerationWanted = false
	events = []

	constructor(game) {
		this.sequence = undefined
		this.index = 0
		this.wave = 0
		this.scoreCount = 0
		this.scoreTotal = 0
		this.game = game
	}

	generateEvents() {
		this.currentInterval = this.sequenceInterval
		this.currentTiming = this.sequenceTiming
		this.generateSequence()
		let progression = this
		this.events.length = 0
		this.events.push(new Event(function() {
			progression.game.display.dimSequence()
		}, this.currentInterval - 200))
		for (let i = 0; i < this.sequence.length; i++) {
			this.events.push(new Event(function () {
				if (i === 0) progression.game.player.startSequence()
				progression.game.display.fadeDirection(i)
				progression.game.player.queueMove(progression.sequence[i], true)
				if (i === progression.sequence.length - 1) progression.game.player.endSequence()
			}, this.currentInterval + this.currentTiming * i))
		}
		this.events.push(new Event(function() {
			progression.resetTimer(progression.currentInterval + progression.currentTiming * progression.sequence.length)
		}, this.currentInterval + this.currentTiming * this.sequence.length))
	}

	start() {
		this.intervalStart = new Date().getTime()
		this.generateEvents()
		this.placeHazards()
	}

	resetTimer(interval) {
		this.intervalStart += interval
		this.generateEvents()
	}

	update() {
		let now = new Date().getTime()
		this.updateTimer(now)
		this.updateTileCount()
		for (let event of this.events) {
			if (now - this.intervalStart >= event.time && !event.done) {
				event.done = true
				event.run()
			}
		}
	}

	updateTimer(now) {
		if (this.game.player.dead) return
		let elapsed = Math.min(now - this.intervalStart, this.currentInterval)
		this.game.display.setTimer((this.currentInterval - elapsed) / 1000, this.currentInterval / 1000)
	}

	updateTileCount() {
		let count = 0
		let total = 0
		this.game.grid.forEachTile(function(tile) {
			total++
			if (tile.activated) count++
		})
		this.game.display.setScore(count, total)
		this.scoreCount = count
		this.scoreTotal = total
		let percent = count / total
		if (count === total) {
			this.game.gameVictory()
		}
		/* if (percent < 0.05) {
			this.sequenceLength = 2
			this.scanDistance = 2
			this.hazardFrequency = 0.25
		} else if (percent < 0.25) {
			this.sequenceLength = 3
			this.scanDistance = 3
			this.hazardFrequency = 0.35
		} else if (percent < 0.5) {
			this.sequenceLength = 4
			this.scanDistance = 4
			this.hazardFrequency = 0.5
		} else {
			this.sequenceLength = 5
			this.scanDistance = 5
			this.hazardFrequency = 0.8
		} */
		// Progression that includes timing changes
		/* if (percent < 0.05) {
			this.sequenceLength = 2
			this.scanDistance = 2
			this.hazardFrequency = 0
			if (this.wave < 0) this.regenerationWanted = true
			this.wave = 0
		} else if (percent < 0.1) {
			this.sequenceInterval = 5000
			this.sequenceLength = 2
			this.scanDistance = 2
			this.hazardFrequency = 0.2
			if (this.wave < 1) this.regenerationWanted = true
			this.wave = 1
		} else if (percent < 0.2) {
			this.sequenceInterval = 5000
			this.sequenceLength = 3
			this.scanDistance = 2
			this.hazardFrequency = 0.25
			if (this.wave < 2) this.regenerationWanted = true
			this.wave = 2
		} else if (percent < 0.3) {
			this.sequenceInterval = 5000
			this.sequenceLength = 3
			this.scanDistance = 3
			this.hazardFrequency = 0.35
			if (this.wave < 3) this.regenerationWanted = true
			this.wave = 3
		} else if (percent < 0.4) {
			this.sequenceInterval = 8000
			this.sequenceLength = 4
			this.scanDistance = 3
			this.hazardFrequency = 0.35
			if (this.wave < 4) this.regenerationWanted = true
			this.wave = 4
		} else if (percent < 0.5) {
			this.sequenceInterval = 5000
			this.sequenceLength = 4
			this.scanDistance = 3
			this.hazardFrequency = 0.35
			if (this.wave < 5) this.regenerationWanted = true
			this.wave = 5
		} else if (percent < 0.6) {
			this.sequenceInterval = 3000
			this.sequenceLength = 3
			this.scanDistance = 3
			this.hazardFrequency = 0.35
			if (this.wave < 6) this.regenerationWanted = true
			this.wave = 6
		} else if (percent < 0.7) {
			this.sequenceInterval = 8000
			this.sequenceLength = 5
			this.scanDistance = 3
			this.hazardFrequency = 0.5
			if (this.wave < 7) this.regenerationWanted = true
			this.wave = 7
		} */
		if (percent < 0.05) {
			this.sequenceLength = 2
			this.scanDistance = 2
			this.hazardFrequency = 0
			if (this.wave < 0) this.regenerationWanted = true
			this.wave = 0
		} else if (percent < 0.12) {
			this.sequenceLength = 2
			this.scanDistance = 2
			this.hazardFrequency = 0.2
			if (this.wave < 1) this.regenerationWanted = true
			this.wave = 1
		} else if (percent < 0.2) {
			this.sequenceLength = 3
			this.scanDistance = 2
			this.hazardFrequency = 0.25
			if (this.wave < 2) this.regenerationWanted = true
			this.wave = 2
		} else if (percent < 0.3) {
			this.sequenceLength = 3
			this.scanDistance = 3
			this.hazardFrequency = 0.35
			if (this.wave < 3) this.regenerationWanted = true
			this.wave = 3
		} else if (percent < 0.4) {
			this.sequenceLength = 4
			this.scanDistance = 2
			this.hazardFrequency = 0.25
			if (this.wave < 4) this.regenerationWanted = true
			this.wave = 4
		} else if (percent < 0.5) {
			this.sequenceLength = 3
			this.scanDistance = 3
			this.hazardFrequency = 0.5
			if (this.wave < 5) this.regenerationWanted = true
			this.wave = 5
		} else if (percent < 0.6) {
			this.sequenceLength = 4
			this.scanDistance = 3
			this.hazardFrequency = 0.4
			if (this.wave < 6) this.regenerationWanted = true
			this.wave = 6
		} else if (percent < 0.7) {
			this.sequenceLength = 5
			this.scanDistance = 2
			this.hazardFrequency = 0.35
			if (this.wave < 7) this.regenerationWanted = true
			this.wave = 7
		} else if (percent < 0.8) {
			this.sequenceLength = 5
			this.scanDistance = 3
			this.hazardFrequency = 0.5
			if (this.wave < 8) this.regenerationWanted = true
			this.wave = 8
		} else if (percent < 0.9) {
			this.sequenceLength = 4
			this.scanDistance = 3
			this.hazardFrequency = 0.75
			if (this.wave < 9) this.regenerationWanted = true
			this.wave = 9
		} else {
			this.sequenceLength = 5
			this.scanDistance = 3
			this.hazardFrequency = 0.75
			if (this.wave < 10) this.regenerationWanted = true
			this.wave = 10
		}
	}

	generateSequence() {
		if (this.game.player.dead) return
		if (this.regenerationWanted) {
			this.placeHazards()
			this.regenerationWanted = false
		}
		this.sequence = Sequence.generate(this.game.grid, this.game.player, this.sequenceLength, this.scanDistance)
		this.game.display.clear()
		this.game.display.showSequence(this.sequence)
	}

	placeHazards() {
		let grid = this.game.grid
		let frequency = this.hazardFrequency
		this.game.grid.forEachWall(function(old) {
			let Type = Math.random() < frequency ? Hazard : Wall
			if (typeof old === Type) return
			let wall = new Type()
			grid.setWall(old.position, old.orientation, wall)
			wall.start()
		})
	}
}
