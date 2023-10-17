class Menu extends Phaser.Scene {

    helpActive = false;

    create() {
        const level1Btn = this.add.text(100, 100, "Play", { fill: "#fff"})
        level1Btn.setInteractive();
        const helpBtn = this.add.text(100, 140, "Help")
        helpBtn.setInteractive();

        level1Btn.on('pointerup', () => {
            console.log("Loading level 1")
            this.scene.start("Level1")
        })

        helpBtn.on('pointerup', () => {
            console.log("Showing help")
            this.helpActive = true
        })
    }

    update() {
        if (this.helpActive) {
            // show help screen with button to disable it 
        }
    }

}