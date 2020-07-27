// Performs BFS algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.



//const visitednodesinorder = [];
export function BFS(grid = [], startnode, finishnode) {

    const queue = [];
    const visitednodesinorder = [];
    //var shortestpathnodes = new Set();
    queue.push([startnode[0], startnode[1]]);
    //console.log(queue[0]);

    while (queue.length > 0) {
        let curr = queue.shift();
        //console.log(curr);
        if (finishnode[0] === curr[0] && finishnode[1] === curr[1]) {
            //visitednodesinorder.pop();
            //console.log()
            return visitednodesinorder//,calculatePath(finishnode)];

        }
        const neighbours = getAllNeighbours(grid, curr);
        //neighbour = [i,j]
        for (const neighbour of neighbours) {
            
            grid[neighbour[0]][neighbour[1]] = 4;
            //grid[neighbour[0]][neighbour[1]].previousnode = [curr[0], curr[1]];
            //shortestpathnodes.add(curr);
            
            visitednodesinorder.push(neighbour);
            
            queue.push(neighbour);

        }


    }
    //console.log("final", visitednodesinorder);
    return visitednodesinorder//, calculatePath(finishnode)];



}
function getAllNeighbours(grid = [], node) {
    const ROWS = grid.length;
    //console.log(ROWS);
    const COLS = grid[0].length;
    //console.log(COLS);
    const row = node[0];
    const col = node[1];
    //console.log(col);
    const neighbours = [];

    if ((row + 1 >= 0) && (row + 1 < ROWS) && (col >= 0) && (col < COLS) && (grid[row + 1][col] === 0 || grid[row + 1][col] === 3)) {
        neighbours.push([row + 1, col]);
    }
    if ((row - 1) >= 0 && row - 1 < ROWS && col >= 0 && col < COLS && (grid[row - 1][col] === 0 || grid[row - 1][col] === 3)) {
        neighbours.push([row - 1, col]);
    }
    if ((row) >= 0 && row < ROWS && col + 1 >= 0 && col + 1 < COLS && (grid[row][col + 1] === 0 || grid[row][col + 1] === 3)) {
        neighbours.push([row, col + 1]);
    }
    if ((row) >= 0 && row < ROWS && col - 1 >= 0 && col - 1 < COLS && (grid[row][col - 1] === 0 || grid[row][col - 1] === 3)) {
        neighbours.push([row, col - 1]);
    }
    //console.log(neighbours);
    return neighbours;

}

/*function calculatePath(finishnode)
{  const shortestpathnodes = [];
   let curr = finishnode;
    while(curr.previousnode !== [-1,-1])
    {
        shortestpathnodes.unshift(curr);
        curr = curr.previousnode;
    }
   return shortestpathnodes;
}*/



