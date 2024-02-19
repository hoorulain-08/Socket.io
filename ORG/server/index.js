const express = require('express');
const app = express();
const server = require('http').Server(app);
const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const io = require('socket.io')(server);
app.use(express.json());
app.use(cors());
const bcrypt = require("bcrypt");
const { Console, error } = require('console');  
// let temp=[];
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'node_db',
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('connected');
  }
});
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
 // console.log('Client connected');
 // console.log(socket.id)
  socket.on('chatMessage', (message) => {
   // console.log('Received message:', message);
    // Handle the message
socket.on('privateMessage',(data)=>{
  const { rece, message,sender} = data;
io.to(rece).emit('newPrivateMessage', message)
})
    // Broadcast the message to other clients
    io.emit('chatMessage', message);
});


// Socket.on('connect', () => {
//   console.log('Connected to Socket.IO server');
//   console.log(Socket.id)
// });
socket.on('disconnect', () => {
  console.log('Client disconnected');
})
});
// Set up Multer storage
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => cb(null, file.originalname),
});

// Create a Multer instance
const upload = multer({ storage });

// Define the route to handle the file upload
app.post('/upload', upload.single('image'), (req, res) => {
  console.log("upload the request sent from frontEnd is below")
  // console.log()
  // Get the ID value from the request body
  const id = req.body.id;
console.log("request file is below ")
console.log(req.body)
console.log(id)
  // Get the file path of the uploaded image
  const imagePath = req.file.path;
console.log("image path is below ")
console.log(imagePath)
  // Read the image file
  const image = fs.readFileSync(imagePath);

  // Convert the image to a Buffer
  const imageBuffer = Buffer.from(image);
  

  console.log("image path is below ")
console.log(imageBuffer)
  // Prepare the SQL query
 // const query = 'INSERT INTO imgTest (id, image) VALUES (?, ?)';
   const values = [imageBuffer,id];
// const query='UPDATE reg SET image ='${imageValue}' WHERE id=1';
// const query = `UPDATE reg SET image = '${imageBuffer}' WHERE id = 1`;
const query = 'UPDATE reg SET image = ? WHERE id = ?';

  // Execute the SQL query
  db.query(query, values,(error, results) => {
    if (error) {
      console.error('Error saving the image to the database:', error);
      res.status(500).send('Error saving the image');
      return;
    }

    console.log('Image saved to the database');

    // Delete the uploaded file
    fs.unlinkSync(imagePath);

    res.send('Image saved');
  });
});

app.post('/test', (req, res) => {
  console.log('entering test request is below ');

  console.log(req.body.id);
  id = req.body.id;
  price=req.body.price;
  console.log(req.body.price);
  // query=`UPDATE posts SET price='${price}' WHERE id='${id}'`;
  // db.query(query,[price,id],(error,results)=>{
  //   if(error){
  //     console.error("unable tp update the price ",error);
  //     res.status(500).send('Error saving the image');
  //     return
  //   }
    
  //   res.send("price Updated");




  // })
  // console.log('this is below is done below ');
  // console.log(id);
   res.json({ message: 'Image inserted successfully' });
});

app.get('/image/:id', (req, res) => {
  // Get the ID from the request parameters
  const id = req.params.id;
console.log("the image Id is below =  ")
console.log(id)
  // Prepare the SQL query
  const query = 'SELECT image FROM reg WHERE id = ?';
  const values = [id];

  // Execute the SQL query
  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error retrieving the image from the database:', error);
      res.status(500).send('Error retrieving the image');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Image not found');
      return;
    }


    console.log("result of image is below")
    console.log(results)
    // Get the image data from the query results
    const imageBuffer = results[0].image;
console.log("image is below ")
console.log(imageBuffer)
    // Set the appropriate headers for the image response
    res.setHeader('Content-Type', 'image/jpeg');

    // Send the image buffer as the response
    res.send(imageBuffer);
  });
});

