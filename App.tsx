import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import loginScreen from './src/authentication/LoginScreen';
import OtpVerify from './src/authentication/OtpVerify';
import PersonalDetails from './src/personal_detail/personal_details';
import SelectServiceScreens from './src/personal_detail/select_service_screen';
import VerifyId from './src/personal_detail/verify_id_screen';
import ConfirmNumber from './src/personal_detail/confirm_number';
import ServiceDetail from './src/AllServiceDetails/service_details';
import DashboardScreen from './src/dashbord/dashboardscreen';
import NewJobs from './src/WalkingNewJobs/newJobScreen';
import NetworkProvider from './src/common/NetworkProvider';
import AddressScreen from './src/Address/AddressScreen';
import AppContext from './src/common/AppContext';
import ServiceDetailGrooming from './src/AllServiceDetails/grooming_service_details';
import ServiceDetailTraning from './src/AllServiceDetails/Training_service_details';
import ServiceDetailBoarding from './src/AllServiceDetails/boarding_sevice_details';
import SplashScreen from './src/authentication/splash';
import AddAddress from './src/Address/AddAddress';
import AddressSearch from './src/Address/AddressSearch';
import AddAddressDetail from './src/Address/AddAddressDetail';
import DummyScreen from './src/DummyScreen';
import app from './src/utils/pushnotification_helper';
import WalkTracking from './src/Tracking/WalkTracking';

const App = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    // initializeNotifications();
  }, []);

  const TabNav = () => {};

  return (
    <AppContext>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 16,
              fontWeight: '600',
              fontFamily: 'Inter-SemiBold',
            },
            headerStyle: {
              backgroundColor: '#fff',
            },
          }}
          initialRouteName="SplashScreen"
        >
          <Stack.Screen name="Log In or Sign Up" component={loginScreen} />
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Confirm Your Number" component={OtpVerify} />
          <Stack.Screen name="Personal Details" component={PersonalDetails} />
          <Stack.Screen
            name="AddAddress"
            component={AddAddress}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddressSearch"
            component={AddressSearch}
            options={{
              headerTitleAlign: 'center',
              title: 'Search Location', // Center the title
            }}
            // options={{
            //   ,
            // }}
          />
          <Stack.Screen
            name="AddAddressDetail"
            component={AddAddressDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Select Services"
            component={SelectServiceScreens}
          />
          <Stack.Screen name="Verify ID" component={VerifyId} />
          <Stack.Screen
            name="Confirm Your Numbers"
            component={ConfirmNumber}
            options={{
              title: 'Verify OTP',
            }}
          />
          <Stack.Screen name="Service Detail" component={ServiceDetail} />
          <Stack.Screen
            name="DashboardScreen"
            component={DashboardScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddressScreen"
            component={AddressScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Service Detail Grooming"
            component={ServiceDetailGrooming}
          />
          <Stack.Screen
            name="Service Detail Training"
            component={ServiceDetailTraning}
          />
          <Stack.Screen
            name="Service Detail Boarding"
            component={ServiceDetailBoarding}
          />
          <Stack.Screen
            name="DummyScreen"
            component={DummyScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="WalkTrackingg"
            component={WalkTracking}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext>
  );
};

export default App;
