"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var child_process_1 = require("child_process");
var fs = require("fs");
var path = require("path");
function findPatchFiles(appPath) {
    var patchesDirectory = path.join(appPath, "patches");
    if (!fs.existsSync(patchesDirectory)) {
        return [];
    }
    var files = fs
        .readdirSync(patchesDirectory)
        .filter(function (filename) { return filename.match(/^.+:.+\.patch$/); });
    if (files.length === 0) {
        console.log(chalk_1.cyan("No patch files found"));
    }
    else {
        console.log("Applying patches to node_modules...");
    }
    files.forEach(function (filename) {
        var _a = filename.slice(0, -6).split(":"), packageName = _a[0], version = _a[1];
        var packageDir = path.join(appPath, "node_modules", packageName);
        if (!fs.existsSync(packageDir)) {
            console.warn(chalk_1.red("Warning:") + " Patch file found for package " + packageName
                + (" which is not present at " + packageDir));
            return null;
        }
        var packageJson = require(path.join(packageDir, "package.json"));
        try {
            applyPatch(path.resolve(patchesDirectory, filename), packageName);
            if (packageJson.version !== version) {
                printVersionMismatchWarning(packageName, packageJson.version, version);
            }
            else {
                console.log(chalk_1.bold(packageName) + "@" + version + " " + chalk_1.green("✔"));
            }
        }
        catch (e) {
            // completely failed to apply patch
            printPatchApplictionFailureError(packageName, packageJson.version, version, filename);
            process.exit(1);
        }
    });
}
exports.default = findPatchFiles;
function applyPatch(patchFilePath, packageName) {
    try {
        child_process_1.execSync("patch --forward -p1 --no-backup-if-mismatch -i " + patchFilePath);
    }
    catch (e) {
        // patch cli tool has no way to fail gracefully if patch was already applied,
        // so to check, we need to try a dry-run of applying the patch in reverse, and
        // if that works it means the patch was already applied sucessfully. Otherwise
        // the patch just failed for some reason.
        child_process_1.execSync("patch --reverse --dry-run -p1 -i " + patchFilePath);
    }
}
exports.applyPatch = applyPatch;
function printVersionMismatchWarning(packageName, actualVersion, originalVersion) {
    console.warn("\n" + chalk_1.red("Warning:") + " Patch file version mismatch\n\n  Patch file created for\n\n    " + packageName + "@" + chalk_1.bold(originalVersion) + "\n\n  applied to\n\n    " + packageName + "@" + chalk_1.bold(actualVersion) + "\n\n  This is probably OK, but to be safe, please check that your patch still makes\n  sense and fix the patched files if not. Then run\n\n    " + chalk_1.bold("patch-package " + packageName) + "\n\n  to update the patch and make this warning disappear.\n");
}
function printPatchApplictionFailureError(packageName, actualVersion, originalVersion, patchFileName) {
    console.error("\n" + chalk_1.red.bold("**ERROR**") + " " + chalk_1.red("Failed to apply patch for package " + chalk_1.bold(packageName)) + "\n\n  Patch was made for version " + chalk_1.green.bold(originalVersion) + "\n  Meanwhile node_modules/" + chalk_1.bold(packageName) + " is version " + chalk_1.red.bold(actualVersion) + "\n\n  Run:\n\n     " + chalk_1.bold("patch --forward -p1 -i patches/" + patchFileName) + "\n\n  To generate rejection files and see just what the heck happened.\n");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHlQYXRjaGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcGx5UGF0Y2hlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFvRDtBQUNwRCwrQ0FBZ0Q7QUFDaEQsdUJBQXdCO0FBQ3hCLDJCQUE0QjtBQUc1Qix3QkFBdUMsT0FBZTtJQUNwRCxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQ3RELEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUNELElBQU0sS0FBSyxHQUFHLEVBQUU7U0FDYixXQUFXLENBQUMsZ0JBQWdCLENBQUM7U0FDN0IsTUFBTSxDQUFDLFVBQUMsUUFBUSxJQUFLLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUE7SUFFekQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1FBQ2YsSUFBQSxxQ0FBeUQsRUFBeEQsbUJBQVcsRUFBRSxlQUFPLENBQW9DO1FBQy9ELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUVsRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQ1AsV0FBRyxDQUFDLFVBQVUsQ0FBQyxzQ0FBaUMsV0FBYTttQkFDOUQsOEJBQTRCLFVBQVksQ0FBQSxDQUMzQyxDQUFBO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUM7UUFFRCxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUVsRSxJQUFJLENBQUM7WUFDSCxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtZQUVqRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3hFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFJLFlBQUksQ0FBQyxXQUFXLENBQUMsU0FBSSxPQUFPLFNBQUksYUFBSyxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUE7WUFDOUQsQ0FBQztRQUNILENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsbUNBQW1DO1lBQ25DLGdDQUFnQyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUNyRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pCLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUExQ0QsaUNBMENDO0FBRUQsb0JBQTJCLGFBQXFCLEVBQUUsV0FBbUI7SUFDbkUsSUFBSSxDQUFDO1FBQ0gsd0JBQUksQ0FBQyxpREFBaUQsR0FBRyxhQUFhLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNYLDZFQUE2RTtRQUM3RSw4RUFBOEU7UUFDOUUsOEVBQThFO1FBQzlFLHlDQUF5QztRQUN6Qyx3QkFBSSxDQUFDLG1DQUFtQyxHQUFHLGFBQWEsQ0FBQyxDQUFBO0lBQzNELENBQUM7QUFDSCxDQUFDO0FBVkQsZ0NBVUM7QUFFRCxxQ0FBcUMsV0FBbUIsRUFBRSxhQUFxQixFQUFFLGVBQXVCO0lBQ3RHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FDYixXQUFHLENBQUMsVUFBVSxDQUFDLHdFQUlYLFdBQVcsU0FBSSxZQUFJLENBQUMsZUFBZSxDQUFDLGdDQUlwQyxXQUFXLFNBQUksWUFBSSxDQUFDLGFBQWEsQ0FBQyx1SkFLbEMsWUFBSSxDQUFDLG1CQUFpQixXQUFhLENBQUMsaUVBR3pDLENBQUMsQ0FBQTtBQUNGLENBQUM7QUFFRCwwQ0FDRSxXQUFtQixFQUNuQixhQUFxQixFQUNyQixlQUF1QixFQUN2QixhQUFxQjtJQUVyQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQ2QsV0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBSSxXQUFHLENBQUMsdUNBQXFDLFlBQUksQ0FBQyxXQUFXLENBQUcsQ0FBQyx5Q0FFekQsYUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsbUNBQy9CLFlBQUksQ0FBQyxXQUFXLENBQUMsb0JBQWUsV0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsMkJBSTNFLFlBQUksQ0FBQyxvQ0FBa0MsYUFBZSxDQUFDLDZFQUc3RCxDQUFDLENBQUE7QUFDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYmx1ZSwgYm9sZCwgY3lhbiwgZ3JlZW4sIHJlZCB9IGZyb20gXCJjaGFsa1wiXG5pbXBvcnQgeyBleGVjU3luYyBhcyBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIlxuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIlxuaW1wb3J0IHsgZW52IH0gZnJvbSBcInByb2Nlc3NcIlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kUGF0Y2hGaWxlcyhhcHBQYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgcGF0Y2hlc0RpcmVjdG9yeSA9IHBhdGguam9pbihhcHBQYXRoLCBcInBhdGNoZXNcIilcbiAgaWYgKCFmcy5leGlzdHNTeW5jKHBhdGNoZXNEaXJlY3RvcnkpKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgY29uc3QgZmlsZXMgPSBmc1xuICAgIC5yZWFkZGlyU3luYyhwYXRjaGVzRGlyZWN0b3J5KVxuICAgIC5maWx0ZXIoKGZpbGVuYW1lKSA9PiBmaWxlbmFtZS5tYXRjaCgvXi4rOi4rXFwucGF0Y2gkLykpXG5cbiAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnNvbGUubG9nKGN5YW4oXCJObyBwYXRjaCBmaWxlcyBmb3VuZFwiKSlcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcIkFwcGx5aW5nIHBhdGNoZXMgdG8gbm9kZV9tb2R1bGVzLi4uXCIpXG4gIH1cbiAgZmlsZXMuZm9yRWFjaCgoZmlsZW5hbWUpID0+IHtcbiAgICBjb25zdCBbcGFja2FnZU5hbWUsIHZlcnNpb25dID0gZmlsZW5hbWUuc2xpY2UoMCwgLTYpLnNwbGl0KFwiOlwiKVxuICAgIGNvbnN0IHBhY2thZ2VEaXIgPSBwYXRoLmpvaW4oYXBwUGF0aCwgXCJub2RlX21vZHVsZXNcIiwgcGFja2FnZU5hbWUpXG5cbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMocGFja2FnZURpcikpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYCR7cmVkKFwiV2FybmluZzpcIil9IFBhdGNoIGZpbGUgZm91bmQgZm9yIHBhY2thZ2UgJHtwYWNrYWdlTmFtZX1gXG4gICAgICAgICsgYCB3aGljaCBpcyBub3QgcHJlc2VudCBhdCAke3BhY2thZ2VEaXJ9YCxcbiAgICAgIClcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgY29uc3QgcGFja2FnZUpzb24gPSByZXF1aXJlKHBhdGguam9pbihwYWNrYWdlRGlyLCBcInBhY2thZ2UuanNvblwiKSlcblxuICAgIHRyeSB7XG4gICAgICBhcHBseVBhdGNoKHBhdGgucmVzb2x2ZShwYXRjaGVzRGlyZWN0b3J5LCBmaWxlbmFtZSksIHBhY2thZ2VOYW1lKVxuXG4gICAgICBpZiAocGFja2FnZUpzb24udmVyc2lvbiAhPT0gdmVyc2lvbikge1xuICAgICAgICBwcmludFZlcnNpb25NaXNtYXRjaFdhcm5pbmcocGFja2FnZU5hbWUsIHBhY2thZ2VKc29uLnZlcnNpb24sIHZlcnNpb24pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtib2xkKHBhY2thZ2VOYW1lKX1AJHt2ZXJzaW9ufSAke2dyZWVuKFwi4pyUXCIpfWApXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gY29tcGxldGVseSBmYWlsZWQgdG8gYXBwbHkgcGF0Y2hcbiAgICAgIHByaW50UGF0Y2hBcHBsaWN0aW9uRmFpbHVyZUVycm9yKHBhY2thZ2VOYW1lLCBwYWNrYWdlSnNvbi52ZXJzaW9uLCB2ZXJzaW9uLCBmaWxlbmFtZSlcbiAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5UGF0Y2gocGF0Y2hGaWxlUGF0aDogc3RyaW5nLCBwYWNrYWdlTmFtZTogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgZXhlYyhcInBhdGNoIC0tZm9yd2FyZCAtcDEgLS1uby1iYWNrdXAtaWYtbWlzbWF0Y2ggLWkgXCIgKyBwYXRjaEZpbGVQYXRoKVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gcGF0Y2ggY2xpIHRvb2wgaGFzIG5vIHdheSB0byBmYWlsIGdyYWNlZnVsbHkgaWYgcGF0Y2ggd2FzIGFscmVhZHkgYXBwbGllZCxcbiAgICAvLyBzbyB0byBjaGVjaywgd2UgbmVlZCB0byB0cnkgYSBkcnktcnVuIG9mIGFwcGx5aW5nIHRoZSBwYXRjaCBpbiByZXZlcnNlLCBhbmRcbiAgICAvLyBpZiB0aGF0IHdvcmtzIGl0IG1lYW5zIHRoZSBwYXRjaCB3YXMgYWxyZWFkeSBhcHBsaWVkIHN1Y2Vzc2Z1bGx5LiBPdGhlcndpc2VcbiAgICAvLyB0aGUgcGF0Y2gganVzdCBmYWlsZWQgZm9yIHNvbWUgcmVhc29uLlxuICAgIGV4ZWMoXCJwYXRjaCAtLXJldmVyc2UgLS1kcnktcnVuIC1wMSAtaSBcIiArIHBhdGNoRmlsZVBhdGgpXG4gIH1cbn1cblxuZnVuY3Rpb24gcHJpbnRWZXJzaW9uTWlzbWF0Y2hXYXJuaW5nKHBhY2thZ2VOYW1lOiBzdHJpbmcsIGFjdHVhbFZlcnNpb246IHN0cmluZywgb3JpZ2luYWxWZXJzaW9uOiBzdHJpbmcpIHtcbiAgY29uc29sZS53YXJuKGBcbiR7cmVkKFwiV2FybmluZzpcIil9IFBhdGNoIGZpbGUgdmVyc2lvbiBtaXNtYXRjaFxuXG4gIFBhdGNoIGZpbGUgY3JlYXRlZCBmb3JcblxuICAgICR7cGFja2FnZU5hbWV9QCR7Ym9sZChvcmlnaW5hbFZlcnNpb24pfVxuXG4gIGFwcGxpZWQgdG9cblxuICAgICR7cGFja2FnZU5hbWV9QCR7Ym9sZChhY3R1YWxWZXJzaW9uKX1cblxuICBUaGlzIGlzIHByb2JhYmx5IE9LLCBidXQgdG8gYmUgc2FmZSwgcGxlYXNlIGNoZWNrIHRoYXQgeW91ciBwYXRjaCBzdGlsbCBtYWtlc1xuICBzZW5zZSBhbmQgZml4IHRoZSBwYXRjaGVkIGZpbGVzIGlmIG5vdC4gVGhlbiBydW5cblxuICAgICR7Ym9sZChgcGF0Y2gtcGFja2FnZSAke3BhY2thZ2VOYW1lfWApfVxuXG4gIHRvIHVwZGF0ZSB0aGUgcGF0Y2ggYW5kIG1ha2UgdGhpcyB3YXJuaW5nIGRpc2FwcGVhci5cbmApXG59XG5cbmZ1bmN0aW9uIHByaW50UGF0Y2hBcHBsaWN0aW9uRmFpbHVyZUVycm9yKFxuICBwYWNrYWdlTmFtZTogc3RyaW5nLFxuICBhY3R1YWxWZXJzaW9uOiBzdHJpbmcsXG4gIG9yaWdpbmFsVmVyc2lvbjogc3RyaW5nLFxuICBwYXRjaEZpbGVOYW1lOiBzdHJpbmcsXG4pIHtcbiAgY29uc29sZS5lcnJvcihgXG4ke3JlZC5ib2xkKFwiKipFUlJPUioqXCIpfSAke3JlZChgRmFpbGVkIHRvIGFwcGx5IHBhdGNoIGZvciBwYWNrYWdlICR7Ym9sZChwYWNrYWdlTmFtZSl9YCl9XG5cbiAgUGF0Y2ggd2FzIG1hZGUgZm9yIHZlcnNpb24gJHtncmVlbi5ib2xkKG9yaWdpbmFsVmVyc2lvbil9XG4gIE1lYW53aGlsZSBub2RlX21vZHVsZXMvJHtib2xkKHBhY2thZ2VOYW1lKX0gaXMgdmVyc2lvbiAke3JlZC5ib2xkKGFjdHVhbFZlcnNpb24pfVxuXG4gIFJ1bjpcblxuICAgICAke2JvbGQoYHBhdGNoIC0tZm9yd2FyZCAtcDEgLWkgcGF0Y2hlcy8ke3BhdGNoRmlsZU5hbWV9YCl9XG5cbiAgVG8gZ2VuZXJhdGUgcmVqZWN0aW9uIGZpbGVzIGFuZCBzZWUganVzdCB3aGF0IHRoZSBoZWNrIGhhcHBlbmVkLlxuYClcbn1cbiJdfQ==