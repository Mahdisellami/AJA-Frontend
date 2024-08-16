const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');


app.use(cors());
app.use(bodyParser.json());

// static serving of react frontend files
app.use(express.static(path.join(__dirname, './build')));

app.get('/*', (req, res) => {
     res.sendFile(path.join(__dirname, "/build", '/index.html'));
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});