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

  setDisplayTile(component) {
    this.displayTile = component;
  }

  registerNeighbours(neighbours) {
    this.neighbours = neighbours;
  }

  deleteDisplayTile() {
    delete this.displayTile;
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
