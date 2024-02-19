
// import React from 'react'
import React, {useContext, useEffect, useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  Image
} from 'react-native';
import {Container} from '../Style/style';
import { GetData } from './GetData';
 import PostCard from '../Components/PostCard';
 import { useRoute } from '@react-navigation/native';
import { MyContext } from '../ContextApi/Context';
import { ContextApi } from '../App';
 export default function Wall (props) {
//   console.log("in wall js file below ");
// console.log(props.TestExp)
// here in this file API that would display the countries posts that matches the 
// same country the user have 
const route = useRoute();
// if(props){
//  const { TestExp } = route.params;
// console.log("Data is below down ... ") 
// console.log(TestExp)  
// }
const resp=useContext(ContextApi);
const [show ,setShow]=useState(false);
const [flag,setFlag]=useState(0)
let country=resp.country;
console.log("country received from login  is below  ")
console.log(country)
let tempCountry='pakistan'
let imp=GetData(country);

if(imp==null){
  console.log("loading posts")
}
else
{
//console.log("i have loaded components in GetData.js now in  wall file  ")

//console.log(imp)
if(flag==0){
  console.log("in flag show the if condition is down below  value of flagis = " + flag)
  showList();
}

}

let con=useContext(MyContext);
// console.log("postValue is not null");
//console.log(con.PostValue.pID)
// if(con.PostValue.pID!==0){
// console.log("postValue is not null")
// }
// // console.log(con.variableValue)

    const Posts = [
        {
          id: '1',
          userName: 'Jenny Doe',
           userImg: require('../assets/users/user-3.jpg'),
          postTime: '4 mins ago',
          post:
            'Hey there, THis is testing Post checking and testing .... for my cargo App  .',
        //  postImg: require('../assets/posts/post-img-3.jpg'),
        ToCountry:"UAE",
        FromCountry:'Pakistan',
        wgt:"10"
        },
        {
          id: '2',
          userName: 'Jenny Doe',
           userImg: require('../assets/users/user-3.jpg'),
          postTime: '4 mins ago',
          post:
             'Hey there, THis is testing Post checking and testing .... for my cargo App  .',
        //  postImg: require('../assets/posts/post-img-3.jpg'),
        ToCountry:"UAE",
        FromCountry:'Pakistan',
        wgt:"10"
        },
       

  ]



  // const combinedArray = [...Posts, ...TestExp];
  const combinedArray = [...Posts];

 //console.log(combinedArray)



  const imageArray = [
   {userImg: require('../assets/users/user-3.jpg')} ,
   {userImg: require('../assets/users/user-1.jpg')},
   {userImg: require('../assets/users/user-4.jpg')},
    // Add more image sources as needed
  ];

  const renderItem = ({ item }) => (
    <Image source={item.userImg}  />
  );

function showList(){
  console.log("showList down below ")

  setShow(true)
  setFlag(1)

}
 
  return (
 
<SafeAreaView style={{marginTop:25}}>   

    <View> 

          {show?

      <FlatList
            data={imp}
            renderItem={({item}) => (
              <PostCard
                item={item}
               
                // onPress={() =>
                //   navigation.navigate('HomeProfile', {userId: item.userId})
                // } I would instead inclde negio tiate button in App 
              />
            )}
            // keyExtractor={(item) => item.id}
           
            // showsVerticalScrollIndicator={false}
          />  
       :
         <Text style={{marginTop:50,marginLeft:50}}>
         Hellllo  World Loading
        </Text>

}



     </View>
    </SafeAreaView>
  )
}




