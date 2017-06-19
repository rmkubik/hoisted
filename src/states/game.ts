import Player from '../prefabs/player';
import Petard from '../prefabs/petard';
import Tile from '../prefabs/tile';
import LevelData from '../prefabs/levelData';
import * as Assets from '../assets';

export default class Game extends Phaser.State {

    private cursors: any;
    private player: Player;
    private petardGroup: Phaser.Group;
    private tileGroup: Phaser.Group;
    private spaceKey: Phaser.Key;


    public create(): void {
        let backgroundTemplateSprite: Phaser.Sprite = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            Assets.Images.ImagesBackgroundTemplate.getName()
        );
        backgroundTemplateSprite.anchor.setTo(0.5);

        this.tileGroup = this.createTileGroup(Assets.JSON.JsonLevel1.getName());

        this.player = new Player(this.game, new Phaser.Point(20, 20));
        this.game.add.existing(this.player);
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.petardGroup = new Phaser.Group(this.game);
        // this.petardGroup.enableBody = true;
        // this.petardGroup.physicsBodyType = Phaser.Physics.ARCADE;

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

    private createTileGroup(levelKey: string): Phaser.Group {
        let level: LevelData = this.game.cache.getJSON(levelKey);
        let tileGroup: Phaser.Group = new Phaser.Group(this.game);
        for (let row: number = 0; row < level.height; row++) {
            for (let col: number = 0; col < level.width; col++) {
                switch (level.data[(row * level.width) + col]) {
                    case 0:

                        break;
                    case 1:
                        tileGroup.add(
                            new Tile(
                                this.game,
                                new Phaser.Point(
                                    col * level.tile_size,
                                    row * level.tile_size
                                )
                            )
                        )
                        break;
                    default:
                        console.warn(`Invalid tile id at row: ${row}, col: ${col}`);
                        break;
                }
            }
        }
        return tileGroup;
    }

    public update(): void {
        this.game.physics.arcade.collide(this.petardGroup);
        this.game.physics.arcade.collide(this.player, this.petardGroup);
        this.game.physics.arcade.collide(this.player, this.tileGroup);
        this.game.physics.arcade.collide(this.tileGroup, this.petardGroup);

        if (this.spaceKey.isDown) {
            this.petardGroup.forEachAlive((petard) => {
                petard.onExplode.dispatch(petard);
            })
        }
    }

}
