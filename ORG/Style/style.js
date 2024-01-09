
import { StyleSheet } from "react-native";


export const 
style = StyleSheet.create({
reg:
{
    borderWidth:1,
    borderColor:'black',
    padding:12,
    borderRadius:3
},

background: {
    flex: 1,
    resizeMode: 'cover', // or 'contain' depending on your preference
  },

    drawer: {
      width: '70%', // Replace with your desired width
      backgroundColor: 'red', // Replace with your desired background color
      shadowColor: 'pink', // Replace with your desired shadow color
      shadowOpacity: 0.8,
      elevation: 6,
    },
 



    Btn :  {
      padding: 5,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: 'white',
      backgroundColor: '#6facbf',
      width:100,
      height:50
    },
  txt : {
      fontSize: 15,
      padding: 8,
     
      fontWeight:'bold'

    }
,
    drawerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    profilePicture: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
    }


})

// export {style}