import { EventEmitter } from '@angular/core';
import { ShapeConfig } from './shape-config.interface';
import { ShapeCoverage } from './shape-coverage.interface';

export abstract class Shape {

  /* The svg context element */
  protected svg: SVGElement;

  /* The shape's configuration */
  protected config: ShapeConfig;

  /* The shape's SVG elements */
  public elements: {[key: string]: SVGElement} = {};

  /* Indicates whether the shape is refilled */
  public refill: boolean = false;

  /* Fired when a shape is completed */
  public onCompleted: EventEmitter<Shape> = new EventEmitter();

  /* Fired the filled shape is off track */
  public onCollision: EventEmitter<Shape> = new EventEmitter();

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
   * Create the shape.
   */
  public abstract create();

  /**
   * Fill the shape.
   *
   * @param {number} degrees
   */
  public abstract fill(degrees?: number);

  /**
   * Follow the shape.
   *
   * @param {number} degrees
   */
  public abstract follow(degrees?: number);

  /**
   * Get the shape's coverage.
   *
   * @returns {ShapeCoverage}
   */
  public abstract getCoverage(): ShapeCoverage;

  /**
   * Check whether the filled shape is off track.
   *
   * @returns {boolean}
   */
  protected abstract hasCollision(): boolean;

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

}
