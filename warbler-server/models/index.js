const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_CONNECTION, {
    keepAlive: true,
    useMongoClient: true
});