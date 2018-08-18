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

  execute(event, hex, ...rest) {
    try {
      return (event._srcFn || (() => true)).call(this, event, hex, ...rest);
    } catch (e) {
      console.log("....error..", e);
    }
  }
}
