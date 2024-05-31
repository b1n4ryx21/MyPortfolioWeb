const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const compression = require("compression");
const app = express();


app.use(express.static("public"));

app.use(cors());

app.use(compression());


app.use(helmet({
    crossOriginResourcePolicy: {
        policy: 'cross-origin'
    },
    contentSecurityPolicy: {
        directives: {
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            "style-src": ["'self'", "'unsafe-inline'"]
        }
    }
}));

app.use(session({
    name: "tm-port-test.sid",
    secret: process.env.INITIAL_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        name: "tm-port-g-001",
        maxAge: 31536000000 * 12 // 12 months
    }
}))



app.get("/notfound", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "404.html"));
})


app.get("/servererror", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "500.html"));
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "index.html"));
})

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "index.html"));
})

app.use("/gsap", express.static("/node_modules/gsap/dist"));

app.all("*", (req, res, next) => {
    const err = new Error(`Cannot find ${req.originalUrl} on the server`);
    err.status = "fail";
    err.statusCode = 404;
    next(err);
})

app.use((error, req, res, next) => {
    if (error.statusCode == 404) {
        error.statusCode = error.statusCode;
        error.status = error.status || "error";
        res.status(error.statusCode).redirect("/notfound");
    } else {
        error.statusCode = 500;
        error.status = "Internal Server Error";
        res.status(error.statusCode).redirect("/servererror");
    }
})



app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));