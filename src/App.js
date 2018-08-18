import React, { Component } from "react";
import Surface from "./Surface";
import CodeEditor from "./CodeEditor";
import "./App.css";
import debounce from "debounce";
import Controls from "./Controls";
import "antd/dist/antd.css";

class App extends Component {
  constructor() {
    super();

    global.Tiles = {};
    this.codeEditor = React.createRef();
    this.onChange = debounce(this.onChange, 500);
    this.state = {
      active: false,
      up: true,
      flat: false,
      items: 50,
      src: `(function(e, c, reFlipped){
const nextHex = c || 'purple'
        Object.values(this.neighbours).forEach(n => {
            if(n && !e.includes(n)) n.flip(e, nextHex, reFlipped)
        })
reFlipped = reFlipped ? reFlipped : [];
!reFlipped.includes(this.coords) && e.delay(4, () => {
Object.values(this.neighbours).forEach(
n => {
if (n && !reFlipped.includes(n.coords)) {
reFlipped.push(n.coords)
n.flip(e, 'black', reFlipped)
}})
})
return nextHex
})`,
      calculating: true
    };
  }

  componentDidMount() {
    this.setState({
      width: this.calculate(),
      active: true,
      calculating: false
    });
  }

  calculate = state => {
    let parent = document.querySelector("#tileSurface");
    let w = parent.getBoundingClientRect().width;
    return Math.floor((w - 20) / (state || this.state).items);
  };

  onChange = src => {
    this.setState({ src });
  };

  handleControlChange = obj => {
    let nextState = Object.assign({}, this.state, obj);
    this.setState({ calculating: true });
    setTimeout(() => {
      this.setState(
        Object.assign(nextState, {
          width: this.calculate(nextState),
          active: true,
          calculating: false
        })
      );
    }, 1000);
  };

  kill = () => {
    this.setState({ active: false });
    setTimeout(() => {
      this.setState({ active: true });
    }, 5000);
  };

  render() {
    return (
      <React.Fragment>
        <div id="operationsContainer">
          <Controls
            active={this.state.active}
            items={this.state.items}
            kill={this.kill}
            onChange={this.handleControlChange}
            width={this.state.width}
          />
        </div>
        <div id="tileSurface">
          {!this.state.calculating ? (
            <Surface
              width={this.state.width}
              items={this.state.items}
              colorUp="blue"
              colorDown="green"
              src={this.state.src}
              active={this.state.active}
            />
          ) : null}
        </div>
        <div id="codeEditor">
          <CodeEditor
            ref={this.codeEditor}
            onChange={this.onChange}
            src={this.state.src}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
