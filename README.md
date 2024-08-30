# SCM Project

## Description
This project is part of Group 40's Database System Project. It consists of a React frontend (`customer-end`) and a Node.js backend (`back-end`). The project is set up to manage both frontend and backend servers effectively.

## Project Structure
- **Root Directory**: Contains the main project files, including the primary `package.json`.
- **`customer-end` Directory**: Contains the React frontend application.
- **`back-end` Directory**: Contains the Node.js backend application.

## Installation

Before running the project, ensure all required dependencies are installed in the appropriate directories.

### Steps to Install:
1. **Install Root Dependencies**:
    ```bash
    npm install
    ```
2. **Install Frontend Dependencies**:
    Navigate to the `customer-end` directory and install dependencies:
    ```bash
    cd customer-end
    npm install
    cd ..
    ```
3. **Install Backend Dependencies**:
    Navigate to the `back-end` directory and install dependencies:
    ```bash
    cd back-end
    npm install
    cd ..
    ```

## Running the Application

### Frontend
To start the React frontend server on `localhost:3000`, use the following command from the root directory:
```bash
npm run customerend
```

### Backend
To start the backend server on `localhost:9000`, use the following command from the root directory:
```bash
npm run backend
```
### Backend
To start the all servers concurrently at once, use the following command from the root directory:
```bash
npm start
```