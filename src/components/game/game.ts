import { Component, OnInit } from '@angular/core';
import { Shape } from './shapes/shape.interface';
import { Game } from './game.model';

@Component({
  selector: 'app-game',
  templateUrl: 'game.html'
})
export class GameComponent implements OnInit {

  game: Game;

  constructor() {}

  ngOnInit(){
    const canvas = <HTMLCanvasElement> document.getElementById('canvas'),
          game = new Game(canvas);

    game.setup();

    this.game = game;
  }

}
