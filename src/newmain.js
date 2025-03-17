import {allTapes, allTapesYPos, imageSources, videoSources, textSources} from './data.js';
import { getLines, getText } from './text.js';

let screenPadding = 15;
let screenWidth = window.innerWidth - screenPadding;
let screenHeight = window.innerHeight - screenPadding;

var curObject = null;
var curObjectInitialPos = null;
var tapeIsIn = false;
var curHover = -1;
var tvSelected = false;

let canvas, ctx;


let imageData = [];

let videoData = [];
let currentVideo = null;

let currentText = null;

let mousePos = {x:0, y:0};
let objects = [];
let tapes = [];

//loc stuff, ,
let textLoc = {x: screenWidth*0.62, y: screenHeight*0.1, width: screenWidth * 0.75};//text pos/size
let videoPos = {x: screenWidth * 0.225, y: screenHeight*0.28, width: screenWidth*0.28, height: screenHeight*0.32}; //video pos/size
let tvBounds = 10;
let dropObj = {x: screenWidth * 0.48, y: screenHeight * 0.525, width: screenWidth*0.15, height: screenHeight* 0.12}; //n64 pos/size
let dropPoint = {x: screenWidth * 0.523, y: screenHeight * 0.475};
let dropPointMaxDistance = 250;

let hasPutInCartridge = false;
let hasClickedTV = false;


let largeFontSize = screenWidth*0.06;
let smallFontSize = screenWidth*0.01;
let fontSize = screenWidth * 0.015;
let tapeXStart = screenWidth *0.052;

function init()
{
    createCanvas();

    setupBackground();
    
    //add tv table
    //addObject('table', imageData['table'], screenWidth * 0.09, screenHeight*0.695, screenWidth*0.65, screenHeight* 0.3); 
    //add tv in    
    //add drop point
    addObject('n64', imageData['n64'], dropObj.x, dropObj.y, dropObj.width, dropObj.height);
    addObject('dropPoint2', imageData['n64'], dropPoint.x, dropPoint.y, 50, 50);

    //this is for lining up the n64 drop spot
    // addObject('sample', imageData['city'], dropPoint.x, dropPoint.y, screenWidth*0.1, screenHeight*0.08);

    //add in storage behind tapes
    //let boxHeight = screenHeight*0.1;
    //for (var i = 0; i < allTapes.length; i++)
    //{
    //    addObject(allTapes[i], imageData['box'], 0, screenHeight*0.3 + (i * boxHeight), screenWidth*0.14, boxHeight);
    //}
    //add in tapes
    var curY = 0;
    for (var i = 0; i < allTapes.length; i++)
    {
        curY += screenHeight*allTapesYPos[i];
        tapes.push(addObject(allTapes[i], imageData[allTapes[i]], tapeXStart, screenHeight*0.073 + curY, screenWidth*0.08, screenHeight*0.08));
    }

    drawObjects();
    loop();
}

function setupBackground()
{
    addObject('background_outside', imageData['background_outside'], 0, 0, screenWidth, screenHeight);
    addObject('background_wall', imageData['background_wall'], 0, 0, screenWidth, screenHeight);

    addObject('tv' ,imageData['tv'], videoPos.x - (tvBounds/2), videoPos.y - (tvBounds/2), videoPos.width + tvBounds, videoPos.height + tvBounds); 

    addObject('background_topShelf', imageData['background_topShelf'], 0, 0, screenWidth, screenHeight);
    addObject('background_table', imageData['background_table'], 0, 0, screenWidth, screenHeight);
    addObject('background_pictures', imageData['background_pictures'], 0, 0, screenWidth, screenHeight);
    addObject('background_chair', imageData['background_chair'], 0, 0, screenWidth, screenHeight);
    addObject('background_toys', imageData['background_toys'], 0, 0, screenWidth, screenHeight);



    addObject('background_shelf', imageData['background_shelf'], 0, 0, screenWidth, screenHeight);
}

function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  }

function createCanvas()
{
    canvas = document.createElement("canvas");
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");

    console.log(`width: ${screenWidth}, height: ${screenHeight}`)

    ctx.font = fontSize+"px Pixeboy";
    ctx.fillStyle = "#002b0c";
    ctx.fillRect(0, 0, screenWidth, screenHeight);

    //add input
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
}

