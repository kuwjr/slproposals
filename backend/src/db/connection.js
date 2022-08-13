const mongoose = require('mongoose');

try {
  module.exports = mongoose.connect(
    `mongodb+srv://casper:meow@slproposals-db-cluster.qm8g99r.mongodb.net/?retryWrites=true&w=majority`,
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