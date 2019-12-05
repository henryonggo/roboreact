@echo off
setlocal
:PROMPT
echo WARNING: Running this script will delete all files related to the react build process.
echo Note 1: Also make sure this script is in the same directory as the react build files.
echo Note 2: Due to issues with deleting files within the CaseWare install location, the quiet promt had to be turned off, so just accept all prompts that are given.
SET /P AREYOUSURE=Are you sure you want to do this (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

echo Deleting react build files...

del ".\asset-manifest.json" "favicon.ico" "index.html" "manifest.json" "precache-manifest.*.js" "service-worker.js" /s /f
del ".\static" /s /f
rmdir ".\static" /s
del ".\AuditIntWorkflow" /s /f
rmdir ".\AuditIntWorkflow" /s

echo Cleanup completed!

pause

:END
endlocal