import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';


const GOOGLE_MAPS_API_KEY = 'AIzaSyDdXjkRFWa4oV-WVPrlKvPLlbwix_hWwr0';

const AddAddress = ({ route }) => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const { lat, lng } = route.params;
    const [markerchanged, setmarkerchanged] = useState(false)
    const [area, setArea] = useState('')
    // const [lat, setLat] = useState(17.4399)
    // const [lng, setLng] = useState(78.4983)


    const navigation = useNavigation();

    const [markerPosition, setMarkerPosition] = useState({
        latitude: lat,
        longitude: lng,
    });

    const [region, setRegion] = useState({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const goToAddRessSearchScreen = () => {
        navigation.navigate('AddressSearch', {
            lat,
            lng
        });
    }

    useEffect(() => {
        console.warn("SELECTEDDDDDDDDDD :::: ", lat)
        console.warn("SELECTEDDDDDDDDDD111111 :::: ", lng)
    }, [])

    const goToPreviousScreen = () => {
        navigation.navigate('Personal Details', {
            markerPosition,
            address,
            city,
            state,
            country,
            zipCode,
            area
        });
    };



    const fetchAddress = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();

            if (data.results.length > 0) {
                console.warn("SELCTEDDD VIJJJJJJJJ :::::: ", data.results)
                const addressComponents = data.results[0].address_components;
                let city = '', state = '', country = '', postalCode = '';

                // Extract the relevant address components
                addressComponents.forEach(component => {
                    if (component.types.includes('locality')) {
                        city = component.long_name;
                    }
                    if (component.types.includes('administrative_area_level_1')) {
                        state = component.short_name;
                    }
                    if (component.types.includes('country')) {
                        country = component.long_name;
                    }
                    if (component.types.includes('postal_code')) {
                        postalCode = component.long_name;
                    }
                });

                // console.warn("Latitude ::", latitude);
                // console.warn("Longitude ::", longitude);
                // console.warn("City ::", city);
                // console.warn("State ::", state);
                // console.warn("Country ::", country);
                // console.warn("Postal Code ::", postalCode);

                console.warn(data.results[0].address_components)

                // Find the sublocality_level_2
                const sublocalityLevel2 = addressComponents.find(component =>
                    component.types.includes("sublocality_level_1")
                );

                // Extract the long_name or short_name
                const sublocalityName = sublocalityLevel2 ? sublocalityLevel2.long_name : city;
                setArea(sublocalityName)

                console.warn("AREAAAAA :: ", sublocalityName)

                setAddress(
                    data.results[0].formatted_address
                );
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                setMarkerPosition({ latitude, longitude })
                setCity(city)
                setState(state)
                setCountry(country)
                setZipCode(postalCode)

            } else {
                console.error('No address found : ', data);
                setAddress('No address found : ', data);
            }
        } catch (error) {
            console.error('Error in fetching address:', error);
            setAddress('Error fetching address'
            );
        }
    };


    // useEffect(() => {
    //     console.warn("SAHILLLLLLLLLLLL :: ")
    //     fetchAddress(lat, lng);
    // }, [lat, lng]);

    // Optionally trigger on screen focus
    useFocusEffect(
        React.useCallback(() => {
            console.warn("Screen focused - Fetching address for:", lat, lng);
            fetchAddress(lat, lng);
        }, [lat, lng])
    );

    useEffect(() => {
        if (markerchanged) {
            fetchAddress(markerPosition.latitude, markerPosition.longitude)
            setmarkerchanged(false)
        }
    }, [markerchanged])

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onPress={(e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate;
                    setMarkerPosition({ latitude, longitude });
                    setmarkerchanged(true)
                    // setRegion({
                    //     latitude,
                    //     longitude,
                    //     latitudeDelta: 0.01,
                    //     longitudeDelta: 0.01,
                    // });
                }}
            >
                <Marker coordinate={markerPosition} />
            </MapView>
            <View style={styles.addressContainer}>
                <View style={styles.address_info}>
                    <View style={styles.address_info_txt}>
                        {/* <Image source={require('../../../assets/images/check_box_add.png')} /> */}
                        <Text style={styles.addressText} >
                            {address ? address : 'Fetching address...'}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.changeButton} onPress={() => goToAddRessSearchScreen()}>
                            <Text style={styles.changeButtonText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => goToPreviousScreen()}>
                    <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={globle_Style.globle_btn}>
                        <Text style={[globle_Style.gbl_btn]}>Confirm & Continue</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    addressContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        elevation: 10,
    },
    addressText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    changeButton: {
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    changeButtonText: {
        color: '#FBAB51',
        fontSize: 16,
        borderWidth: 1,
        lineHeight: 40,
        paddingHorizontal: 22,
        borderRadius: 54,
        borderColor: '#0000001A'

    },
    // confirmButton: {
    //     backgroundColor: '#FBAB51',
    //     paddingVertical: 12,
    //     borderRadius: 8,
    //     alignItems: 'center',
    // },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    address_info: {
        flexDirection: 'row',
        marginBottom: 20
    },
    address_info_txt: {
        flexDirection: 'row',
        width: 230,
    },
});

export default AddAddress;
