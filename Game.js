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

   //creating game background
    bg = createSprite(displayWidth/2,displayHeight/2-50,displayWidth, displayHeight-50);
    bg.addImage(gameBg);
    bg.scale = 2.7;

    robot1 = createSprite(150,650, 30, 80);
    robot1.shapeColor = "red";
    robot1.addAnimation(shooterImg);

   

  }

  play(){

    form.hide();

    Player.getPlayerInfo();
    player.getRobotsAtEnd();
    
    if(allPlayers !== undefined){
     
      //image(gameBg, 0,0, displayWidth, displayHeight-50);

      //image(trackImg, 0, -displayHeight*4, displayWidth,displayHeight*5);

      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the players
      var x = 400;
     // var y = 500;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
       // index = index + 1 ;

       //use data form the database to display the players in x direction
       // y = displayHeight - allPlayers[plr].distance;
       x = allPlayers[plr].distance;
      // y = y;
        robot1.x = x;
        //robot1.y = y;

        if (index === player.index){
          robot1.shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = robot1.y
          fill("red")
          ellipse(x,y,70,70)
          
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>4150){
        gameState=2;
        player.rank=player.rank+1
        Player.updateRobotsAtEnd(player.rank)
       }

       //move the characters using arrow keys
       if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.distance = player.distance-10;     
        player.update();
     }
 
   
     if(keyIsDown(RIGHT_ARROW) && player.index !== null){
       player.distance = player.distance+10;//      
       player.update();
   
     }
     
      drawSprites();
  }
  end(){
   console.log(player.rank)
   
  }

   spawnZombies(){
   
    //position = Math.round(random(1,4));
    // console.log(position);
    if(frameCount%150===0){
      zombie = createSprite(displayWidth-200,630);
      zombie.addImage(zombieImg);
      zombie.lifetime=500;
      zombie.scale = 0.8;
      zombie.velocityX = -5;
  
      zombiesGroup.add(zombie);
    }
  
  }

}

