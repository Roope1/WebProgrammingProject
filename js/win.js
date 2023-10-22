class Win extends Phaser.Scene {
    constructor() {
        super("Win")
    }

    preload() {
        this.load.image("tauno", "./assets/images/tauno.png")
    }

    create() {
        
        // background rectangle
        const infoBg = this.add.rectangle(game.config.width / 2, game.config.height / 2, game.config.width / 2, game.config.height / 1.2, 0x5b5df5)

        // Congratulations text
        this.add.text(game.config.width / 2, 50, "Congratulations!", {fontSize: "24px"}).setOrigin(0.5)

        // Score 
        this.score = sessionStorage.getItem("score")
        this.add.text(game.config.width / 2, 100, "Your score: " + this.score, {fontSize: "32px"}).setOrigin(0.5)
        
        // High score
        this.highScore = sessionStorage.getItem("highscore") ?? 0;
        this.add.text(game.config.width / 2, 130, "High score: " + this.highScore).setOrigin(0.5)

        
        // update highscore if neccessary
        if ( this.score > this.highScore) {
            sessionStorage.setItem("highscore", this.score);
            this.add.text(game.config.width / 2, 160, "New high score!", {fontSize: "24px"}).setOrigin(0.5)
        }


        // image of tauno in the bottom right corner
        this.character =  this.add.image(550, 300,"tauno")
        this.character.scale = 2


        // Back to menu button
        const backBtnBg = this.add.rectangle(game.config.width / 2, game.config.height / 1.2, 150, 40, 0x666666)
        const backText = this.add.text(game.config.width / 2, game.config.height / 1.2, "Back to menu"). setOrigin(0.5)

        backBtnBg.setInteractive();
        backBtnBg.on('pointerup', () => {
            this.scene.start("Menu")
        })

    }

}
