import React from 'react';
import NavBar from './components/NavBar'
import Grid from './components/Grid'

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
          <NavBar
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

  export default Main;