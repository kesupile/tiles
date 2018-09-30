import React from "react";
import ace from "brace";
import { Input } from "antd";

require("brace/mode/javascript");
require("brace/theme/monokai");

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.editor = ace.edit("srcCode");
    this.editor.getSession().setMode("ace/mode/javascript");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.setValue(this.props.src);
    this.editor.on("change", () => this.props.onChange(this.editor.getValue()));
    global.src = this.props.src;
  }

  render() {
    return (
      <div
        id="srcCode"
        style={{ width: "100%", height: "100%" }}
        defaultValue={this.props.src}
      />
    );
  }
}
