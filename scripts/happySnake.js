        (function(){
            let canvas;
            let context2d;
            let snake = [];
            let wallSize = 10;
            let dx = 0;
            let dy = 0;
            let pauseGame = true;
            let food = {x:0, y:0, color: "rgb(23, 23, 23)"};
            let points = 0;
            let speed = 100;
            
            function getRandomInt(max){
                return Math.floor(Math.random() * max);
            }

            // function drawRectRandomColor(x, y, width, height){
            //     context2d.fillStyle = `rgb(${getRandomInt(255)},
            //                           ${getRandomInt(255)},
            //                           ${getRandomInt(255)})`;
            //     context2d.fillRect(x, y, width, height);
            // }

            function clearCanvas(){
                context2d.fillStyle = "rgb(187, 202, 0)";
                context2d.fillRect(0,0, canvas.width, canvas.height);
            }

            function makeSnake(snakeLength){
                for(let i = 0; i < snakeLength; i++){
                    let x = canvas.width/2 + i*wallSize;
                    let y = canvas.height/2;
                    snake.push( {x:x, y:y} );
                }
            }

            function drawSnake(){
                snake.forEach( function(element) {
                    context2d.strokeStyle = "rgb(23, 23, 23)";
                    context2d.lineWidth = 4;
                    context2d.lineJoin = "rgb(187, 202, 0)";
                    context2d.strokeRect(element.x, element.y, wallSize, wallSize)
                }); 
            }

            function resetGame(){
                snake = [];
                makeSnake(5);
                randomFood();
                pauseGame = true;
                points = 0;
            }

            function moveSnake(dx, dy){
                let headX = snake[0].x + dx;
                let headY = snake[0].y + dy;
                // console.log(snake);
                snake.unshift({x: headX, y: headY}); 
                // console.log(snake);
                snake.pop();
                // console.log(snake);
            }

            function keyDown(e){
                if(pauseGame) pauseGame = false;

                switch(e.keyCode) {
                    case 37: //left
                    case 65: //A
                        dy = 0;
                        dx = -10;
                        break;
                    case 38: //up
                    case 87: //w
                        dy = -10;
                        dx = 0;
                        break;
                    case 39: // right
                    case 60: // D
                        dy = 0;
                        dx = 10;
                        break;
                    case 40: //down
                    case 83: //S
                        dy = 10;
                        dx = 0;
                        break;
                }
            }

            function randomFood(){
                function randV(min, max){
                    return Math.floor((Math.random() * (max - min) + min)/wallSize)*wallSize;
                }

                // let colors = ["rgb(23, 23, 23)", "rgb(23, 23, 23)", "rgb(23, 23, 23)", "rgb(23, 23, 23)"];
                // food.color = colors[Math.floor(Math.random()*colors.length)];

                food.x = randV(20, canvas.width - 20);
                food.y = randV(20, canvas.height - 20);
            }

            function drawFood() {
                context2d.fillStyle = food.color;
                context2d.fillRect(food.x, food.y, wallSize, wallSize);
            }

            function checkWallsCollision(){
                snake.forEach(function(el){
                    if(el.x > canvas.width || el.x < 0 || el.y > canvas.height || el.y < 0)
                    resetGame();
                })
            }

            function checkFoodCollision(){
                if(food.x == snake[0].x && food.y == snake[0].y){
                    snake.push(Object.assign({}, snake[snake.length-1]));
                    randomFood();
                    console.log(speed);
                    points++;
                }
            }

            function drawPoints(){
                context2d.font = "20px Arial";
                context2d.fillStyle = 'rgb(23, 23, 23)';
                context2d.fillText('Points: '+ points, 10, 20)
            }

            function startApp(){
                canvas =  document.getElementById("canvas");
                context2d = canvas.getContext("2d");
                document.addEventListener("keydown", keyDown);
                resetGame();                
                
                setInterval( function(){
                    clearCanvas();
                    checkWallsCollision();
                    checkFoodCollision();
                    if(!pauseGame)moveSnake(dx, dy);
                    drawPoints();
                    drawFood();
                    drawSnake();
                }, speed)
            }

            window.onload = startApp;
        })()
