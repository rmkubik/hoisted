import Prefab from '../prefabs/prefab';
import * as Assets from '../assets';

export default class Goal extends Prefab {

    public nextLevelKey: string;

    constructor(game: Phaser.Game, position: Phaser.Point, nextLevelKey: string) {
        super(game, position, Assets.Images.ImagesGoal.getName());
        this.anchor.setTo(0.5);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.nextLevelKey = nextLevelKey;
    }
}
