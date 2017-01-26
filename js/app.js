//Create array of enemy positions at y coordinate
var positions = [80, 100, 200];

// This is a superclass Character
// Our enemy and player delegate to this class when their lookups fail

var Character = function(img, x, y) {
    this.x = x;
    this.y = y;
    this.sprite = img;
};

// This is our enemies subclass
// This class delegates to our superclass
var Enemy = function() {
    // Set our enemies starting position
    Character.call(this, 'images/enemy-bug.png', -100, 200);
    // Have enemies apeaar randomly at different y coorindates
    this.y = positions[Math.floor(Math.random() * 3)];
    // Have enemies randomy have different speeds
    this.speed = Math.floor(Math.random() * 200) + 100;
};


Enemy.prototype.update = function(dt) {
    //this will update the position of our enemy, based on
    //where our enemy went!
    this.x += this.speed * dt;
    //Instantiate a new enemy when another enmy goes offscreen
    if (this.x >= 500) {
        allEnemies.push(new Enemy());
        //remove enemies from array when they're gone
        var enemiesList = allEnemies.indexOf(this);
        allEnemies.splice(enemiesList, 1);
    }
};
//Put our enemy onscreen!
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Here is our player class that delegates to Character
var Player = function() {
    //here we need an x, y position of where my player is at
    Character.call(this, 'images/char-pink-girl.png', 200, 400);
};

//Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset your player when he dies!
function playerDies() {
    player.reset();

}

/*Add in an additional function to the player class
 *called checkCollisions which resets the game when a player and a bug collide
 */


var checkCollisions = function() {
    for (var i in allEnemies) {
        if (((allEnemies[i].x - player.x) < 80) &&
            ((player.x - allEnemies[i].x) < 80) &&
            ((player.y - allEnemies[i].y) < 80) &&
            ((allEnemies[i].y - player.y) < 80)) {
            playerDies();
            alert("You died!")
        }
    }
};
//Make my player
Player.prototype.handleInput = function(e) {
    if (e === 'left' && this.x != 0) {
        this.x = this.x - 100;
    } else if (e === 'right' && this.x != 400) {
        this.x = this.x + 100;
    } else if (e === 'up') {
        this.y = this.y - 80;
    } else if (e === 'down' && this.y != 400) {
        this.y = this.y + 80;
    }
    e = null;
    //Stop player from going off the top of the screen!

};

Player.prototype.update = function() {
    if (this.y < 50) {
        alert("You win!");
        this.reset();
    }
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
}

// Place the player object in a variable called player

//Create 1 instance of the player:
var player = new Player();

// 
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

