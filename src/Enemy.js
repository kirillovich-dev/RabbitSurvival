import {store} from "./gameStore.js"
export class Enemy {
  constructor(app, spriteAddress) {
    console.log("enemy loaded")
    this.app = app;
    this.spriteAddress = spriteAddress;
    this.initEnemy();
    this.tickerFn = (delta) => this.update(delta.deltaMS / 60);
    this.app.ticker.add(this.tickerFn);
  }

  enemySpeed = 30;
  
  async initEnemy() {
    const texture = await PIXI.Assets.load(this.spriteAddress);
    this.enemy = PIXI.Sprite.from(texture);
    this.startPosition();
  }

  startPosition() {
    this.enemy.anchor.set(0.5);
    this.enemy.x = 300;
    this.enemy.y = 300;
    this.app.stage.addChild(this.enemy);
  }

  update(dt) {
    if (!this.enemy) return
    this.findVector();
    this.onMoveObject(dt);
  }

  onMoveObject(delta) {
      this.enemy.x += this.vectorX/this.enemySpeed * delta;
      this.enemy.y += this.vectorY/this.enemySpeed * delta;
  }

    findVector() {
        this.vectorX = store.character.x - this.enemy.x;
        this.vectorY = store.character.y - this.enemy.y;
  }


}