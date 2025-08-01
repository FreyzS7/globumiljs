@echo off
echo ========================================
echo Globumil Frontend Build Script
echo ========================================
echo.

:: Navigate to fe directory
cd /d "%~dp0\fe"

:: Step 1: Clean previous build
echo [1/2] Cleaning previous build...
if exist .next (
    rmdir /s /q .next
    echo .next directory removed
)
if exist out (
    rmdir /s /q out  
    echo out directory removed
)

:: Step 2: Build the project
echo.
echo [2/2] Building project...
call npm run build

:: Check if build was successful
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build completed successfully!
echo ========================================
echo.
pause