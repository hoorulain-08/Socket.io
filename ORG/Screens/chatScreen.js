import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Platform,FlatList ,SafeAreaView} from 'react-native';
// import { createStackNavigator } from '@react-navigation/native';
import SocketIOClient from 'socket.io-client';
// const Stack = createStackNavigator();
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

export default function ChatScreen() {

  const [db, setDb] = useState(SQLite.openDatabase('example.db'));
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState(undefined);
  let [flatListItems, setFlatListItems] = useState([]);
  const [test,setTest]=useState(['hello wold']);
  var i=0;
  const courses = [
    "Full Stack Developement Program",
    "Python Automation Testing Program",
    "UI/UX Program",
  ];

  var tab=0;
  const socket = SocketIOClient('http://192.168.43.52:3000'); //replacing current network IP
  const [
    messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  
 let x={id:2,name:"nalisha"}
  const handleSendMessage = () => {
    sendMessage(message);
    setMessage(''); 
  


  };


  useEffect(() => {

     console.log(test);
     console.log("useEffect.1")
  //     db.transaction(tx => {
  //       tx.executeSql('SELECT * FROM NewNewKiwi', null,
  //         // (txObj, resultSet) => setNames(resultSet.rows._array),
  //           (txObj, resultSet) =>setTest(resultSet.rows._array),
              
  //             // setTest(resultSet.rows._array)
  //         // setNames(test),
  //          (txObj, error) => console.log(error)
  //       );
  // // console.log(names);
  //     });

    console.log("chatScreen useEffect")
    socket.on('chat message', (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);

      // db.transaction(tx => {
      //   tx.executeSql('CREATE TABLE IF NOT EXISTS NewNewKiwi (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'),
      //   i=i+1,
      //   console.log("Table  Created"),
      //   console.log("value of i is = "+i)
      // });
  //     db.transaction(tx => {
  //       tx.executeSql('SELECT * FROM NewNewKiwi', null,
  //         // (txObj, resultSet) => setNames(resultSet.rows._array),
  //           (txObj, resultSet) =>setTest(resultSet.rows._array),
  //             console.log('selec from NewNewKiwi new table '),
  //             // setTest(resultSet.rows._array)
  //         // setNames(test),
  //          (txObj, error) => console.log(error)
  //       );
  // // console.log(names);
  //     });

  
      
      console.log("test is here below");
      console.log(test);

      db.transaction(tx => {
        tx.executeSql('SELECT * FROM NewKiwi', null,
          // (txObj, resultSet) => setNames(resultSet.rows._array),
            (txObj, resultSet) =>setTest(resultSet.rows._array),
              console.log('selec from NewKiwi new table '),
              // setTest(resultSet.rows._array)
          // setNames(test),
           (txObj, error) => console.log(error)
        );
  // console.log(names);
      });


    });

    

  }, [db]);

useEffect(()=>{

  console.log("useEffect.2")
  db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS NewKiwi (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'),
    i=i+1,
    console.log("Table  Created"),
    console.log("value of i is = "+i)
  });

},[])

useEffect(()=>{  
 //  console.log("useEffect.3")

 db.transaction(tx => {
        tx.executeSql('SELECT * FROM NewKiwi', null,
          // (txObj, resultSet) => setNames(resultSet.rows._array),
            (txObj, resultSet) =>setTest(resultSet.rows._array),
              // console.log('selec from NewKiwi new table '),
              // setTest(resultSet.rows._array)
          // setNames(test),
           (txObj, error) => console.log(error)
        );
  // console.log(names);
      });

  
}
)






  const sendMessage = () => {
    if (message) {
      // This below message is used to send the message from anyside
      socket.emit('chat message', message, () => setMessage(''));
      db.transaction(tx => {
        tx.executeSql('INSERT INTO NewKiwi (name) values (?)', [message],
          (txObj, resultSet) => {
            let existingMessage = [...message];
            existingMessage.push({ id: resultSet.insertId, name: message});
            setMessages(existingMessage);
           console.log('ExistingMessage is here below = ')
            console.log(existingMessage)
            console.log('test in message is here = ' + test[0])
            setCurrentName(undefined);
          },
          (txObj, error) => console.log(error)
        );
      });
    }
    else
    alert("Please Enter something")
   
  };

  const addName = () => {
  
  }


  return (
    <SafeAreaView style={{ margin: 10,paddingTop:"50px" }}>
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
        onPress={handleSendMessage}
      />

      {/* <View>
      // This method is effecive   only when we  have 1 directional  now to display 
      // two or more directional  arrays   we hae to use flat lis in react natie 
        {messages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
      </View> */}

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

