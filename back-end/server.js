// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Customer-end routes
app.use('/signin', require('./routes/Customer/Login'));
app.use('/signup', require('./routes/Customer/Signup'));
app.use('/tokenauth', require('./routes/TokenAuth'));
app.use('/profile', require('./routes/Customer/Profile'));
app.use('/getcategories', require('./routes/Customer/ProductCategories'));
app.use('/getproducts', require('./routes/Customer/Products'));
app.use('/getproductdetails', require('./routes/Customer/ProductDetails'));
app.use('/cart', require('./routes/Customer/Cart'));
app.use('/search', require('./routes/Customer/SearchProducts'));

// admin-end routes
app.use('/adminsignin', require('./routes/Admin/AdminLogin'));
app.use('/adminsignup', require('./routes/Admin/AdminSignup'));
app.use('/orders', require('./routes/Admin/getPendingOrders'));
app.use('/traintrips', require('./routes/Admin/getTrainTrips'));

// Example route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});
