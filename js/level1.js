class Level1 extends Phaser.Scene {

    constructor() {
        super("Level1")
    }

    preload() {
        this.load.image("groundBlock", "./assets/images/Ground_SMB.png") // TODO: change to something copyright free
        this.load.spritesheet("player", "./assets/sprites/player_sprite.png", {frameWidth: 35, frameHeight: 60})
        this.load.image("enemy", "./assets/images/goomba.jpg")
    }

    create() {
        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        })

        this.enemyGroup = this.physics.add.group({
            allowGravity: true
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

        // adding enemies
        addEnemy(800, game.config.height / 2, "enemy", gameOptions.gravity, this)
        
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


        // enemies should always be moving left
        this.enemyGroup.setVelocityX(-100)

    }

    checkHit(player, enemy) {
        // player needs to hit the enemy from top to kill enemy, otherwise player dies
        // FIXME: anything that touches the top of an enemy kills it, not just the player
        if (enemy.body.touching.up) {
            console.log("enemy died")
            enemy.disableBody(true, true)
        } else {
            this.scene.start("Level1")
        }

    }
   

}