import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import globle_Style from '../css/globle_Style';
import LinearGradient from 'react-native-linear-gradient';
import LiveAddress from '../../assets/images/live-address.svg';
import {
  CommonActions,
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { UserContext } from '../common/AppContext';
import { API_BASE_URL } from '../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';
import { set } from '@react-native-firebase/database';

const PersonalDetails = ({}) => {
  const navigation = useNavigation();

  const [selectRadio, setselectedRadio] = useState(0);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [PermanentAddress, setPermanentAddress] = useState('');
  const [PermanentLatitude, setPermanentLatitude] = useState(0.0);
  const [PermanentLongitude, setPermanentLongitude] = useState(0.0);
  const [serviceAddress, setServiceAddress] = useState('');
  const [serviceLatitude, setServiceLatitude] = useState(0.0);
  const [serviceLongitude, setServiceLongitude] = useState(0.0);
  const [serviceCity, setServiceCity] = useState('');
  const [serviceState, setServiceState] = useState('');
  const [serviceZipCode, setServiceZipCode] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [email, setEmail] = useState('');

  const { userData } = useContext(UserContext);

  // const isFocused = useIsFocused();

  const [type, setType] = useState('');

  const route = useRoute();
  const { markerPosition, address, city, state, country, zipCode, area } =
    route.params || {};

  // error message status
  const [nameError, setnameError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [genderError, setgenderError] = useState(false);
  const [dobError, setdobError] = useState(false);
  const [serviceAddressError, setserviceAddressError] = useState(false);
  let watchId = null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (route.params != null) {
      console.warn('SELECTEDDDDD ADDRESSSSSSS :::: ', route.params);
      console.warn('SELECTEDDDDD ADDRESSSSSSS TYPEEEEE :::: ', type);

      if (type == 'Permanent') {
        console.warn('SELECTEDDDDD ADDRESSSSSSS :::: 11111');
        setPermanentAddress(address);
        setPermanentLatitude(markerPosition.latitude);
        setPermanentLongitude(markerPosition.longitude);
      } else {
        console.warn('SELECTEDDDDD ADDRESSSSSSS :::: 22222');
        setServiceAddress(address);
        setServiceLatitude(markerPosition.latitude);
        setServiceLongitude(markerPosition.longitude);
        setServiceCity(city);
        setServiceState(state);
        setServiceZipCode(zipCode);
        setTimeout(() => {
          setIsLoading(false);
        }, 1200);
      }
    }
  }, [route.params]);

  // useEffect(() => {
  //     getLocation()
  //     // console.warn("USERDATAAAA ::: ", userData)
  // }, [])

  // const getLocation = () => {
  //     Geolocation.getCurrentPosition(
  //         (position) => {
  //             const { latitude, longitude } = position.coords;
  //             // setLocation({ latitude, longitude });
  //             setLat(latitude)
  //             setLng(longitude)
  //             setIsLoading(false)
  //             console.warn("LATTTTTTTTTTTTTTTTTT ", latitude)
  //             console.warn("LONNNNNNNNNNNNNNNNNN ", longitude)
  //         },
  //         (error) => {
  //             askForPermissionUntilGranted()
  //             // getLocation()

  //             console.error("Error getting location: ", error);
  //         },
  //         { enableHighAccuracy: true, timeout: 100000 }
  //     );
  // };

  // const checkAndRequestPermission = async () => {
  //     let permission;
  //     if (Platform.OS === 'android') {
  //         permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  //     } else {
  //         permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  //     }

  //     const result = await check(permission);

  //     if (result === RESULTS.GRANTED) {
  //         return true;
  //     } else if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
  //         const requested = await request(permission);
  //         askForPermissionUntilGranted()
  //         return requested === RESULTS.GRANTED;
  //     }
  //     return false;
  // };

  // const askForPermissionUntilGranted = async () => {
  //     setIsLoading(false)
  //     const granted = await checkAndRequestPermission();
  //     if (!granted) {
  //         Alert.alert(
  //             "Location Permission",
  //             "We need location permission to proceed. Please allow location access.",
  //             [
  //                 { text: "Retry", onPress: askForPermissionUntilGranted }
  //             ]
  //         );
  //     } else {
  //         getLocation();
  //     }
  // };

  const checkAndRequestPermission = async () => {
    let permission;
    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    }

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return true;
    } else if (result === RESULTS.DENIED) {
      const requested = await request(permission);
      return requested === RESULTS.GRANTED;
    } else if (result === RESULTS.BLOCKED) {
      return false; // Permission is blocked; user needs to go to settings
    }
    return false;
  };

  const askForPermissionUntilGranted = async () => {
    const granted = await checkAndRequestPermission();
    setIsLoading(false);

    if (!granted && !isAlertVisible) {
      setIsAlertVisible(true); // Mark alert as visible
      Alert.alert(
        'Location Permission Required',
        'We need location permission to proceed. Please allow location access.',
        [
          {
            text: 'Go to Settings',
            onPress: async () => {
              setIsAlertVisible(false); // Reset alert visibility
              if (Platform.OS === 'ios') {
                openSettings(); // iOS specific method
              } else {
                Linking.openSettings(); // Android and iOS
              }
            },
          },
        ],
        { cancelable: false }, // Prevent dismissal by tapping outside
      );
    } else if (granted) {
      getLocation();
    }
  };

  const getLocation = () => {
    setIsLoading(true);
    // Geolocation.getCurrentPosition(
    //     (position) => {
    //         const { latitude, longitude } = position.coords;
    //         setLat(latitude);
    //         setLng(longitude);
    //         setIsLoading(false);
    //         console.warn("Latitude: ", latitude);
    //         console.warn("Longitude: ", longitude);
    //     },
    //     (error) => {
    //         console.error("Error getting location: ", error);
    //         askForPermissionUntilGranted(); // Retry if permission fails
    //     },
    //     { enableHighAccuracy: true, timeout: 100000 }
    // );

    watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLng(longitude);
        setIsLoading(false);
        console.warn('Updated Latitude: ', latitude);
        console.warn('Updated Longitude: ', longitude);
      },
      error => {
        console.error('Error getting location: ', error);
        askForPermissionUntilGranted();
      },
      { enableHighAccuracy: false },
    );
  };

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  // useFocusEffect(
  //     useCallback(() => {
  //         askForPermissionUntilGranted()

  //         // return () => console.log('Screen unfocused');
  //     }, [])
  // );

  useEffect(() => {
    if (lat === null || lng === null) {
      askForPermissionUntilGranted(); // Trigger when the screen becomes focused
    }
  }, []);

  const updateProfileData = async () => {
    // const selectedGender = gender.find(g => g.id === selectRadio);

    if (isDisabled) return; // Prevent the action if disabled
    setIsDisabled(true);

    let userData = '';
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }

    console.warn('VIJAYYYYY 0000 : ', PermanentAddress);
    console.warn('VIJAYYYYY 1111 : ', PermanentLatitude);
    console.warn('VIJAYYYYY 2222 : ', PermanentLongitude);
    console.warn('VIJAYYYYY 3333 : ', serviceAddress);
    console.warn('VIJAYYYYY 4444 : ', serviceLatitude);
    console.warn('VIJAYYYYY 5555 : ', serviceLongitude);
    console.warn('VIJAYYYYY 6666 : ', serviceCity);
    console.warn('VIJAYYYYY 7777 : ', serviceState);
    console.warn('VIJAYYYYY 8888 : ', serviceZipCode);

    try {
      const url = `${API_BASE_URL}provider/updateProfile`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider_id: userData.id,
          name: name,
          email: email,
          phone: userData.phone,
          gender: gender,
          // permanent_address: PermanentAddress,
          // permanent_latitude: PermanentLatitude,
          // permanent_longitude: PermanentLongitude,
          service_address: serviceAddress,
          service_latitude: serviceLatitude,
          service_longitude: serviceLongitude,
          city: serviceCity,
          state: serviceState,
          zip_code: serviceZipCode,
          dob: dob,
          profile: '',
          area: area,
        }),
      });

      const result = await response.json();

      if (result.status) {
        setIsDisabled(false);
        console.warn('Saved Successfully!!');
        updatePersonalDetails();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Select Services' }],
          }),
        );
        // navigation.navigate('Select Services');
      } else {
        setIsDisabled(false);
        console.error('Update data Failed:', result);
      }
    } catch (error) {
      setIsDisabled(false);
      console.error('Error :', error);
    }
  };

  const updatePersonalDetails = async () => {
    try {
      // Retrieve the stored data
      const storedData = await AsyncStorage.getItem('userData');

      if (storedData !== null) {
        // Parse the JSON data
        const parsedData = JSON.parse(storedData);

        // Update the personal_details field
        parsedData.personal_details = true;

        // Save the updated object back to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(parsedData));
        console.log('Personal details updated successfully');
        // if (userData.personal_details && userData.service_details && userData.id_verifications) {
        //     navigation.replace('DashboardScreen');
        // } else {
        //     if (!userData.service_details) {
        //         navigation.replace('Select Services');
        //     } else if (!userData.id_verifications) {
        //         navigation.replace('Verify ID');
        //     }
        // }
      }
    } catch (error) {
      console.error('Error updating personal details:', error);
    }
  };

  const handleGender = (index, value) => {
    setselectedRadio(index);
    setGender(value);
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

  function serviceNavigation() {
    // Check name
    if (name == null || name.trim() === '') {
      setnameError('Please enter your name');
      return;
    } else if (name.length < 3) {
      setnameError('Name must be at least 3 characters long');
      return;
    } else if (name.length > 30) {
      setnameError('Name cannot exceed 30 characters');
      return;
    } else {
      setnameError(''); // Clear error if name is valid
    }

    if (email == null || email.trim() === '') {
      setemailError('Email is required!');
      return;
      // return;
    } else if (!emailRegex.test(email)) {
      setemailError('Enter a valid email address!');
      return;
    } else {
      setemailError('');
    }

    // Check gender
    if (gender == null || gender == '') {
      setgenderError('Please select your gender..');
    } else {
      setgenderError(''); // Clear error if gender is valid
    }

    // Check date of birth
    if (dob == null || dob == '') {
      setdobError('Please select a valid date of birth');
      return;
    } else {
      setdobError(''); // Clear error if dob is valid
    }

    // Check service address
    if (serviceAddress == null || serviceAddress == '') {
      setserviceAddressError('Please select your service address');
      return;
    } else {
      setserviceAddressError(''); // Clear error if serviceAddress is valid
    }

    // If no errors, update profile data
    if (name && email && gender && dob && serviceAddress) {
      updateProfileData();
    }
  }

  function sameAsAboveEvent() {
    setServiceAddress(PermanentAddress);
    setServiceCity(city);
    setServiceState(state);
    setServiceZipCode(zipCode);
    setServiceLatitude(PermanentLatitude);
    setServiceLongitude(PermanentLongitude);
  }

  function addressNavigation(type) {
    setType(type);
    let latitude = lat;
    let longitude = lng;

    if (
      type === 'Permanent' &&
      (PermanentLatitude !== 0.0 || PermanentLongitude !== 0.0)
    ) {
      latitude = PermanentLatitude;
      longitude = PermanentLongitude;
    } else if (
      type === 'Service' &&
      (serviceLatitude !== 0.0 || serviceLongitude !== 0.0)
    ) {
      latitude = serviceLatitude;
      longitude = serviceLongitude;
    }

    navigation.navigate('AddAddress', {
      lat: latitude,
      lng: longitude,
    });
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    setDob(formattedDate);
    hideDatePicker();
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
                  <LinearGradient
                    colors={['#FBAB51', '#FE8705']}
                    start={{ x: 0, y: 1 }}
                    style={globle_Style.pers_nav}
                  >
                    <Text
                      style={[
                        globle_Style.pers_navnot_act_itm,
                        globle_Style.pers_navactive_itm,
                      ]}
                    >
                      1
                    </Text>
                  </LinearGradient>
                </View>
                <View style={{ textAlign: 'center' }}>
                  <Text
                    style={[
                      globle_Style.pers_nav_txt,
                      globle_Style.pers_nav_txt_act,
                    ]}
                  >
                    Personal
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={globle_Style.per_dtl_itm}>
                <View style={globle_Style.nav_con}>
                  <LinearGradient
                    colors={['#D9D9D9', '#D9D9D9']}
                    start={{ x: 0, y: 1 }}
                    style={globle_Style.pers_nav}
                  >
                    <Text style={globle_Style.pers_navnot_act_itm}>2</Text>
                  </LinearGradient>
                </View>
                <View style={{ textAlign: 'center' }}>
                  <Text style={globle_Style.pers_nav_txt}>Service</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={globle_Style.per_dtl_itm}>
                <View style={globle_Style.nav_con}>
                  <LinearGradient
                    colors={['#D9D9D9', '#D9D9D9']}
                    start={{ x: 0, y: 1 }}
                    style={globle_Style.pers_nav}
                  >
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
                  <LinearGradient
                    colors={['#D9D9D9', '#D9D9D9']}
                    start={{ x: 0, y: 1 }}
                    style={globle_Style.pers_nav}
                  >
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

        {isLoading ? (
          <ActivityIndicator size="large" color="#03A878" style={{ flex: 1 }} />
        ) : (
          <View style={globle_Style.form_sec}>
            <View style={globle_Style.form_con}>
              <View
                style={[
                  globle_Style.form_info,
                  { marginBottom: nameError ? 2 : 10 },
                ]}
              >
                <Text style={globle_Style.input_lable}>Your Name</Text>
                <TextInput
                  style={globle_Style.input_txt}
                  placeholder="Enter Name"
                  value={name}
                  onChangeText={setName}
                />
                {nameError ? (
                  <Text
                    style={[globle_Style.errorText, { paddingHorizontal: 5 }]}
                  >
                    {nameError}
                  </Text>
                ) : null}
              </View>

              <View style={globle_Style.edit_frm_itm}>
                <Text style={globle_Style.input_lable}>Email</Text>
                <View style={globle_Style.edit_frm_input}>
                  <TextInput
                    style={[globle_Style.input_txt, globle_Style.prof_txt]}
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={setEmail}
                  />
                  {/* <Edit /> */}
                </View>
                {emailError ? (
                  <Text
                    style={[
                      globle_Style.errorText,
                      { paddingHorizontal: 5, marginBottom: 0 },
                    ]}
                  >
                    {emailError}
                  </Text>
                ) : null}
              </View>

              <View
                style={[
                  globle_Style.form_info,
                  { marginBottom: genderError ? 2 : 10 },
                ]}
              >
                {/* radio btn : */}
                <Text style={globle_Style.input_lable}>Gender</Text>
                <View style={globle_Style.radio_con}>
                  <TouchableWithoutFeedback
                    onPress={() => handleGender(1, 'Male')}
                  >
                    <View
                      style={[
                        globle_Style.radioWapper,
                        selectRadio === 1
                          ? globle_Style.active_wrapper
                          : globle_Style.radioWapper,
                      ]}
                    >
                      <View style={globle_Style.stardp_con}>
                        <Text style={globle_Style.rdo_txt}>Male</Text>
                      </View>

                      <View
                        style={[
                          globle_Style.static_radio_circle,
                          globle_Style.radio_static,
                          selectRadio === 1
                            ? globle_Style.static_radio_circle
                            : globle_Style.radio_static,
                        ]}
                      >
                        {selectRadio === 1 ? (
                          <View style={globle_Style.radio_bg}></View>
                        ) : null}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => handleGender(2, 'Female')}
                  >
                    <View
                      style={[
                        globle_Style.radioWapper,
                        selectRadio === 2
                          ? globle_Style.active_wrapper
                          : globle_Style.radioWapper,
                      ]}
                    >
                      <View style={globle_Style.stardp_con}>
                        <Text style={globle_Style.rdo_txt}>Female</Text>
                      </View>

                      <View
                        style={[
                          globle_Style.static_radio_circle,
                          globle_Style.radio_static,
                          selectRadio === 2
                            ? globle_Style.static_radio_circle
                            : globle_Style.radio_static,
                        ]}
                      >
                        {selectRadio === 2 ? (
                          <View style={globle_Style.radio_bg}></View>
                        ) : null}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                {genderError ? (
                  <Text
                    style={[globle_Style.errorText, { paddingHorizontal: 5 }]}
                  >
                    {genderError}
                  </Text>
                ) : null}
              </View>

              <TouchableOpacity
                style={[
                  globle_Style.form_info,
                  { marginBottom: dobError ? 2 : 10 },
                ]}
                onPress={showDatePicker}
              >
                <Text style={globle_Style.input_lable}>Your DOB</Text>
                <TextInput
                  style={globle_Style.input_txt}
                  placeholder="DD / MM / YYYY"
                  value={dob}
                  onChangeText={setDob}
                  editable={false}
                  pointerEvents="none"
                />

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  date={dob ? new Date(dob) : new Date()}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  maximumDate={new Date()}
                />
              </TouchableOpacity>
              {dobError ? (
                <Text
                  style={[globle_Style.errorText, { paddingHorizontal: 5 }]}
                >
                  {dobError}
                </Text>
              ) : null}
              {/* <View style={globle_Style.form_info} >
                                <View style={globle_Style.sers_add}>
                                    <Text style={globle_Style.input_lable}>Permanent Address</Text>
                                </View>
                                <TouchableOpacity style={globle_Style.address_info} onPress={() => addressNavigation('Permanent')}>
                                    <TextInput style={[globle_Style.input_txt, globle_Style.other_way]} placeholder='Enter Address' value={PermanentAddress} editable={false} pointerEvents='none' />
                                    <LiveAddress style={globle_Style.loc_icon} />
                                </TouchableOpacity>
                            </View>

                            <View style={globle_Style.ser_add_abo}>
                                <Text style={globle_Style.input_lable}>Service Address</Text>
                                <TouchableOpacity onPress={() => sameAsAboveEvent()}>
                                    <Text style={globle_Style.same_asabv}>Same as above</Text>
                                </TouchableOpacity>

                            </View> */}
              <View
                style={[
                  globle_Style.form_info,
                  { marginBottom: nameError ? 2 : 10 },
                ]}
              >
                <View style={globle_Style.ser_add_abo}>
                  <Text style={globle_Style.input_lable}>Current Address</Text>
                  {/* <TouchableOpacity onPress={() => sameAsAboveEvent()}>
                                        <Text style={globle_Style.same_asabv}>Same as above</Text>
                                    </TouchableOpacity> */}
                </View>

                <TouchableOpacity
                  style={globle_Style.form_info}
                  onPress={() => addressNavigation('Service')}
                >
                  <View style={globle_Style.address_info}>
                    <TextInput
                      style={[globle_Style.input_txt, globle_Style.other_way]}
                      placeholder="Enter Address"
                      value={serviceAddress}
                      editable={false}
                      multiline={true}
                    />
                    <View>
                      <LiveAddress style={globle_Style.loc_icon} />
                    </View>
                  </View>
                </TouchableOpacity>
                {serviceAddressError ? (
                  <Text
                    style={[globle_Style.errorText, { paddingHorizontal: 5 }]}
                  >
                    {serviceAddressError}
                  </Text>
                ) : null}
              </View>
              <TouchableWithoutFeedback
                onPress={!isDisabled ? serviceNavigation : null}
              >
                <LinearGradient
                  colors={['#FBAB51', '#FE8705']}
                  start={{ x: 0, y: 1 }}
                  style={[
                    globle_Style.globle_btn,
                    ,
                    { opacity: isDisabled ? 0.5 : 1 },
                  ]}
                >
                  <Text style={[globle_Style.gbl_btn]}>Continue</Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PersonalDetails;
