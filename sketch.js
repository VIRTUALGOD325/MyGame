
var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;

var backgroundIMG;
var ground;

var playerBall, playerIMG;

var platform1Img, platform2Img;

var spike1,spike2,spike3,spike4,spike5,spike6;

var spike1IMG, spike2IMG, spike3IMG, spike4IMG, spike5IMG, spike6IMG;

var platformsGroup, platformsBreakingGroup;

var platformTemp;

var start,startIMG;

var gameOver, gameOverIMG;

function preload(){
  backgroundIMG = loadImage("Images/Background.png");
  playerIMG = loadImage("Images/BallOrignal.png");

  platform1Img = loadImage("Images/Platform1.png");
  platform2Img = loadImage("Images/Platform2.png");

  spike1IMG = loadImage("Images/spike1.png");
  spike2IMG = loadImage("Images/spike2.png");
  spike3IMG = loadImage("Images/spike3.png");
  spike4IMG = loadImage("Images/spike4.png");
  spike5IMG = loadImage("Images/spike5.png");
  spike6IMG = loadImage("Images/spike6.png");

  startIMG = loadImage("Images/start.png");

  gameOverIMG = loadImage("Images/gameOver.png");

}

function setup() {
  createCanvas(600,800);

  ground = createSprite(300,600, 600, 2200);
  //ground.addImage("ground",backgroundIMG);
  //ground.scale = 7;

  ground.shapeColor = "#897769"
  
  ground.y = ground.height/2;
  ground.velocityY = 5;

  ball = createSprite(150, 500, 10,10);
  ball.addImage("playerBall",playerIMG);
  ball.scale = 0.6;

  platformTemp = createSprite(150,650,100,10);

  spike1 = createSprite(50,780,10,10);
  spike1.addImage("groundSpikes1", spike1IMG);
  spike1.scale = 0.3;

  spike2 = createSprite(150,780,10,10);
  spike2.addImage("groundSpikes2", spike2IMG);
  spike2.scale = 0.3;

  spike3 = createSprite(250,780,10,10);
  spike3.addImage("groundSpikes2", spike3IMG);
  spike3.scale = 0.3;

  spike4 = createSprite(350,780,10,10);
  spike4.addImage("groundSpikes2", spike4IMG);
  spike4.scale = 0.3;

  spike5 = createSprite(450,780,10,10);
  spike5.addImage("groundSpikes2", spike5IMG);
  spike5.scale = 0.3;

  spike6 = createSprite(550,780,10,10);
  spike6.addImage("groundSpikes2", spike6IMG);
  spike6.scale = 0.3;

  platformsGroup = new Group();

  platformsBreakingGroup = new Group();

  start = createSprite(270,280,10,10);
  start.addImage("START", startIMG);


  gameOver = createSprite(270,280,10,10);
  
}

