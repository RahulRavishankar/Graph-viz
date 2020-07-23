//Component visualize the algorithm.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';



class Buttons extends React.Component {
  handleSelect = (evt) => {
    this.props.gridSize(evt);
  }
  render() {
    return (
      <div className="centre">
        <ButtonToolbar>
          <button className="btn btn-default" onClick={this.props.startButton}>
            Start
        </button>
          <button className="btn btn-default" onClick={this.props.clear}>
            Clear
        </button>
          <button className="btn btn-default" onClick={this.props.placesource}>
            Place Source
        </button>
          <button className="btn btn-default" onClick={this.props.placedestination}>
            Place Destination
        </button>
          <button className="btn btn-default" onClick={this.props.placewalls}>
            Place Walls
        </button>
          <button className="btn btn-default" onClick={this.props.slow}>
            Slow
        </button>
          <button className="btn btn-default" onClick={this.props.fast}>
            Fast
        </button>
          <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <Dropdown.Item eventKey="1">20x10</Dropdown.Item>
            <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
            <Dropdown.Item eventKey="3">70x50</Dropdown.Item>

          </DropdownButton>

        </ButtonToolbar>

      </div>
    )
  }
}
class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);

  }
  render() {
    return (
      <div className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}>

      </div>
    )
  }
}


class Grid extends React.Component {
  render() {
    const width = (this.props.cols * 16) + 1;
    var rowsArr = [];
    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox} />

        )
      }
    }

    return (
      <div className="grid" style={{ width: width }}>
        {rowsArr}
      </div>
    )


  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }

  }
  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    })
  }
  clear = () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false)) //creates new empty grid
    this.setState({
      gridFull: grid
    })
  }
  slow = () => {
    this.speed = 1000;
    this.startButton();

  }
  fast = () => {
    this.speed = 100;
    this.startButton();
  }

  gridSize = (size) => {
    switch (size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;
      case "2":
        this.cols = 50;
        this.rows = 30;
        break;
      default:
        this.cols = 70;
        this.rows = 50;

    }
    this.clear();
  }

  componentDidMount() {
    this.clear();
  }

  startButton = () => {
    clearInterval(this.intervalId) //clears timer with setInterval method
    this.intervalId = setInterval(this.play, this.speed)
  }

  start = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);
    //logic for algo should be run here



    this.setState(
      {
        gridFull: g2
      }
    );
  }

  render() {
    return (
      <div>
        <h1> Nav bar</h1>
        <Buttons
          startButton={this.startButton}
          clear={this.clear}
          placesource={this.placesource}
          placedestination={this.placedestination}
          placewalls={this.placewalls}
          slow={this.slow}
          fast={this.fast}
          gridSize={this.gridSize}
        />

        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox} />

      </div>
    )
  }
}
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}
ReactDOM.render(<Main />, document.getElementById('root'))
