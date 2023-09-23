@echo off

rem Start the frontend
echo Starting the frontend...
cd frontend
start npm run dev
cd ..

rem Start the backend
echo Starting the backend...
cd backend
start mvn spring-boot:run
