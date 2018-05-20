"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Version_1 = require("../cmd/Version");
function run(argv) {
    const version = new Version_1.Version();
    version.run(argv);
}
exports.run = run;
