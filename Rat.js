class Rat {
    posX;
    posY;
    height;
    width;
    weight = 100;//g
    gravity = 9.81; //m/s
    velocityY = 0;
    constructor(X,Y,height,width){
        this.posX = X;
        this.posY = Y;
        this.height = height;
        this.width = width;
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    setPosY(n){
        this.posY = n;
    }

    getHeight(){
        return this.height;
    }

    getWidth(){
        return this.width;
    }

    getVelocityY(){
        return this.velocityY;
    }

    getGravity(){
        return 980; // pixels/s² (approx)
    }

    obstacle(obsta) {
        if (
            this.posX < obsta.getPosX() + obsta.getWidth() &&
            this.posX + this.width > obsta.getPosX() &&
            this.posY < obsta.getPosY() + obsta.getHeight() &&
            this.posY + this.height > obsta.getPosY()
        ) {
        // collision → poser le rat dessus
            this.posY = obsta.getPosY() - this.height;
            this.velocityY = 0;
        }
    }

    jump(){
        if (this.velocityY === 0) {
            this.velocityY = -400;
        }
    }
}