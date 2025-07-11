import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Right from '../../assets/images/right.svg';
import Upload from '../../assets/images/upload.svg';
import { CommonActions, useNavigation } from '@react-navigation/native';
import globle_Style from '../css/globle_Style';
import CheckBox from '@react-native-community/checkbox';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { UserContext } from '../common/AppContext';
import { API_BASE_URL } from '../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceDetail = ({ route }) => {
  const navigation = useNavigation();

  const toggleCheckbox = () => setChecked(!checked);
  const [checked, setChecked] = useState(false);
  const [radiusRadio, setRadiusRadio] = useState(0);
  const [radius, setRadius] = useState('');
  const [aggresiveRadio, setAggresiveRadio] = useState(0);
  const [aggresive, setAggresive] = useState('');
  const [certificateRadio, setCertificateRadio] = useState(0);
  const [certificate, setCertificate] = useState('');
  const [certificateImage, setCertificateImage] = useState({ base64: '' });
  const [accidentalRadio, setAccidentalRadio] = useState(0);
  const [accidental, setAccidental] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyNumber, setEmergencyNumber] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const { userData } = useContext(UserContext);

  const { service_id } = route.params;


  // error message status 
  const [radiusError, setradiusError] = useState(false);
  const [aggresiveError, setaggresiveError] = useState(false);
  const [certificateError, setcertificateError] = useState(false);
  const [accidentalError, setaccidentalError] = useState(false);
  const [emergencyNameError, setemergencyNameError] = useState(false);
  const [emergencyNumberError, setemergencyNumberError] = useState(false);
  const [checkboxError, setcheckboxError] = useState(false)
  const [certificateImageError, setcertificateImageError] = useState(false)


  useEffect(() => {
    console.warn(service_id);
  }, []);

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

  // const showAlert = msg => {
  //   Alert.alert(
  //     'All Fields are mandatory!!ddddd',
  //     msg,
  //     [
  //       {
  //         text: 'Ok',
  //         style: 'cancel',
  //       },
  //     ],
  //     { cancelable: true },
  //   );
  // };

  // const handleValidation = async () => {
  //   if (radius == null || radius == '') {
  //     showAlert('Please select upto kms..');
  //   } else if (aggresive == null || aggresive == '') {
  //     showAlert('Please select handle aggresive or not..');
  //   } else if (certificate == null || certificate == '') {
  //     showAlert('Please select certified or not..');
  //   } else if (
  //     certificate === 'yes' &&
  //     (!certificateImage.base64 || certificateImage.base64 === '')
  //   ) {
  //     showAlert('Please upload certificate..');
  //   } else if (accidental == null || accidental == '') {
  //     showAlert('Please select insured or not..');
  //   } else if (!checked) {
  //     showAlert('Please accept policys and conditions..');
  //   } else {
  //     updateServiceData();
  //   }
  // };
  const handleValidation = async () => {


    if (radius == null || radius == '') {
      setradiusError('Please select any Option');
      return
    } else {
      setradiusError(''); // Clear error if name is valid
    }


    if (aggresive == null || aggresive == '') {
      setaggresiveError('Please select any Option');
      return
    } else {
      setaggresiveError(''); // Clear error if gender is valid
    }

    if (certificate == null || certificate == '') {
      setcertificateError('Please select any Option');
      return
    } else {
      setcertificateError('');
      if (certificate === 'yes') {
        if (certificateImage.base64 == null || certificateImage.base64 == '') {
          setcertificateImageError('Please upload your certificate (mandatory)');
          return
        } else {
          setcertificateImageError(''); // Clear error if serviceAddress is valid
        }
      }
      // Clear error if dob is valid
    }


    if (accidental == null || accidental == '') {
      setaccidentalError('Please select any Option');
      return
    } else {
      setaccidentalError(''); // Clear error if serviceAddress is valid
    }



    if (emergencyName !== '' || emergencyName.trim() !== '') {
      if (!/^[a-zA-Z]+$/.test(emergencyName)) {  // Checks if name contains only letters
        setemergencyNameError('Name can only contain letters');
        return
      } else if (emergencyName.length < 3) {
        setemergencyNameError('Must be at least 3 characters');
        return
      } else {
        setemergencyNameError(''); // Clear error if valid
      }
    } else {
      setemergencyNameError(''); // No error for blank name
    }


    if (emergencyNumber !== '' || emergencyNumber.trim() !== '') {
      if (!/^\d+$/.test(emergencyNumber)) {
        setemergencyNumberError('Enter only numbers from 0 to 9');
        return
      }
      else if (emergencyNumber.length < 10) {
        setemergencyNumberError('Mobile number must be 10 characters');
        return
      } else {
        setemergencyNumberError(''); // Clear error if valid
      }
    } else {
      setemergencyNumberError(''); // No error for blank number
    }


    if (!checked) {
      setcheckboxError('Please accept policys and conditions..');
      return
    } else {
      setcheckboxError('') // Clear the error if number is valid or empty
    }

    // return

    if (radius && aggresive && certificate && accidental) {
      updateServiceData();
    }
  }


  const updateServiceData = async () => {

    if (isDisabled) return; // Prevent the action if disabled
    setIsDisabled(true);

    let userData = '';
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }

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
          is_certified: certificate,
          is_accidentally_insured: accidental,
          emergency_contact_name: emergencyName,
          emergency_contact_phone: emergencyNumber,
          certificate: certificateImage.base64,
        }),
      });

      const result = await response.json();

      if (result.status) {
        setIsDisabled(false);
        console.warn('Saved Successfully!!!!!!!!!');
        // navigation.replace('Verify ID');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Verify ID' }],
          })
        );
        updateServiceDetails();
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
    setState(index);
    setStateValue(value);
  };

  const openLink = (url) => {
    Linking.openURL(url);
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
                    colors={['#03A878', '#03A878']}
                    start={{ x: 0, y: 1 }}
                    style={globle_Style.pers_nav}>
                    {/* <Text style={[globle_Style.pers_navnot_act_itm, globle_Style.pers_navactive_itm]}>1</Text> */}
                    <Right />
                  </LinearGradient>
                </View>
                <View style={{ textAlign: 'center' }}>
                  <Text
                    style={[
                      globle_Style.pers_nav_txt,
                      globle_Style.pers_nav_complete,
                    ]}>
                    Personal
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={globle_Style.per_dtl_itm}>
                <View style={globle_Style.nav_con}>
                  <LinearGradient
                    colors={['#FBAB51', '#FE8705']}
                    start={{ x: 0, y: 1 }}
                    style={globle_Style.pers_nav}>
                    <Text
                      style={[
                        globle_Style.pers_navnot_act_itm,
                        globle_Style.pers_navactive_itm,
                      ]}>
                      2
                    </Text>
                  </LinearGradient>
                </View>
                <View style={{ textAlign: 'center' }}>
                  <Text
                    style={[
                      globle_Style.pers_nav_txt,
                      globle_Style.pers_nav_txt_act,
                    ]}>
                    Service
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
                    style={globle_Style.pers_nav}>
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
                    style={globle_Style.pers_nav}>
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

        <View style={[globle_Style.form_info, { marginBottom: radiusError ? 2 : 10 }]}>
          {/* radio btn : */}
          <Text style={globle_Style.input_lable}>
            How far are you traveling
          </Text>
          <View style={globle_Style.radio_con}>
            <TouchableWithoutFeedback
              onPress={() => handleRadio(1, '7', setRadiusRadio, setRadius)}>
              <View
                style={[
                  globle_Style.radioWapper,
                  globle_Style.serv_del_rdo,
                  radiusRadio === 1
                    ? globle_Style.active_wrapper
                    : globle_Style.radioWapper,
                  globle_Style.serv_del_rdo,
                ]}>
                <View style={globle_Style.stardp_con}>
                  <Text style={globle_Style.rdo_txt}>Upto {'\n'}7 km</Text>
                </View>

                <View
                  style={[
                    globle_Style.static_radio_circle,
                    globle_Style.radio_static,
                    radiusRadio === 1
                      ? globle_Style.static_radio_circle
                      : globle_Style.radio_static,
                  ]}>
                  {radiusRadio === 1 ? (
                    <View style={globle_Style.radio_bg}></View>
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => handleRadio(2, '15', setRadiusRadio, setRadius)}>
              <View
                style={[
                  globle_Style.radioWapper,
                  radiusRadio === 2
                    ? globle_Style.active_wrapper
                    : globle_Style.radioWapper,
                  globle_Style.serv_del_rdo,
                ]}>
                <View style={globle_Style.stardp_con}>
                  <Text style={[globle_Style.rdo_txt]}>Upto {'\n'}15 km</Text>
                </View>

                <View
                  style={[
                    globle_Style.static_radio_circle,
                    globle_Style.radio_static,
                    radiusRadio === 2
                      ? globle_Style.static_radio_circle
                      : globle_Style.radio_static,
                  ]}>
                  {radiusRadio === 2 ? (
                    <View style={globle_Style.radio_bg}></View>
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => handleRadio(3, '30', setRadiusRadio, setRadius)}>
              <View
                style={[
                  globle_Style.radioWapper,
                  globle_Style.serv_del_rdo,
                  radiusRadio === 3
                    ? globle_Style.active_wrapper
                    : globle_Style.radioWapper,
                  globle_Style.serv_del_rdo,
                ]}>
                <View style={globle_Style.stardp_con}>
                  <Text style={[globle_Style.rdo_txt]}>Upto {'\n'}30 km</Text>
                </View>

                <View
                  style={[
                    globle_Style.static_radio_circle,
                    globle_Style.radio_static,
                    radiusRadio === 3
                      ? globle_Style.static_radio_circle
                      : globle_Style.radio_static,
                  ]}>
                  {radiusRadio === 3 ? (
                    <View style={globle_Style.radio_bg}></View>
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {
            radiusError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{radiusError}</Text> : null
          }
        </View>
        <View style={[globle_Style.form_info, { marginBottom: aggresiveError ? 2 : 10 }]}>
          {/* radio btn : */}
          <Text style={globle_Style.input_lable}>
            Can you handle aggressive pets?
          </Text>
          <View style={globle_Style.radio_con}>
            <TouchableWithoutFeedback
              onPress={() =>
                handleRadio(1, 'yes', setAggresiveRadio, setAggresive)
              }>
              <View
                style={[
                  globle_Style.radioWapper,
                  aggresiveRadio === 1
                    ? globle_Style.active_wrapper
                    : globle_Style.radioWapper,
                ]}>
                <View style={globle_Style.stardp_con}>
                  <Text style={globle_Style.rdo_txt}>Yes</Text>
                </View>

                <View
                  style={[
                    globle_Style.static_radio_circle,
                    globle_Style.radio_static,
                    aggresiveRadio === 1
                      ? globle_Style.static_radio_circle
                      : globle_Style.radio_static,
                  ]}>
                  {aggresiveRadio === 1 ? (
                    <View style={globle_Style.radio_bg}></View>
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                handleRadio(2, 'no', setAggresiveRadio, setAggresive)
              }>
              <View
                style={[
                  globle_Style.radioWapper,
                  aggresiveRadio === 2
                    ? globle_Style.active_wrapper
                    : globle_Style.radioWapper,
                ]}>
                <View style={globle_Style.stardp_con}>
                  <Text style={globle_Style.rdo_txt}>No</Text>
                </View>

                <View
                  style={[
                    globle_Style.static_radio_circle,
                    globle_Style.radio_static,
                    aggresiveRadio === 2
                      ? globle_Style.static_radio_circle
                      : globle_Style.radio_static,
                  ]}>
                  {aggresiveRadio === 2 ? (
                    <View style={globle_Style.radio_bg}></View>
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {
            aggresiveError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{aggresiveError}</Text> : null
          }
        </View>
        <View style={[globle_Style.form_info, { marginBottom: certificateError ? 2 : 10 }]}>
          {/* radio btn : */}
          <Text style={globle_Style.input_lable}>
            Are you certified walker?
          </Text>
          <View style={globle_Style.radio_con}>
            <TouchableWithoutFeedback
              onPress={() =>
                handleRadio(1, 'yes', setCertificateRadio, setCertificate)
              }>
              <View
                style={[
                  globle_Style.radioWapper,
                  certificateRadio === 1
                    ? globle_Style.active_wrapper
                    : globle_Style.radioWapper,
                ]}>
                <View style={globle_Style.stardp_con}>
                  <Text style={globle_Style.rdo_txt}>Yes</Text>
                </View>

                <View
                  style={[
                    globle_Style.static_radio_circle,
                    globle_Style.radio_static,
                    certificateRadio === 1
                      ? globle_Style.static_radio_circle
                      : globle_Style.radio_static,
                  ]}>
                  {certificateRadio === 1 ? (
                    <View style={globle_Style.radio_bg}></View>
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                handleRadio(2, 'no', setCertificateRadio, setCertificate)
              }>
              <View
                style={[
                  globle_Style.radioWapper,
                  certificateRadio === 2
                    ? globle_Style.active_wrapper
                    : globle_Style.radioWapper,
                ]}>
                <View style={globle_Style.stardp_con}>
                  <Text style={globle_Style.rdo_txt}>No</Text>
                </View>

                <View
                  style={[
                    globle_Style.static_radio_circle,
                    globle_Style.radio_static,
                    certificateRadio === 2
                      ? globle_Style.static_radio_circle
                      : globle_Style.radio_static,
                  ]}>
                  {certificateRadio === 2 ? (
                    <View style={globle_Style.radio_bg}></View>
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {
            certificateError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{certificateError}</Text> : null
          }
        </View>

        {certificate === 'yes' ? (
          <View style={[globle_Style.form_info, { marginBottom: certificateImageError ? 2 : 10 }]}>
            <TouchableOpacity
              onPress={() => handleImagePicker(setCertificateImage)}>
              <View style={globle_Style.address_info}>
                <TextInput
                  style={[globle_Style.input_txt, globle_Style.other_way]}
                  placeholder="Upload Certificate"
                  editable={false}
                  pointerEvents="none"
                  value={certificateImage.name}
                />
                <Upload style={globle_Style.loc_icon} />
              </View>
            </TouchableOpacity>
            {
              certificateImageError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{certificateImageError}</Text> : null
            }

          </View>
        ) : null}

        <View style={[globle_Style.form_info, { marginBottom: accidentalError ? 2 : 10 }]}>
          {/* radio btn : */}
          <Text style={globle_Style.input_lable}>
            Are you accidental insured?
          </Text>
          <View style={globle_Style.radio_con}>
            <TouchableWithoutFeedback
              onPress={() =>
                handleRadio(1, 'yes', setAccidentalRadio, setAccidental)
              }>
              <View
                style={[
                  globle_Style.radioWapper,
                  accidentalRadio === 1
                    ? globle_Style.active_wrapper
                    : globle_Style.radioWapper,
                ]}>
                <View style={globle_Style.stardp_con}>
                  <Text style={globle_Style.rdo_txt}>Yes</Text>
                </View>

                <View
                  style={[
                    globle_Style.static_radio_circle,
                    globle_Style.radio_static,
                    accidentalRadio === 1
                      ? globle_Style.static_radio_circle
                      : globle_Style.radio_static,
                  ]}>
                  {accidentalRadio === 1 ? (
                    <View style={globle_Style.radio_bg}></View>
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                handleRadio(2, 'no', setAccidentalRadio, setAccidental)
              }>
              <View
                style={[
                  globle_Style.radioWapper,
                  accidentalRadio === 2
                    ? globle_Style.active_wrapper
                    : globle_Style.radioWapper,
                ]}>
                <View style={globle_Style.stardp_con}>
                  <Text style={globle_Style.rdo_txt}>No</Text>
                </View>

                <View
                  style={[
                    globle_Style.static_radio_circle,
                    globle_Style.radio_static,
                    accidentalRadio === 2
                      ? globle_Style.static_radio_circle
                      : globle_Style.radio_static,
                  ]}>
                  {accidentalRadio === 2 ? (
                    <View style={globle_Style.radio_bg}></View>
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {
            accidentalError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{accidentalError}</Text> : null
          }
        </View>
        <View style={[globle_Style.form_info, { marginBottom: emergencyNameError ? 2 : 10 }]}>
          <Text style={globle_Style.input_lable}>Emergency contact</Text>
          <TextInput
            style={globle_Style.input_txt}
            placeholder="Name"
            value={emergencyName}
            onChangeText={setEmergencyName}
          />
        </View>
        {
          emergencyNameError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{emergencyNameError}</Text> : null
        }
        <View style={[globle_Style.form_info, { marginBottom: emergencyNumberError ? 2 : 10 }]}>
          <TextInput
            style={globle_Style.input_txt}
            placeholder="Phone"
            value={emergencyNumber}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={setEmergencyNumber}
            inputMode="numeric"
          />
        </View>
        {
          emergencyNumberError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>{emergencyNumberError}</Text> : null
        }
        <View style={[globle_Style.serv_checkbox, { marginBottom: checkboxError ? 2 : 30 }]}>
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
};

export default ServiceDetail;
