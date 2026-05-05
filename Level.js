class Level {
    intensity;
    score = 0;
    space = 0;
    constructor(intensity) {
        this.intensity = intensity;
        this.space = Math.max(120, 350 - this.intensity * 5);
    }

    obstaclesTop(largeur, hauteur) {
        let obstaclesTop = [];
        let currentX = largeur;
        for (let i = 0; i < this.intensity * 5; i++) {
            const x = currentX;
            const height = 100 + Math.floor(Math.random() * 100);
            const width = 50 + this.intensity * 10;
            const speed = 200 + this.intensity * 50;
            obstaclesTop.push(new Obstacle(x, 20, height, width, speed));
            currentX += 300 + Math.floor(Math.random() * 300);
        }
        return obstaclesTop;
    }

    obstaclesBottom(largeur, hauteur) {
        let obstaclesBottom = [];
        let currentX = largeur;
        for (let i = 0; i < this.intensity * 5; i++) {
            const x = currentX;
            const y = 20 + 200 + this.space;
            const height = hauteur - y;
            const width = 50 + this.intensity * 10;
            const speed = 200 + this.intensity * 50;
            obstaclesBottom.push(new Obstacle(x, y, height, width, speed));
            currentX += 300 + Math.floor(Math.random() * 300);
        }
        return obstaclesBottom;
    }
}
