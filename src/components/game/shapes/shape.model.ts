import { EventEmitter } from '@angular/core';
import { ShapeConfig } from './shape-config.interface';

export abstract class Shape {

  /* The svg context element */
  protected svg: SVGElement;

  /* The shape's configuration */
  protected config: ShapeConfig;

  /* The shape's SVG elements */
  protected elements: {[key: string]: SVGElement} = {};

  /* Fired when a shape is completed */
  public onCompleted: EventEmitter<Shape> = new EventEmitter();

  /**
   * @constructor
   *
   * @param {SVGElement} svg
   * @param {ShapeConfig} config
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
   * @returns {SVGElement}
   */
  static createElement(name: string, attributes: any = {}): SVGElement {
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
  public abstract create();

  /**
   * Fill the shape.
   *
   * @param {number} percentage
   */
  public abstract fill(percentage: number);

  /**
   * Check whether the filled shape is off track.
   *
   * @returns {boolean}
   */
  public abstract isOffTrack(): boolean;

  /**
   * Get the shape's coverage percentage.
   *
   * @returns {boolean}
   */
  public abstract getCoverage(): number;

}
