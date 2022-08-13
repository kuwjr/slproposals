const express = require("express")
const app = express()
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 80

app.get('/', (req, res) => {
    res.status(200).send('Hellow Meoww!');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})