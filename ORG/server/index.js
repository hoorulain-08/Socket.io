const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mysql=require('mysql');
const sqlite=require('sqlite3').verbose();
const cors=require('cors');
const bcrypt = require("bcrypt");
const { table } = require('console');
const jwt = require("jsonwebtoken");
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
  password:'root123',
  database:'node_db'
})
//connection Test with Database
db.connect(function(err){
  if(err)
  {
    console.log(err)
  }
  else{
    console.log('connected')
  }
}

)
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
// app.post('/send',(req,res)=>{
//   const id=req.body.id;
//   const name_p=req.body.name_p;
//   const email=req.body.email;
//   const password_P=req.body.password_P;
// //insert  registrtion table in database
//   db.query('insert into reg values(?,?,?,?)',[id,name_p,email,password_P],(err,result)=>{
//        if(err){
//            console.log(err);
//         }else{
//            res.send("POSTED")
//         }

//    })


//   // const email=req.body.email;


//   //  sql='INSERT INTO intStorage(fname,lname,username) VALUES (?,?,?)';
//   //  dbl.run(sql,["mom","dad","kids"],(err)=>{
//   //    if(err) return console.error(err.message);
//   //  })
   
//   //  sql='SELECT * from intStorage';
//   //  dbl.all(sql,[],(err,rows)=>{
//   //    if(err) return console.error(err.message);
//   //    rows.forEach((row)=>{
//   //      console.log(row)
   
//   //    })
//   //  })


// })





app.post('/send',(req,res)=>{

    // const { id,name_p, email, password_p } = req.body;
    // const id=req.body.id;
    console.log('request received from FrontEnd is = ')
    console.log(req.body);
    
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
     const phone=req.body.phone;
console.log('entered In API')

    db.query('SELECT name from users WHERE name = ?', [name], async (err, results) => {
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log('ftched Api is here below = down')
        console.log(hashedPassword);
// for now beause of autoincrement now id not mentioning 
        db.query('INSERT INTO reg SET ?', { name: name, email: email, password: hashedPassword,phone:phone}, (err, results) => {
            if (err) {
                console.log(err);
            } else {

              console.log(results)
                return  res.send("Form submitted");
                // res.sendFile(__dirname + "request.html", {
                //     message: 'User registered'
                // });
            }
        })
    })
    res.send("Form submitted");

})

app.post('/login',(req,res)=>{
console.log('request from frontend fo ligin is = ')
console.log(req.body.name);
console.log(req.body.password);
const name=req.body.name;
db.query("SELECT * FROM reg WHERE name = ? ", [name], function(error, results, fields) {
  if(error) throw error;
  else { 

    console.log('Entering else statement')
      if(results.length > 0) { 
        // console.log('password is here down below = ')
        // console.log(req.body.password)
        // console.log('result[0].password_P is here down below ')
        // console.log( results[0].password)
      bcrypt.compare(req.body.password, results[0].password, function(err, result) {

        // console.log( bcrypt.compare(req.body.password, results[0].password) )
        // console.log('result is here  below = ')
        // console.log(result)
       if(result) {
         return res.send({ message: "Login Successful" });
       }
       else {
         return res.status(400).send({ message: "Invalid Password" });
       }
      });
  } else {
      return res.status(400).send({ message: "Invalid Email" });
  } 
  }
});












})











server.listen(4000, function(){
  console.log('listening on *:4000');
});