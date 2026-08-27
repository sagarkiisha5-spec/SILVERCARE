@echo off
title SilverCare GitHub Push Tool
color 0A
echo ========================================================
echo   SILVERCARE INDIA - AUTOMATED GITHUB PUSH TOOL
echo ========================================================
echo.
echo Pushing 89 updated project files to GitHub (yourhousingpartners-create/silvercare)...
echo.

"C:\Users\pc\.gemini\git\cmd\git.exe" push origin main --force

echo.
echo ========================================================
echo   SUCCESS! ALL FILES HAVE BEEN PUSHED TO GITHUB!
echo   Netlify is now automatically building your live site.
echo ========================================================
echo.
pause
