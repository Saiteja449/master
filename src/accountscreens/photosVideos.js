import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import globle_Style from '../css/globle_Style';
import ActivePhoto from '../../assets/images/act_photo.svg';
import NonActivePhoto from '../../assets/images/nonact_photo.svg';
import ActiveVideo from '../../assets/images/act_video.svg';
import NonActiveVideo from '../../assets/images/nonact_video.svg';
import PhotoOne from '../../assets/images/pho_one.svg';
import PhotoTwo from '../../assets/images/pho_two.svg';
import VdoPlay from '../../assets/images/vdo_play.svg';
import VdoOne from '../../assets/images/vdo_one.svg';
import VdoTwo from '../../assets/images/Vdo_two.svg';
import DeleteImg from '../../assets/images/del_img.svg';
import UploadPhoVdo from '../../assets/images/pho_vdo_upload.svg'
import { UserContext } from '../common/AppContext';
import { API_BASE_URL } from '../constants/constant';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS, { stat } from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PhotosVideos = () => {

    // const { userData } = useContext(UserContext);
    const [activeTab, setActiveTab] = useState('photos');
    const [images, setImages] = useState([]);
    const [uploadFotos, setUploadFotos] = useState([]);

    useEffect(() => {
        fetchApiData();
    }, [])

    const fetchApiData = async () => {
        let userData = ""
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }
        // ${userData.id}
        const url = `${API_BASE_URL}provider/serviceImages/${userData.id}`;


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
                console.warn(result);
                setImages(result.data);
                // setProfile({ url: result.data.profile, base64: null });
                // setIsLoading(false)

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
                selectionLimit: 0, // 0 means no limit, allowing multiple selections
            },
            async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.error('ImagePicker Error: ', response.error);
                } else {
                    const assets = response.assets || [];
                    const images = [];

                    for (const asset of assets) {
                        const base64String = await convertImageToBase64(asset.uri);
                        if (base64String) {
                            images.push({
                                name: base64String,
                                type: 'image',
                            });
                        } else {
                            console.warn('Failed to convert image to base64: ', asset.uri);
                        }
                    }

                    if (images.length > 0) {
                        console.warn('SELECTED IMAGES: ', images);
                        uploadImage(images);
                        setState((prevState) => [...prevState, ...images]);
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
                    console.log('User cancelled camera');
                } else if (response.error) {
                    console.error('Camera Error: ', response.error);
                } else if (response.assets && response.assets.length > 0) {
                    const images = [];
                    for (const asset of response.assets) {
                        const base64String = await convertImageToBase64(asset.uri);
                        if (base64String) {
                            images.push({
                                name: base64String,
                                type: 'image',
                            });
                        }
                    }

                    if (images.length > 0) {
                        console.warn('TAKEN PHOTOS: ', images);
                        setState((prevState) => [...prevState, ...images]);
                        uploadImage(images);
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

    const renderImages = ({ item }) => {
        return (
            <View style={[globle_Style.pho_itm, { width: 150, height: 150, borderRadius: 25, flexDirection: 'row', }]} >
                <View>
                    <Image
                        source={{ uri: item.image }}
                        style={[globle_Style.photos, { width: 150, height: 150, borderRadius: 25 }]}
                    />
                </View>

            </View>
        )
    }

    const uploadImage = async (uploadFotos) => {
        let userData = ""
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }
        // ${userData.id}
        const url = `${API_BASE_URL}provider/upload`;


        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    files: uploadFotos,
                    provider_id: userData.id
                })
            });
            const result = await response.json();

            if (result.status) {
                console.warn(result);
                fetchApiData();
                // setProfile({ url: result.data.profile, base64: null });
                // setIsLoading(false)

            } else {
                console.warn("ELSEEE :: ", response);
            }
        } catch (error) {
            console.warn('Network request failed :: ', error);
        }
    }

    const DeleteDialog = (imageId) => {
        Alert.alert("Delete", "Are you sure you want to delete?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        DeleteImgAPI(imageId)
                    }
                }
            ]
        );
    }

    const DeleteImgAPI = async (imageId) => {


        let userData = ""
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            userData = JSON.parse(userDataString);
        }
        // ${userData.id}
        const url = `${API_BASE_URL}provider/deleteImage`;


        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageId: imageId,
                    provider_id: userData.id
                })
            });
            const result = await response.json();

            if (result.status) {
                console.warn(result);
                fetchApiData();
                // setProfile({ url: result.data.profile, base64: null });
                // setIsLoading(false)

            } else {
                console.warn("ELSEEE :: ", response);
            }
        } catch (error) {
            console.warn('Network request failed :: ', error);
        }
    }

    return (
        <ScrollView style={globle_Style.container}>
            <View style={globle_Style.pho_vdo_sec}>
                <View style={globle_Style.pho_vdo_con}>
                    <View style={globle_Style.pho_vdo_tab}>
                        <TouchableWithoutFeedback
                            style={[
                                globle_Style.pho_vdo_tab_itm,
                                activeTab === 'photos' && { backgroundColor: 'green' }
                            ]}
                            onPress={() => setActiveTab('photos')}
                        >
                            <View>
                                {activeTab === 'photos' ? (
                                    <ActivePhoto style={{ marginRight: 17 }} />
                                ) : (
                                    <NonActivePhoto style={{ marginRight: 17 }} />
                                )}
                                {activeTab === 'photos' ? (
                                    <Text style={[globle_Style.pho_vdo_tab_txt, { color: "#fff" }]}>Photos</Text>
                                ) : (
                                    <Text style={globle_Style.pho_vdo_tab_txt}>Photos</Text>
                                )}</View>

                        </TouchableWithoutFeedback>

                        {/* <TouchableOpacity
                            style={[
                                globle_Style.pho_vdo_tab_itm,
                                activeTab === 'videos' && { backgroundColor: 'green' }
                            ]}
                            onPress={() => setActiveTab('videos')}
                        >
                            {activeTab === 'videos' ? (
                                <ActiveVideo style={{ marginRight: 17 }} />

                            ) : (
                                <NonActiveVideo style={{ marginRight: 17 }} />
                            )}
                            {activeTab === 'videos' ? (
                                <Text style={[globle_Style.pho_vdo_tab_txt, { color: "#fff" }]}>Videos</Text>

                            ) : (
                                <Text style={globle_Style.pho_vdo_tab_txt}>Videos</Text>
                            )}

                        </TouchableOpacity> */}
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleImagePicker(setUploadFotos)}>
                    <View style={globle_Style.pho_vdo_upload}>
                        <Text style={globle_Style.upload_txt}>Upload </Text>
                        <UploadPhoVdo />
                    </View>
                </TouchableOpacity>

                {/* Conditional Content Rendering */}
                {activeTab === 'photos' && (
                    <View style={globle_Style.pho_con}>
                        <Text style={globle_Style.pho_con_hd}>Uploaded Photos</Text>
                        <View style={globle_Style.pho_lst}>

                            {/* <FlatList
                                data={images}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderImages}
                                horizontal={true}
                            /> */}

                            {images.map((item, index) => (
                                <View style={{ postion: 'relative' }}>
                                    <View
                                        key={index}
                                        style={[globle_Style.pho_itm, { width: 150, height: 150, borderRadius: 25, flexDirection: 'row' }]}
                                    >
                                        <View>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={[globle_Style.photos, { width: 150, height: 150, borderRadius: 25 }]}
                                            />
                                        </View>
                                        <View style={globle_Style.dele_img}>
                                            <DeleteImg style={globle_Style.dele_imgstyl} onPress={() => DeleteDialog(item.imageId)} />
                                        </View>
                                    </View>


                                </View>

                            ))}


                            {/* <View style={globle_Style.pho_itm}>
                                <PhotoOne style={globle_Style.photos} />
                            </View> */}
                            {/* <View style={globle_Style.pho_itm_two}>
                                <PhotoTwo style={globle_Style.photos} />
                            </View>
                            <View style={globle_Style.pho_itm}>
                                <PhotoOne style={globle_Style.photos} />
                            </View> */}

                        </View>
                    </View>
                )}

                {activeTab === 'videos' && (
                    <View style={globle_Style.vdo_con}>
                        <Text style={globle_Style.pho_con_hd}>Uploaded Videos</Text>
                        <View style={globle_Style.pho_lst}>
                            <View style={globle_Style.pho_itm}>
                                <VdoOne style={globle_Style.photos} />
                                <View style={globle_Style.vdo_play_btn} >
                                    <VdoPlay />
                                </View>
                            </View>
                            <View style={globle_Style.pho_itm}>
                                <VdoTwo style={globle_Style.photos} />
                                <View style={globle_Style.vdo_play_btn} >
                                    <VdoPlay />
                                </View>
                            </View>
                            <View style={globle_Style.pho_itm}>
                                <VdoTwo style={globle_Style.photos} />
                                <View style={globle_Style.vdo_play_btn} >
                                    <VdoPlay />
                                </View>
                            </View>
                            <View style={globle_Style.pho_itm}>
                                <VdoOne style={globle_Style.photos} />
                                <View style={globle_Style.vdo_play_btn} >
                                    <VdoPlay />
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default PhotosVideos;
