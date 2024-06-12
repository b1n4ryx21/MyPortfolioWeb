require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const compression = require("compression");
const mongoose = require("mongoose");
const csurf = require("express-csurf");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

const port = process.env.PORT || 3000;
// mongoose.connect(process.env.DB_URI, {
//     dbName: process.env.DB_NAME
// }).then(
//     console.log("Connected to Database")
// ).catch((err) => {
//     console.error(err)
// })

app.use(express.static("public"));

app.use(cors());
// app.use(csurf())
app.use(compression());
app.use(express.json())

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
    name: "tm-port.sid",
    secret: process.env.INITIAL_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        name: "tm-port-g-001",
        maxAge: 31536000000 * 2 // 2 months
    }
}))



router.get("/notfound", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "404.html"));
})


router.get("/servererror", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "500.html"));
})

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "index.html"));
})

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "index.html"))
})

// app.use("/gsap", express.static("./node_modules/gsap/dist"));



// API calls
// const userAuth = require("./routes/userAuth");
// app.use("/tmws/api/", userAuth)

// Error Handling
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

// Routing attachment
app.use('/', router);


module.exports = app;
module.exports.handler = serverless(app);


// app.listen(port, () => console.log(`Server is listening on port ${port}`));