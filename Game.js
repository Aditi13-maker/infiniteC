class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    girl = createSprite(100,200);
    girl.addImage("girl",girlImg)
    girl1 = createSprite(300,200);
    girl1.addImage("girl1",girl1Img)

  
    girls = [girl,girl1];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getRank()
    
    if(allPlayers !== undefined){
//ground.png
      background("black")
      image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5)
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 230;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 300;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        girls[index-1].x = x;
        girls[index-1].y = y;

        if (index === player.index){
          stroke("pink")
          fill("purple")
          ellipse(x,y,80,80)
          girls[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = girls[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>5300){
      gameState=2
      player.rank=player.rank+1
      Player.updateRank(player.rank)
    }


    drawSprites();
  }

  end(){
    textSize(30)
    fill("red")
    text("GameOver",displayWidth/2,-displayHeight*4+50)
    text("You are "+player.rank,displayWidth/2,-displayHeight*4+90)
  }
}
