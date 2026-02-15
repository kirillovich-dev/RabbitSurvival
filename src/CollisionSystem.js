import {Enemy} from "./Enemy.js";
import {Character} from "./Character.js";
import {Bullet} from "./Bullet.js";
import {store} from "./gameStore.js";

//TODO: rename class
export class CollisionSystem {
    constructor (app) {
        this.app = app;
        this.listeners();
        this.createCharacter();
        this.enemySpawn();
        this.tickerFn = (delta) => this.update(delta.deltaMS / 60);
        this.app.ticker.add(this.tickerFn);
        this.bulletId = 1;
    }
    wave = 1
    createCharacter() {
        this.char = new Character(this.app);
    }
    createEnemy() {
        //count here in store
        this.enemy = new Enemy(this.app, 'assets/enemy.png');
    }
    createBullet() {
        const bullet = new Bullet(this.app, this.char.getCharX(), this.char.getCharY(), this.mouseX, this.mouseY, this.bulletId++);
        store.bullets.push(bullet);
    }

    //TODO: make waves
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
        //check here if enemy 0 and create new wave
    }

}