const express = require("express")
const app = express()
const passport = require('passport')
const session = require("express-session")
const cookieParser = require('cookie-parser')
require("./passport/local-strategy")
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost', // todo: change to env variable
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    // allowedHeaders: ['Content-Type'],
    // exposedHeaders: ['Content-Type']
}));
// app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    session(
        {
            secret: "cats", // todo: change to env variable
            resave: true,
            saveUninitialized: true
        }
    )
);

app.use(cookieParser('cats')) // todo: change to env variable

app.use(passport.initialize());
app.use(passport.session());

const port = 5000

//import routes
const userRoutes = require("./routes/user-routes")
const proposalRoutes = require("./routes/proposal-routes")

//set routes
app.use("/users", userRoutes)
app.use("/proposals", proposalRoutes)

// home page
app.get('/', (req, res) => {
    return res.status(200).send('Welcome to SL Proposals API service :)');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})