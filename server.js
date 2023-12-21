const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./database/collections/products');
require('./database/collections/categories');
const productRoutes = require('./api/productRoutes');
const categoryRoutes = require('./api/categoryRoutes');

const app = express();

const port = process.env.PORT; 
const DATABASE = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cors());

//connect to database
mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));


app.get('/', (req, res) => {
    res.send('Hello World');
});



// Routes
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/images', express.static('images'));

app.listen(port, () => console.log(`Server started on port ${port}`));



