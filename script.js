var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext( '2d' );
var x=canvas.width/2;
var y=canvas.height-30;
var dx=2;
var dy=-2;
var ballRadius=10;
var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
var leftPressed=false;
var rightPressed=false;
var brickRowCount=3;
var brickCoulomnCount=6;
var brickWidth=75;
var brickHeight=20;
var brickPadding=10;
var brickOffsetTop=20;
var brickOffsetLeft=20;
var score =0;
var lives=3;
var level=1;
var maxlevel=4;
var bricks=[];
for(c=0;c<brickCoulomnCount;c++)
{
	bricks[c]=[];
for(r=0;r<brickRowCount;r++)
{
	bricks[c][r]={x: 0,y:0,status: 1};
 }
 }
document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);
function drawBricks()
{
for(c=0;c<brickCoulomnCount;c++)
{
for(r=0;r<brickRowCount;r++)
{
 if(bricks[c][r].status == 1){
 var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
 var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
 bricks[c][r].x=brickX;
 bricks[c][r].y=brickY;
ctx.beginPath();
ctx.rect(brickX,brickY,brickWidth,brickHeight);
ctx.fillStyle="white";
ctx.fill();
ctx.closePath();
}}}}
function collisionDetection(){
	for(c=0;c<brickCoulomnCount;c++){
	for(r=0;r<brickRowCount;r++){
	var b=bricks[c][r];
	if(b.status== 1){
	if(x>b.x && x<b.x+brickWidth&&y>b.y && y>b.y+brickHeight){
		dy=-dy;
		b.status=0;
    score++;
if(score==brickCoulomnCount*brickRowCount)
{
if(level==maxlevel){
alert("you win,congo!");
	 document.location.reload();
}
else {
level++;
}}}}}}}
function drawlevel(){
	ctx.font="16px Arial";
	ctx.fillStyle="white";
	ctx.fillText("level: "+level,210,20);
}
function drawScore(){
ctx.font="16px Arial";
ctx.fillStyle="white";
ctx.fillText("Score: "+score,8,20);
}
function keyDownHandler(e){
if(e.keyCode==39){
rightPressed=true;
}else if(e.keyCode==37) {
leftPressed=true;
}}
function keyUpHandler(e){
if(e.keyCode==39){
rightPressed=false;
}else if(e.keyCode==37){
leftPressed=false;
}
}
function drawBall(){
ctx.beginPath();
ctx.arc(x,y,ballRadius,0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();
ctx.closePath();
}

function drawPaddle(){
ctx.beginPath();
ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
ctx.fillStyle="white";
ctx.fill();
ctx.closePath();
}
function drawlives(){
	ctx.font="16px Arial";
	ctx.fillStyle="white";
	ctx.fillText("lives: "+lives,canvas.width-65,20);
}

function draw()
{
ctx.clearRect(0,0,canvas.width,canvas.height);
drawBricks();
drawBall();
drawScore();
drawlevel();
drawlives();
drawPaddle();
collisionDetection();
if(y+dy<ballRadius)
{
	dy=-dy;
}else if(y+dy>canvas.height-ballRadius)
{ if(x>paddleX&&x<paddleWidth+paddleX){
	dy=-dy;
}else {
	lives--;
	if(!lives){
		alert("GAME OVER!");
		document.location.reload();
	}
	else{
		x=canvas.width/2;
		y=canvas.height-30;
		dx=2;
		dy=-2;
		paddleX=(canvas.width-paddleWidth)/2;
}}}
if(x+dx<ballRadius||x+dx>canvas.width-ballRadius)
{
	dx=-dx;
}
if(rightPressed &&paddleX <canvas.width-paddleWidth){
paddleX +=7;
}else if(leftPressed&&paddleX>0){
	paddleX -=7;
}
x+=dx;
y+=dy;
 requestAnimationFrame(draw,10);
}
  document.addEventListener("mousemove",mouseMoveHandler);
	function mouseMoveHandler(e)
	{
   var relativeX=e.clientX - canvas.OffsetLeft;
 if(relativeX >0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2){
   paddleX=relativeX - (paddleWidth/2);
}}
  draw();
