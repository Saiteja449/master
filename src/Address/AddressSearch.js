import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import globle_Style from '../css/globle_Style';
import Geolocation from '@react-native-community/geolocation';


const AddressSearch = ({ route }) => {

    const [query, setQuery] = useState('');
    const [places, setPlaces] = useState([]);
    const apiKey = 'AIzaSyDdXjkRFWa4oV-WVPrlKvPLlbwix_hWwr0';
    const navigation = useNavigation();

    const { lat, lng } = route.params;

    const [latitude, setLat] = useState(lat)
    const [longitude, setLng] = useState(lng)
    const [currentLat, setCurrentLat] = useState(null)
    const [currentLng, setCurrentLng] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    let watchId = null;

    const goToAddAddressScreen = (lat1, lng1) => {
        navigation.navigate('AddAddress', {
            lat: lat1,
            lng: lng1
        });

    };

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = () => {
        // setIsLoading(true);
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // setLocation({ latitude, longitude });
                setCurrentLat(latitude)
                setCurrentLng(longitude)
                setIsLoading(false)
                console.warn("LATTTTTTTTTTTTTTTTTT ", latitude)
                console.warn("LONNNNNNNNNNNNNNNNNN ", longitude)
            },
        // watchId = Geolocation.watchPosition(
        //     (position) => {
        //         const { latitude, longitude } = position.coords;
        //         setCurrentLat(latitude);
        //         setCurrentLng(longitude);
        //         setIsLoading(false);
        //         console.warn("Updated Latitude: ", latitude);
        //         console.warn("Updated Longitude: ", longitude);
        //     },
            (error) => {
                getLocation()
                console.error("Error getting location: ", error);
            },
            { enableHighAccuracy: false }
        );
    };

    useEffect(() => {
        return () => {
            if (watchId !== null) {
                Geolocation.clearWatch(watchId);
            }
        };
    }, [watchId]);


    const getAddress = async (item) => {

        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${item.place_id}&key=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const json = await response.json();

            if (json.status === "OK") {
                const locationData = json.results[0].geometry.location;

                setLat(locationData.lat)
                setLng(locationData.lng)

                // goToAddAddressScreen();

                // console.warn("Formatted Address ::: ", locationData.formatted_address)


                // if (locationData && locationData.address_components) {
                //     let stateLocal = '';
                //     let cityLocal = '';
                //     let zipCode = '';

                //     for (let i = 0; i < locationData.address_components.length; i++) {
                //         if (locationData.address_components[i].types[0] === "administrative_area_level_1") {
                //             stateLocal = locationData.address_components[i].long_name;
                //             break;
                //         }
                //     }

                //     for (let i = 0; i < locationData.address_components.length; i++) {
                //         if (locationData.address_components[i].types[0] === "locality") {
                //             cityLocal = locationData.address_components[i].long_name;
                //             break;
                //         }
                //     }

                //     for (let i = 0; i < locationData.address_components.length; i++) {
                //         if (locationData.address_components[i].types[0] === "postal_code") {
                //             zipCode = locationData.address_components[i].long_name;
                //             break;
                //         }
                //     }

                //     console.warn("State:", stateLocal);
                //     console.warn("City:", cityLocal);
                //     console.warn("Zip Code:", zipCode);
                // } else {
                //     console.warn("Error: address_components is undefined or locationData is not properly formatted.");
                // }

                console.warn("Lat Address ::: ", locationData.lat)
                console.warn("Lng Address ::: ", locationData.lng)

                goToAddAddressScreen(locationData.lat, locationData.lng);


            } else {
                console.error("Geocode was not successful for the following reason: " + json.status);
            }
        } catch (error) {
            console.error('Error fetching geocode data: ', error);
        }

    }

    const location = (item) => {
        return (
            <TouchableOpacity style={globle_Style.srch_add_info} onPress={() => getAddress(item)}>
                <View style={globle_Style.srch_con}>
                    {/* <Image source={require('../../../assets/images/map_pink.png')}></Image> */}
                    <Text style={globle_Style.srch_con_txt}>{item.structured_formatting.main_text}</Text>
                </View>
                <View style={globle_Style.srch_add_con}>
                    <Text style={globle_Style.srch_add_txt}>{item.structured_formatting.secondary_text}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const handleSearch = async (text) => {
        setQuery(text);

        if (text.length > 2) {

            const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${apiKey}&types=establishment`;

            try {
                const response = await fetch(apiUrl);
                const json = await response.json();
                console.warn("DATA :: ", json)
                setPlaces(json.predictions);
            } catch (error) {
                console.error('Error fetching places: ', error);
            }
        } else {
            setPlaces([]);
        }
    };


    return (
        <>
            {isLoading ?
                <ActivityIndicator size="large" color="#03A878" style={{ flex: 1 }} />
                :
                <ScrollView>
                    <View style={globle_Style.srch_loct}>

                        <View style={globle_Style.srch_loct_sec}>
                            <View style={globle_Style.loct_srch_img}>
                                {/* <Image source={require('../../../assets/images/search_loc.png')}></Image> */}
                            </View>
                            <TextInput placeholder="Search here " style={globle_Style.srch_txt} value={query}
                                onChangeText={handleSearch} />
                        </View>
                        <TouchableOpacity style={globle_Style.navig} onPress={() => goToAddAddressScreen(currentLat, currentLng)}>
                            {/* <Image source={require('../../../assets/images/navigation.png')}></Image> */}
                            <Text style={globle_Style.navig_txt}>Use my current location</Text>
                        </TouchableOpacity>
                        <View style={globle_Style.srch_detl}>

                            <Text style={globle_Style.srch_detl_txt}>Search Result</Text>
                            <FlatList
                                data={places}
                                renderItem={({ item, index }) => location(item)}
                                keyExtractor={(item) => item.place_id}
                            />


                        </View>

                    </View>
                </ScrollView>
            }
        </>

    );
}



export default AddressSearch;
