function Spawn_Enemy () {
    Move = 0
    EnemyY = -1
    EnemyX = randint(0, 4)
    led.plotBrightness(EnemyX, EnemyY, 255)
    Enemy_Dead = 0
}
function Kill_Enemy () {
    led.unplot(EnemyX, EnemyY)
}
input.onButtonPressed(Button.A, function () {
    led.unplot(x, y)
    x += -1
    if (x < 0) {
        x = 0
    }
    led.plotBrightness(x, y, 10)
})
input.onButtonPressed(Button.B, function () {
    led.unplot(x, y)
    x += 1
    if (x > 4) {
        x = 4
    }
    led.plotBrightness(x, y, 10)
})
function A_Bot () {
    // if EnemyY == y:
    // if EnemyX > x and x < 4:
    // led.unplot(x, y)
    // x += 1
    // led.plot_brightness(x, y, 255)
    // elif EnemyX < x and x > 0:
    // # Move left if the enemy is to the left
    // led.unplot(x, y)
    // x += 0 - 1
    // led.plot_brightness(x, y, 255)
    // elif EnemyX == x:
    // # If the enemy is directly above the player, randomly move left or right
    // Move = randint(0, 1)
    // if Move == 1 and x < 4:
    // led.unplot(x, y)
    // x += 1
    // led.plot_brightness(x, y, 255)
    // elif Move == 0 and x > 0:
    // led.unplot(x, y)
    // x += 0 - 1
    // led.plot_brightness(x, y, 255)
    if (EnemyY == y) {
        if (x >= 4) {
            led.unplot(x, y)
            x += 1
            led.plotBrightness(x, y, 255)
        }
        if (x <= 0) {
            led.unplot(x, y)
            x += -1
            led.plotBrightness(x, y, 255)
        } else {
            led.unplot(x, y)
            Autobot = randint(0, 1)
            if (Autobot == 0) {
                x += 1
            }
            if (Autobot == 1) {
                x += -1
            }
            led.plotBrightness(x, y, 255)
        }
    }
}
input.onGesture(Gesture.Shake, function () {
    if (AutoWin == 0) {
        AutoWin = 1
        basic.showString("" + AutoWin)
    }
    if (AutoWin == 1) {
        AutoWin = 0
        basic.showString("" + AutoWin)
    }
})
function Move_Enemy () {
    led.unplot(EnemyX, EnemyY)
    EnemyY += 1
    if (EnemyY <= 4) {
        led.plotBrightness(EnemyX, EnemyY, 255)
    }
}
let Score = 0
let Autobot = 0
let Enemy_Dead = 0
let EnemyX = 0
let EnemyY = 0
let Move = 0
let y = 0
let x = 0
let AutoWin = 0
AutoWin = 0
let Speed = 500
x = 2
y = 4
led.plotBrightness(x, y, 10)
Spawn_Enemy()
basic.forever(function () {
    if (EnemyY >= 4) {
        Kill_Enemy()
        Enemy_Dead = 1
        Spawn_Enemy()
    }
    if (Enemy_Dead != 1) {
        Move_Enemy()
    }
    if (EnemyX == x && EnemyY == y) {
        led.unplot(x, y)
        game.gameOver()
    } else if (EnemyX == 4 && EnemyY != y) {
        Score += 1
    }
    game.setScore(Score)
    if (Score >= 10 && Score < 15) {
        Speed = 400
    }
    if (Score >= 15 && Score < 20) {
        Speed = 300
    }
    if (Score >= 20 && Score < 30) {
        Speed = 200
    }
    if (Score >= 30 && Score < 40) {
        Speed = 100
    }
    if (Score >= 30 && Score < 80) {
        Speed = randint(50, 500)
    }
    if (Score >= 80) {
        Speed = 1
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
    if (AutoWin == 1) {
        A_Bot()
    }
    basic.pause(Speed)
})
