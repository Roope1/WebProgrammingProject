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
        this.load.image("player", "./assets/images/8Bit_Mario.webp")
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
        this.player = this.physics.add.image(game.config.width / 2, game.config.height / 2, "player")
        this.player.scale = 0.1
        this.player.body.gravity.y = gameOptions.gravity

        this.physics.add.collider(this.player, this.groundGroup)

        // get keyboard inputs
        this.cursors = this.input.keyboard.createCursorKeys()

    }

    update() {

        // Movement
        // TODO: Add somekind of lerp so the player movement start isn't so abrupt

        // NOTE: move directions are from the perspective of the ground (player moves left -> ground needs to move right)
        let moveDir = 0;
        if (this.cursors.left.isDown) {
            moveDir = 1;
        } else if (this.cursors.right.isDown) {
            moveDir = -1;
        }
        
        // HACK: moving ground instead of making level scrollable (maybe FIXME?)
        this.groundGroup.setVelocityX(moveDir * gameOptions.playerSpeed)
    
    }
}