@echo off

rem Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
npm install
cd ..

rem Install backend dependencies
echo Installing backend dependencies...
cd backend
mvn clean install
cd ..
