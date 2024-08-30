const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Set your own connection limit
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Project'
});
console.log('Connected to database');
// Export the pool to be used in your routes
module.exports = pool;
