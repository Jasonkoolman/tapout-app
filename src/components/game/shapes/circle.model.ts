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
   *
   * We create the donut effect by using the stroke-dasharray and dashoffset
   * properties. See https://codepen.io/pietropizzi/pen/ohnyb for a demo and
   * check out http://css-tricks.com/svg-line-animation-works for more info.
   */
  create() {
    this.dashArray = (Math.round(2 * Math.PI * this.config.radius) + 1) * 0.75;

    const group = this.createElement('g', {
      'fill': 'none',
      'stroke-width': this.config.size,
      'clip-path': 'url(#clip)'
    });

    const defaults = {
      'r': this.config.radius,
      'cx': parseInt(this.svg.getAttribute('width')) / 2,
      'cy': parseInt(this.svg.getAttribute('height')) / 2,
    };

    const track = this.createElement('circle', {
      ...defaults,
      'stroke': this.config.trackColor,
    });

    const circle = this.createElement('circle', {
      ...defaults,
      'stroke': this.config.fillColor,
      'stroke-dasharray': this.dashArray,
      'stroke-dashoffset': this.dashArray
    });

    const maskPath = this.createElement('path', {
      d: this.annularSector({
        centerX: defaults.cx,
        centerY: defaults.cy,
        startDegrees: 0,
        endDegrees: 270,
        innerRadius: defaults.r - 5,
        outerRadius: defaults.r + 5
      })
    });
    const clipPath = this.createElement('clipPath', {
      id: 'clip'
    });

    clipPath.appendChild(maskPath);

    group.appendChild(clipPath);
    group.appendChild(track);
    group.appendChild(circle);

    this.svg.appendChild(group);

    this.element = circle;
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

  /**
   * Draw annulus.
   *
   * @see https://stackoverflow.com/questions/11479185/svg-donut-slice-as-path-element-annular-sector
   *
   * @return {string}
   */
  private annularSector(options: any) {
    var opts: any = optionsWithDefaults(options);
    var p = [ // points
      [opts.cx + opts.r2*Math.cos(opts.startRadians), opts.cy + opts.r2*Math.sin(opts.startRadians)],
      [opts.cx + opts.r2*Math.cos(opts.closeRadians), opts.cy + opts.r2*Math.sin(opts.closeRadians)],
      [opts.cx + opts.r1*Math.cos(opts.closeRadians), opts.cy + opts.r1*Math.sin(opts.closeRadians)],
      [opts.cx + opts.r1*Math.cos(opts.startRadians), opts.cy + opts.r1*Math.sin(opts.startRadians)],
    ];

    var angleDiff = opts.closeRadians - opts.startRadians;
    var largeArc = (angleDiff % (Math.PI*2)) > Math.PI ? 1 : 0;
    var cmds = [];

    cmds.push("M"+p[0].join());                                // Move to P0
    cmds.push("A"+[opts.r2,opts.r2,0,largeArc,1,p[1]].join()); // Arc to  P1
    cmds.push("L"+p[2].join());                                // Line to P2
    cmds.push("A"+[opts.r1,opts.r1,0,largeArc,0,p[3]].join()); // Arc to  P3
    cmds.push("z");                                // Close path (Line to P0)

    return cmds.join(' ');

    function optionsWithDefaults(o){
      // Create a new object so that we don't mutate the original
      var o2: any = {
        cx           : o.centerX || 0,
        cy           : o.centerY || 0,
        startRadians : (o.startDegrees || 0) * Math.PI/180,
        closeRadians : (o.endDegrees   || 0) * Math.PI/180,
      };

      var t = o.thickness!==undefined ? o.thickness : 100;
      if (o.innerRadius!==undefined)      o2.r1 = o.innerRadius;
      else if (o.outerRadius!==undefined) o2.r1 = o.outerRadius - t;
      else                                o2.r1 = 200           - t;
      if (o.outerRadius!==undefined)      o2.r2 = o.outerRadius;
      else                                o2.r2 = o2.r1         + t;

      if (o2.r1<0) o2.r1 = 0;
      if (o2.r2<0) o2.r2 = 0;

      return o2;
    }
  }


}
