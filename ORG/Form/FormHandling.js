
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  Button
} from 'react-native';
import React, {useRef, useState} from 'react';
import { Calculation } from '../Data/Calculation';
import { UAE } from '../Data/Data';
import { countries } from '../Components/Countries';
import {style} from '../Style/style'
import { Formik } from 'formik';
 export  var TestExp={test:'',val:''}
 import { useNavigation } from '@react-navigation/native';
const FormFormik = ({Navigation}) => {
  const navigation = useNavigation(); 
  const [rate,setRate]=useState()
  const [confirm,setConfirm]=useState(false);
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [click, setClick] = useState(false);
  const [data, setData] = useState(countries);
  const [coun,setCoun]=useState('')
  const [selectedCountry, setSelectedCountry] = useState('');
 const[show,setShow]=useState(false)
  const searchRef = useRef();
  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.country.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(countries);
    }
  };
  function GoNav(){
    navigation.navigate('TestNav');
  }
  function GoHome(){
    navigation.navigate('wall', { TestExp });
  }
 
  return (
    <>

{confirm?

<View  style={style.confSTView}>
<Text style={style.ConfTxt}>
 Proposed rate  for the weight of your  package   is </Text>
 <Text  style={style.confRate}>{rate}AED  {'\n'}</Text>
<Text style={style.ConfTxtD}>
  Will you pay this rate the this Carrier person talking your Parcel
</Text>
<View style={style.confBtn}>

<TouchableOpacity
      style={style.SubStY}
        onPress={GoNav} >
    {/* //  <Button title='Submit' onPress={handleSubmit} /> */}
      <Text style={style.SubTxtY}   >
       yes
      </Text>
    </TouchableOpacity>



  {/* <Button title='No ' onPress={GoHome}/> */}
<TouchableOpacity
      style={style.SubStN}
        onPress={GoHome} >
    {/* //  <Button title='Submit' onPress={handleSubmit} /> */}
      <Text style={style.SubTxtN}   >
      No
      </Text>
    </TouchableOpacity>





</View>

</View>
:

<Formik
      initialValues={{ name: '',search:'',weight:0 ,test:'',country:''}}
      onSubmit={(values) => {
        console.log('submitting the definite values below ')
        console.log(values);
        console.log("Country value is =  ")
        console.log(selectedCountry)
        TestExp.test=selectedCountry;
        TestExp.val=values.name;
        console.log(TestExp);
        // console.log(UAE[0][1])
        
        if(values.weight>10 || values.weight<=0 ){
          alert("weight  can not be send above 10kg and less than 0 kg ");

        }
        else{
          const cel= Math.ceil(values.weight);
          console.log("ceil is here = ");
          console.log(cel)
       var    rat=Calculation(cel);
           setRate(rat)
             console.log("ret is here = " + rat)
             
        setConfirm(true)
     
          
             //     navigation.navigate('TestNav', { TestExp });
                         
        }
   
      }}
    >
       {({ handleChange, handleBlur, handleSubmit, values }) => (
        <>
       <View>
       
<View style={{marginTop:30 }}>

<Text style={style.TxtSt}>
    Enter total weight  you want to send 
    </Text>
<TextInput  style={style.input}
 value={values.weight}
 onChangeText={handleChange('weight')}
/>

<Text style={style.TxtSt}>
    Enter descripton of your item
    </Text>
<TextInput  style={style.inputNew}
 value={values.name}
 onChangeText={handleChange('name')}
   />

<Text style={style.TxtSt}>
    Select the Pickup  country 
    </Text>

    <View style={{flex: 1}}>
     
      <TouchableOpacity
        style={style.TouchOP}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{fontWeight:'600'}} >
          {selectedCountry == '' ? 'Select Country' : selectedCountry}
        </Text>


        {clicked ? (
          <Image
            source={require('../assets/upload.png')}
            style={{width: 20, height: 20}}
          />
        ) : (
          <Image
            source={require('../assets/dropdown.png')}
            style={{width: 20, height: 20}}
          />
        )}
      </TouchableOpacity>
      {clicked ? (
        <View
          style={style.ViewSt}>
          {/* <TextInput
            placeholder="Search.."
            value={values.selectedCountry}
            ref={searchRef}
            onChangeText={handleChange('selectedCountry')}
            style={style.InpSt}
          /> */}

          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={style.FList}
                  onPress={() => {
                    setSelectedCountry(item.country);
                    setClicked(!clicked);
                    onSearch('');
                    setSearch('');
                    setShow(true)
                  }}>
                  <Text style={{fontWeight: '600'}}>{item.country}</Text>
                </TouchableOpacity>
              );
            }}
          />








          
        </View>
      ) : null}
    </View>
</View>



{show ?
<> 

<Text style={style.TxtSty}>
    Select the DropOff  country 
    </Text>
      <TouchableOpacity
        style={style.TouchOP}
        onPress={() => {
          setClick(!click);
        }}>
        <Text style={{fontWeight:'600'}}>
          {coun== '' ? 'Select Country' : coun}
        </Text>
        {click ? (
          <Image
            source={require('../assets/upload.png')}
            style={{width: 20, height: 20}}
          />
        ) : (
          <Image
            source={require('../assets/dropdown.png')}
            style={{width: 20, height: 20}}
          />
        )}
      </TouchableOpacity>
      {click ? (
        <View
          style={style.ViewSt}>
          <TextInput
            placeholder="Search.."
            value={values.search}
            ref={searchRef}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={style.InpSt}
          />

          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={style.FList}
                  onPress={() => {
                    setCoun(item.country);
                    setClick(!click);
                    onSearch('');
                    setSearch('');
                  }}>
                  <Text style={{fontWeight: '600'}}>{item.country}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
   
    
    </>
:null
          }


    </View>

   <View style={{marginStart:70,marginTop:'60%'}}>
    <TouchableOpacity
      style={style.SubSt}
        onPress={handleSubmit}
      
    >
    {/* //  <Button title='Submit' onPress={handleSubmit} /> */}
      <Text style={style.SubTxt}   >
        Submit New
      </Text>
    </TouchableOpacity>


</View>


</>)}
</Formik>

}

</>




  );
};

export default FormFormik;
















   {/* <Formik
        initialValues={{search:'',  email: '', password: ''}}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={style.formContainer}>

 )}


        </Formik>   */}
