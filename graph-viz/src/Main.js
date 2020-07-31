import React from 'react';
import NavBar from './components/NavBar'
import Grid from './components/Grid'
import Label from './components/Label'
import BFS from './components/algorithms/BFS'
import DFS from './components/algorithms/DFS'
import DJIKSTRA from './components/algorithms/DJIKSTRA'
import AStar from './components/algorithms/AStar';
import GreedyBestFirst from './components/algorithms/GreedyBestFirst';
import bidirectionalSearch from './components/algorithms/BidirectionalSearch';

class Main extends React.Component {
  constructor() {
    super();
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
    this.AlgorithmName = "Visualizer for Path Finding Algorithms";
    this.pathLength = -1;
    //this.title = "";
    
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
    if(this.runningAlgorithm===true) {
      alert("Please wait, "+this.AlgorithmName+" is running!\n");
      return;
    }
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
    this.clearVisited();
    this.AlgorithmName = "Visualizer for Path Finding Algorithms";
    this.setState({
      AlgorithmName: "Visualizer for Path Finding Algorithms",
      grid: this.createGrid(this.rows,this.cols)
      
      
    })
  }
  clearVisited = () => {
    let gridCopy=arrayClone(this.state.grid);
    for(let row=0;row<this.rows;++row){
      for(let col=0;col<this.cols;++col) {
        if(this.state.grid[row][col]===0) {
          document.getElementById(`${row}_${col}`).className = 'box empty';
        }
      }
    }
    document.getElementById(`${this.start.Y}_${this.start.X}`).className = 'box start';
    document.getElementById(`${this.end.Y}_${this.end.X}`).className = 'box end';
    this.setState({
      grid:gridCopy
    })
  }

  setAlgorithm = (algorithmName) => {
    this.AlgorithmName = algorithmName;
    this.setState({
      AlgorithmName : algorithmName
    })
    console.log("Algorithm set to "+this.AlgorithmName);
  }
  setFalse = () => {
    console.log("Setting back to false");
    this.runningAlgorithm = false;
  }
  animate(visitedNodesInOrder, nodesInShortestPathOrder,set) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10* i);
        setTimeout(() => { set(); },10*(visitedNodesInOrder.length+nodesInShortestPathOrder.length));
        
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
      }, 10* i);
    }
    document.getElementById(`${this.start.Y}_${this.start.X}`).className = 'box start';
    document.getElementById(`${this.end.Y}_${this.end.X}`).className = 'box end';
    
  }

  startButton = () => {
    console.log("Start clicked")
    if(this.runningAlgorithm === true) {
      alert("Please wait, "+this.AlgorithmName+" is running!");
      return;
    }
    this.clearVisited();

    if(this.AlgorithmName==="BFS") {
      console.log("Running BFS");
      this.runningAlgorithm = true;
      this.visualizeBFS();
    }
    else if(this.AlgorithmName==="DFS") {
      console.log("Running DFS");
      this.runningAlgorithm = true;
      this.visualizeDFS();
    }
    else if(this.AlgorithmName==="A*") {
      console.log("Running A*");
      this.runningAlgorithm = true;
      this.visualizeAStar();
    }
    else if(this.AlgorithmName==="Djikstra's") {
      console.log("Running Djikstra's");
      this.runningAlgorithm = true;
      this.visualizeDjikstra();
    }
    else if(this.AlgorithmName==="Bidirectional Search") {
      console.log("Running Bidirectional Search");
      this.runningAlgorithm = true;
      this.visualizeBidirectionalSearch();

    }
    else if(this.AlgorithmName==="Greedy Best First Search") {
      console.log("Running Greedy Best first Search");
      this.runningAlgorithm = true;
      this.visualizeGreedyBestFirst();
    }
    else {
      console.log("Algorithm to be selected.")
    }
  }

  visualizeBFS = () => {
    const grid = this.state.grid;
    const startnode = [this.start.Y,this.start.X];
    const finishnode = [this.end.Y,this.end.X];
    var visitednodesinorder,nodesinshortestpath;

    [visitednodesinorder,nodesinshortestpath] = BFS(grid,startnode,finishnode);
    document.getElementById(`${nodesinshortestpath[0][0]}_${nodesinshortestpath[0][1]}`).className = 'box start';
    
    
    nodesinshortestpath.shift();
    nodesinshortestpath.pop();
    
    this.animate(visitednodesinorder,nodesinshortestpath,this.setFalse);
    
    
  }
  visualizeDFS = () => {
    var grid=this.state.grid;
    var visitedNodesInOrder = [];
    var visited=new Array(this.rows);
    for(let i=0;i<this.rows;++i)  {
      visited[i]=new Array(this.cols);
      for(let j=0;j<this.cols;++j) {
        visited[i][j]=false;
      }
    }
    visited[this.start.Y][this.start.X]=true;
    var path = [];
    var prev = new Map();
    prev[[this.start.Y,this.start.X]] = [-1,-1];
    const startnode = [this.start.Y,this.start.X];
    const endnode = [this.end.Y,this.end.X]
    if(DFS(grid,visited,visitedNodesInOrder,startnode,endnode,path)) {
      path.reverse();
      this.animate(visitedNodesInOrder,path,this.setFalse);
      this.pathLength=path.length;
    }
  }
  visualizeDjikstra = () =>{
     const grid = this.state.grid;
     const startnode = [this.start.Y,this.start.X];
     const finishnode = [this.end.Y,this.end.X];
     var visitednodesinorder, nodesinshortestpath;
    
    [visitednodesinorder, nodesinshortestpath] = DJIKSTRA(grid, startnode, finishnode);
    
    nodesinshortestpath.shift();
    nodesinshortestpath.pop();
    
    
    this.animate(visitednodesinorder, nodesinshortestpath,this.setFalse);
    
  }
  visualizeAStar = () => {
    const grid = this.state.grid;
    const startnode = [this.start.Y,this.start.X];
    const endnode = [this.end.Y,this.end.X];
    var visitedNodesInorder, path;

    [visitedNodesInorder , path] = AStar(grid,startnode,endnode);
    path.shift();
    path.pop();
    visitedNodesInorder.shift();
    this.animate(visitedNodesInorder,path,this.setFalse);
    this.pathLength=path.length;
  }
  visualizeGreedyBestFirst = () => {
    const grid = this.state.grid;
    const startnode = [this.start.Y,this.start.X];
    const endnode = [this.end.Y,this.end.X];
    var visitedNodesInorder,path;

    [visitedNodesInorder , path] = GreedyBestFirst(grid,startnode,endnode);
    visitedNodesInorder.shift();
    path.shift();
    path.pop();
    this.animate(visitedNodesInorder,path,this.setFalse);
    this.pathLength=path.length;
  }
  
  visualizeBidirectionalSearch = () => {
    const grid = this.state.grid;
    const startnode = [this.start.Y, this.start.X];
    const finishnode = [this.end.Y, this.end.X];
    const [source_visited, dest_visited,sPathNodes,dPathNodes] = bidirectionalSearch(grid, startnode,finishnode);

    this.animate(source_visited, sPathNodes,this.setFalse);
    this.animate(dest_visited, dPathNodes,this.setFalse);
    sPathNodes.shift();
    dPathNodes.shift();
    

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
