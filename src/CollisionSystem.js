import {Enemy} from "./Enemy.js"
import {Character} from "./Character.js"
import {Bullet} from "./Bullet.js"

export class CollisionSystem {
    constructor (app) {
        this.app = app;
        this.listeners();
        this.createCharacter();
    }
    createCharacter() {
        this.char = new Character(this.app);
    }
    createEnemy() {
        const enemy = new Enemy(this.app);
    }
    createBullet() {
        const bullet = new Bullet(this.app, this.char.getCharX(), this.char.getCharY(), this.char.direction);
    }
    listeners() {
        document.addEventListener('keyup', (e) => {
            this.shoot(e);
        });
    }
    shoot(e) {
        if (e.key === "l") {
            this.createBullet();
        }
    }
}