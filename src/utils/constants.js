const StringUtils = require("./stringUtils");

module.exports = {
  message: {
    initializePlateau:
      "Please insert the cordinates of the plateau separated by space: ",
    numberOfRovers: "Please inform the number of rovers to launch: ",

    roverPosition:
      "Inform the landing position of the rover separeted by space : {}",
    roverConfirmation: "Launched rover : {}",
    roverInstructions: "Inform the instruction to move the rover: ",
    menu: "Options: \n 1 - move a rover \n 2 - List rovers location \n 3 - Quit",
    selectRoverTomove: "Select the rover to move",
  },
  errors: {
    readLineError: "Oh no! Something went wrong, please verify your data input",
    errorInitPlateau: "invalid input for create plateau",
    errorInput: "Invalid input please verify",
    errorInvalidRoverPosition:
      "Invalid position, is not valid for the plateau: {} {}",
    errorInvalidRover: "Already exist a rover in this position: {} {}",
    errorInvalidDiretionOrPosition:
      "Invalid landing position, check the cordinates, the direction and try again",
    errorInvalidConstants: "Invalid instructions",
    errorInvalidMenuOption: "Invalid menu option, please try again",
    errorRoverNotFound: "Rover not found",
  },
  direction: {
    NORTH: "N",
    SOUTH: "S",
    WEST: "W",
    EAST: "E",
    list: ["N", "S", "W", "E"],
  },
  instruction: {
    left: "L",
    right: "R",
    move: "M",
    N: { L: "W", R: "E" },
    S: { L: "E", R: "W" },
    W: { L: "S", R: "N" },
    E: { L: "N", R: "S" },
    directionInstructions: ["L", "R"],
    validInstructions: ["L", "R", "M"],
  },
  menu: {
    move: "1",
    list: "2",
    quit: "3",
    listOptions: ["1", "2", "3"],
  },
};
