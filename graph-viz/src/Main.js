import React from 'react';
import NavBar from './components/NavBar'
import Grid from './components/Grid'
import Label from './components/Label'
import {BFS} from './components/algorithms/BFS'

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
      this.runningAlgorithm = false;
      this.AlgorithmName = "Visualizer for Path Finding Algorithms ";
      this.pathLength = -1;
      
			this.createGrid = (rows, cols) => {
       
        
        var grid = new Array(rows);
        for (let i = 0; i < rows; ++i) {
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
      
      this.AlgorithmName = "Visualizer for Path Finding Algorithms";
      console.log(this.AlgorithmName);
      this.setState({
        grid: this.createGrid(this.rows,this.cols),
        AlgorithmName: this.AlgorithmName
      })
    }
    clearVisited = () => {
      let gridCopy=arrayClone(this.state.grid);
      for(let row=0;row<this.rows;++row){
        for(let col=0;col<this.cols;++col) {
          if(this.state.grid[row][col]===4 || this.state.grid[row][col]===5) {
            gridCopy[row][col]=0;
          }
        }
      }
      this.setState({
        grid:gridCopy
      })
    }
    slow = () => {
      this.speed = 1000;
    }
    fast = () => {
      this.speed = 100;
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
    
    setAlgorithm = (algorithmName) => {
      this.AlgorithmName = algorithmName;
      this.setState({
        AlgorithmName : algorithmName
      })
      console.log("Algorithm set to "+this.AlgorithmName);
    }
    startButton = () => {
      console.log("Start clicked")
      //clearInterval(this.intervalId) //clears timer with setInterval method
      //this.intervalId = setInterval(this.play, this.speed)

      if(this.AlgorithmName==="BFS") {
        console.log("Running BFS");
        this.runningAlgorithm=true;
        this.visualizeBFS();
      }
      else if(this.AlgorithmName==="DFS") {
        console.log("Running DFS");
        //this.runningAlgorithm = true;
        //this.visualizeDFS();
      }
      else if(this.AlgorithmName==="A*") {
        console.log("Running A*");
      }
      else if(this.AlgorithmName==="Djikstra's") {
        console.log("Running Djikstra's");
      }
      else {
        console.log("Invalid Algorithm selected.")
      }
    }

    visualizeBFS = () => {
      const grid = this.state.grid;
      const startnode = [this.start.Y,this.start.X];
      const finishnode = [this.end.Y,this.end.X];
      var visitednodesinorder,nodesinshortestpath;
      [visitednodesinorder,nodesinshortestpath] = BFS(grid,startnode,finishnode);
      //console.log(nodesinshortestpath);
      //const nodesinshortestpath = calculatePath(finishnode);
      this.animateBFS(visitednodesinorder,nodesinshortestpath);

    }
  animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) { //have to write -> need visited nodes in order and nodes in shortest path order
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10* i);
        
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`${node[0]}_${node[1]}`).className =
          'box visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) { 
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`${node[0]}_${node[1]}`).className =
          'box path';
      }, 10 * i); //this.speed
    }
  }
  
    // BFS() {
    //   var q=[];
    //   this.clearVisited();
    
    //   q.push([this.start.Y,this.start.X]);
    //   var curr,col,row;  
    //   let count=0;
    //   while(q.length>0 && count<15)
    //   {
    //     let gridCopy=arrayClone(this.state.grid);
    //     curr = q.shift();
    //     row=curr[0]; col=curr[1];
    //     if(row===this.end.Y && col===this.end.X) {
    //       console.log("Path will be displayed soon!");
    //       //break;
    //     }
    //     if(col-1>=0 && (this.state.grid[row][col-1]===0 || this.state.grid[row][col-1]===3)) {    //if node is not visited or is end cell
    //       q.push([row,col-1]);
    //       gridCopy[row][col-1]=4;     //mark the node as added to the queue
    //     }
    //     if(row-1>=0 && (this.state.grid[row-1][col]===0 || this.state.grid[row-1][col]===3)) {
    //       q.push([row-1,col]);
    //       gridCopy[row-1][col]=4;
    //     }
    //     if(col+1<this.cols && (this.state.grid[row][col+1]===0 || this.state.grid[row][col+1]===3)) {
    //       q.push([row,col+1]);
    //       gridCopy[row][col+1]=4;
    //     }
    //     if(row+1<this.rows && (this.state.grid[row+1][col]===0 || this.state.grid[row+1][col]===3)) {
    //       q.push([row+1,col]);  
    //       gridCopy[row+1][col]=4;
    //     }
    //     if(row!==this.start.Y && col!==this.start.X){     //if not start or end node
    //       gridCopy[row][col]=5;                         //mark the curr node as visited
    //     }
    //     //console.log(q.length);
    //     this.setState({
    //       grid: gridCopy
    //     });
        
    //     ++count;
    //   } //end of while
    //   console.log(q);
    //   console.log("BFS complete");
    // }


    render() {
      return (
        <div>
          <NavBar
            startButton={this.startButton}
            clear={this.clear}
            slow={this.slow}
            fast={this.fast}
            gridSize={this.gridSize}
            setAlgorithm={this.setAlgorithm}
          />
          <h4 className="algo">{this.AlgorithmName}</h4>
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