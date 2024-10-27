const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        const connection= await mongoose.connect(process.env.connection_string);
        console.log('Database connected...');
        
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports=dbConnection;
