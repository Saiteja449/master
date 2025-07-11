

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View, Image } from 'react-native';
import NewJobs from '../WalkingNewJobs/newJobScreen';
import Home from './home';
import AllQuotes from '../WalkingNewJobs/allquotes';
import QuoteDetails from '../WalkingNewJobs/quotDetail';
import ActiveJobDetail from '../WalkingNewJobs/activeJobDetail';
import Notification from '../notification/notificationScreen';
import MessageChat from '../messageChat/messageChat';
import ServiceDetailBoarding from '../addServicesDeatils/boarding_sevice_details';
import ServiceDetailGrooming from '../addServicesDeatils/grooming_service_details';
import ServiceDetailTraning from '../addServicesDeatils/Training_service_details';
import ServiceDetail from '../addServicesDeatils/service_details';
import AppContext from '../common/AppContext'
import WalletScreen from '../wallet/wallet';
import QuoteDetailEdit from '../WalkingNewJobs/quoteDetailEdit';
import boardingDummyScreen from '../dummyScreen/boardingDummyScreen';
import groomingDummyScreen from '../dummyScreen/groomingDummyScreen';
import trainingDummyScreen from '../dummyScreen/trainingDummyScreen';
import insuranceDummyScreen from '../dummyScreen/insuranceDummyScreen';
import BankDetailScreen from '../accountscreens/bankdetail';
import WalkTracking from '../Tracking/WalkTracking';
import VerificationScreen from '../accountscreens/verification';
import EmailVerification from '../accountSubScreen/emailVerification';
import CertificateScreen from '../accountSubScreen/certificateScreen';
import EmailVerificationOtp from '../accountSubScreen/verifyEmailOtp';
import GroomingNewJobs from '../Grooming/GroomingNewJobs';
import GroomingQuoteDetails from '../Grooming/GroomingQuotDetail';
import GroomingQuoteDetailEdit from '../Grooming/GroomingQuoteDetailEdit';
import GroomingAllQuotes from '../Grooming/GroomingAllquotes';
import GroomingActiveJobDetail from '../Grooming/GroomingActiveJobDetail';
import GroomingTracking from '../Grooming/GroomingTracking';
import SelectCertificate from '../accountSubScreen/SelectCertificate';
import ChatPage from '../ChatPage';
import BankDetailScreen2 from '../accountscreens/BankDetailScreen';
import verifyBankOtp from '../accountscreens/verifyBankOtp';
import TrainingNewJobs from '../Training/TrainingNewJobs';
import TrainingQuoteDetails from '../Training/TrainingQuotDetail';
import TrainingQuoteDetailEdit from '../Training/TrainingQuoteDetailEdit';
import TrainingAllQuotes from '../Training/TrainingAllquotes';
import TrainingActiveJobDetail from '../Training/TrainingActiveJobDetail';
import TrainingTracking from '../Training/TrainingTracking';
import ReplaceTrainerScreen from '../Training/ReplaceTrainerScreen';
import ReplaceTrainerEditScreen from '../Training/ReplaceTrainerEditScreen.js';



