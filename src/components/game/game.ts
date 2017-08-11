import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Game } from './game.model';
import { ShapeService } from "./shapes/shape.service"

@Component({
  selector: 'app-game',
  templateUrl: 'game.html'
})
export class GameComponent implements OnInit {

  @ViewChild('svg') svg: ElementRef;

  public game: Game;

  public touching: boolean = false;

  constructor(private shapeService: ShapeService) {}

  ngOnInit(){
    this.game = new Game(this.svg.nativeElement, this.shapeService);
    this.game.init();
  }

  onTouchEnd() {
    this.touching = false;

    if (this.game.running) {
      this.game.stopFill();
    }
  }

  onTouchStart() {
    this.touching = true;
    this.game.running ?
      this.game.startFill():
      this.game.start();
  }

}
