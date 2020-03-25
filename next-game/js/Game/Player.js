import Plane from "./Plane.js";
import ImageSprite from "./ImageSprite.js";

export default class Player extends Plane {

    constructor(context) {
        super(context);
        this.lastBullet = 0;
        let image = new Image();
        image.src = CONFIG.player.image;
        this.sprite = new ImageSprite(image, this.context, CONFIG.player.position.left, CONFIG.player.position.top, CONFIG.player.appearance.width, CONFIG.player.appearance.height);
    }

    update(session) {
        if (this.destroyed) {
            this.destroyProcess(session);
        }
        this.sinceLastBullet++;
        if (keyboard.currentKeys.indexOf(CONFIG.player.keymoveleft) != -1 && !this.sprite.boundaryCheck(session, "left")) {
            this.sprite.position.left -= CONFIG.player.step * session.frameTimeRatio;
        }
        if (keyboard.currentKeys.indexOf(CONFIG.player.keymoveright) != -1 && !this.sprite.boundaryCheck(session, "right")) {
            this.sprite.position.left += CONFIG.player.step * session.frameTimeRatio;
        }
        if (keyboard.currentKeys.indexOf(CONFIG.player.keyshoot) != -1 && (performance.now() - this.lastBullet) / (1000 / CONFIG.targetFramesPerSecond) > CONFIG.bullet.cooldown) {
            this.shoot(session);
        }
    }

    shoot(session) {
        this.lastBullet = performance.now();
        session.gameElements.push(this.createBullet(CONFIG.player.bullet.direction));
    }

    remove(session) {
        session.gameElements.splice(session.gameElements.indexOf(this), 1);
        session.end("failed");
        document.getElementById("score").innerHTML = session.score.toString();
    }

}