const Readline = require("readline");
const Constants = require("../utils/constants");

class ConsoleService {
  constructor() {
    this.interface = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  read(text, splitLine = null) {
    return new Promise((resolve, reject) => {
      this.interface.question(text.concat("\n"), (line) => {
        if (!line) {
          reject(Constants.errors.readLineError);
        }
        if (splitLine) {
          line = line.split(splitLine);
        }

        resolve(line);
      });
    });
  }
  write(text) {
    this.interface.write(text.concat(" \n"));
  }
}

module.exports = new ConsoleService();
