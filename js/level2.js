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

    create(){

    }

    update(){

    }
}