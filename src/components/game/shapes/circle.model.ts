import { Shape } from './shape.model';
import { ShapeConfig } from './shape-config.interface';
import { ShapeCoverage } from './shape-coverage.interface';

export class Circle extends Shape {

  /* The circle's current degrees */
  protected degrees = {
    covered: 0, // total degrees covered
    total: 0,   // total degrees of the circle
    end: 0,     // end of the shape track
    tail: 0,    // tail of fill path
    head: 0,    // head of fill path
    fhead: 0,   // head of following path
  };

  /* The circle's track degrees */
  protected track: Array<[number, number]> = [
    [0, 350]
  ];

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
    this.degrees.end = this.track[this.track.length - 1][1];
    this.elements.group = Shape.createElement('g');
    this.createTrackPath();
    this.createFollowPath();
    this.createFillPath();
    this.svg.appendChild(this.elements.group);
  }

  /**
   * Fill the shape.
   *
   * @param {number} degrees
   */
  fill(degrees: number = 1) {
    if (this.refill) {
      this.degrees.head = this.degrees.fhead; // reset head to follow path
      this.degrees.tail = this.degrees.fhead; // reset tail to follow path
      this.refill = false;
      this.createFillPath();
    }

    this.degrees.head += degrees;
    this.degrees.covered += degrees;

    if (this.hasCollision()) {
      this.onCollision.emit(this); // completed TODO: FIX BUG WHERE COLLISIONS ARE NOT REGISTERED
    } else {
      this.elements.fillPath.setAttributeNS(null, 'd', // update coordinates
        this.getAnnularCoordinates(this.degrees.tail, this.degrees.head)
      );
    }
  }

  /**
   * Follow the shape.
   *
   * @param {number} degrees
   */
  follow(degrees: number = 1) {
    this.degrees.fhead += degrees;

    // console.log(this.degrees);

    if (this.degrees.fhead > this.degrees.end) {
      this.onCompleted.emit(this);
    } else {
      this.elements.followPath.setAttributeNS(null, 'd', // update coordinates
        this.getAnnularCoordinates(0, this.degrees.fhead)
      );
    }
  }

  /**
   * Get the shape's coverage percentage.
   *
   * @returns {number}
   */
  getCoverage(): ShapeCoverage {
    return {
      total: this.degrees.total,
      covered: this.degrees.covered,
      percentage: (this.degrees.covered / this.degrees.total * 100).toPrecision(4)
    }
  }

  /**
   * Check whether the filled shape is off track.
   *
   * @returns {boolean}
   */
  protected hasCollision(): boolean {
    let result = true;

    this.track.forEach((degrees) => {
      if (this.degrees.tail >= degrees[0] && this.degrees.head <= degrees[1]) {
        return result = false;
      }
    });

    return result;
  }

  /**
   * Create the track path.
   */
  private createTrackPath() {
    this.track.forEach((degrees) => {
      const path = Shape.createElement('path', {
        d: this.getAnnularCoordinates(degrees[0], degrees[1]),
        fill: this.config.trackColor
      });

      this.degrees.total += degrees[1] - degrees[0]; // add up difference to total degrees
      this.elements.group.appendChild(path); // append to group
    });
  }

  /**
   * Create the follow path.
   */
  private createFollowPath() {
    const path = Shape.createElement('path', {
      d: this.getAnnularCoordinates(this.degrees.tail, this.degrees.head),
      fill: this.config.followColor
    });

    this.elements.followPath = path; // store new path
    this.elements.group.appendChild(path); // append to group
  }

  /**
   * Create and assign a (new) fill path.
   */
  private createFillPath() {
    const path = Shape.createElement('path', {
      d: this.getAnnularCoordinates(this.degrees.tail, this.degrees.head),
      fill: this.config.fillColor
    });

    this.elements.fillPath = path; // store new path
    this.elements.group.appendChild(path); // append to group
  }

  /**
   * Get the path coordinates to draw an annulus based on the circle's
   * configuration. All credits go to Phrogz from StackOverflow.
   *
   * @see https://stackoverflow.com/questions/11479185
   *
   * @param {number} startDegrees
   * @param {number} endDegrees
   *
   * @returns {string}
   */
  private getAnnularCoordinates(startDegrees: number, endDegrees: number): string {
    const config = this.config;

    let opts = {
      cx: config.x,                     // center x
      cy: config.y,                     // center y
      r1: config.radius,                // inner radius
      r2: config.radius + config.size,  // outer radius
      sr: startDegrees * Math.PI/180,   // start radians
      cr: endDegrees * Math.PI/180,     // close radians
    };

    const points = [
      [opts.cx + opts.r2*Math.cos(opts.sr), opts.cy + opts.r2*Math.sin(opts.sr)],
      [opts.cx + opts.r2*Math.cos(opts.cr), opts.cy + opts.r2*Math.sin(opts.cr)],
      [opts.cx + opts.r1*Math.cos(opts.cr), opts.cy + opts.r1*Math.sin(opts.cr)],
      [opts.cx + opts.r1*Math.cos(opts.sr), opts.cy + opts.r1*Math.sin(opts.sr)],
    ];

    const angleDiff = opts.cr - opts.sr,
          largeArc = (angleDiff % (Math.PI*2)) > Math.PI ? 1 : 0,
          data = []; // path coordinates

    data.push('M' + points[0].join());                                      // Move to P0
    data.push('A' + [opts.r2, opts.r2, 0, largeArc, 1, points[1]].join());  // Arc to P1
    data.push('L' + points[2].join());                                      // Line to P2
    data.push('A' + [opts.r1, opts.r1, 0, largeArc, 0, points[3]].join());  // Arc to P3
    data.push('z');                                                         // Close path (Line to P0)

    return data.join(' ');
  }


}
