# simple card validation

## Description

A simple application that validates card details during ecommerce checkout

## Requirement

- Frontend: Node 18.17.1 or recent (earlier versions that aren't too old also work)
- Backend: Java 17

## Stack

- Frontend: NodeJs, Typescript, React, Tailwind
- Backend: Java, Spring Boot

## Major Access points

- Base url version 1: `{{protocol}}://{{host}}/api`

### 1. Checkout

- **URL**: `/checkout`
- **Method**: `POST`
- **Description**: Validates card details.
- **Response**: Status: 204 No Content
- **Response**: Status: 400 BadRequest

```json
{
    "path": "/checkout",
    "message": [
        "Invalid Card Number: Inaccurate PAN",
        ...
    ],
    "statusCode": 400,
    "localDateTime": "2023-09-23T16:14:30.98043"
}
```

## Local Set UP

### 1. Install Dependencies (Do Once)

- clone the repository and open a terminal window in the directory the application is set
- if you are on a Linux/macOS setup, run the command `chmod +x install.sh` to make the script executable, followed by the command `./install.sh`
- if you are on a Windows setup, run the command `install.bat`
- this will install both frontend and backend dependencies

### 2. Start the Application

- open a terminal window in the directory the application is set
- ensure port 3000 and 8080 are available
- if you are on a Linux/macOS setup, run the command `chmod +x start.sh` to make the script executable, followed by the command `./start.sh`
- if you are on a Windows setup, run the command `start.bat`
- this will start the frontend application on port 3000 and the backend on port 8080
- Use ctrl + C to stop the application

## Access

To access the frontend application, navigate to localhost:3000 after starting the application. For the backend application, the endpoint can be accesed from localhost:8080/api

## Author

- Ibrahim Yakubu [@yakubu-encentral](https://github.com/yakubu-encentral)

LevelUp Assessment 2023
