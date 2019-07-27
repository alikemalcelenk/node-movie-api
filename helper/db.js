const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb://userava11:userava11@ds139722.mlab.com:39722/movie-api", { useNewUrlParser: true });
  mongoose.connection.on("open", () => {
      console.log("MongoDB : Connected");
  });

    mongoose.connection.on("error", (err) => {
        console.log("MongoDB : Connected", err);
    });


    mongoose.Promise = global.Promise;

};
