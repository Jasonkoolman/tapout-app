import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Shape } from './shapes/shape.model'
import { ShapeService } from "./shapes/shape.service"
import { ShapeCoverage } from './shapes/shape-coverage.interface';
import { Subscriber } from 'rxjs/Subscriber'

@Component({
  selector: 'app-game',
  templateUrl: 'game.html'
})
export class GameComponent implements OnInit {

  @ViewChild('svg') svg: ElementRef;

  /* Whether the game is running */
  public running: boolean = false;

  /* Whether the game is running */
  public ended: boolean = false;

  /* The total game score */
  public score: number = 0;

  /* Number of frames per second */
  private fps: number = 60;

  /* Interval timer */
  private interval: number;

  /* Any event subscriptions made */
  private subscriptions: Array<Subscriber<any>> = [];

  /* The shape coverage results */
  private results: Array<ShapeCoverage> = [];

  /* The active shape, which the player is filling */
  private shape: Shape;

  /* Whether the player is filling the shape */
  private filling: boolean;

  /**
   * @constructor
   *
   * @param {ShapeService} shapeService
   */
  constructor(private shapeService: ShapeService) {}

  /**
   * Initialize the game.
   */
  ngOnInit() {
    const shapes = ShapeService.generate(this.svg.nativeElement, 2, 2);
    this.shapeService.add(shapes);
    this.shape = this.shapeService.active();
  }

  /**
   * Trigger activated.
   */
  onTouchStart() {
    if (this.running) {
      this.filling = true;
      this.shape.refill = true;
    } else {
      this.start();
    }
  }

  /**
   * Trigger released.
   */
  onTouchEnd() {
    if (this.running) {
      this.filling = false;
    }
  }

  /**
   * Start the game.
   */
  start() {
    this.running = true;
    this.filling = true;
    this.interval = this.loop();
    this.subscribe();
  }

  /**
   * The game loop.
   */
  loop(): number {
    const draw = () => {
      if (this.filling) {
        this.shape.fill();
      }
      this.shape.follow();
    };

    return setInterval(() => {
      requestAnimationFrame(draw);
    }, 1000/this.fps);
  }

  /**
   * Subscribe event handlers to the shape.
   */
  subscribe() {
    const onCollision = this.shape.onCollision.subscribe((shape: Shape) => {
      console.log('SHAPE COLLISION.');
      shape.elements.group.setAttributeNS(null, 'class', 'collision');
      this.next();
    });

    const onCompleted = this.shape.onCompleted.subscribe((shape: Shape) => {
      console.log('SHAPE COMPLETED. COVERAGE: ', shape.getCoverage());
      const coverage = shape.getCoverage();
      this.score += parseFloat(coverage.percentage);
      this.results.push(coverage);
      this.next();
    });

    this.subscriptions.push(onCollision, onCompleted);
  }

  /**
   * Assign a new shape to fill.
   */
  next() {
    clearInterval(this.interval);

    if (this.shapeService.assign()) {
      this.shape = this.shapeService.active();
      this.interval = this.loop();
      this.subscribe();
    } else {
      this.end();
    }
  }

  /**
   * End the game.
   */
  end() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.running = false;
    this.ended = true;
    console.log('GAME END');
  }

}
