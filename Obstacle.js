class Obstacle{
    posX;
    posY;
    height;
    width;
    speed;

    constructor(X,Y,height,width,speed){
        this.posX = X;
        this.posY = Y;
        this.height = height;
        this.width = width;
        this.speed = speed;
        this.passed = false;
    }

    getPosX(){
        return this.posX;
    }

    setPosX(n){
        this.posX = n;
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

    getSpeed(){
        return this.speed;
    }

    shift(deltaTime){
        this.posX -= this.speed * deltaTime;
    }    
    
}