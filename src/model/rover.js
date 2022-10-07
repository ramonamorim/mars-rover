class Rover {
  constructor(id, positionX, positionY, direction) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.direction = direction;
  }
  toString() {
    return "{} {} {}".formatText(
      this.positionX,
      this.positionY,
      this.direction
    );
  }

  displayRoverAttributes() {
    return "Rover {}: {} {} {}".formatText(
      this.id,
      this.positionX,
      this.positionY,
      this.direction
    );
  }
}

module.exports = Rover;
