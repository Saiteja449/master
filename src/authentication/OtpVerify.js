import { useState, useRef, useContext, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import globle_Style from '../css/globle_Style';
import LinearGradient from 'react-native-linear-gradient';
import Paw1 from '../../assets/images/paws_img1.svg';
import Paw2 from '../../assets/images/paws_img2.svg';
import { NetworkContext } from '../common/NetworkProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { API_BASE_URL } from '../constants/constant';

const OtpVerify = ({ route, navigation }) => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const inputRefs = useRef([]);
  // const { emailValue, phoneValue } = route.params;
  const { phoneValue, FCMTOKEN } = route.params;
  const { isConnected } = useContext(NetworkContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledResend, setIsDisabledResend] = useState(false);

  // error message 

  const [otpError, setotpError] = useState(null);

  const [timer, setTimer] = useState(25); // Start timer at 25 seconds

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsDisabledResend(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);





  const handleTextChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text.length > 0 && index < inputRefs.current.length - 1)
      inputRefs.current[index + 1].focus();
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const isOtpComplete = otp.every(value => value !== '');

  const handleVerifyOtp = async () => {

    if (isDisabled) return; // Prevent the action if disabled

    if (otp.includes('')) {
      console.warn('OTP is empty');
      setotpError('Please enter a valid OTP'); // Error message for empty OTP
      return; // Exit function if OTP is empty
    } else if (otp[0] === '' || otp[1] === '' || otp[2] === '' || otp[3] === '') {
      console.warn('OTP is too short');
      setotpError('OTP must be at least 4 digits'); // Error message for OTP with less than 4 digits
      return; // Exit function if OTP is less than 4 digits
    }
    setIsDisabled(true); // Disable the button after the first pres

    try {
      if (isConnected) {
        const otpString = otp.join('');
        const url = `${API_BASE_URL}provider/validateOtp`;
        let result = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // email: emailValue,
            phone: phoneValue,
            otp: otpString,
          }),
        });
        result = await result.json();
        if (result.status == true) {
          const userData = result.data;

          await AsyncStorage.setItem('userData', JSON.stringify(userData));

          if (!userData.personal_details) {
            // navigation.replace('Personal Details');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Personal Details' }],
              })
            );
          } else if (!userData.service_details) {
            // navigation.replace('Select Services');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Select Services' }],
              })
            );
          } else if (!userData.id_verifications) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Verify ID' }],
              })
            );
            // navigation.replace('Verify ID');
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'DashboardScreen' }],
              })
            );
            // navigation.replace('DashboardScreen');
            // navigation.replace('DummyScreen')
          }
          // else if (!userData.id_verifications) {
          //     navigation.replace('Verify ID');
          // }
          // personalNavigation()
          console.warn(userData);
          setIsDisabled(false);
        } else {
          setIsDisabled(false);
          setotpError('Invalid OTP');
          // setValidate(false)
          console.error('Login Failed', result);
          // error otp
          // if (otp.includes('')) {
          //   setotpError(true); // Set error if any field is empty
          //   return; // Don't proceed further if OTP is incomplete
          // } else if(otp.length > 4){
          //   setotpError('OTP must be of 4 digits '); 
          // }else {
          //   setotpError(false); // Reset error if OTP is complete
          // }
          // otp = otp.trim();
          // if (otp.length === 0)  {
          //     setotpError('Please enter a valid OTP'); // Error message for empty OTP
          //     // return; // Exit function if OTP is empty
          // } else if (otp.length < 4) {
          //     setotpError('OTP must be at least 4 digits'); // Error message for OTP with less than 4 digits
          //     return; // Exit function if OTP is less than 4 digits
          // } else if (!/^\d+$/.test(otp)) {
          //     setotpError('OTP must be only in digits '); // Error message for OTP with less than 4 digits
          //     return; // Exit function if OTP is less than 4 digits
          // } else {
          //     setotpError(false); // Reset error if OTP is 4 digits
          // }


        }
      } else {
        setIsDisabled(false);
        setotpError('No Internet Connection');
        // setValidate(false)
        console.error('Error during login: NO Internet :: ');

      }
    } catch (error) {
      setIsDisabled(false);
      console.error('Error during login:', error);
    }
  };

  const handleResendOtp = async () => {
    if (isDisabledResend) return;

    setTimer(25);
    setIsDisabledResend(true)

    try {
      if (isConnected) {
        const url = `${API_BASE_URL}provider/login`;
        let result = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // email: emailValue,
            phone: phoneValue,
            device_token: FCMTOKEN
          }),
        });
        result = await result.json();
        if (result.status == true) {
          setTimeout(() => {
            setIsDisabledResend(false); // Re-enable after 45 seconds
          }, 25000);
          console.warn('OTP sent successfully!!');
        } else {
          console.error('Error ', 'Enable to send otp');
        }
      } else {
        console.error('Error : NO Internet ');
      }
    } catch (error) {
      console.error('Error during resend otp:', error);
    }
  };

  function personalNavigation() {
    navigation.replace('Personal Details');
  }

  return (
    <View style={globle_Style.login_sec}>
      <View style={globle_Style.login_con}>
        <Text style={globle_Style.login_hd_txt}>OTP Verification</Text>
        <Text style={globle_Style.login_para}>
          Please enter the 4 - digits code sent to you at {'\n'} +91{' '}
          {phoneValue}
        </Text>
      </View>
      <View style={[globle_Style.otp_sec, { marginBottom: otpError ? 15 : 37 }]}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View
            key={index}
            style={[
              globle_Style.otp_lst,
              otp[index]
                ? globle_Style.otp_txt_filled
                : globle_Style.otp_txt_empty,
            ]}>
            <TextInput
              style={[globle_Style.otp_txt]}
              keyboardType="numeric"
              maxLength={1}
              ref={ref => (inputRefs.current[index] = ref)}
              onChangeText={text => handleTextChange(text, index)}
              value={otp[index]}
            />
          </View>
        ))}
      </View>
      {otpError && <Text style={globle_Style.errorText}>{otpError}</Text>}
      <Text style={[globle_Style.resend, { marginBottom: 10, marginHorizontal: 16 }]}>
        {isDisabledResend
          ? `Resend OTP in ${timer} seconds`
          : ''}
      </Text>
      <View style={globle_Style.resend_code}>
        <Text style={[globle_Style.resend, { opacity: isDisabledResend ? 0.5 : 1 }]} onPress={() => {
          if (!isDisabledResend) {
            handleResendOtp();
          }
        }}>
          Haven’t received an SMS?
          <Text style={globle_Style.re_link}> Resend Code</Text>{' '}
        </Text>
      </View>


      <TouchableOpacity onPress={() => handleVerifyOtp()}>
        <View style={globle_Style.globle_btn}>
          <LinearGradient
            colors={['#FBAB51', '#FE8705']}
            start={{ x: 0, y: 1 }}
            style={globle_Style.globle_btn}>
            <Text style={globle_Style.gbl_btn}>Continue</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
      <View style={globle_Style.backgrd_img}>
        <View style={globle_Style.back_img}>
          <Paw1 />
        </View>
      </View>
      <View style={[globle_Style.logo_img]}>
        <View style={[globle_Style.back_img_one, { top: -25 }]}>
          <Paw2 />
        </View>
      </View>
    </View>
  );
};

export default OtpVerify;
