import React, { Component } from "react";
import PropTypes from "prop-types";
import Event from "./Event";

class TileComponent extends Component {
  constructor(props) {
    super(props);

    this.props.tileObj.flip = (event, ...rest) => {
      event.addToQueue(() => {
        if (this.props.active) {
          this.props.tileObj.execute(event, ...rest);
          this.flip();
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
    const fn = eval(this.props.src);
    const event = new Event(this.props.coords, fn);
    this.props.tileObj.flip(event);
    event.startFrames();
  };

  flip = () => {
    this._up = typeof this._up === "boolean" ? !this._up : !this.state.up;
    this.setState({ up: !this.state.up, flat: !this.state.flat });
  };

  render() {
    return (
      <React.Fragment>
        <div
          key={this.props.coords}
          className="tile"
          onClick={() => this.start()}
          style={{
            top: this.props.y,
            width: this.props.width,
            height: this.props.height,
            left: this.props.x - this.props.width
          }}
        >
          <div
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
