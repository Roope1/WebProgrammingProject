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
            mode: Phaser.Scale.FIT,
            width: 800,
            height: 400,
        },
        pixelArt: true,
        physics: {
            default: "arcade",
        },
        scene: [
            Level1  // TODO: add menu back before submitting
        ]
    }

    game = new Phaser.Game(gameConfig)
    window.focus();
}


