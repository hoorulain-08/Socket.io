import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'
import { useState } from 'react'
export default function     SignUp(){
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  const [username,setUsername]=useState();
  const [password,setPassword]=useState();
  const [email,setEmail]=useState();
  const [phone,setPhone]=useState();
  

//   onChangeText = (key, val) => {
//     this.setState({ [key]: val })
//   }
  async function signUp  ()  {
   // const { username, password, email, phone_number } = this.state
    try {
      // here place your signup logic
      console.log('user successfully signed up!: ')
    } catch (err) {
      console.log('error signing up: ')
    }
  }
 

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeText(setUsername(val) )}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeText(setPassword(val) )}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeText(setEmail(val) )}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeText(setPhone(val) )}
        />
        <Button
          title='Sign Up'
          onPress={signUp}
        />
      </View>
    )
  }


const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})