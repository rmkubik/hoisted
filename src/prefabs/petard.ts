import Prefab from '../prefabs/prefab';
import * as Assets from '../assets';

export default class Petard extends Prefab {

    public onExplode: Phaser.Signal;
    public explosionRadius: number;
    public explosionPower: number;

    constructor(
        game: Phaser.Game,
        position: Phaser.Point,
        fuseLength: number,
        explosionRadius: number,
        explosionPower: number
    ) {
        super(game, position, Assets.Images.ImagesBomb.getName());
        this.anchor.setTo(0.5);
        this.onExplode = new Phaser.Signal();
        this.game.time.events.add(fuseLength, () => {
            this.onExplode.dispatch(this);
        });
        this.explosionRadius = explosionRadius;
        this.explosionPower = explosionPower;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.bounce.setTo(0.2);
        this.body.gravity.set(0, 180);
        this.body.drag = new Phaser.Point(100, 0);
    }
}
