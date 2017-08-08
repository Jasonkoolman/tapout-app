import { Shape } from './shape.interface';
import { ShapeConfig } from './shape-config.interface';

export class Circle implements Shape {

  /* The shape configuration */
  public config: any;

  /* The canvas context */
  public context: CanvasRenderingContext2D;

  /* The current step */
  public step: number = 0;

  /* The size of each step */
  private stepSize: number;

  /**
   * @constructor
   *
   * @param {CanvasRenderingContext2D} context
   * @param {any} config
   */
  constructor(context: CanvasRenderingContext2D, config: ShapeConfig) {
    this.context = context;
    this.config = config;
    this.stepSize = (360 - config.gap) / this.config.steps;
    this.draw(0, 360 - config.gap); // draw backdrop
  }

  /**
   * Draw next shape step.
   */
  next() {
    if (this.step < this.config.steps) {
      const start = this.step * this.stepSize,
            end = start + this.stepSize;

      this.draw(start, end);
      this.step++;
    } else {
      console.log('Filled');
    }
  }

  /**
   * Draw the shape.
   */
  draw(start: number, end: number) {
    const context = this.context,
          config = this.config;

    this.annulus(config.center, config.radius, config.radius+config.size, start, end);
    context.fillStyle = config.color;
    // context.translate(config.center, config.center);
    // context.rotate(Math.PI / 4);
    context.fill();
  }

  /**
   * Get completion percentage.
   *
   * @return {string}
   */
  getCompletion(): string {
    return (100 * (this.step / this.config.steps)).toPrecision(3);
  }

  /**
   * Draw annulus.
   *
   * @see https://stackoverflow.com/questions/8030069/how-to-draw-segment-of-a-donut-with-html5-canvas
   *
   * @param {number} center
   * @param {number} innerRadius
   * @param {number} outerRadius
   * @param {number} startAngle
   * @param {number} endAngle
   * @param {boolean} anticlockwise
   */
  private annulus(
    center: number,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise: boolean = false
  ) {
    const th1 = startAngle * Math.PI / 180,
          th2 = endAngle * Math.PI / 180,
          startOuterArcX = outerRadius * Math.cos(th2) + center,
          startOuterArcY = outerRadius * Math.sin(th2) + center;

    this.context.beginPath();
    this.context.arc(center, center, innerRadius, th1, th2, anticlockwise);
    this.context.lineTo(startOuterArcX, startOuterArcY);
    this.context.arc(center, center, outerRadius, th2, th1, !anticlockwise);
    this.context.closePath();
  }

}
