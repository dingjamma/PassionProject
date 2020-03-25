import Sprite from "./Sprite.js";

export default class TextSprite extends Sprite {

    constructor(context, font, style, content, left, top, maxWidth) {
        super(context, left, top, maxWidth, null);
        this.font = font;
        this.style = style;
        this.content = content;
        this.ready = true;
    }

    draw() {
        this.context.font = this.font;
        this.context.fillStyle = this.style;
        this.context.fillText(this.content, this.position.left, this.position.top, this.appearance.width);
    }

}