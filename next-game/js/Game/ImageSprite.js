import Sprite from "./Sprite.js";

export default class ImageSprite extends Sprite {

    constructor(image, context, left, top, width, height) {
        super(context, left, top, width, height);
        if (!(image instanceof Image) && !(image instanceof HTMLImageElement) && !(image instanceof HTMLCanvasElement) && !(image instanceof HTMLVideoElement)) {
            throw new ReferenceError("image cannot be drawn.");
        }
        this.image = image;
        this.image.onload = event => this.ready = true;
    }

    draw() {
        this.context.drawImage(this.image, this.position.left, this.position.top, this.appearance.width, this.appearance.height);
    }

}