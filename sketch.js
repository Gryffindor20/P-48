var bgImg;
var shooter, shooterImg1, shooterImg2, shooterImg3;
var zombie, zombieImg1, zombieImg2;
var bullet, bulletImg;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var bg;
var bulletGp, ZombieGp;
var score = 0;
var heart
var explosionSound;
var life = 3;
var gameState = "play"
var loseSound;

function preload(){
  bgImg = loadImage("assets/zombie-bg.jpg");
  shooterImg1 = loadImage("assets/GunStand.png") ;
  shooterImg2 = loadImage("assets/GunWalk.png") ;
  shooterImg3 = loadImage("assets/GunShot.png") ;
  zombieImg1 = loadImage("assets/Zombie1.png");
  zombieImg2 = loadImage("assets/zombie.png");
  bulletImg = loadImage("assets/Bullet.png");
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  explosionSound = loadSound("assets/explosion.mp3");
  loseSound = loadSound("assets/lose.mp3");
}

function setup()
 {
  createCanvas(1366, 625);
  console.log(windowWidth);
  console.log(windowHeight);

  bg = createSprite(1366/2, 625/2, 1366, 625);
  bg.visible = false;
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
   heart1.addImage("heart1",heart1Img)
   heart1.scale = 0.4

   heart2 = createSprite(displayWidth-100,40,20,20)
   heart2.visible = false
   heart2.addImage("heart2",heart2Img)
   heart2.scale = 0.4

   heart3 = createSprite(displayWidth-150,40,20,20)
   heart3.addImage("heart3",heart3Img)
   heart3.scale = 0.4

  shooter = createSprite(390, 530);
  shooter.addAnimation("shooting", shooterImg1);  

  bulletGp = new Group();
  zombieGp = new Group();
}

function draw() 
{
  
  if(gameState === "play"){
    background(bgImg);
  zombies();
//1013, 781;
textSize(30);
fill("white")
stroke(39, 242, 42);
strokeWeight(3)
text("Score: " + score, 80, 30);
shooter.y = mouseY;
if(shooter.y < 390){
  shooter.y = 390;
}
for(var i=0;i<zombieGp.length;i++){     
      
  if(zombieGp[i].x < 0){
       zombieGp[i].destroy()
       life = life - 1;
      console.log("passed :)");      
       } 
}
//if(shooter.y === shooter.y + 1 || shooter.y === shooter.y - 1){
 // shooter.changeAnimation("shooting", shooterImg);
 if(mousePressedOver(bg)){
   console.log("hello");
   bullet = createSprite(shooter.x+60, shooter.y);
   bullet.addImage(bulletImg);
   bullet.velocityX = 6;
  bullet.scale = 0.1
 
  bullet.setCollider("rectangle", 0, 0, 60, 30)
  bulletGp.add(bullet);
 }
 if (bulletGp.collide(zombieGp)){
   bulletGp[0].destroy();
   zombieGp[0].destroy();
   explosionSound.play();
   score = score + 10;
 }
 if(life===3){
  heart3.visible = true
  heart1.visible = false
  heart2.visible = false
}
if(life===2){
  heart2.visible = true
  heart1.visible = false
  heart3.visible = false
}
if(life===1){
  heart1.visible = true
  heart3.visible = false
  heart2.visible = false
}
if (life == 0){
  gameState = "lose";
  loseSound.play();
}
  }

 if (gameState =="lose"){
  background("black");
  text("Game Over :(", windowWidth/2 - 10, windowHeight/2 - 10);
  shooter.destroy();
  heart.destroy();
  
 }
  drawSprites();
}
function zombies(){
  if(frameCount%90 === 0){
    console.log("hi");
    zombie  = createSprite(1160, random(400,620), 50, 50);
    zombie.velocityX = -3;
    var num = round(random(1,6));
    switch(num){
      case 1: zombie.addImage(zombieImg1)
      zombie.scale = 0.8
      break;

      case 2: zombie.addImage(zombieImg2)
      zombie.scale = 0.17
      break;

      case 3: zombie.addImage(zombieImg1)
      zombie.scale = 0.8
      break;

      case 4: zombie.addImage(zombieImg1)
      zombie.scale = 0.8
      break;

      case 5: zombie.addImage(zombieImg1)
      zombie.scale = 0.8
      break;

      case 6: zombie.addImage(zombieImg1)
      zombie.scale = 0.8
      break;
    }
    zombie.lifetime = 396;
    shooter.depth = zombie.depth + 1;
    zombie.setCollider("rectangle", 0, 0, 100, 200)
    zombieGp.add(zombie);
  }
}
