import { green } from "chalk"
import { execSync as exec } from "child_process"
import * as fs from "fs"
import * as path from "path"
import * as rimraf from "rimraf"
import * as shellEscape from "shell-escape"
import * as tmp from "tmp"

export default function makePatch(packageName: string, appPath: string) {
  const nodeModulesPath = path.join(appPath, "node_modules")
  const packagePath = path.join(nodeModulesPath, packageName)
  const packageJsonPath = path.join(packagePath, "package.json")
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`Unable to find local ${packageName} package.json at ${packageJsonPath}`)
  }

  const packageVersion = require(packageJsonPath).version

  const tmpRepo = tmp.dirSync({ unsafeCleanup: true })
  const tmpRepoNodeModulesPath = path.join(tmpRepo.name, "node_modules")
  const tmpRepoPackagePath = path.join(tmpRepoNodeModulesPath, packageName)

  try {
    const patchesDir = path.join(appPath, "patches")

    if (!fs.existsSync(patchesDir)) {
      fs.mkdirSync(patchesDir)
    } else {
      // remove exsiting patch for this package, if any
      fs.readdirSync(patchesDir).forEach((fileName) => {
        if (fileName.startsWith(packageName + ":")) {
          console.log("removing", path.join(patchesDir, fileName))
          fs.unlinkSync(path.join(patchesDir, fileName))
        }
      })
    }

    const tmpExec = (cmd: string) => exec(cmd, { cwd: tmpRepo.name })
    // reinstall a clean version of the user's node_modules in our tmp location
    exec(shellEscape(["cp", path.join(appPath, "package.json"), tmpRepo.name]))
    exec(shellEscape(["cp", path.join(appPath, "yarn.lock"), tmpRepo.name]))
    tmpExec(`yarn`)

    // commit the package
    fs.writeFileSync(path.join(tmpRepo.name, ".gitignore"), "!/node_modules\n")
    tmpExec(`git init`)
    tmpExec(shellEscape(["git", "add", "-f", path.join("node_modules", packageName)]))
    tmpExec(`git commit -m init`)

    // replace package with user's version
    rimraf.sync(tmpRepoPackagePath)
    exec(shellEscape(["cp", "-R", packagePath, tmpRepoPackagePath]))

    // add their files to the index
    tmpExec(shellEscape(["git", "add", "-f", path.join("node_modules", packageName)]))
    // get diff of changes
    const patch = tmpExec(`git diff HEAD`).toString()

    if (patch.trim() === "") {
      console.warn(`⁉️  Not creating patch file for package '${packageName}'`)
      console.warn(`⁉️  There don't appear to be any changes.`)
    } else {
      const patchFileName = `${packageName}:${packageVersion}.patch`
      fs.writeFileSync(path.join(patchesDir, patchFileName), patch)
      console.log(`Created file patches/${patchFileName} ${green("✔")}`)
    }
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    tmpRepo.removeCallback()
  }
}
