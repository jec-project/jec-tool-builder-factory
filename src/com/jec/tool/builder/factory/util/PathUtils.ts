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

/**
 * A static file that provides convenient methods used to work with paths.
 */
export class PathUtil {

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A reference to an empty string.
   */
  public static readonly EMPTY_STRING:string = "";

  /**
   * A reference to the dot (<code>.</code>) character.
   */
  public static readonly DOT:string = ".";

  /**
   * A reference to the slash (<code>/</code>) character.
   */
  public static readonly SLASH:string = "/";

  /**
   * A reference to the relative path pattern (<code>../</code>).
   */
  public static readonly RELATIVE_PATH:string = "../";

  /**
   * A reference to the TypeScript (<code>.ts</code>) extension.
   */
  public static readonly TS_EXTENSION:string = ".ts";

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Resolves relative path regarding the specified declarative path.
   * 
   * @param path the path used to solve the relative class path reference.
   * @return a relative path build from the specified path.
   */
  public static resolveRelativePath(path:string):string {
    const buffer:string[] = path.split(PathUtil.SLASH);
    let pathFix:string = PathUtil.EMPTY_STRING;
    let len:number = buffer.length;
    while(len--) {
      pathFix += this.RELATIVE_PATH;
    }
    return pathFix;
  }
}
