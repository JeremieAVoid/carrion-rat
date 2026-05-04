class Rat {
    posX;
    posY;
    length;
    width;
    weight = 100;//g
    gravity = 9.81; //m/s
    constructor(X,Y,length,width){
        this.posX = X;
        this.posY = Y;
        this.length = length;
        this.width = width;
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getLength(){
        return this.length;
    }

    getWidth(){
        return this.width;
    }

    obstacle (obsta){
        if (this.posX+this.length <= obsta.getLength()+obsta.getPosX || this.posX <= obsta.getLength()+obsta.getPosX){
            if (this.posY+this.width >= obsta.getPosY){
                this.posY = obsta.getPosY-this.width;
            }
        }
    }

    jump(){
        
    }

}