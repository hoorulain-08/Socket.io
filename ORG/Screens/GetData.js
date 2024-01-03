import { View, Text } from 'react-native'
 import React, { useEffect ,useState} from 'react'


 export const GetData=(props)=> {
    let emailNew=props;
    console.log
    let LoginId=2;
    const [testE,setTestE]=useState([])
    useEffect(()=>{
FetchApi()
    }

    )

    async function FetchApi(){
        const res= await fetch('http://192.168.70.158:3000/searchM',{
            method:'POST',
            headers:{
              Accept:'application/json',
              'content-type':'application/json'
            },
            body:JSON.stringify({
              email:emailNew,
           
              
            }
              
            )
          })
          console.log("GetData from above is here ")
      const    y = await res.json();
      console.log(y)
    setTestE(y)
            
        }
return testE


   }

//    export {GetData,y}