app.get('/imageTest/:id', (req, res) => {
  // Get the ID from the request parameters
  const id = req.params.id;
console.log("the image Id in reg is below =  ")
console.log(id)
  // Prepare the SQL query
  const query = 'SELECT image FROM reg WHERE id = ?';
  const values = [id];

  // Execute the SQL query
  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error retrieving the image from the database:', error);
      res.status(500).send('Error retrieving the image');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Image not found');
      return;
    }


    console.log("result of image  from reg is below")
    console.log(results)
    // Get the image data from the query results
    const imageBuffer = results[0].image;
console.log("imageBuffer from reg  is below ")
console.log(imageBuffer)
    // Set the appropriate headers for the image response
    res.setHeader('Content-Type', 'image/jpeg');

    // Send the image buffer as the response
    res.send(imageBuffer);
  });






});








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


 app.post('/searchM',  (req, res) => {

  console.log('Request received from Frontend:');
  country=req.body.country;
  console.log(country)
  const countryQuery =  `SELECT * FROM posts WHERE FromCountry = '${country}'`;

  db.query(countryQuery, (error, countries) => {
    if (error) {
      console.error('Error fetching countries:', error);
      res.status(500).json({ error: 'An error occurred while fetching countries' });
    } else {
      console.log("countries is down below")
      console.log(countries);
      // Extract the pID values from the countries result
      const pIDs = countries.map((country) => country.pID);
      console.log("pID is down below");
      console.log(pIDs);
      // Fetch data from the "posts" table based on the extracted pIDs
   
      const postsQuery = `SELECT * FROM reg WHERE id IN (${pIDs.join(',')})`;
      db.query(postsQuery, (error, posts) => {
        if (error) {
          console.error('Error fetching posts:', error);
          res.status(500).json({ error: 'An error occurred while fetching posts' });
        } else {
          // Combine the results of both queries and send them to the frontend
       console.log("reg is down below");

       //we will apply image querry a querry to fetch images here  *****


      //  const query = 'SELECT image FROM imgTest WHERE id = ?';
      //  const values = [id];
     
       // Execute the SQL query
    //    db.query(query, values, (error, results) => {
    //      if (error) {
    //        console.error('Error retrieving the image from the database:', error);
    //        res.status(500).send('Error retrieving the image');
    //        return;
    //      }
     
    //      if (results.length === 0) {
    //        res.status(404).send('Image not found');
    //        return;
    //      }
     
    //      // Get the image data from the query results
    //      const imageBuffer = results[0].image;
    //  console.log("image is below ")
    //  console.log(imageBuffer)
    //     })








        console.log(posts)
          const response = {
             countries,
             posts,

          };
          res.json(response);
        }
      });
    }
  });
  
//   try {
//     const results = await new Promise((resolve, reject) => {
//       db.query(query, (error, results) => {
//         if (error) {
//           console.error('Error executing the query:', error);
//           reject(error);
//           return;
//         }
        
//         resolve(results);
//       });
//     });
    
//     save = results; 
//     let j=0
// // const fire=test(save);
// // console.log("retuned value from test function is below")
// // console.log(fire);
//   //   for (let i = 0; i < save.length; i++) {
//   //     console.log("initail  value of rest  is below ")
//   //     console.log(rest)
//   //      rest = await test(save[i].FromCountry);
//   //      let x=save[i].FromCountry
//   //     if(rest='a'){
//   //       i=save.length
//   //       console.log(rest);
//   //       rest = await test(x);
//   //       // rest =  test(save[i].FromCountry);
//   //      console.log(rest);

//   //       console.log("i is here = "+ i)
//   //     }
//   //    else{
//   //     console.log('Saved value resturned from test function is  is below:');
//   //     console.log(rest);
//   //  //   console.log(rest);
//   //    }
//   //     j=j+1;
//   //    //  saveId[i] = rest;
//   //    console.log("running loop iteration is   =  "+ j)
//   //   }
    
//     // res.send(results);
//   } catch (error) {
//     console.error('Error executing the query:', error);
//     res.status(500).send('An error occurred');
//   }




});

// app.post('/searchM', async (req, res) => {






app.get('/posts', (req, res) => {
  // Fetch countries from the "reg" table
  country=req.body.country;
  const countryQuery =  `SELECT * FROM posts WHERE FromCountry = '${country}'`;

  connection.query(countryQuery, (error, countries) => {
    if (error) {
      console.error('Error fetching countries:', error);
      res.status(500).json({ error: 'An error occurred while fetching countries' });
    } else {
      console.log("countries is down below")
      console.log(countries);
      // Extract the pID values from the countries result
      const pIDs = countries.map(country => country.pID);
      console.log("pID is down below");
      console.log(pIDs);
      // Fetch data from the "posts" table based on the extracted pIDs
   
      const postsQuery = `SELECT * FROM posts WHERE id IN (${pIDs.join(',')})`;
      connection.query(postsQuery, (error, posts) => {
        if (error) {
          console.error('Error fetching posts:', error);
          res.status(500).json({ error: 'An error occurred while fetching posts' });
        } else {
          // Combine the results of both queries and send them to the frontend
          const response = {
            countries,
            posts
          };
          res.json(response);
        }
      });
    }
  });
});














