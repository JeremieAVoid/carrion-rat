class Level {
    intensity;
    score = 0;

    constructor(intensity) {
        this.intensity = intensity;
    }

    point(obstacle, rat) {
        if (obstacle.getPosY() < rat.getPosY()) {
            this.score += 1;
        }
    }

    game(largeur, hauteur) {
        const obstacles = [];
        const groundY = hauteur - 20;
        for (let i = 0; i < this.intensity * 5; i++) {
            const width = 50 + this.intensity * 10;
            const height = 80 + (i % 3) * 20;
            const x = largeur + i * 400;
            const y = groundY - height;
            const speed = 300 + this.intensity * 30;
            obstacles.push(new Obstacle(x, y, height, width, speed));
        }
        return obstacles;
    }
}