function loop(){
    requestAnimationFrame(loop);
    
    //drawAndUpdateBackground();
    
    paralaxScreen();

    //loop logic
    checkInput();
    //drawVideo();
    drawObjects();
    drawTitle();
    drawText();

}

function paralaxScreen()
{
    let offset = {x: 0, y: 0};
    // get distance from middle of screen
    let offsetX = mousePos.x - (screenWidth/2);
    
    if (offsetX >= screenWidth*0.4)
        offset.x = 1.0;
    else if (offsetX <= -screenWidth*0.4)
        offset.x = -1.0;
    else
    {
        offset.x = offsetX / (screenWidth*0.4);
    }

    let offsetY = mousePos.y - (screenHeight/2);

    function offsetObject(objName, minAmount, maxAmount)
    {
        let obj = getObject(objName);
        if (obj == null)
        {
            console.log("ERROR -> offset object not found")
            return;
        }
        let xPos = ((maxAmount - minAmount) * offset.x) + minAmount;
        obj.x = xPos;
    }

    offsetObject('background_outside', 0, 10);
    offsetObject('background_shelf', 0, 2);

    offsetObject('background_topShelf', 0, 3);
    offsetObject('background_table', 0, 5);
    offsetObject('background_pictures', 0, 4);
    offsetObject('background_chair', 0, 8);
    offsetObject('background_toys', 0, 3);
    
    offsetObject('tv', videoPos.x - (tvBounds/2) - 1, videoPos.x - (tvBounds/2) + 1);
    offsetObject('n64', dropObj.x - 2, dropObj.x + 2);
    offsetObject('dropPoint2', dropPoint.x - 2, dropPoint.x + 2);
    
    for (var i = 0; i < allTapes.length; i++)
    {
        if (curObject != null && curObject.name == allTapes[i])
        {
            offsetObject(allTapes[i], dropPoint.x - 2, dropPoint.x + 2);
        }
        else
        {
            offsetObject(allTapes[i], tapeXStart - 1.5, tapeXStart + 1.5);
        }
    }

}

function drawTitle()
{
    ctx.save();

    ctx.fillStyle = 'black';
    ctx.font = largeFontSize+'px Pixeboy';
    //ctx.fillText("Justin Gourley's Portfolio", 35, screenHeight*0.08, screenWidth);
    
    
    ctx.fillStyle = 'white';
    ctx.font = largeFontSize+'px Pixeboy';
    //ctx.fillText("Justin Gourley's Portfolio", 50, screenHeight*0.08 + 10, screenWidth);
    

    if (!hasPutInCartridge)
    {
        ctx.font = smallFontSize+'px Pixeboy';
        ctx.fillText("Try moving a cartridge!", screenWidth*0.035, screenHeight * 0.042, screenWidth);
    }

    if (hasPutInCartridge && !hasClickedTV)
    {
        ctx.font = smallFontSize+'px Pixeboy';
        ctx.fillText("Try clicking the TV for more info!", screenWidth*0.23, screenHeight * 0.625, screenWidth);
    }

    ctx.font = '50px Pixeboy';
    //ctx.fillText("Justin Gourley 2023", screenWidth * 0.77, screenHeight * 0.980);

    ctx.restore();
}

// draw description text
function drawText()
{
    if (currentText == null || !tvSelected) return;

    console.log("drawing text?");
    ctx.save();

    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.font = fontSize+"px Pixeboy";
    
    ctx.fillRect(screenWidth*0.6, screenHeight*0.0159, screenWidth*0.392, screenHeight*0.97);
    ctx.fillStyle = 'white';

    let spacing = 0;
    //show what it was coded in
    ctx.font = (fontSize*1.5)+"px Pixeboy";
    ctx.fillText(currentText.title, textLoc.x, textLoc.y, textLoc.width);

    spacing = fontSize*3;

    ctx.font = (fontSize*1.2)+"px Pixeboy";
    ctx.fillText("Coded in:", textLoc.x, textLoc.y + spacing, textLoc.width);
    spacing += fontSize*1.5;
    ctx.font = (fontSize*0.8)+"px Times New Roman";
    ctx.fillText("     "+currentText.coding, textLoc.x, textLoc.y + spacing, textLoc.width);
    
    spacing += fontSize*3; //add some spacing from coding section

    ctx.font = (fontSize*0.8)+"px Times New Roman";
    let newSpacing = 0;
    //show description
    for (var i = 0; i < currentText.description.length; i++)
    {
        ctx.fillText(currentText.description[i], textLoc.x, textLoc.y + spacing + (i * fontSize) , ctx.measureText(currentText.description[i]).width);
    
        newSpacing += fontSize;
    }
    spacing += newSpacing + fontSize * 2;

    if (currentText.contribution.length > 0 && currentText.contribution[0] != '')
    {   
        ctx.font = (fontSize*1)+"px Pixeboy";
        ctx.fillText("What did I work on?", textLoc.x, textLoc.y + spacing, screenWidth);
        spacing+= fontSize;   
    }
    ctx.font = (fontSize*0.8)+"px Times New Roman";
    //show contirbution
    for (var i = 0; i < currentText.contribution.length; i++)
    {
        ctx.fillText(currentText.contribution[i], textLoc.x, textLoc.y + spacing + (i * fontSize), ctx.measureText(currentText.contribution[i]).width);
    }

    ctx.restore();
}

