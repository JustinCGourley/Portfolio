
var showingInfo = false;

function init()
{
  resize();
  window.onresize = resize;

  let infoButton = document.querySelector('#gameInfo');
  infoButton.onclick = showGameInfo;

  createIndicators();
  // <li data-target="#gameCarousel" data-slide-to="0" class="active"></li>
  // <li data-target="#gameCarousel" data-slide-to="1"></li>
  // <li data-target="#gameCarousel" data-slide-to="2"></li>
  // <li data-target="#gameCarousel" data-slide-to="3"></li>
  // <li data-target="#gameCarousel" data-slide-to="4"></li>
  // <li data-target="#gameCarousel" data-slide-to="5"></li>
}

function showGameInfo()
{
  const button = document.querySelector('#gameInfo');
  const gameInfo = document.querySelector('.gameDescription');
  

  if (showingInfo)
  {
    button.innerHTML = "Info";
    button.style.color = 'rgb(170, 170, 170)';
    button.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    gameInfo.style.height = '0%';

  }
  else
  {
    button.innerHTML = "Close";
    button.style.color = 'rgb(50, 50, 50)';
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';

    findCurrentGame();

    gameInfo.style.height = '100%';
    
  }
  showingInfo = !showingInfo;


}

function findCurrentGame()
{
  let activeGame = document.querySelector('.active');
    let gameName = activeGame.lastChild.innerHTML;
    let data = {};
    for (let i = 0; i < allData.length; i++)
    {
      if (gameName == allData[i].title)
      {
        data = allData[i];
      }
    }

    app.currentGame = data;
}

function resize()
{
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  let slide = document.querySelector('.carousel-inner');

  let slideHeight = windowWidth * 0.5625; //16:9 gifs
  if (slideHeight > windowHeight){slideHeight=windowHeight;}
  slide.style.height = `${slideHeight}px`;

  let navBar = document.querySelector('.navbar');
  navBar.style.height = `${windowHeight * 0.075}px`;

  let topChange = (windowHeight == slideHeight) ? 0 : (windowHeight - slideHeight) / 2;
  let carousel = document.querySelector('#gameCarousel');
  carousel.style.top = `${topChange}px`;

  let gameTitles = document.querySelectorAll('.gameTitle');
  let titleFontSize = slideHeight * 0.05;
  for (let i = 0; i < gameTitles.length; i++)
  {
    gameTitles[i].style.fontSize = `${titleFontSize}px`;
    gameTitles[i].style.height = `${titleFontSize+20}px`;
  }

  let indicators = document.querySelector('.carousel-indicators');
  indicators.style.position = 'absolute';
  let mod = (windowWidth > 600) ? 0.08 : 0.05;
  indicators.style.top = `${(windowHeight*mod)}px`;
  indicators.style.left = `${windowWidth*0.01}px`;
  indicators.style.padding = '0px';
  indicators.style.margin = '0px';
  indicators.style.width = '25%';

  let navButtons = document.querySelectorAll('.navbar-buttons a');

  for (let i = 0; i < navButtons.length; i++)
  {
    navButtons[i].style.padding = `10px ${windowWidth * 0.02}px`
  }
}

function createIndicators()
{
  let indicators = document.querySelector('.carousel-indicators');

  for (let i = 0; i < allData.length; i++)
  {
    let classString = (i === 0) ? "active" : "";
    indicators.innerHTML += `<li data-target="#gameCarousel" data-slide-to="${i}" class="${classString}"></li>`;
  }
}

