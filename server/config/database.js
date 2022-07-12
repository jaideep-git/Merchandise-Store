const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log('DATABASE CONNECTED');
        })
        .catch(err => {
            console.log(err)
        });
};

module.exports = connectDatabase;
