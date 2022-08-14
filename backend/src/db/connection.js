const mongoose = require('mongoose');

try {
  module.exports = mongoose.connect(
    `mongodb://casper:meow@mongodb:27017/admin`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err)=>{
      if (err) console.log("POOSH: " + err)
    }
  )
} catch (e) {
  console.log("I FOUND THE ERROR: " + e)
}