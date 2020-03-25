import Player from "./Player.js";
import Score from "./Score.js";
import Enemy from "./Enemy.js";

export default class GameSession {

    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.level = 0;
        this.score = 0;
    }

    start() {
        this.prepareGameEnvironment();
        this.lastFrameTime = performance.now();
        requestAnimationFrame(this.eventLoop.bind(this));
    }

    prepareGameEnvironment() {
        this.gameElements = [];
        this.gameElements.push(new Player(this.context));
        this.gameElements.push(new Score(this.context));
        this.enemyDirection = CONFIG.enemy.initialDirection;
        let position = {
            left: CONFIG.boundary.left,
            top: CONFIG.boundary.top
        };
        new Int32Array(CONFIG.enemy.countOfLines[this.level]).forEach(value => {
            new Int32Array(CONFIG.enemy.countPerLine[this.level]).forEach(value => {
                this.gameElements.push(new Enemy(this.context, position.left, position.top));
                position.left += CONFIG.enemy.appearance.width + CONFIG.enemy.gap;
            });
            position.left = CONFIG.boundary.left;
            position.top += CONFIG.enemy.proceedingDistance;
        });
    }

    updateEnemyDirection() {
        session.gameElements.forEach(value => {
            if (value instanceof Enemy && !value.destroyed && value.direction != this.enemyDirection) {
                value.direction = this.enemyDirection;
                value.move(0, CONFIG.enemy.proceedingDistance);
            }
        });
    }

    eventLoop() {
        let frameTime = performance.now();
        this.frameTimeDifference = frameTime - this.lastFrameTime;
        this.frameTimeRatio = this.frameTimeDifference * CONFIG.targetFramesPerSecond / 1000;
        this.lastFrameTime = frameTime;
        this.updateAll();
        this.clearAll();
        this.drawAll();
        let hasEnemy;
        this.gameElements.forEach(value => {
            if (value instanceof Enemy) {
                hasEnemy = true;
            }
        })
        if (!hasEnemy && GAME.status == "playing") {
            if (this.level == CONFIG.lastLevel) {
                this.end("all-success");
            }
            else {
                this.level++
                document.getElementById("level").innerHTML = this.level.toString();
                this.end("success");
            }
        }
        requestAnimationFrame(this.eventLoop.bind(this));
    }

    updateAll() {
        this.updateEnemyDirection();
        this.gameElements.forEach(value => value.update(this));
    }

    drawAll() {
        this.gameElements.forEach(value => {
            if (value.sprite.ready) {
                value.sprite.draw();
            }
        })
    }

    clearAll() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    end(status) {
        this.gameElements = [];
        GAME.setStatus(status);
    }

}