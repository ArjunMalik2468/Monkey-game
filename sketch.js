var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup,survivalTime;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  monkey= createSprite(50,300,0,0);
  monkey.addAnimation("running",monkey_running);
  
  monkey.scale = 0.1;
  
  ground = createSprite(200,320,1000,20);
  ground.x = ground.width /2;
 
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
background("white");
  
  if(gameState === PLAY)
    {
        if(keyDown("space") && monkey.y >= 225) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
      
      stroke("white");
      textSize(20);
      fill("white");
      text("Score: "+ score,500,50);
      
      stroke("black");
      textSize(20);
      fill("black");
      survivalTime = Math.ceil(frameCount/frameRate())
      text("Survival Time:" + survivalTime,100,50);  
  
    if (ground.x < 100){
      ground.x = ground.width/2;
    }
  
      if(monkey.isTouching(obstacleGroup))
    {
      gameState = END;
    }
      
    monkey.collide(ground);
      
      spawnBanana();
    spawnObstacles();
    }

  
  if(gameState === END)
    {
      monkey.velocityX = 0;
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
      ground.velocityX = 0;
      monkey.velocityY = 0;
      monkey.x = 50;
      monkey.y = 300;
      monkey.collide(ground);
      
      
      textSize(24);
      text("game over",300,300)
    }
  
  
  
    
  
  drawSprites();
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.addImage(bananaImage)
    banana.y = Math.round(random(125,200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    //assign lifetime to the variable
    banana.lifeTime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  
    foodGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(300,295,10,40);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;    
    obstacle.velocityX = -8;
    obstacle.x = Math.round(random(400,600));
    obstacle.lifeTime = 200;
    obstacleGroup.add(obstacle);
  }
}





