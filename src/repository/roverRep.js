const Rover = require("../model/rover");

class RoverRep {
  constructor() {
    this.roverList = [];
  }

  findAll() {
    return this.roverList.map(
      (i) => new Rover(i.id, i.positionX, i.positionY, i.direction)
    );
  }

  updateRoverPosition(rover) {
    let roverEntity = this.roverList.filter((oldRover) => rover.id == oldRover.id)[0];
    roverEntity.positionX = rover.positionX;
    roverEntity.positionY = rover.positionY;
    roverEntity.direction = rover.direction;
    return roverEntity;
  }

  findById(id) {
    let roverFiltered = this.roverList.filter((rover) => rover.id == id);
    return roverFiltered.length > 0
      ? roverFiltered.map(
          (i) => new Rover(i.id, i.positionX, i.positionY, i.direction)
        )[0]
      : null;
  }

  save(rover) {
    this.roverList.push(rover);
  }
}

module.exports = RoverRep;
