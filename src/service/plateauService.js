const Plateau = require("../model/plateau");
const Constants = require("../utils/constants");

class PlateauService {
  constructor(plateauRep) {
    this.plateauRep = plateauRep;
  }

  save(plateau) {
    this.plateauRep.save(plateau);
  }

  isValidPosition(positionX, positionY) {
    const plateau = this.plateauRep.get();
    if (
      positionX < 0 ||
      positionY < 0 ||
      positionX > plateau.sizeX ||
      positionY > plateau.sizeY
    ) {
      throw Constants.errors.errorInvalidRoverPosition.formatText(
        positionX,
        positionY
      );
    }
    return true;
  }
  get() {
    return this.plateauRep.get();
  }
}

module.exports = PlateauService;
