const Heap = require('heap');
const Grid = require('./grid');

function aStar(dimension, onBoard, attacker, defender) {
  const grid = new Grid(dimension, onBoard);

  const openList = new Heap(function(nodeA, nodeB) {
    return nodeA.f - nodeB.f;
  })

  const startX = attacker.locationX;
  const startY = attacker.locationY;
  const endX = defender.locationX;
  const endY = defender.locationY;

  const startNode = grid.getNodeAt(startX, startY);
  let endNode = grid.getNodeAt(endX, endY);
  const heuristic = (dx, dy) => (dx + dy);
  grid.setWalkableAt(endX, endY);

  startNode.g = 0;
  startNode.f = 0;

  openList.push(startNode);
  startNode.opened = true;
  while (!openList.empty()) {
    const node = openList.pop();
    node.closed = true;
    if (node === endNode) {
      const path = [[node.x, node.y]];
      while (endNode.parent) {
        endNode = endNode.parent;
        path.push([endNode.x, endNode.y]);
      }
      return path;
    }
    const neighbors = grid.getNeighbors(node);
    for (let i = 0; i < neighbors.length; i += 1) {
      const neighbor = neighbors[i];
      if (neighbor.closed) {
        continue;
      }
      const { x, y } = neighbor;
      const newNeighborG = node.g + 1;
      if (!neighbor.opened || newNeighborG < neighbor.g) {
        neighbor.g = newNeighborG;
        neighbor.h = neighbor.h || heuristic(Math.abs(x - endX), Math.abs(y - endY));
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = node;
        if (!neighbor.opened) {
          openList.push(neighbor);
          neighbor.opened = true;
        } else {
          openList.updateItem(neighbor);
        }
      }
    }
  }
  return [];
}

export default aStar;
