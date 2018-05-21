//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {BuilderClassDto} from "./BuilderClassDto";
import {PropertyDeclaration} from "typescript-parser";
import {PathUtil} from "./PathUtils";

/**
 * A static file that provides convenient methods used to create builder class
 * files.
 */
export class BuilderFileTemplate {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BuilderFileTemplate</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the filled template for the specified property.
   * 
   * @param prop the property information used to populate the template.
   * @return a string that represents a private member field for the specified
   *         property.
   */
  private static getPrivateFieldTemplate(prop:PropertyDeclaration):string {
    const propName:string = prop.name;
    const privateField:string = `  /**
   * The private reference to the <code>${propName}</code> field for this builder.
   */
  private _${propName}:${prop.type} = null;\n\n`;
    return privateField;
  }

  /**
   * Returns the filled template for the specified property, as used to reset
   * this property.
   * 
   * @param prop the property information used to populate the template.
   * @return a string that represents a private member field set to
   *         <code>null</code>.
   */
  private static getResetFieldTemplate(prop:PropertyDeclaration):string {
    const resetField:string = `    this._${prop.name} = null;\n`;
    return resetField;
  }

  /**
   * Returns the filled template for the specified property, as used to 
   * initialize this property.
   * 
   * @param prop the property information used to populate the template.
   * @return a string that represents an initialized member field.
   */
  private static getInitFieldTemplate(prop:PropertyDeclaration):string {
    const propName:string = prop.name;
    const initField:string = `    obj.${propName} = this._${propName};\n`;
    return initField;
  }

  /**
   * Returns the filled template for the specified property, as used to 
   * create a public setter method for this property.
   * 
   * @param dto the dto taht contains the new builder class information.
   * @param prop the property information used to populate the template.
   * @return a string that represents a public setter method.
   */
  private static getMethodTemplate(dto:BuilderClassDto,
                                              prop:PropertyDeclaration):string {
    const propName:string = prop.name;
    const method:string = `  /**
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
  
  /**
   * Resolves the relative import path depending on the specified DTO.
   * 
   * @param dto the DTO used to resolve the relative import path.
   * @return the relative import path for the associated loaded file.
   */
  private static resolveImportPath(dto:BuilderClassDto):string {
    const output:string = dto.output;
    let result:string =  output ? PathUtil.resolveRelativePath(output) : "./";
    result += dto.classPath + PathUtil.SLASH + dto.className;
    return result;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the pattern used to locate private properties whithin the
   * builder class file.
   */
  public static readonly PRIVATE_PROPERTIES:string = "<%PRIVATE_PROPERTIES%>";
  
  /**
   * The reference to the pattern used to locate private properties whithin the
   * reset method body.
   */
  public static readonly RESET_METHOD_BODY:string = "<%RESET_METHOD_BODY%>";
  
  /**
   * The reference to the pattern used to locate properties whithin the build
   * method body.
   */
  public static readonly BUILD_METHOD_BODY:string = "<%BUILD_METHOD_BODY%>";
  
  /**
   * The reference to the pattern used to locate public setter methods whithin
   * the builder class.
   */
  public static readonly PUBLIC_METHODS:string = "<%PUBLIC_METHODS%>";
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns a string that represents a new builder file.
   * 
   * @param dto the DTO used to create the new builder file.
   * @return a string that represents a new builder file.
   */
  public static createBuilderClass(dto:BuilderClassDto):string {
    const className:string = dto.className;
    const builderName:string = dto.builderName;
    const importPath:string = BuilderFileTemplate.resolveImportPath(dto);
    const instanceDef:string =
                  dto.isInterface ? `{} as ${className}` : `new ${className}()`;
    let file:string = `import {${className}} from "${importPath}";

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

  /**
   * Creates and returns a string that represents the list of private properties
   * for the new builder file.
   * 
   * @param dto the DTO used to create the new private properties.
   * @return the list of private properties for the new builder file.
   */
  public static getPrivateFields(dto:BuilderClassDto):string {
    const fields:PropertyDeclaration[] = dto.properties;
    let privateFields:string = PathUtil.EMPTY_STRING;
    let len:number = fields.length;
    while(len--) {
      privateFields += BuilderFileTemplate.getPrivateFieldTemplate(fields[len]);
    }
    return privateFields;
  }

  /**
   * Creates and returns a string that represents the list of private properties
   * set to <code>null</code> for the new builder file.
   * 
   * @param dto the DTO used to create the reseted properties.
   * @return the list of private properties set to <code>null</code> for the new
   *         builder file.
   */
  public static getResetFields(dto:BuilderClassDto):string {
    const fields:PropertyDeclaration[] = dto.properties;
    let resetFields:string = PathUtil.EMPTY_STRING;
    let len:number = fields.length;
    while(len--) {
      resetFields += BuilderFileTemplate.getResetFieldTemplate(fields[len]);
    }
    return resetFields;
  }

  /**
   * Creates and returns a string that represents the list of private properties
   * set with the builder private properties.
   * 
   * @param dto the DTO used to create the initialized properties.
   * @return the list of initialized properties for the new builder file.
   */
  public static getInitializedFields(dto:BuilderClassDto):string {
    const fields:PropertyDeclaration[] = dto.properties;
    let initFields:string = PathUtil.EMPTY_STRING;
    let len:number = fields.length;
    while(len--) {
      initFields += BuilderFileTemplate.getInitFieldTemplate(fields[len]);
    }
    return initFields;
  }
  
  /**
   * Creates and returns a string that represents the list of public methods
   * of the new builder.
   * 
   * @param dto the DTO used to create the public methods.
   * @return the list of public methods of the new builder.
   */
  public static getMethods(dto:BuilderClassDto):string {
    const fields:PropertyDeclaration[] = dto.properties;
    let methods:string = PathUtil.EMPTY_STRING;
    let len:number = fields.length;
    while(len--) {
      methods += BuilderFileTemplate.getMethodTemplate(dto, fields[len]);
    }
    return methods;
  }
}
