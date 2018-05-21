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
import { BuilderFileTemplate } from "./BuilderFileTemplate";

/**
 * A factory used to create builder class files.
 */
export class BuilderFileFactory {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BuilderFileFactory</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and return a string that represents a new builder file.
   * 
   * @param dto the DTO used to create the new builder file.
   * @return a string that represents a new builder file.
   */
  public create(dto:BuilderClassDto):string {
    let file:string = BuilderFileTemplate.createBuilderClass(dto);
    file = file.replace(
      BuilderFileTemplate.PRIVATE_PROPERTIES,
      BuilderFileTemplate.getPrivateFields(dto)
    );
    file = file.replace(
      BuilderFileTemplate.PUBLIC_METHODS,
      BuilderFileTemplate.getMethods(dto)
    );
    file = file.replace(
      BuilderFileTemplate.RESET_METHOD_BODY,
      BuilderFileTemplate.getResetFields(dto)
    );
    file = file.replace(
      BuilderFileTemplate.BUILD_METHOD_BODY,
      BuilderFileTemplate.getInitializedFields(dto)
    );
    return file;
  }
};
