const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let scale = 10;
let rows = canvas.height / scale;
let columns = canvas.width / scale;

function Apple() {
    this.generateLocation = function(snake) {
        let isOnSnake;
        do {
            this.x = Math.floor(Math.random() * columns) * scale;
            this.y = Math.floor(Math.random() * rows) * scale;
            isOnSnake = (snake.x === this.x && snake.y === this.y);
        } while (isOnSnake);
    }

    this.appleDraw = function() {
        ctx.fillStyle = "#b01319";
        ctx.fillRect(this.x, this.y, scale, scale);
    };
}

function Snake() {
    this.x = 10;
    this.y = 10;
    this.xSpeed = scale;
    this.ySpeed = 0;

    this.snakeDraw = function() {
        ctx.fillStyle = "#0e6b20";
        ctx.fillRect(this.x, this.y, scale, scale);
    };

    this.updateLocation = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x >= canvas.width) {
            this.x = 0;
        }
        if (this.y >= canvas.height) {
            this.y = 0;
        }
        if (this.x < 0) {
            this.x = canvas.width - scale;
        }
        if (this.y < 0) {
            this.y = canvas.height - scale;
        }
    };

    this.updateDirection = function(key) {
        switch (key) {
            case "ArrowUp":
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale;
                }
                break;
            case "ArrowLeft":
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale;
                    this.ySpeed = 0;
                }
                break;
            case "ArrowRight":
                if (this.xSpeed === 0) {
                    this.xSpeed = scale;
                    this.ySpeed = 0;
                }
                break;
            case "ArrowDown":
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale;
                }
                break;
        }
    }

    this.hasEatenFood = function(food) {
        return this.x === food.x && this.y === food.y;
    }
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
            console.log(apple.x + " " + apple.y);
        }
    }, 60);

    window.addEventListener("keydown", (event) => {
        snake.updateDirection(event.key);
    });
});
