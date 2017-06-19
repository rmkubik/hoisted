import Prefab from '../prefabs/prefab';
import * as Assets from '../assets';

export default class Goal extends Prefab {

    constructor(game: Phaser.Game, position: Phaser.Point) {
        super(game, position, Assets.Images.ImagesTiles.getName());
        this.anchor.setTo(0.5);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
    }
}
