import TextSprite from "./TextSprite.js";

export default class Score {

    constructor(context) {
        this.sprite = new TextSprite(context, CONFIG.score.font, CONFIG.score.style, null, CONFIG.score.position.left, CONFIG.score.position.top);
    }

    update(session) {
        this.sprite.content = "Score: " + session.score;
    }

}