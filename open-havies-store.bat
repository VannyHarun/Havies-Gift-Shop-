
@echo off
title Havie's Gift Shop - Launching...
echo.
echo  ============================================
echo     Havie's Gift Shop - Online Catalog
echo  ============================================
echo.
echo  Opening Havie's Gift Shop in your browser...
echo  WhatsApp: +254 745 731 397
echo  Instagram: @haviesgiftshop
echo.
start "" "%~dp0index-standalone.html"
echo  Done! Your browser should open now.
echo.
timeout /t 3 >nul
