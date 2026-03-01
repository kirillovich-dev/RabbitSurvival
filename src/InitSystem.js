import {Enemy} from "./Enemy.js";
import {Character} from "./Character.js";
import {Bullet} from "./Bullet.js";
import {store} from "./gameStore.js";
import {PowerUp} from "./PowerUp.js"

export class InitSystem {
    constructor (app) {
        this.app = app;
        this.listeners();
        this.createCharacter();
        this.enemySpawn();
        this.createPowerup();
        this.tickerFn = (delta) => this.update(delta.deltaMS / 60);
        this.app.ticker.add(this.tickerFn);
        this.bulletId = 1;
    }
    wave = 1;

    createCharacter() {
        this.char = new Character(this.app);
    }
    createEnemy() {
        new Enemy(this.app, 'assets/enemy.png');
        store.enemyCount += 1;
    }
    createBullet() {
        const bullet = new Bullet(this.app, this.char.getCharX(), this.char.getCharY(), this.mouseX, this.mouseY, this.bulletId++);
        store.bullets.push(bullet);
    }
    enemySpawn() {
        for (let i = 0; i<this.wave * 5; i++) {
            this.createEnemy();
        }
    }
    createPowerup() {
        new PowerUp(this.app);
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
        if (store.enemyCount === 0) {
            this.wave += 1;
            this.enemySpawn();
        }
    }
}