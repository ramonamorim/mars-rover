const PlateauService = require("../src/service/plateauService");
const PlateauRep = require("../src/repository/plateauRep");
const Plateau = require("../src/model/plateau");
const Constants = require("../src/utils/constants");

let plateauService;

beforeEach(() => {
  plateauService = new PlateauService(new PlateauRep());
});

test("save plateau test success", () => {
  plateauService.save(new Plateau(10, 10));

  expect(plateauService.get().sizeX).toBe(10);
  expect(plateauService.get().sizeY).toBe(10);
});

test("test valid position - isValidPlateau ", () => {

  plateauService.save(new Plateau(10, 10));

  expect(plateauService.isValidPosition(1, 1)).toBeTruthy();
  expect(plateauService.isValidPosition(9, 9)).toBeTruthy();
  expect(() => plateauService.isValidPosition(9, -1)).toThrow(
    Constants.errors.errorInvalidRoverPosition.formatText(9, -1)
  );
  expect(() => plateauService.isValidPosition(-9, 1)).toThrow(
    Constants.errors.errorInvalidRoverPosition.formatText(-9, 1)
  );
  expect(() => plateauService.isValidPosition(11, 11)).toThrow(
    Constants.errors.errorInvalidRoverPosition.formatText(11, 11)
  );
  expect(() => plateauService.isValidPosition(-2, -2)).toThrow(
    Constants.errors.errorInvalidRoverPosition.formatText(-2, -2)
  );
});
