@echo off
:: Auto push to GitHub - fixed version for Windows Chinese paths
:: by Victoria 

:: Force change directory to project folder
cd "C:\Users\果\WeChatProjects\miniprogram-2"

:: Show current directory
echo Current directory: %cd%

:: Add all changes
git add .

:: Ask for commit message
set /p msg=Enter commit message (press Enter to auto generate):
if "%msg%"=="" (
    for /f "tokens=1-3 delims=-/ " %%a in ("%date%") do (
        set commitDate=%%a-%%b-%%c
    )
    set msg=Auto commit on %commitDate%
)
git commit -m "%msg%"

:: Push to main branch
git push origin main

:: Show result
if %errorlevel%==0 (
    echo  Push successful!
) else (
    echo  Push failed. Please check your network or branch name.
)
pause
