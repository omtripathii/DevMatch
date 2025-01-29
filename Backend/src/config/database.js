const mongoose = require("mongoose")

const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://om_tripathi:302002forMONGO111@res-2025.ejoo0.mongodb.net/DevMatch')
}
module.exports = connectDB
