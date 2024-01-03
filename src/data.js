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
    description: "This game was created during the Global Game Jam, a 42-hour game jam that I participated in with 4 people. We created a game that was based off the game 'Papers Please', in which you go through a series of days trying to accomplish a task each day. In this game, the task was decoding a message, and sending the answer through morse code. The objective of this game was to slowly teach the user morse code, as well as provide an engaging and fun learning environment, by solving various puzzles. The puzzles included finding hidden messages in given transmissions by using tools, and deductive reasoning to figure out what you needed to send.",
    coding: 'C# / Unity',
    contribution: 'Morse code machine functionality, level architecture, architecture for generating encoded messages, UI functionality, various visuals ex. morse code box.',
    link: 'https://globalgamejam.org/2018/games/transmission-received',
    linkTitle: 'Check it out here!',
  },
  'pie': {
    description: "This was a project made in Unity during a 42 hour game jam with a team of 5 people. In the game your objective is to get to the end objective, shown with a guide arrow, using your grappling hook to get there. You can't touch the ground, forcing the player to use the grappling hook to traverse the level. The game's idea was inspired heavily by Cluster Truck.",
    coding: "C# / Unity",
    contribution: 'Primarily I worked on the player controller, grappling hook, and other physics in the game. Also helped on level loading, creating levels, creating models, and various scripts for moving things in levels.',
    link: '',
    linkTitle: '',
  },
  'city': {
    description: 'This is a solo project I\'m currently working on. Right now it is a simple city builder being pieced together, which mainly allows me to mess around with coding things I find fun. Recently I\'ve been experimenting a lot with procedural generation, AI, and seeding.',
    coding: "C# / Unity",
    contribution: '',
    link: '',
    linkTitle: '',
  },
  'rise': {
    description: 'This was a two-person team, rouge-like wave survival game. The idea of the game was a wave-based rouge like, with a heavy emphasis on synergies. Currently the game is still very incomplete, but has procedural level generation, basic AI and AI spawning, shop, and boss fights.',
    coding: "C# / Unity",
    contribution: 'My main focus was on the player movement / gameplay, level generation, and player abilities',
    link: '',
    linkTitle: '',
  },
  'diver': {
    description: 'I worked with a group of 4 people to make this concept game: a room-clear type shooter, with effort put into using light as a mechanic, using what you can see as a major factor in how you play.',
    coding: "C# / Unity",
    contribution: 'Level generation, enemy AI, player movement and interaction, particle systems',
    link: '',
    linkTitle: '',
  },
  'elephant': {
    description: 'This game was a \'Binding of Isaac\' inspired rouge-like game, made on a 4 person team. It includes powerups, bosses, leveling, pickups, and tons of rooms/enemies to discover. It also has a built in level editor to create and add new rooms to the game. ',
    coding: "C# / Monogame",
    contribution: 'World generation, enemy AI, player movement + actions, level editor, boss functionality, pickups/item functionality, underlying architecture for the game, and designed all the levels/rooms as well as boss and enemy functionalities.',
    link: '',
    linkTitle: '',
  },
  'horde': {
    description: 'I worked in a group of 4 at a 42 hour game jam to create this zombie horde survival game. Fight waves of multiple types of zombies with weapons, that you collect from supply drops scattered throughout the map. From supply drops you can also find medical supplies and ammo for your weapons. You have to survive until all enemies in the wave are beaten to win!',
    coding: "C# / Monogame",
    contribution: 'World generation, enemy AI, player movement, and gun functionality.',
    link: '',
    linkTitle: '',
  },
  'archer': {
    description: 'This was a solo project where my goal was to learn canvas better. I wanted to recreate an old flash game I used to play called \'Champion Archer\'. I got pretty close and added in a few of my own additions, while having fun learning how to make web games!',
    coding: 'Javascript/HTML using Canvas',
    contribution: '',
    link: '',
    linkTitle: ''
  }
};