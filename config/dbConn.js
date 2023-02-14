const mongoose = require('mongoose')

const connectDB = async ()=>{
  try{
    await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  }catch(err){
    console.error(err.message)
  }
}

module.exports = connectDB;