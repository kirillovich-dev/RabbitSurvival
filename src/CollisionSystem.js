import {Enemy} from "./Enemy.js";
import {Character} from "./Character.js";
import {Bullet} from "./Bullet.js";
import {store} from "./gameStore.js";

export class CollisionSystem {
    constructor (app) {
        this.app = app;
        this.listeners();
        this.createCharacter();
        this.createEnemy();
        this.tickerFn = (delta) => this.update(delta.deltaMS / 60);
        this.app.ticker.add(this.tickerFn);
    }
    createCharacter() {
        this.char = new Character(this.app);
    }
    createEnemy() {
        this.enemy = new Enemy(this.app, 'assets/char.png');
    }
    createBullet() {
        this.bullet = new Bullet(this.app, this.char.getCharX(), this.char.getCharY(), this.mouseX, this.mouseY);
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
        this.checkUnitsCollisions();
    }
    checkUnitsCollisions() {
        this.checkEnemyKilled();
        this.checkCharacterKilled();
    }

    checkEnemyKilled() {
        if (this.bullet && this.enemy) {
            if (this.bullet.x && store.enemy.x && this.bullet.x === store.enemy.x && this.bullet.y === store.enemy.y) {
                this.bullet.removeBullet();
                this.enemy.removeEnemy();
            }
        }
    }
    checkCharacterKilled() {
        if (this.char && this.enemy) {
            if (store.char.x && store.enemy.x && store.enemy.x === store.char.x && store.enemy.y  === store.char.y) {
                this.char.removeCharacter();
            }
        } 
    }
}