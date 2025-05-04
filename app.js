const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
const connectToDB = require('./config/db'); // Import the database connection function
connectToDB(); // Call the function to connect to the database
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index.routes');




dotenv.config(); // Load environment variables from .env file

const app = express();

app.set('view engine', 'ejs');
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json()); // Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data


app.use('/', indexRouter); // Use the index router for the root path
app.use('/user', userRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})