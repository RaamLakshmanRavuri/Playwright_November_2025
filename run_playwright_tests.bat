@echo off
npx playwright test tests/Login_CICD_Pipeline.spec.js ^
                     tests/day_1_HomePageTitle.spec.js ^
                     --project=chromium
pause