function test(prop){
 // console.log("props is below")
 //  console.log(prop);
  //  console.log(prop[1].RowDataPacket.pID);
let getId=[];
let temp=[]
for(let i=0; i<prop.length;i++){

 getId[i]=prop[i].pID;
//console.log(getId[i])


}
console.log("value of getId is below")
console.log(getId[0])
for(let i=0; i<prop.length;i++){

 const query=`select name,image from reg WHERE id= ${getId[i]} `

 db.query((query),(error,result)=>{
if(error){
  console.error('Error Fetching data ',error)
}
else{
  // console.log("result is below in test ")
  // console.log(result);
  if(result.length>0){
    console.log("temp is below down = if result.length>0 ")
   temp.push(2);

   console.log(temp[i])
  // console.log("vale of i is below ")
  // console.log(i);
  }
  console.log("vale of i is below ")
  console.log(temp[i])
  // 
 return result 
}
console.log("hi there i am outside api  ")
 console.log(temp[0])
// 
 })
//  
//  for(let j=0;j<temp.length;j++)
//  {
//  console.log("temp fully copied is below down = ")
//  console.log(temp[i])
 
//  }
 }









//   const query = `SELECT * FROM reg WHERE country = '${prop}'`;
// db.query(query,(error,result)=>{
//   if(error){
//     console.error('Error executing the query:', error);
//     return;
//   }

// //   console.log("result is below in test function")
// //  console.log(result)
// //  return 2
// temp=result
// // console.log("temp is below ")
// // 
// if(temp!='a'){
//    console.log("temp 1 is below down = ")
//   // console.log(temp)
//   return temp;
//  }
// }

//  )
//  if(temp!='a'){
//   console.log("temp 2 is below down = ")
//   console.log(temp)
//   return temp;
//  }



}



app.post('/searchCountries',(req,res)=>{


  console.log('request  u received from Frontend is = ')
  // console.log(req.email);
 // console.log(req)
  const country = req.body.email;
  // const id = req.body.LoginId;
  console.log(country)
  const query = `SELECT * FROM posts WHERE FromCountry = '${country}'`;
  
  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return;
    }
  
    else{

        console.log('Query results:');
        console.log(results)
    res.send(results)
    
  }
  });
  
 
  // Close the database connection
  // connection.end((error) => {
  //   if (error) {
  //     console.error('Error closing the database connection:', error);
  //     return;
  //   }
  //   console.log('Database connection closed');
  // });

})








// app.post('/NewPost',(req,res)=>{


//   console.log('request  u received from Frontend is = ')
//   // console.log(req.email);
//   console.log(req)
//   console.log('request received from FrontEnd is = ')
//     console.log(req.body);
//     const pID=req.body.pID; 
//     const ToCountry=req.body.ToCountry;
//     const FromCountry=req.body.FromCountry;
//     const post=req.body.post;
//      const wgt=req.body.wgt;
//   const query = `SELECT * FROM posts WHERE country = '${country}'`;
  
//   // Execute the query
//   db.query(query, (error, results) => {
//     if (error) {
//       console.error('Error executing the query:', error);
//       return;
//     }
  
//     else{

//         console.log('Query results:');
//         console.log(results)
//     res.send(results)
    
//   }
//   });
  
 
//   // Close the database connection
//   // connection.end((error) => {
//   //   if (error) {
//   //     console.error('Error closing the database connection:', error);
//   //     return;
//   //   }
//   //   console.log('Database connection closed');
//   // });

// })

// Define the route to save the values in the database
app.post('/NewPost', (req, res) => {
console.log(req.body)
  const pID = req.body.pID;
  const ToCountry = req.body.ToCountry;
  const FromCountry = req.body.FromCountry;
  const price=req.body.price
  const post = req.body.post;
  const wgt = req.body.wgt;


  // Prepare the SQL query
  const query = 'INSERT INTO posts (pID, ToCountry, FromCountry,price, post, wgt) VALUES (?, ?, ?, ?, ?,?)';

  console.log(pID);
  console.log(ToCountry);
  console.log(FromCountry);
  console.log(price);
  console.log(post);
  console.log(wgt);
  // Execute the SQL query with the values as parameters
  db.query(query, [pID, ToCountry, FromCountry,price, post, wgt], (error, results) => {
    if (error) {
      console.error('Error saving the values to the database:', error);
      res.status(500).send('Error saving the values');
      return;
    }

    console.log('Values saved to the database');

    res.send('Values saved');
  });
});




app.post('/login',(req,res)=>{
  console.log('request from frontend fo ligin is = ')
  console.log(req.body.name);
  console.log(req.body.password);
  const name=req.body.name;
  db.query("SELECT * FROM reg WHERE name = ? ", [name], function(error, results) {
    if(error) throw error;
    else { 
  
      console.log('Entering else  statement')
        if(results.length > 0) { 
        
        bcrypt.compare(req.body.password, results[0].password, function(err, result) {
         if(result) {
         // console.log("results are here below = ")
           return res.status(200).send({ id: results[0].id,country:results[0].country });
        
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
  





server.listen(3000, function () {
  console.log('listening on *:3000');
});