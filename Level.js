class Level{
    intensity;
    score = 0;

    constructor(intensity){
        this.intensity = intensity;
    }

    point(obstacle,rat){
        if (obstacle.getPosY()<rat.getPosY()){
            this.score += 1;
        }
    }

    game(largeur,hauteur){
        let obstacles = [];
        for (let i=0;i<this.intensity*5;i++){
            const x = hauteur;
            const y = obstacles.length*10+largeur;
            const height = 100;
            const width = 50+this.intensity;
            const speed = 450+this.intensity*10;
            obstacles.push(...obstacles,new Obstacle())
        }
        return obstacles
    }
}