export interface ShapeConfig {

  /* X position of the shape */
  x: number;

  /* Y position of the shape */
  y: number;

  /* Size (thickness) of the shape */
  size: number;

  /* Radius of the shape */
  radius: number;

  /* Total shape gutters */
  gutters: number;

  /* Maximum shape rotation */
  rotate: number;

  /* The shape's path colors */
  colors: {
    trackPath: string,
    fillPath: string,
    followPath: string,
  }

}
