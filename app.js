const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let scale = 15;


//creating the apple
ctx.fillStyle = "#8B080D"
ctx.fillRect(500 , 100 , 15 , 15)

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
    };
}

window.addEventListener("load",()=>{
let snake = new Snake();
setInterval(()=>{
    ctx.clearRect(0 , 0 , canvas.width , canvas.height)
    snake.snakeDraw();
    snake.updateLocation()
    },100)
})
