import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from 'react-native';
// import { createStackNavigator } from '@react-navigation/native';
import SocketIOClient from 'socket.io-client';
// const Stack = createStackNavigator();

import { useState, useEffect } from 'react';
export default function App() {

  const socket = SocketIOClient('http://192.168.43.52:3000');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };


  useEffect(() => {
    socket.on('chat message', (message) => {
      console.log(message)
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit('chat message', message, () => setMessage(''));
    }
  };


  return (
    <SafeAreaView style={{ margin: 10,paddingTop:"50px" }}>
      <View>
  
      </View>
      <Text>Chat Screen</Text>
      
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

<View>
        {messages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
      </View>
    </SafeAreaView>



  );
}