const express = require("express");
const app = express();
const compression = require("compression"); //compress responses (make them as small as possible)

app.use(compression());

if (process.env.NODE_ENV != "production") {
    //tell local development server what to do
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    //if e.g. deployed on heroku
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("*", function(req, res) {
    //Do not delete this line of code !!!
    //this code is kicking of the react project
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
