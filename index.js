const express = require("express");
const app = express();
const compression = require("compression"); //compress responses (make them as small as possible)
const port = 8080;
//const cookieSession = require("cookie-session");
const { getHashPassword,addUser, getUser, addImage, editBio, getRecentUsers, getAllUsers, findPeople, getFriendshipStatus, makeFriendship, cancelFriendship, acceptFriendship, findFriendsAndWannabes, getLastTenChatMessages} = require("./db");
const { hash, auth, compare } = require("./bcrypt");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const { s3Url } = require("./config");
//
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });//and domainname, ip...
//

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 4097152
    }
});

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
/*
app.use(
    cookieSession({
        secret: `${secrets.secret}`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
*/
//
const cookieSession = require('cookie-session');
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

//
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
    let { email, password } = req.body;
    let savedPswd, userId;

    getHashPassword(email)
        .then(result => {
            savedPswd = result.rows[0].password;
            userId = result.rows[0].id;
            return compare(password, savedPswd);
        })
        .then(isMatch => {
            if (isMatch) {
                req.session.userId = userId;
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});
app.post("/upload", uploader.single("image"), s3.upload, (req, res) => {
    const url = `${s3Url}${req.file.filename}`;
    addImage(req.session.userId, url)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/user", (req, res) => {
    getUser(req.session.userId).then(({ rows }) => {
        res.json(rows[0]);
    });
});

app.get("logout", function(req, res) {
    req.session.userId = null;
    res.redirect("/");
});

app.post("/editbio", (req, res) => {
    editBio(req.session.userId, req.body.bio)
        .then(({ rows }) => {
            // console.log("editbio:", rows);
            res.json(rows[0]);
        })
        .catch(err => {
            console.log("editbio", err);
            res.sendStatus(500);
        });
});

app.get("/api/user/:id", async (req, res) => {
    //console.log("session", req.session.userId);
    //console.log("params", req.params.id);
    if(req.session.userId == req.params.id){   
        console.log("same");
        res.json({data:true});
    }else {
        console.log("notsame");  
        try {
            const { rows } = await getUser(req.params.id);
            res.json(rows[0]);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}
);

app.get("/users/recent", async (req, res) => {
    try {
        const { rows } = await getRecentUsers(req.session.userId);
        // console.log(rows);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
);

app.get("/users/all", async (req, res) => {
    try {
        const { rows } = await getAllUsers();
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
);

app.get("/api/users/:input", (req, res) => {
    findPeople(req.session.userId,req.params.input).then(({ rows }) => {
        //  console.log(rows);
        res.json(rows);
    }).catch(err => {
        console.log("users:input", err);
        res.sendStatus(500);
    });
});

app.get("/user/:id/status", (req, res) => {
    //  console.log("session", req.session.userId);
    //  console.log("params", req.params.id);
    getFriendshipStatus(req.session.userId,Number(req.params.id)).then(({ rows }) => {
        // console.log("status rows", rows);
        // console.log(">>", rows[0]);
        if (!rows[0]) {
            res.json({ relation: false });
        } else {
            if (rows[0].accepted) {
                res.json({ relation: true, friends: true });
            } else {
                res.json({ rows, relation: true, friends: false });
            }
        }
    });
});

app.post("/send-fr/:id", (req, res) => {
    makeFriendship(req.session.userId, Number(req.params.id))
        .then(({ data }) => {
            // console.log("makefriendship:", rows);
            res.json({ relation: true })
        })
        .catch(err => {
            console.log("makefriend", err);
            res.sendStatus(500);
        });
});

app.post("/cancel-fr/:id", (req, res) => {
    cancelFriendship(req.session.userId, Number(req.params.id))
        .then(({ data }) => {
            // console.log("cancelfriendship:", data);
            res.json({ relation: false });
        })
        .catch(err => {
            console.log("cancelfriend", err);
            res.sendStatus(500);
        });
});

app.post("/accept-fr/:id", (req, res) => {
    acceptFriendship(req.session.userId, Number(req.params.id))
        .then(({ data }) => {
            // console.log("acceptfriendship:", data);
            res.json({ friend: true });
        })
        .catch(err => {
            console.log("acceptfriend", err);
            res.sendStatus(500);
        });
});

app.get("/friends-wannabes", async (req, res) => {
    try {
        const { rows } = await findFriendsAndWannabes(req.session.userId);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
);

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});


let socketIdOfRecipient = 201;//for testing testing
app.post("/friend-request", function(req,res){
    io.sockets.sockets[socketIdOfRecipient].emit("newFriendRequest");
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

//app.listen(port, function() {
server.listen(port, function() { // to enable socket.io
    console.log("I'm listening.");
});

const onlineUsers = {};

io.on("connection", socket =>{
    console.log(`A socket with the id ${socket.id} just connected`
    );
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const {userId} = socket.request.session;
    onlineUsers[socket.id] = userId;//idea for online user bonus feature, keep them in an array, integrate it in chat
//Object.values method, Object.keys, or Object.entries


    /*
    socket.on("iAmHere", data => {
        console.log(data);
        socket.emit("good to see you", {
            message : "you look marvelous"
        });
  
        socket.broadcast.emit("somebodyNew"); //to everybody
    });

    // we want to get the last 10 chat messages...
 
    */
   
    getLastTenChatMessages().then(data=>{
        // io.sockets.emit("chatMessages", data.rows);
    });

    socket.on("My amazing chat message", function(msg){
        console.log("message", msg);
        io.sockets.emit("new chat message from the server", msg);
    });

    socket.on("newMessage",function(newMessage){
        // do stuff in here ....
        // we want to find out info about user who sent message
        // we want to emit this message Object
        // we also want to store it in the DB.
    });

    socket.on("disconnect", ()=>{
        delete onlineUsers[socket.io];
        console.log(`A socket with the id ${socket.id} just disconnected`);
    });
});