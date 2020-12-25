
var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var girls,girl,girl1;
function preload(){
  girlImg=loadImage("girl.png")
  girl1Img=loadImage("girl1.png")
  trackImg=loadImage("track.png")
}

function setup(){
 
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
 

}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState===2){
    game.end()
    
  }
}
