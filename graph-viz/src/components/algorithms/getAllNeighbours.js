export default function getAllNeighbours(grid = [], node) {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const row = node[0];
    const col = node[1];
    const neighbours = [];
    if ((row + 1 >= 0) && (row + 1 < ROWS) && (col >= 0) && (col < COLS) && (grid[row + 1][col]!== 1 && grid[row + 1][col] !== 4)) {
        neighbours.push([row + 1, col]);
    }
    if ((row - 1) >= 0 && row - 1 < ROWS && col >= 0 && col < COLS && (grid[row - 1][col] !== 1 && grid[row - 1][col] !== 4)) {
        neighbours.push([row - 1, col]);
    }
    if ((row) >= 0 && row < ROWS && col + 1 >= 0 && col + 1 < COLS && (grid[row][col+1] !== 1 && grid[row][col+1] !== 4)) {
        neighbours.push([row, col + 1]);
    }
    if ((row) >= 0 && row < ROWS && col - 1 >= 0 && col - 1 < COLS && (grid[row][col-1] !== 1 && grid[row][col-1] !== 4)) {
        neighbours.push([row, col - 1]);
    }
    return neighbours;

}