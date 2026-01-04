import {store} from "./gameStore.js"
export class Character {
    constructor(app) {
        this.app = app;
        this.keys = {};
        this.speed = 20;
        this.initCharacter();
    }

    async initCharacter() {
        const texture = await PIXI.Assets.load('assets/char.png');
        this.char = PIXI.Sprite.from(texture);
        this.listeners();
        this.startPosition();
        this.ticker();
    }
    startPosition() {
        this.char.anchor.set(0.5);
        this.char.x = store.character.x;
        this.char.y = store.character.y;
        this.app.stage.addChild(this.char);
    }

    listeners() {
        window.addEventListener("keydown", e => this.keys[e.code] = true);
        window.addEventListener("keyup", e => this.keys[e.code] = false);
    }

    ticker() {
        this.app.ticker.add(delta => this.update(delta.deltaMS / 60));
    }

    update(dt) {
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

        store.character.x = this.char.x;
        store.character.y = this.char.y;

        this.wallStop();
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
}