const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', // todo: change to env variable
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    // allowedHeaders: ['Content-Type'],
    // exposedHeaders: ['Content-Type']
}));
// app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 80

app.get('/', (req, res) => {
    res.status(200).send('Hellow Meoww!');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})