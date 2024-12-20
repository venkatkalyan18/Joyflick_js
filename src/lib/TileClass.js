class Tile {
  row;
  col;
  isCollapsed = false; // ? is set to true when an image is selected
  possibilities; // not used
  image = null; // image link
  imageNumber; // image number
  connectors;
  constructor(num) {
    this.possibilities = new Array(num + 1).fill(1); // add all the possibilities as true
    this.possibilities[0] = num; // total number of possibilities
  }
}

export default Tile;
