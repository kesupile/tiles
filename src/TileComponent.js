import React, { Component } from "react";
import PropTypes from "prop-types";
import Event from "./Event";

class TileComponent extends Component {
  constructor(props) {
    super(props);

    this.props.tileObj.flipNext = (event, hex, ...rest) => {
      event.addToQueue(() => {
        if (this.props.active) {
          this.props.tileObj.flipNow(
            event,
            this.props.tileObj.execute(event, hex, ...rest) || hex
          );
        }
      }, this.props.coords);
    };

    this.props.tileObj.flipNow = (event, hex) => {
      event.addToFlipNow(() => this.flipTile(hex), this.props.coords);
    };
  }

  componentWillMount() {
    this.props.tileObj.setDisplayTile(this);
  }

  componentWillUnmount() {
    this.props.tileObj.deleteDisplayTile();
  }

  start = () => {
    const data = {},
      Tiles = global.Tiles;
    Tiles.set(data);
    eval('"use strict";\n' + global.Tiles.src);
    Tiles.reset();
    const event = new Event(this.props.coords, data.function);
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
      <React.Fragment>
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
      </React.Fragment>
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
