import React, { Component } from "react";
import Surface from "./Surface";
import CodeEditor from "./CodeEditor";
import "./App.css";
import debounce from "debounce";
import Controls from "./Controls";
import "antd/dist/antd.css";

const colour =
  "`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`";

// default patterns
const src = `
const getRandomColour = () => \n${colour};

const flipNext = (node, direction, count, e, c, c2, hex) => {
    if (count === 0) return

    const nextNode = node.neighbours[direction]
    if(nextNode && !e.includes(nextNode)) {
        nextNode.flipNext(e, c, c2, count === 1, hex);
        return flipNext(nextNode, direction, count -1, e, c, c2, hex)
    }
}

/** Create a series of squares */
const hatch = (node, e, c, c2, shouldReflip, hex) => {
    c = c || getRandomColour();
    c2 = c2 || getRandomColour();
    hex = hex || c

    if (shouldReflip || e.triggerCoords === node.coords){
        flipNext(node, 'x+1,y', 3, e, c, c2, c);
        flipNext(node, 'x,y+1', 3, e, c, c2, c2);
        flipNext(node, 'x-1,y', 3, e, c, c2, c);
        flipNext(node, 'x,y-1', 3, e, c, c2, c2);
    }

    return hex
}

/** register your animation function */
Tiles.register(hatch)
`;

class Tiles {
  constructor() {
    this.elements = {};
    this.tileComponents = {};
    this.src = src;
  }

  set = data => {
    this.register = fn => {
      if (typeof fn == "function") {
        Object.defineProperty(data, "function", {
          value: fn
        });
      }
    };
  };

  reset = () => {
    this.register = () => false;
  };
}

class App extends Component {
  constructor() {
    super();

    global.Tiles = new Tiles();
    this.onChange = debounce(this.onChange, 500);

    this.state = {
      active: false,
      flat: false,
      items: 100,
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
    const parentDimensions = document
      .querySelector("#tileSurface")
      .getBoundingClientRect();
    const w = Math.min(parentDimensions.width, parentDimensions.height);
    return Math.ceil(w / (state || this.state).items);
  };

  onChange = src => {
    global.Tiles.src = src;
  };

  handleControlChange = obj => {
    const nextState = Object.assign({}, this.state, obj);
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
              active={this.state.active}
            />
          ) : null}
        </div>
        <div id="codeEditor">
          <CodeEditor onChange={this.onChange} src={this.state.src} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
