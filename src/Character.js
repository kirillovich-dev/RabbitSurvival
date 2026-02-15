import {store} from "./gameStore.js"
export class Character {
    constructor(app) {
        this.app = app;
        this.keys = {};
        this.speed = 20;
        this.initCharacter();
        this.tickerFn = (delta) => this.update(delta.deltaMS / 60);
        this.app.ticker.add(this.tickerFn);
    }
    
    async initCharacter() {
        const texture = await PIXI.Assets.load('assets/char.png');
        this.char = PIXI.Sprite.from(texture);
        this.listeners();
        this.startPosition();
    }
    startPosition() {
        this.char.anchor.set(0.5);
        this.char.x = store.char.x;
        this.char.y = store.char.y;
        this.app.stage.addChild(this.char);
    }

    listeners() {
        window.addEventListener("keydown", e => this.keys[e.code] = true);
        window.addEventListener("keyup", e => this.keys[e.code] = false);
    }

    update(dt) {
        if (!this.char) {
            return
        }
        let dx = 0, dy = 0;
        if (this.keys.KeyA || this.keys.ArrowLeft) dx--;
        if (this.keys.KeyD || this.keys.ArrowRight) dx++;
        if (this.keys.KeyW || this.keys.ArrowUp) dy--;
        if (this.keys.KeyS || this.keys.ArrowDown) dy++;

        const len = Math.hypot(dx, dy);
        if (len) {
        dx /= len;
        dy /= len;
        }

        this.char.x += dx * this.speed * dt;
        this.char.y += dy * this.speed * dt;

        store.char.x = Math.round(this.char.x * 10)/10;
        store.char.y = Math.round(this.char.y * 10)/10;

        this.wallStop();
        this.checkIsAlive();
    }

    wallStop() {
        if (this.char.y < 0) {
            this.char.y = 0;
        }
        if (this.char.y > window.innerHeight) {
            this.char.y = window.innerHeight;
        }
        if (this.char.x > window.innerWidth) {
            this.char.x = window.innerWidth;
        }
        if (this.char.x < 0) {
            this.char.x = 0;
        }
    }
    
    getCharX() {
        return this.char.x;
    }

    getCharY() {
        return this.char.y;
    }

    checkIsAlive() {
        if (store.char.isAlive === false) {
            this.removeCharacter();
        }
    }
    removeCharacter() {
        this.app.stage.removeChild(this.char);
        this.app.ticker.remove(this.tickerFn);
        this.char.destroy();
        this.char = null;
        store.char.x = null;
        store.char.y = null;
    }
}