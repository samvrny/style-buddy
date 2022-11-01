const mongoose = require('mongoose');

<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/style-buddies', {
=======

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/style-friend', {
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;