const allData = 
[
  {
    title: 'Transmission Recieved',
    gif: 'assets/transmission.gif',
    description: "This game was created durring Global Game Jam, a 42 hour game jam that I participated in with 4 people. We created a game that was based off 'Papers Please', in which you go through a series of days trying to accomplish a task each day. In this game, the task you had to complete was decoding a message, and then sending the answer through morse code. The objective of this game was to slowly teach the user morse code, as well as having a fun time learning it by solving various puzzles. The puzzles included finding hidden messages in given transmissions by using tools, and deductive reasoning to figure out what you needed to send.",
    coding: 'C# / Unity',
    contribution: 'Morse code machine functionality, level architecture, architecture for generating encoded messages, UI functionality, varius visuals ex. morse code box.',
    link: 'https://globalgamejam.org/2018/games/transmission-received',
    linkTitle: 'Check it out here!',
  },
  {
    title: 'Pie in the Sky',
    gif: 'assets/pieinsky.gif',
    description: "This was a project made in unity during a 42 hour game jam with a team of 5 people. In the game your objective is to get to end objective (guided by the waypoint on the top) using your grappling hook to get there. You cant touch the ground forcing the player to use the grappling hook to traverse the level.",
    coding: "C# / Unity",
    contribution: 'Primarily worked on the controller, grappling hook, and other physics in the game. Also helped on level loading, creating levels, creating models, various scripts for moving things in levels.',
    link: '',
    linkTitle: '',
  },
  {
    title: 'City Builder', 
    gif: 'assets/citybuilder.gif', 
    description: 'This is solo project Im currently working on. Right now it is a simple city builder being peiced together, which mainly allows me to mess around with coding things I find fun, recently I\'ve been messing around a lot with procedural generation, AI, and seeding',
    coding: "C# / Unity",
    contribution: 'Current implementations are prodecural level generation, tree generation, and progressive tree spawning. Basic AI and AI job manegment. And camera / player input ',
    link: '',
    linkTitle: '',
  },
  {
    title: 'Rise To Glory', 
    gif: 'assets/risetoglory.gif', 
    description: 'This was a two-person team, rouge-like game that is still being worked on. The idea of the game was a wave-based rouge like, with a heavy emphasis on synergies. Currently the game has procedural level generation, basic AI and AI spawning, shop, and boss fights.',
    coding: "C# / Unity",
    contribution: 'My main focus was on the player movement / gameplay, level generation, and player abilities',
    link: '',
    linkTitle: '',
  },
  {
    title: 'Deep Diver', 
    gif: 'assets/deepdiver.gif', 
    description: 'I worked with a group of 4 people to make this concept game, a room-clear type shooter, with effort put into light, and what you can see being a major factor in how you play.',
    coding: "C# / Unity",
    contribution: 'Level generation, enemy AI, player movement and interaction, particle systems',
    link: '',
    linkTitle: '',
  },
  {
    title: 'Elephant Run',
    gif: 'assets/elephant.gif', 
    description: 'This game was made in c# with the monogame framework. It was created in a group project over the course of a semester. The concept of the game is inspired by The Binding of Isaac, and we tried to make it feel similar to it. The game features random world generation, 3 enemy types, 5 boss enemies, various pick-ups, and the player can even level up and upgrade his stats. The game also features a level designer where you can customize each floor.',
    coding: "C# / Monogame",
    contribution: 'World generation, enemy AI, player movement + actions, level editor, boss functionality, pickups/item functionality, underlying architecture for the game, designed all the levels/rooms as well as boss and enemy functionalities.',
    link: '',
    linkTitle: '',
  },
  {
    title: 'Horde', 
    gif: 'assets/horde.gif', 
    description: 'I worked in a group of 4 at a 42 hour game jam to create this zombie horde survival game. Fight waves of multiple types of zombies with your weapons that you collect from supply drops scattered throughout the map. From supply drops you can also find medical supplies and ammo for your weapons.',
    coding: "C# / Monogame",
    contribution: 'World generation, enemy AI, player movement, and gun functionality.',
    link: '',
    linkTitle: '',
  },
];

const gameData =
[
  allData[1],
  allData[2],
  allData[3],
  allData[4],
  allData[5],
];

const app = new Vue({
    el: '#app',
    data: {
      firstGame: allData[0],
      games: gameData,
      currentGame: allData[0]
    }
  });

window.onload = init;

