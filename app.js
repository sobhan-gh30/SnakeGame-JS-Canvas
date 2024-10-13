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
    this.updateDirection = function (key){
        console.log(key)
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
}

window.addEventListener("load",()=>{
let snake = new Snake();
setInterval(()=>{
    ctx.clearRect(0 , 0 , canvas.width , canvas.height)
    snake.snakeDraw();
    snake.updateLocation()
    },50)
    window.addEventListener("keydown" , (event)=>{
        snake.updateDirection(event.key)
    })
})
