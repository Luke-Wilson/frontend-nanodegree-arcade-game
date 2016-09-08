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
    
    if ((this.x > player.x - 60 && this.x < player.x + 80) && this.y === player.y) {
        Player.prototype.reset(player)
        Player.prototype.adjustScore(-100);
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
            Player.prototype.adjustScore(10)
        }
    }

    if (this.x === gem.x && this.y === gem.y) {
        gem.hideGem();  
        Player.prototype.adjustScore(50);
    }
}

Player.prototype.adjustScore = function(adjustBy) {
    score += adjustBy;
    console.log("score = " + score);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
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
};


// create Gem class for collectible gems for more cash
var Gem = function(x, y) {
    this.sprite = 'images/Gem Blue.png'
    this.x = Gem.prototype.randomX();
    this.y = Gem.prototype.randomY();
    this.counter = 0;
    this.cashValue = 0;
};

Gem.prototype.update = function() {
    this.counter++;
    if (this.counter > 200) {
        gem.hideGem();    
    }
    if (this.counter === 0) {
        this.x = Gem.prototype.randomX();
        this.y = Gem.prototype.randomY();
    }
};

Gem.prototype.hideGem = function() {
    this.x = -100;
    this.y = -100;
    this.counter = -100;
}

Gem.prototype.randomX = function() {
    var array = [0,100,200,300,400]
    var rand = Math.random()*4;
    rand = Math.floor(rand);
    return array[rand];
};

Gem.prototype.randomY = function() {
    var array = [60,145,230,315];
    var rand = Math.random()*3;
    rand = Math.floor(rand);
    return array[rand];
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var score = 0;
var gem = new Gem();
var e1 = new Enemy(-100,60,2);
var e2 = new Enemy(-100,145,5)
var e3 = new Enemy(-100,230,3)
var e4 = new Enemy(-100,60,4);
var allEnemies = [e1, e2, e3, e4];


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
