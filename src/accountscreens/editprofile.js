






import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import globle_Style from '../css/globle_Style';
import ProfileImg from '../../assets/images/profile_img.svg'
import AddImg from '../../assets/images/add_img.svg'
import User from '../../assets/images/user.svg'
import Edit from '../../assets/images/edit.svg'
import DownArrow from '../../assets/images/down_arrow.svg'
import LinearGradient from 'react-native-linear-gradient';
import { UserContext } from '../common/AppContext';
import { API_BASE_URL } from '../constants/constant';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS, { stat } from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditProfileScreen = ({ route }) => {

    const { markerPosition, address, city, state, country, zipCode, area } = route.params || {};

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [serviceAddress, setServicesAddress] = useState('');
    const [cityy, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [statee, setState] = useState('');
    const [profile, setProfile] = useState({ url: null });
    const [PermanentLatitude, setPermanentLatitude] = useState(0.0)
    const [PermanentLongitude, setPermanentLongitude] = useState(0.0)
    const [serviceLatitude, setServiceLatitude] = useState(0.0)
    const [serviceLongitude, setServiceLongitude] = useState(0.0)
    const { userData } = useContext(UserContext);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [dob, setDob] = useState('')
    const [area2, setArea] = useState(area)
    const [gender, setGender] = useState('')
    const [quoteExists, setQuoteExists] = useState(false)

    // error message state 
    const [profileImage, setprofileImage] = useState(false);
    const [nameError, setnameError] = useState(false)
    const [mobileError, setmobileError] = useState(false)
    const [emailError, setemailError] = useState(false)
    const [permanentAddressError, setpermanentAddressError] = useState(false)
    const [serviceAddressError, setserviceAddressError] = useState(false)
    const [cityError, setcityError] = useState(false)
    const [pincodeError, setpincodeError] = useState(false)
    const [stateError, setstateError] = useState(false)





    useEffect(() => {
        fetchApiData();
    }, [])

    useEffect(() => {

        if (route.params != null) {
            console.warn(route.params)
            setServicesAddress(address)
            setServiceLatitude(markerPosition.latitude)
            setServiceLongitude(markerPosition.longitude)
            setCity(city)
            setState(state)
            setPincode(zipCode)
        }


    }, [route.params])

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
            if (result.status == true) {
                console.warn("Profileeeee e:: ", result);
                setName(result.data.name);
                setMobile(result.data.phone);
                setEmail(result.data.email);
                setPermanentAddress(result.data.permanent_address);
                setServicesAddress(result.data.service_address);
                setCity(result.data.city);
                setPincode(result.data.zip_code);
                setState(result.data.state);
                setProfile({ url: result.data.profile, base64: null });
                setPermanentLatitude(result.data.permanent_latitude)
                setPermanentLongitude(result.data.permanent_longitude)
                setServiceLatitude(result.data.service_latitude)
                setServiceLongitude(result.data.service_longitude)
                setDob(result.data.dob)
                setArea(result.data.area)
                setGender(result.data.gender)
                setQuoteExists(result.data.quoteExists)



                // setProfile({ url: result.data.profile, base64: null });
                setIsLoading(false)

            } else {
                console.warn("ELSEEE :: ", response);
            }
        } catch (error) {
            console.warn('Network request failed :: ', error);
        }
    }

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

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };


    const updateProfileData = async () => {
        // const selectedGender = gender.find(g => g.id === selectRadio);

        if (!profile.url) {
            setprofileImage('Profile image is required!');
            return;
        } else {
            setprofileImage(false)
        }

        // if (name == null || name === '') {
        //     setnameError('Plese enter name ');
        //     return;
        // } else {
        //     setnameError(false)
        // }
        if (!name || name.trim() === '') {
            setnameError('Please enter a valid name');
            return;
        } else {
            setnameError(false);
        }

        if (!name || name.trim().length < 3) {
            setnameError('Name must contain atleast 3 characters');
            return;
        } else {
            setnameError(false);
        }

        if (!email) {
            setemailError('Email is required!');
            return;
        } else if (!isValidEmail(email)) {
            setemailError('Please enter a valid email!');
            return;
        } else {
            setemailError(false); // or set to ''
        }

        if (!serviceAddress) {
            setserviceAddressError('Change text to current address');
            return;
        } else {
            setserviceAddressError(false)
        }

        let userData = ""
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }

        try {
            const url = `${API_BASE_URL}provider/updateProfile`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${userData.token}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    provider_id: userData.id,
                    name: name,
                    email: email,
                    phone: mobile,
                    gender: gender,
                    permanent_address: permanentAddress,
                    permanent_latitude: PermanentLatitude,
                    permanent_longitude: PermanentLongitude,
                    service_address: serviceAddress,
                    service_latitude: serviceLatitude,
                    service_longitude: serviceLongitude,
                    city: cityy,
                    state: statee,
                    zip_code: pincode,
                    profile: profile.base64 || "",
                    dob: dob,
                    area: area2
                }),
            });

            const result = await response.json();

            if (result.status) {
                console.warn("Saved Successfully!!", result)
                updatePersonalDetails(name)
                navigation.goBack();
            } else {
                console.error('Update data Failed:', result);

            }
        } catch (error) {
            console.error('Error :', error);
        }
    };

    const updatePersonalDetails = async (name) => {
        try {
            // Retrieve the stored data
            const storedData = await AsyncStorage.getItem('userData');

            if (storedData !== null) {
                // Parse the JSON data
                const parsedData = JSON.parse(storedData);

                parsedData.name = name;
                // parsedData.email = email;

                // Save the updated object back to AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(parsedData));

                console.log('Personal details updated successfully');
            }
        } catch (error) {
            console.error('Error updating personal details:', error);
        }
    };


    const deleteMyQuotes = async () => {
        // const selectedGender = gender.find(g => g.id === selectRadio);

        setIsLoading(true)

        let userData = ""
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }

        try {
            const url = `${API_BASE_URL}provider/deleteMyQuotes/${userData.id}`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${userData.token}`, "Content-Type": "application/json" },

            });

            const result = await response.json();
            setIsLoading(false)

            if (result.status) {
                console.warn("Saved Successfully!!", result)
                navigation.navigate('AddAddress2', {
                    lat: parseFloat(serviceLatitude),
                    lng: parseFloat(serviceLongitude)
                })
            } else {
                Alert.alert("Alert!!",
                    "You can not change the address as you have active job",
                    [
                        { text: "Ok", onPress: () => console.log("No Pressed") },
                    ])
                console.error('Update data Failed:', result);

            }
        } catch (error) {
            console.error('Error :', error);
        }
    };






    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading ? (
                <ActivityIndicator style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }} size="large" color="#0000ff" />
            ) : (
                <ScrollView style={globle_Style.container}>
                    <View style={globle_Style.edit_prof_sec}>
                        <View style={globle_Style.edit_prof_con}>
                            <View style={globle_Style.edit_profimg}>
                                {profile.url ? (
                                    <Image
                                        source={{ uri: profile.url }}
                                        style={[globle_Style.my_profl_img, { width: 100, height: 100, borderRadius: 50 }]}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <User />
                                )}

                                <TouchableWithoutFeedback onPress={() => handleImagePicker(setProfile)}>
                                    <View style={globle_Style.edit_add_img}>
                                        <AddImg />
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                            {
                                profileImage ? <Text style={[globle_Style.errorText, { textAlign: 'center' }]}>{profileImage}</Text> : null
                            }
                            <View style={globle_Style.edit_frm_sec}>
                                <View style={globle_Style.edit_frm_con}>
                                    <View style={globle_Style.edit_frm_itm}>
                                        <Text style={globle_Style.input_lable}>Name</Text>
                                        <View style={globle_Style.edit_frm_input}>
                                            <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='Enter your name' value={name} onChangeText={setName} maxLength={30} />
                                            <Edit />
                                        </View>
                                        {
                                            nameError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, marginBottom: 0 }]}>{nameError}</Text> : null
                                        }
                                    </View>

                                    <View style={globle_Style.edit_frm_itm}>
                                        <Text style={globle_Style.input_lable}>Mobile</Text>
                                        <View style={globle_Style.edit_frm_input}>
                                            <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='999999999' value={mobile} editable={false} />

                                        </View>

                                    </View>
                                    <View style={globle_Style.edit_frm_itm}>
                                        <Text style={globle_Style.input_lable}>Email</Text>
                                        <View style={globle_Style.edit_frm_input}>
                                            <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='abc@gmail.com' value={email} onChangeText={setEmail} />
                                            <Edit />
                                        </View>
                                        {
                                            emailError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, marginBottom: 0 }]}>{emailError}</Text> : null
                                        }
                                    </View>
                                    {/* <View style={globle_Style.address_lable}>
                                <Text style={globle_Style.address_lable_txt}>Address</Text>
                            </View> */}
                                    <View style={globle_Style.edit_frm_itm}>
                                        <Text style={globle_Style.input_lable}>Permanent Address</Text>
                                        <View style={globle_Style.edit_frm_input}>
                                            <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='3-5-763 20/3, King Koti' value={permanentAddress} editable={false} multiline={true} />

                                        </View>
                                    </View>
                                    <View style={globle_Style.edit_frm_itm}>
                                        <Text style={globle_Style.input_lable}>Service Address</Text>
                                        <View style={globle_Style.edit_frm_input}>
                                            <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='3-5-763 20/3, King Koti' value={serviceAddress} editable={false} multiline={true} />
                                            <Edit onPress={() => {
                                                quoteExists ? Alert.alert(
                                                    "Alert!!",
                                                    "You would like to change the service address then the existing quotations will be deleted. Are you sure you want to proceed?",
                                                    [
                                                        { text: "No", onPress: () => console.log("No Pressed") },
                                                        { text: "Yes", onPress: () => deleteMyQuotes() }
                                                    ]
                                                )

                                                    : navigation.navigate('AddAddress2', {
                                                        lat: parseFloat(serviceLatitude),
                                                        lng: parseFloat(serviceLongitude)
                                                    })
                                            }} />
                                        </View>
                                    </View>
                                    <View style={globle_Style.pin_code_con}>
                                        <View style={[globle_Style.edit_frm_itm, globle_Style.pin_code_itm]}>
                                            <Text style={globle_Style.input_lable}>City</Text>
                                            <View style={[globle_Style.edit_frm_input, { paddingRight: 0, }]}>
                                                <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt,]} placeholder='Hyderabad' value={cityy} editable={false} />
                                                {/* <DownArrow /> */}
                                            </View>
                                        </View>
                                        <View style={[globle_Style.edit_frm_itm, globle_Style.pin_code_itm, { marginRight: 0 }]}>
                                            <Text style={globle_Style.input_lable}>Pincode</Text>
                                            <View style={globle_Style.edit_frm_input}>
                                                <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='500023' value={pincode} editable={false} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[globle_Style.edit_frm_itm]}>
                                        <Text style={globle_Style.input_lable}>State</Text>
                                        <View style={globle_Style.edit_frm_input}>
                                            <TextInput style={[globle_Style.input_txt, globle_Style.prof_txt]} placeholder='Telangana' value={statee} editable={false} />
                                            {/* <DownArrow /> */}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => updateProfileData()}>
                            <View style={globle_Style.globle_btn}>
                                <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 1, y: 0 }} style={globle_Style.globle_btn}>
                                    <Text style={globle_Style.gbl_btn}>Save</Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}


        </View>
    );
}



export default EditProfileScreen;
