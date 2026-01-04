import {Enemy} from "./Enemy.js"
import {Character} from "./Character.js"
import {Bullet} from "./Bullet.js"

export class CollisionSystem {
    constructor (app) {
        this.app = app;
        this.listeners();
        this.createCharacter();
        this.createEnemy();
    }
    createCharacter() {
        this.char = new Character(this.app);
    }
    createEnemy() {
        const enemy = new Enemy(this.app, 'assets/char.png');
    }
    createBullet() {
        const bullet = new Bullet(this.app, this.char.getCharX(), this.char.getCharY(), this.mouseX, this.mouseY);
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
}