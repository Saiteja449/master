// import React, { useEffect } from 'react';
// import { Text, View, Image } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import  grooomingDummyScreen from '../dummyScreen/boardingDummyScreen'
// import  boardingDummyScreen from '../dummyScreen/boardingDummyScreen'
// import  trainingDummyScreen from '../dummyScreen/trainingDummyScreen'
// import  insuranceDummyScreen from '../dummyScreen/insuranceDummyScreen'

// const App = () => {

//   const Stack = createNativeStackNavigator()

//   return (

//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{
//           headerTitleAlign: 'center',
//           headerTitleStyle: {
//             fontSize: 16,
//             fontWeight: '600',
//             fontFamily: 'Inter-SemiBold',
//           },
//           headerStyle: {
//             backgroundColor: '#fff',
//           }

//         }}>
//           <Stack.Screen name = 'Boarding' component ={boardingDummyScreen} />
//           <Stack.Screen name = 'Groooming' component ={grooomingDummyScreen} />
//           <Stack.Screen name = 'Training' component ={trainingDummyScreen} />
//           <Stack.Screen name = 'Insurance' component ={insuranceDummyScreen} />

//         </Stack.Navigator>
//       </NavigationContainer>
//   );
// }

// export default App;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const dummyScreenNavigation = () => {
  return (
    <View>
      <Text>dummyScreenNavigation</Text>
    </View>
  );
};

export default dummyScreenNavigation;

const styles = StyleSheet.create({});
