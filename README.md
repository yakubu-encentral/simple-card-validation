# simple card validation

## Description

A simple application that validates card details during ecommerce checkout

## Stack

- Frontend: NodeJs, Typescript, React, Tailwind
- Backend: Java, Spring Boot

## Major Access points

- Base url version 1: `{{protocol}}://{{host}}/api/v1`

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

### First time

- clone the repository and open a terminal window in the directory the application is set
- ensure port 3000 and 8080 are available
- if you are on a Linux/macOS setup, run the command `chmod +x install.sh` to make the script executable, followed by the command `./install.sh`
- if you are on a Windows setup, run the command `install.bat`
- This will install both frontend and backend dependencies and start the applications on port 3000 and port 8080 for the frontend and backend respectively

### Other times

- open a terminal window in the directory the application is set
- ensure port 3000 and 8080 are available
- if you are on a Linux/macOS setup, run the command `chmod +x start.sh` to make the script executable, followed by the command `./start.sh`
- if you are on a Windows setup, run the command `start.bat`
- This will start the frontend application on port 3000 and the backend on port 8080

## Access

To access the frontend application, navigate to localhost:3000 after starting the application. For the backend application, the endpoint can be accesed from localhost:8080/api/v1

## Author

- Ibrahim Yakubu [@yakubu-encentral](https://github.com/yakubu-encentral)

LevelUp Assessment 2023
