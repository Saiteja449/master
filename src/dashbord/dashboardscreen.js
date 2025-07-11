

import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import AccountScreens from './account';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActiveMessage from '../../assets/images/active_message.png'
import NonactHome from '../../assets/images/nonact_home.png'
import ActiveHome from '../../assets/images/active_home.png'
import NonactMessage from '../../assets/images/nonact_message.png'
import NonactAccount from '../../assets/images/nonact_account.png'
import ActiveAccount from '../../assets/images/active_ccount.png'
import HomeScreens from './homenavigationscreen';
import MessageChatScreen from '../messageChat/messageChatScreen';
import AcountnavigationScreen from '../accountscreens/acountnavigationScreen';


const Tab = createBottomTabNavigator()


const DashboardScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === 'Home') {
              iconSource = focused ? ActiveHome : NonactHome;
            } 
            // else if (route.name === 'Message') {
            //   // iconName = 'Booking';
            //   iconSource = focused ? ActiveMessage : NonactMessage;
            // }
            else if (route.name === 'Account') {
              // iconName = 'Booking';
              iconSource = focused ? ActiveAccount : NonactAccount;
            }



            return (
              <View style={styles.iconContainer}>
                <Image
                  source={iconSource}
                  style={[styles.icon, { tintColor: color, width: size, height: size }]}
                />
              </View>
            );
          },
          tabBarStyle: {
            borderBottomWidth: 0,


          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            fontFamily: 'Inter-Medium',

          },
          tabBarActiveTintColor: '#FE8705',
          tabBarInactiveTintColor: '#828282',
        })}>
        <Tab.Screen name='Home' component={HomeScreens} options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                })
              );
            },
          })}
        />
        {/* <Tab.Screen name='Message' component={MessageChatScreen} options={{
          headerShown: false,
          unmountOnBlur: true,
          headerTitleAlign: 'center', headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,

          },

        }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Message' }],
                })
              );
            },
          })} /> */}
        <Tab.Screen name='Account' component={AcountnavigationScreen} options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Account' }],
                })
              );
            },
          })} />
      </Tab.Navigator>
    </NavigationContainer>

  )
}
const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 19,
    marginBottom: 12
  },
  icon: {
    resizeMode: 'contain', // Make sure the icon resizes correctly
  },
});


export default DashboardScreen;
