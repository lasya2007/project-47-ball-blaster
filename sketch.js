var PLAY=1,END=0;
var gameState=PLAY;
var bgImg,blasterImg,blueHexagonImg,redHexagonImg,greenHexagonImg,bulletImg;
var blaster;
var bullet,bulletGroup;
var hexagon,hexagonGroup;
var ground;
var angle=0;
var gameOver,gameOverImg,replay,replayImg;
var score = 0;
function preload(){
    bgImg = loadImage("bg.jpg");
    blasterImg = loadImage("blaster.png");
    blueHexagonImg = loadImage("bluehexagon.png");
    redHexagonImg = loadImage("redhexagon.png");
    greenHexagonImg = loadImage("greenhexagon.png");
    bulletImg = loadImage("bullet.png");
    gameOverImg = loadImage("gameOver.png");
    replayImg = loadImage("restart.webp");
}

function setup(){
    createCanvas(1000,600);

    blaster = createSprite(500,500,25,25);
    blaster.addImage(blasterImg);
    blaster.scale = 0.7;
    blaster.setCollider("rectangle",0,0,125,160);
    blaster.debug=true;
    ground = createSprite(500,580,1000,40);
    ground.visible=false;
    //ground.debug=true;

    gameOver = createSprite(500,280,50,50);
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.3;
    gameOver.visible=false;
    replay = createSprite(500,380,30,30);
    replay.addImage(replayImg);
    replay.scale=0.1;
    replay.visible=false;
    hexagonGroup = new Group();
    bulletGroup = new Group();
}

function draw(){
    background(bgImg);
text(mouseX+", "+mouseY,mouseX,mouseY);

    if(gameState === PLAY){
        if(keyDown(LEFT_ARROW) && blaster.x>20){
            blaster.x-=7;
        }
    
        if(keyDown(RIGHT_ARROW) && blaster.x<980){
            blaster.x+=7;
        }
    
        if(frameCount%4===0){
            bullet = createSprite(blaster.x, 430,10,10);
            bullet.addImage(bulletImg);
            bullet.scale=0.05;
            bullet.velocityY=-12;
            bulletGroup.add(bullet);
        }
    
        dropHexagons();
    
    
        createEdgeSprites();
        hexagonGroup.bounceOff(ground);

        if(hexagonGroup.isTouching(blaster)){
            gameState = END;
        }
    }
    else if(gameState === END){
       // hexagonGroup.setVelocityYEach(2);
        hexagonGroup.collide(ground);

       gameOver.visible=true;
       replay.visible=true;

        if(keyDown("r")){
            gameOver.visible=false;
            replay.visible=false;

            score = 0;
            hexagonGroup.destroyEach();
            blaster.x=500;
            blaster.y=500;
            gameState = PLAY;
        }
    }
    
    //gravity
    if(hexagon!=undefined){
        hexagon.velocityY+=0.8;
    }

    drawSprites();

    textSize(20);
    fill("blue");
    stroke("white");
    strokeWeight(3);
    text("Score: "+score,850,20)
}

function dropHexagons(){
    if(frameCount%80===0){
        var x=random(50,950);
       /* push();
        translate(x,-20);
        rotate(random(0,360));*/
        hexagon = createSprite(x,-20,25,25);
       
    // pop();
        var rand=Math.round(random(1,3));
        switch(rand){
            case 1: hexagon.addImage(blueHexagonImg);
                    hexagon.scale = random(0.73,0.85);
                    break;
            case 2: hexagon.addImage(redHexagonImg);
                    hexagon.scale = random(0.37,0.47);
                    break;
            case 3: hexagon.addImage(greenHexagonImg);
                    hexagon.scale = random(0.13,0.18);
                    break;
            default: break;
        }
        hexagon.velocityY = 0;
       
        hexagon.depth=ground.depth;
        hexagonGroup.add(hexagon);
        }
       
        angle+=10;
        hexagonGroup.setRotationEach(angle);
}