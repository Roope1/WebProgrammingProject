class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2")
    }

    preload() {
        // images and sprites
        this.load.image("groundBlock", "./assets/images/Ground_SMB.png") // TODO: change to something copyright free
        this.load.spritesheet("player", "./assets/sprites/player_sprite.png", { frameWidth: 35, frameHeight: 60 })
        this.load.image("enemy", "./assets/images/goomba.jpg")

        //sounds
        this.load.audio("walk", "./assets/sounds/walk.mp3")
        this.load.audio("gameOver", "./assets/sounds/failure-2-89169.mp3")
        this.load.audio("jump", "./assets/sounds/cartoon-jump-6462.mp3")
        this.load.audio("background", "./assets/sounds/cottagecore-17463.mp3")

    }

    create() {
        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        })

        this.enemyGroup = this.physics.add.group({
            allowGravity: true
        })

        // add ground
        addPlatform(25, 0, game.config.height / 1.2, "groundBlock", this)


        // TODO: add platforms to climb up on


        // colliders between enemy and ground
        this.physics.add.collider(this.enemyGroup, this.groundGroup)

        // adding player to the scene
        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "player")

        this.player.body.gravity.y = gameOptions.gravity
        // TODO: change to ground floating downward

        this.physics.add.collider(this.player, this.groundGroup)
        this.physics.add.overlap(this.player, this.enemyGroup, this.checkHit, null, this)

        // get keyboard inputs
        this.cursors = this.input.keyboard.createCursorKeys()

        // playerAnimations
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
        })

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", { start: 3, end: 4 })
        })

        this.anims.create({
            key: "still",
            frames: [{ key: "player", frame: 2 }],
        })

        // camera should follow player on y-axis
        this.cameras.main.startFollow(this.player, true, 0, 1, 0, 30)

        // get volume from sessionStorage
        this.volume = sessionStorage.getItem("volume")

        // adding sounds
        this.walk = this.sound.add("walk", { volume: 0.7 * this.volume })
        this.jump = this.sound.add("jump", { volume: 0.3 * this.volume })
        this.gameOver = this.sound.add("gameOver", { volume: 0.2 * this.volume })
        this.ambient = this.sound.add("background", { volume: 0.5 * this.volume })
        this.ambient.play()

        // back to menu on esc pressed
        this.input.keyboard.on("keydown-ESC", (event) => { this.scene.start("Menu") }, this)

        // "score"
        this.scoreText = this.add.text(32, 32, `Score: ${this.score}`, { fill: "#fff" })
        this.scoreText.scrollFactorX = 0
        this.scoreText.scrollFactorY = 0

        this.startTime = Date.now()
        this.startScore = sessionStorage.getItem("score")
    }

    update() {
        // Adjusting score to be removed 1 per second (not per frame)
        this.score = this.startScore - (Math.floor((Date.now() - this.startTime) / 1000))
        this.scoreText.setText(`Score: ${this.score}`)


        // player movement
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

        if (moveDir != 0 && !this.walk.isPlaying && this.player.body.touching.down) {
            this.walk.play()
        }

        // moving the actual player
        this.player.body.velocity.x = gameOptions.playerSpeed * moveDir

        // Player jumping 
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = - gameOptions.jumpForce;
            this.jump.play()
        }

        // kill player if its off the bottom of the screen
        if (this.player.y > game.config.height) {
            killPlayer()
        }


    }
}