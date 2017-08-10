import { Injectable } from '@angular/core';
import { Shape } from './shape.model';

@Injectable()
export class ShapeRepository {

  /* The present shapes */
  private shapes: Array<Shape> = [];

  /* The active shape */
  private activeShape: Shape;

  constructor() {}

  /**
   * Get all shapes
   *
   * @returns {Array<Shape>}
   */
  get(): Array<Shape> {
    return this.shapes;
  }

  /**
   * Add a new shape.
   *
   * @param {Shape} shape
   */
  add(shape: Shape) {
    this.shapes.push(shape);
  }

  /**
   * Get the active shape.
   *
   * @returns {Shape}
   */
  getActiveShape(): Shape {
    return this.activeShape;
  }

  /**
   * Set the active shape.
   *
   * @param {Shape} shape
   */
  setActiveShape(shape: Shape) {
    this.activeShape = shape;
  }

}
