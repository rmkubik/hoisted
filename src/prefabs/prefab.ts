

export default class Prefab extends Phaser.Sprite {

    constructor(game: Phaser.Game, position: Phaser.Point, textureKey?: string) {
        if (textureKey) {
            super(game, position.x, position.y, textureKey);
        } else {
            super(game, position.x, position.y);
        }

        console.log("hello world");
    }
}
