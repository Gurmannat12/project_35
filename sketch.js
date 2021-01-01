var dog;
var dogImg,happyDogImg;
var foodS,foodStock;
var database;

function preload()
{
  dogImg = loadImage("dog.png");
  happyDogImg = loadImage("happy.png");
}

function setup() {
  createCanvas(500,500);

  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
  
  dog = createSprite(250,250,40,150);
  dog.scale = 0.3;
  dog.addImage(dogImg);

}


function draw() { 
  background(46,139,87);

  if(foodS!==undefined){
    textSize(20);
    stroke("white");
    fill("white");
    text("Food Remaining: "+foodS,150,130);

  }

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);

  }

  drawSprites();
  //add styles here
  textSize(20);
  stroke("grey");
  text("Note: Press UP_ARROW Key To Feed Drago Milk",30,60);
  stroke(1);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



