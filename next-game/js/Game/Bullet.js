import LineSprite from "./LineSprite.js";
import Plane from "./Plane.js";

export default class Bullet {

    constructor(context, left, top, direction) {
        this.direction = direction;
        this.sprite = new LineSprite(context, "white", left, top, 0, CONFIG.bullet.height);
        this.valid = false;
    }

    update(session) {
        if (this.valid) {
            session.gameElements.forEach(value => {
                if (value == this) {
                    return;
                }
                if (this.sprite.collideWith(value.sprite)) {
                    if (value instanceof Plane) {
                        value.destroyed = true;
                    }
                    this.remove(session);
                }
            });
        }
        else {
            this.valid = true;
        }
        if (this.sprite.boundaryCheck(session, "top") || this.sprite.boundaryCheck(session, "bottom")) {
            this.remove(session);
        }
        this.sprite.position.top += this.direction * session.frameTimeRatio;
    }

    remove(session) {
        session.gameElements.splice(session.gameElements.indexOf(this), 1);
    }

}