function draw() {
  background(255,255,255); 

  if(gameState === START){
      if(mousePressedOver(start)){
        gameState = PLAY;
      }

      start.visible = true;

      ground.velocityY = 0;

    }
    else if(gameState === PLAY){

      start.visible = false;

      ball.collide(platformTemp);

      start.animation = false;

      if(ball.isTouching(platformsGroup)){
        platformsGroup.collide(ball);
        ball.velocityX = 0;
        ball.velocityY = 0;
      }
       
      if(ball.isTouching(platformsBreakingGroup)){
        platformsBreakingGroup.collide(ball);
       ball.velocityX = 0;
       ball.velocityY = 0;
      }
     
       ball.velocityY = ball.velocityY + 0.8;

      ground.velocityY = 3;

      var selectPlatform = Math.round(random(1,2));
      if(frameCount % 60 === 0){
        if(selectPlatform === 1){
          spawnPlatforms();
        }
        else{
          spawnPlatformsBreaking();
        }
    }
       if(ground.y>800){
        ground.y = ground.height/2;
       }

       //if(spike1.y>550){
       // spike1.y = spike1.height/2;
       //}
      

      // if(spike2.y>550){
        //spike2.y = spike2.height/2;
       //}


      if(ball.isTouching(spike1)){
        gameState = END;
      }

      if(ball.isTouching(spike2)){
        gameState = END;
      }

      if(ball.isTouching(spike3)){
        gameState = END;
      }

      if(ball.isTouching(spike4)){
        gameState = END;
      }

      if(ball.isTouching(spike5)){
        gameState = END;
      }

      if(ball.isTouching(spike6)){
        gameState = END;
      }

      if(platformsGroup.isTouching(spike1)){
        platformsGroup.destroyEach();
      }

      if(platformsGroup.isTouching(spike2)){
        platformsGroup.destroyEach();
      }

      if(platformsGroup.isTouching(spike3)){
        platformsGroup.destroyEach();
      }

      if(platformsGroup.isTouching(spike4)){
        platformsGroup.destroyEach();
      }

      if(platformsGroup.isTouching(spike5)){
        platformsGroup.destroyEach();
      }
      
      if(platformsGroup.isTouching(spike6)){
        platformsGroup.destroyEach();
      }

      if(platformsBreakingGroup.isTouching(spike1)){
        platformsBreakingGroup.destroyEach();
      }

      if(platformsBreakingGroup.isTouching(spike2)){
        platformsBreakingGroup.destroyEach();
      }

      if(platformsBreakingGroup.isTouching(spike3)){
        platformsBreakingGroup.destroyEach();
      }

      if(platformsBreakingGroup.isTouching(spike4)){
        platformsBreakingGroup.destroyEach();
      }

      if(platformsBreakingGroup.isTouching(spike5)){
        platformsBreakingGroup.destroyEach();
      }

      if(platformsBreakingGroup.isTouching(spike6)){
        platformsBreakingGroup.destroyEach();
      }



      //spike1Move();
      //spike2Move();

    }
    else if(gameState === END){
       ground.velocityY = 0;
       ball.velocityX = 0;
       ball.velocityY = 0;

       start.visible = false;

       platformsGroup.setVelocityYEach(0);
       platformsBreakingGroup.setVelocityYEach(0);
    
       gameOver.addImage("GameOver", gameOverIMG);

       reset();
    }



  


  //jump();

  goLeft();

  goRight();


  drawSprites();

 if(gameState === START){
    textSize(20);
      fill("white");
      text("WELCOME", 300, 200);
      text("PRESS THE SPACE BAR KEY", 220,250 );
  }

 if(gameState === END){
   textSize(20);
   fill("white");
   text("GAME OVER", 260, 400);
   text("PRESS GAME OVER", 240,450);
   text("TO RESTART GAME", 240,480);
 }
}


function spawnPlatforms(){
    var platform = createSprite(Math.round(random(50,550)),0,10,40);
    platform.velocityY = 4;
    
    platform.addImage("PlatformImg", platform1Img);
    
              
    platform.scale = 0.3;
    platform.lifetime = 260;
    
    platformsGroup.add(platform);
  
}

function spawnPlatforms2(){
  var platform = createSprite(Math.round(random(50,550)),0,10,40);
  platform.velocityY = 4;
  
  platform.addImage("PlatformImg", platform1Img);
  
            
  platform.scale = 0.3;
  platform.lifetime = 260;
  
  platformsGroup.add(platform);

}

function spawnPlatformsBreaking(){
  
    var platformBreaking = createSprite(Math.round(random(50,550)),0,10,40);
    platformBreaking.velocityY = 4;
    
    platformBreaking.addImage("PlatformBreakingImg", platform2Img);
    
              
    platformBreaking.scale = 0.3;
    platformBreaking.lifetime = 260;
    
    platformsBreakingGroup.add(platformBreaking);
  
}

function spawnPlatformsBreaking2(){
  
  var platformBreaking = createSprite(Math.round(random(50,550)),0,10,40);
  platformBreaking.velocityY = 4;
  
  platformBreaking.addImage("PlatformBreakingImg", platform2Img);
  
            
  platformBreaking.scale = 0.3;
  platformBreaking.lifetime = 260;
  
  platformsBreakingGroup.add(platformBreaking);

}

//function spike1Move(){
  //if(gameState === PLAY){
    
   // spike1 = velocityY = -2;
  //}
//}

//function spike2Move(){
  //if(gameState === PLAY){
    
    //spike2 = velocityY = -2;
  //}
//}

//function jump(){
  //if (keyCode === 32){
    
 // }
//}


function goLeft(){
  if(keyCode === 37){
    ball.velocityX = -3;
    ball.velocityY = -5;
  }
}

function goRight(){
  if(keyCode === 39){
    ball.velocityX = 3;
    ball.velocityY = -5;
  }
}

function reset(){
  if(mousePressedOver === gameOver){
    gameState = START;
  }
}
