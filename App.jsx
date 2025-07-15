import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import loginScreen from './src/authentication/LoginScreen.js';
import OtpVerify from './src/authentication/OtpVerify.js';
import PersonalDetails from './src/personal_detail/personal_details.js';
import SelectServiceScreens from './src/personal_detail/select_service_screen.js';
import VerifyId from './src/personal_detail/verify_id_screen.js';
import ConfirmNumber from './src/personal_detail/confirm_number.js';
import ServiceDetail from './src/AllServiceDetails/service_details.js';
import DashboardScreen from './src/dashbord/dashboardscreen.js';
import NewJobs from './src/WalkingNewJobs/newJobScreen.js';
import NetworkProvider from './src/common/NetworkProvider.tsx';
import AddressScreen from './src/Address/AddressScreen.js';
import AppContext from './src/common/AppContext.tsx';
import ServiceDetailGrooming from './src/AllServiceDetails/grooming_service_details.js';
import ServiceDetailTraning from './src/AllServiceDetails/Training_service_details.js';
import ServiceDetailBoarding from './src/AllServiceDetails/boarding_sevice_details.js';
import SplashScreen from './src/authentication/splash.js';
import AddAddress from './src/Address/AddAddress.js';
import AddressSearch from './src/Address/AddressSearch.js';
import AddAddressDetail from './src/Address/AddAddressDetail.js';
import DummyScreen from './src/DummyScreen.js';
import app from './src/utils/pushnotification_helper.js';
import WalkTracking from './src/Tracking/WalkTracking.js';
import Home from './src/dashbord/home.js';
import AllQuotes from './src/WalkingNewJobs/allquotes.js';
import QuoteDetails from './src/WalkingNewJobs/quotDetail.js';
import QuoteDetailEdit from './src/WalkingNewJobs/quoteDetailEdit.js';
import ActiveJobDetail from './src/WalkingNewJobs/activeJobDetail.js';
import Notification from './src/notification/notificationScreen.js';
import WalletScreen from './src/wallet/wallet.js';
import BankDetailScreen from './src/accountscreens/bankdetail.js';
import BankDetailScreen2 from './src/accountscreens/BankDetailScreen.js';
import TrainingTracking from './src/Training/TrainingTracking.js';
import ReplaceTrainerScreen from './src/Training/ReplaceTrainerScreen.js';
import ReplaceTrainerEditScreen from './src/Training/ReplaceTrainerEditScreen.js.js';
import TrainingActiveJobDetail from './src/Training/TrainingActiveJobDetail.js';
import TrainingAllQuotes from './src/Training/TrainingAllquotes.js';
import TrainingQuoteDetailEdit from './src/Training/TrainingQuoteDetailEdit.js';
import TrainingQuoteDetails from './src/Training/TrainingQuotDetail.js';
import TrainingNewJobs from './src/Training/TrainingNewJobs.js';
import ChatPage from './src/ChatPage.js';
import SelectCertificate from './src/accountSubScreen/SelectCertificate.js';
import GroomingTracking from './src/Grooming/GroomingTracking.js';
import GroomingActiveJobDetail from './src/Grooming/GroomingActiveJobDetail.js';
import GroomingAllQuotes from './src/Grooming/GroomingAllquotes.js';
import GroomingQuoteDetailEdit from './src/Grooming/GroomingQuoteDetailEdit.js';
import GroomingQuoteDetails from './src/Grooming/GroomingQuotDetail.js';
import GroomingNewJobs from './src/Grooming/GroomingNewJobs.js';
import CertificateScreen from './src/accountSubScreen/certificateScreen.js';
import EmailVerification from './src/accountSubScreen/emailVerification.js';
import VerificationScreen from './src/accountscreens/verification.js';
import groomingDummyScreen from './src/dummyScreen/groomingDummyScreen.js';
import insuranceDummyScreen from './src/dummyScreen/insuranceDummyScreen.js';
import trainingDummyScreen from './src/dummyScreen/trainingDummyScreen.js';
import boardingDummyScreen from './src/dummyScreen/boardingDummyScreen.js';
import verifyBankOtp from './src/accountscreens/verifyBankOtp.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NonactHome from './assets/images/nonact_home.png';
import ActiveHome from './assets/images/active_home.png';
import NonactAccount from './assets/images/nonact_account.png';
import ActiveAccount from './assets/images/active_ccount.png';
import AccountScreens from './src/dashbord/account.js';
import EditProfileScreen from './src/accountscreens/editprofile.js';
import HealthSupportScreen from './src/accountscreens/healthsupport.js';
import PhotosVideos from './src/accountscreens/photosVideos.js';
import IdentityProof from './src/accountSubScreen/identityProof.js';
import PostcardScreen from './src/accountSubScreen/postcardScreen.js';
import AddressProof from './src/accountSubScreen/addressProof.js';
import AddAddress2 from './src/Address/AddAddress2.js';
import AddressSearch2 from './src/Address/AddressSearch2.js';
import TermsandCondition from './src/WebView/TermsandCondition.js';
import PrivacyPolicy from './src/WebView/PrivacyPolicy.js';
import MessageScreens from './src/dashbord/Message.js';
import MessageChat from './src/messageChat/messageChat.js';
const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    // initializeNotifications();
  }, []);

  // const MessageChatScreen = () => (
  //   <Stack.Navigator
  //     screenOptions={{
  //       headerTitleAlign: 'center',
  //     }}
  //   >
  //     <Stack.Screen name="Message" component={MessageScreens} />
  //     <Stack.Screen
  //       name="MessageChat"
  //       component={MessageChat}
  //       options={{ headerShown: false }}
  //     />
  //   </Stack.Navigator>
  // );

  // const DummyNavigation = () => (
  //   <Stack.Navigator
  //     screenOptions={{
  //       headerTitleAlign: 'center',
  //       headerTitleStyle: {
  //         fontSize: 16,
  //         fontWeight: '600',
  //         fontFamily: 'Inter-SemiBold',
  //       },
  //       headerStyle: {
  //         backgroundColor: '#fff',
  //       },
  //     }}
  //   >
  //     <Stack.Screen name="Boarding" component={boardingDummyScreen} />
  //     {/* <Stack.Screen name="Groooming" component={grooomingDummyScreen} /> */}
  //     <Stack.Screen name="Training" component={trainingDummyScreen} />
  //     <Stack.Screen name="Insurance" component={insuranceDummyScreen} />
  //   </Stack.Navigator>
  // );
  // const AddressScreen = () => {
  //   return (
  //     <Stack.Navigator initialRouteName={'AddAddress'}>
  //       <Stack.Screen
  //         name="AddAddress"
  //         component={AddAddress}
  //         options={{
  //           headerShown: false,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="AddressSearch"
  //         component={AddressSearch}
  //         screenOptions={{
  //           headerTitleAlign: 'center', // Center the title
  //         }}
  //       />
  //       <Stack.Screen
  //         name="AddAddressDetail"
  //         component={AddAddressDetail}
  //         options={{
  //           headerShown: false,
  //         }}
  //       />
  //     </Stack.Navigator>
  //   );
  // };
  const HomeNavigations = () => (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Newjob"
        component={NewJobs}
        options={{
          title: 'Dog Walking',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="Quotes" component={AllQuotes} />
      <Stack.Screen
        name="Details"
        component={QuoteDetails}
        options={{
          title: 'Quote Details', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />
      <Stack.Screen
        name="DetailsEdit"
        component={QuoteDetailEdit}
        options={{
          title: 'Edit Quote', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />
      <Stack.Screen
        name="ActiveJobDetail"
        component={ActiveJobDetail}
        options={{
          title: 'Active Jobs', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen
        name="Service Detail Boarding"
        component={ServiceDetailBoarding}
      />
      <Stack.Screen
        name="Service Detail Grooming"
        component={ServiceDetailGrooming}
      />
      <Stack.Screen
        name="Service Detail Traning"
        component={ServiceDetailTraning}
      />
      <Stack.Screen name="Service Detail" component={ServiceDetail} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen
        name="Bank Details"
        component={BankDetailScreen}
        options={{}}
      />
      <Stack.Screen
        name="BankDetailScreen"
        component={BankDetailScreen2}
        options={{
          headerTitleAlign: 'center', // Center the title
          headerTitle: 'Bank Account Detail',
        }}
      />
      <Stack.Screen
        name="verifyBankOtp"
        component={verifyBankOtp}
        options={{ title: 'Confirm your account' }}
      />

      <Stack.Screen name="Boarding" component={boardingDummyScreen} />

      <Stack.Screen name="Training" component={trainingDummyScreen} />
      <Stack.Screen name="Insurance" component={insuranceDummyScreen} />
      <Stack.Screen name="Grooming" component={groomingDummyScreen} />
      <Stack.Screen
        name="WalkTracking"
        component={WalkTracking}
        options={{
          tabBarStyle: { display: 'none' }, // Hide tab bar for WalkTracking screen
          // tabBarButton: () => null,  // Disable tab bar button for WalkTracking screen
          headerShown: false, // Hide header for WalkTracking screen
        }}
      />

      <Stack.Screen
        name="My Verification"
        component={VerificationScreen}
        options={{}}
      />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerification}
        options={{ title: 'Email Verification' }}
      />
      {/* <Stack.Screen
          name="EmailVerificationopt"
          component={EmailVerificationOtp}
          options={{ title: 'Verifiy OTP' }}
        /> */}
      <Stack.Screen
        name="CertificateScreen"
        component={CertificateScreen}
        options={{ title: 'Upload Certificate' }}
      />

      <Stack.Screen
        name="GroomingNewJob"
        component={GroomingNewJobs}
        options={{
          title: 'Dog Grooming', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />
      <Stack.Screen
        name="GroomingQuoteDetails"
        component={GroomingQuoteDetails}
        options={{
          title: 'Quote Details', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />
      <Stack.Screen
        name="GroomingQuoteDetailEdit"
        component={GroomingQuoteDetailEdit}
        options={{
          title: 'Edit Quote', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />

      <Stack.Screen
        name="GroomingAllQuotes"
        component={GroomingAllQuotes}
        options={{ headerTitle: 'Quotes' }}
      />
      <Stack.Screen
        name="GroomingActiveJobDetail"
        component={GroomingActiveJobDetail}
        options={{
          title: 'Active Jobs', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />
      <Stack.Screen
        name="GroomingTracking"
        component={GroomingTracking}
        options={{
          title: 'Grooming Tracking', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />

      <Stack.Screen
        name="SelectCertificate"
        component={SelectCertificate}
        options={{ title: 'Certificates' }}
      />
      <Stack.Screen
        name="ChatPage"
        component={ChatPage}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TrainingNewJob"
        component={TrainingNewJobs}
        options={{
          title: 'Dog Training', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />
      <Stack.Screen
        name="TrainingQuoteDetails"
        component={TrainingQuoteDetails}
        options={{
          title: 'Quote Details', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />
      <Stack.Screen
        name="TrainingQuoteDetailEdit"
        component={TrainingQuoteDetailEdit}
        options={{
          title: 'Edit Quote', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />

      <Stack.Screen
        name="TrainingAllQuotes"
        component={TrainingAllQuotes}
        options={{ headerTitle: 'Quotes' }}
      />
      <Stack.Screen
        name="TrainingActiveJobDetail"
        component={TrainingActiveJobDetail}
        options={{
          title: 'Active Jobs', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />

      <Stack.Screen
        name="TrainingTracking"
        component={TrainingTracking}
        options={{
          title: 'Training Tracking', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />

      <Stack.Screen
        name="ReplaceTrainerScreen"
        component={ReplaceTrainerScreen}
        options={{
          title: 'Quote Details', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />

      <Stack.Screen
        name="ReplaceTrainerEditScreen"
        component={ReplaceTrainerEditScreen}
        options={{
          title: 'Edit Quote', // Set the title text
          headerTitleAlign: 'center', // Center the title
        }}
      />
    </Stack.Navigator>
  );

  const TabNavigations = () => (
    <Tab.Navigator
      initialRouteName="Home"
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
                style={[
                  styles.icon,
                  { tintColor: color, width: size, height: size },
                ]}
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
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigations}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              }),
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
      <Tab.Screen
        name="Account"
        component={AccountNavigations}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Account' }],
              }),
            );
          },
        })}
      />
    </Tab.Navigator>
  );

  const AccountNavigations = () => (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Account"
        component={AccountScreens}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen
        name="My Verification"
        component={VerificationScreen}
        options={{}}
      />
      <Stack.Screen
        name="Help & Support"
        component={HealthSupportScreen}
        options={{ title: 'Support' }}
      />
      <Stack.Screen
        name="Bank Details"
        component={BankDetailScreen}
        options={{}}
      />
      <Stack.Screen
        name="Photos & Videos"
        component={PhotosVideos}
        options={{ title: 'Photos' }}
      />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerification}
        options={{ title: 'Email Verification' }}
      />
      {/* <Stack.Screen
          name="EmailVerificationopt"
          component={EmailVerificationOtp}
          options={{ title: 'Verifiy OTP' }}
        /> */}
      <Stack.Screen
        name="IdentityProof"
        component={IdentityProof}
        options={{}}
      />
      <Stack.Screen
        name="CertificateScreen"
        component={CertificateScreen}
        options={{ title: 'Upload Certificate' }}
      />
      <Stack.Screen
        name="PostcardScreen"
        component={PostcardScreen}
        options={{}}
      />
      <Stack.Screen name="AddressProof" component={AddressProof} options={{}} />
      <Stack.Screen
        name="AddAddress2"
        component={AddAddress2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddressSearch2"
        component={AddressSearch2}
        options={{
          headerTitleAlign: 'center', // Center the title
          headerTitle: 'Search Location',
        }}
      />

      <Stack.Screen name="Wallet" component={WalletScreen} option />
      <Stack.Screen name="Notification" component={Notification} option />
      <Stack.Screen
        name="BankDetailScreen"
        component={BankDetailScreen2}
        options={{
          headerTitleAlign: 'center', // Center the title
          headerTitle: 'Bank Account Detail',
        }}
      />
      <Stack.Screen
        name="TermsCondition"
        component={TermsandCondition}
        options={{ title: 'Terms and Condition' }}
      />

      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ title: 'Privacy Policy' }}
      />
      <Stack.Screen
        name="SelectCertificate"
        component={SelectCertificate}
        options={{ title: 'Certificates' }}
      />
      <Stack.Screen
        name="verifyBankOtp"
        component={verifyBankOtp}
        options={{ title: 'Confirm your account' }}
      />
    </Stack.Navigator>
  );

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
              title: 'Search Location',
            }}
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
            component={TabNavigations}
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

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 19,
    marginBottom: 12,
  },
  icon: {
    resizeMode: 'contain',
  },
});
export default App;
