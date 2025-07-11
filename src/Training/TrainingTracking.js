import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList, TouchableWithoutFeedback, Image, Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import globle_Style from '../css/globle_Style';
import DownArrow from '../../assets/images/down_arrow.svg';
import UpArrow from '../../assets/images/uparrow.svg';
import CompletedTrack from '../../assets/images/trackupdate.svg';
import Petprofile from '../../assets/images/petProfile.svg';
import Call from '../../assets/images/call.svg';
import LinearGradient from 'react-native-linear-gradient';
import { API_BASE_URL } from '../constants/constant';
import { UserContext } from '../common/AppContext';
import { useNavigation } from '@react-navigation/native';

const TrainingTracking = ({ route }) => {
    const [showOptions, setShowOptions] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const { userData } = useContext(UserContext);
    const [sessionsLeft, setSessionsLeft] = useState(0);
    const [delayedSessions, setDelayedSessions] = useState(0);
    const { item } = route.params;
    const [addonsData, setAddonsData] = useState(item.addons);
    const navigation = useNavigation();
    const [isDisabled, setIsDisabled] = useState(false);

    const handlePress = (name) => {
        setShowOptions(prevName => (prevName === name ? null : name));
    };

    useEffect(() => {
        console.warn('itemitemitem', item);
        const { sessionsLeft, delayedSessions } = getSessionStatus(item.service_start_date, item.sessions);
        setSessionsLeft(sessionsLeft);
        setDelayedSessions(delayedSessions);

    }, [item]);

    const [commandData, setCommandData] = useState([
        { id: '1', title: 'Sit', status: null },
        { id: '2', title: 'Stay', status: null },
        { id: '3', title: 'Come', status: null },
    ]);

    const updateStatus = (name, newStatus) => {
        const updatedData = addonsData.map(item =>
            item.name === name ? { ...item, status: newStatus } : item
        );
        setAddonsData(updatedData);
        // setShowOptions(null);
    };

    const getStatusByName = (name) => {
        const item = addonsData.find(s => s.name === name);
        return item?.status || null;
    };


    // const renderItem = ({ item }) => (
    //     <View style={[globle_Style.tack_commandcon, { marginBottom: 10 }]}>
    //         <TouchableOpacity onPress={() => handlePress(item.name)}>
    //             <View style={[globle_Style.commnd_pro, {
    //                 borderBottomWidth: 0,
    //                 marginBottom: 0,
    //                 paddingBottom: 0,
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-between',
    //                 alignItems: 'center'
    //             }]}>
    //                 <Text>{item.name}</Text>
    //                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                     {/** if completed, show only the tick **/}
    // {item.status === 'completed' ? (
    //     <CompletedTrack style={{ width: 18, height: 18, marginLeft: 8 }} />
    // ) : (
    //     showOptions === item.name
    //         ? <UpArrow />
    //         : <DownArrow />
    // )}
    //                 </View>
    //             </View>
    //         </TouchableOpacity>

    //         {showOptions === item.name && (
    //             <View style={[globle_Style.app_rejt, {
    //                 borderTopWidth: 1,
    //                 marginTop: 10,
    //                 paddingTop: 12,
    //                 borderColor: "#0000000F"
    //             }]}>

    //                 {/* Practice Option */}
    //                 <TouchableOpacity
    //                     onPress={() => {
    //                         setSelectedStatus(prev => ({ ...prev, [item.name]: 'in_progress' }));
    //                         updateStatus(item.name, 'in_progress');
    //                     }}
    //                     style={[globle_Style.app_rejtlft, {
    //                         marginRight: 19,
    //                         flexDirection: 'row-reverse',
    //                         alignItems: 'center'
    //                     }]}
    //                 >
    //                     <View style={{
    //                         height: 20,
    //                         width: 20,
    //                         borderRadius: 10,
    //                         borderWidth: selectedStatus[item.name] === 'in_progress' ? 5 : 2,
    //                         borderColor: selectedStatus[item.name] === 'in_progress' ? '#03A878' : '#0000001A',
    //                         alignItems: 'center',
    //                         justifyContent: 'center',
    //                         marginRight: 8
    //                     }}>
    //                         {selectedStatus[item.name] === 'in_progress' && (
    //                             <View style={{
    //                                 height: 10,
    //                                 width: 10,
    //                                 borderRadius: 5,
    //                                 backgroundColor: '#fff',
    //                             }} />
    //                         )}
    //                     </View>
    //                     <Text>Practice</Text>
    //                 </TouchableOpacity>

    //                 {/* Complete Option */}
    //                 <TouchableOpacity
    //                     onPress={() => {
    //                         setSelectedStatus(prev => ({ ...prev, [item.name]: 'completed' }));
    //                         updateStatus(item.name, 'completed');
    //                     }}
    //                     style={[globle_Style.app_rejtlft, {
    //                         flexDirection: 'row-reverse',
    //                         alignItems: 'center'
    //                     }]}
    //                 >
    //                     <View style={{
    //                         height: 20,
    //                         width: 20,
    //                         borderRadius: 10,
    //                         borderWidth: selectedStatus[item.name] === 'completed' ? 5 : 2,
    //                         borderColor: selectedStatus[item.name] === 'completed' ? '#03A878' : '#0000001A',
    //                         alignItems: 'center',
    //                         justifyContent: 'center',
    //                         marginRight: 8
    //                     }}>
    //                         {selectedStatus[item.name] === 'completed' && (
    //                             <View style={{
    //                                 height: 10,
    //                                 width: 10,
    //                                 borderRadius: 5,
    //                                 backgroundColor: '#fff',
    //                             }} />
    //                         )}
    //                     </View>
    //                     <Text>Complete</Text>
    //                 </TouchableOpacity>

    //             </View>
    //         )}
    //     </View>
    // );

    const renderItem = ({ item }) => (
        <View style={[globle_Style.tack_commandcon, { marginBottom: 10 }]}>
            <TouchableOpacity onPress={() => {
                getStatusByName(item.name) === 'approved' ? null : handlePress(item.name);
                //  if (getStatusByName(item.name) === 'completed') return;
                // handlePress(item.name)
            }}>
                <View style={[globle_Style.commnd_pro, {
                    borderBottomWidth: 0,
                    marginBottom: 0,
                    paddingBottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }]}>
                    <Text>{item.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* if completed, show only the tick */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            {/* {command.status === 'not_started' && */}
                            {getStatusByName(item.name) !== 'approved' &&
                                <Text
                                    style={[
                                        globle_Style.in_progress,
                                        getStatusByName(item.name) === 'completed'
                                            ? { color: '#238B3A', backgroundColor: '#D3E8D8' }
                                            : {}
                                    ]}
                                >
                                    {getStatusByName(item.name)}
                                </Text>}
                            {getStatusByName(item.name) === 'approved' ? (
                                <CompletedTrack style={{ width: 18, height: 18, marginLeft: 8 }} />
                            ) : (
                                showOptions === item.name
                                    ? <UpArrow />
                                    : <DownArrow />
                            )}
                        </View>

                    </View>
                </View>
            </TouchableOpacity>

            {showOptions === item.name && (
                <View style={[globle_Style.app_rejt, {
                    borderTopWidth: 1,
                    marginTop: 10,
                    paddingTop: 12,
                    borderColor: "#0000000F"
                }]}>

                    {/* Practice Option */}
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedStatus(prev => {
                                const filtered = prev.filter(s => s.name !== item.name);
                                return [...filtered, { name: item.name, status: 'in_progress' }];
                            });
                            updateStatus(item.name, 'in_progress');
                        }}
                        style={[globle_Style.app_rejtlft, {
                            marginRight: 19,
                            flexDirection: 'row-reverse',
                            alignItems: 'center'
                        }]}
                    >
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            borderWidth: getStatusByName(item.name) === 'in_progress' ? 5 : 2,
                            borderColor: getStatusByName(item.name) === 'in_progress' ? '#03A878' : '#0000001A',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 8
                        }}>
                            {getStatusByName(item.name) === 'in_progress' && (
                                <View style={{
                                    height: 10,
                                    width: 10,
                                    borderRadius: 5,
                                    backgroundColor: '#fff',
                                }} />
                            )}
                        </View>
                        <Text>Practice</Text>
                    </TouchableOpacity>

                    {/* Complete Option */}
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedStatus(prev => {
                                const filtered = prev.filter(s => s.name !== item.name);
                                return [...filtered, { name: item.name, status: 'completed' }];
                            });
                            updateStatus(item.name, 'completed');
                        }}
                        style={[globle_Style.app_rejtlft, {
                            flexDirection: 'row-reverse',
                            alignItems: 'center'
                        }]}
                    >
                        <View style={{
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            borderWidth: getStatusByName(item.name) === 'completed' ? 5 : 2,
                            borderColor: getStatusByName(item.name) === 'completed' ? '#03A878' : '#0000001A',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 8
                        }}>
                            {getStatusByName(item.name) === 'completed' && (
                                <View style={{
                                    height: 10,
                                    width: 10,
                                    borderRadius: 5,
                                    backgroundColor: '#fff',
                                }} />
                            )}
                        </View>
                        <Text>Complete</Text>
                    </TouchableOpacity>

                </View>
            )}
        </View>
    );

    const getFormattedDate = () => {
        const date = new Date();

        const day = date.getDate();
        const getOrdinal = (n) => {
            if (n > 3 && n < 21) return 'th';
            switch (n % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];

        const ordinal = getOrdinal(day);
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${day}${ordinal} ${month} ${year}`;
    };

    const getSessionStatus = (startDateString, totalSessions) => {
        const startDate = new Date(startDateString);
        const today = new Date();

        // Calculate difference in days (including start day)
        const timeDiff = today.getTime() - startDate.getTime();
        const daysPassed = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;

        const sessionsCompleted = Math.min(daysPassed, totalSessions);
        const sessionsLeft = totalSessions - sessionsCompleted;

        let delayedSessions = 0;
        if (daysPassed > totalSessions) {
            delayedSessions = daysPassed - totalSessions;
        }

        return {
            sessionsCompleted,
            sessionsLeft: sessionsLeft > 0 ? sessionsLeft : 0,
            delayedSessions
        };
    };

    const openDialer = async (number) => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CALL_PHONE,
                    {
                        title: 'Phone Call Permission',
                        message: 'This app needs access to make phone calls.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Linking.openURL(`tel:${number}`);
                } else {
                    Alert.alert('Permission Denied', 'You cannot make phone calls without permission.');
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            // iOS doesn't require this permission
            Linking.openURL(`telprompt:${number}`);
        }
    };

    const managePracticeComplete = async () => {

        if (selectedStatus.length === 0) {
            Alert.alert("Please select at least one command");
            return;
        }

        if (isDisabled) return;
        setIsDisabled(true)

        const data = {
            booking_id: item.booking_id,
            provider_id: userData.id,
            pet_id: item.pet_id,
            addons: selectedStatus
        }

        console.warn("PAYLOAADDDDDDD DATA : ", data)

        const url = `${API_BASE_URL}manageTraining`;

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
                    addons: selectedStatus
                })
            });

            const result = await response.json();
            if (result.status) {
                setIsDisabled(false)
                console.warn("STATTUSS :: ", result)
                navigation.goBack()
            } else {
                setIsDisabled(false)
                console.error("Error: ", result);
            }
        } catch (error) {
            setIsDisabled(false)
            console.error('Network request failed:', error);
        }


    }



    return (
        <View style={globle_Style.container}>
            <View style={[globle_Style.train_trcksec, { flex: 1 }]}>
                <View style={globle_Style.track_updatecon}>
                    <View style={globle_Style.track_updateitem}>
                        <View style={globle_Style.track_updatelft}>
                            {item.image ? <Image source={{ uri: item.image }} style={{ width: 60, height: 60, borderRadius: 30 }} /> : <Petprofile />}

                            <Text style={globle_Style.track_updatelfttxt}>{item.name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => openDialer(item.phone)}>
                            <View style={globle_Style.track_updatergt}>
                                <Call />
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={globle_Style.session_itm}>
                        <View style={[globle_Style.session_itmlft, { backgroundColor: delayedSessions > 0 ? '#FF3B3026' : '#00BC7126', borderColor: delayedSessions > 0 ? '#FF3B30' : '#00BC71' }]}>
                            <Text style={[globle_Style.sessionlft_txt, {color: delayedSessions > 0 ? '#FF3B30' : '#00BC71'}]}>{delayedSessions > 0
                                ? `${delayedSessions} session${delayedSessions > 1 ? 's' : ''} delayed`
                                : `${sessionsLeft} session${sessionsLeft > 1 ? 's' : ''} left`}</Text>
                        </View>
                        <View style={globle_Style.session_itmrgt}>
                            <Text style={globle_Style.sessionrgt_txt}>{getFormattedDate()}</Text>
                        </View>
                    </View>
                </View>
                <View style={globle_Style.train_trckcon}>
                    <Text style={globle_Style.train_trckhd}>Training Tracking</Text>
                    <View style={globle_Style.tack_command}>
                        <FlatList
                            data={item.addons}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={() => managePracticeComplete()}>
                <View style={globle_Style.globle_btn}>
                    <LinearGradient
                        colors={['#FBAB51', '#FE8705']}
                        start={{ x: 0, y: 1 }}
                        style={[globle_Style.globle_btn, { opacity: isDisabled ? 0.5 : 1 }]}
                    >
                        <Text style={globle_Style.gbl_btn}>Submit</Text>
                    </LinearGradient>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default TrainingTracking;
