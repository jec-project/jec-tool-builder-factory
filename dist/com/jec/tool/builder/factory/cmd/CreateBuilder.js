"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_tool_cli_1 = require("jec-tool-cli");
const fsExtra = require("fs-extra");
const path = require("path");
const typescript_parser_1 = require("typescript-parser");
const BuilderClassDto_1 = require("../util/BuilderClassDto");
const BuilderFileFactory_1 = require("../util/BuilderFileFactory");
const PathUtils_1 = require("../util/PathUtils");
class CreateBuilder {
    constructor() { }
    loadClass(source, onLoad) {
        const fixedPath = source.lastIndexOf(PathUtils_1.PathUtil.TS_EXTENSION) === source.length - 3 ?
            source : source + PathUtils_1.PathUtil.TS_EXTENSION;
        const filePath = path.join(process.cwd(), fixedPath);
        fsExtra.readFile(filePath, (err, data) => {
            onLoad(err, data);
        });
    }
    extractDeclarations(data, complete) {
        const result = new BuilderClassDto_1.BuilderClassDto();
        result.properties = new Array();
        const parser = new typescript_parser_1.TypescriptParser();
        const parsed = parser.parseSource(data.toString());
        let len = -1;
        let declarations = null;
        let declaration = null;
        let classDeclaration = null;
        parsed.then((file) => {
            classDeclaration = file.declarations[0];
            result.isInterface =
                classDeclaration.constructor === typescript_parser_1.InterfaceDeclaration;
            result.className = classDeclaration.name;
            result.builderName = result.className + "Builder";
            declarations = classDeclaration.properties;
            len = declarations.length;
            while (len--) {
                declaration = declarations[len];
                if (declaration.visibility === 2) {
                    result.properties.push(declaration);
                }
            }
            complete(null, result);
        }, (reason) => {
            complete(reason, null);
        });
    }
    write(file, config, callback) {
        const cwd = process.cwd();
        const output = config.output ? path.join(cwd, config.output) : cwd;
        fsExtra.ensureDir(output, (err) => {
            if (err)
                callback(err);
            else {
                fsExtra.writeFile(path.join(output, config.builderName + PathUtils_1.PathUtil.TS_EXTENSION), file, (err) => {
                    callback(err);
                });
            }
        });
    }
    extractPaths(dto, argv) {
        const src = argv.source;
        let pos = src.lastIndexOf(PathUtils_1.PathUtil.SLASH);
        if (pos !== -1) {
            dto.classPath = src.substr(0, pos);
        }
        dto.output = argv.output;
    }
    run(argv) {
        const logger = jec_tool_cli_1.ConsoleCliLogger.getInstance();
        const builder = new BuilderFileFactory_1.BuilderFileFactory();
        let file = PathUtils_1.PathUtil.EMPTY_STRING;
        this.loadClass(argv.source, (err, data) => {
            if (err)
                logger.error(err);
            else {
                this.extractDeclarations(data.toString(), (error, data) => {
                    if (err)
                        logger.error(error);
                    else {
                        this.extractPaths(data, argv);
                        file = builder.create(data);
                        this.write(file, data, (err) => {
                            err ? logger.error(err) :
                                logger.log(`Test suite with name '${data.builderName}.ts' created in '${data.output}'.`);
                        });
                    }
                });
            }
        });
    }
}
exports.CreateBuilder = CreateBuilder;
