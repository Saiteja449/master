
import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView, TextInput, Alert, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Right from '../../assets/images/right.svg'
import Upload from '../../assets/images/upload.svg'
import { CommonActions, useNavigation } from '@react-navigation/native';
import globle_Style from '../css/globle_Style';
import CheckBox from '@react-native-community/checkbox';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { UserContext } from '../common/AppContext';
import { API_BASE_URL } from '../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ServiceDetailGrooming = ({ route }) => {

    const navigation = useNavigation()

    const toggleCheckbox = () => setChecked(!checked);
    const [checked, setChecked] = useState(false);
    const [radiusRadio, setRadiusRadio] = useState(0)
    const [radius, setRadius] = useState('')
    const [petacceptRadio, setPetAcceptRadio] = useState(0)
    const [petAccept, setPetAccept] = useState('')
    const [aggressivePetRadio, setAggressivePetRadio] = useState(0)
    const [aggresive, setAggressivePet] = useState('')
    const [certificateImage, setCertificateImage] = useState({ base64: '' })
    const [groomingRadio, setGroomingRadio] = useState(0)
    const [groomingType, setGrooming] = useState('')
    const [groomingServiceRadio, setGroomingServiceRadio] = useState(0)
    const [groomingService, setGroomingService] = useState('')
    const [groomingCertifiedRadio, setGroomingCertifiedRadio] = useState(0)
    const [groomingCertified, setGroomingCertified] = useState('')
    const [accidentalInsurRadio, setAccidentalInsurRadio] = useState(0)
    const [accidentalInsur, setAccidentalInsur] = useState('')
    const [emergencyName, setEmergencyName] = useState('')
    const [emergencyNumber, setEmergencyNumber] = useState('')
    const [isDisabled, setIsDisabled] = useState(false);

    const { userData } = useContext(UserContext)

    const { service_id } = route.params;

    // error message status 

    const [radiusError, setradiusError] = useState(false);
    const [aggresiveError, setaggresiveError] = useState(false);
    const [certificateError, setcertificateError] = useState(false);
    const [accidentalError, setaccidentalError] = useState(false);
    const [emergencyNameError, setemergencyNameError] = useState(false);
    const [emergencyNumberError, setemergencyNumberError] = useState(false);
    const [petacceptRadioError, setpetacceptRadioError] = useState(false);
    const [groomingRadioError, setgroomingRadioError] = useState(false);
    const [groomingServiceError, setgroomingServiceError] = useState(false);
    const [groomingCertiError, setGroomingCertiError] = useState(false)
    const [checkboxError, setcheckboxError] = useState(false)






    useEffect(() => {
        console.warn(service_id)
    }, [])

    const convertImageToBase64 = async (imageUri) => {
        try {
            const base64String = await RNFS.readFile(imageUri, 'base64');
            return base64String;
        } catch (error) {
            console.error("Error converting image to base64:", error);
            return null;
        }
    };

    const pickImages = (setState) => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 1,
            },
            async (response) => {
                if (response.didCancel) {
                    // User cancelled image picker
                } else if (response.error) {
                    console.error('ImagePicker Error: ', response.error);
                } else {
                    const assets = response.assets || [];
                    if (assets.length > 0) {
                        const asset = assets[0];
                        const base64String = await convertImageToBase64(asset.uri);
                        if (base64String) {
                            const image = {
                                url: `${asset.uri}`,
                                name: `${asset.fileName}`,
                                base64: base64String,
                            };

                            console.warn("SELECTEDD ::: ", image)

                            setState(image);
                        } else {
                            console.warn("ELSEEE SELECTEDD ::: ", asset.uri)
                        }
                    }
                }
            }
        );
    };

    const takePhoto = async (setState) => {
        const options = {
            mediaType: 'photo',
        };

        launchCamera(options, async (response) => {
            try {
                if (response.didCancel) {
                    // User cancelled camera
                } else if (response.error) {
                    console.error('Camera Error: ', response.error);
                } else if (response.assets && response.assets.length > 0) {
                    const asset = response.assets[0];
                    const base64String = await convertImageToBase64(asset.uri);
                    if (base64String) {
                        const image = {
                            url: `${asset.uri}`,
                            name: `${asset.fileName}`,
                            base64: base64String,
                        };
                        console.warn("SELECTEDD CAMMMM ::: ", image)

                        setState(image);
                    }
                } else {
                    console.error('Unexpected response: ', response);
                }
            } catch (error) {
                console.error('Unexpected error: ', error);
            }
        });
    };

    const handleImagePicker = (setState) => {
        Alert.alert(
            'Select Image Source',
            'Choose an option',
            [
                {
                    text: 'Take Photo',
                    onPress: () => takePhoto(setState),
                },
                {
                    text: 'Choose from Gallery',
                    onPress: () => pickImages(setState),
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    // const showAlert = (msg) => {
    //     Alert.alert(
    //         'All Fields are mandatory!!',
    //         msg,
    //         [
    //             {
    //                 text: 'Ok',
    //                 style: 'cancel',
    //             },
    //         ],
    //         { cancelable: true }
    //     );
    // }

    // const handleValidation = async () => {

    //     if (radius == null || radius == '') {
    //         showAlert('Please select upto kms..')
    //     } else if (aggresive == null || aggresive == '') {
    //         showAlert('Please select handle aggresive or not..')
    //     } else if (groomingCertified == null || groomingCertified == '') {
    //         showAlert('Please select certified or not..')
    //     } else if (accidental == null || accidental == '') {
    //         showAlert('Please select insured or not..')
    //     } else if (checked) {
    //         showAlert('Please accept policys and conditions..')
    //     } else {
    //         updateServiceData();
    //     }
    // }

    const handleValidation = async () => {


        if (radius == null || radius == '') {
            setradiusError('Please select any Option');
            return
        } else {
            setradiusError(''); // Clear error if name is valid
        }

        if (petacceptRadio == null || petacceptRadio == '') {
            setpetacceptRadioError('Please select any Option');
            return
        } else {
            setpetacceptRadioError(''); // Clear error if gender is valid
        }

        if (aggresive == null || aggresive == '') {
            setaggresiveError('Please select any Option');
            return
        } else {
            setaggresiveError(''); // Clear error if gender is valid
        }

        if (groomingRadio == null || groomingRadio == '') {
            setgroomingRadioError('Please select any Option');
            return
        } else {
            setgroomingRadioError(''); // Clear error if gender is valid
        }

        if (groomingService == null || groomingService == '') {
            setgroomingServiceError('Please select any Option');
            return
        } else {
            setgroomingServiceError(''); // Clear error if gender is valid
        }

        if (groomingCertified == null || groomingCertified == '') {
            setcertificateError('Please select any Option');
            return
        } else {
            setcertificateError('');
            if (groomingCertified === 'yes') {
                if (certificateImage.base64 == null || certificateImage.base64 == '') {
                    setGroomingCertiError('Please upload your certificate (mandatory)');
                    return
                } else {
                    setGroomingCertiError(''); // Clear error if serviceAddress is valid
                }
            }
            // Clear error if dob is valid
        }

        if (accidentalInsur == null || accidentalInsur == '') {
            setaccidentalError('Please select any Option');
            return
        } else {
            setaccidentalError(''); // Clear error if serviceAddress is valid
        }

        if (emergencyName !== '' || emergencyName.trim() !== '') {
            if (!/^[a-zA-Z\s]+$/.test(emergencyName)) {
                setemergencyNameError('Name can only contain letters and spaces');
                return;
            } else if (emergencyName.length < 3) {
                setemergencyNameError('Must be at least 3 characters');
                return;
            } else {
                setemergencyNameError(''); // Clear the error if name is valid
            }
        } else {
            setemergencyNameError(''); // Clear the error if name is null or empty
        }

        if (emergencyNumber !== '' || emergencyNumber.trim() !== '') {
            if (emergencyNumber.length < 10) {
                setemergencyNumberError('Mobile number must be 10 characters');
                return;
            } else {
                setemergencyNumberError(''); // Clear the error if number is valid
            }
        } else {
            setemergencyNumberError(''); // Clear the error if number is null or empty
        }

        if (!checked) {
            setcheckboxError('Please accept policys and conditions..');
            return
        } else {
            setcheckboxError('') // Clear the error if number is valid or empty
        }

        // if (radius && aggresive && dob && groomingCertified && accidental&&emergencyName&&emergencyNumber&&petacceptRadio&&groomingService) {

        // }
        console.warn("SUCCESSSSSSS")
        updateServiceData();
    }

    const updateServiceData = async () => {

        let userData = '';
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }

        const data = {
            provider_id: userData.id,
            service_id: service_id,
            service_radius_km: radius,
            accepted_pets: petAccept,
            can_handle_aggressive_pets: aggresive,
            is_certified: groomingCertified,
            is_accidentally_insured: accidentalInsur,
            type: groomingType,
            service_location: groomingService,
            emergency_contact_name: emergencyName,
            emergency_contact_phone: emergencyNumber,
            certificate: certificateImage.base64,
        }
        console.warn(data)
        // return

        if (isDisabled) return; // Prevent the action if disabled
        setIsDisabled(true);

        try {
            const url = `${API_BASE_URL}provider/addServiceDetails`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${userData.token}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    provider_id: userData.id,
                    service_id: service_id,
                    service_radius_km: radius,
                    accepted_pets: petAccept,
                    can_handle_aggressive_pets: aggresive,
                    is_certified: groomingCertified,
                    is_accidentally_insured: accidentalInsur,
                    type: groomingType,
                    service_location: groomingService,
                    emergency_contact_name: emergencyName,
                    emergency_contact_phone: emergencyNumber,
                    certificate: certificateImage.base64,
                }),
            });

            const result = await response.json();

            if (result.status) {
                console.warn("Saved Successfully!!")
                setIsDisabled(false);
                console.warn('Saved Successfully!!!!!!!!!');
                // navigation.replace('Verify ID');
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Verify ID' }],
                    })
                );
                updateServiceDetails();
            } else {
                setIsDisabled(false)
                console.error('Update data Failed:', result);
            }
        } catch (error) {
            console.error('Error :', error);
        }
    };

    const updateServiceDetails = async () => {
        try {
            // Retrieve the stored data
            const storedData = await AsyncStorage.getItem('userData');

            if (storedData !== null) {
                // Parse the JSON data
                const parsedData = JSON.parse(storedData);

                // Update the personal_details field
                parsedData.service_details = true;

                // Save the updated object back to AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(parsedData));
                console.log('Service details updated successfully');
            } else {
                console.log('Service details elseeeeee', storedData);
            }
        } catch (error) {
            console.error('Error updating Service details:', error);
        }
    };

    const handleRadio = (index, value, setState, setStateValue) => {
        setState(index)
        setStateValue(value)
    }

    const openLink = (url) => {
        Linking.openURL(url);
    };


    return (

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
                                    <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={globle_Style.pers_nav}>
                                        <Text style={[globle_Style.pers_navnot_act_itm, globle_Style.pers_navactive_itm]}>2</Text>
                                    </LinearGradient>
                                </View>
                                <View style={{ textAlign: 'center' }}>
                                    <Text style={[globle_Style.pers_nav_txt, globle_Style.pers_nav_txt_act]}>Service</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={globle_Style.per_dtl_itm}>

                                <View style={globle_Style.nav_con}>
                                    <LinearGradient colors={['#D9D9D9', '#D9D9D9']} start={{ x: 0, y: 1 }} style={globle_Style.pers_nav}>
                                        <Text style={globle_Style.pers_navnot_act_itm}>3</Text>
                                    </LinearGradient>
                                </View>
                                <View style={{ textAlign: 'center' }}>
                                    <Text style={globle_Style.pers_nav_txt}>ID Verification</Text>
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

                <View style={[globle_Style.form_info, { marginBottom: radiusError ? 2 : 10 }]}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>How far are you traveling</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, '7', setRadiusRadio, setRadius)}>
                            <View style={[globle_Style.radioWapper, globle_Style.serv_del_rdo, radiusRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper, globle_Style.serv_del_rdo]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Upto {'\n'}7 km</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, radiusRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        radiusRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, '15', setRadiusRadio, setRadius)}>
                            <View style={[globle_Style.radioWapper, radiusRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper, globle_Style.serv_del_rdo]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={[globle_Style.rdo_txt,]}>Upto {'\n'}15 km</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, radiusRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        radiusRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(3, '30', setRadiusRadio, setRadius)}>
                            <View style={[globle_Style.radioWapper, globle_Style.serv_del_rdo, radiusRadio === 3 ? globle_Style.active_wrapper : globle_Style.radioWapper, globle_Style.serv_del_rdo]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={[globle_Style.rdo_txt,]}>Upto {'\n'}30 km</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, radiusRadio === 3 ? globle_Style.static_radio_circle : globle_Style.radio_static,]}>
                                    {
                                        radiusRadio === 3 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {
                        radiusError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{radiusError}</Text> : null
                    }
                </View>
                <View style={[globle_Style.form_info, { marginBottom: petacceptRadioError ? 2 : 10 }]}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>What Types of Pet do you accept?</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'Dog', setPetAcceptRadio, setPetAccept)}>
                            <View style={[globle_Style.radioWapper, globle_Style.serv_del_rdo, petacceptRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper, globle_Style.serv_del_rdo]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Dog</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, petacceptRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        petacceptRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'Cat', setPetAcceptRadio, setPetAccept)}>
                            <View style={[globle_Style.radioWapper, globle_Style.serv_del_rdo, petacceptRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper, globle_Style.serv_del_rdo]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Cat</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, petacceptRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        petacceptRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(3, 'Both', setPetAcceptRadio, setPetAccept)}>
                            <View style={[globle_Style.radioWapper, globle_Style.serv_del_rdo, petacceptRadio === 3 ? globle_Style.active_wrapper : globle_Style.radioWapper, globle_Style.serv_del_rdo]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Both</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, petacceptRadio === 3 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        petacceptRadio === 3 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {
                        petacceptRadioError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{petacceptRadioError}</Text> : null
                    }
                </View>
                <View style={[globle_Style.form_info, { marginBottom: aggresiveError ? 2 : 10 }]}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>Can you handle aggressive pets?</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'yes', setAggressivePetRadio, setAggressivePet)}>
                            <View style={[globle_Style.radioWapper, aggressivePetRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Yes</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, aggressivePetRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        aggressivePetRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'no', setAggressivePetRadio, setAggressivePet)}>
                            <View style={[globle_Style.radioWapper, aggressivePetRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>No</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, aggressivePetRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        aggressivePetRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {
                        aggresiveError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{aggresiveError}</Text> : null
                    }
                </View>

                {/* {certificate === 'yes' ? <View style={globle_Style.form_info}>
                    <TouchableOpacity onPress={() => handleImagePicker(setCertificateImage)}>
                        <View style={globle_Style.address_info}>
                            <TextInput style={[globle_Style.input_txt, globle_Style.other_way]} placeholder='Upload Certificate' editable={false} pointerEvents='none' value={certificateImage.name} />
                            <Upload style={globle_Style.loc_icon} />
                        </View>
                    </TouchableOpacity>

                </View> : null} */}

                <View style={[globle_Style.form_info, { marginBottom: groomingRadioError ? 2 : 10 }]}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>What Type of Grooming you provide?</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'Grooming', setGroomingRadio, setGrooming)}>
                            <View style={[globle_Style.radioWapper, groomingRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Grooming</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, groomingRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        groomingRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'Grooming & Cut', setGroomingRadio, setGrooming)}>
                            <View style={[globle_Style.radioWapper, groomingRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Grooming & Cut</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, groomingRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        groomingRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {
                        groomingRadioError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{groomingRadioError}</Text> : null
                    }
                </View>

                <View style={[globle_Style.form_info, { marginBottom: groomingServiceError ? 2 : 10 }]}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>Where the Grooming service you provide?</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'home_service', setGroomingServiceRadio, setGroomingService)}>
                            <View style={[globle_Style.radioWapper, groomingServiceRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Client House</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, groomingServiceRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        groomingServiceRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'van_service', setGroomingServiceRadio, setGroomingService)}>
                            <View style={[globle_Style.radioWapper, groomingServiceRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Van</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, groomingServiceRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        groomingServiceRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {
                        groomingServiceError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{groomingServiceError}</Text> : null
                    }
                </View>

                <View style={[globle_Style.form_info, { marginBottom: certificateError ? 2 : 10 }]}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>Are you certified Groomer?</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'yes', setGroomingCertifiedRadio, setGroomingCertified)}>
                            <View style={[globle_Style.radioWapper, groomingCertifiedRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Yes</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, groomingCertifiedRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        groomingCertifiedRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'no', setGroomingCertifiedRadio, setGroomingCertified)}>
                            <View style={[globle_Style.radioWapper, groomingCertifiedRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>No</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, groomingCertifiedRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        groomingCertifiedRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {
                        certificateError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{certificateError}</Text> : null
                    }
                </View>

                {groomingCertified === 'yes' ? <View style={globle_Style.form_info}>
                    <TouchableOpacity onPress={() => handleImagePicker(setCertificateImage)}>
                        <View style={globle_Style.address_info}>
                            <TextInput style={[globle_Style.input_txt, globle_Style.other_way]} placeholder='Upload Certificate' editable={false} pointerEvents='none' value={certificateImage.name} />
                            <Upload style={globle_Style.loc_icon} />
                        </View>
                    </TouchableOpacity>

                    {
                        groomingCertiError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{groomingCertiError}</Text> : null
                    }

                </View> : null}


                <View style={[globle_Style.form_info, { marginBottom: accidentalError ? 2 : 10 }]}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>Are you accidental insured?</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'yes', setAccidentalInsurRadio, setAccidentalInsur)}>
                            <View style={[globle_Style.radioWapper, accidentalInsurRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Yes</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, accidentalInsurRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        accidentalInsurRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'no', setAccidentalInsurRadio, setAccidentalInsur)}>
                            <View style={[globle_Style.radioWapper, accidentalInsurRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>No</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, accidentalInsurRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        accidentalInsurRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {
                        accidentalError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{accidentalError}</Text> : null
                    }
                </View>

                <View style={[globle_Style.form_info, { marginBottom: emergencyNameError ? 2 : 10 }]}>
                    <Text style={globle_Style.input_lable}>Emergency contact</Text>
                    <TextInput style={globle_Style.input_txt} placeholder='Name' value={emergencyName} onChangeText={setEmergencyName} />
                </View>
                {
                    emergencyNameError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{emergencyNameError}</Text> : null
                }
                <View style={[globle_Style.form_info, { marginBottom: emergencyNumberError ? 2 : 10 }]}>
                    <TextInput style={globle_Style.input_txt} placeholder='Phone' value={emergencyNumber} onChangeText={setEmergencyNumber} inputMode='numeric' maxLength={10} />
                </View>
                {
                    emergencyNumberError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{emergencyNumberError}</Text> : null
                }
                <View style={[globle_Style.serv_checkbox, { marginBottom: checkboxError ? 2 : 30 }]}>
                    <CheckBox
                        value={checked}
                        onChange={toggleCheckbox}
                        style={globle_Style.chekbox}
                        tintColors={{ true: '#03A878', false: '#0000001A' }}
                    />
                    <TouchableOpacity >
                        <View style={{ width: 270 }}>
                            <Text style={globle_Style.checkbox_txt}>By Proceeding, I accept Petsfolio{' '}<Text style={{ color: '#FD921D' }} onPress={() => openLink('https://www.petsfolio.com/in/terms-of-service/')}>terms and conditions & <Text style={{ color: '#FD921D' }} onPress={() => openLink('https://www.petsfolio.com/in/privacy-policy/')}> privacy policy </Text></Text>
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>

                {
                    checkboxError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{checkboxError}</Text> : null
                }



            </View>
            <View style={[globle_Style.serv_btn]}>
                <TouchableOpacity onPress={!isDisabled ? handleValidation : null}>
                    <LinearGradient
                        colors={['#FBAB51', '#FE8705']}
                        start={{ x: 0, y: 1 }}
                        style={[globle_Style.globle_btn, , { opacity: isDisabled ? 0.5 : 1 }]}>
                        <Text style={globle_Style.gbl_btn}>Continue</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>



    );
}



export default ServiceDetailGrooming;
