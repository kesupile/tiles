import React, { Component } from "react";
import { Slider } from "antd";
import debounce from "debounce";

let Control = ({ label, control }) => {
  return (
    <div className="control-item">
      <div className="control-label">{label}:</div>
      <div className="control-control">{control}</div>
    </div>
  );
};

export default class Controls extends Component {
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

        <Control
          label="Tile width"
          control={
            <Slider
              defaultValue={this.props.width}
              min={4}
              max={200}
              onChange={this.handleWidth}
            />
          }
        />

        <Control
          label="Tile count"
          control={
            <Slider
              defaultValue={this.props.items}
              min={2}
              max={100}
              onChange={this.handleCount}
            />
          }
        />
      </React.Fragment>
    );
  }
}
