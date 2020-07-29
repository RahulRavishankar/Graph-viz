export default function DFS(grid,visited,visitedNodesInorder,startnode,endnode,path) {
	const ROWS = grid.length;
  const COLS = grid[0].length;
	
	var dir = [[1,0],[-1,0],[0,1],[0,-1]];
	var nextRow,nextCol;
	for(let i=0;i<4;++i) {
		nextRow=startnode[0]+dir[i][0];	nextCol=startnode[1]+dir[i][1];
		if(nextRow===endnode[0] && nextCol===endnode[1]) {
			console.log("Path found");
			return true;
		}
		if(nextRow>=0 && nextRow<ROWS && 
			nextCol>=0 && startnode[1]+dir[i][0]<COLS && 
			visited[nextRow][nextCol]===false && grid[nextRow][nextCol]===0) {

			visited[nextRow][nextCol]=true;
			visitedNodesInorder.push([nextRow,nextCol]);
			if(DFS(grid,visited,visitedNodesInorder,[nextRow,nextCol],endnode,path)) {
				path.push([nextRow,nextCol]);
				return true;
			}
		}
	}
	return false;
}
