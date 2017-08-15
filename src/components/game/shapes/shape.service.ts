import { Injectable } from '@angular/core';
import { Shape } from "./shape.model"
import { Circle } from "./circle.model";

@Injectable()
export class ShapeService {

  /* The present shapes */
  private shapes: Array<Shape> = [];

  /* The active shape */
  private activeShapeIndex: number = 0;

  /**
   * @constructor
   */
  constructor() {}

  /**
   * Get all shapes, or one by index.
   *
   * @returns {Array<Shape>|Shape}
   */
  get(index?: number): Array<Shape>|Shape {
    if (index) {
      return this.shapes[index];
    }
    return this.shapes;
  }

  /**
   * Get the active shape.
   *
   * @returns {Shape}
   */
  active(): Shape {
    return this.shapes[this.activeShapeIndex];
  }

  /**
   * Add one or more shapes.
   *
   * @param {Array<Shape>} shapes
   */
  add(shapes: Array<Shape>) {
    shapes.forEach(shape => this.shapes.push(shape));
  }

  /**
   * Clear all shapes.
   */
  clear() {
    this.shapes.forEach((shape: Shape) => shape.elements.group.remove());
    this.shapes = [];
  }

  /**
   * Set the next active shape by incrementing the index.
   *
   * @param {boolean} random
   *
   * @returns {boolean}
   */
  assign(random: boolean = false): boolean {
    const index = this.activeShapeIndex+1;

    if (this.shapes[index] !== undefined) {
      this.activeShapeIndex = index;
      this.shapes[index].elements.group.setAttributeNS(null, 'class', 'active');
      return true;
    }

    return false;
  }

  /**
   * Generate a number of shapes with a certain complexity.
   *
   * @param {SVGElement} svg
   * @param {number} quantity
   * @param {number} complexity
   *
   * @returns {Array}
   */
  static generate(svg: SVGElement, quantity: number, complexity: number = 1) {
    const shapes = [];
    const center = {
      x: parseInt(svg.getAttribute('width')) / 2,
      y: parseInt(svg.getAttribute('height')) / 2,
    };

    for (let i = 0; i < quantity; i++) {
      const circle = new Circle(svg, {
        x: center.x,
        y: center.y,
        size: 12 - (complexity * 0.5),
        radius: 60 + (40 * i),
        rotate: 45,
        gutters: complexity,
        colors: {
          trackPath: 'rgba(255,255,255,0.2)',
          fillPath: '#A3D900',
          followPath: 'rgba(22,29,53,0.2)',
        }
      });

      circle.create();
      shapes.push(circle);
    }

    return shapes;
  }

}
