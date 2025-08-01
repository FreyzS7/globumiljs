@echo off
REM Remove .next folder to disable caching
if exist fe\.next (
    rmdir /s /q fe\.next
)

REM Run build command inside fe folder
cd fe
call node bake.js
call node fetch.js
call npm run build
cd ..

REM Create a temporary folder for zipping
if exist fe_temp (
    rmdir /s /q fe_temp
)
mkdir fe_temp

REM Copy all files except node_modules and zip files to temp folder
robocopy fe fe_temp /E /XD node_modules /XF *.zip

REM Create zip from temp folder
powershell -Command "Compress-Archive -Path fe_temp\* -DestinationPath fe.zip -Force"

REM Remove temporary folder
rmdir /s /q fe_temp
