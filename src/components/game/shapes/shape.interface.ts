export interface Shape {

  /* The shape configuration */
  config: any;

  /* The canvas context */
  context: any;

  /* The current step */
  step: number;

  /**
   * Draw the next step.
   */
  next(): void;

  /**
   * Draw the shape.
   *
   * @param {number} start
   * @param {number} end
   */
  draw(start: number, end: number): void;

  /**
   * Get completion percentage.
   *
   * @return {string}
   */
  getCompletion(): string;

}
