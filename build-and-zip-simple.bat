@echo off
echo ========================================
echo Globumil Frontend Build and Zip Script (Simple)
echo ========================================
echo.

:: Navigate to fe directory
cd fe

:: Step 1: Clean previous build cache
echo [1/3] Cleaning .next cache...
if exist .next (
    rmdir /s /q .next
    echo .next directory removed
) else (
    echo .next directory does not exist
)

:: Step 2: Build the project
echo.
echo [2/3] Building project...
call npm run build

:: Check if build was successful
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo Build completed successfully!

:: Step 3: Create zip file
echo.
echo [3/3] Creating zip file...

:: Go back to project root
cd ..

:: Delete old zip if exists
if exist globumil-frontend.zip (
    del globumil-frontend.zip
    echo Old zip file removed
)

:: Create a temporary file with exclusion list
echo .next\ > exclude.txt
echo .git\ >> exclude.txt
echo .env.local >> exclude.txt
echo .env.development.local >> exclude.txt
echo .env.test.local >> exclude.txt
echo .env.production.local >> exclude.txt
echo npm-debug.log* >> exclude.txt
echo yarn-debug.log* >> exclude.txt
echo yarn-error.log* >> exclude.txt
echo package-lock.json >> exclude.txt
echo yarn.lock >> exclude.txt

:: Use PowerShell to create zip (Windows built-in)
echo Creating zip file...
powershell -Command "& {Add-Type -A 'System.IO.Compression.FileSystem'; $source = 'fe'; $destination = 'globumil-frontend.zip'; $exclude = Get-Content 'exclude.txt'; $tempDir = New-TemporaryFile | %% { Remove-Item $_; New-Item -ItemType Directory -Path $_ }; Get-ChildItem -Path $source -Recurse | Where-Object { $exclude -notcontains $_.Name -and $_.FullName -notmatch ($exclude -join '|').Replace('\', '\\') } | ForEach-Object { $dest = $_.FullName.Replace((Resolve-Path $source).Path, $tempDir.FullName); if ($_.PSIsContainer) { New-Item -Path $dest -ItemType Directory -Force | Out-Null } else { New-Item -Path (Split-Path $dest -Parent) -ItemType Directory -Force | Out-Null; Copy-Item -Path $_.FullName -Destination $dest } }; [System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir.FullName, $destination); Remove-Item -Recurse -Force $tempDir}"

:: Clean up
del exclude.txt

echo.
echo ========================================
echo Build and zip completed!
echo Output: globumil-frontend.zip
echo ========================================
echo.
pause
