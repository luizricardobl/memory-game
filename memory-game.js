/*    

   Term Project Title:  Memory Match Game

   Contributors:   Luiz De Lima

   Course:  CS 118-Scripting

   Date:  12/11/2020

*/
var images = ["https://codehs.com/static/img/library/characters/penguin.png","https://codehs.com/static/img/library/characters/monkey.jpg", "https://codehs.com/static/img/library/characters/leopard.jpg", 
              "https://codehs.com/static/img/library/characters/chameleon.jpg", "https://codehs.com/static/img/library/characters/lizard.jpg", "https://codehs.com/static/img/library/characters/butterfly.jpg", 
              "https://codehs.com/static/img/library/landscapes/flowers.jpg", "https://codehs.com/static/img/library/objects/soccerBall.png"];
var WIDTH = 400;
var HEIGHT = 400;
setSize(WIDTH, HEIGHT);

var WINNING_LINE_WIDTH = 10;
var WINNING_LINE_COLOR = Color.red;
var O = 1;
var X = 2;

var X_1 = getWidth()/4;
var X_2 = getWidth()/4*2;
var X_3 = getWidth()/4*3;
var X_4 = getWidth();

var Y_1 = getHeight()/4;
var Y_2 = getHeight()/4*2;
var Y_3 = getHeight()/4*3;
var Y_4 = getHeight();

var HALF_BOX = getWidth()/4/2;
var box_size = getWidth()/4;

var turns = 1;
var grid = new Grid(5, 5);

var image1;
var firstImage;
var secondImage;
var imageName;
var firstObject;
var secondObject;
var score;

function setupGrid(){
    for(var i = 1; i < 5; i++){
        for(var j = 1; j < 5; j++){
            grid.set(i,j, images[Randomizer.nextInt(0, 7)]);
        }
    }
}
function start(){
    setBackgroundColor(Color.yellow);
    grid.init(0);
    setupGrid();
    drawTicTac();
    score = -1;
	mouseClickMethod(handleClick);
}
/*This function shows the game start screen, prompting the user 
to click the button, when it is clicked, the function to start the actual game
is called.*/
/*function startScreen(){
    var button = new Rectangle (50,50);
    button.setPosition(getWidth()/2, getHeight()/2);
    add(button);
}*/

function handleClick(e){
    var x = e.getX();
    var y = e.getY(); 
    var row = getRowForClick(y);
    var col = getColForClick(x);
    //println("row is " + row + " col is " + col);
    turnCard(row, col);
    /*This if statement checks if the images are equal at the end of the turn:
    If the pair is equal, add points and turn equals 1 again. 
    Else, if the pair is not equal, remove images and turn equals 1 again.
    */
    if (turns == 1){
        checkForEqual();
        firstImage = imageName;
        firstObject = image1;
        turns++;
    }else if (turns == 2){
        secondImage = imageName;
        secondObject = image1;
        turns = 1;
    }
}
function checkForEqual(){
    if (firstImage == secondImage){
        score++
        println("Equal, you have earned a point! Total score: " + score);
    } else {
        println("Not equal, try again! Total score: " + score);
        remove(firstObject);
        remove(secondObject);
    }
}
//The logic to find which row was clicked.
function getRowForClick(y){
    if (y < Y_1){
        return 1;
    } else if (y < Y_2){
        return 2;
    } else if (y < Y_3){
        return 3;
    } else {
        return 4;
    }
}
//The logic to find which row was clicked.
function getColForClick(x){
    if (x < X_1){
        return 1;
    } else if (x < X_2){
        return 2;
    } else if (x < X_3){
        return 3;
    } else {
        return 4;
    }
}
//This function turns a card to show the image.
function turnCard(row, col){
    var x = (col - 1) * box_size;
    var y = (row - 1) * box_size;
    image1 = new WebImage(grid.get(row,col));
    imageName = grid.get(row, col);
    image1.setSize(box_size, box_size);
    image1.setPosition(x, y);
    add(image1);
}
//This function draws the cards on the table.
function drawTicTac(){
    var width = getWidth()/4;
    var height = getHeight();
    drawHLine(width, height);
    
    width = getWidth();
    height = getHeight()/4;
    drawVLine(width, height);
}

//This function draws the horizontal lines.
function drawHLine(width, height){
    var line1 = new Line(width, 0, width, height);
    var line2 = new Line(width*2, 0, width*2, height);
    var line3 = new Line(width*3, 0, width*3, height);
    add(line1);
    add(line2);
    add(line3);
}
//This function draws the vertical lines.
function drawVLine(width, height){
    var line1 = new Line(0, height, width, height);
    var line2 = new Line(0, height*2, width, height*2);
    var line3 = new Line(0, height*3, width, height*3);
    add(line1);
    add(line2);
    add(line3);
}