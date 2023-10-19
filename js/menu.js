class Menu extends Phaser.Scene {

    preload() {
        this.load.image("volumeOn", "./assets/images/volumeOn.png")
        this.load.image("volumeOff", "./assets/images/volumeOff.png")
    }

    create() {
        const level1Btn = this.add.text(100, 100, "Play", { fill: "#fff"})
        level1Btn.setInteractive();

        level1Btn.on('pointerup', () => {
            console.log("Loading level 1")
            this.scene.start("Level1")
        })
        
        const volume = this.add.image(game.config.width - 50, game.config.height - 50, "volumeOn")
        volume.scale = 0.1
        volume.setInteractive();
        
        sessionStorage.setItem("volume", 1)


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