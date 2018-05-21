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

import {Command, CliLogger, ConsoleCliLogger} from "jec-tool-cli";
import * as fsExtra from "fs-extra";
import * as path from "path";
import {TypescriptParser, File, PropertyDeclaration, DeclarationVisibility,
        ClassLikeDeclaration,  InterfaceDeclaration} from "typescript-parser";
import {BuilderClassDto} from "../util/BuilderClassDto";
import {BuilderFileFactory} from "../util/BuilderFileFactory";
import { PathUtil } from "../util/PathUtils";

/**
 * The <code>CreateBuilder</code> command allows create a new Josha Bloch's
 * builder for the specified class, or interface.
 */
export class CreateBuilder implements Command {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CreateBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Loads the class for which to create the new builder.
   * 
   * @param source the source path to the class to load.
   * @param onLoad the callback function called once the class has been loaded.
   */
  private loadClass(source:string, onLoad:Function):void {
    const fixedPath:string = 
               source.lastIndexOf(PathUtil.TS_EXTENSION) === source.length - 3 ?
               source : source + PathUtil.TS_EXTENSION;
    const filePath:string = path.join(process.cwd(), fixedPath);
    fsExtra.readFile(filePath, (err:NodeJS.ErrnoException, data:any) => {
      onLoad(err, data)
    });
  }

  /**
   * Extracts information used to create the builder from the loaded class file.
   * 
   * @param data the class file from which to extractinformation.
   * @param complete the callback method calld once information have been
   *                 extracted. 
   */
  private extractDeclarations(data:string, complete:Function):void {
    const result:BuilderClassDto = new BuilderClassDto();
    result.properties = new Array<PropertyDeclaration>();
    const parser:TypescriptParser = new TypescriptParser();
    const parsed:Promise<File> = parser.parseSource(data.toString());
    let len:number = -1;
    let declarations:PropertyDeclaration[] = null;
    let declaration:any = null;
    let classDeclaration:ClassLikeDeclaration = null;
    parsed.then(
      (file:File) => {
        classDeclaration = file.declarations[0] as ClassLikeDeclaration;
        result.isInterface = 
                          classDeclaration.constructor === InterfaceDeclaration;
        result.className = classDeclaration.name;
        result.builderName = result.className + "Builder";
        declarations = classDeclaration.properties;
        len = declarations.length;
        while(len--) {
          declaration = declarations[len];
          if(declaration.visibility === DeclarationVisibility.Public) {
            result.properties.push(declaration);
          }
        }
        complete(null, result);
      },
      (reason:any) => {
        complete(reason, null);
      }
    );
  }
  
  /**
   * Writes a JEC builder in a new file, depending on the specified options.
   * 
   * @param file a string that represents the new JEC builder class file.
   * @param config the config object used to customize the JEC builder.
   * @param callback the callback method called once the file is written.
   */
  private write(file:string, config:BuilderClassDto, callback:Function):void {
      const cwd:string = process.cwd();
      const output:string = config.output ? path.join(cwd, config.output) : cwd;
      fsExtra.ensureDir(output, (err:Error) => {
      if(err) callback(err);
      else {
        fsExtra.writeFile(
          path.join(output, config.builderName + PathUtil.TS_EXTENSION),
          file,
          (err:NodeJS.ErrnoException | null) => {
            callback(err);
          }
        );
      }
    });
  }

  /**
   * A visitor that extracts files paths from the specified user's inputs and
   * set themm to the <code>BuilderClassDto</code> instance.
   * 
   * @param dto the <code>BuilderClassDto</code> instance to update.
   * @param argv an object that contains user's inputs.
   */
  private extractPaths(dto:BuilderClassDto, argv:any):void {
    const src:string = argv.source;
    let pos:number = src.lastIndexOf(PathUtil.SLASH);
    if(pos !== -1) {
      dto.classPath = src.substr(0, pos);
    }
    dto.output = argv.output;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public run(argv:any):void {
    const logger:CliLogger= ConsoleCliLogger.getInstance();
    const builder:BuilderFileFactory = new BuilderFileFactory();
    let file: string = PathUtil.EMPTY_STRING;
    this.loadClass(argv.source, (err:NodeJS.ErrnoException, data:any) => {
      if(err) logger.error(err);
      else {
        this.extractDeclarations(
          data.toString(), (error:any, data:BuilderClassDto) => {
            if(err) logger.error(error);
            else {
              this.extractPaths(data, argv);
              file = builder.create(data);
              this.write(file, data, (err:any) => {
                err ? logger.error(err) :
                      logger.log(
    `Test suite with name '${data.builderName}.ts' created in '${data.output}'.`
                      );
              });
            }
          }
        );
      }
    });
  }
}