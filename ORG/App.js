import * as React from 'react';
import { View, Text, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Enter';
import ChatScreen from './Screens/chatScreen';
import Login from './Screens/LogIn';
import TestingChat from './Screens/TestingChat';
import  FList from "./Screens/FList"
import SignUp from './Screens/SignUp';
import {PracticeProvider} from './Context/Context';
import Home from './Screens/Home';
import { MyContextProvider } from './ContextApi/Context';
import { createContext, useState } from "react";
import Main from './Main panel/Main';
import Wall from './Screens/Wall';
import MyForm from './Form/FormHandling';
import TestNav from './Screens/SendToCountries';
import { GetData } from './Screens/GetData';
// import { Provide,Practice } from './Context';
// const ss=React.createContext();
const Stack = createNativeStackNavigator();

export const ContextApi=createContext();

export default function App() {

const [id,setId]=useState();
const [msg,setMsg]=useState();
const [nam,setNam]=useState();
const [image,setImage]=useState();
const [country,setCountry]=useState();

  return (
    //  <Provide>
    // <PracticeProvider>
    <ContextApi.Provider value={{id,setId,msg,setMsg,nam,setNam,image,setImage,country,setCountry}}>
    <MyContextProvider>
    <NavigationContainer>

  
      <Stack.Navigator initialRouteName="LogIn"
       screenOptions={{
                headerShown:false,
                statusBarColor:'#6facbf'
              }}
      >

<Stack.Screen name="LogIn" component={Login}                                                                                                                                                                                                                                                                                                                     

screenOptions={{
 
  statusBarColor:'#6facbf'
}}
 />
<Stack.Screen  name='wall' component={Wall}
screenOptions={{
 
  statusBarColor:'#6facbf'
}}
  /> 
<Stack.Screen name="Form" component={MyForm}                                                                                                                                                                                                                                                                                                                     

screenOptions={{
 
  statusBarColor:'#6facbf'
}}
 />

 

{/* <Stack.Screen name="Form" component={MyForm}                                                                                                                                                                                                                                                                                                                     

screenOptions={{
 
  statusBarColor:'#6facbf'
}}
 /> */}

<Stack.Screen  name='TestNav' component={TestNav}
screenOptions={{
 
  statusBarColor:'#6facbf'
}}
/> 

{/* <Stack.Screen name="Form" component={MyForm}                                                                                                                                                                                                                                                                                                                     

screenOptions={{
 
  statusBarColor:'#6facbf'
}}
 /> */}

    
{/* rendering this wall component for testing purpose otherwise its alreday there in main.js */}
{/* <Stack.Screen  name='wall' component={Wall}
screenOptions={{
 
  statusBarColor:'#6facbf'
}}
  />   */}




         
              
          <Stack.Screen  name='Main' component={Main}
screenOptions={{
 
  statusBarColor:'#6facbf'
}}

          />     
       <Stack.Screen name='SignUp' component={SignUp}
        screenOptions={{
          headerShown:false
        }}/>
      
      
       
      </Stack.Navigator>
    </NavigationContainer>
    </MyContextProvider>
    </ContextApi.Provider>
   
  );
}

