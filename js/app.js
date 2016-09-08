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
    this.x = (this.x+1)*dt;
    if (this.y === player.y && this.x === player.x) { 
        return; 
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 1; 
    this.y = 1;
}

Player.prototype.update = function(x, y, dt) {
    this.x = this.x + x;
    this.y = this.y + y;
    console.log(this.x + " " + this.y);
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    console.log(allowedKeys);
    if (allowedKeys === 'up') {
        Player.prototype.update.call(this, 0, 1)
    } else if (allowedKeys === 'down') {
        Player.prototype.update.call(this, 0, -1)
    } else if (allowedKeys === 'left') {
        Player.prototype.update.call(this, -1, 0)
    } else if (allowedKeys === 'right') {
        Player.prototype.update.call(this, 1, 0)
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
console.log(player);
var allEnemies = [
    new Enemy(1,2,1),
    new Enemy(2,4,1),
    new Enemy(2,3,2)
];


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
