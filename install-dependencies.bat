@echo off
echo Installing Amazon Clone Dependencies...
echo.
echo This will take 2-3 minutes. Please wait...
echo.

cd /d "%~dp0"

npm install

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Now run: npm start
echo.
pause
