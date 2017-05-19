"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var Yarn = (function () {
    function Yarn(cwd) {
        this.cwd = cwd;
    }
    Yarn.prototype.install = function () {
        child_process_1.execSync("yarn", { cwd: this.cwd });
    };
    return Yarn;
}());
exports.default = Yarn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWWFybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ZYXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQWdEO0FBR2hEO0lBQ0UsY0FBbUIsR0FBVztRQUFYLFFBQUcsR0FBSCxHQUFHLENBQVE7SUFBSSxDQUFDO0lBQzVCLHNCQUFPLEdBQWQ7UUFDRSx3QkFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUFMRCxJQUtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlY1N5bmMgYXMgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCJcbmltcG9ydCB7IFBhY2thZ2VNYW5hZ2VyIH0gZnJvbSBcIi4vUGFja2FnZU1hbmFnZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZYXJuIGltcGxlbWVudHMgUGFja2FnZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY3dkOiBzdHJpbmcpIHsgfVxuICBwdWJsaWMgaW5zdGFsbCgpIHtcbiAgICBleGVjKGB5YXJuYCwgeyBjd2Q6IHRoaXMuY3dkIH0pXG4gIH1cbn1cbiJdfQ==