var balloon,balloonImage1,balloonImage2;
var database;
var height;
var gameState=0;
var PLAY=0;
var END=1;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("HotAirBallon01.png");
   balloonImage2=loadAnimation("HotAirBallon01.png","HotAirBallon01.png",
   "HotAirBallon01.png","HotAirBallon02.png","HotAirBallon02.png",
   "HotAirBallon02.png","HotAirBallon03.png","HotAirBallon03.png","HotAirBallon03.png");
   //theme=loadSound("theme.m4a")
  }

//Function to set initial environment
function setup() {

   database=firebase.database();

  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  


  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
if(gameState===1)
{
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


if(gameState===0)
{
  
  push();
  fill(0);
  strokeWeight(3);
  stroke(random(0,255),random(0,255),random(0,255));
  textFont("Algerian");
  textSize(130);
  text("BALLOON RIDE!",300,350);
  pop();
  fill(0);
  strokeWeight(3);
  stroke("black")
  textFont("Times new roman")
  textSize(50);
  text("Press SPACE key to play",500,450);
  if(keyWentDown("Space"))
{
  gameState=1;
 // theme.play();
  
}
}

}
//CHOOSE THE CORRECT UPDATEHEIGHT FUNCTION
// function updateHeight(x,y){
//   database.ref('balloon/height').set({
//     'x': height.x ,
//     'y': height.y 
//   })
// }

// function updateHeight(x,y){
//   database.ref('balloon/height')({
//     'x': height.x + x ,
//     'y': height.y + y
//   })
// }


 function updateHeight(x,y){
   database.ref('balloon/height').set({
     'x': height.x + x ,
     'y': height.y + y
   })
 }


// function updateHeight(x,y){
//   database.ref().set({
//     'x': height.x + x ,
//     'y': height.y + y
//   })
// }




//CHOOSE THE CORRECT READHEIGHT FUNCTION
// function readHeight(data){
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

 function readHeight(data){
   height = data.val();
   balloon.x = height.x;
   balloon.y = height.y;
 }

// function readHeight(data){
//   height = data.val();
// }

// function readHeight(){
//   height = val();
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

function showError(){
  console.log("Error in writing to the database");
}
