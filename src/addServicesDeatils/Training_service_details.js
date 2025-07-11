
import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView, TextInput, Alert, StyleSheet, FlatList, Linking } from 'react-native';
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



const ServiceDetailTraning = ({ route }) => {

    const navigation = useNavigation()

    const toggleCheckbox = () => setChecked(!checked);
    const [checked, setChecked] = useState(false);
    const [radiusRadio, setRadiusRadio] = useState(0)
    const [radius, setRadius] = useState('')
    const [petacceptRadio, setPetAcceptRadio] = useState(0)
    const [aggresive1, setPetAccept] = useState('')
    const [aggressivePetRadio, setAggressivePetRadio] = useState(0)
    const [aggresive, setAggressivePet] = useState('')
    const [certificateImage, setCertificateImage] = useState({ base64: '' })
    const [trainingRadio, setTrainingRadio] = useState(0)
    const [training, setTraining] = useState('')
    const [trainingmethodRadio, setTrainingMethodRadio] = useState(0)
    const [trainingMethod, setTrainingMethod] = useState('')


    const [trainerCertifiedRadio, setTrainerCertifiedRadio] = useState(0)
    const [trainerCertified, setTrainerCertified] = useState('')
    const [accidentalInsurRadio, setAccidentalInsurRadio] = useState(0)
    const [accidentalInsur, setAccidentalInsur] = useState('')

    const [radiusValidation, setRadiusValidation] = useState(false)
    const [aggresiveValidation, setAggresiveValidation] = useState(false)
    const [typeOfTrainingValidation, setTypeOfTrainingValidation] = useState(false)
    const [trainingMethodValidation, setTrainingMethodValidation] = useState(false)
    const [trainerCertifiedValidation, setTrainerCertifiedValidation] = useState(false)
    const [trainerCertifiedImageValidation, setTrainerCertifiedImageValidation] = useState(false)
    const [insuredValidation, setInsuredValidation] = useState(false)
    const [emergencyNameError, setemergencyNameError] = useState(false);
    const [emergencyNumberError, setemergencyNumberError] = useState(false);
    const [checkboxError, setcheckboxError] = useState(false)

    // new screen states 
    const [behaviourSelectedOptions, setBehaviourSelectedOptions] = useState([]);
    const [advanceSelectedOptions, setAdvanceSelectedOptions] = useState([]);
    const [advanceTrain, setAdvanceTrain] = useState()
    const [behaviourToggle, setBehaviourToggle] = useState()
    const TrainAccordion = () => setAdvanceTrain(!advanceTrain);
    const BehaviourAccordion = () => setBehaviourToggle(!behaviourToggle);
    const OdedienceAccordion = () => setOdedience(!odedience);
    const mediateAccordion = () => setMediateTraining(!mediateTraining);
    const behavioralAccordion = () => setBehavioralTraining(!behavioralTraining);
    const [odedience, setOdedience] = useState()
    const [mediateTraining, setMediateTraining] = useState()
    const [behavioralTraining, setBehavioralTraining] = useState()
    const [odedienceChecked, setOdedienceChecked] = useState();
    const [mediateChecked, setMediateChecked] = useState();
    const [behavioralChecked, setBehavioralChecked] = useState();
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [typeOfTrainingCheckedItems, setTypeOfTrainingCheckedItems] = useState([]);
    let selectedAddonsMap = {};



    const [trainingSections, setTrainingSections] = useState([]);
    const [behaviourOptions, setBehaviourOptions] = useState([]);
    const [trainingOptions, setTrainingOptions] = useState([]);

    const toggleOption = (option, setState) => {
        setState((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };
    // const trainingOptions = [
    //     'Over Excitement',
    //     'Socilazitation',
    //     'Jumping Control',
    //     'Puppy Biting',
    //     'Excessive Barking',
    //     'Hi Fi',
    //     'Create Training',
    //     'Shake Hand'
    // ];
    // const behaviourOptions = [
    //     'Over Excitement',
    //     'Socilazitation',
    //     'Jumping Control',
    //     'Puppy Biting',
    //     'Excessive Barking',
    //     'Hi Fi',
    //     'Create Training',
    //     'Shake Hand'
    // ];
    const trainingCommands = [
        'Sit', 'Place', 'Come',
        'Down', 'Heel', 'Leave It',
        'Drop It', 'Stay', 'Good (Yes)',
    ];
    // const trainingSections = [
    //     { title: 'Obedience Training', packageId: '1', addOns: trainingCommands },
    //     { title: 'Intermediate Training', packageId: '2', addOns: trainingCommands },
    // ];

    useEffect(() => {

        fetchData();
    }, [])

    const fetchData = async () => {
        let userData = ''
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/spPackages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}`
                },
            });

            const data = await response.json();
            setTrainingSections(data.data);
            setBehaviourOptions(data.special_packages?.["Behaiviour Training"]?.addons)
            setTrainingOptions(data.special_packages?.["Advance Training"]?.addons)
            console.warn("DATA", data)
        } catch (error) {
            console.error(error);
        }
    }



    const renderItem = ({ item, index }) => {
        const isSelected = advanceSelectedOptions.includes(item);
        const isRightItem = (index + 1) % 2 === 0; // 2nd, 4th, etc.
        return (

            <TouchableOpacity
                style={[styles.optionBox, isSelected && styles.optionBoxSelected, isRightItem ? { marginRight: 0 } : { marginRight: 15 },]}
                onPress={() => toggleOption(item, setAdvanceSelectedOptions)}
            >
                <Text style={[styles.optionText,]}>{item}</Text>

                {/* Always render checkbox box */}
                <View style={[styles.checkIcon, isSelected && styles.checkIconSelected]}>
                    {isSelected && (
                        <Image
                            source={require('../../assets/images/Vector.png')}
                            style={styles.checkImage}
                            resizeMode="contain"
                        />
                    )}
                </View>
            </TouchableOpacity>


        );
    };

    const renderItemBehaviour = ({ item, index }) => {
        const isSelected = behaviourSelectedOptions.includes(item);
        const isRightItem = (index + 1) % 2 === 0; // 2nd, 4th, etc.
        return (

            <TouchableOpacity
                style={[styles.optionBox, isSelected && styles.optionBoxSelected, isRightItem ? { marginRight: 0 } : { marginRight: 15 },]}
                onPress={() => toggleOption(item, setBehaviourSelectedOptions)}
            >
                <Text style={[styles.optionText,]}>{item}</Text>

                {/* Always render checkbox box */}
                <View style={[styles.checkIcon, isSelected && styles.checkIconSelected]}>
                    {isSelected && (
                        <Image
                            source={require('../../assets/images/Vector.png')}
                            style={styles.checkImage}
                            resizeMode="contain"
                        />
                    )}
                </View>
            </TouchableOpacity>


        );
    };


    const [emergencyName, setEmergencyName] = useState('')
    const [emergencyNumber, setEmergencyNumber] = useState('')
    const [isDisabled, setIsDisabled] = useState(false);

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
                            name: `${asset.fileName}`,
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




        typeOfTrainingCheckedItems.forEach(id => {
            const match = trainingSections.find(section => section.id === id);
            if (match) {
                selectedAddonsMap[`${match.name}`] = match.addons;
            }
        });


        console.warn("CHECKED ITEMS", selectedAddonsMap)


        if (radius == null || radius == '') {
            setRadiusValidation(true)
            return
        } else {
            setRadiusValidation(false)
        }

        if (aggresive == null || aggresive == '') {
            setAggresiveValidation(true)
            return
        } else {
            setAggresiveValidation(false)
        }

        if (typeOfTrainingCheckedItems.length == 0) {
            setTypeOfTrainingValidation(true)
            return
        } else {
            setTypeOfTrainingValidation(false)
        }

        if (trainingMethod == null || trainingMethod == '') {
            setTrainingMethodValidation(true)
            return
        } else {
            setTrainingMethodValidation(false)
        }

        if (trainerCertified == null || trainerCertified == '') {
            setTrainerCertifiedValidation(true)
            return
        } else {
            setTrainerCertifiedValidation(false)
            if (trainerCertified === 'yes') {
                if (certificateImage.base64 == null || certificateImage.base64 == '') {
                    setTrainerCertifiedImageValidation(true);
                    return
                } else {
                    setTrainerCertifiedImageValidation(false); // Clear error if serviceAddress is valid
                }
            } else {
                setTrainerCertifiedImageValidation(false); // Clear error if serviceAddress is valid
            }
        }

        if (accidentalInsur == null || accidentalInsur == '') {
            setInsuredValidation(true)
            return
        } else {
            setInsuredValidation(false)
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


        updateServiceData()



    }

    const updateServiceData = async () => {

        if (isDisabled) return; // Prevent the action if disabled
        setIsDisabled(true);

        let userData = '';
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }

        const methodKey = trainingMethod === "Every day" ? "every_day" : "alternative_day";


        const data = {
            provider_id: userData.id,
            service_id: service_id,
            service_radius_km: radius,
            can_handle_aggressive_pets: aggresive,
            obedience_training: selectedAddonsMap?.["Obedience Training"] || [],
            intermediate_training: selectedAddonsMap?.["Intermediate Training"] || [],
            behavioral_training: behaviourSelectedOptions,
            advanced_training: advanceSelectedOptions,
            training_method: methodKey,
            is_certified: trainerCertified,
            is_accidentally_insured: accidentalInsur,
            emergency_contact_name: emergencyName,
            emergency_contact_phone: emergencyNumber,
            certificate: certificateImage.base64,
        }

        console.warn("PAYLOAADD :: ", data)
        // return

        try {
            const url = `${API_BASE_URL}provider/addServiceDetails`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    provider_id: userData.id,
                    service_id: service_id,
                    service_radius_km: radius,
                    can_handle_aggressive_pets: aggresive,
                    obedience_training: selectedAddonsMap?.["Obedience Training"] || [],
                    intermediate_training: selectedAddonsMap?.["Intermediate Training"] || [],
                    behavioral_training: behaviourSelectedOptions,
                    advanced_training: advanceSelectedOptions,
                    training_method: methodKey,
                    is_certified: trainerCertified,
                    is_accidentally_insured: accidentalInsur,
                    emergency_contact_name: emergencyName,
                    emergency_contact_phone: emergencyNumber,
                    certificate: certificateImage.base64,
                }),
            });

            const result = await response.json();

            if (result.status) {
                setIsDisabled(false);
                console.warn('Saved Successfully!!!!!!!!!');
                navigation.goBack();
                // navigation.replace('Verify ID');
                // navigation.dispatch(
                //     CommonActions.reset({
                //         index: 0,
                //         routes: [{ name: 'Verify ID' }],
                //     })
                // );
                // updateServiceDetails();
                // navigation.replace('DashboardScreen')
            } else {
                setIsDisabled(false);
                console.error('Update data Failed!!!!!!!!!!!!:', result);
            }
        } catch (error) {
            setIsDisabled(false);
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


                <View style={globle_Style.form_info}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>How far are you traveling?*</Text>
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
                            <View style={[globle_Style.radioWapper, globle_Style.serv_del_rdo, radiusRadio === 3 ? globle_Style.active_wrapper : globle_Style.radioWapper, globle_Style.serv_del_rdo, { marginRight: 0 }]}>
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
                        radiusValidation ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, marginBottom: 0, marginTop: 5 }]}>Please select radius</Text> : null
                    }
                </View>

                {/* <View style={globle_Style.form_info}>
                    radio btn :
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
                </View> */}
                <View style={globle_Style.form_info}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>Can you handle aggressive pets?*</Text>
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
                            <View style={[globle_Style.radioWapper, aggressivePetRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper, { marginRight: 0 }]}>
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
                        aggresiveValidation ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, marginBottom: 0, marginTop: 5 }]}>Please select any option</Text> : null
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

                {/* <View style={globle_Style.form_info}>
                    radio btn :
                    <Text style={globle_Style.input_lable}>What Type of training you provide?</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'Grooming', setTrainingRadio, setTraining)}>
                            <View style={[globle_Style.radioWapper, trainingRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Grooming</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, trainingRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        trainingRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'Grooming & Cut', setTrainingRadio, setTraining)}>
                            <View style={[globle_Style.radioWapper, trainingRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Grooming & Cut</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, trainingRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        trainingRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View> */}
                {/* new section  */}
                <View style={[globle_Style.form_info, { marginBottom: 10 }]}>

                    <Text style={globle_Style.input_lable}>What type of training you provide?*</Text>

                    <FlatList
                        data={trainingSections}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            const isChecked = typeOfTrainingCheckedItems.includes(item.id);
                            const isExpanded = expandedIndex === index;

                            return (
                                <View style={styles.train}>
                                    <View style={styles.train_provide}>
                                        <View style={styles.check_accrd_sec}>
                                            <TouchableOpacity onPress={() => setExpandedIndex(isExpanded ? null : index)}>
                                                <View style={styles.check_accrd}>
                                                    <View style={styles.check_hd}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setTypeOfTrainingCheckedItems(prev => {
                                                                    if (prev.includes(item.id)) {
                                                                        return prev.filter(id => id !== item.id);
                                                                    } else {
                                                                        return [...prev, item.id];
                                                                    }
                                                                });
                                                            }}>
                                                            <View style={[styles.checkIcon, isChecked && styles.checkIconSelected]}>
                                                                {isChecked && (
                                                                    <Image
                                                                        source={require('../../assets/images/Vector.png')}
                                                                        style={{ width: 12, height: 12 }}
                                                                        resizeMode="contain"
                                                                    />
                                                                )}
                                                            </View>
                                                        </TouchableOpacity>
                                                        <View>
                                                            <Text style={[styles.heading, { marginLeft: 14 }]}>{item.name}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ marginTop: 5, marginRight: 10 }}>
                                                        <Image
                                                            source={
                                                                isExpanded
                                                                    ? require('../../assets/images/uparrow.png')
                                                                    : require('../../assets/images/downArrow.png')
                                                            }
                                                        />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                            {isExpanded && (
                                                <View style={styles.obedi_list}>
                                                    <FlatList
                                                        data={item.addons}
                                                        numColumns={3}
                                                        keyExtractor={(cmd, i) => i.toString()}
                                                        renderItem={({ item: cmd, index }) => (
                                                            <View style={styles.cell}>
                                                                <Text style={styles.cellText}>{cmd}</Text>
                                                                {(index % 3 !== 2) && <View style={styles.verticalDivider} />}
                                                            </View>
                                                        )}
                                                    />
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />

                    {
                        typeOfTrainingValidation ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, marginBottom: 0, marginTop: 5 }]}>Please select type of training</Text> : null
                    }


                </View>

                <View style={globle_Style.form_info}>
                    {/* Advance training types*/}
                    <View style={[styles.advan_train]}>
                        <Text style={globle_Style.input_lable}>Behavioral & Correction Training</Text>
                        <View style={styles.train_provide}>
                            <TouchableOpacity onPress={BehaviourAccordion}>
                                <View style={styles.train_accor}>
                                    <Text style={styles.heading}>Select Behavioral & Correction Training</Text>
                                    <View style={{ marginTop: 5, marginRight: 10 }}>
                                        <Image
                                            source={
                                                behaviourToggle
                                                    ? require('../../assets/images/uparrow.png')
                                                    : require('../../assets/images/downArrow.png')
                                            }
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {behaviourToggle && (
                                <View >
                                    <FlatList
                                        data={behaviourOptions}
                                        renderItem={renderItemBehaviour}
                                        keyExtractor={(item) => item}
                                        numColumns={2}
                                        columnWrapperStyle={styles.row}
                                        contentContainerStyle={styles.grid}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                <View style={globle_Style.form_info}>
                    {/* Advance training types*/}
                    <View style={[styles.advan_train]}>
                        <Text style={globle_Style.input_lable}>Advance training types</Text>
                        <View style={styles.train_provide}>
                            <TouchableOpacity onPress={TrainAccordion}>
                                <View style={styles.train_accor}>
                                    <Text style={styles.heading}>Select Advance Training Type</Text>
                                    <View style={{ marginTop: 5, marginRight: 10 }}>
                                        <Image
                                            source={
                                                advanceTrain
                                                    ? require('../../assets/images/uparrow.png')
                                                    : require('../../assets/images/downArrow.png')
                                            }
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {advanceTrain && (
                                <View >
                                    <FlatList
                                        data={trainingOptions}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item}
                                        numColumns={2}
                                        columnWrapperStyle={styles.row}
                                        contentContainerStyle={styles.grid}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* new section end */}
                <View style={globle_Style.form_info}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>Select training method*</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'Every day', setTrainingMethodRadio, setTrainingMethod)}>
                            <View style={[globle_Style.radioWapper, trainingmethodRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Every day</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, trainingmethodRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        trainingmethodRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'Alternate days', setTrainingMethodRadio, setTrainingMethod)}>
                            <View style={[globle_Style.radioWapper, trainingmethodRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper, { marginRight: 0 }]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Alternate days</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, trainingmethodRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        trainingmethodRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {
                        trainingMethodValidation ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, marginBottom: 0, marginTop: 5 }]}>Please select method of training</Text> : null
                    }
                </View>

                <View style={globle_Style.form_info}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>Are you certified Trainer?*</Text>
                    <View style={globle_Style.radio_con}>
                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'yes', setTrainerCertifiedRadio, setTrainerCertified)}>
                            <View style={[globle_Style.radioWapper, trainerCertifiedRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>Yes</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, trainerCertifiedRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        trainerCertifiedRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'no', setTrainerCertifiedRadio, setTrainerCertified)}>
                            <View style={[globle_Style.radioWapper, trainerCertifiedRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper, { marginRight: 0 }]}>
                                <View style={globle_Style.stardp_con}>
                                    <Text style={globle_Style.rdo_txt}>No</Text>
                                </View>

                                <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, trainerCertifiedRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                    {
                                        trainerCertifiedRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {
                        trainerCertifiedValidation ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, marginBottom: 0, marginTop: 5 }]}>Please select any option</Text> : null
                    }
                </View>

                {trainerCertified === 'yes' ? <View style={globle_Style.form_info}>
                    <TouchableOpacity onPress={() => handleImagePicker(setCertificateImage)}>
                        <View style={globle_Style.address_info}>
                            <TextInput style={[globle_Style.input_txt, globle_Style.other_way]} placeholder='Upload Certificate' editable={false} pointerEvents='none' value={certificateImage.name} />
                            <Upload style={globle_Style.loc_icon} />
                        </View>
                    </TouchableOpacity>

                </View> : null}

                {
                    trainerCertifiedImageValidation ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, marginBottom: 8, marginTop: -5 }]}>Please upload certificate</Text> : null
                }


                <View style={globle_Style.form_info}>
                    {/* radio btn : */}
                    <Text style={globle_Style.input_lable}>Are you accidental insured?*</Text>
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
                            <View style={[globle_Style.radioWapper, accidentalInsurRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper, { marginRight: 0 }]}>
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
                        insuredValidation ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, marginBottom: 0, marginTop: 5 }]}>Please select any option</Text> : null
                    }
                </View>

                <View style={globle_Style.form_info}>
                    <Text style={globle_Style.input_lable}>Emergency name</Text>
                    <TextInput style={globle_Style.input_txt} placeholder='Name' value={emergencyName} onChangeText={setEmergencyName} />
                </View>
                {
                    emergencyNameError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{emergencyNameError}</Text> : null
                }
                <View style={globle_Style.form_info}>
                    <TextInput style={globle_Style.input_txt} placeholder='Phone' value={emergencyNumber} onChangeText={setEmergencyNumber} inputMode='numeric' maxLength={10} />
                </View>
                {
                    emergencyNumberError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{emergencyNumberError}</Text> : null
                }
                <View style={globle_Style.serv_checkbox}>
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

const styles = StyleSheet.create({

    train_provide: {
        borderWidth: 1,
        paddingRight: 9,
        paddingLeft: 10,
        paddingTop: 14,
        paddingBottom: 2,
        borderColor: '#0000001A',
        borderRadius: 12
    },
    train_accor: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    heading: {
        fontWeight: '500',
        fontSize: 14,
        marginBottom: 12,
        color: '#979797',
        fontFamily: 'Inter-Medium'
    },

    row: {
        marginBottom: 12,
    },
    optionBox: {
        // width: '48%',
        flexBasis: 146,
        flexGrow: 1,
        flexShrink: 0,
        borderWidth: 1,
        borderColor: '#d1d5db', // default gray
        borderRadius: 12,
        paddingVertical: 14,
        paddingLeft: 9,
        paddingRight: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    optionBoxSelected: {
        borderColor: '#00A777', // green
    },
    optionText: {
        fontSize: 12,
        color: '#111827',
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        marginRight: 1
    },

    checkIcon: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#0000001A',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    checkIconSelected: {
        backgroundColor: '#03A878', // light green or match your theme
        borderColor: '#16a34a',
    },

    checkImage: {
        width: 12,
        height: 12,
    },
    // obedience 
    train: {
        marginBottom: 10
    },
    check_accrd: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    check_hd: {
        flexDirection: 'row',
    },
    obedi_list: {
        borderTopWidth: 1,
        borderColor: '#EBEBEB',
        marginHorizontal: 20,
        paddingBottom: 12
    },

    cell: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 11,
    },
    cellText: {
        fontSize: 13,
        color: '#333',
    },

    verticalDivider: {
        position: 'absolute',
        right: 0,
        top: 12,
        bottom: '15%',
        width: 1.2,
        backgroundColor: '#E0E0E0',
        height: 15
    },

});

export default ServiceDetailTraning;
