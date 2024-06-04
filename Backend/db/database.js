const mongoose = require("mongoose")

const connectDB = () =>{
    mongoose.connect(`mongodb://0.0.0.0:27017/practice_project`)
    .then(()=> console.log("Database connected succesfully"))
    .catch((err)=> console.log(err));
}

module.exports = connectDB;