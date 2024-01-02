import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Platform,FlatList ,SafeAreaView} from 'react-native';
// import { createStackNavigator } from '@react-navigation/native';
import SocketIOClient from 'socket.io-client';
import { useState, useEffect } from 'react';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import  db from '../Database/SqliteDb';
// import  fb from '../Database/SqliteDb';
import fb from '../Database/SqliteNew';
export default function ChatScreen() {

  //const [db, setDb] = useState(SQLite.openDatabase('example.db'));
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState([]);
  const [currentName, setCurrentName] = useState(undefined);
  let [flatListItems, setFlatListItems] = useState([]);
  const [test,setTest]=useState(['hello wold']);
  // const avdId = DeviceInfo.getSerialNumber();
 const [count,setCount]=useState(false)
  const courses = [
    "Full Stack Developement Program",
    "Python Automation Testing Program",
    "UI/UX Program",
  ];

  var tab=0;
  const socket = SocketIOClient('http://192.168.70.158:3000'); //replacing current network IP
  const [
    messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  
 let x={id:2,name:"nalisha"}
  const handleSendMessage = () => {
    sendMessage(message);
    setMessage(''); 
  };

  useEffect(() => {
    // Connect to the Socket.io server

console.log("1 UE")
if(!count){
  console.log("useEffect is working count ")

  display();
}
    socket.connect();
    // console.log("Messages stored in Array are here below  ") 
    // Listen for incoming messages
    socket.on('chatMessage', (message) => {
   // setMessages((prevMessages) => [...prevMessages, message]);
      //  console.log("Messages stored in Array are here below  ") 
      // console.log(messages)
   //   console.log("Message recevied from Backend are below ")
   //   console.log(message)

// Sqlite Database
db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO messages (name) values (?)`,
      [message],
      (tx, result) => {
        console.log('Message saved to the database');
      },
      (error) => {
        console.log('Error saving message:', error);
      }
    );

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM messages ', null,
         (txObj, resultSet) =>{ setTest(resultSet.rows._array)
  
      
      },
      
         (txObj, error) => console.log(error)
      );
// console.log(names);
    });

  });


    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);


  const sendMessage = () => {
      fb.transaction(tx => {
        tx.executeSql(
          `INSERT INTO InMessage (name) values (?)`,
          [message],
          (tx, result) => {
            console.log('Message saved to the fb database');
          },
          (error) => {
            console.log('Error in fb  saving message:', error);
          }
        );
      });
      fb.transaction(tx => {
        tx.executeSql('SELECT * FROM InMessage ', null,
           (txObj, resultSet) =>{ setName(resultSet.rows._array)
          // , console.log(resultSet.rows._array)
        
        },
              // console.log('1.'),
              // setTest(resultSet.rows._array)
             
          // setNames(test),
           (txObj, error) => console.log(error)
        );
  // console.log(names);
      })

      socket.emit('chatMessage', message);
      setCount(true)
      setMessage('');
   
  };

  const display = () => {
console.log("ENTRING In display function ")
db.transaction( (tx)=>{
  tx.executeSql('SELECT * FROM messages',null,(txObj,resultSet)=>{
    console.log("In Sqlite Database display function ")
  setTest(resultSet.rows._array)
  console.log(resultSet.rows._array)
  }
  )
}
)


fb.transaction(tx => {
  tx.executeSql('SELECT * FROM InMessage ', null,
     (txObj, resultSet) =>{
       setName(resultSet.rows._array),
       console.log("in database  display function  ")
    , console.log(resultSet.rows._array)
  
  },
        // console.log('1.'),
        // setTest(resultSet.rows._array)
       
    // setNames(test),
     (txObj, error) => console.log(error)
  );
// console.log(names);
});


return(
  <View>
  <Text style={{color:'green'}}> 
  This Following List is From FrontEnd
</Text>
<FlatList 
style={{color:'red'}}
data={test}
renderItem={(e)=>{
  return(
     <View><Text>{e.index.id}</Text>
  <Text>{e.item.name}</Text>
  </View>
  )
}}
/>

<Text>
  {'\n'}
</Text>

<Text style={{color:'green'}}> 
  This Following List is From FrontEnd
</Text>
<FlatList 
style={{color:'red'}}
data={name}
renderItem={(e)=>{
  return(
     <View><Text>{e.index.id}</Text>
  <Text>{e.item.name}</Text>
  </View>
  )
}}
/>












</View>
)

  }


  return (
    <SafeAreaView style={{ margin: 10,marginTop:50 }}>

    
        
      <View style={styles.container}>
  
      </View>
      <Text>
        .
        .
        .
        .
        Chat Screen 2 TWO</Text>
{/* 
        <TextInput value={currentName} placeholder='name' onChangeText={setCurrentName} /> */}
      {/* <Button title="Add Name" onPress={addName} /> */}
      
      <TextInput
        value={message}
        placeholder='Enter message'
        onChangeText={(val) => { setMessage(val) }}
        style={{ borderWidth: 1, borderColor: 'black', padding: 12, borderRadius: 4 }}
      />
      <Button
        title="Send"
        onPress={sendMessage}
      />

      {/* <View>
      // This method is effecive   only when we  have 1 directional  now to display 
      // two or more directional  arrays   we hae to use flat lis in react natie 
        {messages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
      </View> */}


<Text>
  These messages are displayed from Backend
</Text>
<FlatList 
data={test}
renderItem={(e)=>{
  return(
     <View><Text>{e.index.id}</Text>
  <Text>{e.item.name}</Text>
  </View>
  )
}}
/>

<Text>
  {'\n'}
</Text>

<Text style={{color:'green'}}> 
  This Following List is From FrontEnd
</Text>
<FlatList 
style={{color:'red'}}
data={name}
renderItem={(e)=>{
  return(
     <View><Text>{e.index.id}</Text>
  <Text>{e.item.name}</Text>
  </View>
  )
}}
/>


    </SafeAreaView>



  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    margin: 8
  }
});