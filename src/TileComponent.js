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
  }

  componentWillMount() {
    this.props.tileObj.setDisplayTile(this);
  }

  componentWillUnmount() {
    this.props.tileObj.deleteDisplayTile();
  }

  start = () => {
    const fn = eval(global.Tiles.src);
    const event = new Event(this.props.coords, fn);
    event.setCurrentHex(
      global.Tiles.elements[this.props.coords].style.backgroundColor
    );
    this.props.tileObj.flip(event);
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
          className="tile"
          style={{
            top: this.props.y,
            width: this.props.width,
            height: this.props.height,
            left: this.props.x - this.props.width
          }}
        >
          <div
            ref={n => (global.Tiles.elements[this.props.coords] = n)}
            className="innerTile"
            data-tileid={this.props.coords}
          />
        </div>
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
