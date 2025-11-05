@echo off
echo ========================================
echo Fixing Dependencies and Starting App
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Deleting old node_modules...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo Step 2: Cleaning npm cache...
call npm cache clean --force

echo.
echo Step 3: Installing correct dependencies...
call npm install

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Starting development server...
echo.

call npm start
