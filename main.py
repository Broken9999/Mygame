def Spawn_Enemy():
    global Move, EnemyY, EnemyX, Enemy_Dead
    Move = 0
    EnemyY = -1
    EnemyX = randint(0, 4)
    led.plot_brightness(EnemyX, EnemyY, 255)
    Enemy_Dead = 0
    
def Kill_Enemy():
    led.unplot(EnemyX, EnemyY)

def on_button_pressed_a():
    global x
    led.unplot(x, y)
    x += -1
    if x < 0:
        x = 0
    led.plot_brightness(x, y, 10)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global x
    led.unplot(x, y)
    x += 1
    if x > 4:
        x = 4
    led.plot_brightness(x, y, 10)
input.on_button_pressed(Button.B, on_button_pressed_b)

def A_Bot():
    global x, Autobot
    # if EnemyY == y:
    # if EnemyX > x and x < 4:
    # led.unplot(x, y)
    # x += 1
    # led.plot_brightness(x, y, 255)
    # elif EnemyX < x and x > 0:
    # # Move left if the enemy is to the left
    # led.unplot(x, y)
    # x += 0 - 1
    # led.plot_brightness(x, y, 255)
    # elif EnemyX == x:
    # # If the enemy is directly above the player, randomly move left or right
    # Move = randint(0, 1)
    # if Move == 1 and x < 4:
    # led.unplot(x, y)
    # x += 1
    # led.plot_brightness(x, y, 255)
    # elif Move == 0 and x > 0:
    # led.unplot(x, y)
    # x += 0 - 1
    # led.plot_brightness(x, y, 255)
    if EnemyY == y:
        if x >= 4:
            led.unplot(x, y)
            x += 1
            led.plot_brightness(x, y, 255)
        if x <= 0:
            led.unplot(x, y)
            x += -1
            led.plot_brightness(x, y, 255)
        else:
            led.unplot(x, y)
            Autobot = randint(0, 1)
            if Autobot == 0:
                x += 1
            if Autobot == 1:
                x += -1
            led.plot_brightness(x, y, 255)

def on_gesture_shake():
    global AutoWin
    if AutoWin == 0:
        AutoWin = 1
        basic.show_string("" + str((AutoWin)))
    if AutoWin == 1:
        AutoWin = 0
        basic.show_string("" + str((AutoWin)))
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def Move_Enemy():
    global EnemyY
    led.unplot(EnemyX, EnemyY)
    EnemyY += 1
    if EnemyY <= 4:
        led.plot_brightness(EnemyX, EnemyY, 255)
Autobot = 0
Enemy_Dead = 0
EnemyX = 0
EnemyY = 0
Move = 0
y = 0
x = 0
AutoWin = 0
Score = 0
AutoWin = 0
Speed = 500
x = 2
y = 4
led.plot_brightness(x, y, 10)
Spawn_Enemy()

def on_forever():
    global Enemy_Dead, Score, Speed
    if EnemyY >= 4:
        Kill_Enemy()
        Enemy_Dead = 1
        Spawn_Enemy()
    if Enemy_Dead != 1:
        Move_Enemy()
    if EnemyX == x and EnemyY == y:
        led.unplot(x, y)
        game.game_over()
    elif EnemyX == 4 and EnemyY != y:
        Score += 1
    game.set_score(Score)
    if Score >= 10 and Score < 15:
        Speed = 400
    if Score >= 15 and Score < 20:
        Speed = 300
    if Score >= 20 and Score < 30:
        Speed = 200
    if Score >= 30 and Score < 40:
        Speed = 100
    if Score >= 30 and Score < 80:
        Speed = randint(50, 500)
    if Score >= 80:
        Speed = 1
        basic.show_leds("""
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            """)
    if AutoWin == 1:
        A_Bot()
    basic.pause(Speed)
basic.forever(on_forever)
