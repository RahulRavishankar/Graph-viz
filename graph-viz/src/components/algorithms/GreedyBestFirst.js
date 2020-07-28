import PriorityQueue from './PriorityQueue';
import calculatePath from './CalculatePath';

function dist(row, col, end) 
{ 
	// Return using the distance formula 
    return Math.sqrt ((row-end[0])*(row-end[0]) 
                    + (col-end[1])*(col-end[1])); 
}

function GreedyBestFirst(grid,startnode,endnode) {
    var rows=grid.length;
    var cols=grid[0].length;

    const visitedNodesInorder = [];
    var visited = new Array(rows);
    for(let i=0;i<rows;++i) {
        visited[i]=new Array(cols).fill(false);
    }
    
    var pq=new PriorityQueue();
    const prev = new Map();

    pq.enqueue(startnode,0);
    visited[startnode[0]][startnode[1]]=true;
    prev[startnode] = [-1,-1];

    var dir=[[0,1],[1,0],[0,-1],[-1,0]];
    var curr,row,col,nextRow,nextCol;
    while(pq.items.length>0) {
        curr=pq.dequeue();
        visitedNodesInorder.push(curr.element);
        row=curr.element[0];
        col=curr.element[1];
        if(row===endnode[0] && col===endnode[1]){
            console.log("Path found");
            return [visitedNodesInorder,calculatePath(endnode,prev)];
        }
        for(let i=0;i<4;++i) {
            nextRow=row+dir[i][0]; nextCol=col+dir[i][1];
            if(nextRow>=0 && nextRow<rows && nextCol>=0 && nextCol<cols && 
            visited[nextRow][nextCol]===false && grid[nextRow][nextCol]===0) {
                visited[nextRow][nextCol]=true;
                
                pq.enqueue([nextRow,nextCol],dist(nextRow,nextCol,endnode));
                prev[[nextRow,nextCol]]=curr.element;
                if(nextRow===endnode[0] && nextCol===endnode[1]){
                    console.log("Path found");
                    return [visitedNodesInorder,calculatePath(endnode,prev)];
                }
            }
        }
    }
    return [visitedNodesInorder,[startnode,endnode]];
}

export default GreedyBestFirst;