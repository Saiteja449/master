// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React from 'react';
// import AccountScreens from '../dashbord/account';
// import EditProfileScreen from './editprofile';
// import VerificationScreen from './verification';
// import HealthSupportScreen from './healthsupport';
// import BankDetailScreen from './bankdetail';
// import PhotosVideos from './photosVideos';
// import EmailVerification from '../accountSubScreen/emailVerification';
// import EmailVerificationOtp from '../accountSubScreen/verifyEmailOtp';
// import IdentityProof from '../accountSubScreen/identityProof';
// import CertificateScreen from '../accountSubScreen/certificateScreen';
// import PostcardScreen from '../accountSubScreen/postcardScreen';
// import AddressProof from '../accountSubScreen/addressProof';
// import AddAddress from '../Address/AddAddress';
// import AddressSearch from '../Address/AddressSearch';
// import AddAddress2 from '../Address/AddAddress2';
// import AddressSearch2 from '../Address/AddressSearch2';
// import WalletScreen from '../wallet/wallet';
// import Notification from '../notification/notificationScreen';
// import BankDetailScreen2 from './BankDetailScreen';
// import TermsandCondition from '../WebView/TermsandCondition';
// import PrivacyPolicy from '../WebView/PrivacyPolicy';
// import SelectCertificate from '../accountSubScreen/SelectCertificate';
// import verifyBankOtp from './verifyBankOtp';

// const AcountnavigationScreen = () => {

//     const Stack = createNativeStackNavigator()

//     return (
//         <NavigationContainer independent={true}>
//             <Stack.Navigator screenOptions={{
//                 headerTitleAlign: 'center',

//             }}>
//                 <Stack.Screen name='Account' component={AccountScreens} options={{ headerShown: false }} />
//                 <Stack.Screen name='EditProfile' component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
//                 <Stack.Screen name='My Verification' component={VerificationScreen} options={{}} />
//                 <Stack.Screen name='Help & Support' component={HealthSupportScreen} options={{ title: 'Support' }} />
//                 <Stack.Screen name='Bank Details' component={BankDetailScreen} options={{}} />
//                 <Stack.Screen name='Photos & Videos' component={PhotosVideos} options={{ title: 'Photos' }} />
//                 <Stack.Screen name='EmailVerification' component={EmailVerification} options={{title: 'Email Verification'}} />
//                 <Stack.Screen name='EmailVerificationopt' component={EmailVerificationOtp} options={{title: 'Verifiy OTP'}} />
//                 <Stack.Screen name='IdentityProof' component={IdentityProof} options={{}} />
//                 <Stack.Screen name='CertificateScreen' component={CertificateScreen} options={{title:'Upload Certificate'}} />
//                 <Stack.Screen name='PostcardScreen' component={PostcardScreen} options={{}} />
//                 <Stack.Screen name='AddressProof' component={AddressProof} options={{}} />
//                 <Stack.Screen name="AddAddress2" component={AddAddress2}
//                     options={{
//                         headerShown: false,
//                     }} />
//                 <Stack.Screen name="AddressSearch2" component={AddressSearch2}
//                     options={{
//                         headerTitleAlign: 'center', // Center the title
//                         headerTitle: 'Search Location',
//                     }} />

//                 <Stack.Screen name='Wallet' component={WalletScreen} option />
//                 <Stack.Screen name='Notification' component={Notification} option />
//                 <Stack.Screen name='BankDetailScreen' component={BankDetailScreen2}
//                     options={{
//                         headerTitleAlign: 'center', // Center the title
//                         headerTitle: 'Bank Account Detail',
//                     }}
//                 />
//                 <Stack.Screen name='TermsCondition' component={TermsandCondition} options={{ title: 'Terms and Condition' }} />

//                 <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} options={{ title: 'Privacy Policy' }} />
//                 <Stack.Screen name='SelectCertificate' component={SelectCertificate} options={{ title: 'Certificates' }} />
//                 <Stack.Screen name='verifyBankOtp' component={verifyBankOtp} options={{ title: 'Confirm your account' }} />

//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

// export default AcountnavigationScreen;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const acountnavigationScreen = () => {
  return (
    <View>
      <Text>acountnavigationScreen</Text>
    </View>
  );
};

export default acountnavigationScreen;

const styles = StyleSheet.create({});
