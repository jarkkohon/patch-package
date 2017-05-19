"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var process_1 = require("process");
var applyPatches_1 = require("./applyPatches");
var getAppRootPath_1 = require("./getAppRootPath");
var install_1 = require("./install");
var makePatch_1 = require("./makePatch");
var appPath = getAppRootPath_1.default();
install_1.default(appPath);
if (process_1.argv.length === 2) {
    applyPatches_1.default(appPath);
}
else {
    var packageNames = [].slice.call(process_1.argv, 2);
    if (packageNames.indexOf("--help") > -1 || packageNames.indexOf("-h") > -1) {
        printHelp();
    }
    else {
        packageNames.forEach(function (packageName) {
            makePatch_1.default(packageName, appPath);
        });
    }
}
function printHelp() {
    console.log("\nUsage:\n\n    " + chalk_1.bold("patch-package") + chalk_1.italic("[ <package-name>]") + "\n\n\n  Without arguments, the " + chalk_1.bold("patch-package") + " command will attempt to find and apply\n  patch files to your project. It looks for files named like\n\n     ./patches/<package-name>:<version>.patch\n\n  When given package names as arguments, patch-package will create patch files\n  based on any changes you've made to the version installed by yarn/npm.\n\n  Add the following to your package.json to ensure that these patches are\n  gracefully applied whenever yarn or npm make changes to node_modules:\n\n    \"scripts\": {\n      \"prepare\": \"patch-package\"\n    }\n");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBMEM7QUFDMUMsbUNBQThCO0FBQzlCLCtDQUF5QztBQUN6QyxtREFBNkM7QUFDN0MscUNBQStCO0FBQy9CLHlDQUFtQztBQUVuQyxJQUFNLE9BQU8sR0FBRyx3QkFBYyxFQUFFLENBQUE7QUFDaEMsaUJBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNoQixFQUFFLENBQUMsQ0FBQyxjQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsc0JBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUN2QixDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDTixJQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDM0MsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRSxTQUFTLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxXQUFtQjtZQUN2QyxtQkFBUyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUNqQyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDO0FBRUQ7SUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUdSLFlBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxjQUFNLENBQUMsbUJBQW1CLENBQUMsdUNBRzlCLFlBQUksQ0FBQyxlQUFlLENBQUMsa2hCQWMvQyxDQUFDLENBQUE7QUFDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9sZCwgY3lhbiwgaXRhbGljIH0gZnJvbSBcImNoYWxrXCJcbmltcG9ydCB7IGFyZ3YgfSBmcm9tIFwicHJvY2Vzc1wiXG5pbXBvcnQgYXBwbHlQYXRjaGVzIGZyb20gXCIuL2FwcGx5UGF0Y2hlc1wiXG5pbXBvcnQgZ2V0QXBwUm9vdFBhdGggZnJvbSBcIi4vZ2V0QXBwUm9vdFBhdGhcIlxuaW1wb3J0IGluc3RhbGwgZnJvbSBcIi4vaW5zdGFsbFwiXG5pbXBvcnQgbWFrZVBhdGNoIGZyb20gXCIuL21ha2VQYXRjaFwiXG5cbmNvbnN0IGFwcFBhdGggPSBnZXRBcHBSb290UGF0aCgpXG5pbnN0YWxsKGFwcFBhdGgpXG5pZiAoYXJndi5sZW5ndGggPT09IDIpIHtcbiAgYXBwbHlQYXRjaGVzKGFwcFBhdGgpXG59IGVsc2Uge1xuICBjb25zdCBwYWNrYWdlTmFtZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3YsIDIpXG4gIGlmIChwYWNrYWdlTmFtZXMuaW5kZXhPZihcIi0taGVscFwiKSA+IC0xIHx8IHBhY2thZ2VOYW1lcy5pbmRleE9mKFwiLWhcIikgPiAtMSkge1xuICAgIHByaW50SGVscCgpXG4gIH0gZWxzZSB7XG4gICAgcGFja2FnZU5hbWVzLmZvckVhY2goKHBhY2thZ2VOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIG1ha2VQYXRjaChwYWNrYWdlTmFtZSwgYXBwUGF0aClcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHByaW50SGVscCgpIHtcbiAgY29uc29sZS5sb2coYFxuVXNhZ2U6XG5cbiAgICAke2JvbGQoXCJwYXRjaC1wYWNrYWdlXCIpfSR7aXRhbGljKFwiWyA8cGFja2FnZS1uYW1lPl1cIil9XG5cblxuICBXaXRob3V0IGFyZ3VtZW50cywgdGhlICR7Ym9sZChcInBhdGNoLXBhY2thZ2VcIil9IGNvbW1hbmQgd2lsbCBhdHRlbXB0IHRvIGZpbmQgYW5kIGFwcGx5XG4gIHBhdGNoIGZpbGVzIHRvIHlvdXIgcHJvamVjdC4gSXQgbG9va3MgZm9yIGZpbGVzIG5hbWVkIGxpa2VcblxuICAgICAuL3BhdGNoZXMvPHBhY2thZ2UtbmFtZT46PHZlcnNpb24+LnBhdGNoXG5cbiAgV2hlbiBnaXZlbiBwYWNrYWdlIG5hbWVzIGFzIGFyZ3VtZW50cywgcGF0Y2gtcGFja2FnZSB3aWxsIGNyZWF0ZSBwYXRjaCBmaWxlc1xuICBiYXNlZCBvbiBhbnkgY2hhbmdlcyB5b3UndmUgbWFkZSB0byB0aGUgdmVyc2lvbiBpbnN0YWxsZWQgYnkgeWFybi9ucG0uXG5cbiAgQWRkIHRoZSBmb2xsb3dpbmcgdG8geW91ciBwYWNrYWdlLmpzb24gdG8gZW5zdXJlIHRoYXQgdGhlc2UgcGF0Y2hlcyBhcmVcbiAgZ3JhY2VmdWxseSBhcHBsaWVkIHdoZW5ldmVyIHlhcm4gb3IgbnBtIG1ha2UgY2hhbmdlcyB0byBub2RlX21vZHVsZXM6XG5cbiAgICBcInNjcmlwdHNcIjoge1xuICAgICAgXCJwcmVwYXJlXCI6IFwicGF0Y2gtcGFja2FnZVwiXG4gICAgfVxuYClcbn1cbiJdfQ==