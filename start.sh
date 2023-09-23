#!/bin/bash

# Start the frontend
echo "Starting the frontend..."
cd frontend
npm run dev &
cd ..

# Start the backend
echo "Starting the backend..."
cd backend
mvn spring-boot:run
