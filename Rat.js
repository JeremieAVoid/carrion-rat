class Rat {
    posX;
    posY;
    height;
    width;
    weight = 100;
    gravity = 1500;
    velocityY = 0;
    onGround = false;
    jumpForce = -1000;

    constructor(X, Y, height, width) {
        this.posX = X;
        this.posY = Y;
        this.height = height;
        this.width = width;
    }

    getPosX() { return this.posX; }
    getPosY() { return this.posY; }
    setPosY(n) { this.posY = n; }
    getHeight() { return this.height; }
    getWidth() { return this.width; }
    getGravity() { return this.gravity; }

    obstacle(obsta) {
        return (
            this.posX < obsta.getPosX() + obsta.getWidth() &&
            this.posX + this.width > obsta.getPosX() &&
            this.posY < obsta.getPosY() + obsta.getHeight() &&
            this.posY + this.height > obsta.getPosY()
        );
    }

    jump() {
        this.velocityY = this.jumpForce;
    }
}
