const assert = require('assert');
const expect = require('chai').expect;

const Game = require('../client/components/GameLogic.js');

it('should detect horizontal wins', () => {
  const game = new Game;
  game.makeMove(game.red, 0);
  game.makeMove(game.red, 1);
  game.makeMove(game.red, 3);
  game.makeMove(game.red, 2);
  expect(game.hasWon(game.red, 5, 2)).to.be.true;
});

it('should detect vertical wins', () => {
  const game = new Game();
  game.makeMove(game.red, 2);
  game.makeMove(game.red, 2);
  game.makeMove(game.red, 2);
  game.makeMove(game.red, 2);
  expect(game.hasWon(game.red, 2, 2)).to.be.true;
});

it('should detect diagonal wins', () => {
  const game = new Game();
  game.makeMove(game.red, 0);
  game.makeMove(game.black, 1);
  game.makeMove(game.red, 1);
  game.makeMove(game.black, 2);
  game.makeMove(game.black, 2);
  game.makeMove(game.red, 2);
  game.makeMove(game.black, 3);
  game.makeMove(game.black, 3);
  game.makeMove(game.black, 3);
  game.makeMove(game.red, 3);
  expect(game.hasWon(game.red, 2, 2)).to.be.true;
});