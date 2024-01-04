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
import { createContext, useState } from "react";
// import { Provide,Practice } from './Context';
// const ss=React.createContext();
const Stack = createNativeStackNavigator();
export const ContextApi=createContext();

export default function App() {

const [id,setId]=useState();
const [msg,setMsg]=useState();


  return (
    //  <Provide>
    // <PracticeProvider>
    <ContextApi.Provider value={{id,setId,msg,setMsg}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
              <Stack.Screen name="LogIn" component={Login} />
    
      <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="TestChat" component={TestingChat} />
       <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
       
      </Stack.Navigator>
    </NavigationContainer>
    </ContextApi.Provider>
   
  );
}

