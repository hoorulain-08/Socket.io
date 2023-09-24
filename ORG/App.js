import React ,{useEffect,useState}from 'react';
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/native';
import SocketIOClient from 'socket.io-client';

export default function App(){

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = SocketIOClient('http://localhost:3000');

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


  useEffect(() => {
    socket.on('chat message', (msg) => {
      console.log("The Message is here = " ,msg);
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };



  return(
    <View style={{paddingTop:"200px"}}>
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
  )

}