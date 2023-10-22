class Menu extends Phaser.Scene {

    constructor() {
        super("Menu")
    }

    preload() {
        this.load.image("volumeOn", "./assets/images/volumeOn.png")
        this.load.image("volumeOff", "./assets/images/volumeOff.png")
        this.load.image("tauno", "./assets/images/tauno.png")
    }

    create() {
        // title stuff
        this.titleStyle = {
            fontFamily: "Verdana",
            fontSize: "68px"
        }

        this.add.text(32, 32, "Taunos adventure", this.titleStyle)

        // image of tauno
        this.character = this.add.image(100, 200, "tauno")
        this.character.scale = 2

        // play button style
        this.playButtonStyle = {
            fontFamily: "Verdana",
            fontSize: "40px"
        }

        const level1Btn = this.add.text(game.config.width / 3, game.config.height / 1.3, "Start Game", this.playButtonStyle)
        level1Btn.setInteractive();

        level1Btn.on('pointerup', () => {
            console.log("Loading level 1")
            this.scene.start("Level1")
        })
        
        const volume = this.add.image(game.config.width - 50, game.config.height - 50, "volumeOn")
        volume.scale = 0.1
        volume.setInteractive();
        
        sessionStorage.setItem("volume", 1)

        // stop all audio in menu to stop the bg music from playing multiple times
        this.game.sound.stopAll()

        volume.on('pointerup', () => {
            if (sessionStorage.getItem("volume") == 0) {
                sessionStorage.setItem("volume", 1)
                volume.setTexture("volumeOn")
            }
            else {
                sessionStorage.setItem("volume", 0)
                volume.setTexture("volumeOff")
            }
        })
    }
}