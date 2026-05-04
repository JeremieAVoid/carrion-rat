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
        return this.weight*this.gravity;
    }

    obstacle (obsta){
        if (this.posX+this.length <= obsta.getLength()+obsta.getPosX || this.posX <= obsta.getLength()+obsta.getPosX){
            if (this.posY+this.width >= obsta.getPosY){
                this.posY = obsta.getPosY-this.width;
            }
        }
    }

    jump(){
        this.velocityY = -400;
    }

}