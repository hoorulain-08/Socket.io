import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,

} from '../Style/FeedStyles';
import {styled} from '../Style/FeedStyles'
import { style } from '../Style/style';
import ProgressiveImage from '../Components/ProgressiveImage';
import { Text } from 'react-native';
// import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity,ScrollView} from 'react-native';
// import firestore from '@react-native-firebase/firestore';

const PostCard = ({item, onDelete, onPress}) => {
//  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  console.log("userName is here download below = ")
console.log(item.post);
// setUserData(item.userName)
  likeIcon = item.liked ? 'heart' : 'heart-outline';
  likeIconColor = item.liked ? '#2e64e5' : '#333';

  if (item.likes == 1) {
    likeText = '1 Like';
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes';
  } else {
    likeText = 'Like';
  }

  if (item.comments == 1) {
    commentText = '1 Comment';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments';
  } else {
    commentText = 'Comment';
  }
  function offer(){
    /*
    this function would give return in response 
     give value that offered ut the user to the owner 
    
    
    */
  }

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }ec
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    
    <ScrollView>
    <Card key={item.id}>
       
      <UserInfo>
      <UserImg
         source={item.userImg}
        />
        <UserInfoText>
          <TouchableOpacity onPress={onPress}>
            <UserName>
            
            {item.userName}
              hello 
            </UserName>
          </TouchableOpacity>
          {/* <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime> 
          
          
          */} 

        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      <InteractionWrapper>
            <Interaction onPress={offer}>
         <TouchableOpacity  style={style.Btn}>
          <Text  style={style.txt}>
            Give Offer  
          </Text>
         </TouchableOpacity>
        </Interaction>
        <Interaction onPress={() => onDelete(item.id)}>
          <TouchableOpacity  style={style.Btn}>
          <Text  style={style.txt}>
         Discard 
          </Text>
         </TouchableOpacity>
          </Interaction>
        {/* {item.userId == item.userId ? (
             //FOR SOMETHING ASSUMING THESE THINGS LIKE THIS FOR MORE 
          <Interaction onPress={() => onDelete(item.id)}>
          <TouchableOpacity  style={styled.btn}>
          <Text  style={styled.txt}>
         Discard 
          </Text>
         </TouchableOpacity>
          </Interaction>
        ) 
        : null} */}
      </InteractionWrapper>
    </Card>
    </ScrollView>
  );
};

export default PostCard;
