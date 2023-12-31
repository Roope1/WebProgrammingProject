let game;

const gameOptions = {
    gravity: 800,
    playerSpeed: 300,
    jumpForce: 500,
}


window.onload = () => {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: "#2222FF",
        scale: {
            mode: Phaser.Scale.NONE,
            width: 800,
            height: 400,
        },
        pixelArt: true,
        physics: {
            default: "arcade",
        },
        scene: [
            Menu,
            Level1,  // TODO: add menu back before submitting
            Level2,
            Win,
        ],
        parent: "game"
    }

    game = new Phaser.Game(gameConfig)
    window.focus();
}


