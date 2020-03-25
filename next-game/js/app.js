import KeyboardManager from "./KeyboardManager.js";
import GameSession from "./Game/GameSession.js";

// element
let container = document.getElementById('game');


window.GAME = {
    /**
     * init value
     * @param  {object} opts 
     * @return {[type]}      [description]
     */
    init: function (opts) {
        this.status = 'start';
        this.bindEvent();
        fetch("config.json").then(response => response.json()).then(json => { window.CONFIG = json });
        window.keyboard = new KeyboardManager();
    },
    bindEvent: function () {
        let self = this;
        let playBtn = document.querySelector('.js-play');
        // start game bind
        playBtn.onclick = function () {
            self.play();
        };
        // restart bind
        Array.from(document.getElementsByClassName('js-replay')).forEach(replayBtn => replayBtn.onclick = function () {
            self.replay();
        });
        let nextBtn = document.querySelector('.js-next');
        // next level bind
        nextBtn.onclick = function () {
            self.next();
        };
    },
    /**
     * start  
     * playing 
     * failed 
     * success 
     * all-success
     * stop 
     */
    setStatus: function (status) {
        this.status = status;
        container.setAttribute("data-status", status);
    },
    play: function () {
        this.setStatus('playing');
        window.session = new GameSession(document.getElementById("canvas"));
        session.start();
    },
    replay: function () {
        this.setStatus('playing');
        session.level = 0;
        session.score = 0;
        session.prepareGameEnvironment();
    },
    next: function () {
        this.setStatus('playing');
        session.prepareGameEnvironment();
    }
};


// 
GAME.init();
