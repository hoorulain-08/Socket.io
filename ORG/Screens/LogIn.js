// import React from 'react'
// import {
//   View,
//   Button,
//   TextInput,
//   StyleSheet,
//   Text,
//   Image
// } from 'react-native'
// import { useState ,useContext} from 'react'
// import { ContextApi } from '../App';
// // import * as FileSystem from 'expo-file-system'
// export default function  Login({navigation}){
//   const resp=useContext(ContextApi)
//   const [username_n,setUsername]=useState();
//   const [password_n,setPassword]=useState();
// let x;
// const [im, setIm] = useState(null);
//   async function LoginGo  ()  {
//    // console.log('value recevied from  the form is prop is ')
//     // console.log(username_n )
//     // const filename = "MissCoding.pdf";
//     // const localhost = Platform.OS === "android" ? "192.168.70.158" : "192.168.70.158";
//     // let id=6;
//     // const result = await FileSystem.downloadAsync(
//     //   `http://${localhost}:3000/image/${id}`,
//     //   FileSystem.documentDirectory + filename,
//     //   {
//     //     headers: {
//     //       "content-type": "image/jpeg"
//     //     }
//     //   }
//     // );

//     // console.log("taken image is here uri is below")
//     // console.log(result.uri)
//     // setIm(result.uri)





// //     const res= await fetch('http://192.168.70.158:3000/login',{
// //       method:'POST',
// //       headers:{
// //         Accept:'application/json',
// //         'content-type':'application/json'
// //       },
// //       body:JSON.stringify({
// //         name:username_n,
// //         password:password_n,
// //       }
        
// //       )
// //     }).then(async(response)=>{
// //       // console.log("response from frontned status is ")
// //       // console.log(response.status)
// //      x= response
// //       // console.log(response.)
// //     })
// //     const    y = await x.json();
// // console.log("response id  is below ");
// // console.log(x.status)
// //     if(x.status==200)
// //     {   
// //         resp.setId(y.id)
// //         resp.setCountry(y.country);
// //         resp.setNam(username_n)
// //         //resp.seImage(i.image)
// //         // console.log("this value of y in if is below")
// //         console.log(y.image.uri)

// //       //  navigation.navigate('Main');
// //     }else if(x==400){
// //         alert('Invalid Username or Password')
// //     }
//   }
 

//     return (
//       <View style={styles.container}>
   
//       <Text style={styles.TextStyle}> Enter Your User Name </Text>

//         <TextInput
//           style={styles.input}
//           value={username_n}
//           placeholder='Username'
//           autoCapitalize="none"
//           onChangeText={((val)=>{setUsername(val) })}
//         />
//          <Text> Enter Your Password </Text>
//         <TextInput
//           style={styles.input}
//           placeholder='Password'
//           secureTextEntry={true}
//           autoCapitalize="none"
        
//           onChangeText={((val)=>{setPassword(val) })}
//         />   
//         <Button
//           title='Log In'
//           onPress={LoginGo}
//         />
   
// {/* {im&&<Image source={{uri:im}}/>}      */}
//       </View>


//     )
//   }


// const styles = StyleSheet.create({
//   input: {
//     width: 350,
//     height: 55,
//     backgroundColor: '#E0E0E0',
//     margin: 10,
//     padding: 8,
//     color: 'black',
//     borderRadius: 14,
//     fontSize: 18,
//     fontWeight: '300',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   TextStyle:{
//  textAlign:'left'

//   }
// })


// import { View, Text } from 'react-native'
import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  Image
} from 'react-native'
import { useState ,useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ContextApi } from '../App';
 import * as FileSystem from 'expo-file-system'
export default function LogIn() {
   const [im, setIm] = useState(null);
     const resp=useContext(ContextApi);
     const navigation = useNavigation(); 
  const [username_n,setUsername]=useState();
  const [password_n,setPassword]=useState();
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

   async function LoginGo  ()  {
     console.log('value recevied from  the form is prop is ')
    //     // console.log(username_n 
    
        const res= await fetch('http://192.168.0.103:3000/login',{
          method:'POST',
          headers:{
            Accept:'application/json',
            'content-type':'application/json'
          },
          body:JSON.stringify({
            name:username_n,
            password:password_n,
          }
            
          )
        }).then(async(response)=>{
          // console.log("response from frontned status is ")
          // console.log(response.status)
         x= response
          // console.log(response.)
        })
        const    y = await x.json();
    console.log("response id  is below ");
    console.log(x.status)
        if(x.status==200)
        {   
            resp.setId(y.id)
            resp.setCountry(y.country);
            resp.setNam(username_n)
            //resp.seImage(i.image)
            // console.log("this value of y in if is below")
          //  console.log(y.image.uri)
    
        
        }else if(x==400){
            alert('Invalid Username or Password')
        }
       
  getImage();
   //navigation.navigate('Main');
      }


      const getImage=async()=>{
        console.log("getImage is below")
        const filename = generateRandomString()+ '.jpg';
        
        const localhost = Platform.OS === "android" ? "192.168.0.103" : "192.168.0.103";
        let id=resp.id;
        console.log(id)
        const result = await FileSystem.downloadAsync(
          `http://${localhost}:3000/image/${id}`,
          FileSystem.documentDirectory + filename,
          {
           headers: {
             "content-type": "image/jpeg"
           }
          }
       );
   
       console.log("taken image is here uri is below")
       console.log(result)
       setIm(result.uri);
       resp.setImage(result.uri);
       navigation.navigate('Main');
   
      }




    return (
      <View style={styles.container}>
   
      <Text style={styles.TextStyle}> Enter Your User Name </Text>

        <TextInput
          style={styles.input}
          value={username_n}
          placeholder='Username'
          autoCapitalize="none"
          onChangeText={((val)=>{setUsername(val) })}
        />
         <Text> Enter Your Password </Text>
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
        
          onChangeText={((val)=>{setPassword(val) })}
        />   
        <Button
          title='Log In'
          onPress={LoginGo}
        />
   
{/* {im&&<Image source={{uri:im}}/>}      */}
      </View>


    )
  }




const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#E0E0E0',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '300',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextStyle:{
 textAlign:'left'

  }
})





