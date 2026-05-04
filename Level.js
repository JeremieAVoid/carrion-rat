class Level {
    intensity;
    score = 0;
    space = 0;

    constructor(intensity) {
        this.intensity = intensity;
        this.space = Math.max(120, 350 - this.intensity * 5);
    }

    obstacles(largeur, hauteur) {
        let obstaclesBottom = [];
        let obstaclesTop = [];
        for (let i = 0; i < this.intensity * 5; i++) {
            const x = largeur + i * 400;
            const topHeight = 100 + Math.floor(Math.random() * (hauteur / 2 - 120));
            const bottomHeight = hauteur - topHeight - this.space;
            const width = 50 + this.intensity * 10;
            const speed = 200 + this.intensity * 50;
            obstaclesTop.push(new Obstacle(x, 20, topHeight, width, speed));
            obstaclesBottom.push(new Obstacle(x, hauteur - bottomHeight, bottomHeight, width, speed));
        }
        return [obstaclesBottom, obstaclesTop];
    }
}
