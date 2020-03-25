import GameSession from "./GameSession.js";

export default class Sprite {

    constructor(context, left, top, width, height) {
        if (!context instanceof CanvasRenderingContext2D) {
            throw new ReferenceError("context is not a valid instance of CanvasRenderingContext2D.");
        }
        this.position = {
            left: left,
            top: top,
        };
        this.appearance = {
            width: width,
            height: height,
        };
        this.context = context;
    }

    collideWith(sprite) {
        if (!(sprite instanceof Sprite)) {
            throw new ReferenceError("sprite is not a valid instance of Sprite");
        }
        return (
            !(this.position.left + this.appearance.width < sprite.position.left) &&
            !(sprite.position.left + sprite.appearance.width < this.position.left) &&
            !(this.position.top + this.appearance.height < sprite.position.top) &&
            !(sprite.position.top + sprite.appearance.height < this.position.top)
        );
    }

    boundaryCheck(session, side) {
        if (!(session instanceof GameSession)) {
            throw new ReferenceError("session is not a valid instance of GameSession.");
        }
        switch (side) {
            case "top":
                return this.position.top < CONFIG.boundary.top;
                break;
            case "bottom":
                return this.position.top + this.appearance.height > session.canvas.height - CONFIG.boundary.bottom;
                break;
            case "left":
                return this.position.left < CONFIG.boundary.left;
                break;
            case "right":
                return this.position.left + this.appearance.width > session.canvas.width - CONFIG.boundary.right;
                break;
            default:
                throw new ReferenceError("side must be either \"top\", \"bottom\", \"left\", or \"right\".");
        }
    }

}