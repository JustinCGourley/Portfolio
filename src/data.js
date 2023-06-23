export {allTapes, imageSources, videoSources, textSources}

//the tape names need to match the image sources names for the cooresponding tapes
//the tapes listed here are also the order they will be displayed
let allTapes = ['city', 'pie', 'transmission', 'horde', 'archer', 'diver', "elephant"];
let imageSources = [
    {name: 'archer', image: 'src/assets/cart_archer.png'},
    {name: 'city', image: 'src/assets/cart_city.png'},
    {name: 'diver', image: 'src/assets/cart_deepdiver.png'},
    {name: 'horde', image: 'src/assets/cart_horde.png'},
    {name: 'pie', image: 'src/assets/cart_piesky.png'},
    {name: 'elephant', image: 'src/assets/cart_elephant.png'},
    {name: 'template', image: 'src/assets/VHS_Template.png'},
    {name: 'transmission', image: 'src/assets/cart_transmission.png'},
    {name: 'tv', image: 'src/assets/tv.png'},
    {name: 'n64', image: 'src/assets/n64.png'},
    {name: 'box', image: 'src/assets/storageBox.png'},
    {name: 'table', image: 'src/assets/table.png'}
];
//THE VIDEO SOURCES NAMES NEED TO MATCH THE TAPES NAME (AND IMAGE SOURCES FOR THE TAPES)
let videoSources = [
    {name: 'city', video: 'src/assets/testVIDEO.mp4'},
    {name: 'pie', video: 'src/assets/pieinsky.mp4'},
    {name: 'transmission', video: 'src/assets/transmission.mp4'},
    {name: 'horde', video: 'src/assets/horde.mp4'},
    {name: 'elephant', video: 'src/assets/elephant.mp4'},
    {name: 'archer', video: 'src/assets/archer.mp4'},
    {name: 'diver', video: 'src/assets/deepdiver.mp4'}
];

let textSources = {
  'transmission': {
    description: "This game was created durring Global Game Jam, a 42 hour game jam that I participated in with 4 people. We created a game that was based off 'Papers Please', in which you go through a series of days trying to accomplish a task each day. In this game, the task you had to complete was decoding a message, and then sending the answer through morse code. The objective of this game was to slowly teach the user morse code, as well as having a fun time learning it by solving various puzzles. The puzzles included finding hidden messages in given transmissions by using tools, and deductive reasoning to figure out what you needed to send.",
    coding: 'C# / Unity',
    contribution: 'Morse code machine functionality, level architecture, architecture for generating encoded messages, UI functionality, varius visuals ex. morse code box.',
    link: 'https://globalgamejam.org/2018/games/transmission-received',
    linkTitle: 'Check it out here!',
  },
  'pie': {
    description: "This was a project made in unity during a 42 hour game jam with a team of 5 people. In the game your objective is to get to end objective (guided by the waypoint on the top) using your grappling hook to get there. You cant touch the ground forcing the player to use the grappling hook to traverse the level.",
    coding: "C# / Unity",
    contribution: 'Primarily worked on the controller, grappling hook, and other physics in the game. Also helped on level loading, creating levels, creating models, various scripts for moving things in levels.',
    link: '',
    linkTitle: '',
  },
  'city': {
    description: 'This is solo project Im currently working on. Right now it is a simple city builder being peiced together, which mainly allows me to mess around with coding things I find fun, recently I\'ve been messing around a lot with procedural generation, AI, and seeding',
    coding: "C# / Unity",
    contribution: '',
    link: '',
    linkTitle: '',
  },
  'rise': {
    description: 'This was a two-person team, rouge-like game that is still being worked on. The idea of the game was a wave-based rouge like, with a heavy emphasis on synergies. Currently the game has procedural level generation, basic AI and AI spawning, shop, and boss fights.',
    coding: "C# / Unity",
    contribution: 'My main focus was on the player movement / gameplay, level generation, and player abilities',
    link: '',
    linkTitle: '',
  },
  'diver': {
    description: 'I worked with a group of 4 people to make this concept game, a room-clear type shooter, with effort put into light, and what you can see being a major factor in how you play.',
    coding: "C# / Unity",
    contribution: 'Level generation, enemy AI, player movement and interaction, particle systems',
    link: '',
    linkTitle: '',
  },
  'elephant': {
    description: 'This game was made in c# with the monogame framework. It was created in a group project over the course of a semester. The concept of the game is inspired by The Binding of Isaac, and we tried to make it feel similar to it. The game features random world generation, 3 enemy types, 5 boss enemies, various pick-ups, and the player can even level up and upgrade his stats. The game also features a level designer where you can customize each floor.',
    coding: "C# / Monogame",
    contribution: 'World generation, enemy AI, player movement + actions, level editor, boss functionality, pickups/item functionality, underlying architecture for the game, designed all the levels/rooms as well as boss and enemy functionalities.',
    link: '',
    linkTitle: '',
  },
  'horde': {
    description: 'I worked in a group of 4 at a 42 hour game jam to create this zombie horde survival game. Fight waves of multiple types of zombies with your weapons that you collect from supply drops scattered throughout the map. From supply drops you can also find medical supplies and ammo for your weapons.',
    coding: "C# / Monogame",
    contribution: 'World generation, enemy AI, player movement, and gun functionality.',
    link: '',
    linkTitle: '',
  },
  'archer': {
    description: 'This was a solo project where I wanted to learn canvas. I wanted to recreate an old flash game I used to play called \'Champion Archer\'. I got pretty close and added in a few of my own additions, and had fun learning how to make web games!',
    coding: 'Javascript/HTML using Canvas',
    contribution: '',
    link: '',
    linkTitle: ''
  }
};