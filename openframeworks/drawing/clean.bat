@echo off

set BACK=%~dp0
cd %BACK%

for %%a in (.) do set CDIR=%%~nxa

del %CDIR%.sln
del %CDIR%.vcxproj
del %CDIR%.vcxproj.filters
del %CDIR%.vcxproj.user
del icon.rc
del Makefile
del addons.make
del config.make
del openFrameworks-Info.plist
del Project.xcconfig

rd /s /q .vs
rd /s /q bin
rd /s /q %CDIR%.xcodeproj
rd /s /q obj

@pause