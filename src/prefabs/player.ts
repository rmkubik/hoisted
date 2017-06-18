import Prefab from '../prefabs/prefab';
import * as Assets from '../assets';

export default class Player extends Prefab {

    constructor(game: Phaser.Game, position: Phaser.Point) {
        super(game, position, Assets.Images.ImagesNinja.getName());
        this.anchor.setTo(0.5);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.bounce.setTo(0.2);
        this.body.gravity.set(0, 180);
        this.body.drag = new Phaser.Point(100, 0);
    }
}
