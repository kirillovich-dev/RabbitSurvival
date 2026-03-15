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
        const graphics = new PIXI.Graphics().circle(this.initialX,this.initialY, 10);
        this.app.stage.addChild(graphics);
        this.powerup = graphics;

        const chance = Math.round(Math.random()*10);
        switch (chance) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                this.fastWalkBonus();
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            default:
                this.fastShootBonus();
                break;
        }
    }
    startPosition() {
        this.powerup.x = Math.random() * (window.innerWidth - 100) + 100;
        this.powerup.y = Math.random() * (window.innerHeight - 100) + 100;
    }

    update (dt) {
        this.hitboxChecker();
    }

    removePowerup() {
        if (!this.powerup) {
            return
        }

        this.app.stage.removeChild(this.powerup);
        this.powerup.destroy();
        this.powerup = null;
    }

    fastWalkBonus() {
        const multiplierStep = 0.3;
        store.char.fastWalkMultiplier = store.char.fastWalkMultiplier + multiplierStep;
        this.powerup.fill(0xffff00);
    }
    fastShootBonus() {
        const multiplierStep = 0.5;
        store.char.fastShootMultiplier = store.char.fastShootMultiplier + multiplierStep;
        this.powerup.fill(0xff0000);
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
                this.initPowerup();
                this.startPosition();

            }
        }
    }
}