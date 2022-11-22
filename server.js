// Cyclic link - https://successful-dove-attire.cyclic.app/
var express = require('express');
var data = require("./data_prep.js");
const path = require('path');
var app = express();
var exphbs = require('express-handlebars');

app.engine(".hbs", exphbs.engine({
    extname:".hbs"}))
app.set('view engine', '.hbs');

var HTTP_PORT = process.env.PORT || 8080;

var onHTTPListen = () =>
{
    console.log("Express http server listening on " + HTTP_PORT);
}

app.use(express.static('public'))

app.get('/', (req, res) =>
{
    res.status(200).render(path.join(__dirname, '/views/home.hbs'));
});

app.get('/BSD', (req, res) =>
{
    var renData = data.getBSD();
    res.status(200).render("students", {data: renData});
});

app.get('/allStudents', (req, res) =>
{
    var renData = data.getStudents();
    res.status(200).render("students", {data: renData});
});

app.get('/highGPA', (req, res) =>
{
    var renData = data.highGPA();
    res.status(200).render("students", {data: renData});
});

app.get('*', (req, res)=>
{
    res.status(404).send("Error 404: page not found.");
});

data.init().then(() => {  
    app.listen(HTTP_PORT, onHTTPListen);
}).catch(() => {
    console.error("Could not initialize the arrays");
});