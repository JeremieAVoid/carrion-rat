class Level {
    intensity;
    score = 0;

    constructor(intensity) {
        this.intensity = intensity;
    }

    game(largeur, hauteur) {
        let obstacles = [];
        for (let i = 0; i < this.intensity * 5; i++) {
            const x = largeur + i * 400;
            const y = hauteur - 120;
            const height = 100;
            const width = 50 + this.intensity * 10;
            const speed = 200 + this.intensity * 50;
            obstacles.push(new Obstacle(x, y, height, width, speed));
        }
        return obstacles;
    }
}
