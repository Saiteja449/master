
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View, } from 'react-native';
import globle_Style from '../css/globle_Style';
import RightArrow from '../../assets/images/right_arrow.svg'
import MailIcon from '../../assets/images/mail_icon.svg'
import AddressProof from '../../assets/images/addressProof.svg'
import IdProof from '../../assets/images/idProof.svg'
import PoliceVerfy from '../../assets/images/police_verfy.svg'
import PostCard from '../../assets/images/post_card.svg'
import Certify from '../../assets/images/certify.svg'
import Right from '../../assets/images/right.svg'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { API_BASE_URL } from '../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerificationScreen = ({ route }) => {
    // const { email, verification } = route.params;
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [verificationData, setVerificationData] = useState({});

    useEffect(() => {
        // console.warn("VERIFICATIONNNNNNNN", verification)
        // allVerifyApi()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            fetchApiData()

            return () => console.log('Screen unfocused');
        }, [])
    );

    const fetchApiData = async () => {
        let userData = ""
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }
        const url = `${API_BASE_URL}provider/${userData.id}/profile`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if (result.status) {

                console.warn("verification dataaaaaaaa :: ", result.data.verifications)

                setEmail(result.data.email)
                setVerificationData(result.data.verifications);

            } else {
                console.warn("ELSEEE :: ", result);
            }
        } catch (error) {
            console.warn('Network request failed :: ', error);
        }

    }


    return (
        <ScrollView style={globle_Style.container}>
            <View style={globle_Style.vrfy_sec}>
                <View style={globle_Style.vrfy_con}>
                    {verificationData && (
                        verificationData.email_verified === '0' ||
                        verificationData.mobile_verified === '0' ||
                        verificationData.identity_proof_verified === '0' ||
                        verificationData.police_verification_verified === '0' ||
                        verificationData.certificate_verified === '0'
                    ) && (
                            <View style={globle_Style.pending_con}>
                                <View style={globle_Style.pend_line}></View>
                                <View style={globle_Style.pend_hd}>
                                    <View style={globle_Style.pend_line}></View>
                                    <Text style={globle_Style.pend_hd_txt}>Pending</Text>
                                </View>
                            </View>
                        )}


                    <View style={globle_Style.pend_verfy_con}>

                        {verificationData && (verificationData.email_verified !== '1') && (
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('EmailVerification', { email: email })}>
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.very_email_img}>
                                            <MailIcon />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Email</Text>
                                    </View>
                                    <RightArrow />
                                </View>
                            </TouchableWithoutFeedback>
                        )}

                        {/* {verificationData && (verificationData.mobile_verified !== '1') && (
                            <TouchableWithoutFeedback >
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.very_email_img}>
                                            <MailIcon />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Mobile Number</Text>
                                    </View>
                                    <RightArrow />
                                </View>
                            </TouchableWithoutFeedback>
                        )} */}

                        {/* {verificationData && (verificationData.address_proof_verified !== '1') && (
                            // <TouchableWithoutFeedback onPress={() => navigation.navigate('AddressProof')}>
                            <TouchableWithoutFeedback>
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.very_email_img}>
                                            <AddressProof />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Address Proof</Text>
                                    </View>
                                    <RightArrow />
                                </View>
                            </TouchableWithoutFeedback>
                        )} */}

                        {verificationData && (verificationData.identity_proof_verified !== '1') && (
                            // <TouchableWithoutFeedback onPress={() => navigation.navigate('IdentityProof')}>
                            <TouchableWithoutFeedback>
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.very_email_img}>
                                            <IdProof />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Identity Proof</Text>
                                    </View>
                                    <RightArrow />
                                </View>
                            </TouchableWithoutFeedback>
                        )}

                        {verificationData && (verificationData.police_verification_verified !== '1') && (
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('CertificateScreen', { type: 'police_verification', data: verificationData })}>
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.very_email_img}>
                                            <PoliceVerfy />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Police Verification</Text>
                                    </View>
                                    <RightArrow />
                                </View>
                            </TouchableWithoutFeedback>
                        )}

                        {verificationData && (verificationData.certificate_verified !== '1') && (
                            // <TouchableWithoutFeedback onPress={() => navigation.navigate('CertificateScreen', { type: 'certificate', data: verification })}>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('SelectCertificate', { data: verificationData?.certificates })}>
                                {/* <TouchableWithoutFeedback> */}
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.very_email_img}>
                                            <Certify />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Certificate</Text>
                                    </View>
                                    <RightArrow />
                                </View>
                            </TouchableWithoutFeedback>
                        )}

                    </View>
                    <View style={globle_Style.complete_con}>
                        <View style={globle_Style.pend_line}></View>
                        <View style={globle_Style.pend_hd}>
                            <View style={globle_Style.pend_line}></View>
                            <Text style={globle_Style.pend_hd_txt}>Completed</Text>
                        </View>
                    </View>
                    <View style={globle_Style.compl_sec}>
                        <View style={globle_Style.pend_verfy_con}>
                            {/* <View style={globle_Style.pend_verfy_itm}>
                                <View style={globle_Style.very_email}>
                                    <View style={globle_Style.communi_con_lft}>
                                        <Right />
                                    </View>
                                    <Text style={globle_Style.very_email_txt}>Profile Picture (Selfie)</Text>
                                </View>

                            </View> */}
                            {verificationData && (verificationData.email_verified === '1') && (
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.communi_con_lft}>
                                            <Right />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Email</Text>
                                    </View>
                                </View>
                            )}

                            {verificationData && (verificationData.mobile_verified == '1') && (
                                <TouchableWithoutFeedback >
                                    <View style={globle_Style.pend_verfy_itm}>
                                        <View style={globle_Style.very_email}>
                                            <View style={globle_Style.communi_con_lft}>
                                                <Right />
                                            </View>
                                            <Text style={globle_Style.very_email_txt}>Mobile Number</Text>
                                        </View>
                                        {/* <RightArrow /> */}
                                    </View>
                                </TouchableWithoutFeedback>
                            )}

                            {verificationData && (verificationData.address_proof_verified === '1') && (
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.communi_con_lft}>
                                            <Right />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Address Proof</Text>
                                    </View>
                                </View>
                            )}

                            {verificationData && (verificationData.identity_proof_verified === '1') && (
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.communi_con_lft}>
                                            <Right />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Identity Proof</Text>
                                    </View>
                                </View>
                            )}

                            {verificationData && (verificationData.police_verification_verified === '1') && (
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.communi_con_lft}>
                                            <Right />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Police Verification</Text>
                                    </View>
                                </View>
                            )}

                            {verificationData && (verificationData.certificate_verified === '1') && (
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.communi_con_lft}>
                                            <Right />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Certificate</Text>
                                    </View>
                                </View>
                            )}

                        </View>
                    </View>
                </View>
                <View style={globle_Style.verfy_pet}>
                    <Text style={globle_Style.verfy_pet_txt}>To become a verified pet expert, you need to provide more information for verification.</Text>
                </View>
                {/* <View style={[globle_Style.serv_btn,]}>
                    <TouchableWithoutFeedback>
                        <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={globle_Style.globle_btn}>
                            <Text style={[globle_Style.gbl_btn,]}>Submit Documents</Text>
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </View> */}
            </View>
        </ScrollView>
    );
}



export default VerificationScreen;
