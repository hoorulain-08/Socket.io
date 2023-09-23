import React from 'react';
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';
// import { createStackNavigator } from '@react-navigation/native';
import SocketIOClient from 'socket.io-client';
// const Stack = createStackNavigator();

import { useState ,useEffect} from 'react';
export default function App() {


  const socket = SocketIOClient('http://localhost:3000');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };


  socket.on('connect', () => {
    console.log('Connected to server');
  });
  
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
  
  socket.on('chat message', (msg) => {
    console.log('New message:', msg);
  });
  
  const sendMessage = (msg) => {
    socket.emit('chat message', msg);
  };

  const ChatScreen = () => {
    // const [messages, setMessages] = useState([]);
    // const [message, setMessage] = useState('');
  
    // useEffect(() => {
    //   socket.on('chat message', (msg) => {
    //     setMessages([...messages, msg]);
    //   });
    // }, [messages]);
  
    // const handleSendMessage = () => {
    //   sendMessage(message);
    //   setMessage('');
    // };
  
    // return (
    //   <View style={styles.container}>
    //     <Text>Chat Screen</Text>
    //     <View>
    //       {messages.map((msg, index) => (
    //         <Text key={index}>{msg}</Text>
    //       ))}
    //     </View>
    //     <TextInput
    //       value={message}
    //       onChangeText={setMessage}
    //     />
    //     <Button
    //       title="Send"
    //       onPress={handleSendMessage}
    //     />
    //   </View>
    // );
  };

  return (
     
    <View > 
    <Text>Chat Screen</Text>
    <View>
      {messages.map((msg, index) => (
        <Text key={index}>{msg}</Text>
      ))}
    </View>
    <TextInput
      value={message}
      onChangeText={setMessage}
    />
    <Button
      title="Send"
      onPress={handleSendMessage}
    />
  </View>
      
  
 
  );
}