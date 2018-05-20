"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_tool_cli_1 = require("jec-tool-cli");
class FactoryCommandManager extends jec_tool_cli_1.AbstractCommandManager {
    constructor(processTitle) {
        super(processTitle);
        this.initManager();
    }
    initManager() {
        console.log('init factory processes here');
    }
    process() {
        super.process();
    }
}
exports.FactoryCommandManager = FactoryCommandManager;
