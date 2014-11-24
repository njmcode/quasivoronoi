QuasiVoronoiGrid
================

Standalone class to split up a grid into irregular regions using the basic principles of Voronoi diagrams.  Useful for biome/zone generation in procedurally generated maps. Not an exact implementation, leaves a few artifacts occasionally.

Usage
-----

See http://codepen.io/njmcode/pen/ptJhC for an example using Canvas.

```javascript
/**
 * Some consts and canvas setup
**/
var CELL_SIZE = 10,
    NUM_REGIONS = 30,
    c = document.getElementById('my-canvas'),
    ctx = c.getContext('2d');

/**
 * Util methods
**/
function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function rndColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * Create a new Voronoi and set the canvas to its size
**/
var Voronoi = new QuasiVoronoiGrid({
  numRegions: NUM_REGIONS
});

var w = Voronoi.width,
    h = Voronoi.height;

c.width = w * CELL_SIZE;
c.height = h * CELL_SIZE;

/**
 * Store a random color for each region
**/
var points = Voronoi.origins,
    regionColors = [];
for (var i = 0; i < points.length; i++) {
    regionColors.push(rndColor());
}

/**
 * Render out the cells of the grid
**/
for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      drawCell(x, y, regionColors[Voronoi.getOrigin(x, y)]);
    }
}
```

See the source comments for further documentation.