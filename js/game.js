let game;

const gameOptions = {
    gravity: 800,
    playerSpeed: 300,

}


window.onload = () => {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: "#2222FF",
        scale: {
            mode: Phaser.Scale.FIT,
            width: 800,
            height: 400,
        },
        pixelArt: true,
        physics: {
            default: "arcade",
        },
        scene: Main
    }

    game = new Phaser.Game(gameConfig)
    window.focus();
}


class Main extends Phaser.Scene {

    preload() {
        this.load.image("groundBlock", "./assets/images/Ground_SMB.png") // TODO: change to something copyright free
        this.load.spritesheet("player", "./assets/sprites/player_sprite_fixed.png", {frameWidth: 35, frameHeight: 60})
    }

    create() {
        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        })

        // creating the ground layer
        for (let i = 0; i < 40; i++){
            for (let j = 0; j < 4; j++){
                let block = this.groundGroup.create(36 * i , game.config.height / 1.2 + (36 * j), "groundBlock")
                block.scale = 0.1

            }
        }

        // adding player to the scene
        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "player")
       
        this.player.body.gravity.y = gameOptions.gravity

        this.physics.add.collider(this.player, this.groundGroup)

        // get keyboard inputs
        this.cursors = this.input.keyboard.createCursorKeys()

        // playerAnimations
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", {start: 0, end: 1}),
        })

        this.anims.create({
            key:"right",
            frames: this.anims.generateFrameNumbers("player", {start: 3, end: 4})
        })

        this.anims.create({
            key: "still",
            frames: [{key: "player", frame: 2}],
        })

    }

    update() {

        // Movement
        // TODO: Add somekind of lerp so the player movement start isn't so abrupt

        // NOTE: move directions are from the perspective of the ground (player moves left -> ground needs to move right)
        let moveDir = 0;
        if (this.cursors.left.isDown) {
            moveDir = 1;
            this.player.anims.play("left", true)
        } else if (this.cursors.right.isDown) {
            moveDir = -1;
            this.player.anims.play("right", true)
        } else {
            this.player.anims.play("still", true)
        }
        
        // HACK: moving ground instead of making level scrollable (maybe FIXME?)
        this.groundGroup.setVelocityX(moveDir * gameOptions.playerSpeed)
    
    }
}