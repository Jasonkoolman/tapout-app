import { ShapeConfig } from './shape-config.interface';

export abstract class Shape {

  /* The svg context element */
  protected svg: SVGElement;

  /* The shape's configuration */
  protected config: ShapeConfig;

  /* The shape's main element */
  protected element: SVGElement;

  /* The fill percentage */
  protected filled: number = 0;

  /**
   * @constructor
   *
   * @param {SVGElement} svg
   * @param {any} config
   */
  constructor(svg: SVGElement, config: ShapeConfig) {
    this.svg = svg;
    this.config = config;
  }

  /**
   * Create an svg element.
   *
   * @param {string} name
   * @param {any} attributes
   *
   * @return {SVGElement}
   */
  protected createElement(name: string, attributes: any): SVGElement {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', name);

    for (let attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        circle.setAttributeNS(null, attr, attributes[attr]);
      }
    }

    this.svg.appendChild(circle);

    return circle;
  }

  /**
   * Create the shape.
   */
  public abstract create(): void;

  /**
   * Fill the shape.
   */
  public abstract fill(percentage: number, increments: boolean): void;

}
