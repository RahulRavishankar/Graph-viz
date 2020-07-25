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
      this.movingStart = false;
      this.movingEnd = false;
      this.creatingWalls = false;
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
				grid: this.createGrid(this.rows,this.cols)
      }
  
		}
		myOnMouseDown = (row, col) => {
      if(row===this.start.Y && col===this.start.X) {
        this.movingStart=true;
      }
      else if(row===this.end.Y && col===this.end.X) {
        this.movingEnd=true;
      }
      else {
        this.creatingWalls=true;
      }
    }
    myOnMouseEnter = (row, col) => {
      if(!this.movingStart && !this.movingEnd && !this.creatingWalls) {
        return;
      }
      else if(this.movingStart) {
        let gridCopy=arrayClone(this.state.grid);
        gridCopy[this.start.Y][this.start.X]=0;  //empty the start cell
        gridCopy[row][col]=2;                    //set the curr cell as start cell
        this.start.Y=row;
        this.start.X=col;
        this.setState({
          grid: gridCopy
        })
      }
      else if(this.movingEnd) {
        let gridCopy=arrayClone(this.state.grid);
        gridCopy[this.end.Y][this.end.X]=0;  //empty the end cell
        gridCopy[row][col]=3;
        this.end.Y=row;
        this.end.X=col;                // set the curr cell as end cell
        this.setState({
          grid: gridCopy
        })
      }
      else if(this.creatingWalls) {
        let gridCopy = arrayClone(this.state.grid);
        if(gridCopy[row][col]===0) {
          gridCopy[row][col]=1;
        }
        else if(gridCopy[row][col]===1) {
          gridCopy[row][col]=0;
        }
        else {
          console.log("Cannot turn start/end cell into a wall");
        }
        this.setState({
          grid: gridCopy
        })
      }
    }
    myOnMouseUp = () => {
      this.movingStart = false;
      this.movingEnd = false;
      this.creatingWalls = false;
    }
    myOnClick = (row, col) => {
			let gridCopy = arrayClone(this.state.grid);
			if(gridCopy[row][col]===0) {
				gridCopy[row][col]=1;
			}
			else if(gridCopy[row][col]===1) {
				gridCopy[row][col]=0;
			}
			else {
				console.log("Clicked on Start/End cell");
			}

      this.setState({
        grid: gridCopy
			})
    }
    clear = () => {
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
            slow={this.slow}
            fast={this.fast}
            gridSize={this.gridSize}
          />
  
          <Grid
            grid={this.state.grid}
            rows={this.rows}
            cols={this.cols}
            myOnClick={this.myOnClick}
            myOnMouseDown={this.myOnMouseDown} 
            myOnMouseEnter={this.myOnMouseEnter}
            myOnMouseUp={this.myOnMouseUp}
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