@echo off
:: Set environment variable for Flask
set FLASK_APP=src\main.py

:: Activate the virtual environment
call %USERPROFILE%\.virtualenvs\Backend-ijp2jbTi\Scripts\activate

:: Run Flask server
flask run -h 0.0.0.0