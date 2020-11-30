//    private int x, y, vx, vy;
//    private float radius;
//
function Particle(ball, player) {
    this.x = ball.getX();
    this.y = ball.getY();
    this.radius = Math.floor((Math.random() * 5) + 1);

    if (player.getX() == 0) {
        this.vx = Math.floor((Math.random() * 12) + 1);
    } else {
        this.vx = Math.floor((Math.random() * 12) + 1) * -1;
    }

    var next = Math.floor((Math.random() * 10) + 1);
    if (next < 5) {
        this.vy = next * -1;
    } else {
        this.vy = next;
    }
}

Particle.prototype.getX = function () {
    return this.x;
}

Particle.prototype.getY = function () {
    return this.y;
}

Particle.prototype.getRadius = function () {
    return this.radius;
}

Particle.prototype.getVX = function () {
    return this.vx;
}

Particle.prototype.getVY = function () {
    return this.vy;
}

Particle.prototype.decreaseRadius = function () {
    if (this.radius > 0) {
        this.radius -= 0.25;
    }
}

Particle.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;
}

module.exports = Particle;