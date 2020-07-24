import React from 'react';
import NavBar from './components/NavBar'
import Grid from './components/Grid'
import Label from './components/Label'

class Main extends React.Component {
    constructor() {
      super();
      this.speed = 100;
      this.rows = 30;
      this.cols = 50;
      this.start = {
				X:10,
				Y:22
			}
			this.end = {
				X:40,
				Y:8
			}
			this.createGrid = (rows, cols) => {
				var grid=new Array(rows);
				for(let i=0;i<rows;++i) {
					grid[i] = new Array(cols);
				}
	
				for(let i=0;i<rows;++i) {
					for(let j=0;j<cols;++j) {
						if(i===this.start.Y && j===this.start.X) {	//start cell
							grid[i][j]=2;
						}
						else if(i===this.end.Y && j===this.end.X) {	//end cell
							grid[i][j]=3;		
						}
						else {																			//empty cell
							grid[i][j]=0;
						}
					}
				}
				return grid;
			}
      this.state = {
				// gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
				grid: this.createGrid(this.rows,this.cols)
      }
  
		}
		
    selectBox = (row, col) => {
			let gridCopy = arrayClone(this.state.grid);
			// gridCopy[row][col] = !gridCopy[row][col];
			if(gridCopy[row][col]===0) {
				gridCopy[row][col]=1;
			}
			else if(gridCopy[row][col]===1) {
				gridCopy[row][col]=0;
			}
			else {
				console.log("Start/End cell selected");
				//TODO
			}

      this.setState({
        grid: gridCopy
			})
    }
    clear = () => {
			//var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false)) //creates new empty grid 
      this.setState({
        grid: this.createGrid(this.rows,this.cols)
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
  
    gridSize = (option) => {
      switch (option) {
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
			console.log("Start clicked")
      clearInterval(this.intervalId) //clears timer with setInterval method
      this.intervalId = setInterval(this.play, this.speed)
    }
  
    start = () => {
      let g = this.state.grid;
      let g2 = arrayClone(this.state.grid);
      //logic for algo should be run here
  
  
  
      this.setState({
          grid: g2
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
            grid={this.state.grid}
            rows={this.rows}
            cols={this.cols}
            selectBox={this.selectBox} 
					/>
					<Label />
        </div>
      )
    }
  }
  function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  export default Main;