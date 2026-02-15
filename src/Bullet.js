import {store} from "./gameStore.js";

export class Bullet {
    constructor(app,x,y, mouseX, mouseY){
        this.app = app;
        this.charX = x;
        this.charY = y;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.createBullet();
        this.findVector();
        this.tickerFn = (delta) => this.update(delta.deltaMS / 60);
        this.app.ticker.add(this.tickerFn);
        this.bullet.isAlive = true;
        // store.bullets.push(this.bullet);
    }

    bulletSpeed = 15;

    createBullet() {
        const graphics = new PIXI.Graphics().circle(this.charX,this.charY, 10).fill(0xffffff);
        this.app.stage.addChild(graphics);
        this.bullet = graphics;
    }
    
    findVector() {
        const dx = this.mouseX - this.charX;
        const dy = this.mouseY - this.charY;

        const length = Math.sqrt(dx * dx + dy * dy);

        this.dirX = dx / length;
        this.dirY = dy / length;
    }

    onMoveObject(delta) {
            this.bullet.x += this.dirX * this.bulletSpeed * delta;
            this.bullet.y += this.dirY * this.bulletSpeed * delta;
            this.bullet.x = Math.round(this.bullet.x * 10)/10 + this.charX;
            this.bullet.y = Math.round(this.bullet.y * 10)/10 + this.charY;
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
        this.app.stage.removeChild(this.bullet);
        this.app.ticker.remove(this.tickerFn);
        this.bullet.destroy();
        this.bullet = null;
    }

    update(dt) {
        this.onMoveObject(dt);
        this.wallStop();
    }
    checkIsAlive() {
        if (this.bullet.isAlive === false) {
            this.removeBullet();
        }
    }
}