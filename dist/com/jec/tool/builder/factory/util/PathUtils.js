"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PathUtil {
    static resolveRelativePath(path) {
        const buffer = path.split(PathUtil.SLASH);
        let pathFix = PathUtil.EMPTY_STRING;
        let len = buffer.length;
        while (len--) {
            pathFix += this.RELATIVE_PATH;
        }
        return pathFix;
    }
}
PathUtil.EMPTY_STRING = "";
PathUtil.DOT = ".";
PathUtil.SLASH = "/";
PathUtil.RELATIVE_PATH = "../";
PathUtil.TS_EXTENSION = ".ts";
exports.PathUtil = PathUtil;
