import React, { Component } from "react";
import PropTypes from "prop-types";
import Event from "./Event";

class TileComponent extends Component {
  constructor(props) {
    super(props);

    /** Define a fn to add to the animation queue */
    this.props.tileObj.flipNext = (event, hex, ...rest) => {
      event.addToQueue(() => {
        if (this.props.active) {
          const strHex = this.props.tileObj.execute(event, hex, ...rest);
          window.requestAnimationFrame(() =>
            this.flipTile(typeof strHex === "string" ? strHex : hex || "black")
          );
        }
      }, this.props.coords);
    };
  }

  start = () => {
    const params = {};
    const Tiles = global.Tiles;

    /** Adding data to the global namespace */
    Tiles.set(params);
    eval('"use strict";\n' + global.Tiles.src);

    Tiles.reset();
    const event = new Event(this.props.coords, params.function);
    this.props.tileObj.flipNext(event);
    event.startFrames(1);
  };

  flipTile = hex => {
    global.Tiles.elements[this.props.coords].style.backgroundColor = hex;
  };

  componentDidMount() {
    global.Tiles.tileComponents[this.props.coords] = this;
  }

  render() {
    return (
      <div
        key={this.props.coords}
        ref={n => (global.Tiles.elements[this.props.coords] = n)}
        className={"tile " + this.props.tileObj.classList}
        data-tileid={this.props.coords}
        style={{
          top: this.props.y,
          width: this.props.width,
          height: this.props.height,
          left: this.props.x - this.props.width
        }}
      />
    );
  }
}

TileComponent.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  tileObj: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  coords: PropTypes.string.isRequired
};

export default TileComponent;
