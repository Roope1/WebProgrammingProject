class Level1 extends Phaser.Scene {

    preload() {
        this.load.image("groundBlock", "./assets/images/Ground_SMB.png") // TODO: change to something copyright free
        this.load.spritesheet("player", "./assets/sprites/player_sprite.png", {frameWidth: 35, frameHeight: 60})
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

        // adding platforms to the game
        // TODO: different texture for these
        addPlatform(3, 300, game.config.height / 2, "groundBlock", this)

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

        this.cameras.main.startFollow(this.player, true, 0.1, 0, 0, 30)

    }

    update() {

        // Movement
        // TODO: Add somekind of lerp so the player movement start isn't so abrupt

        let moveDir = 0;
        if (this.cursors.left.isDown) {
            moveDir = -1;
            this.player.anims.play("left", true)
        } else if (this.cursors.right.isDown) {
            moveDir = 1;
            this.player.anims.play("right", true)
        } else {
            this.player.anims.play("still", true)
        }
       
        // moving the actual player
        this.player.body.velocity.x = gameOptions.playerSpeed * moveDir
        
        // Player jumping 
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = - gameOptions.jumpForce;
        }

    }

   

}