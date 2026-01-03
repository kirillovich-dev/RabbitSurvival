//import { Graphics } from 'pixi.js';

export class Bullet {
    constructor(app,x,y, mouseX, mouseY){
        this.app = app;
        this.bulletX = x;
        this.bulletY = y;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.createBullet();
        this.findVector();
        this.tickerFn = (delta) => this.update(delta.deltaMS / 60);
        this.app.ticker.add(this.tickerFn);
    }

    bulletSpeed = 15;

    createBullet() {
        const graphics = new PIXI.Graphics().circle(this.bulletX,this.bulletY, 10).fill(0xff0000);
        this.app.stage.addChild(graphics);
        this.bullet = graphics;
    }
    // onMoveObject() {
    //     console.log(this.direction)
    //     if (this.direction == "ArrowRight" || this.direction == "d") {
    //     this.bullet.x += this.bulletSpeed
    //    }
    //    if (this.direction == "ArrowLeft" || this.direction == "a") {
    //     this.bullet.x -= this.bulletSpeed
    //    }
    //    if (this.direction == "ArrowDown" || this.direction == "s") {
    //     this.bullet.y += this.bulletSpeed
    //    }
    //    if (this.direction == "ArrowUp" || this.direction == "w") {
    //     this.bullet.y -= this.bulletSpeed
    //    }
    // }
    onMoveObject(delta) {
        this.bullet.x += this.vectorX/this.bulletSpeed * delta;
        this.bullet.y += this.vectorY/this.bulletSpeed * delta;
        console.log(this.bullet.x, this.bullet.y)
    }
 
    wallStop() {
        if (!this.bullet) {
            return;
        }
        if (this.bullet.y < -window.innerHeight) {
            this.removeBullet();
        }
        if (this.bullet.y > window.innerHeight) {
            this.removeBullet();
        }
        if (this.bullet.x > window.innerWidth) {
            this.removeBullet();
        }
        if (this.bullet.x < -window.innerWidth) {
            this.removeBullet();
        }
    }

    removeBullet() {
        this.app.stage.removeChild(this.bullet);
        this.app.ticker.remove(this.tickerFn);
        this.bullet.destroy();
    }

    update(dt) {
        this.onMoveObject(dt);
        this.wallStop();
    }


    ticker() {
        this.app.ticker.add(delta => this.update(delta.deltaMS / 60));
    }


    findVector() {
        this.vectorX = this.mouseX - this.bulletX;
        this.vectorY = this.mouseY - this.bulletY;
    }
}