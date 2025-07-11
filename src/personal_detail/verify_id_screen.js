
import React, { useState } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, ScrollView, TextInput, Alert, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import globle_Style from '../css/globle_Style';
import LinearGradient from 'react-native-linear-gradient';
import Right from '../../assets/images/right.svg'
import AadhaarLogo from '../../assets/images/Aadhaar_Logo.svg'
import RemoveFail from '../../assets/images/remove.svg'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constants/constant';



const VerifyId = () => {
    const navigation = useNavigation()
    const [selectRadio, setselectedRadio] = useState(1)

    const [adharName, setAdharName] = useState('')
    const [adharNumber, setAdharNumber] = useState('')
    const [isDisabled, setIsDisabled] = useState(false);
    const [failedPopup, setFailedPopup] = useState(false);
    // errror message status
    const [adharNameError, setadharNameError] = useState(false)
    const [adharNumberError, setadharNumberError] = useState(false)
    const [adharNumberExists, setadharNumberExists] = useState("")





    const sendAdharOtp = async () => {

        if (isDisabled) return; // Prevent the action if disabled
        setIsDisabled(true);


        // Validate Aadhaar name
        if (!adharName || adharName.trim() === '') {
            console.warn("Aadhaar name is required.");
            setadharNameError("Aadhaar name is required.");
            setIsDisabled(false);
            return;
        }
        else if (!/^[a-zA-Z.\s]+$/.test(adharName)) {
            console.warn("Aadhaar name should not contain special characters or digits (except a period).");
            setadharNameError("Aadhaar name should not contain special characters or digits (except a period).");
            setIsDisabled(false);
            return;
        }
        // else if (!/^[a-zA-Z\s]*$/.test(adharName)) {
        //     console.warn("Special characters name are not allowed.");
        //     setadharNameError("Special characters  are not allowed.");
        //     setIsDisabled(false);
        //     return;
        // } 
        else if (adharName.length < 3 || adharName.length > 50) {
            console.warn("Name should be between 3 and 50 characters.");
            setadharNameError("Name should be between 3 and 50 characters.");
            setIsDisabled(false);
            return;
        }

        // Validate Aadhaar number
        if (!adharNumber || adharNumber.trim() === '') {
            console.warn("Aadhaar number is required.");
            setadharNumberError("Aadhaar number is required.");
            setIsDisabled(false);
            return;
        } else if (adharNumber.length != 12) { // Aadhaar number should be 12 digits
            console.warn("Aadhaar number must be 12 digits.");
            setadharNumberError("Aadhaar number must be 12 digits.");
            setIsDisabled(false);
            return;
        }
        // else if (!/^\d+(\.\d+)?$/.test(adharNumber)) {
        //     console.warn("Special characters number are not allowed.");
        //     setadharNumberError("Special characters number are not allowed.");
        //     setIsDisabled(false);
        //     return;
        // }
        // else {
        //     // If the Aadhaar number is valid, remove the error message
        //     setadharNumberError(false); // Or false
        //     setIsDisabled(false)
        // }

        // If both fields are valid, enable the next step (e.g., the submit button)


        let userData = ""
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }

        try {
            const url = `${API_BASE_URL}aadharVerify`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    aadhaar_number: adharNumber,
                    aadhaar_name: adharName,
                    provider_id: userData.id
                }),
            });

            const result = await response.json();

            console.warn("RESULTTTTT ", result)
            // return

            if (result.status) {
                setIsDisabled(false);
                // LoginNavigate();
                console.warn("SUCCESSSS ", result)
                navigation.navigate('Confirm Your Numbers', { reference_id: result.data.reference_id, aadhaar_number: adharNumber, aadhaar_name: adharName })
            } else {
                console.warn("FASLEEE ", result)
                // Alert.alert("Alert!!", result.message, [
                //     { text: "OK", onPress: () => console.log("OK Pressed") }
                // ]);
                setadharNumberExists(result.message)
                setFailedPopup(true)
                setIsDisabled(false);
                // Alert.alert("Login Failed!!", "Invalid username or password", [
                //     { text: "OK", onPress: () => console.log("OK Pressed") }
                // ]);
                // setValidate(false);
            }
        } catch (error) {
            setIsDisabled(false);
            console.error('Error ', error);
            // setValidate(false);
        }
    }




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
                                                <LinearGradient colors={['#03A878', '#03A878']} start={{ x: 0, y: 1 }} style={globle_Style.pers_nav}>
                                                    {/* <Text style={[globle_Style.pers_navnot_act_itm, globle_Style.pers_navactive_itm]}>1</Text> */}
                                                    <Right />
                                                </LinearGradient>
                                            </View>
                                            <View style={{ textAlign: 'center' }}>
                                                <Text style={[globle_Style.pers_nav_txt, globle_Style.pers_nav_complete]}>Personal</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback>
                                        <View style={globle_Style.per_dtl_itm}>

                                            <View style={globle_Style.nav_con}>
                                                <LinearGradient colors={['#03A878', '#03A878']} start={{ x: 0, y: 1 }} style={globle_Style.pers_nav}>
                                                    {/* <Text style={[globle_Style.pers_navnot_act_itm, globle_Style.pers_navactive_itm]}>2</Text> */}
                                                    <Right />
                                                </LinearGradient>
                                            </View>
                                            <View style={{ textAlign: 'center' }}>
                                                <Text style={[globle_Style.pers_nav_txt, globle_Style.pers_nav_txt_act, globle_Style.pers_nav_complete]}>Service</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback>
                                        <View style={globle_Style.per_dtl_itm}>

                                            <View style={globle_Style.nav_con}>
                                                <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={globle_Style.pers_nav}>
                                                    <Text style={[globle_Style.pers_navnot_act_itm, globle_Style.pers_navactive_itm]}>3</Text>
                                                </LinearGradient>
                                            </View>
                                            <View style={{ textAlign: 'center' }}>
                                                <Text style={[globle_Style.pers_nav_txt, globle_Style.pers_nav_txt_act]}>ID Verification</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback>
                                        <View style={globle_Style.per_dtl_itm}>

                                            <View style={globle_Style.nav_con}>
                                                <LinearGradient colors={['#D9D9D9', '#D9D9D9']} start={{ x: 0, y: 1 }} style={globle_Style.pers_nav}>
                                                    <Text style={globle_Style.pers_navnot_act_itm}>4</Text>
                                                </LinearGradient>
                                            </View>
                                            <View style={{ textAlign: 'center' }}>
                                                <Text style={globle_Style.pers_nav_txt}>Start</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={globle_Style.serv_con}>
                                <Text style={globle_Style.login_hd_txt}>ID Verification </Text>
                                <Text style={[globle_Style.login_para, globle_Style.serv_txt]}>Make sure you’re uploading your own document to avoid rejection.</Text>
                            </View>
                            <View style={[globle_Style.form_info, { marginBottom: adharNameError ? 2 : 10 }]}>
                                <View style={globle_Style.adhar_con}>
                                    <Text style={globle_Style.input_lable}>Aadhar Name</Text>
                                    <AadhaarLogo />
                                </View>
                                <TextInput style={globle_Style.input_txt} placeholder='Enter Aadhar Name' value={adharName} onChangeText={setAdharName} />
                                {
                                    adharNameError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{adharNameError}</Text> : null
                                }
                            </View>
                            <View style={[globle_Style.form_info, { marginBottom: adharNumberError ? 2 : 10 }]}>
                                <View style={globle_Style.adhar_con}>
                                    <Text style={globle_Style.input_lable}>Aadhar Number</Text>
                                    <AadhaarLogo />
                                </View>
                                <TextInput style={globle_Style.input_txt} placeholder='Enter Aadhar Number' keyboardType='numeric' value={adharNumber} onChangeText={setAdharNumber} maxLength={12} />
                                {
                                    adharNumberError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{adharNumberError}</Text> : null
                                }
                            </View>

                        </View>
                        <View style={[globle_Style.serv_btn, { justifyContent: 'center', marginBottom: 30, height: 400 }]}>
                            <TouchableOpacity onPress={!isDisabled ? sendAdharOtp : null}>
                                <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.globle_btn, , { opacity: isDisabled ? 0.5 : 1 }]}>
                                    <Text style={[globle_Style.gbl_btn, { opacity: isDisabled ? 0.5 : 1 }]}>Verify</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <Modal animationType="slide"
                            transparent={true}
                            visible={failedPopup}
                            onRequestClose={() => {
                                setFailedPopup(!failedPopup);
                            }}>
                            <View style={style.popup3}>
                                <View style={[style.overlay3]}>
                                    <View style={style.aut_fail_sec}>
                                        <View style={style.aut_fail_con}>
                                            <View style={style.close_sign}>
                                                <RemoveFail />
                                            </View>
                                            <View style={style.aut_fail_hd}>
                                                <Text style={style.aut_fail_hd_txt}>Aadhaar Verification Failed</Text>
                                                <Text style={style.aut_fail_txt}>{adharNumberExists}</Text>
                                            </View>

                                        </View>

                                        <TouchableWithoutFeedback onPress={() => setFailedPopup(false)}>
                                            <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.globle_btn,]}>
                                                <Text style={[globle_Style.gbl_btn, { paddingHorizontal: 60 }]}>OK</Text>
                                            </LinearGradient>
                                        </TouchableWithoutFeedback>
                                    </View>

                                </View>
                            </View>
                        </Modal>
                    </ScrollView>
            }

        </>



    );
}
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


export default VerifyId;
