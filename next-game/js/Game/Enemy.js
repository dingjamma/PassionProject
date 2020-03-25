import Plane from "./Plane.js";
import Player from "./Player.js";
import ImageSprite from "./ImageSprite.js";

export default class Enemy extends Plane {

    constructor(context, left, top) {
        super(context);
        let image = new Image();
        image.src = CONFIG.enemy.image;
        this.sprite = new ImageSprite(image, this.context, left, top, CONFIG.enemy.appearance.width, CONFIG.enemy.appearance.height);
        this.direction = CONFIG.enemy.initialDirection;
    }

    update(session) {
        if (this.destroyed) {
            this.destroyProcess(session);
        }
        else {
            if (this.direction == "left" && !this.sprite.boundaryCheck(session, "left")) {
                this.move(-CONFIG.enemy.step[session.level] * session.frameTimeRatio, 0);
            }
            if (this.direction == "right" && !this.sprite.boundaryCheck(session, "right")) {
                this.move(CONFIG.enemy.step[session.level] * session.frameTimeRatio, 0);
            }
            if (this.sprite.boundaryCheck(session, "left")) {
                session.enemyDirection = "right";
            }
            if (this.sprite.boundaryCheck(session, "right")) {
                session.enemyDirection = "left";
            }
            let randomArray = new Uint32Array(1);
            crypto.getRandomValues(randomArray);
            let randomValue = randomArray[0] / 4294967295;
            if (CONFIG.enemy.bullet[session.level].probability * session.frameTimeRatio > randomValue) {
                this.shoot(session);
            }
            session.gameElements.forEach(value => {
                if (this.sprite.collideWith(value.sprite) && value instanceof Player) {
                    value.destroyed = true;
                }
            });
            if (this.sprite.boundaryCheck(session, "top") || this.sprite.boundaryCheck(session, "bottom")) {
                this.remove(session);
            }
        }
    }

    shoot(session) {
        let bottomLevel = true;
        session.gameElements.forEach(value => {
            if (value instanceof Enemy && value.sprite.position.top > this.sprite.position.top) {
                bottomLevel = false;
            }
        })
        if (bottomLevel) {
            session.gameElements.push(this.createBullet(CONFIG.enemy.bullet[session.level].direction));
        }
    }

    move(left, top) {
        if (!this.destroyed) {
            this.sprite.position.left += left;
            this.sprite.position.top += top;
        }
    }

    remove(session) {
        session.score++;
        session.gameElements.splice(session.gameElements.indexOf(this), 1);
    }

}