import calculatePath from './CalculatePath';
import getAllNeighbours from './getAllNeighbours';

// Performs BFS algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.




function BFS(grid = [], startnode, finishnode) {

    const queue = [];
    const visitednodesinorder = [];
    const prev = new Map();
    prev[startnode] = [-1,-1];
    let curr = startnode;
    queue.push(startnode);
    

    while (queue.length > 0) {
        let curr = queue.shift();
        if (finishnode[0] === curr[0] && finishnode[1] === curr[1]) {
            
            return [visitednodesinorder,calculatePath(finishnode,prev)];

        }
        const neighbours = getAllNeighbours(grid, curr);
        for (const neighbour of neighbours) {
            
            grid[neighbour[0]][neighbour[1]] = 4;
           
            prev[neighbour] = curr;
            
            
            visitednodesinorder.push(neighbour);
            
            queue.push(neighbour);

        }


    }
    
    return [visitednodesinorder, calculatePath(curr,prev)];



}
export default BFS;