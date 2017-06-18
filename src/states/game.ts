import Player from '../prefabs/player';
import Petard from '../prefabs/petard';
import Tile from '../prefabs/tile';
import * as Assets from '../assets';

export default class Game extends Phaser.State {

    private cursors: any;
    private player: Player;
    private petardGroup: Phaser.Group;

    public create(): void {
        let backgroundTemplateSprite: Phaser.Sprite = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            Assets.Images.ImagesBackgroundTemplate.getName()
        );
        backgroundTemplateSprite.anchor.setTo(0.5);

        this.player = new Player(this.game, new Phaser.Point(20, 20));
        this.game.add.existing(this.player);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.petardGroup = new Phaser.Group(this.game);
        this.petardGroup.enableBody = true;
        this.petardGroup.physicsBodyType = Phaser.Physics.ARCADE;

        this.game.input.onUp.add((pointer: Phaser.Pointer) => {
            let petard: Petard = new Petard(this.game, this.player.position, Phaser.Timer.SECOND * 5, 300, 800);
            this.petardGroup.add(petard);
            this.game.physics.arcade.velocityFromRotation(
                this.game.physics.arcade.angleToPointer(petard, pointer),
                (pointer.duration / Phaser.Timer.SECOND) * 600 + 400,
                petard.body.velocity
            );

            petard.onExplode.add((petard: Petard) => {
                petard.kill();
                const distance = this.game.physics.arcade.distanceBetween(petard, this.player);
                let velocityAdjust: Phaser.Point = new Phaser.Point();
                if (distance <= petard.explosionRadius) {
                    this.game.physics.arcade.velocityFromRotation(
                        this.game.physics.arcade.angleBetween(petard, this.player),
                        petard.explosionPower/2 * (1 - distance/petard.explosionRadius) + petard.explosionPower/2,
                        velocityAdjust
                    );
                    this.player.body.velocity.x += velocityAdjust.x;
                    this.player.body.velocity.y += velocityAdjust.y;
                }
            });
        });
    }

    public update(): void {
        this.game.physics.arcade.collide(this.petardGroup);
        this.game.physics.arcade.collide(this.player, this.petardGroup);

        let allCursorsUp: boolean = true;

        if (this.cursors.down.isDown) {
            this.player.body.velocity.y += 150;
            allCursorsUp = false;
        }
        if (this.cursors.up.isDown) {
            this.player.body.velocity.y += -150;
            allCursorsUp = false;
        }
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x += -150;
            allCursorsUp = false;
        }
        if (this.cursors.right.isDown) {
            this.player.body.velocity.x += 150;
            allCursorsUp = false;
        }
        // if (allCursorsUp) {
        //     this.player.body.acceleration.setTo(0,0);
        // }
    }

}
