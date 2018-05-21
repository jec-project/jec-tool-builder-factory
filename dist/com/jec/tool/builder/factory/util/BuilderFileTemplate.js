"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathUtils_1 = require("./PathUtils");
class BuilderFileTemplate {
    constructor() { }
    static getPrivateFieldTemplate(prop) {
        const propName = prop.name;
        const privateField = `  /**
   * The private reference to the <code>${propName}</code> field for this builder.
   */
  private _${propName}:${prop.type} = null;\n\n`;
        return privateField;
    }
    static getResetFieldTemplate(prop) {
        const resetField = `    this._${prop.name} = null;\n`;
        return resetField;
    }
    static getInitFieldTemplate(prop) {
        const propName = prop.name;
        const initField = `    obj.${propName} = this._${propName};\n`;
        return initField;
    }
    static getMethodTemplate(dto, prop) {
        const propName = prop.name;
        const method = `  /**
   * Adds the specified <code>${propName}</code> value to the new context.
   * 
   * @param ${propName} the value to add to the new context.
   * @return the reference to this builder.
   */
  public ${propName}(${propName}:${prop.type}):${dto.builderName} {
    this._${propName} = ${propName};
    return this;
  }\n\n`;
        return method;
    }
    static resolveImportPath(dto) {
        const output = dto.output;
        let result = output ? PathUtils_1.PathUtil.resolveRelativePath(output) : "./";
        result += dto.classPath + PathUtils_1.PathUtil.SLASH + dto.className;
        return result;
    }
    static createBuilderClass(dto) {
        const className = dto.className;
        const builderName = dto.builderName;
        const importPath = BuilderFileTemplate.resolveImportPath(dto);
        const instanceDef = dto.isInterface ? `{} as ${className}` : `new ${className}()`;
        let file = `import {${className}} from "${importPath}";

/**
 * A builder that creates new <code>${className}</code> objects.
 */
export class ${builderName} {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>${builderName}</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // ${builderName} private properties
  ////////////////////////////////////////////////////////////////////////////

${BuilderFileTemplate.PRIVATE_PROPERTIES}  ////////////////////////////////////////////////////////////////////////////
  // ${builderName} public methods
  ////////////////////////////////////////////////////////////////////////////

${BuilderFileTemplate.PUBLIC_METHODS}  /**
   * Resets all builder properties.
   * 
   * @return the reference to this builder.
   */
  public reset():${builderName} {
${BuilderFileTemplate.RESET_METHOD_BODY}    return this;
  }

  /**
   * Builds and returns a new instance of the <code>${className}</code> type,  
   * initialized with the builder properties.
   * 
   * @return a new instance for the <code>${className}</code> type.
   */
  public build():${className} {
    const obj:${className} = ${instanceDef};
${BuilderFileTemplate.BUILD_METHOD_BODY}    return obj;
  }

  /**
   * Creates and returns a new <code>${builderName}</code> instance.
   * 
   * @return a new <code>${builderName}</code> instance.
   */
  public static create():${builderName} {
    const builder:${builderName} = new ${builderName}();
    return builder;
  }
}`;
        return file;
    }
    static getPrivateFields(dto) {
        const fields = dto.properties;
        let privateFields = PathUtils_1.PathUtil.EMPTY_STRING;
        let len = fields.length;
        while (len--) {
            privateFields += BuilderFileTemplate.getPrivateFieldTemplate(fields[len]);
        }
        return privateFields;
    }
    static getResetFields(dto) {
        const fields = dto.properties;
        let resetFields = PathUtils_1.PathUtil.EMPTY_STRING;
        let len = fields.length;
        while (len--) {
            resetFields += BuilderFileTemplate.getResetFieldTemplate(fields[len]);
        }
        return resetFields;
    }
    static getInitializedFields(dto) {
        const fields = dto.properties;
        let initFields = PathUtils_1.PathUtil.EMPTY_STRING;
        let len = fields.length;
        while (len--) {
            initFields += BuilderFileTemplate.getInitFieldTemplate(fields[len]);
        }
        return initFields;
    }
    static getMethods(dto) {
        const fields = dto.properties;
        let methods = PathUtils_1.PathUtil.EMPTY_STRING;
        let len = fields.length;
        while (len--) {
            methods += BuilderFileTemplate.getMethodTemplate(dto, fields[len]);
        }
        return methods;
    }
}
BuilderFileTemplate.PRIVATE_PROPERTIES = "<%PRIVATE_PROPERTIES%>";
BuilderFileTemplate.RESET_METHOD_BODY = "<%RESET_METHOD_BODY%>";
BuilderFileTemplate.BUILD_METHOD_BODY = "<%BUILD_METHOD_BODY%>";
BuilderFileTemplate.PUBLIC_METHODS = "<%PUBLIC_METHODS%>";
exports.BuilderFileTemplate = BuilderFileTemplate;
