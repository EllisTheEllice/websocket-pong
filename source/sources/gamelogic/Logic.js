var Ball = require('./Ball');
var Particle = require('./Particle');
var Player = require('./Player');
var particleLength = 30;


function Logic(isSingleplayer) {
    this.particles = new Array();
    this.enemySpeed = 11;
    this.canvasHeight = 500;
    this.canvasWidth = 853;
    this.ballStartSpeed = 9;
    this.counter = 0;
    this.player1 = null;
    this.player2 = null;
    this.isSingleplayer = isSingleplayer;
    this.isPause = false;
    this.maxScore = 16;
    this.collided = false;
}

Logic.prototype.init = function () {
    if (this.player1 == null) {
        this.player1 = new Player(0, 150);
        this.player2 = new Player((this.canvasWidth - 10), 150);
        this.ball = new Ball(10, 30, 150, this.getBallStartSpeed(), 0, this.canvasWidth, this.canvasHeight);
    } else {
        this.player1.setY(150);
        this.player2.setY(150);
        this.ball.setX(30);
        this.ball.setY(150);
        this.ball.setVy(0);
        this.ball.setVx(this.getBallStartSpeed());
    }
};

Logic.prototype.pause = function () {
    this.isPause = true;
};

Logic.prototype.unpause = function () {
    this.isPause = false;
};

Logic.prototype.isOnPause = function () {
    return this.isPause;
}

Logic.prototype.isCollided = function () {
    return this.collided;
}

Logic.prototype.increaseBallSpeed = function () {
    if (this.ball.getVx() < 0) {
        this.ball.setVx(this.ball.getVx() - 1);
    } else {
        this.ball.setVx(this.ball.getVx() + 1);
    }
};

Logic.prototype.setPlayer1Y = function (y) {
    this.player1.setY(y);
};

Logic.prototype.setPlayer2Y = function (y) {
    this.player2.setY(y);
};

Logic.prototype.getParticles = function () {
    return this.particles;
};

Logic.prototype.getEnemySpeed = function () {
    return this.enemySpeed;
};

Logic.prototype.getBall = function () {
    return this.ball;
};

Logic.prototype.getPlayer1 = function () {
    return this.player1;
};

Logic.prototype.getPlayer2 = function () {
    return this.player2;
};

Logic.prototype.getCanvasHeight = function () {
    return this.canvasHeight;
};

Logic.prototype.getCanvasWidth = function () {
    return this.canvasWidth;
};

Logic.prototype.getBallStartSpeed = function () {
    return this.ballStartSpeed;
};

Logic.prototype.calculate = function () {
    this.counter++;
    this.collided=false;
    if (this.ball.isMovingRight()) {
        if (this.ball.collidesWith(this.player2)) {
            for (var i = 0; i < particleLength; i++) {
                this.getParticles()[i] = new Particle(this.ball, this.player2);
            }
            this.collided=true;
            this.ball.alternateXSpeed();
            this.ball.calculateYSpeed(this.player2);
        } else if (this.ball.getX() >= this.canvasWidth) {
            this.player1.addScore();
            return false;
        }
    } else {
        if (this.ball.collidesWith(this.player1)) {
            this.collided=true;
            for (var i = 0; i < particleLength; i++) {
                this.getParticles()[i] = new Particle(this.ball, this.player1);
            }
            this.ball.alternateXSpeed();
            this.ball.calculateYSpeed(this.player2);
        } else if (this.ball.getX() <= 0) {
            this.player2.addScore();
            return false;
        }
    }

    if (this.ball.isTouchingTop() || this.ball.isTouchingBottom()) {  //touching top or down?
        this.ball.alternateYSpeed();
    }

    this.ball.setX(this.ball.getX() + this.ball.getVx());
    this.ball.setY(this.ball.getY() + this.ball.getVy());

    if (this.isSingleplayer) {
        this.calculateAIMovement();
    }
    //particles
    if (this.counter >= 3) {
        for (i = 0; i < particleLength; i++) {
            if (this.getParticles()[i] != null) {
                var p = this.getParticles()[i];
                p.decreaseRadius();
                p.move();
                if (p.getRadius() == 0) {
                    this.getParticles()[i] = null;
                }
            }
        }
        this.counter = 0;
    }

    return true;
};

Logic.prototype.calculateAIMovement = function () {
    // Berechnet die Mitte des Paddels
    var real_y_pos = this.player2.getY() + (this.player2.getHeight() / 2);
    var y_pos = this.player2.getY();


    /* Wenn sich Ball von Paddel wegbewegt, werden die Paddel in die Mitte zurückbewegt */
    if (this.ball.getVx() < 0) {
// Paddel oberhalb der Mitte
        if (real_y_pos < ((this.canvasHeight / 2) - 10)) {
            y_pos += this.getEnemySpeed();
        } // Paddel unterhalb der Mitte
        else if (real_y_pos > ((this.canvasHeight / 2) + 10)) {
            y_pos -= this.getEnemySpeed();
        }
    } else if (this.ball.getVx() > 0) {
// Solange Paddel nicht auf Höhe des Balles ist wird es bewegt
        if (real_y_pos != this.ball.getY()) {
// Ball oberhalb von Paddel
            if (this.ball.getY() < (real_y_pos - 10)) {
                y_pos -= this.getEnemySpeed();
            } // Ball unterhalb von Paddel
            else if (this.ball.getY() > (real_y_pos + 10)) {
                y_pos += this.getEnemySpeed();
            }
        }
    }
    this.player2.setY(y_pos);
};

Logic.prototype.hasWon = function () {
    if (this.player1.getScore() >= this.maxScore || this.player2.getScore() >= this.maxScore) {
        return true;
    } else {
        return false;
    }
};

module.exports = Logic;
