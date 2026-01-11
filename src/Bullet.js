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
        const graphics = new PIXI.Graphics().circle(this.bulletX,this.bulletY, 10).fill(0xffffff);
        this.app.stage.addChild(graphics);
        this.bullet = graphics;
    }
    
    findVector() {
        const dx = this.mouseX - this.bulletX;
        const dy = this.mouseY - this.bulletY;

        const length = Math.sqrt(dx * dx + dy * dy);

        this.dirX = dx / length;
        this.dirY = dy / length;
    }

    onMoveObject(delta) {
        this.bullet.x += this.dirX * this.bulletSpeed * delta;
        this.bullet.y += this.dirY * this.bulletSpeed * delta;
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
}