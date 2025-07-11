
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
import Prgrss from '../../assets/images/prgrss.svg'
import Cmpltd from '../../assets/images/cmpltd.svg'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { API_BASE_URL } from '../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectCertificate = ({ route }) => {
    const { data } = route.params;
    const navigation = useNavigation()
    // const [verificationData, setVerificationData] = useState(verification);

    useEffect(() => {
        // console.warn("VERIFICATIONNNNNNNN", verification)
        // allVerifyApi()
    }, [])

    return (
        <ScrollView style={globle_Style.container}>
            <View style={globle_Style.vrfy_sec}>
                <View style={globle_Style.vrfy_con}>
                    {/* {data && (
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
                        )} */}


                    <View style={globle_Style.pend_verfy_con}>

                        {/* {data && (
                            <TouchableWithoutFeedback onPress={() => { data.walking_verified === '1' ? null : navigation.navigate('CertificateScreen', { type: 'walking', data: data }) }}>
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.very_email_img}>
                                            <Certify />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Dog Walking</Text>
                                    </View>
                                    {data.walking_verified === '1' ? <Cmpltd /> : data.walking_certificate
                                        ? <Prgrss />
                                        : null}
                                    <RightArrow />
                                </View>
                            </TouchableWithoutFeedback>
                        )} */}

                        {data && (
                            // <TouchableWithoutFeedback onPress={() => navigation.navigate('IdentityProof')}>
                            <TouchableWithoutFeedback onPress={() => { data.grooming_verified === '1' ? null : navigation.navigate('CertificateScreen', { type: 'grooming', data: data }) }}>
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.very_email_img}>
                                            <Certify />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Dog Grooming</Text>
                                    </View>
                                    {data.grooming_verified === '1' ? <Cmpltd /> : data.grooming_certificate
                                        ? <Prgrss />
                                        : null}
                                    <RightArrow />
                                </View>
                            </TouchableWithoutFeedback>
                        )}

                        {data && (
                            <TouchableWithoutFeedback onPress={() => { data.training_verified === '1' ? null : navigation.navigate('CertificateScreen', { type: 'training', data: data }) }}>
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.very_email_img}>
                                            <Certify />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Dog Training</Text>
                                    </View>

                                    {data.training_verified === '1' ? <Cmpltd /> : data.training_certificate
                                        ? <Prgrss />
                                        : null}

                                    <RightArrow />
                                </View>
                            </TouchableWithoutFeedback>
                        )}

                        {data && (
                            <TouchableWithoutFeedback onPress={() => { data.boarding_verified === '1' ? null : navigation.navigate('CertificateScreen', { type: 'boarding', data: data }) }}>
                                {/* <TouchableWithoutFeedback> */}
                                <View style={globle_Style.pend_verfy_itm}>
                                    <View style={globle_Style.very_email}>
                                        <View style={globle_Style.very_email_img}>
                                            <Certify />
                                        </View>
                                        <Text style={globle_Style.very_email_txt}>Dog Boarding</Text>
                                    </View>
                                    {data.boarding_verified === '1' ? <Cmpltd /> : data.boarding_certificate
                                        ? <Prgrss />
                                        : null}
                                    <RightArrow />
                                </View>
                            </TouchableWithoutFeedback>
                        )}

                    </View>
                    {/* <View style={globle_Style.complete_con}>
                        <View style={globle_Style.pend_line}></View>
                        <View style={globle_Style.pend_hd}>
                            <View style={globle_Style.pend_line}></View>
                            <Text style={globle_Style.pend_hd_txt}>Completed</Text>
                        </View>
                    </View>
                    <View style={globle_Style.compl_sec}>
                        <View style={globle_Style.pend_verfy_con}>
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
                    </View> */}
                </View>
                {/* <View style={globle_Style.verfy_pet}>
                    <Text style={globle_Style.verfy_pet_txt}>To become a verified pet expert, you need to provide more information for verification.</Text>
                </View> */}
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



export default SelectCertificate;
