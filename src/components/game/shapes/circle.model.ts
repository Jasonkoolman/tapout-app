import { Shape } from './shape.model';
import { ShapeConfig } from './shape-config.interface'

export class Circle extends Shape {

  /* The dash-array property for the circle */
  private dashArray: number;

  /**
   * @constructor
   *
   * @param {SVGElement} svg
   * @param {ShapeConfig} config
   */
  constructor(svg: SVGElement, config: ShapeConfig) {
    super(svg, config);
  }

  /**
   * Create the shape.
   */
  create() {
    const defaults = {
      'cx': parseInt(this.svg.getAttribute('width')) / 2,
      'cy': parseInt(this.svg.getAttribute('height')) / 2,
      'r': this.config.radius,
      'fill': 'none',
      'stroke-width': this.config.size,
    };

    this.createElement('circle', { // track
      ...defaults,
      'stroke': this.config.trackColor,
    });

    this.dashArray = (Math.round(2 * Math.PI * defaults.r) + 1) * 0.75;
    this.element = this.createElement('circle', {
      ...defaults,
      'stroke': this.config.fillColor,
      'stroke-dasharray': this.dashArray,
      'stroke-dashoffset': this.dashArray,
    });

    this.createElement('rect', {
      ...defaults,
      'stroke': this.config.fillColor,
      'stroke-dasharray': this.dashArray,
      'stroke-dashoffset': this.dashArray,
    });
  }

  /**
   * Fill the shape.
   */
  fill(percentage: number, increments: boolean = true) {
    percentage = increments ? this.filled += percentage : percentage;
    if (percentage <= 100) {
      const dashOffset = this.dashArray * (1 - (percentage / 100));
      this.element.setAttributeNS(null, 'stroke-dashoffset', dashOffset + 'px');
      this.filled = percentage;
    }
  }

}
