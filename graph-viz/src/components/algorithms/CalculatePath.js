export default function calculatePath(finishnode,prev)
{  const shortestpathnodes = [];
   let curr = finishnode;
   while(curr[0] !== -1 && curr[1] !== -1)
    {
        shortestpathnodes.unshift(curr);
        curr = prev[curr];
    }
   return shortestpathnodes;
}