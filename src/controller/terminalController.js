const Plateau = require("../model/plateau");
const Constants = require("../utils/constants");

class TerminalController {
  constructor(console, plateauService, roverService) {
    this.plateauService = plateauService;
    this.console = console;
    this.roverService = roverService;
  }
  async printl(text) {
    this.console.write(text);
  }
  async initialize() {
    await this.initializePlateau();
    await this.initializeListRover();
  }

  async initializePlateau() {
    try {
      const [positionX, positionY] = await this.console.read(
        Constants.message.initializePlateau,
        " "
      );

      if (
        isNaN(positionX) ||
        isNaN(positionY) ||
        Number(positionX) < 0 ||
        Number(positionY) < 0
      ) {
        throw Constants.errors.errorInitPlateau;
      }

      const plateau = new Plateau(Number(positionX), Number(positionY));
      this.plateauService.save(plateau);
    } catch (error) {
      this.printl(Constants.errors.errorInitPlateau);
      await this.initializePlateau();
    }
  }

  async initializeListRover() {
    try {
      let numberOfRovers = await this.console.read(
        Constants.message.numberOfRovers
      );

      if (isNaN(numberOfRovers) || Number(numberOfRovers) < 1) {
        throw Constants.errors.errorInput;
      }
      numberOfRovers = Number(numberOfRovers);

      for (let element of Array(numberOfRovers).keys()) {
        await this.initializeRover(element);
      }
    } catch (error) {
      this.printl(Constants.errors.errorInput);
      await this.initializeListRover();
    }
  }

  async initializeRover(index) {
    try {
      const [positionX, positionY, direction] = await this.console.read(
        Constants.message.roverPosition.formatText(index),
        " "
      );
      if (
        isNaN(positionX) ||
        isNaN(positionY) ||
        Number(positionX) < 0 ||
        Number(positionY) < 0 ||
        Constants.direction.list.includes(direction) == false
      ) {
        throw Constants.errors.errorInvalidDiretionOrPosition;
      }
      this.roverService.initializeRover(
        index,
        Number(positionX),
        Number(positionY),
        direction
      );
      this.printl(Constants.message.roverConfirmation.formatText(index));
      await this.insertInstructions(index);
    } catch (error) {
      this.printl(error);
      await this.initializeRover(index);
    }
  }

  async insertInstructions(index) {
    try {
      const instructions = await this.console.read(
        Constants.message.roverInstructions
      );
      if (
        instructions == undefined ||
        Array.from(instructions).filter(
          (i) => Constants.instruction.validInstructions.includes(i) == false
        ).length > 0
      ) {
        throw Constants.errors.errorInvalidConstants;
      }
      let actualPosition = this.roverService.moveRover(
        Array.from(instructions),
        index
      );
      this.printl(actualPosition.toString());
    } catch (error) {
      this.printl(error);
      await this.insertInstructions(index);
    }
  }

  async menu() {
    try {
      let optionMenu = await this.console.read(Constants.message.menu);
      if (Constants.menu.listOptions.includes(optionMenu) == false) {
        throw Constants.errors.errorInvalidMenuOption;
      }

      switch (optionMenu) {
        case Constants.menu.move:
          await this.movementValidateInstructions();
          break;
        case Constants.menu.list:
          this.displayRovers();
          break;
        case Constants.menu.quit:
          process.exit(0);
      }
    } catch (error) {
      console.log(error);
      this.printl(error);
    }
    await this.menu();
  }

  async movementValidateInstructions() {
    let index = await this.console.read(Constants.message.selectRoverTomove);
    index = Number(index);
    const rover = this.roverService.findById(index);
    if (rover == null) {
      throw Constants.errors.errorRoverNotFound;
    }
    await this.insertInstructions(index);
  }

  displayRovers() {
    let rovers = this.roverService.listRovers();
    rovers.forEach((rover) => {
      this.printl(rover.displayRoverAttributes());
    });
  }
}

module.exports = TerminalController;
