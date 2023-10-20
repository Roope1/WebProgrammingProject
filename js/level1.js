class Level1 extends Phaser.Scene {

    constructor() {
        super("Level1")
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

        this.createGround()

        // adding platforms to the game
        // start platform
        addPlatform(3, 540, game.config.height / 2, "groundBlock", this)

        // mid level "ramp"
        for (let i = 0; i < 4; i++) {
            addPlatform(4 - i, 1298 + (i * 36), game.config.height / 1.2 - ((i + 1) * 36), "groundBlock", this)
        }

        // platfroms on top of big hole
        addPlatform(3, 2748, game.config.height / 2, "groundBlock", this)

        // adding enemies
        addEnemy(1000, game.config.height * 2 / 3, "enemy", gameOptions.gravity, this)
        addEnemy(1060, game.config.height * 2 / 3, "enemy", gameOptions.gravity, this)
        addEnemy(1120, game.config.height * 2 / 3, "enemy", gameOptions.gravity, this)


        // colliders between enemy and ground
        this.physics.add.collider(this.enemyGroup, this.groundGroup)

        // adding player to the scene
        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "player")

        this.player.body.gravity.y = gameOptions.gravity

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

        // camera should follow player on x-axis
        this.cameras.main.startFollow(this.player, true, 1, 0, 0, 30)

        // enemies should always be moving left
        this.enemyGroup.setVelocityX(-100)


        // get volume from sessionStorage
        this.volume = sessionStorage.getItem("volume")

        // adding sounds
        this.walk = this.sound.add("walk", {volume: 0.7 * this.volume})
        this.jump = this.sound.add("jump", {volume: 0.3 * this.volume})
        this.gameOver = this.sound.add("gameOver", {volume: 0.2 * this.volume})
        this.ambient = this.sound.add("background", {volume: 0.5 * this.volume})
        this.ambient.play()

        // back to menu on esc pressed
        this.input.keyboard.on("keydown-ESC",(event) => { this.scene.start("Menu")}, this)

        // "score"
        this.score = 300
        this.scoreText = this.add.text(32 , 32, `Score: ${this.score}`, {fill: "#fff"})
        this.scoreText.scrollFactorX = 0
        this.scoreText.scrollFactorY = 0

        this.startTime = Date.now()
        this.startScore = 300;
    }
    
    update() {
     
        // Adjusting score to be removed 1 per second (not per frame)
        this.score = this.startScore - (Math.floor((Date.now() - this.startTime) / 1000))
        this.scoreText.setText(`Score: ${this.score}`)

        // Movement
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
            this.killPlayer()
        }

        if (!this.wave2Spawned && this.player.x > 1700) {
            console.log("spawning wave 2 of enemies")
            this.wave2Spawned = true;

            addEnemy(2400, game.config.height * 2 / 3, "enemy", gameOptions.gravity, this)
            addEnemy(2450, game.config.height * 2 / 3, "enemy", gameOptions.gravity, this)
            addEnemy(2500, game.config.height * 2 / 3, "enemy", gameOptions.gravity, this)
            this.enemyGroup.setVelocityX(-100)
        }

        if (!this.wave3Spawned && this.player.x > 3016) {
            console.log("spawning wave 3 of enemies")
            this.wave3Spawned = true;

            addEnemy(3600, game.config.height * 2 / 3, "enemy", gameOptions.gravity, this)
            addEnemy(3700, game.config.height * 2 / 3, "enemy", gameOptions.gravity, this)
            this.enemyGroup.setVelocityX(-100)
        }
    }

    checkHit(player, enemy) {
        // player needs to hit the enemy from top to kill enemy, otherwise player dies
        // FIXME: anything that touches the top of an enemy kills it, not just the player
        if (enemy.body.touching.up) {
            console.log("enemy died")
            enemy.disableBody(true, true)
            // player should bounce on kill
            player.body.velocity.y = - gameOptions.jumpForce * 0.7
        } else {
            this.killPlayer()
        }
    }

    killPlayer() {
        // some kind of death animation
        this.ambient.stop()
        this.gameOver.play()

        this.scene.start("Level1")
    }


    createGround() {
        // creating the ground layer part 1 (before hole)
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 4; j++) {
                let block = this.groundGroup.create(36 * i, game.config.height / 1.2 + (36 * j), "groundBlock")
                block.scale = 0.1
            }
        }

        // creating ground layer part 2 (between holes)
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 4; j++) {
                let block = this.groundGroup.create(1700 + 36 * i, game.config.height / 1.2 + (36 * j), "groundBlock")
                block.scale = 0.1
            }
        }

        // creating ground layer part 3 (final part)
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 4; j++) {
                let block = this.groundGroup.create(3016 + 36 * i, game.config.height / 1.2 + (36 * j), "groundBlock")
                block.scale = 0.1
            }
        }
    }
}