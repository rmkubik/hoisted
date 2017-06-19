import Prefab from '../prefabs/prefab';
import * as Assets from '../assets';

export default class Tile extends Prefab {

    constructor(game: Phaser.Game, position: Phaser.Point, textureIndex: number) {
        let textureKey: string;
        switch (textureIndex) {
            case 0:
                textureKey = Assets.Images.ImagesTiles.getName();
                break;
            case 1:
                textureKey = Assets.Images.ImagesTiles1.getName();
                break;
            default:
                console.warn(`${textureIndex} is an invalid textureIndex,
                    defaulting to ${Assets.Images.ImagesTiles.getName()}.`);
                textureKey = Assets.Images.ImagesTiles.getName();
                break;
        }
        super(game, position, textureKey);
        this.anchor.setTo(0.5);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
    }
}
