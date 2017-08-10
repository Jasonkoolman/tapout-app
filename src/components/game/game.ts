import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Game } from './game.model';
import { ShapeService } from "./shapes/shape.service"

@Component({
  selector: 'app-game',
  templateUrl: 'game.html'
})
export class GameComponent implements OnInit {

  @ViewChild('svg') svg: ElementRef;

  private game: Game;

  constructor(private shapeService: ShapeService) {}

  ngOnInit(){
    // const controller = new GameController;

    this.game = new Game(this.svg.nativeElement, this.shapeService);
    this.game.init();

    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 38 && !this.game.running) {
        this.game.start();
      }
    })
  }

  onTap() {
    console.log('TAPPED');
  }

}
