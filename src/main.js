import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'



let screenPadding = 15;
let screenWidth = window.innerWidth - screenPadding;
let screenHeight = window.innerHeight - screenPadding;

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: screenWidth,
	height: screenHeight,
	backgroundColor: '#002b0c',
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [HelloWorldScene],
}

export default new Phaser.Game(config)
