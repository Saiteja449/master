import React, { useContext, useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';
import globle_Style from '../css/globle_Style';
// import IndFlag from '../../assets/images/ind_flag.svg';
import MainlIcon from '../../assets/images/mail_icon.svg';
import Logo from '../../assets/images/logo.svg';
import Paw1 from '../../assets/images/paws_img1.svg';
import Paw2 from '../../assets/images/paws_img2.svg';
import LinearGradient from 'react-native-linear-gradient';
import { NetworkContext } from '../common/NetworkProvider';
import { CountryPicker } from 'react-native-country-codes-picker';
import { getFCMTOKEN } from '../utils/pushnotification_helper';
import { API_BASE_URL } from '../constants/constant';
import { set } from '@react-native-firebase/database';

const LoginScreen = ({ navigation }) => {
  const [phoneValue, setPhoneValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [FCMTOKEN, setFCMTOKEN] = useState('');
  const [validate, setValidate] = useState(true);
  const { isConnected } = useContext(NetworkContext);
  const [showCountryCode, setCountryCodeShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validNumber = number => /^\d{10}$/.test(number);


  // login error message  
  const [phoneValueError, setPhoneValueError] = useState(false)
  const [emailValueError, setemailValueError] = useState(false)
  const [invalid, setinvalid] = useState('')
  const [invalidBoolean, setinvalidBoolean] = useState(false)
  const [isDisable, setIsDisable] = useState(false)

  function LoginNavigate() {
    navigation.navigate('Confirm Your Number', {
      // emailValue,
      phoneValue,
      FCMTOKEN,
    });
  }

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await getFCMTOKEN();
    const timer = setTimeout(() => {
      setFCMTOKEN(token);
    }, 1000);

    return () => clearTimeout(timer);
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[1-9][0-9]{9}$/; // 10 digits, first digit 1-9
    return phoneRegex.test(number);
  };

  // phone number valid
  const handleLogin = async () => {


    // phone number 
    if (phoneValue === null || phoneValue === '') {
      setPhoneValueError('Please enter the Mobile number '); //Show this message if phone number is null or empty
      setinvalidBoolean(false)
      return
    } else if (phoneValue.length < 10) {
      setPhoneValueError('Mobile number must be 10 characters'); // Show this message if the name is too short
      setinvalidBoolean(false)
      return
    } else if(!validatePhoneNumber(phoneValue)){
      setPhoneValueError('Invalid mobile number'); // Show this message if the name is too short
      setinvalidBoolean(false)
      return

    } else {
      setPhoneValueError(false); // Clear any error message if the name is valid
    }

    // email id 
    // if (!emailValue) {
    //   setemailValueError('Please enter a email Id '); // Show this message if vetName is empty
    //   setinvalidBoolean(false)
    //   return
    // } else {
    //   setemailValueError(false); // Clear any error message if the name is valid
    // }

    
    if (!isConnected) {
      console.error('Error during login: NO Internet');
      setValidate(false);
      return;
    }

    setIsDisable(true)
    try {
      const url = `${API_BASE_URL}provider/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // email: emailValue,
          phone: phoneValue,
          device_token: FCMTOKEN,
        }),
      });

      const result = await response.json();

      if (result.status) {
        setIsDisable(false)
        LoginNavigate();
      } else {
        console.warn('FASLEEE ', result);
        setIsDisable(false)
        setinvalidBoolean(true)
        setinvalid('invalid credential')

      }
    } catch (error) {
      setinvalidBoolean(true)
      setinvalid('something went worng')

      console.error('Error during login:', error);

    }
  };

  const CountrySelector = () => (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={globle_Style.input}>
        <TextInput
          value={countryCode}
          editable={false}
          placeholder={'+91'}
          style={{ color: '#8C8C8C' }}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={globle_Style.login_sec}>
      <View style={globle_Style.login_con}>
        <Text style={globle_Style.login_hd_txt}>Welcome to Petsfolio</Text>
        <Text style={globle_Style.login_para}>
          Create an account or login using your mobile number to get started
        </Text>
      </View>
      <View style={globle_Style.login_frm}>
        <View>
          <View style={[globle_Style.serv_form, { marginBottom: phoneValueError ? 5 : 10 }]}>
            <CountrySelector />
            <CountryPicker
              show={showCountryCode}
              style={{ modal: { height: 500 } }}
              pickerButtonOnPress={item => {
                setCountryCode(item.dial_code);
                setCountryCodeShow(false);
              }}
            />
            <TextInput
              value={phoneValue}
              placeholder="Phone number"
              onChangeText={setPhoneValue}
              style={
                validate ? globle_Style.input_phone : globle_Style.inputfieldError
              }
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          {
            phoneValueError && <Text style={globle_Style.errorText}>{phoneValueError}</Text>
          }
        </View>

        {/* <View style={[globle_Style.serv_form, { marginBottom: emailValueError ? 5 : 10 }]}>
          <MainlIcon style={globle_Style.email_img} />
          <TextInput
            value={emailValue}
            placeholder="Email"
            onChangeText={setEmailValue}
            style={
              validate ? globle_Style.input_email : globle_Style.inputfieldError
            }
          />
        </View> */}
        {/* {emailValueError && <Text style={globle_Style.errorText}>{emailValueError}</Text>} */}
      </View>
      {
        invalidBoolean ? <View style={[globle_Style.errorstrip, { marginBottom: invalid ? 10 : 0 }]}><Text style={globle_Style.errorText}>{invalid}</Text></View> : null
      }
      <TouchableWithoutFeedback onPress={() => handleLogin()}>
        <View style={[globle_Style.globle_btn,]}>
          <LinearGradient
            colors={['#FBAB51', '#FE8705']}
            start={{ x: 0, y: 1 }}
            style={[globle_Style.globle_btn, {opacity: isDisable ? 0.5 : 1}]}>
            <Text style={globle_Style.gbl_btn}>Continue</Text>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
      <View style={globle_Style.backgrd_img}>
        <View style={globle_Style.back_img}>
          <Paw1 />
        </View>
      </View>
      <View style={globle_Style.logo_img}>
        <Logo />
        <View style={globle_Style.back_img_one}>
          <Paw2 />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
