@echo off
cd "C:\Users\果\WeChatProjects\miniprogram-2"
echo Current directory: %cd%
git add .
set /p msg=Enter commit message (press Enter to auto generate):
if "%msg%"=="" (
    for /f "tokens=1-3 delims=-/ " %%a in ("%date%") do (
        set commitDate=%%a-%%b-%%c
    )
    set msg=Auto commit on %commitDate%
)
git commit -m "%msg%"
git push origin main 
if %errorlevel%==0 (
    echo  Push successful!
) else (
    echo  Push failed. Please check your network or credentials.
)
pause
