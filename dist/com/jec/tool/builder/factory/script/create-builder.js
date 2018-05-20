"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateBuilder_1 = require("../cmd/CreateBuilder");
function run(argv) {
    const createBuilder = new CreateBuilder_1.CreateBuilder();
    createBuilder.run(argv);
}
exports.run = run;
