const express = require("express")
const app = express()
const passport = require('passport')
const session = require("express-session")

// const authUserLocal = require("./passport/local-strategy")

const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    session(
        {
            secret: "cats",
            resave: true,
            saveUninitialized: true
        }
    )
);
app.use(passport.initialize());
app.use(passport.session());

const port = 3001

//import routes
const userRoutes = require("./routes/user-routes")

//set routes
app.use("/users", userRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})