const express = require("express");
const app = express();
const compression = require("compression"); //compress responses (make them as small as possible)
const port = 8080;
const cookieSession = require("cookie-session");
const { addUser, getUser } = require("./db");
const { hash, auth } = require("./bcrypt");
const csurf = require("csurf");

app.use(compression());
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);

let secrets;
process.env.NODE_ENV === "production"
    ? (secrets = process.env)
    : (secrets = require("./secrets"));

app.use(
    cookieSession({
        secret: `${secrets.secret}`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

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

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;
    console.log("reqbody", req.body);
    hash(password)
        .then(password => {
            return addUser(first, last, email, password);
        })
        .then(result => {
            const { user_id: userId } = result.rows[0];
            //req.session.user = { userId, first, last, email };
            req.session.userId = userId;
            res.json({
                success: true
            });
        })
        .catch(err => {
            console.log("post-register-error", err);
            res.sendStatus(500);
        });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    auth(email, password)
        .then(auth => {
            return !auth
                ? Promise.reject(new Error("Incorrect password"))
                : getUser(email);
        })
        .then(result => {
            const { user_id: userId } = result.rows[0];
            req.session.userId = userId;
            //const { user } = req.session;
            res.json({
                success: true
            });
        })
        .catch(err => {
            console.log(err);
            res.render("login", { error: true, err });
        });
});

//* is a fallthrough route
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
    //Do not delete this line of code !!!
    //this code is kicking off the react project
});

app.listen(port, function() {
    console.log("I'm listening.");
});