// draw video
function drawVideo()
{
    if (currentVideo != null)
    {
        if (videoData[currentVideo].video.paused)
        {
            console.log("video paused, resumeing");
            videoData[currentVideo].video.play();
        }
        let tvObj = getObject('tv');

        if (tvSelected)
        {
            ctx.drawImage(imageData[tvObj.name + "_big"], 0, 0, screenWidth, screenHeight);
            ctx.drawImage(videoData[currentVideo].video, screenWidth*0.01, screenHeight*0.016, screenWidth*0.98, screenHeight*0.965); 
        }
        else
        {
            ctx.drawImage(videoData[currentVideo].video, tvObj.x + tvBounds/2, tvObj.y + tvBounds/2, videoPos.width, videoPos.height); 
        }
    }
    else
    {
        ctx.save();
        ctx.fillStyle = "black";
        let tvObj = getObject('tv');

        ctx.fillRect(tvObj.x, tvObj.y, videoPos.width, videoPos.height);
        ctx.restore();
    }
}

// draw all objects
function drawObjects()
{
    var tvEnd;
    for (var i = 0; i < objects.length; i++)
    {
        let object = objects[i];
        if (object.name == "dropPoint2")
            continue;

        var isCart = false;
        for (var c = 0; c < allTapes.length; c++)
        {
            if (object.name == allTapes[c])
                isCart = true;
        }

        if (isCart)
        {
            if (curObject == object)
            {
                ctx.drawImage(imageData[object.name + "_g"], object.x, object.y, object.width * 0.8, object.height * 0.85);
                continue;
            }
            if (getTapePosition(object) == curHover)
            {
                ctx.drawImage(imageData[object.name + "_s"], object.x, object.y, object.width, object.height);
                continue;
            }
            ctx.drawImage(object.image, object.x, object.y, object.width, object.height);
        }
        else
        {
            if (object.name == "n64" && (curObject != null && curObject != undefined) && !tapeIsIn)
            {
                ctx.drawImage(imageData[object.name + "_s"], object.x - (object.width * 0.02), object.y - (object.height * 0.04), object.width*1.04, object.height*1.09);
                continue;
            }
            //draw 'screen' after tv
            if (object.name == "tv")
            {
                if (isInBounds(mousePos, object) && (curObject != null && curObject != undefined) && tapeIsIn)
                {
                    ctx.drawImage(imageData[object.name + "_s"], object.x, object.y, object.width, object.height);
                }
                else
                {
                    ctx.drawImage(object.image, object.x, object.y, object.width, object.height);
                }

                if (!tvSelected)
                {
                    drawVideo();
                }
                continue;
            }


            ctx.drawImage(object.image, object.x, object.y, object.width, object.height);

        }
    }

    if (tvSelected)
    {
        drawVideo();
    }
}

// add a sprite object to the object list
function addObject(name, image, startX, startY, width, height)
{
    let obj = {name: name, image: image, x: startX, y: startY, width: width, height: height}
    objects.push(obj);
    return obj;
}

function getObject(name)
{
    for (var i = 0; i < objects.length; i++)
    {
        if (objects[i].name == name)
        {
            return objects[i];
        }
    }
    return null;
}

