"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuilderFileTemplate_1 = require("./BuilderFileTemplate");
class BuilderFileFactory {
    constructor() { }
    create(dto) {
        let file = BuilderFileTemplate_1.BuilderFileTemplate.createBuilderClass(dto);
        file = file.replace(BuilderFileTemplate_1.BuilderFileTemplate.PRIVATE_PROPERTIES, BuilderFileTemplate_1.BuilderFileTemplate.getPrivateFields(dto));
        file = file.replace(BuilderFileTemplate_1.BuilderFileTemplate.PUBLIC_METHODS, BuilderFileTemplate_1.BuilderFileTemplate.getMethods(dto));
        file = file.replace(BuilderFileTemplate_1.BuilderFileTemplate.RESET_METHOD_BODY, BuilderFileTemplate_1.BuilderFileTemplate.getResetFields(dto));
        file = file.replace(BuilderFileTemplate_1.BuilderFileTemplate.BUILD_METHOD_BODY, BuilderFileTemplate_1.BuilderFileTemplate.getInitializedFields(dto));
        return file;
    }
}
exports.BuilderFileFactory = BuilderFileFactory;
;
