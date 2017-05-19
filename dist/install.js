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
            printNoYarnError();
        }
    }
}
exports.default = install;
function printIncompatibleYarnError() {
    console.error("\n" + chalk_1.red.bold("***ERROR***") + "\n" + chalk_1.red("This version of patch-package in incompatible with your current local\nversion of yarn. Please update both.") + "\n");
}
function printNoYarnError() {
    console.error("\n" + chalk_1.red.bold("***ERROR***") + "\n" + chalk_1.red("patch-package requires yarn as a local peer-dependency") + "\n");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnN0YWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQTJCO0FBQzNCLHlCQUErQjtBQUMvQiw2QkFBMkI7QUFDM0IsK0NBQTJDO0FBRTNDLElBQU0sYUFBYSxHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUE7QUFFdEQsaUJBQWdDLE9BQWU7SUFDN0MsSUFBSSxDQUFDO1FBQ0gseUJBQVUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxFQUFFLENBQUMsQ0FBQyxlQUFVLENBQUMsV0FBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsMEJBQTBCLEVBQUUsQ0FBQTtRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixnQkFBZ0IsRUFBRSxDQUFBO1FBQ3BCLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQVZELDBCQVVDO0FBRUQ7SUFDRSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQ2QsV0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFDdkIsV0FBRyxDQUFDLDZHQUMrQixDQUFDLE9BQ3JDLENBQUMsQ0FBQTtBQUNGLENBQUM7QUFFRDtJQUNFLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FDZCxXQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUN2QixXQUFHLENBQUMsd0RBQXdELENBQUMsT0FDOUQsQ0FBQyxDQUFBO0FBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZCB9IGZyb20gXCJjaGFsa1wiXG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSBcImZzXCJcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyBhcHBseVBhdGNoIH0gZnJvbSBcIi4vYXBwbHlQYXRjaGVzXCJcblxuY29uc3QgeWFyblBhdGNoRmlsZSA9IGpvaW4oX19kaXJuYW1lLCBcIi4uL3lhcm4ucGF0Y2hcIilcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5zdGFsbChhcHBQYXRoOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBhcHBseVBhdGNoKHlhcm5QYXRjaEZpbGUsIFwieWFyblwiKVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGV4aXN0c1N5bmMoam9pbihhcHBQYXRoLCBcIm5vZGVfbW9kdWxlc1wiLCBcInlhcm5cIikpKSB7XG4gICAgICBwcmludEluY29tcGF0aWJsZVlhcm5FcnJvcigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHByaW50Tm9ZYXJuRXJyb3IoKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwcmludEluY29tcGF0aWJsZVlhcm5FcnJvcigpIHtcbiAgY29uc29sZS5lcnJvcihgXG4ke3JlZC5ib2xkKFwiKioqRVJST1IqKipcIil9XG4ke3JlZChgVGhpcyB2ZXJzaW9uIG9mIHBhdGNoLXBhY2thZ2UgaW4gaW5jb21wYXRpYmxlIHdpdGggeW91ciBjdXJyZW50IGxvY2FsXG52ZXJzaW9uIG9mIHlhcm4uIFBsZWFzZSB1cGRhdGUgYm90aC5gKX1cbmApXG59XG5cbmZ1bmN0aW9uIHByaW50Tm9ZYXJuRXJyb3IoKSB7XG4gIGNvbnNvbGUuZXJyb3IoYFxuJHtyZWQuYm9sZChcIioqKkVSUk9SKioqXCIpfVxuJHtyZWQoYHBhdGNoLXBhY2thZ2UgcmVxdWlyZXMgeWFybiBhcyBhIGxvY2FsIHBlZXItZGVwZW5kZW5jeWApfVxuYClcbn1cbiJdfQ==