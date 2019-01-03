import React, { Component } from "react";
import TileObject from "./tile";
import Tile from "./TileComponent";
import PropTypes from "prop-types";

class Surface extends Component {
  constructor(props) {
    super(props);
    const max = props.width * props.items;
    const tiles = {};
    let x = props.width;
    let y = 0;
    while (y < max) {
      const coords = [x, y].join(",");
      tiles[coords] = new TileObject(
        coords,
        y === 0,
        x === max,
        y === max - props.width
      );
      if (x === max) {
        x = props.width;
        y += props.width;
      } else {
        x += props.width;
      }
    }
    this.tiles = tiles;
  }

  start = e => {
    const tileId = e.target.dataset.tileid;
    return (
      tileId &&
      global.Tiles.tileComponents[tileId] &&
      global.Tiles.tileComponents[tileId].start()
    );
  };

  render() {
    return (
      <div id="TilesContainer" onClick={this.start}>
        {Object.keys(this.tiles).map((xy, i) => {
          const w = this.props.width;
          const [x, y] = xy.split(",").map(Number);

          // make this tile aware of it's neighbours
          this.tiles[xy].registerNeighbours({
            "x-1,y-1": this.tiles[[x - w, y - w].join(",")],
            "x,y-1": this.tiles[[x, y - w].join(",")],
            "x+1,y-1": this.tiles[[x + w, y - w].join(",")],
            "x-1,y": this.tiles[[x - w, y].join(",")],
            "x+1,y": this.tiles[[x + w, y].join(",")],
            "x-1,y+1": this.tiles[[x - w, y + w].join(",")],
            "x,y+1": this.tiles[[x, y + w].join(",")],
            "x+1,y+1": this.tiles[[x + w, y + w].join(",")]
          });

          return (
            <Tile
              key={i}
              x={x}
              y={y}
              height={this.props.width}
              width={this.props.width}
              tileObj={this.tiles[xy]}
              coords={xy}
              src={this.props.src}
              active={this.props.active}
            />
          );
        })}
      </div>
    );
  }
}

Surface.propTypes = {
  width: PropTypes.number.isRequired,
  items: PropTypes.number.isRequired
};

export default Surface;
