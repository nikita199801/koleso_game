const KolesoBoard = require('./modules/koleso.js');
const Player = require('./modules/player.js');
const uuid = require('uuid');

const sectors = [
    { sector: 2, count: 24 },
    { sector: 4, count: 12 },
    { sector: 6, count: 8 },
    { sector: 12, count: 4 },
    { sector: 16, count: 3 },
    { sector: 24, count: 2 },
    { sector: 48, count: 1 }
];

const kolesoBoard = new KolesoBoard(uuid.v4(), 15000, 5000, 1000, sectors);

const player1 = new Player(uuid.v4(), 1000);
const player2 = new Player(uuid.v4(), 2000);
const player3 = new Player(uuid.v4(), 1000);
const player4 = new Player(uuid.v4(), 2000);
const player5 = new Player(uuid.v4(), 10);
const player6 = new Player(uuid.v4(), 2000);
const player7 = new Player(uuid.v4(), 1000);
const player8 = new Player(uuid.v4(), 2000);

player1.join(kolesoBoard);
player2.join(kolesoBoard);
player3.join(kolesoBoard);
player4.join(kolesoBoard);
player5.join(kolesoBoard);
player6.join(kolesoBoard);
player7.join(kolesoBoard);
player8.join(kolesoBoard);

kolesoBoard.play();