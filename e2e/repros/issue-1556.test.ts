import { writeFile, mkdir } from "node:fs/promises"
import { join } from "node:path"
import { script } from "../shellcode/script.js"
import { WinCmd } from "../shellcode/shells.js"
import testCwd from "../shellcode/test-cwd.js"
import testNodeVersion from "../shellcode/test-node-version.js"
import describe from "../describe.js"

describe(WinCmd, () => {
  test(`issue #1556: cd /d works with use-on-cd`, async () => {
    const subdir = join(testCwd(), "subdir")
    await mkdir(subdir, { recursive: true })
    await writeFile(join(subdir, ".node-version"), "v12.22.12")
    await script(WinCmd)
      .then(WinCmd.env({ useOnCd: true }))
      .then(WinCmd.call("fnm", ["install", "v8.11.3"]))
      .then(WinCmd.call("fnm", ["install", "v12.22.12"]))
      .then(WinCmd.call("cd", ["/d", subdir]))
      .then(testNodeVersion(WinCmd, "v12.22.12"))
      .execute(WinCmd)
  })
})
