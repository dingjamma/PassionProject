import Bullet from "./Bullet.js";
import ImageSprite from "./ImageSprite.js";

export default class Plane {

    constructor(context) {
        this.sinceDestroy = 0;
        this.destroyed = false;
        this.context = context;
    }

    createBullet(direction) {
        if (direction < 0) {
            return new Bullet(this.context, this.sprite.position.left + this.sprite.appearance.width / 2, this.sprite.position.top - CONFIG.bullet.height, direction);
        }
        else if (direction > 0) {
            return new Bullet(this.context, this.sprite.position.left + this.sprite.appearance.width / 2, this.sprite.position.top + this.sprite.appearance.height, direction);
        }
        else {
            throw new RangeError("direction cannot be zero.");
        }
    }

    destroyProcess(session) {
        if (this.sinceDestroy == 0) {
            let image = new Image();
            image.src = CONFIG.destroyed.image;
            this.sprite = new ImageSprite(image, this.context, this.sprite.position.left, this.sprite.position.top, CONFIG[this.__proto__.constructor.name.toLowerCase()].appearance.width, CONFIG[this.__proto__.constructor.name.toLowerCase()].appearance.height);
        }
        if (this.sinceDestroy >= CONFIG.destroyed.removalDelay * 1000 / CONFIG.targetFramesPerSecond) {
            this.remove(session);
        }
        this.sinceDestroy += session.frameTimeDifference;
    }

}