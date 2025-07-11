import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  Alert,
  Modal, StyleSheet, TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import globle_Style from '../css/globle_Style';
import LinearGradient from 'react-native-linear-gradient';
import Right from '../../assets/images/right.svg';
import AadharSuccess from '../../assets/images/aadharSuccess.svg';
import AadhaarLogo from '../../assets/images/Aadhaar_Logo.svg';
import RemoveFail from '../../assets/images/remove.svg'
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constants/constant';

const ConfirmNumber = ({ route }) => {
  const navigation = useNavigation();

  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);
  const { reference_id, aadhaar_number, aadhaar_name } = route.params;
  const [otpTxt, setOtpTxt] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [failedOtpPopup, setFailedOtpPopup] = useState(false);
  // const [successPopup, setSuccessPopup] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);

  // const { emailValue, phoneValue } = route.params;
  // const { isConnected } = useContext(NetworkContext);

  const [otpError, setotpError] = useState(false)



  const handleTextChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const isOtpComplete = otp.every(value => value !== '');

  const handleVerifyOtp = async () => {


    if (isDisabled) return; // Prevent the action if disabled
    setIsDisabled(true);

    let userData = '';
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }
    console.warn('adharnnumber ', aadhaar_number);
    console.warn('adharname ', aadhaar_name);
    console.warn('reference_id ', reference_id);

    if (!otpTxt || otpTxt.trim() === '') {
      console.warn("Otp is required.");
      setotpError("OTP is required.");
      setIsDisabled(false);
      return;
    } else if (otpTxt.length !== 6) {
      console.warn("OTP must be of 6 digits .");
      setotpError("OTP must be of 6 digits .");
      setIsDisabled(false);
      return;
    } else {

    }

    try {
      const otpString = otp.join('');
      const url = `${API_BASE_URL}aadharOTPVerify`;
      let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aadhaar_number: aadhaar_number,
          aadhaar_name: aadhaar_name,
          reference_id: reference_id.toString(),
          otp: otpTxt,
          provider_id: userData.id,
        }),
      });
      result = await response.json();
      if (result.status == true) {
        updateIDVerifyDetails();
        // Alert.alert('Success!!', "Your Aadhaar has been successfully verified.", [
        //   { text: 'OK', onPress: () => console.log('OK Pressed') },
        // ]);
        setImageSuccess(true)
        setSuccessfull('Your Aadhaar has been verified successfully.')
        setFailedOtpPopup(true)
        // setSuccessPopup(true)
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: 'DashboardScreen' }],
        //   })
        // );
        // navigation.replace('DashboardScreen');
        // navigation.replace("DummyScreen")
        setIsDisabled(false)
        console.warn(result);
      } else {
        // setValidate(false)
        // Alert.alert('Alert!!', result.message, [
        //   { text: 'OK', onPress: () => console.log('OK Pressed') },
        // ]);
        setImageSuccess(false)
        setSuccessfull(result.message)
        setFailedOtpPopup(true)
        setIsDisabled(false)
        console.error('Failed', result);
      }
    } catch (error) {
      setIsDisabled(false)
      console.error('Error:', error);
    }
  };

  const updateIDVerifyDetails = async () => {
    try {
      // Retrieve the stored data
      const storedData = await AsyncStorage.getItem('userData');

      if (storedData !== null) {
        // Parse the JSON data
        const parsedData = JSON.parse(storedData);

        // Update the personal_details field
        parsedData.id_verifications = true;

        // Save the updated object back to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(parsedData));
        console.log('id_verifications updated successfully');
        // if (userData.personal_details && userData.service_details && userData.id_verifications) {
        //     navigation.replace('DashboardScreen');
        // } else {
        //     if (!userData.service_details) {
        //         navigation.replace('Select Services');
        //     } else if (!userData.id_verifications) {
        //         navigation.replace('Verify ID');
        //     }
        // }
      }
    } catch (error) {
      console.error('Error updating personal details:', error);
    }
  };

  return (


    <>

      {
        isDisabled ?

          <ActivityIndicator size="large" color="#03A878" style={{ flex: 1 }} />

          :

          <ScrollView style={globle_Style.container}>
            <View style={globle_Style.per_dtl_sec}>
              <View style={globle_Style.per_dtl_con}>
                <View style={globle_Style.border}></View>
                <View style={globle_Style.per_dtl_lst}>
                  <TouchableWithoutFeedback>
                    <View style={globle_Style.per_dtl_itm}>
                      <View style={globle_Style.nav_con}>
                        <LinearGradient
                          colors={['#03A878', '#03A878']}
                          start={{ x: 0, y: 1 }}
                          style={globle_Style.pers_nav}>
                          {/* <Text style={[globle_Style.pers_navnot_act_itm, globle_Style.pers_navactive_itm]}>1</Text> */}
                          <Right />
                        </LinearGradient>
                      </View>
                      <View style={{ textAlign: 'center' }}>
                        <Text
                          style={[
                            globle_Style.pers_nav_txt,
                            globle_Style.pers_nav_complete,
                          ]}>
                          Personal
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback>
                    <View style={globle_Style.per_dtl_itm}>
                      <View style={globle_Style.nav_con}>
                        <LinearGradient
                          colors={['#03A878', '#03A878']}
                          start={{ x: 0, y: 1 }}
                          style={globle_Style.pers_nav}>
                          {/* <Text style={[globle_Style.pers_navnot_act_itm, globle_Style.pers_navactive_itm]}>2</Text> */}
                          <Right />
                        </LinearGradient>
                      </View>
                      <View style={{ textAlign: 'center' }}>
                        <Text
                          style={[
                            globle_Style.pers_nav_txt,
                            globle_Style.pers_nav_txt_act,
                            globle_Style.pers_nav_complete,
                          ]}>
                          Service
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback>
                    <View style={globle_Style.per_dtl_itm}>
                      <View style={globle_Style.nav_con}>
                        <LinearGradient
                          colors={['#FBAB51', '#FE8705']}
                          start={{ x: 0, y: 1 }}
                          style={globle_Style.pers_nav}>
                          <Text
                            style={[
                              globle_Style.pers_navnot_act_itm,
                              globle_Style.pers_navactive_itm,
                            ]}>
                            3
                          </Text>
                        </LinearGradient>
                      </View>
                      <View style={{ textAlign: 'center' }}>
                        <Text
                          style={[
                            globle_Style.pers_nav_txt,
                            globle_Style.pers_nav_txt_act,
                          ]}>
                          ID Verification
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback>
                    <View style={globle_Style.per_dtl_itm}>
                      <View style={globle_Style.nav_con}>
                        <LinearGradient
                          colors={['#D9D9D9', '#D9D9D9']}
                          start={{ x: 0, y: 1 }}
                          style={globle_Style.pers_nav}>
                          <Text style={globle_Style.pers_navnot_act_itm}>4</Text>
                        </LinearGradient>
                      </View>
                      <View style={{ textAlign: 'center' }}>
                        <Text style={[globle_Style.pers_nav_txt]}>Start</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={globle_Style.serv_con}>
                <Text style={globle_Style.login_hd_txt}>ID Verification </Text>
                <Text
                  style={[
                    globle_Style.login_para,
                    globle_Style.serv_txt,
                    { paddingHorizontal: 30 },
                  ]}>
                  Please enter 6 - digit code sent to your Aadhar linked mobile number
                </Text>
              </View>
              {/* <View style={[globle_Style.otp_sec, { paddingHorizontal: 0 }]}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <View key={index} style={[globle_Style.otp_lst,
                        otp[index] ? globle_Style.otp_txt_filled : globle_Style.otp_txt_empty
                        ]}>
                            <TextInput
                                style={[
                                    globle_Style.otp_txt,
                                ]}
                                keyboardType="numeric"
                                maxLength={1}
                                ref={ref => inputRefs.current[index] = ref}
                                onChangeText={(text) => handleTextChange(text, index)}
                                value={otp[index]}
                            />
                        </View>
                    ))}
                </View> */}
              <View style={globle_Style.serv_form}>
                <TextInput
                  value={otpTxt}
                  placeholder="Enter Otp"
                  onChangeText={setOtpTxt}
                  keyboardType="numeric"
                  maxLength={6}
                  style={globle_Style.input_email}
                />

              </View>
              {
                otpError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{otpError}</Text> : null
              }
              {/* <View style={globle_Style.resend_code}>
                    <Text style={globle_Style.resend} onPress={() => handleResendOtp()} >Haven’t received an SMS?<Text style={globle_Style.re_link}> Resend Code</Text> </Text>
                </View> */}
            </View>
            <View style={[globle_Style.serv_btn, { justifyContent: 'center' }]}>
              {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('DashboardScreen')}> */}
              <TouchableWithoutFeedback onPress={() => handleVerifyOtp()}>
                <LinearGradient
                  colors={['#FBAB51', '#FE8705']}
                  start={{ x: 0, y: 1 }}
                  style={[globle_Style.globle_btn, , { opacity: isDisabled ? 0.5 : 1 }]}>
                  <Text style={[globle_Style.gbl_btn]}>Verify OTP</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>

            {/* invalid otp Popup  */}
            <Modal animationType="slide"
              transparent={true}
              visible={failedOtpPopup}
              onRequestClose={() => {
                setFailedOtpPopup(!failedOtpPopup);
              }}>
              <View style={style.popup3}>
                <View style={[style.overlay3]}>
                  <View style={style.aut_fail_sec}>
                    <View style={style.aut_fail_con}>
                      <View style={style.close_sign}>
                        {imageSuccess ? (
                          <AadharSuccess />
                        ) : (
                          <RemoveFail />
                        )}
                      </View>
                      <View style={style.aut_fail_hd}>
                        <Text style={style.aut_fail_hd_txt}>{imageSuccess ? "Verification Successful!" : "Aadhaar Verification Failed"}</Text>
                        <Text style={style.aut_fail_txt}>{successfull}</Text>
                      </View>

                    </View>
                    <TouchableOpacity onPress={() => {
                      imageSuccess ? navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: 'DashboardScreen' }],
                        })
                      ) : setFailedOtpPopup(false)
                    }}>
                      <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.globle_btn,]}>
                        <Text style={[globle_Style.gbl_btn, { paddingHorizontal: 60 }]}>OK</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </Modal>


            {/* aadhar Successs popup  */}
            {/* <Modal animationType="slide"
        transparent={true}
        visible={successPopup}
        onRequestClose={() => {
          setSuccessPopup(!successPopup);
        }}>
        <View style={style.popup3}>
          <View style={[style.overlay3]}>
            <View style={style.aut_fail_sec}>
              <View style={style.aut_fail_con}>
                <View style={style.close_sign}>
                  <AadharSuccess />
                </View>
                <View style={style.aut_fail_hd}>
                  <Text style={style.aut_fail_hd_txt}>Verification Successful!</Text>
                  <Text style={style.aut_fail_txt}>{successfull}</Text>
                </View>

              </View>
              <TouchableOpacity  onPress={() => setSuccessPopup(false)}>
                <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.globle_btn,]}>
                  <Text style={[globle_Style.gbl_btn, { paddingHorizontal: 60 }]}>OK</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal> */}
          </ScrollView>

      }

    </>
  );
};
const style = StyleSheet.create({

  popup3: {
    backgroundColor: "#000000E0",
    width: "100%",
    height: "100%",
    position: "static",
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay3: {
    position: 'absolute',
    width: '100%',
  },

  aut_fail_sec: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 23,
  },
  aut_fail_con: {
    paddingVertical: 20,
  },
  close_sign: {
    marginBottom: 20,
    alignItems: 'center'
  },
  aut_fail_hd_txt: {
    color: "#1D1D1D",
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24.4,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 10
  },
  aut_fail_txt: {
    color: "#3D3D3D",
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 15.73,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
})

export default ConfirmNumber;
