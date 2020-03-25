import Sprite from "./Sprite.js";

export default class LineSprite extends Sprite {

    constructor(context, color, left, top, width, height) {
        super(context, left, top, width, height);
        this.color = color;
        this.ready = true;
    }

    draw() {
        this.context.strokeStyle = this.color;
        this.context.beginPath();
        this.context.moveTo(this.position.left, this.position.top);
        this.context.lineTo(this.position.left + this.appearance.width, this.position.top + this.appearance.height);
        this.context.stroke();
    }

}