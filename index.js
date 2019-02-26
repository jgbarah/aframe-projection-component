/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Multiview Projection component for A-Frame.
 */
AFRAME.registerComponent('multiview-projection', {
  schema: {
    xy_color: {
      type: 'string',
      default: 'red'
    },
    xz_color: {
      type: 'string',
      default: 'blue'
    },
    width: {
      type: 'number',
      default: 10
    },
    height: {
      type: 'number',
      default: 10
    },
    opacity: {
      type: 'number',
      default: 0.3
    }
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () { },

  /**
   * Build one of the projection planes.
   */
  proj_plane: function (color, rotation) {
    var plane = document.createElement('a-entity');
    plane.setAttribute('geometry', {'primitive': 'plane',
                                    'height': this.data.height,
                                    'width': this.data.width});
    plane.setAttribute('material', {'color': color,
                                    'opacity': this.data.opacity,
                                    'side': 'double'});
    plane.setAttribute('rotation', rotation);
    this.el.appendChild(plane);
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    this.proj_plane(this.data.xy_color, {x: 0, y: 0, z: 0});
    this.proj_plane(this.data.xz_color, {x: 90, y: 0, z: 0});
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { }
});

/**
 * Dot component, for using with the Multiview Projection component for A-Frame.
 */
AFRAME.registerComponent('dot', {
  schema: {
    color: {
      type: 'string',
      default: 'black'
    },
    radius: {
      type: 'number',
      default: 0.1
    }
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () { },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    var sphere = document.createElement('a-sphere');
    sphere.setAttribute('color', this.data.color);
    sphere.setAttribute('radius', this.data.radius);
    this.el.appendChild(sphere);
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { }
});

/**
 * Segment component, for using with the Multiview Projection component for A-Frame.
 */
AFRAME.registerComponent('segment', {
  schema: {
    color: {
      type: 'string',
      default: 'black'
    },
    start: {
      type: 'selector',
      default: '#A'
    },
    end: {
      type: 'selector',
      default: '#B'
    },
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () { },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    var segment = document.createElement('a-entity');
    console.log(this.data.start);
    console.log(this.data.start.getAttribute('position'));
    segment.setAttribute('line', {'start': this.data.start.getAttribute('position'),
                                  'end': this.data.end.getAttribute('position'),
                                  'color': this.data.color});
    this.el.appendChild(segment);
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { }
});


/**
 * Multiview Projection component for A-Frame.
 */
AFRAME.registerComponent('projection', {
  schema: {
    xy: {
      type: 'boolean',
      default: true
    },
    xz: {
      type: 'boolean',
      default: true
    },
    lines: {
      type: 'boolean',
      default: true
    },
    xy_color: {
      type: 'string',
      default: 'red'
    },
    xz_color: {
      type: 'string',
      default: 'blue'
    },
    xy_radius: {
      type: 'number',
      default: 0.1
    },
    xz_radius: {
      type: 'number',
      default: 0.1
    },
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () { },

  /**
   * Build projection of a point.
   */
  point_projection: function (pos_projection, pos_x, color, radius, lines) {

    var sphere = document.createElement('a-sphere');
    sphere.setAttribute('color', color);
    sphere.setAttribute('radius', radius);
    sphere.setAttribute('position', pos_projection);
    this.el.appendChild(sphere);
    if (lines) {
      var line = document.createElement('a-entity');
      line.setAttribute('line', {'start': {x: 0, y: 0, z: 0},
                                 'end': pos_projection,
                                 'color': color});
      this.el.appendChild(line);
      line = document.createElement('a-entity');
      line.setAttribute('line', {'start': pos_x,
                                 'end': pos_projection,
                                 'color': color});
      this.el.appendChild(line);
    };

  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {

    var y0 = 0 - this.el.getAttribute('position').y;
    var z0 = 0 - this.el.getAttribute('position').z;
    var pos_x = {x: 0, y: y0, z: z0};
    if (this.data.xy) {
      var pos_xy = {x: 0, y: 0, z: z0};
      this.point_projection(pos_xy, pos_x,
                            this.data.xy_color,
                            this.data.xy_radius, this.data.lines);
    };

    if (this.data.xz) {
      var pos_xz = {x: 0, y: y0, z: 0};
      this.point_projection(pos_xz, pos_x,
                            this.data.xz_color,
                            this.data.xz_radius, this.data.lines);
    };

  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { }
});
