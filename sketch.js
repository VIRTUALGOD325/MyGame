
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

var platformsGroup, platformsGroup2, platformsBreakingGroup;

var platformBottomGroup, platform2BottomGroup, platformBreakingBottomGroup;

var platformTemp;

var start,startIMG;

var restart,restartIMG;

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
  platformsGroup2 = new Group();
  platformsBreakingGroup = new Group();

  platformBottomGroup = new Group();
  platform2BottomGroup = new Group();
  platformBreakingBottomGroup = new Group();

  start = createSprite(270,280,10,10);
  start.addImage("START", startIMG);


  gameOver = createSprite(270,280,10,10);
  gameOver.addImage("GameOver", gameOverIMG);
  
}

function draw() {
  background(255,255,255); 

  if(gameState === START){
      if(mousePressedOver(start)){
        gameState = PLAY;
      }

      platformsGroup.collide(ball);
      platformsGroup2.collide(ball);
      platformsBreakingGroup.collide(ball);

      start.visible = true;

      gameOver.visible = false;

      ground.velocityY = 0;

      

    }
    else if(gameState === PLAY){

      start.visible = false;

      gameOver.visible = false;

      if(keyDown('space')){
        ball.velocityY = -10;
      }

      //Gravity
      ball.velocityY = ball.velocityY + 0.8;

      if(keyDown('left')){
        ball.x = ball.x - 2;
      }

      if(keyDown('right')){
        ball.x = ball.x + 2;
      }

      ball.collide(platformTemp);

     // start.animation = false;

      if(ball.isTouching(platformsGroup)){
        
        ball.velocityX = 0;
        ball.velocityY = 0;

        platformsGroup.velocityY=4;
      }
       
      if(ball.isTouching(platformsGroup2)){
        
        ball.velocityX = 0;
        ball.velocityY = 0;

        platformsGroup.velocityY=4;
      }
       

      if(ball.isTouching(platformsBreakingGroup)){
        
       ball.velocityX = 0;
       ball.velocityY = 0;

       platformsGroup.velocityY=4;
      }
     
      ground.velocityY = 3;

      var selectPlatform = Math.round(random(1,3));
      if(frameCount % 60 === 0){
        if(selectPlatform === 1){
          spawnPlatforms();
        }
        else if(selectPlatform === 2){
          spawnPlatforms2();
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


      if(ball.isTouching(spike1) || ball.isTouching(spike2) || ball.isTouching(spike3) 
      || ball.isTouching(spike4) || ball.isTouching(spike5) || ball.isTouching(spike6) ){
        gameState = END;
      }

      if(ball.isTouching(platformBottomGroup) || ball.isTouching(platform2BottomGroup) || ball.isTouching(platformBreakingBottomGroup)){
        gameState = END;
      }

      if(platformsGroup.isTouching(spike1)){
        platformsGroup.destroyEach();
        platformsGroup2.destroyEach();
        platformsBreakingGroup.destroyEach();
      }

      if(platformsGroup.isTouching(spike2)){
        platformsGroup.destroyEach();
        platformsGroup2.destroyEach();
        platformsBreakingGroup.destroyEach();
      }

      if(platformsGroup.isTouching(spike3)){
        platformsGroup.destroyEach();
        platformsGroup2.destroyEach();
        platformsBreakingGroup.destroyEach();
      }

      if(platformsGroup.isTouching(spike4)){
        platformsGroup.destroyEach();
        platformsGroup2.destroyEach();
        platformsBreakingGroup.destroyEach();
      }

      if(platformsGroup.isTouching(spike5)){
        platformsGroup.destroyEach();
        platformsGroup2.destroyEach();
        platformsBreakingGroup.destroyEach();
      }

      
      if(platformsGroup.isTouching(spike6)){
        platformsGroup.destroyEach();
        platformsGroup2.destroyEach();
        platformsBottomGroup.destroyEach();
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
       platformsGroup2.setVelocityYEach(0);
       platformsBreakingGroup.setVelocityYEach(0);

       platformBottomGroup.setLifetimeEach(-1);

       platformBottomGroup.setVelocityYEach(0);
       platform2BottomGroup.setVelocityYEach(0);
       platformBreakingBottomGroup.setVelocityYEach(0);

                                            
    
       gameOver.visible = true;     

       if(mousePressedOver(gameOver)){
        
         
        reset();
        
      }
    }



  


  //jump();

  //goLeft();

  //goRight();


  drawSprites();

 if(gameState === START){
    textSize(20);
      fill("white");
      text("WELCOME", 220, 180);
      text("PRESS THE START BUTTON", 160,200 );
      text("USE LEFT ARROW TO MOVE LEFT", 160,330 );
      text("USE RIGHT ARROW TO MOVE RIGHT", 160,350 );
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
    var platformTop = createSprite(platform.x, platform.y-10, 10, 40);
    var platformBottom = createSprite(platform.x, platform.y+15, 80, 10);
    
    platform.velocityY = 4;
    platformBottom.velocityY = 4;
    
    platform.addImage("PlatformImg", platform1Img);
    
              
    platform.scale = 0.3;
    platform.lifetime = 260;
    
    platformBottomGroup.add(platformBottom);
    platformsGroup.add(platform);
  
}

function spawnPlatforms2(){
  var platform2 = createSprite(Math.round(random(50,550)),0,10,40);
  var platform2Top = createSprite(platform2.x, platform2.y-10, 10, 40);
  var platform2Bottom = createSprite(platform2.x, platform2.y+15, 80, 10);
  platform2.velocityY = 4;
  platform2Bottom.velocityY = 4;
  
  platform2.addImage("PlatformImg", platform1Img);
  
            
  platform2.scale = 0.3;
  platform2.lifetime = 260;
  
  platformsGroup2.add(platform2);
  platform2BottomGroup.add(platform2Bottom);

}

function spawnPlatformsBreaking(){
  
    var platformBreaking = createSprite(Math.round(random(50,550)),0,10,40);
    var platformBreakTop = createSprite(platformBreaking.x, platformBreaking.y-10, 10, 40);
    var platformBreakBottom = createSprite(platformBreaking.x, platformBreaking.y+15, 80, 10);
    platformBreaking.velocityY = 4;
    platformBreakBottom.velocityY = 4;
    
    platformBreaking.addImage("PlatformBreakingImg", platform2Img);
    
              
    platformBreaking.scale = 0.3;
    platformBreaking.lifetime = 260;
    
    platformsBreakingGroup.add(platformBreaking);
    platformBreakingBottomGroup.add(platformBreakBottom);
  
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

function reset(){
  gameState = PLAY;

  platformsGroup.destroyEach();
  platformsGroup2.destroyEach();
  platformsBreakingGroup.destroyEach();

  platformBottomGroup.destroyEach();
  platform2BottomGroup.destroyEach();
  platformBreakingBottomGroup.destroyEach();

  ball.x = 150; 
  ball.y = 500;
}
