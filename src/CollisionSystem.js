import {Enemy} from "./Enemy.js";
import {Character} from "./Character.js";
import {Bullet} from "./Bullet.js";
import {store} from "./gameStore.js";

export class CollisionSystem {
    constructor (app) {
        this.app = app;
        this.listeners();
        this.createCharacter();
        this.enemySpawn();
        this.tickerFn = (delta) => this.update(delta.deltaMS / 60);
        this.app.ticker.add(this.tickerFn);
    }
    wave = 1
    createCharacter() {
        this.char = new Character(this.app);
    }
    createEnemy() {
        this.enemy = new Enemy(this.app, 'assets/enemy.png');
    }
    createBullet() {
        const bullet = new Bullet(this.app, this.char.getCharX(), this.char.getCharY(), this.mouseX, this.mouseY);
        store.bullets.push(bullet);
    }
    // enemyWaveCount(wave) {
    //     return 5 * wave;
    // }
    enemySpawn() {
        for (let i = 0; i<this.wave * 1; i++) {
            this.createEnemy();
        }
    }

    listeners() {
        document.addEventListener('keyup', (e) => {
            this.shoot(e);
        });
        document.addEventListener("mousemove", (e) => {
            this.mouseX = e.x;
            this.mouseY = e.y;
        })
    }
    shoot(e) {
        if (e.key === " ") {
            this.createBullet();
        }
    }
    update(dt) {
    }
}