import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { NetworkContext } from '../common/NetworkProvider';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { UserContext } from '../common/AppContext';
import globle_Style from '../css/globle_Style';
import { API_BASE_URL } from '../constants/constant';

const AddAddressDetail = ({ route }) => {

    const selectTypes = [
        {
            id: 1,
            name: 'home',
        },
        {
            id: 2,
            name: 'work'
        },
        {
            id: 3,
            name: 'other'
        },
    ];

    const { address, city, country, markerPosition, state, zipCode, id, isEdit } = route.params;
    const [floor, setFloor] = useState('')
    const [building, setBuilding] = useState('')
    const [landmark, setLandmark] = useState('')
    const [type, setType] = useState(-1)
    const { isConnected } = useContext(NetworkContext);
    const navigation = useNavigation();

    const { userData } = useContext(UserContext)


    useEffect(() => {

        console.warn("PARAMS ::: ", address)
    }, [])

    const AddAddressApiCall = async () => {
        const saveAsType = selectTypes.find(g => g.id === type);

        try {

            if (isConnected) {
                if (isEdit) {

                    const url = `${API_BASE_URL}user/addAddress`;
                    let result = await fetch(url, {
                        method: "POST",
                        headers: { 'Authorization': `Bearer ${userData.token}`, "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: id,
                            user_id: userData.id,
                            address: address,
                            city: city,
                            state: state,
                            country: country,
                            zip_code: zipCode,
                            latitude: markerPosition.latitude,
                            longitude: markerPosition.longitude,
                            type: saveAsType.name,
                            houseno_floor: floor,
                            building_blockno: building,
                            landmark_areaname: landmark

                        })
                    });
                    result = await result.json();
                    if (result.status == true) {
                        console.warn("Address Edited successfully!!")
                        navigateToMyAddress();
                    } else {
                        console.error('Error ', result);
                    }

                } else {

                    const url = `${API_BASE_URL}user/addAddress`;
                    let result = await fetch(url, {
                        method: "POST",
                        headers: { 'Authorization': `Bearer ${userData.token}`, "Content-Type": "application/json" },
                        body: JSON.stringify({
                            user_id: userData.id,
                            address: address,
                            city: city,
                            state: state,
                            country: country,
                            zip_code: zipCode,
                            latitude: markerPosition.latitude,
                            longitude: markerPosition.longitude,
                            type: saveAsType.name,
                            houseno_floor: floor,
                            building_blockno: building,
                            landmark_areaname: landmark

                        })
                    });
                    result = await result.json();
                    if (result.status == true) {
                        console.warn("Address Added successfully!!")
                        navigateToMyAddress();
                    } else {
                        console.error('Error ', result);
                    }

                }

            } else {
                console.error('Error : NO Internet ');
            }

        } catch (error) {
            console.error('Error during add pet : ', error);
        }

    }

    const navigateToMyAddress = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'MyAddress' }],
            })
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Map placeholder */}
                <View style={styles.mapContainer}>
                    <Text style={styles.mapPlaceholder}>Map Placeholder</Text>
                </View>

                {/* Address Info */}
                <View style={styles.addressInfoContainer}>
                    <Text style={styles.locationName}>{city}</Text>
                    <Text style={styles.addressDetails}>{address}</Text>
                </View>

                {/* Address Form */}
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="House No. & Floor"
                        value={floor}
                        onChangeText={setFloor}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Building & Block No."
                        value={building}
                        onChangeText={setBuilding}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Landmark & Area Name (Optional)"
                        value={landmark}
                        onChangeText={setLandmark}
                    />
                </View>

                {/* Save As Options */}
                <View style={globle_Style.details}>
                    <View style={globle_Style.rdo_btn}>
                        <Text style={globle_Style.pet_detl_lable} >Save As*</Text>
                        <View style={globle_Style.form_group}>
                            {
                                selectTypes.map((item, index) => <TouchableOpacity onPress={() => setType(item.id)} style={[globle_Style.frm_lst, globle_Style.aggresive]} key={index}>
                                    <View style={globle_Style.radio_button}>
                                        <View style={[globle_Style.rdo_con, type == item.id ? globle_Style.rdo_con_active : globle_Style.rdo_con]}>
                                            <Text style={globle_Style.rdo_txt}>{item.name}</Text>
                                            <View style={globle_Style.radio}>
                                                {
                                                    type == item.id ? <View style={[globle_Style.radio_bg, globle_Style.rdo_con_active]} ></View> : null
                                                }

                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>)
                            }
                        </View>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={() => AddAddressApiCall()}>
                    <Text style={styles.saveButtonText}>Save Address</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 16,
    },
    mapContainer: {
        height: 150,
        backgroundColor: '#e1e1e1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    mapPlaceholder: {
        color: '#888',
    },
    addressInfoContainer: {
        backgroundColor: '#f7f7f7',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    locationName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    addressDetails: {
        fontSize: 14,
        color: '#555',
    },
    formContainer: {
        marginBottom: 16,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    saveAsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    saveAsButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 4,
    },
    saveAsText: {
        fontSize: 14,
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: '#ff5a5f',
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 8,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddAddressDetail;
