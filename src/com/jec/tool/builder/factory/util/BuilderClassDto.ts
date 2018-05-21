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

import {PropertyDeclaration} from "typescript-parser";

/**
 * A DTO used to create builder class files.
 */
export class BuilderClassDto {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BuilderClassDto</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The name of the class for which to create a builder.
   */
  public className:string = null;
  
  /**
   * The path to the class for which to create a builder.
   */
  public classPath:string = null;
  
  /**
   * The name of the new builder class.
   */
  public builderName:string = null;

  /**
   * A collection of public properties for which to create a builder.
   */
  public properties:PropertyDeclaration[] = null;

  /**
   * The output path where to write the new builder class file.
   */
  public output:string = null;

  /**
   * Indicates wheter the associated file is an interface (<code>true</code>),
   * or not (<code>false</code>).
   */
  public isInterface:boolean = false;
};
