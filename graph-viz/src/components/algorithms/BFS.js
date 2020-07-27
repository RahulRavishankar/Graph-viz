import calculatePath from './CalculatePath';

// Performs BFS algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.



//const visitednodesinorder = [];
export function BFS(grid = [], startnode, finishnode) {

    const queue = [];
    const visitednodesinorder = [];
    const prev = new Map();
    prev[startnode] = [-1,-1];
    let curr = startnode;
    queue.push(startnode);
    //console.log(startnode);

    while (queue.length > 0) {
        let curr = queue.shift();
        if (finishnode[0] === curr[0] && finishnode[1] === curr[1]) {
            
            return [visitednodesinorder,calculatePath(finishnode,prev)];

        }
        const neighbours = getAllNeighbours(grid, curr);
        for (const neighbour of neighbours) {
            
            grid[neighbour[0]][neighbour[1]] = 4;
            //prev[[neighbour[0],neighbour[1]]] = c;
            prev[neighbour] = curr;
            //console.log(prev[neighbour]);
            //shortestpathnodes.add(curr);
            
            visitednodesinorder.push(neighbour);
            
            queue.push(neighbour);

        }


    }
    console.log("this case");
    return [visitednodesinorder, calculatePath(curr,prev)];



}
function getAllNeighbours(grid = [], node) {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const row = node[0];
    const col = node[1];
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