// load all images found in data.js
function loadImages() {
	let numImages = imageSources.length;
	let numLoadedImages = 0;
	let images = [];

	// load images
	for(var i = 0; i < imageSources.length; i++) {
        
        let img = new Image();
        img.src = imageSources[i].image;
        images[imageSources[i].name] = img;

        img.onload = function() {
            if(++numLoadedImages >= numImages){
                imageData = images;
                init();
            }
        }

        img.onerror = function(){
            console.error("ERROR: image did not load! [" + img.src + "]");
        }
	}
}

// Load all videos found in data.js
function loadVideos() 
{
    let videos = [];

    for (var i = 0; i < videoSources.length; i++)
    {
        var video = document.createElement("video");
        video.src = videoSources[i].video;
        video.autoplay = true;
        video.loop = true;
        video.name = videoSources[i].name;
        video.muted = true;
        videos[videoSources[i].name] = {video: video, ready: false};
        video.oncanplay = function(e){
            videos[e.target.name].ready = true; 
        };
        video.onerror = function(e){
            console.log("ERROR: video cant load :( ");
            console.log(e);
        }
    }

    videoData = videos;
}

//player has released click over the drop point
function putInTape()
{
    tapeIsIn = true;
    videoData[curObject.name].video.currentTime = 0;
    currentVideo = curObject.name;
    currentText = getText(ctx, textSources[curObject.name], textLoc.width * 0.5);
    console.log(currentText);
    hasPutInCartridge = true;
}

// mouse click released
function onMouseUp(e)
{
    if (curObject == null) return;

    let distFromDropPoint = Math.abs(Math.sqrt(Math.pow(curObject.x - dropPoint.x, 2) + Math.pow(curObject.y - dropPoint.y, 2)));

    if (distFromDropPoint <= dropPointMaxDistance)
    {
        curObject.x = dropPoint.x;
        curObject.y = dropPoint.y;
        putInTape();
    }
    else
    {
        curObject.x = curObjectInitialPos.x;
        curObject.y = curObjectInitialPos.y;
        curObject = null;
        curObjectInitialPos = null;
        currentVideo = null;
        currentText = null;
    }
}

// mouse click down
function onMouseDown(e)
{
    var target = checkObjectsInClick()[0];
    if (target == null || tvSelected) 
    {
        if (isInBounds(mousePos, getObject('tv')) || tvSelected)
        {
            if (tapeIsIn)
            {
                tvSelected = !tvSelected;
                hasClickedTV = true;
            }
        }

        return;
    }


    
    if (tapeIsIn && target == curObject)
    {
        tapeIsIn = false;
    }
    else if (tapeIsIn && target != curObject)
    {
        tapeIsIn = false;
        curObject.x = curObjectInitialPos.x;
        curObject.y = curObjectInitialPos.y;

        curObject = target;
        curObjectInitialPos = {x: curObject.x, y: curObject.y};
    }
    else
    {
        curObject = target;
        curObjectInitialPos = {x: curObject.x, y: curObject.y};		
    }
}

// update position of help object
function checkInput()
{
    if (curObject != null && !tapeIsIn)
    {
        curObject.x = mousePos.x - curObject.width/2;
        curObject.y = mousePos.y - curObject.height/2;
    }
    // check for hover stuff
    else
    {
        checkHover();
    }
}

function checkHover()
{
    var clickedObject = checkObjectsInClick()[0];

    if (clickedObject != null)
    {
        curHover = getTapePosition(clickedObject);
    }
    else
    {
        curHover = -1;
    }
}

function getTapePosition(tape)
{
    for (var i = 0; i < tapes.length; i++)
    {
        if (tapes[i] == tape)
        {
            return i;
        }
    }
    return -1;
}

// get all objects currently being clicked
function checkObjectsInClick()
{
    let clickedObjects = [];
    for (var i = 0; i < tapes.length; i++)
    {
        let tape = tapes[i];
        if (isInBounds(mousePos, tape))
        {
            clickedObjects.push(tape);
        }
    }
    return clickedObjects;
}

function isInBounds(point, object)
{
    if ((point.x >= object.x && point.x <= object.x + object.width) && (point.y >= object.y && point.y <= object.y + object.height))
    {
        return true;
    }
    return false;
}

onmousemove = function(e){mousePos.x = e.clientX; mousePos.y = e.clientY;}
window.onload = function(){loadImages();loadVideos();}
window.onresize = function(){location.reload();}