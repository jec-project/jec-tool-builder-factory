"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_tool_cli_1 = require("jec-tool-cli");
const path = require("path");
class FactoryBuilderCommandStrategy extends jec_tool_cli_1.AbstractCommandStrategy {
    constructor(version) {
        super(version);
        this.initStrategy();
    }
    initStrategy() {
        const CFG = require("../../../../../../../../config/builder-factory-config.json");
        this.setScriptPath(path.resolve(__dirname, "../../../../../../../../dist/com/jec/tool/builder/factory/script"));
        console.log(jec_tool_cli_1.SplashScreenBuilder.build("JEC Factory"));
        this.initCommands(CFG);
    }
    invokeCommand() {
        super.invokeCommand();
    }
}
exports.FactoryBuilderCommandStrategy = FactoryBuilderCommandStrategy;
