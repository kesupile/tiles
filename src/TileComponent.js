import React, { Component } from "react";
import PropTypes from "prop-types";
import Event from "./Event";

class TileComponent extends Component {
  constructor(props) {
    super(props);

    this.props.tileObj.flip = (event, hex, ...rest) => {
      event.addToQueue(() => {
        if (this.props.active) {
          const nextHex = this.props.tileObj.execute(event, hex, ...rest);
          this.flipTile(nextHex || hex);
        }
      }, this.props.coords);
    };

    this.state = {
      up: undefined,
      flat: undefined
    };
  }

  componentWillMount() {
    this.props.tileObj.setDisplayTile(this);
  }

  componentWillUnmount() {
    this.props.tileObj.deleteDisplayTile();
  }

  start = originalState => {
    const fn = eval(global.src.value);
    const event = new Event(this.props.coords, fn);
    event.setCurrentHex(global.Tiles[this.props.coords].style.backgroundColor);
    this.props.tileObj.flip(event);
    event.startFrames(1);
    // let rgb = 255;
    // (function getSprites() {
    //   Object.values(global.Tiles).forEach(tile => {
    //     tile.style.backgroundColor = `rgb(${rgb},${rgb},${rgb})`;
    //   });
    //   rgb -= 17;
    //   if (rgb > 0) setTimeout(getSprites, 17);
    // })();
  };

  flipTile = hex => {
    global.Tiles[this.props.coords].style.backgroundColor = hex;
  };

  render() {
    return (
      <React.Fragment>
        <div
          key={this.props.coords}
          className="tile"
          onClick={this.start}
          style={{
            top: this.props.y,
            width: this.props.width,
            height: this.props.height,
            left: this.props.x - this.props.width
          }}
        >
          <div
            ref={n => (global.Tiles[this.props.coords] = n)}
            className={`innerTile ${
              typeof this.state.up == "boolean"
                ? this.state.up ? "colorUp" : "colorDown"
                : ""
            }`}
          />
        </div>
      </React.Fragment>
    );
  }
}

TileComponent.propTypes = {
  colorUp: PropTypes.string.isRequired,
  colorDown: PropTypes.string.isRequired
};

export default TileComponent;
