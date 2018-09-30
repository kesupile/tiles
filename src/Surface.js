import React, { Component } from "react";
import TileObject from "./tile";
import Tile from "./TileComponent";
import PropTypes from "prop-types";

class Surface extends Component {
  constructor(props) {
    super(props);
    console.log("surface constructor");
    let x = props.width;
    let max = props.width * props.items;
    let y = 0;
    let tiles = {};
    while (y < max) {
      let coords = [x, y].join(",");
      tiles[coords] = new TileObject(coords);
      if (x === max) {
        x = props.width;
        y += props.width;
      } else {
        x += props.width;
      }
    }
    this.tiles = tiles;
    this.state = {
      up: false
    };
  }

  start = e => {
    const tileId = e.target.dataset.tileid;
    console.log(e.target);
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
          let w = this.props.width;
          let [x, y] = xy.split(",").map(Number);
          let neighbours = {
            "x-1,y-1": this.tiles[[x - w, y - w].join(",")],
            "x,y-1": this.tiles[[x, y - w].join(",")],
            "x+1,y-1": this.tiles[[x + w, y - w].join(",")],
            "x-1,y": this.tiles[[x - w, y].join(",")],
            "x+1,y": this.tiles[[x + w, y].join(",")],
            "x-1,y+1": this.tiles[[x - w, y + w].join(",")],
            "x,y+1": this.tiles[[x, y + w].join(",")],
            "x+1,y+1": this.tiles[[x + w, y + w].join(",")]
          };

          this.tiles[xy].registerNeighbours(neighbours);

          return (
            <Tile
              key={i}
              colorDown={this.props.colorDown}
              colorUp={this.props.colorUp}
              x={x}
              y={y}
              height={this.props.width}
              width={this.props.width}
              tileObj={this.tiles[xy]}
              up={typeof this._up === "boolean" ? this._up : this.state.up}
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
