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

  /* Shifting of the circle for rotation */
  private shift: number = 10;

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
console.log(this.shift);
    this.draw(this.shift, (360 - config.gap) + this.shift, true); // draw backdrop
  }

  /**
   * Draw next shape step.
   */
  next() {
    if (this.step < this.config.steps) {
      const start = (this.step * this.stepSize) + this.shift,
            end = start + this.stepSize;

      this.draw(start, end);
      this.step++;
    } else {
      console.log('Filled');
    }
  }

  /**
   * Draw the shape.
   *
   * @param {number} start
   * @param {number} end
   * @param {boolean} outline
   */
  draw(start: number, end: number, outline: boolean = false) {
    const context = this.context,
          config = this.config;

    this.annulus(config.center, config.radius, config.radius+config.size, start, end);

    if (outline) {
      context.fillStyle = 'rgba(255,255,255,0.2)';
      context.fill();
    } else {
      context.fillStyle = config.color;
      context.fill();
    }
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
