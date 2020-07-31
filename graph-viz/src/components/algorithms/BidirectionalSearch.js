import calculatePath from './CalculatePath';
import getAllNeighbours from './getAllNeighbours';

export default function bidirectionalSearch(grid,startnode,finishnode)
{
    let intersectnode = [-1,-1];
    
    const squeue = [];
    const dqueue = [];

    const svisited = [];
    const dvisited = [];

    const sprev = {};
    const dprev = {};
    
    let srcvisitedmap = new Map();
    let dstvisitedmap = new Map();

    for(let i=0;i<grid.length;i++)
    {
        for(let j=0;j<grid[0].length;j++)
        {
            
            const a = [i,j];
            srcvisitedmap[a] = 1;
            dstvisitedmap[a] = 1;
            

        }
    }
    
    srcvisitedmap[startnode] = 2;
    dstvisitedmap[finishnode] = 2;

    grid[startnode[0]][startnode[1]] = 4;
    sprev[startnode] = [-1, -1];
    squeue.push(startnode);
    svisited.push(startnode);

    grid[finishnode[0]][finishnode[1]] = 4;
    dprev[finishnode] = [-1, -1];
    dqueue.push(finishnode);
    dvisited.push(finishnode);
    let spathnodes = [];
    let dpathnodes = [];
    let currsrc;
    let currdest;
    while(squeue.length > 0 && dqueue.length > 0)
    {
         currsrc = squeue.shift();
         currdest = dqueue.shift();

        const sneighbours = getAllNeighbours(grid, currsrc);
        const dneighbours = getAllNeighbours(grid, currdest);

        for (const sneighbour of sneighbours) {
            grid[sneighbour[0]][sneighbour[1]] = 4;
            sprev[sneighbour] = currsrc;
            svisited.push(sneighbour);
            squeue.push(sneighbour);
            srcvisitedmap[sneighbour] = 2;
        }
        
        for (const dneighbour of dneighbours) {
            grid[dneighbour[0]][dneighbour[1]] = 4;
            dprev[dneighbour] = currdest;
            dvisited.push(dneighbour);
            dqueue.push(dneighbour);
            dstvisitedmap[dneighbour] = 2;
        }

        intersectnode = isintersecting(srcvisitedmap,dstvisitedmap,grid);
        console.log(intersectnode);
        
        if(intersectnode[0] !== -1 && intersectnode[1] !== -1)
        {
            spathnodes = calculatePath(intersectnode,sprev);
            dpathnodes = calculatePath(intersectnode,dprev);
            return [svisited,dvisited,spathnodes,dpathnodes];
           
        }
        


    }
    spathnodes = calculatePath(currsrc, sprev);
    dpathnodes = calculatePath(currdest, dprev);
    return [svisited, dvisited, spathnodes, dpathnodes];


}

function isintersecting(srcvisitedmap,dstvisitedmap,grid)
{   
    for(let i=0;i<grid.length;i++)
    {
        for(let j=0;j<grid[0].length;j++)
        {
           const a = srcvisitedmap[[i,j]];
           const b = dstvisitedmap[[i,j]];
           if(a === 2 && b===2)
            {
                 return [i,j];
            }
        }
    }
    return [-1,-1];
}