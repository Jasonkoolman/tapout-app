import { Shape } from './shapes/shape.model';
import { ShapeService } from "./shapes/shape.service";
import {EventEmitter} from "@angular/core";

export class Game {

  /* Whether the game is running */
  public running: boolean = false;

  /* The game score */
  public score: number;

  /* Fired when the game ends */
  public onEnd: EventEmitter<Game> = new EventEmitter();

  /* Number of frames per second */
  private fps: number = 60;

  /* Interval timer */
  private interval: number;

  /* The active shape, which the player is filling */
  private shape: Shape;

  /* Whether the player is filling the shape */
  private filling: boolean;

  /**
   * @constructor
   *
   * @param {SVGElement} svg
   * @param {ShapeService} shapeService
   */
  constructor(private svg: SVGElement, private shapeService: ShapeService) {}

  /**
   * Initialize the game.
   */
  init() {
    const shapes = ShapeService.generate(this.svg, 5, 0);
    this.shapeService.add(shapes);
    this.shape = this.shapeService.active();
  }

  /**
   * Start the game.
   */
  start() {
    this.running = true;
    this.filling = true;
    this.interval = this.loop();
    this.subscribe();

    this.svg.onmousedown = () =>  {
      this.filling = false;
    };
    this.svg.onmouseup = () =>  {
      this.filling = true;
      this.shape.refill = true;
    };
  }

  /**
   * Subscribe event handlers to the shape.
   */
  subscribe() {
    this.shape.onCollision.subscribe((shape: Shape) => {
      console.log('SHAPE COLLISION.');
      shape.elements.group.setAttributeNS(null, 'class', 'gone');
      this.next();
    });
    this.shape.onCompleted.subscribe((shape: Shape) => {
      console.log('SHAPE COMPLETED. COVERAGE: ', shape.getCoverage());
      this.next();
    });
  }

  /**
   * Assign a new shape to fill.
   */
  next() {
    if ( ! this.shapeService.assign()) {
      return this.end();
    }

    clearInterval(this.interval);
    this.shape = this.shapeService.active();
    this.interval = this.loop();
    this.subscribe();
  }

  /**
   * End the game.
   */
  end() {
    clearInterval(this.interval);
    this.running = false;
    this.onEnd.emit(this);
    console.log('GAME END');
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

}
