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

rem Start the frontend
echo Starting the frontend...
cd frontend
start npm run dev
cd ..

rem Start the backend
echo Starting the backend...
cd backend
start mvn spring-boot:run