const HomeScreens = () => {



    const Stack = createNativeStackNavigator()

    return (
        <AppContext>
            <NavigationContainer independent={true}>
                <Stack.Navigator screenOptions={{
                    headerTitleAlign: 'center',
                }}>

                    <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name='Newjob' component={NewJobs} options={{
                        title: 'Dog Walking', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />
                    <Stack.Screen name='Quotes' component={AllQuotes} option />
                    <Stack.Screen name='Details' component={QuoteDetails} options={{
                        title: 'Quote Details', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />
                    <Stack.Screen name='DetailsEdit' component={QuoteDetailEdit} options={{
                        title: 'Edit Quote', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />
                    <Stack.Screen name='ActiveJobDetail' component={ActiveJobDetail} options={{
                        title: 'Active Jobs', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />
                    <Stack.Screen name='Notification' component={Notification} option />
                    <Stack.Screen name='Service Detail Boarding' component={ServiceDetailBoarding} option />
                    <Stack.Screen name='Service Detail Grooming' component={ServiceDetailGrooming} option />
                    <Stack.Screen name='Service Detail Traning' component={ServiceDetailTraning} option />
                    <Stack.Screen name='Service Detail' component={ServiceDetail} option />
                    <Stack.Screen name='Wallet' component={WalletScreen} option />
                    <Stack.Screen name='Bank Details' component={BankDetailScreen} options={{}} />
                    <Stack.Screen name='BankDetailScreen' component={BankDetailScreen2}
                        options={{
                            headerTitleAlign: 'center', // Center the title
                            headerTitle: 'Bank Account Detail',
                        }}
                    />
                    <Stack.Screen name='verifyBankOtp' component={verifyBankOtp} options={{ title: 'Confirm your account' }} />

                    <Stack.Screen name='Boarding' component={boardingDummyScreen} />

                    <Stack.Screen name='Training' component={trainingDummyScreen} />
                    <Stack.Screen name='Insurance' component={insuranceDummyScreen} />
                    <Stack.Screen name='Grooming' component={groomingDummyScreen} />
                    <Stack.Screen name='WalkTracking' component={WalkTracking} options={{
                        tabBarStyle: { display: 'none' }, // Hide tab bar for WalkTracking screen
                        // tabBarButton: () => null,  // Disable tab bar button for WalkTracking screen
                        headerShown: false,  // Hide header for WalkTracking screen
                    }} />

                    <Stack.Screen name='My Verification' component={VerificationScreen} options={{}} />
                    <Stack.Screen name='EmailVerification' component={EmailVerification} options={{ title: 'Email Verification' }} />
                    <Stack.Screen name='EmailVerificationopt' component={EmailVerificationOtp} options={{ title: 'Verifiy OTP' }} />
                    <Stack.Screen name='CertificateScreen' component={CertificateScreen} options={{ title: 'Upload Certificate' }} />

                    <Stack.Screen name='GroomingNewJob' component={GroomingNewJobs} options={{
                        title: 'Dog Grooming', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />
                    <Stack.Screen name='GroomingQuoteDetails' component={GroomingQuoteDetails} options={{
                        title: 'Quote Details', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />
                    <Stack.Screen name='GroomingQuoteDetailEdit' component={GroomingQuoteDetailEdit} options={{
                        title: 'Edit Quote', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />

                    <Stack.Screen name='GroomingAllQuotes' component={GroomingAllQuotes} options={{ headerTitle: 'Quotes' }} />
                    <Stack.Screen name='GroomingActiveJobDetail' component={GroomingActiveJobDetail} options={{
                        title: 'Active Jobs', // Set the title text
                        headerTitleAlign: 'center', // Center the title

                    }} />
                    <Stack.Screen name='GroomingTracking' component={GroomingTracking} options={{
                        title: 'Grooming Tracking', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />

                    <Stack.Screen name='SelectCertificate' component={SelectCertificate} options={{ title: 'Certificates' }} />
                    <Stack.Screen name='ChatPage' component={ChatPage} options={{ headerShown: false }} />



                    <Stack.Screen name='TrainingNewJob' component={TrainingNewJobs} options={{
                        title: 'Dog Training', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />
                    <Stack.Screen name='TrainingQuoteDetails' component={TrainingQuoteDetails} options={{
                        title: 'Quote Details', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />
                    <Stack.Screen name='TrainingQuoteDetailEdit' component={TrainingQuoteDetailEdit} options={{
                        title: 'Edit Quote', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />


                    <Stack.Screen name='TrainingAllQuotes' component={TrainingAllQuotes} options={{ headerTitle: 'Quotes' }} />
                    <Stack.Screen name='TrainingActiveJobDetail' component={TrainingActiveJobDetail} options={{
                        title: 'Active Jobs', // Set the title text
                        headerTitleAlign: 'center', // Center the title

                    }} />

                    <Stack.Screen name='TrainingTracking' component={TrainingTracking} options={{
                        title: 'Training Tracking', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />

                    <Stack.Screen name='ReplaceTrainerScreen' component={ReplaceTrainerScreen} options={{
                        title: 'Quote Details', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />

                    <Stack.Screen name='ReplaceTrainerEditScreen' component={ReplaceTrainerEditScreen} options={{
                        title: 'Edit Quote', // Set the title text
                        headerTitleAlign: 'center', // Center the title
                    }} />


                </Stack.Navigator>
            </NavigationContainer>
        </AppContext>
    );
}



export default HomeScreens;
