//import { Graphics } from 'pixi.js';

export class Bullet {
    constructor(app,x,y,direction){
        this.app = app;
        this.bulletX = x;
        this.bulletY = y;
        this.direction = direction;
        this.createBullet();
        this.ticker();
    }

    bulletSpeed = 25;

    createBullet() {
        const graphics = new PIXI.Graphics().circle(this.bulletX,this.bulletY, 50).fill(0xff0000);
        this.app.stage.addChild(graphics);
        this.bullet = graphics;
    }
    onMoveObject() {
        console.log(this.direction)
        if (this.direction == "ArrowRight" || this.direction == "d") {
        this.bullet.x += this.bulletSpeed
       }
       if (this.direction == "ArrowLeft" || this.direction == "a") {
        this.bullet.x -= this.bulletSpeed
       }
       if (this.direction == "ArrowDown" || this.direction == "s") {
        this.bullet.y += this.bulletSpeed
       }
       if (this.direction == "ArrowUp" || this.direction == "w") {
        this.bullet.y -= this.bulletSpeed
       }
    }

    wallStop() {
        if (this.bullet.y < 0) {
            this.removeBullet();
        }
        if (this.bullet.y > window.innerHeight) {
            this.removeBullet();
        }
        if (this.bullet.x > window.innerWidth) {
            this.removeBullet();
        }
        if (this.bullet.x < 0) {
            this.removeBullet();
        }
    }

    removeBullet() {
        this.app.stage.removeChild(this.bullet);
    }


    ticker() {
        this.app.ticker.add((delta) => {
            this.onMoveObject();
            this.wallStop();
        }); 
    }
}