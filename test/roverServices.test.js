const PlateauService = require("../src/service/plateauService");
const PlateauRep = require("../src/repository/plateauRep");
const Plateau = require("../src/model/plateau");
const Constants = require("../src/utils/constants");
const Rover = require("../src/model/rover");
const RoverService = require("../src/service/roverService");
const RoverRep = require("../src/repository/roverRep");

let roverService;

beforeEach(() => {
  let plateauService = new PlateauService(new PlateauRep());
  plateauService.save(new Plateau(10, 10));

  roverService = new RoverService(new RoverRep(), plateauService);
});

test("save rover test success", () => {
  roverService.initializeRover(0, 1, 1, "N");
  roverService.initializeRover(1, 0, 0, "n");

  expect(roverService.findById(0)).not.toBeNull();
  expect(roverService.findById(0).toString()).toBe("1 1 N");
  expect(roverService.findById(0).displayRoverAttributes()).toBe("Rover 0: 1 1 N");
  expect(roverService.findById(1).toString()).toBe("0 0 N");
  expect(roverService.findById(1).displayRoverAttributes()).toBe("Rover 1: 0 0 N");
  expect(roverService.listRovers().length).toBe(2);
});

test("invalid position for Rover initialize - isValidPosition", () => {
  roverService.initializeRover(0, 1, 1, "N");
  expect(() => roverService.initializeRover(0, 1, 1, "N")).toThrow(
    Constants.errors.errorInvalidRover.formatText(1, 1)
  );
});

test("test Rover movement - moveRover", () => {
  roverService.initializeRover(0, 1, 2, "N");
  expect(roverService.moveRover(Array.from("LMLMLMLMM"), 0)).toEqual({
    id: 0,
    positionX: 1,
    positionY: 3,
    direction: "N",
  });

  roverService.initializeRover(1, 3, 3, "E");
  expect(roverService.moveRover(Array.from("MRRMMRMRRM"), 1)).toEqual({
    id: 1,
    positionX: 2,
    positionY: 3,
    direction: "S",
  });
});

test("test Rover movement collisions - moveRover", () => {
  roverService.initializeRover(0, 1, 1, "N");
  roverService.initializeRover(1, 1, 5, "N");

  expect(() => roverService.moveRover(Array.from("MMMMM"), 0)).toThrow(
    Constants.errors.errorInvalidRover.formatText(1, 5)
  );

  expect(() => roverService.moveRover(Array.from("LMMM"), 0)).toThrow(
    Constants.errors.errorInvalidRoverPosition.formatText(-1, 1)
  );

});
