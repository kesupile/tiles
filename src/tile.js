export default class Tile {
  constructor(coords, topBorder, rightBorder, bottomBorder, leftBorder) {
    this.coords = coords;
    this.classList = []
      .concat(
        topBorder ? "topBorder" : [],
        rightBorder ? "rightBorder" : [],
        bottomBorder ? "bottomBorder" : [],
        leftBorder ? "leftBorder" : []
      )
      .join(" ");
  }

  registerNeighbours(neighbours) {
    this.neighbours = neighbours;
  }

  mapNeighbours(fn) {
    return Object.values(this.neighbours).map(fn);
  }

  execute(event, hex, ...rest) {
    try {
      return (event._srcFn || (() => true))(this, event, hex, ...rest);
    } catch (e) {
      console.log("....error..", e);
    }
  }
}
