// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x+1*this.speed);
    if (this.x > 550) this.x = -100;
    
    if ((this.x > player.x -80 && this.x < player.x + 80) && this.y === player.y) {
        Player.prototype.reset(player);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200; 
    this.y = 400;
}

Player.prototype.reset = function(character) {
    character.x = 200;
    character.y = 400;
}

Player.prototype.update = function(x, y) {
    if ( x != undefined) {
        this.x = this.x + x;
        if (this.x < 0) { //sets left limit
            this.x = 0;
        }
        if (this.x > 400) { //sets right limit
            this.x = 400;
        }
    }
    if ( y != undefined) {
        this.y = this.y + y;
        if (this.y > 400 ) {
            this.y = 400;
        }
        if (this.y < -25) {
            Player.prototype.reset(this);
        }
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    console.log(allowedKeys);
    if (allowedKeys === 'up') {
        Player.prototype.update.call(this, 0, -85);
    } else if (allowedKeys === 'down') {
        Player.prototype.update.call(this, 0, 85);
    } else if (allowedKeys === 'left') {
        Player.prototype.update.call(this, -100, 0);
    } else if (allowedKeys === 'right') {
        Player.prototype.update.call(this, 100, 0);
    } else {
        Player.prototype.update.call(this, 0, 0);
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
console.log(player);
var e1 = new Enemy(-100,60,2);
var e2 = new Enemy(-100,145,3)
var e3 = new Enemy(-100,230,1)
var allEnemies = [e1, e2, e3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
