"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var path_1 = require("path");
var applyPatches_1 = require("./applyPatches");
var yarnPatchFile = path_1.join(__dirname, "../yarn.patch");
function install(appPath) {
    try {
        applyPatches_1.applyPatch(yarnPatchFile, "yarn");
    }
    catch (e) {
        if (fs_1.existsSync(path_1.join(appPath, "node_modules", "yarn"))) {
            printIncompatibleYarnError();
        }
        else {
            printNoYarnInfo();
        }
    }
}
exports.default = install;
function printIncompatibleYarnError() {
    console.error("\n" + chalk_1.red.bold("***ERROR***") + "\n" + chalk_1.red("This version of patch-package in incompatible with your current local\nversion of yarn. Please update both.") + "\n");
}
function printNoYarnInfo() {
    console.log('patch-package patches will be limited to yarn add|install phases withouth local yarn as dev depency');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnN0YWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQTJCO0FBQzNCLHlCQUErQjtBQUMvQiw2QkFBMkI7QUFDM0IsK0NBQTJDO0FBRTNDLElBQU0sYUFBYSxHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUE7QUFFdEQsaUJBQWdDLE9BQWU7SUFDN0MsSUFBSSxDQUFDO1FBQ0gseUJBQVUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxFQUFFLENBQUMsQ0FBQyxlQUFVLENBQUMsV0FBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsMEJBQTBCLEVBQUUsQ0FBQTtRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixlQUFlLEVBQUUsQ0FBQTtRQUNuQixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFWRCwwQkFVQztBQUVEO0lBQ0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUNkLFdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQ3ZCLFdBQUcsQ0FBQyw2R0FDK0IsQ0FBQyxPQUNyQyxDQUFDLENBQUE7QUFDRixDQUFDO0FBRUQ7SUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFHQUFxRyxDQUFDLENBQUE7QUFDcEgsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZCB9IGZyb20gXCJjaGFsa1wiXG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSBcImZzXCJcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyBhcHBseVBhdGNoIH0gZnJvbSBcIi4vYXBwbHlQYXRjaGVzXCJcblxuY29uc3QgeWFyblBhdGNoRmlsZSA9IGpvaW4oX19kaXJuYW1lLCBcIi4uL3lhcm4ucGF0Y2hcIilcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5zdGFsbChhcHBQYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBhcHBseVBhdGNoKHlhcm5QYXRjaEZpbGUsIFwieWFyblwiKVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGV4aXN0c1N5bmMoam9pbihhcHBQYXRoLCBcIm5vZGVfbW9kdWxlc1wiLCBcInlhcm5cIikpKSB7XG4gICAgICBwcmludEluY29tcGF0aWJsZVlhcm5FcnJvcigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHByaW50Tm9ZYXJuSW5mbygpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHByaW50SW5jb21wYXRpYmxlWWFybkVycm9yKCkge1xuICBjb25zb2xlLmVycm9yKGBcbiR7cmVkLmJvbGQoXCIqKipFUlJPUioqKlwiKX1cbiR7cmVkKGBUaGlzIHZlcnNpb24gb2YgcGF0Y2gtcGFja2FnZSBpbiBpbmNvbXBhdGlibGUgd2l0aCB5b3VyIGN1cnJlbnQgbG9jYWxcbnZlcnNpb24gb2YgeWFybi4gUGxlYXNlIHVwZGF0ZSBib3RoLmApfVxuYClcbn1cblxuZnVuY3Rpb24gcHJpbnROb1lhcm5JbmZvKCkge1xuICBjb25zb2xlLmxvZygncGF0Y2gtcGFja2FnZSBwYXRjaGVzIHdpbGwgYmUgbGltaXRlZCB0byB5YXJuIGFkZHxpbnN0YWxsIHBoYXNlcyB3aXRob3V0aCBsb2NhbCB5YXJuIGFzIGRldiBkZXBlbmN5Jylcbn1cbiJdfQ==