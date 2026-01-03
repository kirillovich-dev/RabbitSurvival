
import {CollisionSystem} from "./src/CollisionSystem.js"

(async () => {
    // Create a new application


    const app = new PIXI.Application();

    await app.init({ background: '#0c9917ff', resizeTo: window });

    document.body.appendChild(app.canvas);
    const collisionSystem = new CollisionSystem(app);

})()