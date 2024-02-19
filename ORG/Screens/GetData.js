import { View, Text, Platform ,Image,Button} from 'react-native'
 import React, { useEffect ,useState} from 'react';
import * as FileSystem from 'expo-file-system';

 export const GetData=(props)=> {
    let emailNew=props;
  //  console.log("props in GetData js is below down = ")
    // console.log(emailNew);
    const [testE,setTestE]=useState([]);
    const [post,setPost]=useState(null); 
    const [reg,setReg]=useState();
    const[uril,setUril]=useState([]);
    const [show,setShow]=useState(false);
    const [temp,setTemp]=useState(null);
    const[ret,setRet]=useState(null)
    let Id=[]; let arr=[]; 
    //let temp=null;
    useEffect(()=>{
     //console.log("value of post in useEffect  is below ")
    // console.log(post)
    //  console.log("value of reg in useEffect  is below ")
    //    console.log(reg)
      // FetchApi();
      //    showImage();
      if(post==null || temp==null){
 //     console.log("executing if condition of  FetchAPI  useEffect   ")
      showImage();
      FetchApi();
        
        
      }

     else if(temp==2){
    //   console.log("I have entered in temp==2 condition of else if  ")
// console.log(testE[0])
// console.log(testE[1])

const combinedArray = reg.map((regItem, index) => ({
  id: regItem.id,
  name: regItem.name,
  image: testE[index],
  ...post.find((postItem) => postItem.pID === regItem.id),
}));

//console.log("combinedArray is below = ");
// console.log(combinedArray);
setRet(combinedArray)
//         for(let i=0;i<post.length;i++){
//           console.log("pictures  URI is  down below in useEffect of the temp==2 ")

// console.log(arr[i])
//         }
      }
      //  else if(temp==null){
      //   showImage();
      //  }
      //  else if(post==null){
      //   // showImage();
      //   FetchApi();
      //  }
// else if(temp==2){
//   console.log("in else if of useEffect and all imaged nad data has been fetched ")
// }



    }

    )
function display(){
console.log("posts are below");
// console.log(post);
// console.log("registered items are below")
// console.log(reg[1].image)

// console.log("registered id are below ")
// console.log(reg);
let temp=0;
for(let i=0;i<post.length;i++){

      console.log(arr[i]); 
temp=i;
     }
 
if(temp+1==post.length){
  console.log("shoing images executing if")
 // setShow(true)
}

console.log("temp  is below down")
console.log(temp)
console.log("post.length  is below down")
console.log(post.length)
console.log("show  is below down")
console.log(show)
}
const generateRandomString = () => {
  length=5;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter=0;
  while(counter<=length){
    result+=characters.charAt(Math.floor(Math.random()*charactersLength));
    counter+=1
  }
 return result
};

async function showImage(){
 // console.log("show images ")

  let id=1,filename;
   
  for(let i=0;i<post.length;i++){
id=i+1;

    const localhost= Platform.OS === "android" ? "192.168.0.103" : "192.168.0.103";     
     filename = generateRandomString()+ '.jpg';
    // console.log("id is below ")
    // console.log(id);
    const result = await FileSystem.downloadAsync(
      // This will call all the images from reg table for that we have to replace the exact API
      `http://${localhost}:3000/imageTest/${id}`,
      FileSystem.documentDirectory + filename,
      {
       headers: {
         "content-type": "image/jpeg"
       }
      }
   );

 //console.log("pictures  URI is  down below ")

  arr[i]=result.uri;
  // console.log(arr[i]); 
   id++;
  }

 //console.log("post.length  is below in show images function down after loading all images ")
// console.log(post.length)
// console.log(arr[0])
setTestE(arr);
//console.log(testE)
setTemp(2)
 // setShow(tr.lue)
}
 async function FetchApi(){
    //  console.log("In Fetch Api function")
      fetch('http://192.168.0.103:3000/searchM', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },

    body:JSON.stringify({
      country:emailNew
    })
  })
    .then((response) => response.json())
    .then((data) => {
      // Process the data received from the API
     // console.log("GetData from above is here down = ");
      // console.log(data.posts); // Replace with your logic
      setPost(data.countries);
      setReg(data.posts);
     // display();

    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      // Handle the error
    });
   
    let id=1,filename;
   
    for(let i=0;i<post.length;i++){
 id=i+1;

      const localhost= Platform.OS === "android" ? "192.168.0.103" : "192.168.0.103";     
       filename = generateRandomString()+ '.jpg';
      // console.log("id is below ")
      // console.log(id);
      const result = await FileSystem.downloadAsync(
        // This will call all the images from reg table for that we have to replace the exact API
        `http://${localhost}:3000/imageTest/${id}`,
        FileSystem.documentDirectory + filename,
        {
         headers: {
           "content-type": "image/jpeg"
         }
        }
     );

 //   console.log("pictures  URI is  down below ")
 
    arr[i]=result.uri;
   //   console.log(arr[i]); 
     id++;
    }

   // display();
  //   const localhost= Platform.OS === "android" ? "192.168.70.158" : "192.168.70.158";     
  //   const result = await FileSystem.downloadAsync(
  //     `http://${localhost}:3000/image/${id}`,
  //     FileSystem.documentDirectory + filename,
  //     {
  //      headers: {
  //        "content-type": "image/jpeg"
  //      }
  //     }
  //  );
  //  const res = await FileSystem.downloadAsync(``)




        }

// console.log("the value has to be returned is here down")
// console.log(ret)
return ret
//will remove this return Later 

// const seeImage=()=>{
//   console.log("In the see images function ")
//   console.log(testE)
// setShow(true)
// }


   }

//    export {GetData,y}