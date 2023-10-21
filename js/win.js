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
        this.score = sessionStorage.getItem("score")
        this.add.text(200, 200, "your score: " + this.score)
        this.highScore = sessionStorage.getItem("highscore") ?? 0;

        this.add.text(200, 250, "high score: " + this.highScore)

        if ( this.score > this.highScore) {
            sessionStorage.setItem("highscore", this.score);
            this.add.text(200, 300, "New high score!")
        }

    }

}
