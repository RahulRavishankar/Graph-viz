import calculatePath from './CalculatePath';
import getAllNeighbours from './getAllNeighbours';

export default function bidirectionalSearch(grid = [], startnode, finishnode) {
    
    
    const squeue = [];
    const dqueue = [];

    const svisited = [],
        dvisited = [];

    const sprev = [];
    const dprev = [];
    
    grid[startnode[0]][startnode[1]] = 4;
    sprev[startnode] = [-1,-1];
    squeue.push(startnode);
    svisited.push(startnode);

    grid[finishnode[0]][finishnode[1]] = 4;
    dprev[finishnode] = [-1, -1];
    dqueue.push(finishnode);
    dvisited.push(finishnode);

    while (squeue.length > 0 && dqueue.length > 0) {
        const currsn = squeue.shift();
        const currdn = dqueue.shift();

        const sneighbors = getAllNeighbours(grid, currsn);
        const dneighbors = getAllNeighbours2(grid, currdn);

        if (currdn[0] === currsn[0] && currdn[1] === currsn[1] )
        {   console.log(currdn);
            break;
        }

        for (const sneighbor of sneighbors) {
            if (grid[sneighbor[0]][sneighbor[1]] !== 4) {
                grid[sneighbor[0]][sneighbor[1]] = 4;
                sprev[sneighbor] = currsn;
                squeue.push(sneighbor);
                svisited.push(sneighbor);
            }
            else
            {
                break;
            }
        }

        for (const dneighbor of dneighbors) {
            if (grid[dneighbor[0]][dneighbor[1]] !== 4) {
                grid[dneighbor[0]][dneighbor[1]] = 4;
                dprev[dneighbor] = currdn;
                dqueue.push(dneighbor);
                dvisited.push(dneighbor);
            } 
            else
            {
                break;
            }
        }
    }

    const sourcePaths = [],
        destPaths = [];

    for (let i = 0; i < svisited.length; i++)
        sourcePaths.push(calculatePath(svisited[i],sprev));

    for (let i = 0; i < dvisited.length; i++)
        destPaths.push(calculatePath(dvisited[i],dprev));
    console.log(sourcePaths);
    console.log(destPaths);
    const sPathRow = [];
    const destPathRow = [];
    for (let i = sourcePaths.length - 1; i >= 0; i--) {
        const sPathRow = sourcePaths[i];
        const splast = sPathRow[sPathRow.length - 1];
        const neighbors = getAdjacents(grid, splast);
        for (const neighbor of neighbors) {
            for (let j = 0; j < destPaths.length; j++) {
                const destPathRow = destPaths[j];
                for(let k=0;k<destPathRow.length;k++)
                {
                    if(destPathRow[k][0] === neighbor[0] && destPathRow[k][1]===neighbor[1])
                    {
                        return [svisited, dvisited, sPathRow, destPathRow];
                    }
                }
                
            }
        }
    }
    return [svisited, dvisited, sPathRow, destPathRow];
}
function getAllNeighbours2(grid = [], node) {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const row = node[0];
    const col = node[1];
    const neighbours = [];
    if ((row - 1 >= 0) && (row - 1 < ROWS) && (col >= 0) && (col < COLS) && (grid[row - 1][col] !== 1 && grid[row - 1][col] !== 4)) {
        neighbours.push([row - 1, col]);
    }
    if ((row + 1) >= 0 && row + 1 < ROWS && col >= 0 && col < COLS && (grid[row + 1][col] !== 1 && grid[row + 1][col] !== 4)) {
        neighbours.push([row + 1, col]);
    }
    if ((row) >= 0 && row < ROWS && col - 1 >= 0 && col - 1 < COLS && (grid[row][col - 1] !== 1 && grid[row][col - 1] !== 4)) {
        neighbours.push([row, col - 1]);
    }
    if ((row) >= 0 && row < ROWS && col + 1 >= 0 && col + 1 < COLS && (grid[row][col + 1] !== 1 && grid[row][col + 1] !== 4)) {
        neighbours.push([row, col + 1]);
    }
    return neighbours;

}

function getAdjacents(grid = [], node) {
    const ROWS = grid.length;
    const COLS = grid[0].length;

   const row = node[0];
   const col = node[1];
   const neighbors = [];

    if (
        row + 1 >= 0 &&
        row + 1 < ROWS &&
        col >= 0 &&
        col < COLS &&
        grid[row + 1][col] !== 1
    ) {
        neighbors.push(grid[row + 1][col]);
    }
    if (
        row - 1 >= 0 &&
        row - 1 < ROWS &&
        col >= 0 &&
        col < COLS &&
        grid[row - 1][col] !== 1
    ) {
        neighbors.push(grid[row - 1][col]);
    }
    if (
        row >= 0 &&
        row < ROWS &&
        col - 1 >= 0 &&
        col - 1 < COLS &&
        grid[row][col - 1] !== 1
    ) {
        neighbors.push(grid[row][col - 1]);
    }
    if (
        row >= 0 &&
        row < ROWS &&
        col + 1 >= 0 &&
        col + 1 < COLS &&
        grid[row][col + 1] !== 1
    ) {
        neighbors.push(grid[row][col + 1]);
    }

    return neighbors;
}
    

    

    
        









