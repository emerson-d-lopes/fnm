@echo off
rem Add /d only when the user didn't pass it themselves, so `cd /d D:\` works (#1556).
rem No if/else parentheses or setlocal here: %* may contain ")" (e.g. "C:\Program Files (x86)"),
rem and endlocal would revert the directory change.
if /i "%~1" == "/d" cd %*
if /i not "%~1" == "/d" cd /d %*
if "%FNM_VERSION_FILE_STRATEGY%" == "recursive" (
  fnm use --silent-if-unchanged
) else (
  if exist .nvmrc (
    fnm use --silent-if-unchanged
  ) else (
    if exist .node-version (
      fnm use --silent-if-unchanged
    )
  )
)
@echo on
