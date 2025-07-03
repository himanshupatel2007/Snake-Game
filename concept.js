//game constants
let inputdirection = { x: 0, y: 0 };
let speed = 2;
let lastTime = 0;
let snakeBody = [{ x: 10, y: 12 }];
let food = { x: 10, y: 11 };
let score = 0;
const board = document.getElementById("board");


//functions for the game
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastTime) / 1000 < 1 / speed) {
        return;
    }
    lastTime = ctime;
    gameEngine();
};

function collide(snakeArray) {
    return false;
};

function gameEngine() {


    //updating snake and food
    if (collide(snakeBody)) {
        inputdirection = { x: 0, y: 0 };
        alert("Game-Over");
        snakeBody = [{ x: 10, y: 12 }];
        score = 0;
    };


    //when food is eaten!
    if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {

        snakeBody.unshift({ x: snakeBody[0].x + inputdirection.x, y: snakeBody[0].y + inputdirection.y });
        let a = 2;
        let b = 18;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        score += 1;
        speed = speed + .1;
    };


    //moving the snake
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        const element = snakeBody[i];
        snakeBody[i + 1] = { ...snakeBody[i] }; //creating new snake 
    };

    snakeBody[0].x += inputdirection.x;
    snakeBody[0].y += inputdirection.y;

    //displaying snake 
    board.innerHTML = "";
    snakeBody.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add("snake");
        board.appendChild(snakeElement);
    });


    //displaying the food
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
};


//main logic for the games
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdirection = { x: 0, y: 1 };//snake moves down
    switch (e.key) {
        case "ArrowUp":
            inputdirection.x = 0;
            inputdirection.y = -1;
            break;
        case "ArrowDown":
            inputdirection.x = 0;
            inputdirection.y = 1;
            break;
        case "ArrowLeft":
            inputdirection.x = -1;
            inputdirection.y = 0;
            break;
        case "ArrowRight":
            inputdirection.x = 1;
            inputdirection.y = 0;
            break;
        default:
            break;
    };
});