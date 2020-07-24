//Component visualize the algorithm.
import React from 'react';
import '../css/grid.css';

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
    const width = (this.props.cols * 19 +4); //cols * width of each box - 1 + (2*borderwidth)
    var rowsArr = [];
    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        // boxClass = this.props.grid[i][j] ? "box on" : "box off";
        boxClass = Class(this.props.grid,i,j);
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j} //should add isvisited prop
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

const Class = (grid,row,col) => {
    if(grid[row][col]===0) {
      return "box empty";
    }
    else if(grid[row][col]===1) {
      return "box wall";
    }
    else if(grid[row][col]===2) {
      return "box start";
    }
    else {
      return "box end";
    }
}

export default Grid;
