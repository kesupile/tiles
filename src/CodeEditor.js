import React from "react";
import MonacoEditor from "react-monaco-editor";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <MonacoEditor
        width="100%"
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={this.props.src}
        options={options}
        onChange={this.props.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}
