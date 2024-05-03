// Game Constant
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameoverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 5;
let lastPainttime = 0;
let snakearr = [
    { x: 13, y: 15 }
];
 food = { x: 6, y: 7 };
// Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPainttime) / 1000 < 1 / speed) {
        return;
    }
    lastPainttime = ctime;
    gameengine();
}

//snake bite yourself or border

function iscollid(snake) {
   for (let i = 1; i < snakearr.length; i++) {
      if(snake[i].x === snake [0].x && snake[i].y === snake [0].y ){
       return true;
    }
   }

   if(snake[0].x>=18 || snake[0].x <=0 || snake[0].y>=18 || snake[0].y <=0){
       return true;
   }
};

function gameengine() {

    // part 1 update snake
    if (iscollid(snakearr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over ! Reload Page To Play The Game :");
        snakearr = [{ x: 13, y: 15 }];
        musicSound.play();
       score = 0;
    }

    // Update food And score

    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score : " + score;
        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y });
        let a = 2;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y : Math.round(a + (b - a) * Math.random())}
    }

    // snake move 
    for (let i = snakearr.length-2 ; i>= 0; i--) {
       snakearr[i+1] = {...snakearr[i]};
        
    }
    snakearr[0].x += inputDir.x; 
    snakearr[0].y += inputDir.y;

    // part 2 display snake and food

    // Display Snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    // Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



// Logic Of Game
window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {
    inputDir = { x: 0, y: 1 } // Start the Game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});