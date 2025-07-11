






import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import globle_Style from '../css/globle_Style';
import LinearGradient from 'react-native-linear-gradient';
import Downarrow from '../../assets/images/downarrow.svg'

import UploadPhoVdo from '../../assets/images/pho_vdo_upload.svg'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constants/constant';
import { useNavigation } from '@react-navigation/native';

const CertificateScreen = ({ route }) => {

    const [certificateImage, setCertificateImage] = useState({ base64: '' });
    const [certificateError, setCertificateError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const navigation = useNavigation();
    const { type, data } = route.params;
    const [fileName, setFileName] = useState('')

    useEffect(() => {

        if (type === 'walking') {
            setFileName(data.walking_certificate || '');
        } else if (type === 'grooming') {
            setFileName(data.grooming_certificate || '');
        } else if (type === 'training') {
            setFileName(data.training_certificate || '');
        } else if (type === 'boarding') {
            setFileName(data.boarding_certificate || '');
        } else {
            setFileName(data.police_verification || '');
        }

    }, [])

    const convertImageToBase64 = async imageUri => {
        try {
            const base64String = await RNFS.readFile(imageUri, 'base64');
            return base64String;
        } catch (error) {
            console.error('Error converting image to base64:', error);
            return null;
        }
    };

    const pickImages = setState => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 1,
            },
            async response => {
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

                            console.warn('SELECTEDD ::: ', image);

                            setFileName(asset.fileName);
                            setState(image);
                        } else {
                            console.warn('ELSEEE SELECTEDD ::: ', asset.uri);
                        }
                    }
                }
            },
        );
    };

    const takePhoto = async setState => {
        const options = {
            mediaType: 'photo',
        };

        launchCamera(options, async response => {
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
                        console.error('SAHILLLLLLLLLLL: ', asset.fileName);

                        setFileName(asset.fileName);
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

    const handleImagePicker = setState => {
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
            { cancelable: true },
        );
    };

    const uploadImage = async () => {

        console.warn('CERTIFICATE IMAGE :: ', type);

        if (!certificateImage.base64 || certificateImage.base64 === '') {
            setCertificateError(true)
            return;
        }

        if (isDisabled) {
            return;
        }

        setIsDisabled(true);

        let userData = ""
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }
        // ${userData.id}
        const url = `${API_BASE_URL}provider/uploadCertificate`;

        const data = {
            provider_id: userData.id,
            certificate: certificateImage.base64,
            certificate_type: type
        }

        console.warn('URLLLL :: ', data);
        // return


        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    provider_id: userData.id,
                    certificate: certificateImage.base64,
                    certificate_type: type
                })
            });
            const result = await response.json();

            if (result.status) {
                console.warn(result);
                Alert.alert("Certificate uploaded successfully!!", "Verification will be completed within 24 hours.", [
                    {
                        text: "OK", onPress: () => {
                            if (type === 'walking' || type === 'grooming' || type === 'training' || type === 'boarding') {
                                navigation.pop(2);
                            } else {
                                navigation.goBack()
                            }
                        }
                    }
                ]);
                // navigation.goBack()
                // fetchApiData();
                // setProfile({ url: result.data.profile, base64: null });
                // setIsLoading(false)

            } else {
                setIsDisabled(false);
                console.warn("ELSEEE :: ", result);
            }
        } catch (error) {
            setIsDisabled(false);
            console.warn('Network request failed :: ', error);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={[globle_Style.container,]}>
            <View style={globle_Style.verify_form_sec} >
                <View style={globle_Style.verify_form_con}>
                    <Text style={globle_Style.input_lable}>Certificate</Text>
                </View>
                {/* <View style={globle_Style.pend_verfy_con}>
                    <View style={globle_Style.pend_verfy_itm}>
                        <View style={globle_Style.very_email}>
                            <Text style={[globle_Style.very_email_txt, globle_Style.new_Verfiy_txt]}>Choose Service type</Text>
                        </View>
                        <Downarrow />
                    </View>

                </View> */}
                <TouchableOpacity onPress={() => handleImagePicker(setCertificateImage)}>
                    <View>
                        <View style={[globle_Style.pho_vdo_upload, { borderColor: '#0000001A' }]}>
                            {/* <Text style={[globle_Style.upload_txt, { color: "#8A8A8A" }]}>Upload Document </Text>
                        <UploadPhoVdo /> */}

                            {/* <View style={globle_Style.address_info}> */}
                            <TextInput
                                style={[globle_Style.upload_txt, { color: "#8A8A8A" }]}
                                placeholder="Upload Certificate    "
                                editable={false}
                                value={fileName}
                            />
                            <UploadPhoVdo />
                            {/* </View> */}
                        </View>
                        {certificateError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>Please upload certificate</Text> : null}
                    </View>


                </TouchableOpacity>

                <View style={{ flex: 1 }} />
                <View style={globle_Style.verify_form_btn}>
                    <TouchableWithoutFeedback onPress={() => uploadImage()}>
                        <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.globle_btn,]}>
                            <Text style={[globle_Style.gbl_btn]}>Submit Documents</Text>
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </ScrollView>
    );
}



export default CertificateScreen;
