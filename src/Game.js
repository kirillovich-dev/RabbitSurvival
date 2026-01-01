export class Game {
    constructor(app) {
        console.log("game class loaded");
        this.app = app;
        this.startGame();
    }
    direction;
    speed;
    char;
    async startGame() {
        const texture = await PIXI.Assets.load('assets/char.png');
        this.char = PIXI.Sprite.from(texture);
        this.listeners();
        this.startPosition();
        this.ticker();
    }
    startPosition() {
        this.char.anchor.set(0.5);
        this.char.x = window.innerWidth / 2;
        this.char.y = window.innerHeight / 2;
        this.app.stage.addChild(this.char);
    }
    

    onMoveRabbit() {
        if (this.direction == "ArrowRight" || this.direction == "d") {
        this.char.x += this.speed
       }
       if (this.direction == "ArrowLeft" || this.direction == "a") {
        this.char.x -= this.speed
       }
       if (this.direction == "ArrowDown" || this.direction == "s") {
        this.char.y += this.speed
       }
       if (this.direction == "ArrowUp" || this.direction == "w") {
        this.char.y -= this.speed
       }
    }
    wallStop() {
        if (this.char.y < 0) {
            this.char.y = 0;
        }
        if (this.char.y > window.innerHeight) {
            this.char.y = window.innerHeight;
        }
        if (this.char.x > window.innerWidth) {
            this.char.x = window.innerWidth;
        }
        if (this.char.x < 0) {
            this.char.x = 0;
        }
    }
    stopCharacter() {
        this.speed = 0;
    }
    runCharacter() {
        this.speed = 10;
    } 
    listeners() {
        document.addEventListener('keyup', (e) => {
            this.stopCharacter();
        });
        document.addEventListener('keydown', (e) => {
            this.onSaveDirection(e);
            this.runCharacter();
        });  
    }
    onSaveDirection(e) {
        this.direction = e.key;    
    }
    ticker() {
       this.app.ticker.add((delta) => {
        this.onMoveRabbit();
        this.wallStop();
    }); 
    }
}


