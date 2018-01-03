function Ball(radius, x, y, vx, vy, canvasWidth, canvasHeight) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
}

Ball.prototype.getX = function () {
    return this.x;
};

Ball.prototype.setX = function (x) {
    return this.x = x;
};

Ball.prototype.setY = function (y) {
    return this.y = y;
};

Ball.prototype.getY = function () {
    return this.y;
}

Ball.prototype.getVx = function () {
    return this.vx;
}

Ball.prototype.getVy = function () {
    return this.vy;
}

Ball.prototype.setVx = function (vx) {
    this.vx = vx;
}

Ball.prototype.setVy = function (vy) {
    this.vy = vy;
}

Ball.prototype.getCanvasWidth = function () {
    return this.canvasWidth;
}

Ball.prototype.getCanvasHeight = function () {
    return this.canvasHeight;
}

Ball.prototype.isMovingRight = function () {
    return this.vx > 0;
}
Ball.prototype.isMovingDown = function () {
    return this.vy > 0;
};

Ball.prototype.collidesWith = function (player) {
    if (((this.y - this.radius) <= (player.getY() + player.getHeight())) && ((this.y + this.radius) >= player.getY())) {
        if (player.getX() == 0) {
            return (this.x - this.radius) <= 0;
        } else {
            return (this.x + this.radius) >= this.canvasWidth;
        }
    } else {
        return false;
    }
}

Ball.prototype.alternateXSpeed = function () {
    this.vx = -this.vx;
}

Ball.prototype.alternateYSpeed = function () {
    this.vy = -this.vy;
}

Ball.prototype.isTouchingTop = function () {
    return ((this.y - this.radius) <= 0);
}

Ball.prototype.isTouchingBottom = function () {
    return ((this.y + this.radius) >= this.canvasHeight);
}

Ball.prototype.calculateYSpeed = function (player) {
    if (this.y <= (player.getY() + (player.getHeight() * 0.25))) {
        this.vy -= 2;
    } else if (this.y <= (player.getY() + (player.getHeight() * 0.5))) {
        this.vy -= 1;
    } else if (this.y <= (player.getY() + (player.getHeight() * 0.75))) {
        this.vy += 1;
    } else {
        this.vy += 2;
    }
}


module.exports = Ball;