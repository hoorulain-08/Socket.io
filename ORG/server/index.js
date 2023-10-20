const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mysql=require('mysql');
const sqlite=require('sqlite3').verbose();
const cors=require('cors');
const { table } = require('console');
app.use(express.json());
app.use(cors());

let sql;
//connect to DB
const dbl=new sqlite.Database('./test.db',sqlite.OPEN_READWRITE,(err)=>{
if(err) return console.error(err.message)
})
//create table sqlite
// sql='CREATE TABLE intStorage(id INTEGER primary key,fname,lname,username)'
// dbl.run(sql);

// dbl.run('DROP TABLE intStorage');
//Insert data into table

const db=mysql.createConnection({
  host:"localhost",
  user:'root',
  password:'',
  database:'node_db'
})
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
app.post('/send',(req,res)=>{
  const id=req.body.id;
  const name=req.body.name;

//insert  registrtion table in database
  // db.query('insert into reg values(?,?)',[id,name],(err,result)=>{
  //      if(err){
  //          console.log(err);
  //       }else{
  //          res.send("POSTED")
  //       }

  //  })
   


  // const email=req.body.email;


  //  sql='INSERT INTO intStorage(fname,lname,username) VALUES (?,?,?)';
  //  dbl.run(sql,["mom","dad","kids"],(err)=>{
  //    if(err) return console.error(err.message);
  //  })
   
  //  sql='SELECT * from intStorage';
  //  dbl.all(sql,[],(err,rows)=>{
  //    if(err) return console.error(err.message);
  //    rows.forEach((row)=>{
  //      console.log(row)
   
  //    })
  //  })


})

server.listen(3000, function(){
  console.log('listening on *:3000');
});