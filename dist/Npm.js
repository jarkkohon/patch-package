"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var Npm = (function () {
    function Npm(cwd) {
        this.cwd = cwd;
    }
    Npm.prototype.install = function () {
        child_process_1.execSync("npm i", { cwd: this.cwd });
    };
    return Npm;
}());
exports.default = Npm;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnBtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL05wbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUFnRDtBQUdoRDtJQUNFLGFBQW1CLEdBQVc7UUFBWCxRQUFHLEdBQUgsR0FBRyxDQUFRO0lBQUksQ0FBQztJQUM1QixxQkFBTyxHQUFkO1FBQ0Usd0JBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUNILFVBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWNTeW5jIGFzIGV4ZWMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiXG5pbXBvcnQgeyBQYWNrYWdlTWFuYWdlciB9IGZyb20gXCIuL1BhY2thZ2VNYW5hZ2VyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnBtIGltcGxlbWVudHMgUGFja2FnZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY3dkOiBzdHJpbmcpIHsgfVxuICBwdWJsaWMgaW5zdGFsbCgpIHtcbiAgICBleGVjKGBucG0gaWAsIHsgY3dkOiB0aGlzLmN3ZCB9KVxuICB9XG59XG4iXX0=