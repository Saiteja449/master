






import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableWithoutFeedback, View, } from 'react-native';
import globle_Style from '../css/globle_Style';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EmailVerification = ({route}) => {
const navigation = useNavigation()
const { email } = route.params;
const {isDisabled, setIsDisabled} = useState(false)


    const emailOptApi = async()=>{

        // if(isDisabled) return;

        

        let userData = ""
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }

        const url = `${API_BASE_URL}provider/sendOtpToMail`;
        let response = await fetch(url,{
            method:'POST',
            headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}` },
            body: JSON.stringify({
            email: email
          }),
        })
        let result = await response.json();
        if (result.status == true ){
            console.warn("doneeeeeeee",result)
            // setIsDisabled(false);
            navigation.navigate('EmailVerificationopt', {email:email})

        }else{
            // setIsDisabled(false);
            console.error('otp failed', result);
        }

    }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={globle_Style.container}>
            <View style={globle_Style.verify_form_sec}>
                <View style={globle_Style.verify_form_con}>
                    <Text style={globle_Style.input_lable}>Email Verification</Text>
                   <TextInput
                        style={globle_Style.input_newfield}
                        placeholder="Enter your email" 
                        value={email}
                        editable={false}

                    />

                </View>
                <View style={{ flex: 1 }} />
                <View style={globle_Style.verify_form_btn}>
                    <TouchableWithoutFeedback onPress={()=> emailOptApi()}>
                      <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.globle_btn,]}>
                        <Text style={[globle_Style.gbl_btn]}>Send OTP</Text>
                          </LinearGradient> 
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </ScrollView>
    );
}



export default EmailVerification;
