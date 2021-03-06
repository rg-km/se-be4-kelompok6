const CELL_SIZE = 20;
const CANVAS_SIZE = 600; // Jawab Soal No 1
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
let MOVE_INTERVAL = 150;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{
        x: head.x,
        y: head.y
    }];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
    }
}
var numLife = 3;
let snake1 = initSnake("white");
var levelAudio = new Audio("asset/level.wav");
// Buat tembok
// =======================================
function initHeadAndBodyWall(x, y, wall) {
    let head = {
        x: x,
        y: y,
    };
    let body = [{
        x: head.x,
        y: head.y
    }];
    for (let i = 1; i < (wall == "horizontal" ? 20 : 5); i++) {
        body.push({
            x: head.x + (wall == "horizontal" ? i : 0),
            y: head.y + (wall == "vertical" ? i : 0)
        })
    }
    return {
        head: head,
        body: body,
    }
}

function initWall(color, x, y, wall) {
    return {
        color: color,
        ...initHeadAndBodyWall(x, y, wall),
    }
}
// Obstacle
// =======================================
let wall = initWall("blue", 5, 5, "horizontal");
let wall2 = initWall("blue", 5, 20, "horizontal");
let wall3 = initWall("blue", 5, 10, "vertical");
let wall4 = initWall("blue", 24, 10, "vertical");

function stage(ctx) {
    if (level > 1) {
        drawWall(ctx, wall.head.x, wall.head.y, wall.color);
        for (let i = 1; i < wall.body.length; i++) {
            drawWall(ctx, wall.body[i].x, wall.body[i].y, wall.color);
        }
    }
    if (level > 2) {
        drawWall(ctx, wall2.head.x, wall2.head.y, wall2.color);
        for (let i = 1; i < wall2.body.length; i++) {
            drawWall(ctx, wall2.body[i].x, wall2.body[i].y, wall2.color);
        }
    }
    if (level > 3) {
        drawWall(ctx, wall3.head.x, wall3.head.y, wall3.color);
        for (let i = 1; i < wall3.body.length; i++) {
            drawWall(ctx, wall3.body[i].x, wall3.body[i].y, wall3.color);
        }
    }
    if (level > 4) {
        drawWall(ctx, wall4.head.x, wall4.head.y, wall4.color);
        for (let i = 1; i < wall4.body.length; i++) {
            drawWall(ctx, wall4.body[i].x, wall4.body[i].y, wall4.color);
        }
    }
}
// =======================================

let apple = {
    color: "red",
    position: initPosition(),
}

let apple2 = {
    color: "red",
    position: initPosition(),
}

let love = {
    color: "red",
    position: initPosition(),
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawWall(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = "black"
    scoreCtx.fillText("Score : " + snake.score, 10, scoreCanvas.scrollHeight / 2);
}

let levelSelector = document.querySelector('#level');
let level = 1;
let speedSelector = document.querySelector('#speed');

function drawNumLife(snake) {
    let numLifeCanvas;
    if (snake.color == snake1.color) {
        numLifeCanvas = document.getElementById("numlife");
    }
    let numLifeCtx = numLifeCanvas.getContext("2d");

    numLifeCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    numLifeCtx.font = "30px Arial";
    numLifeCtx.fillStyle = "red"
    numLifeCtx.fillText("Lifes : " + numLife, 10, numLifeCanvas.scrollHeight / 2);
}

function drawSnakeImg(ctx, x, y) {
    let img = document.getElementById("snakeImg");
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function angkaPrima(num) {
    var x = 0;
    for (var i = 2; i <= Math.floor(num / 2); i++) {
        x++
        if (num % i === 0) {
            return false
        }
    }
    return true
}

function draw() {
    setInterval(function () {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color);

        drawSnakeImg(ctx, snake1.head.x, snake1.head.y, snake1.color);
        for (let i = 1; i < snake1.body.length; i++) {
            drawSnakeImg(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
        }

        stage(ctx);

        let fruit = document.getElementById("apple");
        ctx.drawImage(fruit, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.drawImage(fruit, apple2.position.x * CELL_SIZE, apple2.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        let loves = document.getElementById("love");

        if (angkaPrima(snake1.score)) {
            ctx.drawImage(loves, love.position.x * CELL_SIZE, love.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        drawScore(snake1);
        drawNumLife(snake1);
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apple, love) {
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
        apple.position = initPosition();
        snake.score++;
        snake.body.push({
            x: snake.head.x,
            y: snake.head.y
        });

        if (snake.score % 5 == 0) {
            MOVE_INTERVAL -= 30;
            levelAudio.play();
            alert(`Level ${level} Complete!`)
            level += 1;
        }
    }

    if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
        apple2.position = initPosition();
        snake.score++;
        snake.body.push({
            x: snake.head.x,
            y: snake.head.y
        });

        if (snake.score % 5 == 0) {
            MOVE_INTERVAL -= 30;
            levelAudio.play();
            alert(`Level ${level} Complete!`)
            level += 1;
        }
    }

    speedSelector.innerHTML = `Speed: ${MOVE_INTERVAL} ms`
    levelSelector.innerHTML = `Snake Game - Level ${level}`

    if (snake.head.x == love.position.x && snake.head.y == love.position.y) {
        love.position = initPosition();
        snake.score++;
        numLife++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple, love);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple, love);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple, love);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple, love);
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        var snd = new Audio('asset/game-over.mp3');
        snd.play();
        alert("Kamu Nabrak");
        snake1 = initSnake("white");
        numLife -= 1;
        if (numLife < 1) {
            var snd = new Audio('asset/game-over.mp3');
            snd.play();
            alert("Game Over!")
            location.reload();
        }
    }
    return isCollide;
}
function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);

    // Check Wall
    let test = [snake1];

    // Obstacle
    if (level > 1)
        test.push(wall)
    if (level > 2)
        test.push(wall2)
    if (level > 3)
        test.push(wall3)
    if (level > 4)
        test.push(wall4)

    if (!checkCollision(test)) {
        setTimeout(function () {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({
        x: snake.head.x,
        y: snake.head.y
    });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }
})

function initGame() {
    move(snake1);
}

initGame();