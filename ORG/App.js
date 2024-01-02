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
// import { Provide,Practice } from './Context';
// const ss=React.createContext();
const Stack = createNativeStackNavigator();

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}


export default function App() {
  return (
    //  <Provide>
    // <PracticeProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="TestChat" component={TestingChat} />
      <Stack.Screen name="LogIn" component={Login} />
       <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
       
      </Stack.Navigator>
    </NavigationContainer>
  //  </PracticeProvider>
   
  );
}

