@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

rem ============================================================
rem  backup_and_delete.bat
rem
rem  ファイルやフォルダをこの bat にドラッグ&ドロップすると、
rem  1) このスクリプトと同じ階層の backup フォルダにコピーし
rem  2) コピーが成功したことを確認したうえで元のファイル/フォルダを削除
rem  します。
rem
rem  使い方: エクスプローラーでファイル/フォルダをこの .bat の
rem          アイコンにドラッグ&ドロップするだけ。
rem  複数のファイル/フォルダを同時にドロップすることもできます。
rem ============================================================

if "%~1"=="" (
    echo [使い方] このバッチファイルにファイルまたはフォルダをドラッグ^&ドロップしてください。
    pause
    exit /b 1
)

set "SCRIPT_DIR=%~dp0"
set "BACKUP_ROOT=%SCRIPT_DIR%backup"

if not exist "%BACKUP_ROOT%" (
    mkdir "%BACKUP_ROOT%"
)

rem タイムスタンプ付きサブフォルダを作成 (例: 20260826_153045)
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set "DATE_PART=%%a%%b%%c"
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set "TIME_PART=%%a%%b"
set "TIMESTAMP=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
set "TIMESTAMP=%TIMESTAMP: =0%"
set "DEST_DIR=%BACKUP_ROOT%\%TIMESTAMP%"

mkdir "%DEST_DIR%" >nul 2>&1

echo.
echo バックアップ先: %DEST_DIR%
echo.

:loop
if "%~1"=="" goto :done

set "ITEM=%~1"
set "ITEM_NAME=%~nx1"

if exist "%ITEM%\" (
    echo [フォルダ] %ITEM_NAME% をバックアップ中...
    robocopy "%ITEM%" "%DEST_DIR%\%ITEM_NAME%" /E /COPY:DAT /R:1 /W:1 >nul
    if !errorlevel! GEQ 8 (
        echo   -^> バックアップに失敗しました。このフォルダは削除しません: %ITEM%
    ) else (
        echo   -^> バックアップ完了。元のフォルダを削除します: %ITEM%
        rmdir /s /q "%ITEM%"
    )
) else if exist "%ITEM%" (
    echo [ファイル] %ITEM_NAME% をバックアップ中...
    copy /y "%ITEM%" "%DEST_DIR%\%ITEM_NAME%" >nul
    if not exist "%DEST_DIR%\%ITEM_NAME%" (
        echo   -^> バックアップに失敗しました。このファイルは削除しません: %ITEM%
    ) else (
        echo   -^> バックアップ完了。元のファイルを削除します: %ITEM%
        del /f /q "%ITEM%"
    )
) else (
    echo [スキップ] 見つかりません: %ITEM%
)

shift
goto :loop

:done
echo.
echo すべて完了しました。
pause
