const fs = require('fs');

var students = [];

function init()
{
    fs.readFile('./students.json',(err,data)=>{
        if (err) reject("unable to read file");
        students = JSON.parse(data);
    })

    return Promise.resolve();
}

function getBSD()
{
    if (students.length == 0)  reject("no results returned");
    Promise.resolve(students);
    return students;
}

function highGPA()
{
    var bestStudent = {"gpa" : -1};
    for (var i = 0; i < students.length; i++)
    {
        if (students[i].gpa > bestStudent.gpa)
            bestStudent = students[i];
    }
    if (bestStudent.gpa == -1)  reject("no results returned");

    var bestPage = "<h1>Highest GPA:</h1><p>Student ID: " 
    + bestStudent.studId + "</p><p>Name: " 
    + bestStudent.name + "</p><p>Program: " 
    + bestStudent.program + "</p><p>GPA: " + bestStudent.gpa + "</p>";

    Promise.resolve(bestPage);
    return bestPage;
}

module.exports = { init, getBSD, highGPA };