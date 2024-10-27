// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
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
app.use('/cart2', require('./routes/Customer/Cart2'));
app.use('/search', require('./routes/Customer/SearchProducts'));

// admin-end routes
app.use("/admintokenauth", require("./routes/Admin/AdminTokenAuth"));
app.use("/adminsignin", require("./routes/Admin/AdminLogin"));
app.use("/adminsignup", require("./routes/Admin/AdminSignup"));
app.use("/adminprofile", require('./routes/Admin/AdminProfile'));
app.use("/orders", require("./routes/Admin/Orders"));
app.use("/traintrips", require("./routes/Admin/TrainTrips"));
app.use("/roadways", require("./routes/Admin/Roadways"));
app.use("/trucks", require("./routes/Admin/Trucks"));
app.use("/drivers", require("./routes/Admin/Drivers"));
app.use("/assistants", require("./routes/Admin/Assistants"));
app.use("/truck-schedules", require("./routes/Admin/TruckSchedule"));
app.use("/products", require("./routes/Admin/Products"));
app.use("/report", require("./routes/Admin/Report"));
app.use("/stores", require("./routes/Admin/Stores"));
app.use("/workinghours", require("./routes/Admin/WorkingHours"));

//driver-and-assistants
app.use("/api/auth", require("./routes/driver-and-assistance/auth"));
app.use("/api/schedule", require("./routes/driver-and-assistance/schedule"));
app.use("/api/profile", require("./routes/driver-and-assistance/profile"));

// Example route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});
