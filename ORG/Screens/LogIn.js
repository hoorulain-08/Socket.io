import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text
} from 'react-native'
import { useState } from 'react'
export default function  Login({navigation}){
 
  const [username_n,setUsername]=useState();
  const [password_n,setPassword]=useState();


  async function LoginGo  ()  {
    console.log('value recevied from  the form is prop is ')
    // console.log(username_n )

 let res=fetch("http://192.168.70.158:3000/login", {
  method: "POST",
  headers:{
            Accept:'application/json',
            'content-type':'application/json'
          },
  body: JSON.stringify({

        name:username_n,
    //   email:email_n,
    password:password_n,
    // phone:phone_n
   }),
}).then((response)=>{
    console.log('response is here below = ')
    let x=response.status
    console.log({x})
    if(x==200)
    {
        navigation.navigate('ChatScreen');
    }else if(x==400){
        alert('Invalid Username or Password')
    }
    
})
// let resJson = await res.json();
// if (resJson.status == 200) {
//   // setName("");
//   // setEmail("");
//   setMessage("User Login successfully");
// } else {
//   setMessage("Some error occured");
// }


    // try {
    //   // here place your signup logic
    //   console.log('user successfully signed up!: ')
    // } catch (err) {
    //   console.log('error signing up: ')
    // }
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