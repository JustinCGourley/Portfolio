import {allTapes, imageSources, videoSources, textSources} from './data.js';
import { getLines, getText } from './text.js';

let screenPadding = 15;
let screenWidth = window.innerWidth - screenPadding;
let screenHeight = window.innerHeight - screenPadding;

var curObject = null;
var curObjectInitialPos = null;
var tapeIsIn = false;


let canvas, ctx;


let imageData = [];

let videoData = [];
let currentVideo = null;

let currentText = null;

let mousePos = {x:0, y:0};
let objects = [];
let tapes = [];

//background stuff
let backgroundObjs = [];
let backgroundObjParams = {width: screenWidth*0.15, height: screenWidth*0.15, minSpeed: 1, maxSpeed: 3, maxCount: 30};

//loc stuff
let textLoc = {x: screenWidth * 0.68, y: screenHeight * 0.2, width: screenWidth * 0.6};//text pos/size
let videoPos = {x: screenWidth*0.1775, y: screenHeight*0.1875, width: screenWidth*0.445, height: screenHeight*0.5}; //video pos/size
let dropObj = {x: screenWidth * 0.15, y: screenHeight * 0.8, width: screenWidth*0.24, height: screenHeight* 0.2}; //n64 pos/size
let dropPoint = {x: screenWidth * 0.22, y: screenHeight * 0.76};
let dropPointMaxDistance = 250;

let hasPutInCartridge = false;


let largeFontSize = screenWidth*0.06;
let smallFontSize = screenWidth*0.01;
let fontSize = screenWidth * 0.015;


function init()
{
    createCanvas();

    setupBackground();
    
    //add tv table
    addObject('table', imageData['table'], screenWidth * 0.09, screenHeight*0.695, screenWidth*0.65, screenHeight* 0.3); 
    //add tv in    
    addObject('tv' ,imageData['tv'], screenWidth * 0.15, screenHeight*0.02, screenWidth*0.5, screenHeight * 0.85); 
    //add drop point
    addObject('dropPoint', imageData['n64'], dropObj.x, dropObj.y, dropObj.width, dropObj.height);

    //this is for lining up the n64 drop spot
    // addObject('sample', imageData['city'], dropPoint.x, dropPoint.y, screenWidth*0.1, screenHeight*0.08);

    //add in storage behind tapes
    let boxHeight = screenHeight*0.1;
    for (var i = 0; i < allTapes.length; i++)
    {
        addObject(allTapes[i], imageData['box'], 0, screenHeight*0.3 + (i * boxHeight), screenWidth*0.14, boxHeight);
    }
    //add in tapes
    for (var i = 0; i < allTapes.length; i++)
    {
        tapes.push(addObject(allTapes[i], imageData[allTapes[i]], screenWidth*0.019, screenHeight*0.31 + (i * screenHeight*0.1), screenWidth*0.1, screenHeight*0.08));
    }

    drawObjects();
    loop();
}

function setupBackground()
{
    for (var i = 0; i < backgroundObjParams.maxCount; i++)
    {
        let obj = {
            x: getRandomNum(0, screenWidth-backgroundObjParams.width),
            y: getRandomNum(0, screenHeight-backgroundObjParams.height),
            width: backgroundObjParams.width,
            height: backgroundObjParams.height,
            dir: 
            {
                x: (getRandomNum(-100, 100) / 100) * getRandomNum(backgroundObjParams.minSpeed, backgroundObjParams.maxSpeed),
                y: (getRandomNum(-100, 100) / 100) * getRandomNum(backgroundObjParams.minSpeed, backgroundObjParams.maxSpeed)
            },
            color: `rgba(0, ${getRandomNum(0, 40)}, 12, 0.3)`
        };
        backgroundObjs.push(obj);
    }
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

    //clear screen-----
    ctx.clearRect(0,0, screenWidth, screenHeight);

    ctx.save();
    ctx.fillStyle = "#002b0c";
    ctx.fillRect(0,0, screenWidth, screenHeight);
    ctx.restore();
    //-----------------
    
    drawAndUpdateBackground();
    
    //loop logic
    checkInput();
    drawText();
    drawVideo();
    drawObjects();
    drawTitle();
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
        ctx.fillText("Try moving a cartridge!", 20, screenHeight * 0.29, screenWidth);
    }


    ctx.font = '50px Pixeboy';
    ctx.fillText("Justin Gourley 2023", screenWidth * 0.77, screenHeight * 0.980);

    ctx.restore();
}

// draw background squares
function drawAndUpdateBackground()
{
    ctx.save();
    for (var i = 0; i < backgroundObjs.length; i++)
    {
        //update background obj
        backgroundObjs[i].x += backgroundObjs[i].dir.x;
        backgroundObjs[i].y += backgroundObjs[i].dir.y;

        if (backgroundObjs[i].x >= screenWidth - backgroundObjs[i].width || backgroundObjs[i].x <= 0)
        {
            backgroundObjs[i].dir.x *= -1;
        }
        if (backgroundObjs[i].y >= screenHeight - backgroundObjs[i].height || backgroundObjs[i].y <= 0)
        {
            backgroundObjs[i].dir.y *= -1;
        }

        //draw it
        ctx.fillStyle = backgroundObjs[i].color;
        ctx.fillRect(backgroundObjs[i].x, backgroundObjs[i].y, backgroundObjs[i].width, backgroundObjs[i].height);
    }
    ctx.restore();
}

// draw description text
function drawText()
{
    if (currentText == null) return;

    ctx.save();

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.font = fontSize+"px timesnewroman";
    
    ctx.fillRect(textLoc.x - fontSize, textLoc.y - fontSize * 2, textLoc.width + fontSize, screenHeight*0.8);
    ctx.fillStyle = 'white';

    let spacing = 0;
    //show what it was coded in
    ctx.fillText("Coded in "+currentText.coding, textLoc.x, textLoc.y, textLoc.width);
    spacing += fontSize*3; //add some spacing from coding section

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
        ctx.fillText("What did I work on?", textLoc.x, textLoc.y + spacing, screenWidth);
        spacing+= fontSize;   
    }
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
        ctx.drawImage(videoData[currentVideo].video, videoPos.x, videoPos.y, videoPos.width, videoPos.height); 
    }
    else
    {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillRect(videoPos.x, videoPos.y, videoPos.width, videoPos.height);
        ctx.restore();
    }
}

// draw all objects
function drawObjects()
{
    for (var i = 0; i < objects.length; i++)
    {
        let object = objects[i];
        ctx.drawImage(object.image, object.x, object.y, object.width, object.height);
    }
}

// add a sprite object to the object list
function addObject(name, image, startX, startY, width, height)
{
    let obj = {name: name, image: image, x: startX, y: startY, width: width, height: height}
    objects.push(obj);
    return obj;
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
            console.error("ERROR: image did not load!");
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
    if (target == null) return;

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
}

// get all objects currently being clicked
function checkObjectsInClick()
{
    let clickedObjects = [];
    for (var i = 0; i < tapes.length; i++)
    {
        let tape = tapes[i];
        if ((mousePos.x >= tape.x && mousePos.x <= tape.x + tape.width) && (mousePos.y >= tape.y && mousePos.y <= tape.y + tape.height))
        {
            clickedObjects.push(tape);
        }
    }
    return clickedObjects;
}

onmousemove = function(e){mousePos.x = e.clientX; mousePos.y = e.clientY;}
window.onload = function(){loadImages();loadVideos();}
window.onresize = function(){location.reload();}