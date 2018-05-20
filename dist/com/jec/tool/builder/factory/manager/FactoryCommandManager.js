"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_tool_cli_1 = require("jec-tool-cli");
const FactoryBuilderCommandStrategy_1 = require("./strategy/FactoryBuilderCommandStrategy");
const path = require("path");
class FactoryCommandManager extends jec_tool_cli_1.AbstractCommandManager {
    constructor(processTitle) {
        super(processTitle, path.resolve(__dirname, "../../../../../../../package.json"));
        this.initManager();
    }
    initManager() {
        this.__strategy = new FactoryBuilderCommandStrategy_1.FactoryBuilderCommandStrategy(this.__version);
    }
    process() {
        super.process();
    }
}
exports.FactoryCommandManager = FactoryCommandManager;
