const express = require("express");
const loader = require("./loader");
const DataBase = require("./database");
const port = require("./config").app.port;
const mongoPort = require("./config").app.mongoPort;
const app = express();
const cronJob = require("cron").CronJob;
const service = require("../src/services/user");
const mongoose = require("mongoose");

app.use(loader);

async function start(){

    await DataBase.connect();

    await mongoose.connect(
        `mongodb://localhost:${mongoPort}/e_shop_logs`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    app.listen(port, () => console.log(`Server started at port ${port}`));

    new cronJob('* */5 * * * *', service.automaticDelete).start();
}

start();

module.exports = app;
