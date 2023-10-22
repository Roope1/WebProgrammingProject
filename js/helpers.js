const addPlatform = (width, startPosX, posY, texture, object) => {
    for (let i = 0; i < width; i++) {
        let block = object.groundGroup.create(startPosX + (i * 36), posY, texture)
    }
    console.log("added platform")
}

const addEnemy = (posX, posY, texture, gravity, object) => {
    let enemy = object.enemyGroup.create(posX, posY, texture)
    enemy.scale = 0.2

    enemy.setGravityY(gravity)

    return enemy
}

const killPlayer = (object) => {
    // some kind of death animation
    object.ambient.stop()
    object.gameOver.play()

    object.scene.start("Level1")
}
