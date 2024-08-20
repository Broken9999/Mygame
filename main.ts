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
    led.plotBrightness(x, y, 255)
})
input.onButtonPressed(Button.B, function () {
    led.unplot(x, y)
    x += 1
    if (x > 4) {
        x = 4
    }
    led.plotBrightness(x, y, 255)
})
function A_Bot () {
    if (EnemyY == y) {
        Move = randint(0, 1)
    }
    if (Move == 1) {
        if (y != 4) {
            led.unplot(x, y)
            x += 1
            if (x > 4) {
                x = 4
            }
            led.plotBrightness(x, y, 255)
        } else {
            led.unplot(x, y)
            x += -1
            if (x < 0) {
                x = 0
            }
            led.plotBrightness(x, y, 255)
        }
    } else if (Move == 0) {
        if (y != 0) {
            led.unplot(x, y)
            x += -1
            if (x < 0) {
                x = 0
            }
            led.plotBrightness(x, y, 255)
        } else {
            led.unplot(x, y)
            x += 1
            if (x > 4) {
                x = 4
            }
            led.plotBrightness(x, y, 255)
        }
    }
}
input.onGesture(Gesture.Shake, function () {
	
})
function Move_Enemy () {
    led.unplot(EnemyX, EnemyY)
    EnemyY += 1
    if (EnemyY <= 4) {
        led.plotBrightness(EnemyX, EnemyY, 255)
    }
}
let Score = 0
let Enemy_Dead = 0
let EnemyX = 0
let EnemyY = 0
let Move = 0
let y = 0
let x = 0
let Speed = 500
x = 2
y = 4
led.plot(x, y)
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
    if (Score >= 30 && Score < 40) {
        Speed = randint(50, 500)
    }
    if (Score > 50) {
        Speed = 1
    }
    basic.pause(Speed)
})
basic.forever(function () {
	
})
