import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  BackHandler,
  Button,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import database, { set } from '@react-native-firebase/database';
import globle_style from '../css/globle_Style';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../constants/constant';
import { UserContext } from '../common/AppContext';
import StopTrack from '../../assets/images/stop_track.svg';
import DropIcon from '../../assets/images/dropIcon.svg';
import Poo from '../../assets/images/poo.svg';
import Rainy from '../../assets/images/rainy.svg';
import Repair from '../../assets/images/repair.svg';
import ClientCall from '../../assets/images/client_call.svg';
import DogSick from '../../assets/images/dog_sick.svg';
import Other from '../../assets/images/other.svg';
import ClosePopup from '../../assets/images/close_popup.svg';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundTimer from 'react-native-background-timer';
import { request, RESULTS } from 'react-native-permissions';

const WalkTracking = ({ route }) => {
  const [origin, setOrigin] = useState(null); // Starting point
  const [region, setRegion] = useState({
    ...origin,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const { uniqueKey1, data, walk_duration } = route.params;

  const navigation = useNavigation();
  let watchId = null;

  const [waypoints, setWaypoints] = useState([]); // For midpoints
  const [destination, setDestination] = useState(null); // Final destination starts as null
  const [uniqueKey, setUniqueKey] = useState(uniqueKey1); // Unique key for Firebase entry
  const [totalDistance, setTotalDistance] = useState(0); // Total distance of the route

  const [isRunning, setIsRunning] = useState(false); // Stopwatch state
  const [elapsedTime, setElapsedTime] = useState(null); // Stopwatch elapsed time in seconds
  const [startTime, setStartTime] = useState(null); // Start time for stopwatch

  const [loader, setLoader] = useState(true);
  const GOOGLE_API_KEY = 'AIzaSyDdXjkRFWa4oV-WVPrlKvPLlbwix_hWwr0';
  const { userData } = useContext(UserContext);
  const [selectRadio, setselectedRadio] = useState(1);
  const [recePopup, setrecePopup] = useState(false);
  const [earlywalkRsn, setEarlywalkRsn] = useState('');

  // useEffect(() => {
  //     // Add back button listener
  //     const backAction = () => {
  //         // Prevent the default back button behavior
  //         console.log("Back button pressed, but prevented");
  //         return true; // Returning `true` prevents the back action
  //     };

  //     // Add event listener for the back button
  //     BackHandler.addEventListener('hardwareBackPress', backAction);

  //     // Cleanup the event listener when the component unmounts
  //     return () => {
  //         BackHandler.removeEventListener('hardwareBackPress', backAction);
  //     };
  // }, []);

  useEffect(() => {
    // setUniqueKey(uniqueKey1);
    fetchFirebaseData();
    // startStopwatch();
    // Start the stopwatch when the unique key is generated
  }, []);

  const fetchFirebaseData = async () => {
    try {
      // Show loader while fetching data

      // Fetch data from Firebase using the uniqueKey
      // const trackRef = database().ref(`/walkingTracks/${uniqueKey1}`);
      // const snapshot = await trackRef.once('value');

      // const data = snapshot.val();
      // console.warn('Data fetched from Firebaseeeeeeeee:', data);

      // if (data) {
      //     console.warn('Data fetched from Firebase:', data);
      //     // If data exists, set default values to variables
      //     setOrigin(data.origin || null);
      //     setRegion({ ...data.origin, latitudeDelta: 0.05, longitudeDelta: 0.05 });
      //     setWaypoints(data.waypoints || []);
      //     setDestination(data.destination || null);
      //     setTotalDistance(data.totalDistance.totalDistance || 0);
      //     setElapsedTime(data.duration.duration || 0);
      //     setTimeout(() => {
      //         setLoader(false);
      //         continueStopwatch();
      //     }, 1000);
      // } else {
      // console.warn('NO Data fetched from Firebase:', data);

      // setLoader(false);
      originInit();
      startStopwatch();
      // }
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  };

  const originInit = async () => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        return result === RESULTS.GRANTED;
      }
      return false;
    };

    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) {
      console.warn('Location permission not granted');
      return;
    }

    // Geolocation.getCurrentPosition(
    //     (position) => {
    //         const { latitude, longitude } = position.coords;

    //         // Add current position as a new waypoint
    //         const origin1 = { latitude, longitude };
    //         console.log('Originnnnn :', origin1);
    //         const ref = database().ref(`/walkingTracks/${uniqueKey1}/origin`);
    //         ref.set(origin1)
    //             .then(() => console.warn(`origin saved to Firebase.`))
    //             .catch((error) => console.error(`Error saving origin to Firebase: `, error));
    //         setOrigin(origin1);
    //         setRegion({ ...origin1, latitudeDelta: 0.05, longitudeDelta: 0.05 });
    //         setLoader(false);
    //     },
    console.warn('Fetching location...');
    watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        // Add current position as a new waypoint
        const origin1 = { latitude, longitude };
        console.log('Originnnnn :', origin1);
        const ref = database().ref(`/walkingTracks/${uniqueKey1}/origin`);
        ref
          .set(origin1)
          .then(() => console.warn(`origin saved to Firebase.`))
          .catch(error =>
            console.error(`Error saving origin to Firebase: `, error),
          );
        setOrigin(origin1);
        setRegion({ ...origin1, latitudeDelta: 0.05, longitudeDelta: 0.05 });
        setLoader(false);
        console.warn('Updated Latitude: ', latitude);
        console.warn('Updated Longitude: ', longitude);
      },
      error => {
        console.error('Error fetching location: ', error);
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

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    };

    const updateCurrentPositionAsWaypoint = async () => {
      const permissionGranted = await requestLocationPermission();
      if (!permissionGranted) {
        console.warn('Location permission not granted');
        return;
      }

      const watchId = Geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;

          // Add current position as a new waypoint
          const newWaypoint = { latitude, longitude };
          console.log('New waypoint:', newWaypoint);

          if (uniqueKey) {
            setWaypoints(prevWaypoints => {
              let updatedWaypoints;

              if (prevWaypoints.length === 25) {
                // Replace the last waypoint if the size is 25
                updatedWaypoints = [...prevWaypoints.slice(0, -1), newWaypoint];
              } else {
                // Add the new waypoint to the list
                updatedWaypoints = [...prevWaypoints, newWaypoint];
              }

              console.log('Updated waypoints:', updatedWaypoints);
              saveWaypointsToFirebase(updatedWaypoints); // Only call when uniqueKey is set
              return updatedWaypoints;
            });
          } else {
            console.warn(
              'Unique key is not yet available, skipping waypoint update.',
            );
          }
        },
        error => {
          console.error('Error fetching location: ', error);
        },
        { enableHighAccuracy: false, distanceFilter: 20 }, // Update every 10 seconds or when the location changes by 10 meters
      );

      return () => Geolocation.clearWatch(watchId); // Cleanup watch on unmount
    };

    updateCurrentPositionAsWaypoint();
  }, [uniqueKey]); // Include uniqueKey as a dependency

  useEffect(() => {
    if (waypoints.length > 0) {
      const lastWaypoint = waypoints[waypoints.length - 1];
      setDestination(lastWaypoint);
      console.log('Updating destination:', lastWaypoint);

      getRouteDistance(origin, waypoints, lastWaypoint).then(distance => {
        console.warn('Total distance:', distance);
        setTotalDistance(distance);

        // Save total distance to Firebase
        if (uniqueKey) {
          saveDataToFirebase({ totalDistance: distance }, 'totalDistance');
        }
      });

      // Save destination to Firebase
      saveDataToFirebase(lastWaypoint, 'destination');
    } else {
      setDestination(origin);

      // Save origin as destination if no waypoints
      saveDataToFirebase(origin, 'destination');
    }
  }, [waypoints]);

  // Save waypoints to Firebase
  const saveWaypointsToFirebase = updatedWaypoints => {
    if (!uniqueKey) {
      console.warn('Unique key is not set yet.');
      return; // Prevent the function from executing further
    }

    const ref = database().ref(`/walkingTracks/${uniqueKey}`);
    ref
      .update({ waypoints: updatedWaypoints })
      .then(() => console.warn('Waypoints updated in Firebase.', uniqueKey))
      .catch(error =>
        console.error('Error saving waypoints to Firebase: ', error),
      );
  };

  // Save general data to Firebase
  const saveDataToFirebase = (data, key) => {
    if (!uniqueKey) {
      console.warn('Unique key is not set yet.');
      return;
    }

    const ref = database().ref(`/walkingTracks/${uniqueKey}/${key}`);
    ref
      .set(data)
      .then(() => console.warn(`${key} saved to Firebase.`))
      .catch(error =>
        console.error(`Error saving ${key} to Firebase: `, error),
      );
  };

  const getRouteDistance = async (origin, waypoints, destination) => {
    try {
      const waypointsParam = waypoints
        .map(point => `${point.latitude},${point.longitude}`)
        .join('|');

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&waypoints=optimize:true|${waypointsParam}&key=${GOOGLE_API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error fetching directions');
      }

      const data = await response.json();

      const route = data.routes[0];
      let totalDistance = 0;

      route.legs.forEach(leg => {
        totalDistance += leg.distance.value; // Distance is in meters
      });

      // Return total distance in kilometers
      return totalDistance / 1000; // Convert meters to kilometers
    } catch (error) {
      console.error('Error fetching directions:', error);
      return 0;
    }
  };

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setElapsedTime(prevTime => {
          const newTime = prevTime + 1; // Increment time every second
          if (uniqueKey) {
            // Save elapsed time (duration) to Firebase continuously while running
            saveDataToFirebase({ duration: newTime }, 'duration');
          }
          return newTime;
        });
      }, 1000);
      return () => clearInterval(timer); // Cleanup the timer when stopped
    }
  }, [isRunning, uniqueKey]);

  // Start the stopwatch
  // const startStopwatch = () => {
  //     setStartTime(Date.now() - elapsedTime * 1000); // Set start time for the stopwatch
  //     setIsRunning(true);
  //     saveDataToFirebase({ duration: elapsedTime }, 'duration'); // Save initial duration
  // };

  const startStopwatch = () => {
    const initialStartTime = Date.now() - elapsedTime * 1000; // Adjust for existing elapsed time
    // setStartTime(initialStartTime);
    setIsRunning(true);

    BackgroundTimer.runBackgroundTimer(() => {
      const newElapsedTime = Math.floor((Date.now() - initialStartTime) / 1000);
      setElapsedTime(newElapsedTime);
      saveDataToFirebase({ duration: newElapsedTime }, 'duration');
    }, 1000); // Update every second
  };

  const continueStopwatch = () => {
    if (isRunning) return; // Prevent multiple timers from starting

    setIsRunning(true);

    BackgroundTimer.runBackgroundTimer(() => {
      setElapsedTime(prevElapsedTime => {
        const newElapsedTime = prevElapsedTime + 1;
        saveDataToFirebase({ duration: newElapsedTime }, 'duration'); // Save to Firebase
        return newElapsedTime;
      });
    }, 1000); // Update every second
  };

  // Stop the stopwatch
  const stopStopwatch = () => {
    console.warn(
      'END WALK CLICKKKKKKKK :: ',
      totalDistance,
      formatTime(elapsedTime),
    );

    Alert.alert(
      'End Walk!!!',
      'Are you sure you want to complete the walk?',
      [
        {
          text: 'Yes',
          onPress: () =>
            handleManageEndWalk(
              data.service_time,
              data.booking_id,
              data.pet_id,
            ),
        },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
      ],
      { cancelable: true }, // You can set it to false to prevent closing the alert by tapping outside
    );
  };

  const handleEndWalkAPi = async (
    selectedTime,
    selectedBookingId,
    selectedPetId,
  ) => {
    try {
      const url = `${API_BASE_URL}provider/manageWalk`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: selectedBookingId,
          provider_id: userData.id,
          pet_id: selectedPetId,
          service_time: selectedTime,
          action: 'end',
          reason: earlywalkRsn,
        }),
      });

      const result = await response.json();

      if (result.status) {
        console.warn('result : ', result);
        navigation.goBack();
      } else {
        console.warn('result : ', result);
      }
    } catch (error) {
      console.warn('Error :', error);
    }
  };

  const handleManageEndWalk = async (
    selectedTime,
    selectedBookingId,
    selectedPetId,
  ) => {
    if (walk_duration === '60 min walk') {
      if (elapsedTime < 3600) {
        console.warn('Earlyyyyyy 60 min');
        setrecePopup(true);
      } else {
        handleEndWalkAPi(selectedTime, selectedBookingId, selectedPetId);
      }
    } else {
      if (elapsedTime < 1800) {
        console.warn('Earlyyyyyy 30 min');
        setrecePopup(true);
      } else {
        handleEndWalkAPi(selectedTime, selectedBookingId, selectedPetId);
      }
    }
  };

  // Format the time in HH:mm:ss format
  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Function to increment poopicking count
  const incrementUrine = async () => {
    if (!uniqueKey) {
      console.warn('Unique key is not available.');
      return;
    }

    try {
      const ref = database().ref(`/walkingTracks/${uniqueKey}/urine`);

      // Fetch current value before incrementing
      ref.once('value', snapshot => {
        const currentPoopicking = snapshot.val() || 0;
        const updatedPoopicking = currentPoopicking + 1;

        // Save updated value to Firebase
        saveDataToFirebase(updatedPoopicking, 'urine');
        console.log('Poopicking incremented successfully');
      });
    } catch (error) {
      console.error('Error incrementing poopicking: ', error);
    }
  };

  // Function to increment poocleaning count
  const incrementPoo = async () => {
    if (!uniqueKey) {
      console.warn('Unique key is not available.');
      return;
    }

    try {
      const ref = database().ref(`/walkingTracks/${uniqueKey}/poo`);

      // Fetch current value before incrementing
      ref.once('value', snapshot => {
        const currentPoocleaning = snapshot.val() || 0;
        const updatedPoocleaning = currentPoocleaning + 1;

        // Save updated value to Firebase
        saveDataToFirebase(updatedPoocleaning, 'poo');
        console.log('Poocleaning incremented successfully');
      });
    } catch (error) {
      console.error('Error incrementing poocleaning: ', error);
    }
  };

  const handleRsnRadio = (id, rsn) => {
    setselectedRadio(id);
    setEarlywalkRsn(rsn);
  };

  return (
    <>
      {loader ? (
        <View style={globle_style.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={[styles.container, styles.postion]}>
          <View style={[styles.trak_icon_sec]}>
            <TouchableOpacity onPress={incrementUrine}>
              <View style={[styles.trak_icons, { marginRight: 12 }]}>
                <DropIcon />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={incrementPoo}>
              <View style={styles.trak_icons}>
                <Poo />
              </View>
            </TouchableOpacity>
          </View>
          <MapView style={styles.map} initialRegion={region}>
            {/* Markers */}
            <Marker coordinate={origin} title="Origin" />
            {destination && (
              <Marker coordinate={destination} title="Destination" />
            )}

            {/* Directions */}
            <MapViewDirections
              origin={origin}
              destination={destination || origin} // Use origin if destination is null
              waypoints={waypoints} // Include waypoints
              apikey={GOOGLE_API_KEY}
              strokeWidth={5}
              strokeColor="#E96169"
              optimizeWaypoints={false}
              mode="WALKING"
              onError={errorMessage => {
                console.error('Error in MapViewDirections: ', errorMessage);
              }}
            />
          </MapView>

          <View>
            <View style={[globle_style.overlay, { paddingHorizontal: 0 }]}>
              <View style={[globle_style.walk_type_popup]}>
                <View style={globle_style.walk_typ_pop_hd}>
                  <Text
                    style={[
                      globle_style.my_prof_txt,
                      globle_style.popup_txt_hd,
                    ]}
                  >
                    Tracking Details
                  </Text>
                </View>

                <View
                  style={[
                    globle_style.walk_typ_pop_hd,
                    {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <Image
                    source={require('../../assets/images/lightbulb.png')}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text style={[styles.statLabel, { fontSize: 12 }]}>
                    End the walk or get client approval to ensure payment
                  </Text>
                </View>

                <View
                  style={[
                    globle_style.walk_typ_pop_hd,
                    {
                      marginBottom: 16,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <Image
                    source={require('../../assets/images/lightbulb.png')}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text style={[styles.statLabel, { fontSize: 12 }]}>
                    Keep the app open during tracking
                  </Text>
                </View>

                <View
                  style={[
                    globle_style.pet_add_forms,
                    globle_style.walk_typ_frm,
                  ]}
                >
                  <View style={globle_style.details}>
                    <View style={globle_style.rdo_btn}>
                      <View
                        style={[
                          globle_style.form_group,
                          { flexDirection: 'column' },
                        ]}
                      >
                        {/* Add your inputs here */}
                      </View>
                    </View>
                  </View>
                </View>
                {/* //ADD HEREE// */}
                <View style={styles.track_sec}>
                  <View style={styles.statsContainer}>
                    <View style={[styles.statItem, { marginBottom: 24 }]}>
                      <Text style={styles.statLabel}>Duration</Text>
                      <Text style={styles.statValue}>
                        {formatTime(elapsedTime)}
                      </Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Distance</Text>
                      <Text style={styles.statValue}>{totalDistance} KM</Text>
                    </View>
                  </View>

                  {isRunning ? (
                    // <Button title="END WALK" onPress={stopStopwatch} />
                    <TouchableOpacity onPress={stopStopwatch}>
                      <View style={styles.stop_track}>
                        <StopTrack />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    // <Button title="Start" onPress={startStopwatch} />
                    <></>
                  )}
                </View>
                {/* <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            backgroundColor: '#FFFFFF',
                            padding: 15,}}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>100</Text>
                                <Text style={styles.statLabel}>Calories</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>5000</Text>
                                <Text style={styles.statLabel}>Steps</Text>
                            </View>
                        </View> */}
              </View>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={recePopup}
            onRequestClose={() => {
              setrecePopup(!recePopup);
            }}
          >
            <View style={globle_style.popup}>
              <View style={[globle_style.overlay]}>
                <View style={globle_style.filter_popup_sec}>
                  <TouchableWithoutFeedback onPress={() => setrecePopup(false)}>
                    <View style={[globle_style.filter_popup_rgt, styles.close]}>
                      <ClosePopup />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.hd_sec}>
                  <Text style={styles.track_hd_txt}>
                    Select Reason of Early Complete
                  </Text>
                </View>

                <View
                  style={[globle_style.form_info, { paddingHorizontal: 10 }]}
                >
                  {/* radio btn : */}
                  <View
                    style={[globle_style.radio_con, globle_style.serv_radio]}
                  >
                    <View style={[globle_style.serv_rad_wrapp, {}]}>
                      <TouchableWithoutFeedback
                        onPress={() => handleRsnRadio(1, 'Rainy')}
                      >
                        <View
                          style={[
                            globle_style.radioWapper,
                            selectRadio === 1
                              ? globle_style.active_wrapper
                              : globle_style.radioWapper,
                            { marginRight: 0 },
                          ]}
                        >
                          <View style={globle_style.serv_chos_con}>
                            <Rainy style={{ marginRight: 11.5 }} />
                            <Text style={globle_style.rdo_txt}>Rainy</Text>
                          </View>

                          <View
                            style={[
                              globle_style.static_radio_circle,
                              globle_style.radio_static,
                              selectRadio === 1
                                ? globle_style.static_radio_circle
                                : globle_style.radio_static,
                            ]}
                          >
                            {selectRadio === 1 ? (
                              <View style={globle_style.radio_bg}></View>
                            ) : null}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={globle_style.serv_rad_wrapp}>
                      <TouchableWithoutFeedback
                        onPress={() => handleRsnRadio(2, 'Road Repair')}
                      >
                        {/* <TouchableWithoutFeedback> */}
                        <View
                          style={[
                            globle_style.radioWapper,
                            selectRadio === 2
                              ? globle_style.active_wrapper
                              : globle_style.radioWapper,
                            { marginRight: 0 },
                          ]}
                        >
                          <View style={globle_style.serv_chos_con}>
                            <Repair style={{ marginRight: 11.5 }} />
                            <Text style={globle_style.rdo_txt}>
                              Road Repair
                            </Text>
                          </View>

                          <View
                            style={[
                              globle_style.static_radio_circle,
                              globle_style.radio_static,
                              selectRadio === 2
                                ? globle_style.static_radio_circle
                                : globle_style.radio_static,
                            ]}
                          >
                            {selectRadio === 2 ? (
                              <View style={globle_style.radio_bg}></View>
                            ) : null}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={globle_style.serv_rad_wrapp}>
                      <TouchableWithoutFeedback
                        onPress={() => handleRsnRadio(3, 'Client Called Back')}
                      >
                        {/* <TouchableWithoutFeedback> */}
                        <View
                          style={[
                            globle_style.radioWapper,
                            selectRadio === 3
                              ? globle_style.active_wrapper
                              : globle_style.radioWapper,
                            { marginRight: 0 },
                          ]}
                        >
                          <View style={globle_style.serv_chos_con}>
                            <ClientCall style={{ marginRight: 11.5 }} />
                            <Text style={globle_style.rdo_txt}>
                              Client Called Back
                            </Text>
                          </View>

                          <View
                            style={[
                              globle_style.static_radio_circle,
                              globle_style.radio_static,
                              selectRadio === 3
                                ? globle_style.static_radio_circle
                                : globle_style.radio_static,
                            ]}
                          >
                            {selectRadio === 3 ? (
                              <View style={globle_style.radio_bg}></View>
                            ) : null}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={globle_style.serv_rad_wrapp}>
                      <TouchableWithoutFeedback
                        onPress={() => handleRsnRadio(4, 'Dog Sick')}
                      >
                        {/* <TouchableWithoutFeedback> */}
                        <View
                          style={[
                            globle_style.radioWapper,
                            selectRadio === 4
                              ? globle_style.active_wrapper
                              : globle_style.radioWapper,
                            { marginRight: 0 },
                          ]}
                        >
                          <View style={globle_style.serv_chos_con}>
                            <DogSick style={{ marginRight: 11.5 }} />
                            <Text style={globle_style.rdo_txt}>Dog Sick</Text>
                          </View>

                          <View
                            style={[
                              globle_style.static_radio_circle,
                              globle_style.radio_static,
                              selectRadio === 4
                                ? globle_style.static_radio_circle
                                : globle_style.radio_static,
                            ]}
                          >
                            {selectRadio === 4 ? (
                              <View style={globle_style.radio_bg}></View>
                            ) : null}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={globle_style.serv_rad_wrapp}>
                      <TouchableWithoutFeedback
                        onPress={() => handleRsnRadio(5, 'Other')}
                      >
                        {/* <TouchableWithoutFeedback> */}
                        <View
                          style={[
                            globle_style.radioWapper,
                            selectRadio === 5
                              ? globle_style.active_wrapper
                              : globle_style.radioWapper,
                            { marginRight: 0 },
                          ]}
                        >
                          <View style={globle_style.serv_chos_con}>
                            <Other style={{ marginRight: 11.5 }} />
                            <Text style={globle_style.rdo_txt}>Other</Text>
                          </View>

                          <View
                            style={[
                              globle_style.static_radio_circle,
                              globle_style.radio_static,
                              selectRadio === 5
                                ? globle_style.static_radio_circle
                                : globle_style.radio_static,
                            ]}
                          >
                            {selectRadio === 5 ? (
                              <View style={globle_style.radio_bg}></View>
                            ) : null}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        handleEndWalkAPi(
                          data.service_time,
                          data.booking_id,
                          data.pet_id,
                        )
                      }
                    >
                      <View style={globle_style.globle_btn}>
                        <LinearGradient
                          colors={['#FBAB51', '#FE8705']}
                          start={{ x: 0, y: 1 }}
                          style={[globle_style.globle_btn]}
                        >
                          <Text style={globle_style.gbl_btn}>End Walk</Text>
                        </LinearGradient>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    marginTop: -100,
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
    fontFamily: 'Inter-SemiBold',
  },
  track_sec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 32,
    paddingRight: 23,
  },
  stop_track: {
    backgroundColor: '#F91941',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  trak_icons: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000', // shadow color
    shadowOffset: { width: 0, height: 2 }, // shadow offset
    shadowOpacity: 0.25, // shadow transparency
    shadowRadius: 3.5, // blur effect
    elevation: 5, // for Android
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'flex-end',
  },
  track_hd_txt: {
    fontSize: 20,
    color: '#1D1D1D',
    fontWeight: '600',
    lineHeight: 16.94,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',

    paddingTop: 5,
  },
  hd_sec: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  close: {
    marginTop: 13,
    marginRight: 13,
  },
});

export default WalkTracking;
