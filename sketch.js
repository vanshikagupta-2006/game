var PLAY = 1;
var END = 0;
var gameState = PLAY;
var runner;
var ground;
var ObstaclesGroup;
var count;
var runnerImage;
var obstacle;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacleImage;
var invisibleGround;
var obstacle2Image;
var obstacle3Image;
var obstacle4Image;
var groundImage;
var canvas;

function preload(){
  runnerImage = loadImage("images/runner.png");
  obstacleImage = loadImage("images/obstacle.jpg");
  obstacle2Image = loadImage("images/obstacle2.jpg");
  obstacle3Image = loadImage("images/obstacle3.png");
  obstacle4Image = loadImage("images/obstacle4.png");
  groundImage = loadImage("images/bg.jpg");
}

function setup(){
canvas = createCanvas(1000, 1000);
   invisibleGround = createSprite(200,385,400,5);
   ground = createSprite(200,380);
  runner = createSprite(100, 400, 10, 10);
  //obstacle = createSprite(120, 200, 40, 40);
  //obstacle2 = createSprite(140, 200, 40, 40);
  //obstacle3 = createSprite(195, 200, 40, 40);
  //obstacle4 = createSprite(220, 200, 40, 40);
  runner.addImage("runner", runnerImage );
  ground.addImage("ground", groundImage);
  runner.scale = 0.5;
  
  //create Obstacle
 ObstaclesGroup = createGroup();

}


function draw() {
  
  //set background to white
  background("white");
  //set collision radius for the trex
runner.setCollider("circle",0,0,40);

//scale and position the trex

runner.x = 50;

//create a ground sprite

//ground.setAnimation("ground2");
ground.x = ground.width /2;

//invisible Ground to support Trex

invisibleGround.visible = false;




//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);

//score
 count = 0;
  //display score
  text("Score: "+ count, 250, 100);
  console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6+3*count/100);
    //scoring
    count = Math.round(World.frameCount/4);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyIsDown(keyCode == 32) && runner.y >= 500){
      runner.velocityY = -12 ;
      
    }
  
    //add gravity
    runner.velocityY = runner.velocityY + 0.8;
    
    //spawn the clouds
    //spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(runner)){
      gameState = END;
      text("dead", 30, 40 );
    }
   
  }
  
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    runner.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    //CloudsGroup.setVelocityXEach(0);
    
 
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    //CloudsGroup.setLifetimeEach(-1);
    
    //place gameOver and restart icon on the screen
    //var gameOver = createSprite(200,300);
    //var restart = createSprite(200,340);
    
    //gameOver.setAnimation("gameOver");
    //gameOver.scale = 0.5;
    //restart.setAnimation("restart");
    //restart.scale = 0.5;
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  runner.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -(6+3*count/100);
    
    //generate random obstacles
    var rand = random(1,4);
    obstacle.addImage("obstacle" + rand + ".png");
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

//function spawnClouds() {
  //write code here to spawn the clouds
  //if (World.frameCount % 60 === 0) {
    //var cloud = createSprite(400,320,40,10);
    //cloud.y = randomNumber(280,320);
    //cloud.setAnimation("cloud");
    //cloud.scale = 0.5;
   //cloud.velocityX = -(3+3*count/100);
    
     //assign lifetime to the variable
    //cloud.lifetime = 134;
    
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
   // CloudsGroup.add(cloud);
  //}
  
//}
