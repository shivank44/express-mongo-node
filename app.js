const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.hr5jk.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(()=> {
        console.log("DB Connected")
    }); 




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./src/routes/index');
app.use('/api',routes);

const PORT = process.env.NODE_ENV || process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server running on PORT ${PORT}`));