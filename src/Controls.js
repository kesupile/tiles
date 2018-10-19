import React, { Component } from "react";
import debounce from "debounce";
import PropTypes from "prop-types";
import { Slider } from "antd";

// Create a common structure for all controls
const Control = ({ label, children }) => {
  return (
    <div className="control-item">
      <div className="control-label">{label}:</div>
      <div className="control-control">{children}</div>
    </div>
  );
};

// Controls container
class Controls extends Component {
  constructor(props) {
    super(props);

    this.handleWidth = debounce(this.handleWidth, 800);
    this.handleCount = debounce(this.handleCount, 800);
  }

  onChange = data => {
    this.props.active && this.props.kill();
    this.props.onChange(data);
  };

  handleWidth = width => {
    this.onChange({ width });
  };

  handleCount = items => {
    this.onChange({ items });
  };

  render() {
    console.log("width", this.props.width);
    return (
      <React.Fragment>
        <div
          id="activeState"
          class={this.props.active ? "active" : "inactive"}
        />
        <button onClick={this.props.kill}>Stop</button>

        <button
          onClick={e => global.Tiles.elements[`${this.props.width},0`].click(e)}
        >
          Benchmark (top left)
        </button>

        <Control label="Tile width">
          <Slider
            defaultValue={this.props.width}
            min={4}
            max={200}
            onChange={this.handleWidth}
          />
        </Control>

        <Control label="Tile count">
          <Slider
            defaultValue={this.props.items}
            min={2}
            max={100}
            onChange={this.handleCount}
          />
        </Control>
      </React.Fragment>
    );
  }
}

Controls.PropTypes = {
  active: PropTypes.bool.isRequired,
  kill: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default Controls;
