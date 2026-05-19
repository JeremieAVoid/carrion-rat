class Level {
    intensity;
    score = 0;
    space = 0;
    constructor(intensity) {
        this.intensity = intensity;
        this.space = Math.max(80, 250 - this.intensity * 5);
    }

    obstaclesTop(largeur, hauteur) {
        let obstaclesTop = [];
        let currentX = largeur;
        const numObstacles = 5;
        
        for (let i = 0; i < numObstacles; i++) {
            const x = currentX;
            const height = 100 + Math.floor(Math.random() * 100);
            const width = height * 0.6;
            const speed = 200 + this.intensity * 30;
            const obs = new Obstacle(x, 20, height, width, speed);
            obs.imgIndex = Math.floor(Math.random() * 3);
            obstaclesTop.push(obs);
            currentX += 400 + Math.floor(Math.random() * 200) - (this.intensity * 5);
        }
        return obstaclesTop;
    }

    obstaclesBottom(largeur, hauteur) {
        let obstaclesBottom = [];
        let currentX = largeur;
        
        const numObstacles = 5;
        
        for (let i = 0; i < numObstacles; i++) {
            const x = currentX;
            const random = Math.floor(Math.random() * 150);
            const y = 20 + 150 + random + this.space;
            const height = hauteur - y;
            const width = height * 0.4;
            const speed = 200 + this.intensity * 30;
            const obs = new Obstacle(x, y, height, width, speed);
            obs.imgIndex = Math.floor(Math.random() * 3);
            obstaclesBottom.push(obs);
            currentX += 400 + Math.floor(Math.random() * 200) - (this.intensity * 5);
        }
        return obstaclesBottom;
    }
}