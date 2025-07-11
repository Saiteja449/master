
import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Right from '../../assets/images/right.svg'
import Upload from '../../assets/images/upload.svg'
import { useNavigation } from '@react-navigation/native';
import globle_Style from '../css/globle_Style';
import CheckBox from '@react-native-community/checkbox';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { UserContext } from '../common/AppContext';
import { API_BASE_URL } from '../constants/constant';



const ServiceDetailBoarding = ({ route }) => {

    const navigation = useNavigation()

    const toggleCheckbox = () => setChecked(!checked);
    const [checked, setChecked] = useState(false);
    const [boardHomeRadio, setBoardHomeRadio] = useState(0)
    const [boardHome, setBoardHome] = useState('')
    const [petacceptRadio, setPetAcceptRadio] = useState(0)
    const [aggresive, setPetAccept] = useState('')
    const [aggressivePetRadio, setAggressivePetRadio] = useState(0)
    const [certificate, setAggressivePet] = useState('')
    const [certificateImage, setCertificateImage] = useState({ base64: '' })
    const [boardingRadio, setsetBoardingRadio] = useState(0)
    const [boarding, setBoarding] = useState('')

    const [boardingCertifiedRadio, setBoardingCertifiedRadio] = useState(0)
    const [boardingCertified, setBoardingCertified] = useState('')
    const [foodProvideRadio, setFoodProvideRadio] = useState(0)
    const [foodProvide, setFoodProvide] = useState('')







    const [emergencyName, setEmergencyName] = useState('')
    const [emergencyNumber, setEmergencyNumber] = useState('')

    const { userData } = useContext(UserContext)

    const { service_id } = route.params;

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
                            base64: base64String,
                        };

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

    const showAlert = (msg) => {
        Alert.alert(
            'All Fields are mandatory!!',
            msg,
            [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    }

    const handleValidation = async () => {

        if (radius == null || radius == '') {
            showAlert('Please select upto kms..')
        } else if (aggresive == null || aggresive == '') {
            showAlert('Please select handle aggresive or not..')
        } else if (groomingCertified == null || groomingCertified == '') {
            showAlert('Please select certified or not..')
        } else if (accidental == null || accidental == '') {
            showAlert('Please select insured or not..')
        } else if (!checked) {
            showAlert('Please accept policys and conditions..')
        } else {
            updateServiceData();
        }
    }

    const updateServiceData = async () => {
        try {
            const url = `${API_BASE_URL}provider/addServiceDetails`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${userData.token}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    provider_id: userData.id,
                    service_id: service_id,
                    service_radius_km: radius,
                    can_handle_aggressive_pets: aggresive,
                    is_certified: certificate,
                    is_accidentally_insured: accidental,
                    emergency_contact_name: emergencyName,
                    emergency_contact_phone: emergencyNumber,
                    certificate: certificateImage.base64,
                }),
            });

            const result = await response.json();

            if (result.status) {
                console.warn("Saved Successfully!!")
                // navigation.navigate('Verify ID')
                navigation.replace('DashboardScreen')
            } else {
                console.error('Update data Failed:', result);
            }
        } catch (error) {
            console.error('Error :', error);
        }
    };

    const handleRadio = (index, value, setState, setStateValue) => {
        setState(index)
        setStateValue(value)
    }


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

                <View style={globle_Style.form_info}>
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
                </View>
                <View style={globle_Style.form_info}>
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
                </View>

                <View style={globle_Style.form_info}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>What Type of Boarding you provide?</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'Home', setsetBoardingRadio, setBoarding)}>
                            <View style={[globle_Style.radioWapper, boardingRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Home</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, boardingRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        boardingRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'Kennel', setsetBoardingRadio, setBoarding)}>
                            <View style={[globle_Style.radioWapper, boardingRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Kennel</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, boardingRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        boardingRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <View style={globle_Style.form_info}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>How many pets you can board at your home?</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, '2', setBoardHomeRadio, setBoardHome)}>
                            <View style={[globle_Style.radioWapper, globle_Style.serv_del_rdo, boardHomeRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper, globle_Style.serv_del_rdo]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Upto 2</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, boardHomeRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        boardHomeRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, '5', setBoardHomeRadio, setBoardHome)}>
                            <View style={[globle_Style.radioWapper, boardHomeRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper, globle_Style.serv_del_rdo]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={[globle_Style.rdo_txt,]}>Upto 5</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, boardHomeRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        boardHomeRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(3, '7', setBoardHomeRadio, setBoardHome)}>
                            <View style={[globle_Style.radioWapper, globle_Style.serv_del_rdo, boardHomeRadio === 3 ? globle_Style.active_wrapper : globle_Style.radioWapper, globle_Style.serv_del_rdo]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={[globle_Style.rdo_txt,]}>Upto 7</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, boardHomeRadio === 3 ? globle_Style.static_radio_circle : globle_Style.radio_static,]}>
                                    {
                                        boardHomeRadio === 3 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <View style={globle_Style.form_info}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>What type of food you provide?</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'Veg', setFoodProvideRadio, setFoodProvide)}>
                            <View style={[globle_Style.radioWapper, foodProvideRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Veg</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, foodProvideRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        foodProvideRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'Non Veg', setFoodProvideRadio, setFoodProvide)}>
                            <View style={[globle_Style.radioWapper, foodProvideRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Non Veg</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, foodProvideRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        foodProvideRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <View style={globle_Style.form_info}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>Do you have pet boarding certificate?</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'yes', setBoardingCertifiedRadio, setBoardingCertified)}>
                            <View style={[globle_Style.radioWapper, boardingCertifiedRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Yes</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, boardingCertifiedRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        boardingCertifiedRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'no', setBoardingCertifiedRadio, setBoardingCertified)}>
                            <View style={[globle_Style.radioWapper, boardingCertifiedRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>No</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, boardingCertifiedRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        boardingCertifiedRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                {boardingCertified === 'yes' ? <View style={globle_Style.form_info}>
                    <TouchableOpacity onPress={() => handleImagePicker(setCertificateImage)}>
                        <View style={globle_Style.address_info}>
                            <TextInput style={[globle_Style.input_txt, globle_Style.other_way]} placeholder='Upload Certificate' editable={false} pointerEvents='none' value={certificateImage.name} />
                            <Upload style={globle_Style.loc_icon} />
                        </View>
                    </TouchableOpacity>

                </View> : null}

                <View style={globle_Style.form_info}>
                    <Text style={globle_Style.input_lable}>Emergency contact</Text>
                    <TextInput style={globle_Style.input_txt} placeholder='Name' value={emergencyName} onChangeText={setEmergencyName} />
                </View>
                <View style={globle_Style.form_info}>
                    <TextInput style={globle_Style.input_txt} placeholder='Phone' value={emergencyNumber} onChangeText={setEmergencyNumber} inputMode='numeric' />
                </View>
                <View style={globle_Style.serv_checkbox}>
                    <CheckBox
                        value={checked}
                        onChange={toggleCheckbox}
                        style={globle_Style.chekbox}
                        tintColors={{ true: '#03A878', false: '#0000001A' }}
                    />
                    <Text style={globle_Style.checkbox_txt}>By Proceeding, I accept Pertsfolio <Text style={{ color: '#FD921D' }}>terms, privacy policy & traffic rates</Text></Text>
                </View>



            </View>
            <View style={[globle_Style.serv_btn]}>
                <TouchableWithoutFeedback onPress={() => handleValidation()} >
                    <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={globle_Style.globle_btn}>
                        <Text style={[globle_Style.gbl_btn]}>Continue</Text>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>



    );
}



export default ServiceDetailBoarding;
