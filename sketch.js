var player_box, ground, background1;
var player_boxImage, groundImage, backgroundImage;
var invGround;
var bgSound, jumpSnd;
var tri, tri1, tri2, tri3;
var triGroup;
var PLAY = 1;
var END = 0;
var OVER = 2;
var gameState = PLAY;
var tri2a, tri2b, rect2a, rect2b, rect1a, rect1b, cone1a, cone1b, mountain1, mountain2;
var rect_srt, rest_lng, rect_huge;
var antennaAnim;
var shortBoxImg, shortBox, longBoxImg, longBox;
var mountainImage;
var rectGroup;
var score = 0;
var soundControl = 0;
var obstacleGrp;
var lives = 3;
var score = 0;
var restart, restartImage;
var font;
function preload() {
    groundImage = loadImage("ground.png");
    bgImage = loadImage("bg.png");
    player_boxImage = loadImage("Player.png");
    bgSound = loadSound("SoundEffects/bg.mp3");
    bgImage = loadImage("bg.png");
    tri1 = loadImage("Obstacle.svg");
    antennaAnim = loadAnimation("ConeObs/Antenna1.svg", "ConeObs/Antenna2.svg", "ConeObs/Antenna3.svg", "ConeObs/Antenna4.svg", "ConeObs/Antenna5.svg", "ConeObs/Antenna4.svg", "ConeObs/Antenna3.svg", "ConeObs/Antenna2.svg", "ConeObs/Antenna1.svg");
    jumpSnd = loadSound("SoundEffects/Jump.mp3");
    shortBoxImg = loadImage("ShortBox.png");
    longBoxImg = loadImage("LongBox.png");
    mountainImage = loadImage("Mountain.svg");
    restartImage = loadImage("Reset.png");
    font = loadFont("knewave.otf");
}

function setup() {
    createCanvas(1200, 700)

    background1 = createSprite(600, 310)
    background1.addImage(bgImage);
    background1.scale = 1
    obstacleGrp = createGroup();
    //bgSound.play()
    ground = createSprite(600, 550)
    ground.scale = 0.7

    ground.addImage(groundImage);
    //ground.debug = true;
    ground.x = ground.width / 2;

    //add inv ground;
    invGround = createSprite(600, 450, 1200, 10);
    invGround.visible = false;

    player_box = createSprite(100, 400);
    player_box.addImage(player_boxImage);
    player_box.scale = 0.15;

    rectGroup = createGroup()

    restart = createSprite(1200/2, 700/2 + -100, 10, 10);
    restart.addImage(restartImage);
    restart.scale = 0.08;
    restart.visible = false;
}

function draw() {
    background("white")
    textSize(30)


    console.log(score);
    drawSprites();
    if (gameState === PLAY) {
        player_box.velocityX = 1
        ground.velocityX = -12
        restart.visible = false;

        if (frameCount % 20 == 0) {
            score = score + 1;
        }
        if (ground.x < 0) {
            ground.x = ground.width / 2
        }

        if (obstacleGrp.isTouching(player_box)) {
            lives = lives - 1
            gameState = END;
        }
        if(lives<1){
           gameState = OVER;
        }
        // player_box.velocityX = 2;
        //camera.x = player_box.x + 350;
        //camera.y = player_box.y;
        if (keyDown("space")) {
            player_box.velocityY = -20;
            soundControl = 1;
        } else {
            soundControl = 0;
        }
        if (soundControl === 1) {
            //jumpSnd.play();
        }
        //Add gravity
        player_box.velocityY += 0.9;
        // spawnTri()

    } else if (gameState === END) {
        gameState = PLAY;
        player_box.x = 100;
        obstacleGrp.destroyEach();
        rect1a.destroy()
        cone1a.destroy()
        score = 0;
        // ground.velocityX = 0;
        // player_box.velocityX = 0;
        // //  player_box.velocityY = 3;
        // rect1a.velocityX = 0;
        // cone1a.velocityX = 0;
        // obstacleGrp.setVelocityXEach(0);
       // restart.visible = true;
    }else if (gameState === OVER) {

        ground.velocityX = 0;
        player_box.velocityX = 0;
        //  player_box.velocityY = 3;
        rect1a.velocityX = 0;
        cone1a.velocityX = 0;
        obstacleGrp.setVelocityXEach(0);
        restart.visible = true;
        fill("yellow");
    textSize(60);
    textLeading(32);
    textFont('Fredericka the Great');
        text("Game Over", 1200/2 - 150, 700/2 + -150);
        fill("White");
        text("Game Over", 1200/2 - 152, 700/2 + -150);
        score = 0;
    }
if(mousePressedOver(restart) && gameState === OVER){
gameState = PLAY;
player_box.x = 100;
obstacleGrp.destroyEach();
rect1a.destroy()
cone1a.destroy()
score = 0;
lives=3
}
    player_box.collide(invGround);
    player_box.collide(rectGroup);

    
    obsGroup();
    fill("white");
    textSize(32);
    textLeading(32);
    textFont('Fredericka the Great');

    text("LIVES ❤: " + lives, 50, 50);
    // checking gameStates
    text("Score⛳: " + score, width - 200, 50);
}

//function to spawn triangles
function spawnTri() {
    if (frameCount % 120 == 0) {
        tri = createSprite(1220, 420, 50, 50);
        triGroup.add(tri);
        tri.velocityX = -5;
        tri.addImage(tri1);
        tri.scale = 2;
    }

}


function obsGroup() {
    if (frameCount % 300 == 0) {
        tri2a = createSprite(1220, 420)
        tri2a.addImage(tri1)
        tri2a.velocityX = -12;
        tri2a.scale = 2;
        obstacleGrp.add(tri2a);

        tri2b = createSprite(1280, 420)
        tri2b.addImage(tri1)
        tri2b.velocityX = -12;
        tri2b.scale = 2;
        obstacleGrp.add(tri2b);

        rect1a = createSprite(1340, 420)
        rect1a.addImage(shortBoxImg)
        rect1a.velocityX = -12;
        rectGroup.add(rect1a)
            //rect1a.debug = true
        rect1a.setCollider("rectangle", 0, 0, 50, 50)


        cone1a = createSprite(1340, 375)
        cone1a.addAnimation("cone", antennaAnim)
        cone1a.velocityX = -12;
        cone1a.scale = 1.3;

        mountain1 = createSprite(1450, 430);
        mountain1.addImage(mountainImage)
        mountain1.velocityX = -12;
        mountain1.scale = 1.5;
        obstacleGrp.add(mountain1);
    }
}