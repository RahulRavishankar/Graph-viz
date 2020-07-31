import calculatePath from './CalculatePath';
import getAllNeighbours from './getAllNeighbours';
import PriorityQueue from './PriorityQueue';

export default function DJIKSTRA(grid,startnode,finishnode)
{
    const visitednodesinorder = [];
    const distance = {};
    for(let i=0;i<grid.length;i++)
    {
        for(let j=0;j<grid[0].length;j++)
        {
            
           distance[[i,j]] = Infinity;
        }
    }
    distance[startnode] = 0;

  
    var pq = new PriorityQueue();
    pq.enqueue(startnode, 0);
    const prev = new Map();
    prev[startnode] = [-1, -1];
    let currNode;
    
    while(pq.items.length > 0)
    {
        let minNode = pq.dequeue();
        currNode = minNode.element;
        let weight = minNode.priority;
        
        
        
        const neighbours = getAllNeighbours(grid, currNode);
        for (const neighbour of neighbours) {
            if(weight + 1 < distance[neighbour])
            {
                
                
                distance[neighbour] = weight + 1;
                prev[neighbour] = currNode;
                pq.enqueue(neighbour, distance[neighbour]);
                grid[neighbour[0]][neighbour[1]] = 4;
                visitednodesinorder.push(neighbour);
                if (neighbour[0] === finishnode[0] && neighbour[1] === finishnode[1]) {

                    return [visitednodesinorder, calculatePath(finishnode, prev)];
                }
                
            }
            
            
           
            }    
    }
    return [visitednodesinorder, calculatePath(currNode, prev)];

}





