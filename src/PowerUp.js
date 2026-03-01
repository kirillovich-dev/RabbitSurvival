import {store} from "./gameStore.js";

export class PowerUp {
    constructor(app) {
        this.app = app;
        this.initPowerup();
        this.startPosition();
        this.tickerFn = (delta) => this.update(delta.deltaMS / 60);
        this.app.ticker.add(this.tickerFn);
    }

    initPowerup() {
        const graphics = new PIXI.Graphics().circle(this.initialX,this.initialY, 10).fill(0xff0000);
        this.app.stage.addChild(graphics);
        this.powerup = graphics;
    }
    startPosition() {
        this.powerup.x = Math.random() * (window.innerWidth - 50) + 50;
        this.powerup.y = Math.random() * (window.innerHeight - 50) + 50;
    }

    update (dt) {
        this.hitboxChecker();
    }

    removePowerup() {
        if (!this.powerup) {
            return
        }

        this.app.stage.removeChild(this.powerup);
        this.app.ticker.remove(this.tickerFn);
        this.powerup.destroy();
        this.powerup = null;
    }

    hitboxChecker() {
        const char = store.char;
        if (char?.x && char?.y && this.powerup) {
            const xCollision = (char.x >= this.powerup.x - this.powerup.width && char.x <= this.powerup.x + this.powerup.width);

            const yCollision = (char.y >= this.powerup.y - this.powerup.height && char.y <= this.powerup.y + this.powerup.height);
            if (xCollision && yCollision) {

                this.powerup.x = undefined;
                this.powerup.y = undefined;
                this.removePowerup();

            }
        }
    }
}