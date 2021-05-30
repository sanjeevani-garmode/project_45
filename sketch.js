var PLAY = 1;
var END = 0;
var gameState = PLAY;

var snake, snakeImg, snakeDeadImg;
var ground, invisibleGround, groundImage, groundImage2 ;

var fruitsGroup, fruit1, fruit2, fruit2 ,fruit3, fruit4, fruit5, fruit6;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound


function preload(){
  snakeImg = loadImage("snake.png");
  snakeDeadImg = loadImage("diedSnake.png");
  
  groundImage = loadImage("garden.jpg");
  groundImage2 = loadImage("garden2.jpg");
  
  fruit1Img = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  fruit4Img = loadImage("fruit4.png");
  fruit5Img = loadImage("fruit5.png");
  fruit6Img = loadImage("fruit6.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  
   restartImg = loadImage("reset.png")
  gameOverImg = loadImage("gameover.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(1500, 770);
  
  snake = createSprite(50,740,20,50);
  snake.addImage("snake", snakeImg);
  snake.addImage("snakeDeadImg" ,snakeDeadImg);
  snake.scale = 0.5;
  
  //ground = createSprite(600,750,1000,770);
  //ground.addImage("ground",groundImage2);
  //ground.x = ground.width /2;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(750,740,1500,20);
  invisibleGround.visible = false;
  
  //create Obstacle and fruits Groups
  obstaclesGroup = createGroup();
  fruitsGroup = createGroup();
  
  console.log("Hello" + 5);

  snake.setCollider("circle",0,0,40);
  snake.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(groundImage);
  //displaying score
  stroke("black") ;
  textSize(30);
  text("Score: "+ score, 1300,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    //ground.velocityX = -4;
    //scoring
    
    //if (ground.x < 0){
      //ground.x = ground.width/2;
    //}
    if(keyDown(LEFT_ARROW)){
      snake.x-=4;
    }
    if(keyDown(RIGHT_ARROW)){
      snake.x+=4;
    }
      
    //jump when the space key is pressed
    if(keyDown("space")&& snake.y >= 100) {
        snake.velocityY = -12;
    }
    
    //add gravity
    snake.velocityY = snake.velocityY + 0.8
  
    //spawn the fruits
    spawnFruits();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    for (var i = 0; i < fruitsGroup.length; i++) {
      if (fruitsGroup.get(i).isTouching(snake)) {
          score +=5;
          fruitsGroup.get(i).destroy();
        }
      
  }

    if(obstaclesGroup.isTouching(snake)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      snake.velocityY = 0
     
      //change the snake animation
      snake.changeAnimation("collided", snakeDeadImg);
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    fruitsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     fruitsGroup.setVelocityXEach(0);
   }
  
 
  //stop snake from falling down
  snake.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 200 === 0){
   var obstacle; 
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1:
        obstacle = createSprite(1500,710,10,40);
        obstacle.velocityX = -6;
    obstacle.addImage(obstacle1);
              break;
      case 2:
        obstacle = createSprite(1500,700,10,40);
        obstacle.velocityX = -6;
         obstacle.addImage(obstacle2);
              break;
      case 3:
        obstacle = createSprite(1500,720,10,40);
        obstacle.velocityX = -6;
         obstacle.addImage(obstacle3);
              break;
      case 4:
        obstacle = createSprite(1500,690,10,40);
        obstacle.velocityX = -6;
         obstacle.addImage(obstacle4);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
 
  
}

function spawnFruits() {
  //write code here to spawn the fruits
  if (frameCount % 100 === 0) {
    fruits = createSprite(random(100, 1000), 0, 100, 100);
    fruits.velocityY = 6;
    var rand = Math.round(random(1,6));
    switch(rand){
        case 1: fruits.addImage("fruit1",fruit1Img);
        break;
        case 2: fruits.addImage("fruit2", fruit2Img);
        break;
        case 3: fruits.addImage("fruit3", fruit3Img);
        break;
        case 4: fruits.addImage("fruit4", fruit4Img);
        break;
        case 5: fruits.addImage("fruit5", fruit5Img);
        break;
        case 6: fruits.addImage("fruit6", fruit6Img);
        break;
        
    }
    fruits.scale = 0.5;
    //fruits.velocityX = -3;
    
     //assign lifetime to the variable
    fruits.lifetime = 134;
    
    //adjust the depth
    fruits.depth = snake.depth;
    snake.depth = snake.depth + 1;

    fruitsGroup.add(fruits);

  
    }
}

