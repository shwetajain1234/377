var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;


function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappyImg = loadImage("happy dog.png");
  milkImg = loadImage("milk.png");
  

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  emo = createSprite(200,200,1,1);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(30);


  milk1 = createSprite(210,280,10,10);
  milk1.addImage(milkImg);
  milk1.scale = 0.050;
  milk1.visible = false;
  
 

}


function draw() {  
  background("lightgreen")

  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);
    milk1.visible = true;
    foodS = foodS-1
   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    milk1.visible = false;
  }
}

if(foodS == 0){
  
  dog.addImage(dogImg);
 // foodS = 5;
 fill("red")
 textSize(20)
 text("YUMM !!",140,250)

}



  drawSprites();
  textSize(17);
  fill("black");
  text("I am your dog Blu... I am Hungry ",125,170);
  fill("black");
  text(" Press up arrow key to feed your pet.",10,15);
  fill("black");
  text("Milk Bottles Remaining :"+foodS,20,490);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}

