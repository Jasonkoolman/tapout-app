import { ShapeConfig } from './shape-config.interface';

export abstract class Shape {

  /* The svg context element */
  protected svg: SVGElement;

  /* The shape's configuration */
  protected config: ShapeConfig;

  /* The shape's SVG elements */
  protected elements: {[key: string]: SVGElement} = {};

  /* Percentage of the shape covered */
  protected coverage: number = 0;


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
  protected createElement(name: string, attributes: any = {}): SVGElement {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', name);

    for (let attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        elem.setAttributeNS(null, attr, attributes[attr]);
      }
    }

    return elem;
  }

  /**
   * Create the shape.
   */
  public abstract create(): void;

  /**
   * Fill the shape incremental.
   */
  public abstract fill(percentage: number): void;

}
