#!/bin/bash

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
mvn clean install
cd ..

# Start the frontend
echo "Starting the frontend..."
cd frontend
npm run dev &
cd ..

# Start the backend
echo "Starting the backend..."
cd backend
mvn spring-boot:run
