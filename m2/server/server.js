const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const tourRoute = require('../server/Routers/tourRoute');
const hotelRoute = require('../server/Routers/hotelRoute');
const customerRoute = require('./Routers/customerRoute');
const userRoute = require('./Routers/userRoute');
const feedbackRoute = require('./Routers/feedbackRoute');
const qnaRoute = require('./Routers/qnaRoute');

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

// CONNECTION ESTABLISHMENT
const MONGO_URL = 'mongodb+srv://<name>:<password>@cluster0.wimrqde.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));


// CONTROLLERS -> PATH OF ROUTER
app.use('/api/tour',tourRoute);
app.use('/api/hotel',hotelRoute);
app.use('/api/customer', customerRoute);
app.use('/api/user', userRoute);
app.use('/api/feedback', feedbackRoute);
app.use('/api/qna', qnaRoute);



// STARTING OF SERVER
app.listen(5000, ()=> {
    console.log("Server is running on port 5000");
});

app.get('/',(req , res)=> {
    res.send("First node server");
})
