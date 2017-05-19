"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var fs = require("fs");
var path = require("path");
function findPatchFiles(appPath) {
    var patchesDirectory = path.join(appPath, "patches");
    if (!fs.existsSync(patchesDirectory)) {
        return [];
    }
    return fs
        .readdirSync(patchesDirectory)
        .filter(function (filename) { return (console.log(filename), filename.match(/^.+:.+\.patch$/)); })
        .map(function (filename) {
        var _a = filename.slice(0, -6).split(":"), packageName = _a[0], version = _a[1];
        var packageDir = path.join(appPath, "node_modules", packageName);
        if (!fs.existsSync(packageDir)) {
            console.warn(chalk_1.red("Warning:") + " Patch file found for package " + packageName
                + (" which is not present at " + packageDir));
            return null;
        }
        var packageJson = require(path.join(packageDir, "package.json"));
        if (packageJson.version !== version) {
            console.warn("" + chalk_1.red("Warning: ")
                + ("Patch file for package " + packageName + ":" + version + " found,")
                + (" but node_modules/" + packageName + " has version " + packageJson.version));
            console.warn("    Attempting to apply the patch anyway. "
                + ("run " + chalk_1.blue.bold("patch-package " + packageName) + " to make this warning disappear"));
        }
        return {
            patchFilePath: path.resolve(patchesDirectory, filename),
            packageName: packageName,
        };
    })
        .filter(Boolean);
}
exports.default = findPatchFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFBhdGNoZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmluZFBhdGNoZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUM7QUFDakMsdUJBQXdCO0FBQ3hCLDJCQUE0QjtBQUc1Qix3QkFBdUMsT0FBZTtJQUNwRCxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUNELE1BQU0sQ0FBQyxFQUFFO1NBQ04sV0FBVyxDQUFDLGdCQUFnQixDQUFDO1NBQzdCLE1BQU0sQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBekQsQ0FBeUQsQ0FBQztTQUMvRSxHQUFHLENBQUMsVUFBQyxRQUFRO1FBQ04sSUFBQSxxQ0FBeUQsRUFBeEQsbUJBQVcsRUFBRSxlQUFPLENBQW9DO1FBQy9ELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUVsRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQ1AsV0FBRyxDQUFDLFVBQVUsQ0FBQyxzQ0FBaUMsV0FBYTttQkFDOUQsOEJBQTRCLFVBQVksQ0FBQSxDQUMzQyxDQUFBO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFFRCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUVsRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDcEMsT0FBTyxDQUFDLElBQUksQ0FDVixLQUFHLFdBQUcsQ0FBQyxXQUFXLENBQUc7bUJBQ25CLDRCQUEwQixXQUFXLFNBQUksT0FBTyxZQUFTLENBQUE7bUJBQ3pELHVCQUFxQixXQUFXLHFCQUFnQixXQUFXLENBQUMsT0FBUyxDQUFBLENBQ3hFLENBQUE7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUNWLDRDQUE0QzttQkFDMUMsU0FBTyxZQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFpQixXQUFhLENBQUMsb0NBQWlDLENBQUEsQ0FDcEYsQ0FBQTtRQUNILENBQUM7UUFFRCxNQUFNLENBQUM7WUFDTCxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUM7WUFDdkQsV0FBVyxhQUFBO1NBQ1osQ0FBQTtJQUNILENBQUMsQ0FBQztTQUNELE1BQU0sQ0FBQyxPQUFPLENBQVEsQ0FBQTtBQUMzQixDQUFDO0FBeENELGlDQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJsdWUsIHJlZCB9IGZyb20gXCJjaGFsa1wiXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIlxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiXG5pbXBvcnQgeyBlbnYgfSBmcm9tIFwicHJvY2Vzc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmRQYXRjaEZpbGVzKGFwcFBhdGg6IHN0cmluZyk6IEFycmF5PHsgcGF0Y2hGaWxlUGF0aDogc3RyaW5nLCBwYWNrYWdlTmFtZTogc3RyaW5nIH0+IHtcbiAgY29uc3QgcGF0Y2hlc0RpcmVjdG9yeSA9IHBhdGguam9pbihhcHBQYXRoLCBcInBhdGNoZXNcIilcbiAgaWYgKCFmcy5leGlzdHNTeW5jKHBhdGNoZXNEaXJlY3RvcnkpKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgcmV0dXJuIGZzXG4gICAgLnJlYWRkaXJTeW5jKHBhdGNoZXNEaXJlY3RvcnkpXG4gICAgLmZpbHRlcigoZmlsZW5hbWUpID0+IChjb25zb2xlLmxvZyhmaWxlbmFtZSksIGZpbGVuYW1lLm1hdGNoKC9eLis6LitcXC5wYXRjaCQvKSkpXG4gICAgLm1hcCgoZmlsZW5hbWUpID0+IHtcbiAgICAgIGNvbnN0IFtwYWNrYWdlTmFtZSwgdmVyc2lvbl0gPSBmaWxlbmFtZS5zbGljZSgwLCAtNikuc3BsaXQoXCI6XCIpXG4gICAgICBjb25zdCBwYWNrYWdlRGlyID0gcGF0aC5qb2luKGFwcFBhdGgsIFwibm9kZV9tb2R1bGVzXCIsIHBhY2thZ2VOYW1lKVxuXG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMocGFja2FnZURpcikpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGAke3JlZChcIldhcm5pbmc6XCIpfSBQYXRjaCBmaWxlIGZvdW5kIGZvciBwYWNrYWdlICR7cGFja2FnZU5hbWV9YFxuICAgICAgICAgICsgYCB3aGljaCBpcyBub3QgcHJlc2VudCBhdCAke3BhY2thZ2VEaXJ9YCxcbiAgICAgICAgKVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBwYWNrYWdlSnNvbiA9IHJlcXVpcmUocGF0aC5qb2luKHBhY2thZ2VEaXIsIFwicGFja2FnZS5qc29uXCIpKVxuXG4gICAgICBpZiAocGFja2FnZUpzb24udmVyc2lvbiAhPT0gdmVyc2lvbikge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYCR7cmVkKFwiV2FybmluZzogXCIpfWBcbiAgICAgICAgICArIGBQYXRjaCBmaWxlIGZvciBwYWNrYWdlICR7cGFja2FnZU5hbWV9OiR7dmVyc2lvbn0gZm91bmQsYFxuICAgICAgICAgICsgYCBidXQgbm9kZV9tb2R1bGVzLyR7cGFja2FnZU5hbWV9IGhhcyB2ZXJzaW9uICR7cGFja2FnZUpzb24udmVyc2lvbn1gLFxuICAgICAgICApXG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgICAgIEF0dGVtcHRpbmcgdG8gYXBwbHkgdGhlIHBhdGNoIGFueXdheS4gYFxuICAgICAgICAgICsgYHJ1biAke2JsdWUuYm9sZChgcGF0Y2gtcGFja2FnZSAke3BhY2thZ2VOYW1lfWApfSB0byBtYWtlIHRoaXMgd2FybmluZyBkaXNhcHBlYXJgLFxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdGNoRmlsZVBhdGg6IHBhdGgucmVzb2x2ZShwYXRjaGVzRGlyZWN0b3J5LCBmaWxlbmFtZSksXG4gICAgICAgIHBhY2thZ2VOYW1lLFxuICAgICAgfVxuICAgIH0pXG4gICAgLmZpbHRlcihCb29sZWFuKSBhcyBhbnlcbn1cbiJdfQ==