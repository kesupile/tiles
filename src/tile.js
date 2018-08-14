export default class Tile {
  constructor(coords) {
    this.coords = coords;
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

  execute(event, ...rest) {
    try {
      (event._srcFn || (() => true)).call(this, event, ...rest);
    } catch (e) {
      console.log("....error..", e);
    }
  }
}
