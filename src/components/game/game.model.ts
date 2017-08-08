import { Shape } from './shapes/shape.interface';
import { Circle } from './shapes/circle.model';
import { EventEmitter } from '@angular/core';

export class Game {

  /* Whether the game started */
  public started: boolean;

  /* Called when a shape is completed */
  public shapeCompleted: EventEmitter<Shape> = new EventEmitter();

  /* Called when all shapes are completed */
  public shapesCompleted: EventEmitter<boolean> = new EventEmitter();

  /* Called when a new shape was assigned */
  public shapeAssigned: EventEmitter<Shape> = new EventEmitter();

  /* Interval timer */
  private timer: any;

  /* The present shapes */
  private shapes: Array<Shape> = [];

  /* Index of the active shape */
  private activeShapeIndex: number;

  /* Indexes of the completed shapes */
  private completedShapes: Array<number> = [];

  /**
   * @constructor
   *
   * @param {HTMLCanvasElement} canvas
   */
  constructor(private canvas: HTMLCanvasElement) {}

  /**
   * Set-up the game.
   */
  setup() {
    const context = this.canvas.getContext('2d'),
          center = this.canvas.width/2;

    for (let i = 0; i < 4; i++) {
      const circle = new Circle(context, {
        gap: Math.random() * 100,
        size: 8,
        steps: 100,
        radius: 75 + (i * 25),
        center: center,
        color: 'rgba(255,255,255,0.2)'
      });

      this.shapes.push(circle);
    }

    this.activeShapeIndex = this.shapes.length-1;

    this.canvas.onmousedown = () =>  {
      this.started = true;
      this.timer = setInterval(() => this.getActiveShape().next(), 1000/60);
    };
    this.canvas.onmouseup = () => {
      if (this.started) {
        this.onShapeComplete();
      }
    };
  }

  /**
   * End the game.
   */
  end() {
    this.shapesCompleted.emit(true);
  }

  /**
   * Assign a new shape to complete.
   */
  assign() {
    this.completedShapes.push(this.activeShapeIndex);
    this.activeShapeIndex = this.shapes.length - (1 + this.completedShapes.length);
    this.shapeAssigned.emit(this.getActiveShape());
  }

  /**
   * Get the active shape.
   *
   * @return {Shape}
   */
  getActiveShape(): Shape {
    return this.shapes[this.activeShapeIndex];
  }

  /**
   * Callback when a shape is completed.
   */
  onShapeComplete() {
    clearTimeout(this.timer);
    this.shapeCompleted.emit(this.getActiveShape());
    this.completedShapes.length >= this.shapes.length ?
      this.end():
      this.assign();
  }

}
