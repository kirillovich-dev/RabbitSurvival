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
    this.enemy.x = store.enemy.x;
    this.enemy.y = store.enemy.y;
    this.app.stage.addChild(this.enemy);
  }

  update(dt) {
    if (!this.enemy) return
    this.findVector();
    this.onMoveObject(dt);
  }

  onMoveObject(delta) {
      this.enemy.x += this.dirX * this.enemySpeed * delta;
      this.enemy.y += this.dirY * this.enemySpeed * delta;
      store.enemy.x = Math.round(this.enemy.x * 10)/10;
      store.enemy.y = Math.round(this.enemy.y * 10)/10;
  }

  findVector() {
        const dx = store.char.x - this.enemy.x;
        const dy = store.char.y - this.enemy.y;

        const length = Math.sqrt(dx * dx + dy * dy);

        this.dirX = dx / length;
        this.dirY = dy / length;
    }

  removeEnemy() {
    if (!this.enemy){
      return
    }
        this.app.stage.removeChild(this.enemy);
        this.app.ticker.remove(this.tickerFn);
        this.enemy.destroy();
        this.enemy = null;
    }


}