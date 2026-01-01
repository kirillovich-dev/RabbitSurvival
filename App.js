
import {Game} from "./src/Game.js"
import {Unit} from "./src/Unit.js"

(async () => {
    // Create a new application


    const app = new PIXI.Application();

    await app.init({ background: '#0c9917ff', resizeTo: window });

    document.body.appendChild(app.canvas);
    const unit = new Unit()
    const game = new Game(app)


})()