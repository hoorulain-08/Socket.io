import  { useContext } from "react"
import {View,TextInput,Button,Text} from 'react-native'
import { useState,useEffect } from "react"
// import { Practice } from "../Context";
import ChatScreen from "./chatScreen";
import { executeNativeBackPress } from "react-native-screens";
// const Context=React.createContext("default value")
export default function HomeScreen({ navigation }) {
  
  const [name,setName]=useState();
  // const{val}=useContext(Practice);

const [sw,setSw]=useState(false)
  var temp=5;

  function register(oj){

 

    const obj={
      name:name
    }

   console.log("oject is here below");
   console.log(obj);

  //  setSw(true);
   navigation.navigate('ChatScreen');

  //  fetch("http://192.168.43.52:3000/send",{ //replacing network IP address of existing network
  //           method:'POST',
  //           headers:{
  //             Accept:'application/json',
  //           "Content-Type": "application/json",
  //           },
  //           body:JSON.stringify(obj)
      
  //         }
  //         ).then((Response)=>{
  //           console.log("sendin data to database server response is below");
  //           console.log(Response.status);

  //           if(Response.status=200){
  //             console.log("executing Response status");
  //           // <ChatScreen />


  //           }
  //           navigation.navigate('ChatScreen')
      
  //         })
    
        




  }

  return (
    <>

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>

      <TextInput 
       value={name}
       placeholder="Please register yourself "
       onChangeText={(e)=>{setName(e)}}
      
      />
      <Button
        title="Go to ChatScreen"
        onPress={register}
      />

      {/* <Text>
        {val}
      </Text> */}
    </View>
</>

  );
}
