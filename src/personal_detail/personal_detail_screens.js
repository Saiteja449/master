

import React from 'react';
import {Text,View,Image} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import VerifyId from './verify_id_screen';
import ConfirmNumber from './confirm_number';
import ServiceDetail from '../AllServiceDetails/service_details';
import PersonalDetails from './personal_details';
import SelectServiceScreens from './select_service_screen';




const PersonalDetailScreens = () =>  {


  const Stack = createNativeStackNavigator()

  
  return (
   <NavigationContainer independent={true}>
    <Stack.Navigator  screenOptions={{
      headerTitleAlign:'center',
      headerTitleStyle:{
        fontSize:16,
        fontWeight:'600',
        fontFamily:'Inter-SemiBold',
      },
      headerStyle:{
        backgroundColor:'#fff',
      },
    
    }}>
      <Stack.Screen name='Personal Details' component={PersonalDetails} />
      {/* <Stack.Screen name='Select Services' component={SelectServiceScreens}  /> 
      <Stack.Screen name='Verify ID ' component={VerifyId}  /> 
      <Stack.Screen name='Confirm Your Number ' component={ConfirmNumber}  /> 
      <Stack.Screen name='Service Detail ' component={ServiceDetail}  />  */}
    </Stack.Navigator>
   </NavigationContainer>

  );
}



export default PersonalDetailScreens;
