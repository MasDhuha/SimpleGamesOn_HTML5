function init() {
	game = new rect("#000", 0, 0, 480, 320);
	ai = new rect("#fff", 10, game.width/2 - 40, 20, 80);
	player = new rect("#fff", game.width - 30, game.height/2 - 40, 20, 80);
	ai.scores = 0;
	player.scores = 0;
	ball = new rect("#fff", 40, game.height/2 - 10, 20, 20);
	ball.vX = 2;
	ball.vY = 2;
	canvas = document.getElementById("pong");
	canvas.width = game.width;
	canvas.height = game.height;
	ctx = canvas.getContext("2d");
	canvas.onmousemove = playerMove;
	setInterval(play, 1000/50);
}

function play() {
	draw();
	update();
	aiMove();
}

function update() {
	if(ball.y < 0 || ball.y + ball.height > game.height) {
		ball.vY = -ball.vY;
	}
	if(ball.x < 0) {
		ball.vX = -ball.vX;
		
		player.scores++;
	}
	if(ball.x + ball.width > game.width) {
		ball.vX = -ball.vX;
		
		ai.scores++;
	}
	
	if((collision(ai, ball) && ball.vX < 0) || (collision(player, ball) && ball.vX > 0)) {
		ball.vX = -ball.vX;
	}
	
	ball.x += ball.vX;
	ball.y += ball.vY;
}

function collision(objA, objB) {
	if(objA.x + objA.width > objB.x &&
	objA.x < objB.x + objB.width &&
	objA.y + objA.height > objB.y &&
	objA.y < objB.y + objB.height) {
		return true;
	} else {
		return false;
	}
}

function draw() {
	game.draw();
	ctx.font = "bold 128px courier";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillStyle = "#ccc";
	ctx.fillText(ai.scores, 100, 0);
	ctx.fillText(player.scores, game.width - 100, 0);
	for(i = 10; i < game.height; i += 45) {
		ctx.fillStyle = "#ccc";
		ctx.fillRect(game.width/2 - 10, i, 20, 20);
	}
	ai.draw();
	player.draw();
	ball.draw();
}
function rect(color, x, y, width, height) {
	this.color = color;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.draw = function()
	{
		ctx.fillStyle = this.color;
	    ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
function playerMove(e) {
	var y = e.pageY - e.path[0].offsetTop;
	if(player.height/2 < y && y < game.height - player.height/2) {
		player.y = y - player.height/2;
	}
}
function aiMove() {
	var y;
    var vY = Math.abs(ball.vY);
    if (ball.y < ai.y + ai.height/2) {
        y = ai.y - vY;
    }
    else {
        y = ai.y + vY;
    }
    if (10 < y && y < game.height - ai.height - 10) {
        ai.y = y;
    }
}
init();