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

/** go down then across */
function cascadeAccross(e,c, shouldReflip){
    const nextHex = c || getRandomColour();
    if (shouldReflip || e.triggerCoords === this.coords){
        const bottomTile = this.neighbours['x,y+1'];
        const bottomPlusOne =  bottomTile && bottomTile.neighbours['x,y+1'];
        const bottomPlusTwo = bottomPlusOne && bottomPlusOne.neighbours['x,y+1']
        bottomTile && bottomTile.flipNext(e,nextHex);
        bottomPlusOne && bottomPlusOne.flipNext(e, nextHex)
        bottomPlusTwo && bottomPlusTwo.flipNext(e, nextHex, true)
    }
    return nextHex;
}


/** expanding box */
function expandingBox(e, c){
    const nextHex = c || getRandomColour()
    const flipNeighbours = (hex) =>
        Object.values(this.neighbours).forEach(n => {
            if(n && !e.includes(n)) n.flipNext(e, hex)
        });
    flipNeighbours(nextHex);
    return c || nextHex
}


/** basic ripple effect */
function basicRippleEffect(e, c, reFlipped){
  const nextHex = c || getRandomColour();
  Object.values(this.neighbours).forEach(n => {
    if(n && !e.includes(n)) n.flipNext(e, nextHex, reFlipped)
  });
  reFlipped = reFlipped ? reFlipped : [];
  !reFlipped.includes(this.coords) && e.delay(4, () => {
    Object.values(this.neighbours).forEach(
      n => {
        if (n && !reFlipped.includes(n.coords)) {
          reFlipped.push(n.coords);
          n.flipNext(e, 'black', reFlipped)
        }}
      );
    }
  );
  return nextHex
}

/** register your animation function */
Tiles.register(cascadeAccross)
`;

class Tiles {
  constructor() {
    this.elements = {};
    this.tileComponents = {};
    this.src = src;
  }

  set = data => {
    this.register = fn => {
      typeof fn == "function" && (data.function = fn);
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
