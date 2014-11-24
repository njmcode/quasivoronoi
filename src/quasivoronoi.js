

var QuasiVoronoiGrid = (function(options) {

  var defaults = {
    gridWidth: 40,
    gridHeight: 40,
    numRegions: 30,
    autogenerate: true
  };

  /**
   * Public methods
   **/

  // Change the size of the grid
  this.setGrid = function(w, h) {
    this.width = w;
    this.height = h;
  };

  // Change the number of regions (origins) generated
  this.setNumRegions = function(num) {
    this.numRegions = num;
  };

  // The actual meat of the Voronoi-esque logic
  // Populats this.origins and this.cells
  this.generate = function() {

    // First we generate a set of random fractional coords in the grid
    // e.g x: 20.7, y: 5.3
    this.origins = _generateRandomGridPoints(this.width, this.height, this.numRegions);

    // Then for each cell in the grid, we assign it to the id of
    // the closest random point we generated
    this.cells = {};
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var closest = _getClosestPoint(x, y, this.origins);
        this.cells['x' + x + 'y' + y] = closest.id;
      }
    }
  };

  // Returns the origin point the cell at x,y is assigned to
  this.getOrigin = function(x, y) {
    return this.cells['x' + x + 'y' + y];
  };

  // Initialize - no real need to call this directly
  this.init = function() {
    this.options = _extend(defaults, options);

    this.setGrid(this.options.gridWidth, this.options.gridHeight);
    this.setNumRegions(this.options.numRegions);

    if (this.options.autogenerate) this.generate();
  };

  /**
   * Some private helper methods
   **/

  // Extend an object with another's properties.
  // Useful for applying defaults.
  var _extend = function(obj, extObj) {

    if (arguments.length > 2) {
      for (var a = 1; a < arguments.length; a++) {
        extend(obj, arguments[a]);
      }
    } else {
      for (var i in extObj) {
        obj[i] = extObj[i];
      }
    }
    return obj;
  };

  // Calculate the line distance between two x,y objects
  var _lineDistance = function(point1, point2) {
    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;
    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
  };

  // Get a random float rounded to 1 decimal place
  var _rndFloat = function(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
  };

  // Takes a given grid of width * height and generates numPoints random
  // fractional points inside it (e.g. x: 20.2, y: 30.7)
  var _generateRandomGridPoints = function(width, height, numPoints) {
    var points = [];
    for (var i = 0; i < numPoints; i++) {
      var newPoint = {
        id: i,
        x: _rndFloat(0, width - 1),
        y: _rndFloat(0, height - 1)
      };
      points.push(newPoint);
    }
    return points;
  };

  // Returns the point object which is closest to x.5, y.5
  // (e.g. the centre of the cell at x,y)
  var _getClosestPoint = function(x, y, points) {
    var closest;
    var closestDist = Number.MAX_VALUE;

    for (var i = 0, ln = points.length; i < ln; i++) {
      var dist = _lineDistance({
        x: x + 0.5,
        y: y + 0.5
      }, points[i]);
      if (dist < closestDist) {
        closest = points[i];
        closestDist = dist;
      }
    }
    return closest;
  };

  // kick it off
  this.init();

});