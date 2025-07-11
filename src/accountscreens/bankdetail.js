






import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableWithoutFeedback, View, TouchableOpacity, Alert } from 'react-native';
import globle_Style from '../css/globle_Style';

import Bankcard from '../../assets/images/bankcard.svg'
import Upiicon from '../../assets/images/upi-icon.svg'
import LinearGradient from 'react-native-linear-gradient';
import { NetworkContext, UserContext } from '../common/AppContext';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BankDetailScreen = () => {

    const [selectedOption, setSelectedOption] = useState('bank');
    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    const [bankAccountNumber, setBankAccountNumber] = useState('')
    const [confirmBankAccountNumber, setConfirmBankAccountNumber] = useState('')
    const [bankName, setBankName] = useState('')
    const [ifscCode, setIfscCode] = useState('')
    const [holderName, setHolderName] = useState('')
    const [upiNumber, setUpiNumber] = useState('')
    const [upiId, setUpiId] = useState('')
    const [isDisabled, setIsDisabled] = useState(false);

    const [accountNumberError, setAccountNumberError] = useState(false);
    const [confirmAccountNumberError, setConfirmAccountNumberError] = useState(false);
    const [bankVerifyError, setBankVerifyError] = useState(false);
    const [IFSCcodeError, setIFSCcodeError] = useState(false);

    // const { userData } = useContext(UserContext)
    const navigation = useNavigation()

    const handleVerify = async () => {
        let userData = ""
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }
        if (isDisabled) return;

        const ifscRegex = /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/;
        const url = `${API_BASE_URL}BankVerify`;

        if (!bankAccountNumber) {
            setAccountNumberError('Bank account number is mandatory')
            return
        } else if (bankAccountNumber.length < 8) {
            setAccountNumberError('Bank account number must be at least 8 characters.');
            return
        } else if (bankAccountNumber.length > 34) {
            setAccountNumberError('Bank account number can’t exceed 34 characters.');
            return
        } else {
            setAccountNumberError(false)
        }


        if (!confirmBankAccountNumber) {
            setConfirmAccountNumberError('Please confirm your Account Number')
            return
        } else if (confirmBankAccountNumber !== bankAccountNumber) {
            setConfirmAccountNumberError('Account Number and Confirm Account Number do not match.');
            return
        } else {
            setConfirmAccountNumberError(false)
        }

        if (!ifscCode) {
            setIFSCcodeError('IFSC code is mandatory')
            return
        } else if (ifscCode.length < 3) {
            setIFSCcodeError('IFSC code must have at least 3 characters');
            return
        } else if (ifscCode.length > 25) {
            setIFSCcodeError('IFSC code can’t exceed 25 characters');
            return
        } else if (!ifscRegex.test(ifscCode)) {
            setIFSCcodeError('Invalid IFSC Code');
            return
        } else {
            setIFSCcodeError(false)
        }

        const data = {
            account_number: bankAccountNumber,
            ifsc: ifscCode,
            provider_id: userData.id
        }

        console.warn("BANKKKKKK : ", data)
        // return

        setIsDisabled(true);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${userData.token}` },
                body: JSON.stringify({
                    account_number: bankAccountNumber,
                    ifsc: ifscCode,
                    provider_id: userData.id
                }),
            });

            const result = await response.json();

            if (result.status) {
                console.warn("Bank Verified Successss")
                // handleSave();
                navigation.goBack();


            } else {

                setIsDisabled(false);
                Alert.alert('Verificatioin Failed!!', "Please try again later", [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
                console.warn("Faileddd : ", result)
            }
        } catch (error) {
            console.error('Error:', error);
            // setValidate(false);
        }
    }

    const handleSave = async () => {
        let userData = ""
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }

        const url = `${API_BASE_URL}provider/addBank`;
        if (selectedOption == 'bank') {

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${userData.token}` },
                    body: JSON.stringify({
                        // type: 'Bank',
                        account_number: bankAccountNumber,
                        // bank_name: bankName,
                        ifsc_code: ifscCode,
                        // account_holder_name: holderName,
                        provider_id: userData.id
                    }),
                });

                const result = await response.json();

                if (result.status) {
                    // console.warn("Bank added Successss")
                    Alert.alert('Success!!', "Bank account added successfully.", [
                        { text: 'OK', onPress: () => navigation.goBack() },
                    ]);

                } else {

                    console.warn("Faileddd : ", result)
                }
            } catch (error) {
                console.error('Error:', error);
                // setValidate(false);
            }

        } else {

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${userData.token}` },
                    body: JSON.stringify({
                        type: 'UPI',
                        upi_number: upiNumber,
                        upi_id: upiId,
                        provider_id: userData.id
                    }),
                });

                const result = await response.json();

                if (result.status) {
                    console.warn("UPI added Successss")
                    navigation.goBack();
                } else {

                    console.warn("Faileddd : ", result)
                }
            } catch (error) {
                console.error('Error:', error);
                // setValidate(false);
            }

        }

    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={globle_Style.container}>
            <View style={globle_Style.bank_detl_sec}>
                <View style={globle_Style.bank_detl_itm}>
                    <TouchableOpacity
                        style={[
                            globle_Style.bank_detl_lst,
                            selectedOption === 'bank' && { borderColor: '#03A878' }
                        ]}
                        onPress={() => handleSelect('bank')}
                    >
                        <Bankcard style={{ marginBottom: 13 }} />
                        <Text style={[globle_Style.bank_detl__txt, selectedOption === 'bank' && { color: '#03A878' }]}>Bank</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={[
                            globle_Style.bank_detl_lst,
                            selectedOption === 'upi' && { borderColor: '#03A878' } // Apply style if selected
                        ]}
                        onPress={() => handleSelect('upi')}
                    >
                        <Upiicon style={{ marginBottom: 13 }} />
                        <Text style={[globle_Style.bank_detl__txt, selectedOption === 'upi' && { color: '#03A878' }]}>UPI</Text>
                    </TouchableOpacity> */}
                </View>
                {selectedOption === 'bank' && (
                    <View style={globle_Style.bank_con}>
                        <View style={globle_Style.edit_frm_sec}>
                            <View style={globle_Style.edit_frm_con}>
                                <View style={globle_Style.edit_frm_itm}>
                                    <Text style={globle_Style.input_lable}>Account Number</Text>
                                    <View style={globle_Style.edit_frm_input}>
                                        <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='Bank Account Number' value={bankAccountNumber} onChangeText={setBankAccountNumber} keyboardType="numeric" />

                                    </View>

                                    {
                                        accountNumberError ? <Text style={globle_Style.error}>{accountNumberError}</Text> : null
                                    }
                                </View>
                                <View style={globle_Style.edit_frm_itm}>
                                    <Text style={globle_Style.input_lable}>Confirm Account Number</Text>
                                    <View style={globle_Style.edit_frm_input}>
                                        <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='Re-enter Bank Account Number' value={confirmBankAccountNumber} onChangeText={setConfirmBankAccountNumber} keyboardType="numeric" />

                                    </View>
                                    {
                                        confirmAccountNumberError ? <Text style={globle_Style.error}>{confirmAccountNumberError}</Text> : null
                                    }
                                </View>
                                {/* <View style={globle_Style.edit_frm_itm}>
                                    <Text style={globle_Style.input_lable}>Bank Name</Text>
                                    <View style={globle_Style.edit_frm_input}>
                                        <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='Enter Bank Name' value={bankName} onChangeText={setBankName} />

                                    </View>
                                </View> */}
                                <View style={globle_Style.edit_frm_itm}>
                                    <Text style={globle_Style.input_lable}>IFSC Code</Text>
                                    <View style={globle_Style.edit_frm_input}>
                                        <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='Enter IFSC Code' value={ifscCode}
                                            onChangeText={(text) => setIfscCode(text.toUpperCase())} autoCapitalize="characters" />

                                    </View>
                                    {

                                        IFSCcodeError ? <Text style={globle_Style.error}>{IFSCcodeError}</Text> : null

                                    }
                                </View>
                                {/* <View style={globle_Style.edit_frm_itm}>
                                    <Text style={globle_Style.input_lable}>Account Holder Name</Text>
                                    <View style={globle_Style.edit_frm_input}>
                                        <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='Enter Account Holder Name' value={holderName} onChangeText={setHolderName} />

                                    </View>
                                </View> */}


                            </View>
                        </View>
                    </View>
                )}
                {selectedOption === 'upi' && (
                    <View style={[globle_Style.bank_con, globle_Style.upi_con]}>
                        <View style={globle_Style.edit_frm_sec}>
                            <View style={globle_Style.edit_frm_con}>
                                <View style={globle_Style.edit_frm_itm}>
                                    <Text style={globle_Style.input_lable}>UPI Number</Text>
                                    <View style={globle_Style.edit_frm_input}>
                                        <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='UPI Number' value={upiNumber} onChangeText={setUpiNumber} />

                                    </View>
                                </View>
                                <View style={globle_Style.edit_frm_itm}>
                                    <Text style={globle_Style.input_lable}>UPI ID</Text>
                                    <View style={globle_Style.edit_frm_input}>
                                        <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='Enter UPI ID' value={upiId} onChangeText={setUpiId} />

                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                )}

                <TouchableWithoutFeedback onPress={() => handleVerify()}>
                    <View style={[globle_Style.globle_btn, { marginTop: 20 }, { opacity: isDisabled ? 0.5 : 1 }]}>
                        <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.globle_btn, { opacity: isDisabled ? 0.5 : 1 }]}>
                            <Text style={[globle_Style.gbl_btn, { opacity: isDisabled ? 0.5 : 1 }]}>Save</Text>
                        </LinearGradient>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        </ScrollView>
    );
}



export default BankDetailScreen;
