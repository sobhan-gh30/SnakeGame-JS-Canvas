let canvas , ctx
canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d")

//creating the Snake
ctx.fillStyle = "#084646"
ctx.fillRect(20 , 20 , 100 , 15)


//creating the apple
ctx.fillStyle = "#8B080D"
ctx.fillRect(500 , 100 , 15 , 15)
