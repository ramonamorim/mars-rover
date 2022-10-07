const Rover = require("../model/rover");
const Constants = require("../utils/constants");

class RoverService {
  constructor(roverRep, plateauService) {
    this.roverRep = roverRep;
    this.plateauService = plateauService;
  }
  initializeRover(index, landingPositionX, landingPositionY, landingDirection) {
    this.isValidPosition(landingPositionX, landingPositionY);
    const rover = new Rover(
      index,
      landingPositionX,
      landingPositionY,
      landingDirection
    );
    this.roverRep.save(rover);
  }

  isValidPosition(positionX, positionY, index = null) {
    this.plateauService.isValidPosition(positionX, positionY);
    const roverList = this.roverRep.findAll();

    if (
      roverList.filter(
        (rover) =>
          rover.positionX == positionX &&
          rover.positionY == positionY &&
          rover.id != index
      ).length > 0
    ) {
      throw Constants.errors.errorInvalidRover.formatText(positionX, positionY);
    }
  }

  moveRover(instructions, index) {
    let rover = this.roverRep.findById(index);

    instructions.forEach((instruction) => {
      if (Constants.instruction.directionInstructions.includes(instruction)) {
        rover.direction = Constants.instruction[rover.direction][instruction];
      } else {
        let { positionX, positionY, direction, id } = rover;

        switch (direction) {
          case Constants.direction.NORTH:
            positionY += 1;
            break;
          case Constants.direction.SOUTH:
            positionY -= 1;
            break;
          case Constants.direction.WEST:
            positionX -= 1;
            break;
          case Constants.direction.EAST:
            positionX += 1;
            break;
        }
        this.isValidPosition(positionX, positionY, id);
        rover.positionX = positionX;
        rover.positionY = positionY;
      }
    });
    return this.roverRep.updateRoverPosition(rover);
  }

  listRovers() {
    return this.roverRep.findAll();
  }

  findById(id) {
    return this.roverRep.findById(id);
  }
}

module.exports = RoverService;
