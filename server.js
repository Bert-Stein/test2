// Cyclic link - https://successful-dove-attire.cyclic.app/
var express = require('express');
var data = require("./test2_moduleA.js");
const path = require('path');
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

var onHTTPListen = () =>
{
    console.log("Express http server listening on " + HTTP_PORT);
}

app.use(express.static('public'))

app.get('/', (req, res) =>
{
    res.status(200).send('<h2>Declaration</h2> <p>I acknowledge the College’s academic integrity policy - and my own integrity - remain in effect whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and escpecially with my classmates... even when no one is watching. I declare I will not break that trust.</p> <p>Name: <mark>Albert Abalian</mark></p> <p>Student Number: <mark>121761217</mark></p> <a href="/BSD">Click to visit BSD students</a><p><a href="/highGPA">Click to see who has the highest GPA</a></p>');
});

app.get('/BSD', (req, res) =>
{
    res.status(200).send(data.getBSD());
});

app.get('/highGPA', (req, res) =>
{
    res.status(200).send(data.highGPA());
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