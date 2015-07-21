// Enemies our player must avoid
var Enemy = function(enemyX,enemyY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = enemyX;
    this.y = enemyY;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x >= 500) {
        this.x = -50;
        this.randomSpeed();
    }

    var enemyLeftXRange = this.x -50;
    var enemyRightXRange = this.x +50;
    var enemyTopYRange = this.y -50;
    var enemyBottomYRange =this.y +50;
    if (player.x > enemyLeftXRange && player.x < enemyRightXRange && player.y > enemyTopYRange && player.y < enemyBottomYRange) {
    player.resetPlayerPosition();
}


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.randomSpeed = function() {
    var speedMultiplier = Math.floor(Math.random() * 5 + 1);
    this.speed = 75 * speedMultiplier;
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var playerStartX = 200;
var playerStartY = 400;

var Player = function() {
    this.x = playerStartX;
    this.y = playerStartY;
    this.boundaryChecker = {
        leftBoundary: false,
        rightBoundary: false,
        bottomBoundary: true
    };
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(){

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.resetPlayerPosition = function() {
    this.x = playerStartX;
    this.y = playerStartY;
    this.resetCheckPosition();
}
Player.prototype.handleInput = function(playerControls) {
    var stepHorizontalLength = 100;
    var stepVerticalLength = 90;
    this.checkPosition();

    if (playerControls === 'left') {
        if (this.boundaryChecker.leftBoundary) {
            return null;
        }
        this.x -= stepHorizontalLength;
    } else if (playerControls === 'right') {
        if (this.boundaryChecker.rightBoundary) {
            return null;
        }
        this.x += stepHorizontalLength;
    } else if (playerControls === 'up') {
        if (this.y === 40)  {
            this.resetPlayerPosition();
            return  null;
        }
        this.y -= stepVerticalLength;
    } else if (playerControls=== 'down') {
        if (this.boundaryChecker.bottomBoundary) {
            return null;
        }
        this.y += stepVerticalLength;
    } else {
        return null;
    }
}

Player.prototype.checkPosition = function () {
    // body...
    if (this.x === 0) {
        this.setHorizontalBoundaryCheckerState(true, false);
    } else if (this.x === 400) {
        this.setHorizontalBoundaryCheckerState(false, true);
    } else {
        this.setHorizontalBoundaryCheckerState(false, false);
    }
    if (this.y === 400) {
        this.boundaryChecker.bottomBoundary = true;
    } else {
        this.boundaryChecker.bottomBoundary = false;
    }
}

Player.prototype.resetCheckPosition = function() {
    this.setHorizontalBoundaryCheckerState(false, false);
    this.boundaryChecker.bottomBoundary = true;
}

Player.prototype.setHorizontalBoundaryCheckerState = function (leftBoundaryState,rightBoundaryState) {
    this.boundaryChecker.leftBoundary = leftBoundaryState;
    this.boundaryChecker.rightBoundary = rightBoundaryState;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for (var i = 0; i < 3; i++) {
    var tempSpeed = Math.floor(Math.random() * 5 + 1) *75;
    allEnemies.push(new Enemy(-60, 60 + 85 * i, tempSpeed));
}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var playerControls = allowedKeys[e.keyCode];
    player.handleInput(playerControls);
});
