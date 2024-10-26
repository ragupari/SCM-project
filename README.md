<div align="center">
<h1 align="center">Supply Chain Management System</h1>
  <p align="center">
    <a href="https://serenehills.netlify.app/">View Client</a>
    ·
    <a href="https://sereneadmin.netlify.app/">View Admin</a>
  </p>
</div>

## Description
This project is part of Group 40's Database System Project. It consists of a React frontend (`customer-end`) and a Node.js backend (`back-end`). The project is set up to manage both frontend and backend servers effectively.

## Project Structure
- **admin**: The admin panel for managing supply chain operations.
- **back-end**: The backend API for handling database operations and business logic.
- **customer-end**: The customer-facing interface for placing orders and tracking shipments.
- **database**: Database files and configuration for storing SCM data.

### Built With
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" alt="nodejs" height="40"/> </a>
<a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
<img src="https://www.svgrepo.com/show/349330/css3.svg" alt="CSS3" width="40" />

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
4. **Install Admin Dependencies**:
    Navigate to the `admin` directory and install dependencies:
    ```bash
    cd admin
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

### Admin
To start the admin frontend on `localhost:5174`, use the following command from the root directory:
```bash
npm run adminend
```

### All
To start the all servers concurrently at once, use the following command from the root directory:
```bash
npm start
```
