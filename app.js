const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let scale = 10;
let rows = canvas.height / scale;
let columns = canvas.width / scale;

function Apple() {
    this.generateLocation = function(snake) {
        let isOnSnake;
        do {
            this.x = (Math.floor(Math.random() * rows)) * scale;
            this.y = (Math.floor(Math.random() * columns)) * scale;
            isOnSnake = snake.body.some(part => part.x === this.x && part.y === this.y);
        } while (isOnSnake);
    };
    this.appleDraw = function() {
        ctx.fillStyle = "#8B080D";
        ctx.fillRect(this.x, this.y, scale, scale);
    };
}

function Snake() {
    this.body = [{ x: 10, y: 10 }];
    this.xSpeed = scale;
    this.ySpeed = 0;

    this.snakeDraw = function() {
        ctx.fillStyle = "#084646";
        this.body.forEach(part => ctx.fillRect(part.x, part.y, scale, scale));
    };

    this.updateLocation = function() {
        const head = { x: this.body[0].x + this.xSpeed, y: this.body[0].y + this.ySpeed };

        // Check for wall collisions
        if (head.x >= canvas.width) head.x = 0;
        if (head.y >= canvas.height) head.y = 0;
        if (head.x < 0) head.x = canvas.width - scale;
        if (head.y < 0) head.y = canvas.height - scale;

        this.body.unshift(head); // Add new head
        this.body.pop(); // Remove the tail
    };

    this.updateDirection = function(key) {
        switch (key) {
            case "ArrowUp":
                if (this.ySpeed === 0) { this.xSpeed = 0; this.ySpeed = -scale; }
                break;
            case "ArrowLeft":
                if (this.xSpeed === 0) { this.xSpeed = -scale; this.ySpeed = 0; }
                break;
            case "ArrowRight":
                if (this.xSpeed === 0) { this.xSpeed = scale; this.ySpeed = 0; }
                break;
            case "ArrowDown":
                if (this.ySpeed === 0) { this.xSpeed = 0; this.ySpeed = scale; }
                break;
        }
    };

    this.hasEatenFood = function(food) {
        return this.body[0].x === food.x && this.body[0].y === food.y;
    };

    this.grow = function() {
        // Add a new segment to the snake's body
        this.body.push({}); // Push an empty object which will be updated later
    };
}

window.addEventListener("load", () => {
    let snake = new Snake();
    let apple = new Apple();
    apple.generateLocation(snake);

    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.snakeDraw();
        apple.appleDraw();
        snake.updateLocation();

        if (snake.hasEatenFood(apple)) {
            apple.generateLocation(snake);
            snake.grow(); // Grow the snake when it eats food
            console.log(apple.x + " " + apple.y);
        }
    }, 60);

    window.addEventListener("keydown", (event) => {
        snake.updateDirection(event.key);
    });
});
