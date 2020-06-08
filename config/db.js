const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env['mongoURI'], {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });
            console.log('mongo');
            
    } catch(err){
        console.error(err.message);
        process.exit(1)
    }

};

module.exports = connectDB;