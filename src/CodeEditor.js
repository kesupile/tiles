import React from "react";
// import MonacoEditor from "react-monaco-editor";
import { Input } from "antd";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <textarea
        ref={n => (global.src = n)}
        id="srcCode"
        style={{ width: "100%", height: "100%" }}
        defaultValue={this.props.src}
      />
    );
  }
}
