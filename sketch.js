
var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;

var backgroundIMG;
var ground;

var playerBall, playerIMG;

var platform1Img, platform2Img;

var spike1,spike2;

var spike1IMG, spike2IMG;

var platformsGroup, platformsBreakingGroup;

var platformTemp;

function preload(){
  backgroundIMG = loadImage("Images/Background.png");
  playerIMG = loadImage("Images/BallOrignal.png");

  platform1Img = loadImage("Images/Platform1.png");
  platform2Img = loadImage("Images/Platform2.png");

  spike1IMG = loadImage("Images/spike1.png");
  spike2IMG = loadImage("Images/Spikes2.png");

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

  spike1 = createSprite(150,780,10,10);
  spike1.addImage("groundSpikes1", spike1IMG);
  spike1.scale = 0.3;

  spike2 = createSprite(450,780,10,10);
  spike2.addImage("groundSpikes2", spike2IMG);
  spike2.scale = 0.3;

  platformsGroup = new Group();

  platformsBreakingGroup = new Group();
  
}

function draw() {
  background(255,255,255); 

    if(gameState === START){
      if(keyDown("space")){
        gameState = PLAY;
      }

      ground.velocityY = 0;

    }
    else if(gameState === PLAY){

      ball.collide(platformTemp);

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

      if(platformsGroup.isTouching(spike1)){
        platformsGroup.destroyEach();
      }

      if(platformsGroup.isTouching(spike2)){
        platformsGroup.destroyEach();
      }

      if(platformsBreakingGroup.isTouching(spike1)){
        platformsBreakingGroup.destroyEach();
      }

      if(platformsBreakingGroup.isTouching(spike2)){
        platformsBreakingGroup.destroyEach();
      }



      //spike1Move();
      //spike2Move();

    }
    else if(gameState === END){

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
}

function spawnPlatforms(){
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
