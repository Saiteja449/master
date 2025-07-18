import {
  StyleSheet,
  View,
  Image,
  NativeModules,
  Alert,
  Linking,
  Platform,
  PermissionsAndroid,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/images/logo.svg';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidOpenSettings from 'react-native-android-open-settings';
import UpdateVer from '../../assets/images/updateVer.svg';
import UpdatePaw from '../../assets/images/updatepaw.svg';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const SplashScreen = ({ navigation }) => {
  const { VersionModule } = NativeModules;
  const [fireStoreVersion, setFireStoreVersion] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      requestNotificationPermission();
      checkLoginStatus();
      // requestLocationPermission();
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation, fireStoreVersion]);

  useEffect(() => {
    requestLocationPermission2();
    getFireStoreVersion();
    getLocation2();
  }, []);

  // const requestLocationPermission2 = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: 'Location Permission',
  //           message:
  //             'This app needs access to your location to provide location-based services.',
  //           buttonPositive: 'OK',
  //         },
  //       );

  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         getLocation2();
  //         console.log('Location permission granted.');
  //       } else {
  //         console.log('Location permission denied.');
  //       }
  //     } catch (err) {
  //       console.warn('Error while requesting location permission:', err);
  //     }
  //   } else {
  //     console.log('No need to request location permission for this device.');
  //   }
  // };

  const requestLocationPermission2 = async () => {
    try {
      let status;
      if (Platform.OS === 'android') {
        status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to provide location-based services.',
            buttonPositive: 'OK',
          },
        );
      } else {
        status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (status !== RESULTS.GRANTED) {
          status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }
      }

      if (status === RESULTS.GRANTED) {
        getLocation2();
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Error while requesting location permission:', err);
      return false;
    }
  };

  const enableLocationServices = () => {
    Alert.alert(
      'Enable Location Services',
      'Location services are turned off. Please enable them in your device settings.',
      [
        {
          text: 'Open Settings',
          onPress: () => {
            if (Platform.OS === 'android') {
              RNAndroidOpenSettings.locationSourceSettings(); // Redirects to main location settings
            } else {
              console.warn('Feature not supported on iOS');
            }
          },
        },
      ],
    );
  };

  const getLocation2 = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        // setLocation({ latitude, longitude });
        // setLat(latitude)
        // setLng(longitude)
        // setIsLoading(false)
        console.warn('LATTTTTTTTTTTTTTTTTT ', latitude);
        console.warn('LONNNNNNNNNNNNNNNNNN ', longitude);
      },
      error => {
        console.error(error);
        if (error.code === 2) {
          enableLocationServices();
        }
      },
      { enableHighAccuracy: true },
    );
  };

  const getFireStoreVersion = async () => {
    try {
      const latestVersion = await firestore().collection('versions').get();
      console.warn('VERSIONNNN ::', latestVersion.docs[0]._data.version_master);
      setForceUpdate(latestVersion.docs[0]._data.force_update);
      setFireStoreVersion(latestVersion.docs[0]._data.version_master);
    } catch (error) {
      console.log(error);
    }
  };

  const requestNotificationPermission = async () => {
    // Check if the platform is Android and the version is 13 or above
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'This app needs access to send you notifications.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permissions granted.');
      } else {
        console.log('Notification permissions denied.');
      }
    } else {
      console.log(
        'No need to request notification permissions for this device.',
      );
    }
  };

  const checkLoginStatus = async () => {
    const userDataJSON = await AsyncStorage.getItem('userData');
    const userData = userDataJSON ? JSON.parse(userDataJSON) : null;

    console.warn('USERDATAAAAA ::: ', userData);

    const localVersionName = DeviceInfo.getVersion();
    console.log(localVersionName, fireStoreVersion);
    if (localVersionName !== fireStoreVersion) {
      if (forceUpdate) {
        setUpdatePopup(true);
      } else {
        if (userData) {
          navigation.replace('DashboardScreen');
        } else {
          navigation.replace('Log In or Sign Up'); //changed name
        }
      }
    } else {
      if (userData) {
        if (
          userData.personal_details &&
          userData.service_details &&
          userData.id_verifications
        ) {
          navigation.replace('DashboardScreen');
        } else {
          if (!userData.personal_details) {
            navigation.replace('Personal Details');
          } else if (!userData.service_details) {
            navigation.replace('Select Services');
          } else if (!userData.id_verifications) {
            navigation.replace('Verify ID');
          }
        }
      } else {
        navigation.replace('Log In or Sign Up');
      }
    }

    // VersionModule.getVersionName()
    //   .then(versionName => {
    //     console.log('Version Name:', versionName, fireStoreVersion);
    //     if (versionName !== fireStoreVersion) {
    //       // Alert.alert(
    //       //   'Update Available',
    //       //   'A new version of the app is available. Please update to continue.',
    //       //   [
    //       //     {
    //       //       text: 'Update Now', onPress: () => {
    //       //         Linking.openURL('https://play.google.com/store/search?q=petsfolio+master&c=apps&hl=en').catch(err =>
    //       //           console.error('Failed to open store URL:', err)
    //       //         );
    //       //       }
    //       //     }
    //       //   ]
    //       // );

    //       setUpdatePopup(true);
    //     } else {
    //       if (userData) {
    //         if (
    //           userData.personal_details &&
    //           userData.service_details &&
    //           userData.id_verifications
    //         ) {
    //           navigation.replace('DashboardScreen');
    //           // navigation.replace('WalkTrackingg', {uniqueKey1: '12345', data : ''});
    //           // navigation.replace('DummyScreen');
    //           // navigation.replace('Verify ID');

    //           // navigation.replace('Personal Details');
    //         } else {
    //           if (!userData.personal_details) {
    //             navigation.replace('Personal Details');
    //           } else if (!userData.service_details) {
    //             navigation.replace('Select Services');
    //           } else if (!userData.id_verifications) {
    //             navigation.replace('Verify ID');
    //           }
    //         }
    //       } else {
    //         navigation.replace('Log In or Sign Up');
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error fetching version name:', error);
    //   });

    // if (userData) {
    //   if (
    //     userData.personal_details &&
    //     userData.service_details &&
    //     userData.id_verifications
    //   ) {
    //     navigation.replace('DashboardScreen');
    //     // navigation.replace('WalkTrackingg', {uniqueKey1: '12345', data : ''});
    //     // navigation.replace('DummyScreen');
    //     // navigation.replace('Verify ID');

    //     // navigation.replace('Personal Details');
    //   } else {
    //     if (!userData.personal_details) {
    //       navigation.replace('Personal Details');
    //     } else if (!userData.service_details) {
    //       navigation.replace('Select Services');
    //     } else if (!userData.id_verifications) {
    //       navigation.replace('Verify ID');
    //     }
    //   }
    // } else {
    //   navigation.replace('Log In or Sign Up');
    // }
  };

  return (
    <View style={styles.container}>
      {/* <Image
                style={{ width: 100, height: 100 }}
                source={require('../../assets/images/close.png')}
            /> */}

      <Logo style={{ width: 100, height: 100 }} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={updatePopup}
        onRequestClose={() => {
          setUpdatePopup(!updatePopup);
        }}
      >
        <View style={globle_Style.popup}>
          <View style={[globle_Style.overlay]}>
            <View style={styles.aut_fail_sec}>
              <View style={styles.aut_fail_con}>
                <View style={styles.close_sign}>
                  <UpdateVer />
                </View>
                <View style={styles.aut_fail_hd}>
                  <View style={styles.update_hd}>
                    <Text style={styles.aut_fail_hd_txt}>
                      New Update Available!
                    </Text>
                    <View>
                      <UpdatePaw />
                    </View>
                  </View>
                  <Text style={styles.aut_fail_txt}>
                    Upgrade now to enjoy exciting new feature and an even better
                    app experience!
                  </Text>
                </View>
              </View>

              <TouchableWithoutFeedback
                onPress={() => {
                  setUpdatePopup(false);
                  Linking.openURL(
                    'https://play.google.com/store/search?q=petsfolio+master&c=apps&hl=en',
                  );
                }}
              >
                <LinearGradient
                  colors={['#FBAB51', '#FE8705']}
                  start={{ x: 0, y: 1 }}
                  style={[globle_Style.globle_btn]}
                >
                  <Text
                    style={[globle_Style.gbl_btn, { paddingHorizontal: 60 }]}
                  >
                    Update App
                  </Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  aut_fail_sec: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 23,
  },
  aut_fail_con: {
    paddingVertical: 20,
  },
  close_sign: {
    marginBottom: 20,
    alignItems: 'center',
  },
  aut_fail_hd_txt: {
    color: '#1D1D1D',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24.4,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 10,
  },
  aut_fail_txt: {
    color: '#3D3D3D',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 15.73,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  update_hd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
