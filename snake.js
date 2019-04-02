    //creating game over modal div
    var overModal = document.getElementById('overScreen');
    var startModal = document.getElementById('startScreen');
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    //Variables
    var bgMusic = new Audio('res/sound/background.mp3');
    var fx = new Audio('res/sound/fx.mp3');

    //Canvas variables
    c = document.getElementById('canvas');
    canvas = c.getContext("2d");
    width  = document.getElementById('canvas').width;
    height = document.getElementById('canvas').height;

    //snake variables, there some useless but ignore them xD 
    snakeSize = 40;
    boardTileSize = width/snakeSize;

    //game variables
    var speed = 60;
    var playMusic = false;
    var hasBait = true;
    var baitX,baitY;
    baitX = myRandom(width+120-(width),width-120,snakeSize,snakeSize);
    baitY = myRandom(height+120-(height),height-120,snakeSize,snakeSize);

    //wait load html page before start game
    function start(){
    var snake = new Array();
    //Initial snake data structure declaration
    snake.length = 0;
    snake.push({x:120,y:0});
    snake.push({x:80,y:0});
    snake.push({x:40,y:0});

    startModal.style.display = "none";
    overModal.style.display = "none";
   
    //snake initialize running to right direction
    //1=left,2=up,3=right,4=down
    snakeDirection = 3;
    
    //game logic(update) loop interval is controlled by speed variable
    gameSpeed = setInterval(update, speed);

    //CONTROLS...
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) {
            snakeDirection = 1;
        }
        if(event.keyCode == 39) {
            snakeDirection = 3;
        }
        if(event.keyCode == 40) {
            snakeDirection = 4;
        }
        if(event.keyCode == 38) {
            snakeDirection = 2;
        }
    });

    //Functions core
    //orchestrator
    function update(){
        console.log(snake.length);
        
        redrawCanvas();
        eraseLastPiece();
        verifySnakeColision();
        createSnakePiece();
        createBait();
        drawSnake();
        //drawBoard();
        //debug();
    }
    //repaint canvas to dont leave trails
    function redrawCanvas() {
        canvas.fillStyle = "#16413C";
        canvas.fillRect(0,0,width,height);
    }

    //optional; I just used for debug purposes only
    function drawBoard() {
        //draw columnss
        for(columns = 0; columns < width; columns += snakeSize){
            canvas.beginPath();
            canvas.moveTo(columns, 0);
            canvas.lineTo(columns, height);
            canvas.stroke();
        }
        //draw rows
        for(rows = 0; rows < height; rows += snakeSize){
            canvas.beginPath();
            canvas.moveTo(0, rows);
            canvas.lineTo(width, rows);
            canvas.stroke();
        }      
    }

    //draw a square to each piece of snake in snake[]
    function drawSnake(){
        canvas.fillStyle = "green";
        for(i = 0;i < snake.length; i++){
            canvas.fillStyle = "green";
            canvas.fillRect(snake[i].x,snake[i].y,snakeSize,snakeSize);}
        
       }
    
       function verifySnakeColision() {
           snakeX = snake[snake.length-1].x;
           snakeY = snake[snake.length-1].y;
           boundX = [];
           boundY = [];
           for (i = 0;i < snake.length-1;i++) {
            boundX.push(snake[i].x);
           }
           for (i = 0;i < snake.length-1;i++) {
            boundY.push(snake[i].y);
         }
         for(i = 0; i < snake.length-1; i++){
             if (boundX[i] == snakeX && boundY[i] == snakeY) {
                 gameOver();
             }
         }
       }

    //erase snake tail and create new snake head to simulate movement
    function eraseLastPiece() {
    snake.shift();
    }

    function createSnakePiece() {
        if( snakeDirection == 1){
            if(snake[snake.length -1].x <= 0){
               gameOver();
            }else{
                snake.push({x: snake[snake.length-1].x-40,y: snake[snake.length-1].y});
            }
        }
        if( snakeDirection == 2){
            if(snake[snake.length -1].y <= 0){
                gameOver();
            }else{
                snake.push({x: snake[snake.length-1].x,y: snake[snake.length-1].y-40});
        }}
        if( snakeDirection == 3){
            if(snake[snake.length -1].x >= width - snakeSize){
                gameOver();
            }else{
                snake.push({x: snake[snake.length-1].x+40,y: snake[snake.length-1].y});
            }
        }
        if( snakeDirection == 4){
            if(snake[snake.length -1].y >= height-snakeSize){
                gameOver();
            }else{
                snake.push({x: snake[snake.length-1].x,y: snake[snake.length-1].y+40});
            }
        }
    }
    //...
    function debug(){
        console.log("Snake[0] X: " + snake[0].x);
        console.log("Snake[0] Y: " + snake[0].y)
    }

     //this function must guarantee that snake bait dont be generated in snake X and Y positions
     //and do some logical things too, dont be afraid xD
     function createBait() {
            canvas.fillStyle = "#953241";
            for (let i = 0; i < snake.length; i++) {
                if (baitX == snake[i].x && baitY == snake[i].y) {
                fx.currentTime = 0;
                fx.play();
                console.log("snake feeded =)");
                playMusic = true;
                if(playMusic == true){
                    bgMusic.play();
                }

                if(snakeDirection == 1){
                    snake.push({x:snake[snake.length-1].x-snakeSize,y:snake[snake.length-1].y})
                }
                if(snakeDirection == 3){
                    snake.push({x:snake[snake.length-1].x+snakeSize,y:snake[snake.length-1].y})
                }
                if(snakeDirection == 2){
                    snake.push({x:snake[snake.length-1].x,y:snake[snake.length-1].y-snakeSize});
                }
                if(snakeDirection == 4){
                    snake.push({x:snake[snake.length-1].x,y:snake[snake.length-1].y+snakeSize});
                 }
                 //gambiarra
                baitX = myRandom(width+120-(width),width-120,snakeSize,snakeSize);
                baitY = myRandom(height+120-(height),height-120,snakeSize,snakeSize);
                    }
            }
            console.log("Bait x"+ baitX);
            console.log("Bait Y"+ baitY);
            
            canvas.fillRect(baitX,baitY,snakeSize,snakeSize);
            hasBait = false;
    } 

    }
    //start game screen
    function newGame() {
        startModal.style.display = "block";
    }
     //game over screen
     function gameOver() {
        clearInterval(gameSpeed);
        overModal.style.display = "block";
        bgMusic.pause();
        bgMusic.currentTime = 0;   
    }
    //restart function
    function restart() {
        start();
    }

    //will generate random number to use in baits
    function myRandom(min, max, multiple) {
        return Math.round(Math.random() * (max - min) / multiple) * multiple + min;
    }

