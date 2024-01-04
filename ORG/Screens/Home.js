import { View, Text,Button } from 'react-native'
import React, { useEffect ,useState,useContext} from 'react'
import { GetData } from './GetData'
import { ContextApi } from '../App';
export default function Home() {
  const resp=useContext(ContextApi)
  const [test,setTest]=useState([])
  const [temp,setTemp]=useState(false)
//  let emailNew='bengladesh';
  let LoginId=resp.id;
  console.log("LogIn id in Home file is = " + LoginId)
  
  //this is just supposed login id which actually would be obtain through ContextApi  
let imp=GetData('pakistan')// countries  would also be replaced through context Api 
console.log("Home file is here below")
console.log(imp)
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
      console.log(test)
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