import { Component, OnInit } from '@angular/core';
import { Game } from './game.model';
import { Game2 } from './game2.model';

@Component({
  selector: 'app-game',
  templateUrl: 'game.html'
})
export class GameComponent implements OnInit {

  private game: Game;

  constructor() {}

  ngOnInit(){
    const canvas = <HTMLCanvasElement> document.getElementById('canvas');

    this.game = new Game(canvas);
    this.game.init();
    //this.game.animate();
  }

}
