import { getInputDirection } from './input.js';
import { randomGridPosition } from './getRandomFoodPosition.js';


export const SNAKE_SPEED = 5;

let newSegments = 0;

const snakeBody = [
    randomGridPosition()
];
export function update() {
    //addSegments();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i] };
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    })
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, { ignoreHeade = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHeade && index === 0) return false;
        return equalPosition(segment, position)
    })
}

function equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1] });
    }
    newSegments = 0;
}

export function getSnakeHeade() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHeade: true })
}