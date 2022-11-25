window.onload = function(){
    const game = new Game();
    game.init();
    }

    class Game {
        snake; 
        move; 
        nextMove; 
        segments; 
        apple; 
        running;
        ctx;
        points;
    

    init() {
        this.ctx = document.getElementById('snake-canvas').getContext('2d');
        this.setDefault();
        this.addKeyDownEventListener();
        setInterval(this.renderFrame.bind(this), 100);
    }

    renderFrame() {
        if (this.running) {
            if (this.nextMove.x !== -this.move.x || this.nextMove.y !== -this.move.y) {
                this.move = this.nextMove;
            }
            this.snake.push({x: this.processBound(this.getHead().x + this.move.x), y: this.processBound(this.getHead().y + this.move.y)});

            if (this.snake.filter(square => square.x === this.getHead().x && square.y === this.getHead().y).length >= 2) {
                alert(`Game over :( You have scored ${this.points} points!`)
                this.setDefault();

            } else {
                if (this.getHead().x === this.apple.x && this.getHead().y === this.apple.y) {
                    this.segments++;
                    this.apple = this.generateAppleLocation();
                    this.points++;
                }

                this.segments <= 0 ? this.snake.shift() : this.segments--;
            }
        }

        this.ctx.fillStyle = '#bbca00';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = '#171717';
        this.snake.forEach(square => this.ctx.fillRect(square.x * 20, square.y * 20, 18, 18));
        this.ctx.fillStyle = '#171717';
        this.ctx.fillRect(this.apple.x * 20, this.apple.y * 20, 18, 18);
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillStyle = 'rgb(23, 23, 23)';
        this.ctx.fillText('Points: '+ this.points, 10, 20)
    }

    getHead(){
        return this.snake[this.snake.length - 1];
    }

    processBound(number){
        if (number > 19) {
            return 0;
        } else if (number < 0) {
            return 19
        }
        return number;
    }

    setDefault(){
        this.running = false;
        this.segments = 2;
        [this.move, this.nextMove] = Array(2).fill({x: 0, y: 0});
        this.snake = [{x: 10, y: 10}];
        this.apple = this.generateAppleLocation();
        this.points = 0;
    };

    generateAppleLocation(){
        let location;
        do {
            location = {x: this.generateRandomNumber(19), y: this.generateRandomNumber(19)};
        } while (this.snake.filter(square => square.x === location.x && square.y === location.y).length > 0);
            return location;
    }

    generateRandomNumber(max){
        return Math.floor(Math.random() * (max + 1));
    }

    addKeyDownEventListener() {
        window.addEventListener("keydown", e => {
           if (e.code.startsWith('Arrow')) {
               e.preventDefault();
               this.running = true; 
           }
           switch (e.code) {
               case 'ArrowLeft':
                   this.nextMove = {x: -1, y: 0};
                   break;
                case 'ArrowRight':
                    this.nextMove = {x: 1, y: 0};
                    break;       
                case 'ArrowDown':
                    this.nextMove = {x: 0, y: 1};
                    break;
                case 'ArrowUp':
                    this.nextMove = {x: 0, y: -1};
                    break;                       
           } 
        })
    }
}
