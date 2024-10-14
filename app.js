const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let scale = 20;
let rows = canvas.height / scale
let columns = canvas.width / scale

function Apple() {

    this.generateLocation = function(){
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    }
    this.appleDraw = function () {
        ctx.fillStyle = "#8B080D"
        ctx.fillRect(this.x, this.y, scale, scale);
    };
}


function Snake(){
    this.x = 10
    this.y = 10
    this.xSpeed = 10
    this.ySpeed = 0

    this.snakeDraw = function () {
        ctx.fillStyle = "#084646"
        ctx.fillRect(this.x, this.y, scale, scale);
    };
    this.updateLocation = function () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x > canvas.width){
            this.x = 0
        }
        if (this.y > canvas.height){
            this.y = 0
        }
        if (this.x < 0){
            this.x = canvas.width
        }
        if (this.y < 0){
            this.y = canvas.height
        }
    };
    this.updateDirection = function (key){
        switch (key){
            case "ArrowUp":
                this.xSpeed = 0
                this.ySpeed = -10
                break
            case "ArrowLeft":
                this.xSpeed = -10
                this.ySpeed = 0
                break
            case "ArrowRight":
                this.xSpeed = 10
                this.ySpeed = 0
                break
            case "ArrowDown":
                this.xSpeed = 0
                this.ySpeed = 10
                break
        }
    }
    this.hasEatenFood = function (food){
        return this.x === food.x && this.y === food.y;
    }
}

window.addEventListener("load",()=>{
    let snake = new Snake();
    let apple = new Apple();
    apple.generateLocation();
    setInterval(()=>{
        ctx.clearRect(0 , 0 , canvas.width , canvas.height)
        snake.snakeDraw();
        apple.appleDraw();
        snake.updateLocation()
        if(snake.hasEatenFood(apple)){
            apple.generateLocation()
            console.log(apple.x + " " + apple.y)
            }
        },60)
        window.addEventListener("keydown" , (event)=>{
            snake.updateDirection(event.key)
        })
})