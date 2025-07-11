import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, FlatList, flatListRef, ActivityIndicator, Linking, Alert, Modal, TouchableWithoutFeedback, StyleSheet, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { UserContext } from '../common/AppContext';
import globle_Style from '../css/globle_Style';
import { API_BASE_URL } from '../constants/constant';
import ClosePopup from '../../assets/images/close_popup.svg'
import AggressiveBehavior from '../../assets/images/AggressiveBehavior.svg'
import MedicalIssues from '../../assets/images/MedicalIssues.svg'
import Clientleave from '../../assets/images/Clientleave.svg'
import DogNotservice from '../../assets/images/DogNotservice.svg'
import UploadPhoVdo from '../../assets/images/pho_vdo_upload.svg'
import Close from '../../assets/images/close.svg'
import Douc from '../../assets/images/douc.svg'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';
import { set } from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';

const GroomingTracking = ({ route }) => {

    const [spList, setSPList] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const { userData } = useContext(UserContext);
    const { item, edit } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [bookingData, setBookingData] = useState({});
    const [selectedPackageIds, setSelectedPackageIds] = useState(item.packages);
    const [selectedAddOns, setSelectedAddOns] = useState(item.addons);
    const [recePopup, setrecePopup] = useState(false);
    const [selectRadio, setselectedRadio] = useState(0);
    const [reason, setReason] = useState('');
    const [fileName, setFileName] = useState([])
    const navigation = useNavigation();
    const [selectpckgaddonValidate, setSelectpckgaddonValidate] = useState(false);
    const [selectReasonValidate, setSelectReasonValidate] = useState(false);
    const [uploadDocValidate, setUploadDocValidate] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        console.warn("ITMMMMZMMMZMMZM : ", item)
    }, [])


    // const handleToggle = (packageId) => {
    //     setSelectedPackageIds((prevIds) =>
    //         prevIds.includes(packageId)
    //             ? prevIds.filter((id) => id !== packageId) // Remove if already selected
    //             : [...prevIds, packageId] // Add if not selected
    //     );
    // };

    const handleToggle = (packageId) => {
        console.warn("pCKG IDDD ::: ", packageId)
        console.warn("pckgsss ::: ", selectedPackageIds)
        setSelectedPackageIds(prevPackages =>
            prevPackages.map(pkg =>
                pkg.package_id === packageId
                    ? { ...pkg, status: pkg.status === "pending" ? "completed" : "pending" }
                    : pkg
            )
        );
    };


    const handleToggleAddOns = (selectedItem) => {
        setSelectedAddOns(prevAddons =>
            prevAddons.map(addon =>
                addon.name === selectedItem.name
                    ? { ...addon, status: addon.status === 'completed' ? 'pending' : 'completed' }
                    : addon
            )
        );
    };

    const handleRadio = (radioId, reason) => {
        setselectedRadio(radioId)
        setReason(reason)
    }

    useEffect(() => {
        // fetchApiData()
    }, [])

    const manageGrooming = async () => {

        let packagee = selectedPackageIds
            .filter(pkg => pkg.status === 'completed');

        let addOns = selectedAddOns
            .filter(pkg => pkg.status === 'completed');

        if (packagee.length == 0 && addOns.length == 0) {
            setSelectpckgaddonValidate(true)
            // Alert.alert('Alert!!', 'Please select at least one package or addon to submit');
            return;
        }

        let action = ''

        if (!edit) {
            console.warn("EDITTTTTTTTTTTT falseeeeeeee ")
            action = 'create'
        } else {
            console.warn("EDITTTTTTTTTTTT trueeeeeeee")
            action = 'update'
        }
        const data = {
            booking_id: item.booking_id,
            provider_id: userData.id,
            pet_id: item.pet_id,
            packages: selectedPackageIds,
            addons: selectedAddOns,
            action: action
        }

        console.warn("DAAAA ::: ", data)

        if(isDisabled) return;

        setIsDisabled(true);

        // return

        const url = `${API_BASE_URL}manageGroomingTracking`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    booking_id: item.booking_id,
                    provider_id: userData.id,
                    pet_id: item.pet_id,
                    packages: selectedPackageIds,
                    addons: selectedAddOns,
                    action: action
                })
            });

            const result = await response.json();
            if (result.status == true) {
                setIsDisabled(false);
                console.warn('DATAAAA ::: ', result);
                navigation.goBack()
                // setBookingData(result.bookingData)
                // setSelectedAddOns(result.bookingData.addons)

                // setIsLoading(false);


            } else {
                setIsDisabled(false);
                console.error("Error: ", result);
            }
        } catch (error) {
            setIsDisabled(false);
            console.error('Network request failed:', error);
        }
    };

    const GroomingItem = ({ item, isChecked, onToggle }) => {
        const isSelected = item.status === 'completed';

        console.warn("ITEMMMMMMM ", item.package_name)
        console.warn("ITEMMMMMMM STATUSSSS", item.status)

        return (
            <View style={globle_Style.goormTrack_list}>
                <View style={globle_Style.goormTrack_listlft}>
                    <Text style={globle_Style.goormTrack_listtxt}>{item.package_name}</Text>
                </View>
                <TouchableOpacity
                    style={[
                        globle_Style.circleContainer,
                        isSelected && globle_Style.checkedCircle
                    ]}
                    onPress={onToggle} // Use TouchableOpacity for better interaction
                >
                    {isSelected && (
                        <Text style={globle_Style.checkmark}>✔</Text>
                    )}
                    <CheckBox
                        value={true}
                        onValueChange={onToggle}
                        tintColors={{ true: '#4BAF4F', false: '#aaa' }}
                        style={[globle_Style.checkboxgroom, globle_Style.hiddenCheckBox]}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    // const GroomingItemAddOns = ({ item, isSelected, onToggle }) => {
    //     return (
    //         <View style={globle_Style.goormTrack_list}>
    //             <View style={globle_Style.goormTrack_listlft}>
    //                 <Text style={globle_Style.goormTrack_listtxt}>{item}</Text>
    //             </View>
    //             <TouchableOpacity
    //                 style={[
    //                     globle_Style.circleContainer,
    //                     isSelected && globle_Style.checkedCircle // Change background when selected
    //                 ]}
    //                 onPress={onToggle}
    //             >
    //                 {isSelected && <Text style={globle_Style.checkmark}>✔</Text>}
    //                 <CheckBox
    //                     value={isSelected}
    //                     onValueChange={onToggle}
    //                     tintColors={{ true: '#4BAF4F', false: '#aaa' }}
    //                     style={[globle_Style.checkboxgroom, globle_Style.hiddenCheckBox]}
    //                 />
    //             </TouchableOpacity>
    //         </View>
    //     );
    // };

    const GroomingItemAddOns = ({ item, onToggle }) => {
        const isSelected = item.status === 'completed';

        // console.warn("ITEMMMMMMM ", item.name)
        // console.warn("ITEMMMMMMM STATUSSSS", item.status)

        return (
            <View style={globle_Style.goormTrack_list}>
                <View style={globle_Style.goormTrack_listlft}>
                    <Text style={globle_Style.goormTrack_listtxt}>{item.name}</Text>
                </View>
                <TouchableOpacity
                    style={[
                        globle_Style.circleContainer,
                        isSelected && globle_Style.checkedCircle
                    ]}
                    onPress={onToggle}
                >
                    {isSelected && <Text style={globle_Style.checkmark}>✔</Text>}
                    <CheckBox
                        value={true}
                        onValueChange={onToggle}
                        tintColors={{ true: '#4BAF4F', false: '#aaa' }}
                        style={[globle_Style.checkboxgroom, globle_Style.hiddenCheckBox]}
                    />
                </TouchableOpacity>
            </View>
        );
    };


    const openDialer = (phoneNumber) => {
        const url = `tel:${phoneNumber}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    Alert.alert('Error', 'Phone dialer is not supported on this device');
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('Error opening dialer:', err));
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
                            url: asset.uri,
                            name: asset.fileName,
                            base64: base64String,
                        };

                        console.error('SAHILLLLLLLLLLL: ', asset.fileName);

                        // setFileName(asset.fileName);
                        setState(prev => [...prev, image]); // Append to array
                    }
                } else {
                    console.error('Unexpected response: ', response);
                }
            } catch (error) {
                console.error('Unexpected error: ', error);
            }
        });
    };

    // const pickImages = setState => {
    //     launchImageLibrary(
    //         {
    //             mediaType: 'photo',
    //             selectionLimit: 1, // Allow selecting multiple images
    //         },
    //         async response => {
    //             if (response.didCancel) {
    //                 // User cancelled image picker
    //             } else if (response.error) {
    //                 console.error('ImagePicker Error: ', response.error);
    //             } else {
    //                 // const assets = response.assets || [];
    //                 const asset = response.assets[0];
    //                 const base64String = await convertImageToBase64(asset.uri);
    //                 if (base64String) {
    //                     const image = {
    //                         url: asset.uri,
    //                         name: asset.fileName,
    //                         base64: base64String,
    //                     };

    //                     console.error('SAHILLLLLLLLLLL: ', asset.fileName);

    //                     // setFileName(asset.fileName);
    //                     setState(prev => [...prev, image]); // Append to array
    //                 }
    //                 // if (assets.length > 0) {
    //                 //     const newImages = await Promise.all(
    //                 //         assets.map(async asset => {
    //                 //             const base64String = await convertImageToBase64(asset.uri);
    //                 //             return base64String
    //                 //                 ? {
    //                 //                     url: asset.uri,
    //                 //                     name: asset.fileName,
    //                 //                     base64: base64String,
    //                 //                 }
    //                 //                 : null;
    //                 //         })
    //                 //     );

    //                 //     // const validImages = newImages.filter(img => img !== null);

    //                 //     // console.warn('SELECTED ::: ', validImages);

    //                 //     // setFileName(validImages.map(img => img.name).join(', ')); // Store all filenames
    //                 //     setState(prev => [...prev, newImages]);// Append to array
    //                 // }
    //             }
    //         }
    //     );
    // };

    const pickImages = setState => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 1,
            },
            async response => {
                try {
                    if (response.didCancel) return;

                    if (response.errorCode) {
                        console.error('ImagePicker Error:', response.errorMessage);
                        return;
                    }

                    const assets = response.assets || [];

                    const newImages = await Promise.all(
                        assets.map(async asset => {
                            const alreadyExists = fileName?.some(
                                img => img.name === asset.fileName || img.url === asset.uri
                            );

                            if (alreadyExists) {
                                console.warn(`Image already selected: ${asset.fileName}`);
                                Alert.alert('Alert!!', 'Image already selected');
                                return null;
                            }

                            const base64String = await convertImageToBase64(asset.uri);
                            return base64String
                                ? {
                                    url: asset.uri,
                                    name: asset.fileName,
                                    base64: base64String,
                                }
                                : null;
                        })
                    );

                    const validImages = newImages.filter(img => img !== null);
                    setState(prev => [...prev, ...validImages]);
                } catch (error) {
                    console.error('Unexpected error:', error);
                }
            }
        );
    };


    const convertImageToBase64 = async imageUri => {
        try {
            const base64String = await RNFS.readFile(imageUri, 'base64');
            return base64String;
        } catch (error) {
            console.error('Error converting image to base64:', error);
            return null;
        }
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

    const manageCheckout = async () => {
        const data = {
            booking_id: item.booking_id,
            provider_id: userData.id,
            pet_id: item.pet_id,
            package_id: selectedPackageIds,
            addons: selectedAddOns,
            reason: reason,
            images: 'fileName.map(pkg => pkg.base64)'
            // action: 'reject'
        }

        console.warn("DAAAA ::: ", data)

        if (reason == '') {
            setSelectReasonValidate(true)
            // Alert.alert('Alert!!', 'Please select reason to terminate the service');
            return

        }else{
            setSelectReasonValidate(false)
        }

        if (fileName.length == 0) {
            setUploadDocValidate(true)
            // Alert.alert('Alert!!', 'Please upload the document');
            return
        }else{
            setUploadDocValidate(false)
        }

        if(isDisabled) return;

        setIsDisabled(true);


        // return

        const url = `${API_BASE_URL}provider/terminateGrooming`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    booking_id: item.booking_id,
                    provider_id: userData.id,
                    pet_id: item.pet_id,
                    package_id: selectedPackageIds,
                    addons: selectedAddOns,
                    reason: reason,
                    images: fileName.map(pkg => pkg.base64)
                    // action: 'reject'
                })
            });

            const result = await response.json();
            if (result.status == true) {
                console.warn('DATAAAA ::: ', result);
                setIsDisabled(false);
                setrecePopup(false)
                navigation.goBack()


            } else {
                setIsDisabled(false);
                console.error("Error: ", result);
            }
        } catch (error) {
            setIsDisabled(false);
            console.error('Network request failed:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View>
            <View style={globle_Style.pend_verfy_itm}>
                <View style={globle_Style.very_email}>
                    <View style={globle_Style.very_email_img}>
                        <Douc />
                    </View>
                    <Text numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[globle_Style.very_email_txt, {
                            flexShrink: 1,
                            flexWrap: 'wrap',
                            maxWidth: '85%',
                        }]}>{item.name}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemove(item.name)}>
                    <Close />
                </TouchableOpacity>
            </View>
        </View>
    );

    const handleRemove = (name) => {
        setFileName((prevData) => fileName.filter(item => item.name !== name));
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
                <ScrollView style={globle_Style.main_container}>
                    <View style={globle_Style.grom_actv_ser}>

                        <View style={globle_Style.main_container}>
                            <View style={globle_Style.goormTrack_sec}>
                                <View style={globle_Style.goormTrack_con}>
                                    <View style={globle_Style.groomSer_comptrak}>
                                        <View style={[globle_Style.groomSer_comptrakLft, { flex: 1 }]}>
                                            <Text style={globle_Style.goormTrack_txt}>Grooming...</Text>
                                            <Text style={globle_Style.goormTrack_para}>Please select the completed services</Text>
                                        </View>
                                        {/* <View style={globle_Style.complt_mark}>
                                            <Text style={globle_Style.complt_marktxt}>Completed</Text>
                                        </View> */}
                                    </View>
                                    <View style={globle_Style.goormTrack_item}>

                                        <View style={globle_Style.goormTrack_time}>
                                            <Text style={[globle_Style.goormTrack_pagname, { fontStyle: 'bold', fontWeight: 800 }]}>Packages</Text>
                                            {/* <Text style={globle_Style.goormTrack_timetxt}>Time: 40m 20s</Text> */}
                                        </View>
                                        <FlatList
                                            data={selectedPackageIds}
                                            keyExtractor={(item) => item.package_id.toString()} // Use package_id as a key
                                            renderItem={({ item }) => (
                                                <GroomingItem
                                                    item={item}
                                                    // isChecked={selectedPackageIds.includes(item.package_id)} // Directly check if ID exists
                                                    onToggle={() => handleToggle(item.package_id)}
                                                />
                                            )}
                                        />

                                        <View style={globle_Style.goormTrack_time}>
                                            <Text style={[globle_Style.goormTrack_pagname, { fontStyle: 'bold', fontWeight: 800, marginTop: 16 }]}>Add Ons</Text>
                                            {/* <Text style={globle_Style.goormTrack_timetxt}>Time: 40m 20s</Text> */}
                                        </View>
                                        <FlatList
                                            data={selectedAddOns}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => (
                                                <GroomingItemAddOns
                                                    item={item}
                                                    // isSelected={selectedAddOns.status === 'completed'}
                                                    onToggle={() => handleToggleAddOns(item)}
                                                />
                                            )}
                                        />
                                    </View>
                                    {/* <View style={globle_Style.goormTrack_itembtn}>
                                        <View style={{ flexBasis: 146, flexGrow: 1, flexShrink: 0 }}>
                                            <TouchableOpacity onPress={() => manageGrooming()}>
                                                <Text style={[globle_Style.btn, globle_Style.active_btn, { lineHeight: 36, borderRadius: 6 }]}>
                                                    Submit
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexBasis: 146, flexGrow: 1, flexShrink: 0 }}>
                                            <TouchableOpacity onPress={() => setrecePopup(true)}>
                                                <Text style={[globle_Style.btn, globle_Style.rece_btn, { lineHeight: 36, borderRadius: 6 }]}>Check Out</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View> */}
                                    {selectpckgaddonValidate && <Text style={[globle_Style.errorText]}>Please select atleast one package to submit.</Text>}

                                    <View style={[{ justifyContent: 'space-between', marginHorizontal: 10, flexDirection: 'row' }]}>
                                        <TouchableOpacity onPress={() => manageGrooming()}>
                                            <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.gbl_btn_two, { width: 150, paddingVertical: 6 }, {opacity: isDisabled ? 0.5 : 1}]}>
                                                <View style={{}}>
                                                    <Text style={[globle_Style.gbl_btn_two, { textAlign: 'center' }]}>Submit </Text>
                                                </View>

                                            </LinearGradient>

                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setFileName([])
                                            setReason('')
                                            setselectedRadio(-1)
                                            setSelectReasonValidate(false)
                                            setUploadDocValidate(false)
                                            setrecePopup(true)}}>
                                            {/* <View style={{}}> */}
                                            {/* <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.gbl_btn_two, { width: 150, paddingVertical: 6 }]}> */}
                                            <View style={{ width: 150, }}>
                                                <Text style={[globle_Style.white_btn, { textAlign: 'center', paddingVertical: 5 }]}>Terminate</Text>
                                            </View>

                                            {/* </LinearGradient> */}
                                            {/* </View> */}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={recePopup}
                            onRequestClose={() => {
                                setrecePopup(!recePopup);
                            }}>
                            <View style={globle_Style.popup}>
                                <View style={[globle_Style.overlay]}>

                                    <View style={globle_Style.filter_popup_sec}>
                                        <TouchableWithoutFeedback onPress={() => setrecePopup(false)}>
                                            <View style={[globle_Style.filter_popup_rgt, styles.close]}>
                                                <ClosePopup />
                                            </View>
                                        </TouchableWithoutFeedback>

                                    </View>
                                    <View style={styles.hd_sec}>
                                        <Text style={styles.track_hd_txt}>Select Reason of Early Complete</Text>
                                    </View>

                                    <View style={[globle_Style.form_info, { paddingHorizontal: 16 }]}>
                                        {/* radio btn : */}
                                        <View style={[globle_Style.radio_con, globle_Style.serv_radio]}>
                                            <View style={globle_Style.serv_rad_wrapp}>
                                                <TouchableWithoutFeedback onPress={() => handleRadio(1, 'Aggressive Behavior')}>
                                                    <View style={[globle_Style.radioWapper, selectRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                                        <View style={globle_Style.serv_chos_con}>
                                                            <AggressiveBehavior style={{ marginRight: 11.5 }} />

                                                            <Text style={globle_Style.rdo_txt}>Aggressive Behavior</Text>
                                                        </View>

                                                        <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, selectRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                                            {
                                                                selectRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                                            }
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <View style={globle_Style.serv_rad_wrapp}>
                                                <TouchableWithoutFeedback onPress={() => handleRadio(2, 'Medical Issues')}>
                                                    {/* <TouchableWithoutFeedback> */}
                                                    <View style={[globle_Style.radioWapper, selectRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                                        <View style={globle_Style.serv_chos_con}>
                                                            <MedicalIssues style={{ marginRight: 11.5 }} />
                                                            <Text style={globle_Style.rdo_txt}>Medical Issues</Text>
                                                        </View>

                                                        <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, selectRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                                            {
                                                                selectRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                                            }
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <View style={globle_Style.serv_rad_wrapp}>
                                                <TouchableWithoutFeedback onPress={() => handleRadio(3, 'Client asked to leave')}>
                                                    {/* <TouchableWithoutFeedback> */}
                                                    <View style={[globle_Style.radioWapper, selectRadio === 3 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                                        <View style={globle_Style.serv_chos_con}>
                                                            <Clientleave style={{ marginRight: 11.5 }} />
                                                            <Text style={globle_Style.rdo_txt}>Client asked to leave</Text>
                                                        </View>

                                                        <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, selectRadio === 3 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                                            {
                                                                selectRadio === 3 ? <View style={globle_Style.radio_bg}></View> : null
                                                            }
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <View style={globle_Style.serv_rad_wrapp}>
                                                <TouchableWithoutFeedback onPress={() => handleRadio(4, 'Dog not accepting service')}>
                                                    {/* <TouchableWithoutFeedback> */}
                                                    <View style={[globle_Style.radioWapper, selectRadio === 4 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                                        <View style={globle_Style.serv_chos_con}>
                                                            <DogNotservice style={{ marginRight: 11.5 }} />
                                                            <Text style={globle_Style.rdo_txt}>Dog not accepting service</Text>
                                                        </View>

                                                        <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, selectRadio === 4 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                                            {
                                                                selectRadio === 4 ? <View style={globle_Style.radio_bg}></View> : null
                                                            }
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>

                                        {selectReasonValidate && <Text style={[globle_Style.errorText]}>Please select reason to terminate the service.</Text>}


                                        <TouchableOpacity onPress={() => {
                                            if (fileName.length == 3) {
                                                Alert.alert('Alert!!', 'You can upload only 3 files');
                                                return
                                            }

                                            handleImagePicker(setFileName)
                                        }}>
                                            <View>
                                                <View style={[globle_Style.pho_vdo_upload, { borderColor: '#0000001A' }]}>
                                                    {/* <Text style={[globle_Style.upload_txt, { color: "#8A8A8A" }]}>Upload Document </Text>
                        <UploadPhoVdo /> */}

                                                    {/* <View style={globle_Style.address_info}> */}
                                                    <TextInput
                                                        style={[globle_Style.upload_txt, { color: "#8A8A8A" }]}
                                                        placeholder="Upload Certificate    "
                                                        editable={false}
                                                    // value={fileName.length > 1 ? `${fileName?.length} files` : fileName[0]?.name}
                                                    />
                                                    <UploadPhoVdo />
                                                    {/* </View> */}
                                                </View>
                                            </View>


                                        </TouchableOpacity>

                                        {uploadDocValidate && <Text style={[globle_Style.errorText]}>Please upload file to terminate the service.</Text>}


                                        <FlatList
                                            data={fileName}
                                            renderItem={renderItem}
                                            keyExtractor={(item) => item.id}
                                        />

                                       
                                        <TouchableWithoutFeedback onPress={() => {
                                            console.warn("hdhdbhdbhdbhd ::: ", fileName.map(pkg => pkg.name))
                                            manageCheckout()
                                        }}>
                                            <View style={globle_Style.globle_btn}>
                                                <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.globle_btn,{opacity: isDisabled ? 0.5 : 1}]}>
                                                    <Text style={globle_Style.gbl_btn}>End Service</Text>
                                                </LinearGradient>
                                            </View>
                                        </TouchableWithoutFeedback>

                                    </View>
                                </View>
                            </View>
                        </Modal>





                    </View>

                </ScrollView>
            )
            }

        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
        marginTop: -100
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    statsContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        backgroundColor: '#FFFFFF', // White background for the stats section

    },
    statItem: {
        // alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    statLabel: {
        fontSize: 14,
        color: '#343434',
        fontWeight: '600',
        lineHeight: 16.94,
        fontFamily: 'Inter-SemiBold'
    },
    track_sec: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 32,
        paddingRight: 23
    },
    stop_track: {
        backgroundColor: "#F91941",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 100,
        width: 100
    },
    trak_icons: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',  // shadow color
        shadowOffset: { width: 0, height: 2 },  // shadow offset
        shadowOpacity: 0.25,  // shadow transparency
        shadowRadius: 3.5,  // blur effect
        elevation: 5,  // for Android
        justifyContent: 'center',
        alignItems: "center"
    },
    // postion: {
    //     position: 'relative'
    // },
    trak_icon_sec: {
        position: 'relative',
        top: 16,
        zIndex: 1,
        right: 16,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'

    },
    track_hd_txt: {
        fontSize: 20,
        color: '#1D1D1D',
        fontWeight: '600',
        lineHeight: 16.94,
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',

        paddingTop: 5
    },
    hd_sec: {
        justifyContent: 'center',
        marginBottom: 20,
    },
    close: {
        marginTop: 13,
        marginRight: 13
    }
});

export default GroomingTracking;