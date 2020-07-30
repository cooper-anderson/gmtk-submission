import BaseEvent from "../event.js"

export default class EventStage extends BaseEvent {
	// region Properties
	/**
	 * Reference to the {@link Stage} instance
	 * @property stage
	 * @type {Stage}
	 */
	stage
	// endregion

	/**
	 * @constructor
	 * @param {Stage} stage
	 */
	constructor(stage) {
		super()
		this.stage = stage
	}
}