import {store} from "./gameStore.js";

export class Bullet {
    constructor(app,x,y, mouseX, mouseY, id){
        this.app = app;
        this.initialX = x;
        this.initialY = y;
        this.x = 0;
        this.y = 0;
        this.id = id;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.createBullet();
        this.findVector();
        this.tickerFn = (delta) => this.update(delta.deltaMS / 60);
        this.app.ticker.add(this.tickerFn);
        this.isAlive = true;
    }

    bulletSpeed = 15;

    createBullet() {
        const graphics = new PIXI.Graphics().circle(this.initialX,this.initialY, 10).fill(0xffffff);
        this.app.stage.addChild(graphics);
        this.bullet = graphics;
    }
    
    findVector() {
        const dx = this.mouseX - this.initialX;
        const dy = this.mouseY - this.initialY;

        const length = Math.sqrt(dx * dx + dy * dy);

        this.dirX = dx / length;
        this.dirY = dy / length;
    }

    onMoveObject(delta) {
        this.bullet.x += this.dirX * this.bulletSpeed * delta;
        this.bullet.y += this.dirY * this.bulletSpeed * delta;
        this.x = Math.round(this.bullet.x + this.initialX);
        this.y = Math.round(this.bullet.y + this.initialY);
    }

    wallStop() {
        if (!this.bullet) return;
        if (this.bullet.y < -window.innerHeight) {
            this.removeBullet();
            return;
        }
        if (this.bullet.y > window.innerHeight) {
            this.removeBullet();
            return;
        }
        if (this.bullet.x > window.innerWidth) {
            this.removeBullet();
            return;
        }
        if (this.bullet.x < -window.innerWidth) {
            this.removeBullet();
            return;
        }
    }

    removeBullet() {
        if (!this.bullet) {
            return
        }

        const index = store.bullets.findIndex(b => b.id === this.id);
        if (index !== -1) {
            store.bullets.splice(index, 1);
        }

        this.app.stage.removeChild(this.bullet);
        this.app.ticker.remove(this.tickerFn);
        this.bullet.destroy();
        this.bullet = null;
    }

    update(dt) {
        this.onMoveObject(dt);
        this.wallStop();
        this.checkIsAlive();
    }

    checkIsAlive() {
        if (this.isAlive === false) {
            this.removeBullet();
        }
    }
}