class Rat {
    posX;
    posY;
    height;
    width;
    weight = 100;
    gravity = 9.81;
    velocityY = 0;

    constructor(X, Y, height, width) {
        this.posX = X;
        this.posY = Y;
        this.height = height;
        this.width = width;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    setPosY(n) {
        this.posY = n;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    getVelocityY() {
        return this.velocityY;
    }

    getGravity() {
        return this.weight * this.gravity;
    }

    obstacle(obsta) {
        const ratLeft = this.posX;
        const ratRight = this.posX + this.width;
        const ratTop = this.posY;
        const ratBottom = this.posY + this.height;

        const obsLeft = obsta.getPosX();
        const obsRight = obsta.getPosX() + obsta.getWidth();
        const obsTop = obsta.getPosY();
        const obsBottom = obsta.getPosY() + obsta.getHeight();

        const collides = ratRight > obsLeft && ratLeft < obsRight && ratBottom > obsTop && ratTop < obsBottom;
        if (collides) {
            this.setPosY(obsTop - this.height);
            this.velocityY = 0;
        }
    }

    jump() {
        if (this.velocityY === 0) {
            this.velocityY = -450;
        }
    }
}
