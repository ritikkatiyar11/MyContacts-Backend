const express = require('express')
require('dotenv').config()
const app = express();
const errorHandler = require('./middleware/errorHandler')
const dbConnection=require('./config/dbConnection')
//middlewares
app.use(express.json());
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/contacts', require('./routes/contactRoutes'))

app.use(errorHandler)


app.listen(process.env.PORT, () => {
    console.log("server is  running");
    dbConnection();
    
})



