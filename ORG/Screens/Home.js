import { View, Text,Button } from 'react-native'
import React, { useEffect ,useState} from 'react'
import { GetData } from './GetData'
export default function Home() {

  const [test,setTest]=useState([])
  const [temp,setTemp]=useState(false)
//  let emailNew='bengladesh';
  let LoginId=3; //this is just supposed login id which actually would be obtain through ContextApi  
let imp=GetData('pakistan')

let j=false;


 
 //later this would be replaced with the country 

function disp(){
  console.log('y from another file is here  ')
 // FetchApi();
 // console.log('kjhjkjhgjhgjhgjhg')
 
  console.log(imp)

 for(let i=0;i<imp.length;i++){
    console.log("temp i is = ")
    console.log(imp[i])
    if(LoginId==imp[i].id){
  console.log('entering IF of the loop LogIn id is = ' +LoginId +"test and test[i] is = "+imp[i].id)
      setTest([...test,imp[i]])
      j=true
    }


  }




}

  return (
    <View>
      <Text>Home</Text>
      <Text>
        messeage received would be through API.
        Message would be receve through
      </Text>
      <View>
    <Button  title='Show results' onPress={disp}/>
      </View>
      {j?
      null:
      <Text>
        {test.map((e)=>
        <Text>
          {e.id}
          {'\n'}
          {e.name}
          {'\n'}
          {e.email}
          {'\n'}
          {e.phone}
          {'\n'}
          {e.country}
          </Text>
        )
        
        }
      </Text>
}
      {
        temp?
        <Text>Not loaded yet </Text>:<Text>  heLLO WORLD</Text>
      }
    </View>
  )
}