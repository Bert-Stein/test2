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

function getStudents()
{
    if (students.length == 0)  reject("no results returned");
    Promise.resolve(students);
    return students;
}

function getBSD()
{
    var bsd = [];

    for (var i = 0; i < students.length; i++)
    {
        if (students[i].program == 'BSD')
            bsd.push(students[i]);
    }

    if (bsd.length == 0)  reject("no results returned");
    Promise.resolve(bsd);
    return bsd;
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

    Promise.resolve(bestStudent);
    return bestStudent;
}

module.exports = { init, getStudents, getBSD, highGPA };