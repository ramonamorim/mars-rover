const TerminalController = require("./controller/terminalController");
const ConsoleService = require("./service/consoleService");
const PlateauRep = require("./repository/plateauRep");
const PlateauService = require("./service/plateauService");
const RoverRep = require("./repository/roverRep");
const RoverService = require("./service/roverService");

const plateauService = new PlateauService(new PlateauRep());
const roverService = new RoverService(new RoverRep(), plateauService);
const terminalController = new TerminalController(
  ConsoleService,
  plateauService,
  roverService
);

async function main() {
  await terminalController.initialize();
  await terminalController.menu();
}

main();
