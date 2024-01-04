import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text
} from 'react-native'
import { useState ,useContext} from 'react'
import { ContextApi } from '../App';
export default function  Login({navigation}){
  const resp=useContext(ContextApi)
  const [username_n,setUsername]=useState();
  const [password_n,setPassword]=useState();
let x;

  async function LoginGo  ()  {
   // console.log('value recevied from  the form is prop is ')
    // console.log(username_n )

    const res= await fetch('http://192.168.70.158:3000/login',{
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
        // console.log("this value of y in if is below")
        // console.log(y.id)

       navigation.navigate('Home');
    }else if(x==400){
        alert('Invalid Username or Password')
    }
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