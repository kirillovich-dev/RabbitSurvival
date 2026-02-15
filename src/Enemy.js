import {store} from "./gameStore.js"
export class Enemy {
  constructor(app, spriteAddress) {
    this.app = app;
    this.spriteAddress = spriteAddress;
    this.initEnemy();
    this.tickerFn = (delta) => this.update(delta.deltaMS / 60);
    this.app.ticker.add(this.tickerFn);
  }

  enemySpeed = 10;
  
  async initEnemy() {
    const texture = await PIXI.Assets.load(this.spriteAddress);
    this.enemy = PIXI.Sprite.from(texture);
    this.startPosition();
  }

  startPosition() {
    this.enemy.anchor.set(0.5);
    this.enemy.x = Math.random() * window.innerWidth;
    this.enemy.y = Math.random() * window.innerHeight;
    this.app.stage.addChild(this.enemy);
  }

  update(dt) {
    if (!this.enemy) return
    this.findVector();
    this.onMoveObject(dt);
    this.checkCharacterKilled();
    this.checkEnemyKilled();
  }

  onMoveObject(delta) {
      this.enemy.x += this.dirX * this.enemySpeed * delta;
      this.enemy.y += this.dirY * this.enemySpeed * delta;

      this.enemy.x = Math.round(this.enemy.x);
      this.enemy.y = Math.round(this.enemy.y);
  }

  findVector() {
        const dx = store.char.x - this.enemy.x;
        const dy = store.char.y - this.enemy.y;

        const length = Math.sqrt(dx * dx + dy * dy);

        this.dirX = dx / length;
        this.dirY = dy / length;
    }

  removeEnemy() {
    if (!this.enemy) {
        return;
      }
        this.app.stage.removeChild(this.enemy);
        this.app.ticker.remove(this.tickerFn);
        this.enemy.destroy();
        this.enemy = null;
    }

    checkCharacterKilled() {
        if (this.char && this.enemy) {
            if (store.char.x && this.enemy.x && this.enemy.x === store.char.x && this.enemy.y  === store.char.y) {
                store.char.isAlive = false;
            }
        } 
    }

    checkEnemyKilled() {
      for (let i = 0; i < store.bullets.length; i++){
        const bullet = store.bullets[i];

        if (bullet?.x && this.enemy) {
            const xCollision = (bullet.x >= this.enemy.x - this.enemy.width/2 && bullet.x <= this.enemy.x + this.enemy.width/2);

            const yCollision = (bullet.y >= this.enemy.y - this.enemy.height/2 && bullet.y <= this.enemy.y + this.enemy.height/2);
            if (xCollision && yCollision) {

                bullet.x = undefined;
                bullet.y = undefined;
                this.enemy.x = undefined;
                this.enemy.y = undefined;
                
                bullet.isAlive = false;
                this.removeEnemy();
                //decrease enemyCount here
            }
        }
      }
    }
}