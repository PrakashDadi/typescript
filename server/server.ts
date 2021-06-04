import React from 'react'
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/get', (req: any, res: any) => {
  const sqlSelect = 'SELECT * FROM todotable';
  db.query(sqlSelect, (err: any, result: any) => {
      res.send(result);
  })
})

app.post("/api/insert", (req: { body: { id: any; taskName: any; description: any; createdBy: any; createdOn: any; }; }, res: any) => {
  const id = req.body.id
  const taskName = req.body.taskName
  const description = req.body.description
  const createdBy = req.body.createdBy
  const createdOn = req.body.createdOn

  const sqlInsert = 'INSERT INTO todotable (id, taskName, description, createdBy, createdOn) VALUES (?,?,?,?,?)';
  db.query(sqlInsert, [id, taskName, description, createdBy, createdOn], (err: any, result: any) => {
      console.log(result);
  });
});

app.delete("/api/delete/:id", (req: { body: { id: any } }, res: any) => {
  const id = req.body.id
  const sqlDelete = "DELETE FROM todotable WHERE id=?";

  db.query(sqlDelete, id, (err: any, result: any) => {
    if (err) {
      console.log(err)
    }
    console.log(result);
  });
});

app.put("/api/update", (req: { body: { id: any; taskName: any; description: any; createdBy: any; createdOn: any; }; },res: any)=>{
  var id = req.body.id
  var taskName = req.body.taskName;
  var description = req.body.description;
  var createdBy = req.body.createdBy;
  var createdOn = req.body.createdOn;
  const sqlUpdate = "UPDATE todotable SET taskName=?,description=?,createdBy=?,createdOn=? WHERE id=?";

  db.query(sqlUpdate, [taskName,description,createdBy,createdOn,id],(err: any,result: any) => {
    if (err) console.log(err)  
  })   
})

app.listen(3001, () => {
  console.log("running on port 3001");
});