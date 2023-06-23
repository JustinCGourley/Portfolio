import Phaser from 'phaser'

let screenPadding = 15;
let screenWidth = window.innerWidth - screenPadding;
let screenHeight = window.innerHeight - screenPadding;

var curObject = null;
var curObjectInitialPos = null;
var tapeIsIn = false;

let dropPoint = {x: screenWidth * 0.6, y: screenHeight * 0.7};
let dropPointMaxDistance = 100;

let allOptions = ['option_city', 'option_archer', 'option_diver', 'option_pie', 'option_horde', 'option_transmission'];

export default class HelloWorldScene extends Phaser.Scene 
{
	constructor() 
	{
		super('hello-world')
	}

	preload() 
	{
		// this.load.setBaseURL('https://labs.phaser.io')

		// this.load.image('sky', 'assets/skies/space3.png')
		// this.load.image('logo', 'assets/sprites/phaser3-logo.png')
		// this.load.image('red', 'assets/particles/red.png')

		this.load.setBaseURL('http://10.0.0.145:8000/');
		this.load.image('tv', 'src/assets/tv.png');
		this.load.image('option_city', 'src/assets/VHS_CityBuilder.png');
		this.load.image('option_archer', 'src/assets/VHS_Archer.png');
		this.load.image('option_diver', 'src/assets/VHS_DeepDiver.png');
		this.load.image('option_pie', 'src/assets/VHS_PieInTheSky.png');
		this.load.image('option_horde', 'src/assets/VHS_Horde.png');
		this.load.image('option_transmission', 'src/assets/VHS_TransmissionRecieved.png');

		this.load.spritesheet('city_sheet', 'src/assets/test.png', {frameWidth: 256, frameHeight: 128});

		this.load.video({
			key: 'city_video',
			url: [ 'src/assets/testVIDEO.mp4' ],
			asBlob: false,
			noAudio: true
		});
	}

	create() 
	{
		// this.add.image(400, 300, 'sky')

		// const particles = this.add.particles('red')

		// const emitter = particles.createEmitter({
		// 	speed: 100,
		// 	scale: { start: 1, end: 0 },
		// 	blendMode: 'ADD',
		// })

		// const logo = this.physics.add.image(400, 100, 'logo')

		// logo.setVelocity(100, 200)
		// logo.setBounce(1, 1)
		// logo.setCollideWorldBounds(true)

		// emitter.startFollow(logo)


		var tvSprite = this.add.image(screenWidth/2,screenHeight/2, 'tv');
		tvSprite.setScale(2);
		tvSprite.depth = 5;

		// this.add.video(screenWidth/2, screenHeight/2, 'city_video');
		var video = this.add.video(screenWidth/2, screenHeight/2);
		video.loadURL('src/assets/test', 'anonymous', false);
		video.play();
		// var test = this.add.sprite(screenWidth/2, screenHeight/2, 'city_sheet', 0);
		// test.setScale(3,3);
		// this.anims.create({
		// 	key: 'city_screen',
		// 	frames: this.anims.generateFrameNumbers('city_sheet', {start: 0}),
		// 	frameRate: 20,
		// 	repeat: 1
		// });
		// test.play('city_screen');

		for (var i = 0; i < allOptions.length; i++)
		{
			var sprite = this.add.image(100, 50 + (i * 50), allOptions[i]);
			sprite.name = allOptions[i];
			sprite.depth = 10;
			sprite.setInteractive();
		}
		this.input.on('pointerdown', this.grabObject, this);
		this.input.on('pointerup', this.dropObject, this);

		var test = this.add.image(dropPoint.x, dropPoint.y, 'option_pie');
		test.depth = 6;
	}

	grabObject(pointer, targets)
	{
		if (targets == null || targets.length == 0) return;

		var target = targets[0];

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

	dropObject()
	{
		if (curObject == null) return;

		console.log("Dropping!");

		let distFromDropPoint = Math.abs(Math.sqrt(Math.pow(curObject.x - dropPoint.x, 2) + Math.pow(curObject.y - dropPoint.y, 2)));
		console.log("distance: "+distFromDropPoint);
		if (distFromDropPoint <= dropPointMaxDistance)
		{
			console.log("show the video?");
			curObject.x = dropPoint.x;
			curObject.y = dropPoint.y;
			tapeIsIn = true;
		}
		else
		{
			curObject.x = curObjectInitialPos.x;
			curObject.y = curObjectInitialPos.y;
			curObject = null;
			curObjectInitialPos = null;
		}
	}

	showVideo()
	{

	}

	update()
	{
		if (curObject != null && tapeIsIn == false)
		{
			curObject.x = this.input.x;
			curObject.y = this.input.y;
		}
	}
}
