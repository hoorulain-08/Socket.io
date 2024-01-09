import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DrawerHeader = (props )=> {


    console.log('in Dwarer Header ')
    return (
        <View style={{flex: 1}}>
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{backgroundColor: '#6facbf'}}>
            <ImageBackground
              source={require('../assets/drawerBack.png')}
              style={{padding: 20}}>
              <Image
                source={require('../assets/users/user-3.jpg')}
                style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: 'Roboto-Medium',
                  marginBottom: 5,
                }}>
                John Doe
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Roboto-Regular',
                    marginRight: 5,
                  }}>
                  280 Coins
                </Text>
                <FontAwesome5 name="coins" size={14} color="#fff" />
              </View>
            </ImageBackground>
            <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
              <DrawerItemList {...props} />
            </View>
          </DrawerContentScrollView>
          <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
            <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="share-social-outline" size={22} />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Roboto-Medium',
                    marginLeft: 5,
                  }}>
                  Tell a Friend
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="exit-outline" size={22} />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Roboto-Medium',
                    marginLeft: 5,
                  }}>
                  Sign Out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
}
export default DrawerHeader
// return (
   
//        <View style={style.drawerHeader}>
//          <Image source={require('../assets/users/user-4.jpg')} style={style.profilePicture} />
//          <Text style={style.profileName}>Hoor ul ain </Text>
//        </View>
//   )