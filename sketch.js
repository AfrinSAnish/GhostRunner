var door, doorImg, climber, climberImg, tower, towerImg,invisibleBlock;

var ghost, ghostImg;

var doorsGroup, climbersGroup, invisibleBlockGroup;

var sound;

var score=0;

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  towerImg=loadImage("tower.png");
  ghostImg=loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  
  sound.loop();
  
  tower=createSprite(300,300,600,600);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  //tower.y=tower.height/2;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4;
  ghost.setCollider("rectangle",0,0,200,ghost.height);
  
  doorsGroup= new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}
function draw(){
  background("black");
  if(gameState===PLAY){
  
    if(tower.y>600){
  tower.y=tower.height/4;
     }
  spawnDoors();
  drawSprites();
  fill("white");
  textSize(20);
  text("Score: "+ score,450,550);
    score=score+Math.ceil(getFrameRate()/200);
  
  if(keyDown('left_Arrow')){
    ghost.x=ghost.x-5;
  }
  
  if(keyDown('right_Arrow')){
    ghost.x=ghost.x+5;
  }
  
  if(keyDown('Space')){
    ghost.velocityY=-5;
  }
  
  if(climbersGroup.isTouching(ghost)){
     ghost.velocityY=0;
     }
    
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState=END;
  }
    
  ghost.velocityY=ghost.velocityY+0.8;
  }else if (gameState===END){
    stroke("yellow");
    fill("green");
    textSize(35);
    text("GAME \n OVER",250,250);
    sound.stop();
    
  }
}
function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage("door",doorImg);
    door.velocityY=1;
    door.lifetime=600;
    door.x=Math.round(random(120,400));
    doorsGroup.add(door);
    
    climber=createSprite(200,10);
    climber.addImage("climber",climberImg);
    climber.velocityY=1;
    climber.lifetime=600;
    climber.x=door.x;
    climbersGroup.add(climber);
    
    invisibleBlock=createSprite(200,15,climber.width,2);
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=600;
    invisibleBlock.x=door.x;
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
  }
}