@echo off
SET ROOT=%cd%

IF EXIST frontend (
    echo 🔹 Pushing frontend...
    cd frontend
    git add .
    git commit -m "frontend updates"
    git push
    cd %ROOT%
) ELSE (
    echo ❌ Frontend folder not found
)

echo ✅ Frontend pushed successfully!
pause