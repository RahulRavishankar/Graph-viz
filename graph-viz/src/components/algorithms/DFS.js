import calculatePath from './CalculatePath';

export default function DFS(grid,visited,visitedNodesInorder,prev,srcRow,srcCol,dstRow,dstCol,path) {
	const ROWS = grid.length;
  const COLS = grid[0].length;
	
	var dir = [[1,0],[0,1],[-1,0],[0,-1]];
	var nextRow,nextCol;
	for(let i=0;i<4;++i) {
		nextRow=srcRow+dir[i][0];	nextCol=srcCol+dir[i][1];
		if(nextRow===dstRow && nextCol===dstCol) {
			console.log("Path found");
			prev[[nextRow,nextCol]]=[srcRow,srcCol];
			path=calculatePath([dstRow,dstCol],prev);
			return true;
		}
		if(nextRow>=0 && nextRow<ROWS && 
			nextCol>=0 && srcCol+dir[i][0]<COLS && 
			visited[nextRow][nextCol]===false && grid[nextRow][nextCol]===0) {

			visited[nextRow][nextCol]=true;
			visitedNodesInorder.push([nextRow,nextCol]);
			prev[[nextRow,nextCol]]=[srcRow,srcCol];
			if(DFS(grid,visited,visitedNodesInorder,prev,nextRow,nextCol,dstRow,dstCol,path)) {
				return true;
			}
		}
	}
	return false;
}
