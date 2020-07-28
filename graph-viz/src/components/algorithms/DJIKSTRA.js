import calculatePath from './CalculatePath';
import getAllNeighbours from './getAllNeighbours';

export default function DJIKSTRA(grid, startnode, finishnode) {
    const visitednodesinorder = [];
    const distance = new Map();
    const prev = new Map();
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            distance.set([i, j], Number.MAX_VALUE);
        }
    }
    distance[startnode] = 0;
    while (size(distance) > 0) {
        sort(distance); //function to sort distance map by value
        const closestnode = distance.keys().next().value;
        if (distance[closestnode] === Number.MAX_VALUE) {
            return [visitednodesinorder, calculatePath(closestnode)];
        }
        grid[closestnode[0]][closestnode[1]] = 4;
        visitednodesinorder.push(closestnode);
        if (closestnode[0] === finishnode[0] && closestnode[1] === finishnode[1]) {
            return [visitednodesinorder, calculatePath(closestnode)];
        }
        updateunvisitedneighbours(closestnode, grid, prev, distance);
    }

}

function updateunvisitedneighbours(closestnode, grid, prev, distance) {
    const neighbours = getAllNeighbours(grid, closestnode);
    for (const neighbour of neighbours) {
        distance[neighbour] = distance[closestnode] + 1;
        prev[neighbour] = closestnode;
    }
}

function size(distance) {
    var len = 0;
    for (var count in distance) {
        len++;
    }

    return len;
}
function sort(distance) {
    distance[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    }
}

