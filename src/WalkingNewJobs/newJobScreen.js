import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Alert,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import globle_Style from '../css/globle_Style';
import NewjobOne from '../../assets/images/newjob_one.svg';
import DistaneMap from '../../assets/images/distance_map.svg';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { UserContext } from '../common/AppContext';
import { API_BASE_URL, formatDate } from '../constants/constant';
import ClosePopup from '../../assets/images/close_popup.svg';
import Clockwalk from '../../assets/images/clock_walk.svg';
import DeleteImg from '../../assets/images/del_img.svg';
import PetProfile from '../../assets/images/petProfile.svg';
import Msg from '../../assets/images/msg.svg';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();

const NewJobs = () => {
  const navination = useNavigation();
  const { userData } = useContext(UserContext);
  const [newJobData, setNewJobData] = useState([]);
  const [myQuoteData, setMyQuoteJobData] = useState([]);
  const [activeJobData, setActiveJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editDetail, setEditDetail] = useState(false);
  const [selectRadio, setselectedRadio] = useState(-1);
  const [selectedActiveJobTime, setSelectedActiveJobTime] = useState([]);
  const [todayActiveJob, setTodayActiveJob] = useState([]);
  const [upcomingActiveJob, setUpcomingActiveJob] = useState([]);

  const [selectedActiveTime, setSelectedActiveTime] = useState('');
  const [selectedActiveBookingId, setSelectedActiveBookingId] = useState('');
  const [selectedActivePetId, setSelectedActivePetId] = useState('');
  const [startwalkTimeValidate, setStartwalkTimeValidate] = useState(false);

  // useEffect(() => {
  //   fetchNewJobsApiData()
  //   fetchMyQuoteApiData()
  //   fetchActiveJobsApiData()
  // }, [])

  useFocusEffect(
    useCallback(() => {
      fetchNewJobsApiData();
      fetchMyQuoteApiData();
      fetchActiveJobsApiData();

      return () => console.log('Screen unfocused');
    }, []),
  );

  const fetchNewJobsApiData = async () => {
    const url = `${API_BASE_URL}provider/${userData.id}/newJobs/4`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();

        console.warn('RESULTTTTTTT :: ', result.data[0].pets);
        setNewJobData(result.data);
        setIsLoading(false);
      } else {
        console.warn('No Projects Assigned for you');
      }
    } catch (error) {
      console.warn('Network request failed');
    }
  };

  const fetchMyQuoteApiData = async () => {
    const url = `${API_BASE_URL}provider/${userData.id}/myQuotes/4`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();

        console.warn('RESULTTTTTTT1111 :: ', result.data);
        setMyQuoteJobData(result.data);
        setIsLoading(false);
      } else {
        console.warn('Elseee :: ', response);
      }
    } catch (error) {
      console.warn('Network request failed');
    }
  };

  const fetchActiveJobsApiData = async () => {
    const url = `${API_BASE_URL}provider/${userData.id}/activeJobs/4`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.status) {
        console.warn('RESULTTTTTTT222222 :: ', result.data);
        setTodayActiveJob(result.data.todays_bookings);
        setUpcomingActiveJob(result.data.upcoming_bookings);
        setActiveJobData(result.data);
        setIsLoading(false);
      } else {
        console.warn('Elseee :: ', response);
      }
    } catch (error) {
      console.warn('Network request failed');
    }
  };

  const renderItemNewJobs = ({ item }) => (
    <View style={globle_Style.newjob_sec}>
      <View style={globle_Style.newjob_con}>
        <View style={globle_Style.newjob_lst}>
          <View style={globle_Style.newjob_itm_lft}>
            {item.pets.length > 0 ? (
              <Image
                source={{ uri: item.pets[0].image }}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
            ) : (
              <NewjobOne />
            )}
          </View>
          <View style={globle_Style.newjob_itm_rgt}>
            <View style={globle_Style.newjob_txt_con}>
              <View style={globle_Style.newjob_txt_lft}>
                <Text style={globle_Style.job_exp}>
                  {item.package_name},
                  <Text style={[globle_Style.job_exp, globle_Style.job_day]}>
                    {item.service_frequency}
                  </Text>
                </Text>
                <View style={globle_Style.job_distc}>
                  <View style={globle_Style.newjob_txt_rgt}>
                    <DistaneMap />
                    <Text style={globle_Style.distc_txt}>
                      {item.distance} away
                    </Text>
                  </View>
                </View>
                <View style={globle_Style.newjob_txt_rgt}>
                  <DistaneMap />
                  <Text style={globle_Style.distc_txt}>{item.city}</Text>
                </View>
              </View>
              <View style={globle_Style.newjob_rate_con}>
                <Text
                  style={[
                    globle_Style.newjob_itm_rate,
                    { fontSize: 12, marginRight: 5 },
                  ]}
                >
                  ₹{item.total_price}
                </Text>
                <Text style={globle_Style.newjob_rate_day}>
                  {item.days} days
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={globle_Style.newjob_btn}>
          {/* <TouchableOpacity onPress={() => navination.navigate('ChatPage', { userId: `${userData.name}_${userData.id}`, otherUserId: `${item.user_name}_${item.user_id}`, name: item.user_name, image: item.user_profile })}>
            <View style={{ marginRight: 16 }}>
              <Msg />
            </View>
          </TouchableOpacity> */}
          <TouchableWithoutFeedback
            onPress={() =>
              navination.navigate('Quotes', { item: item, showmyquote: false })
            }
          >
            <Text style={[globle_Style.white_btn]}>
              Total Quotes {item.totalQuotes}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={() =>
              navination.navigate('Details', {
                item: item,
                isEdit: false,
              })
            }
          >
            <View style={[globle_Style.newjob_btn_con]}>
              <LinearGradient
                colors={['#FBAB51', '#FE8705']}
                start={{ x: 0, y: 1 }}
                style={[globle_Style.gbl_btn_two, { paddingHorizontal: 0 }]}
              >
                <Text
                  style={[globle_Style.gbl_btn_two, { marginHorizontal: 12 }]}
                >
                  Offer Now
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItemMyQuotes = ({ item }) => (
    <View
      style={[globle_Style.newjob_con, { marginHorizontal: 16, marginTop: 5 }]}
    >
      <View style={globle_Style.newjob_lst}>
        <View style={globle_Style.newjob_itm_lft}>
          {item.pets.length > 0 ? (
            <Image
              source={{ uri: item.pets[0].image }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
          ) : (
            <PetProfile style={{ width: 60, height: 60, borderRadius: 30 }} />
          )}
        </View>
        <View style={globle_Style.newjob_itm_rgt}>
          <View style={globle_Style.newjob_txt_con}>
            <View style={globle_Style.newjob_txt_lft}>
              <Text style={globle_Style.job_exp}>
                {item.package_name},
                <Text style={[globle_Style.job_exp, globle_Style.job_day]}>
                  {item.service_frequency}
                </Text>
              </Text>
              <View style={globle_Style.job_distc}>
                <View style={globle_Style.newjob_txt_rgt}>
                  <DistaneMap />
                  <Text style={globle_Style.distc_txt}>
                    {item.distance} km away
                  </Text>
                </View>
              </View>
            </View>
            <View style={globle_Style.newjob_rate_con}>
              <Text
                style={[
                  globle_Style.newjob_itm_rate,
                  { fontSize: 12, marginRight: 5 },
                ]}
              >
                ₹{item.receivable_amount}
              </Text>
              <Text style={globle_Style.newjob_rate_day}>{item.days} days</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          globle_Style.newjob_btn,
          { alignItems: 'center', justifyContent: 'flex-start' },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navination.navigate('ChatPage', {
              userId: `${userData.name}_${userData.id}`,
              otherUserId: `${item.user_name}_${item.user_id}`,
              name: item.user_name,
              image: item.user_profile,
              bookingId: item.booking_id,
              token: item.device_token,
            })
          }
        >
          <View style={{ marginRight: 16 }}>
            <Msg />
          </View>
        </TouchableOpacity>
        <TouchableWithoutFeedback
          onPress={() =>
            navination.navigate('Quotes', { item: item, showmyquote: true })
          }
        >
          <View style={{ flexBasis: 124, flexGrow: 0, flexShrink: 1 }}>
            <Text style={[globle_Style.white_btn, { paddingHorizontal: 0 }]}>
              Total Quotes {item.totalQuotes}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={() =>
              navination.navigate('DetailsEdit', {
                item: item,
                isEdit: true,
              })
            }
          >
            <View style={[globle_Style.newquta_btn_con]}>
              <Text
                style={[
                  globle_Style.white_btn,
                  globle_Style.newquta_btn,
                  { paddingHorizontal: 20 },
                ]}
              >
                Edit
              </Text>
            </View>
          </TouchableOpacity>
        </TouchableWithoutFeedback>

        <TouchableOpacity onPress={() => DeleteDialog(item.quotation_id)}>
          <View style={[globle_Style.newquta_btn_con, { marginLeft: 0 }]}>
            <Text style={[globle_Style.white_btn, { marginHorizontal: 10 }]}>
              Delete
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const DeleteDialog = quoteId => {
    Alert.alert('Delete', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          DeleteMyQuotesAPI(quoteId);
        },
      },
    ]);
  };

  const DeleteMyQuotesAPI = async quoteId => {
    let userData = '';
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }
    // ${userData.id}
    const url = `${API_BASE_URL}provider/deleteQuotation`;

    const data = {
      quotation_id: quoteId,
      provider_id: userData.id,
    };

    console.warn('DATAAAA :: ', data);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quotation_id: quoteId,
          provider_id: userData.id,
        }),
      });
      const result = await response.json();

      if (result.status) {
        console.warn(result);
        fetchNewJobsApiData();
        fetchMyQuoteApiData();
        // setProfile({ url: result.data.profile, base64: null });
        // setIsLoading(false)
      } else {
        console.warn('ELSEEE :: ', result);
      }
    } catch (error) {
      console.warn('Network request failed :: ', error);
    }
  };

  const handleStartWalking = (
    selectedTime,
    completedTimings,
    selectedBookingId,
    selectedPetId,
  ) => {
    setselectedRadio(-1);

    console.warn('SSSSSSSSSSSSSS', selectedTime);
    console.warn('SSSSSSSSSSSSSS11', selectedBookingId);
    console.warn('SSSSSSSSSSSSSS22', selectedPetId);

    setSelectedActiveJobTime(
      filterTimes(selectedTime, completedTimings).split(','),
    );
    setSelectedActiveBookingId(selectedBookingId);
    setSelectedActivePetId(selectedPetId);
    setStartwalkTimeValidate(false);
    setEditDetail(true);
  };

  const filterTimes = (preferableTime, completedTime) => {
    const preferableTimesArray = preferableTime
      .split(',')
      .map(time => time.trim());
    const completedTimesArray = completedTime
      .split(',')
      .map(time => time.trim()); // Treat completedTime as potentially multiple times

    const filteredTimes = preferableTimesArray.filter(
      time => !completedTimesArray.includes(time),
    );

    return filteredTimes.join(', ');
  };

  const handleEndWalking = (selectedTime, selectedBookingId, selectedPetId) => {
    console.warn('SSSSSSSSSSSSSS', selectedTime);
    console.warn('SSSSSSSSSSSSSS11', selectedBookingId);
    console.warn('SSSSSSSSSSSSSS22', selectedPetId);

    const data = {
      booking_id: selectedBookingId,
      provider_id: userData.id,
      pet_id: selectedPetId,
      service_time: selectedTime,
      action: 'end',
    };

    // navination.navigate('WalkTracking', { uniqueKey1: appendBookingDetails(selectedBookingId, selectedTime), data: data, walk_duration: todayActiveJob.walk_duration });
    // return
    // setSelectedActiveTime(selectedTime)
    // setSelectedActiveBookingId(selectedBookingId)
    // setSelectedActivePetId(selectedPetId)

    Alert.alert(
      'End Walk!!!',
      'Are you sure you want to complete the walk?',
      [
        {
          text: 'Yes',
          onPress: () =>
            handleManageEndWalk(selectedTime, selectedBookingId, selectedPetId),
        },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
      ],
      { cancelable: true }, // You can set it to false to prevent closing the alert by tapping outside
    );
  };

  const renderItemmm = ({ item }) => (
    <View style={globle_Style.job_lst_con}>
      <View style={globle_Style.newjob_lst}>
        <View style={globle_Style.newjob_itm_lft}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
          ) : (
            <NewjobOne />
          )}
        </View>
        <View style={globle_Style.newjob_itm_rgt}>
          <View style={globle_Style.newjob_txt_con}>
            <View
              style={[globle_Style.newjob_txt_lft, globle_Style.actjob_lft]}
            >
              <Text style={globle_Style.job_exp}>{item.name}</Text>
              <View style={globle_Style.job_distc}>
                <View style={globle_Style.newjob_txt_rgt}>
                  <DistaneMap />
                  <Text style={[globle_Style.distc_txt, { marginLeft: 6 }]}>
                    {item.city}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[globle_Style.newjob_btn, globle_Style.actjob_btn]}>
        <TouchableWithoutFeedback>
          <View style={globle_Style.walk_time}>
            <Text style={globle_Style.walk_time_txt_strt}>
              Walk {item.walkstatus}
            </Text>
            <Text
              style={[
                globle_Style.walk_time_txt_strt,
                globle_Style.walk_time_txt,
              ]}
            >
              {item.service_time}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            if (item.walkstatus === 'completed') return;
            item.walkstatus === 'in_progress'
              ? handleEndWalking(
                  item.service_time,
                  item.booking_id,
                  item.pet_id,
                )
              : handleStartWalking(
                  item.preferable_time,
                  item.completedTime,
                  item.booking_id,
                  item.pet_id,
                );
          }}
        >
          <LinearGradient
            colors={['#FBAB51', '#FE8705']}
            start={{ x: 0, y: 1 }}
            style={[
              globle_Style.actjob_btn_lin,
              item.walkstatus != null && item.walkstatus == 'completed'
                ? { opacity: 0.5 }
                : { opacity: 1 },
            ]}
          >
            <Text
              style={[globle_Style.gbl_btn_two, globle_Style.newactjob_btn]}
            >
              {item.walkstatus == 'in_progress'
                ? 'End Walking'
                : 'Start Walking'}
            </Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );

  const renderItemmmUpcoming = ({ item }) => (
    <View style={globle_Style.job_lst_con}>
      <View style={globle_Style.newjob_lst}>
        <View style={globle_Style.newjob_itm_lft}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
          ) : (
            <NewjobOne />
          )}
        </View>
        <View style={globle_Style.newjob_itm_rgt}>
          <View style={globle_Style.newjob_txt_con}>
            <View
              style={[globle_Style.newjob_txt_lft, globle_Style.actjob_lft]}
            >
              <Text style={globle_Style.job_exp}>{item.name}</Text>
              <View style={globle_Style.job_distc}>
                <View style={globle_Style.newjob_txt_rgt}>
                  <DistaneMap />
                  <Text style={[globle_Style.distc_txt, { marginLeft: 6 }]}>
                    {item.city}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[globle_Style.newjob_btn, globle_Style.actjob_btn]}>
        {/* <TouchableWithoutFeedback>
          <View style={globle_Style.walk_time}>
            <Text style={globle_Style.walk_time_txt_strt}>Walk {item.walkstatus}</Text>
            <Text style={[globle_Style.walk_time_txt_strt, globle_Style.walk_time_txt]}>{item.service_time}</Text>
          </View>
        </TouchableWithoutFeedback> */}

        {/* <TouchableWithoutFeedback onPress={() => { if (item.walkstatus === 'completed') return; item.walkstatus == 'in_progress' ? handleEndWalking(item.service_time, item.booking_id, item.pet_id) : handleStartWalking(item.preferable_time, item.completedTime, item.booking_id, item.pet_id) }} >

          <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.actjob_btn_lin, item.walkstatus != null && item.walkstatus == 'completed' ? { opacity: 0.5 } : { opacity: 1 }]}>
            <Text style={[globle_Style.gbl_btn_two, globle_Style.newactjob_btn]}>{item.walkstatus == 'in_progress' ? 'End Walking' : 'Start Walking'}</Text>
          </LinearGradient>

        </TouchableWithoutFeedback> */}
      </View>
    </View>
  );

  const openMap = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open the map.');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const manageRideApiCall = async (selectedBookingId, latitude, longitude) => {
    try {
      const url = `${API_BASE_URL}provider/manageRide`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: selectedBookingId,
          provider_id: userData.id,
          status: 'start',
          service_id: '4',
        }),
      });

      const result = await response.json();

      if (result.status) {
        console.warn('result : ', result);
        openMap(latitude, longitude);
        // fetchActiveJobsApiData()
      } else {
        console.warn('result : ', result);
      }
    } catch (error) {
      console.warn('Error :', error);
    }
  };

  const ActiveJobMyTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#000000', // Active tab label and indicator color
          tabBarInactiveTintColor: '#929292', // Inactive tab label color

          tabBarIndicatorStyle: {
            backgroundColor: '#FCA33F', // Active tab indicator color
            width: 105,
            position: 'absolute',
            bottom: 0,
            left: '10%', // Position the indicator in the center
          },
        }}
      >
        <Tab.Screen
          name="Today Jobs"
          component={TodayJobs}
          options={{ title: 'Today Jobs' }}
        />
        <Tab.Screen
          name="Upcoming Jobs"
          component={UpcomingJobs}
          options={{ title: 'Upcoming Jobs' }}
        />
      </Tab.Navigator>
    );
  };

  const TodayJobs = () => (
    <View style={globle_Style.container}>
      {todayActiveJob?.length > 0 ? (
        isLoading ? (
          <ActivityIndicator
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            size="large"
            color="#0000ff"
          />
        ) : (
          <View style={globle_Style.newjob_sec}>
            <FlatList
              data={todayActiveJob}
              renderItem={renderItemActiveJobs}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ marginBottom: 10 }}>
            <Image source={require('../../assets/images/dogWalking.png')} />
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '600',
                lineHeight: 24.2,
                fontFamily: 'Inter-SemiBold',
                color: '#1D1D1D',
              }}
            >
              No Active Jobs{' '}
            </Text>
            {/* <Text  style={globle_style.wait_for_qua}>Your Request Submit Successfully</Text> */}
          </View>
        </View>
      )}
    </View>
  );

  const UpcomingJobs = () => (
    <View style={globle_Style.container}>
      {upcomingActiveJob?.length > 0 ? (
        isLoading ? (
          <ActivityIndicator
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            size="large"
            color="#0000ff"
          />
        ) : (
          <View style={globle_Style.newjob_sec}>
            <FlatList
              data={upcomingActiveJob}
              renderItem={renderItemActiveUpcoming}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ marginBottom: 10 }}>
            <Image source={require('../../assets/images/dogWalking.png')} />
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '600',
                lineHeight: 24.2,
                fontFamily: 'Inter-SemiBold',
                color: '#1D1D1D',
              }}
            >
              No Upcoming Jobs{' '}
            </Text>
            {/* <Text  style={globle_style.wait_for_qua}>Your Request Submit Successfully</Text> */}
          </View>
        </View>
      )}
    </View>
  );

  const renderItemActiveJobs = ({ item }) => (
    <View style={[globle_Style.active_servc_sec]}>
      <View style={globle_Style.serv_walk_act}>
        <FlatList data={item.pets} renderItem={renderItemmm} />
      </View>
      <View style={globle_Style.act_serv_exted}>
        <View style={globle_Style.actv_serv_rgt}>
          <TouchableWithoutFeedback
            onPress={() =>
              navination.navigate('ActiveJobDetail', { item: item })
            }
          >
            <View style={globle_Style.call_menu}>
              <Text style={[globle_Style.view_all]}>View Details</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              manageRideApiCall(item.booking_id, item.latitude, item.longitude)
            }
          >
            {/* <TouchableWithoutFeedback onPress={() => manageRideApiCall(item.booking_id)}> */}
            <Text style={[globle_Style.actv_track_btn]}>Start Ride</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );

  const renderItemActiveUpcoming = ({ item }) => (
    <View style={[globle_Style.active_servc_sec]}>
      <View style={globle_Style.serv_walk_act}>
        <FlatList data={item.pets} renderItem={renderItemmmUpcoming} />
      </View>
      <View style={globle_Style.act_serv_exted}>
        <View style={globle_Style.actv_serv_rgt}>
          <TouchableWithoutFeedback
            onPress={() =>
              navination.navigate('ActiveJobDetail', { item: item })
            }
          >
            <View style={globle_Style.call_menu}>
              <Text style={[globle_Style.view_all]}>View Details</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            {/* {/* <TouchableWithoutFeedback onPress={() => manageRideApiCall(item.booking_id)}> */}
            <Text style={[]}>
              Start Date : {formatDate(item.service_start_date)}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );

  const WalkNewJobs = () => {
    return (
      <View style={globle_Style.container}>
        {newJobData?.length > 0 ? (
          isLoading ? (
            <ActivityIndicator
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              size="large"
              color="#0000ff"
            />
          ) : (
            <View style={globle_Style.newjobs_tab}>
              <FlatList
                data={newJobData}
                renderItem={renderItemNewJobs}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ marginBottom: 10 }}>
              <Image source={require('../../assets/images/dogWalking.png')} />
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '600',
                  lineHeight: 24.2,
                  fontFamily: 'Inter-SemiBold',
                  color: '#1D1D1D',
                }}
              >
                No New Jobs
              </Text>
              {/* <Text  style={globle_style.wait_for_qua}>Your Request Submit Successfully</Text> */}
            </View>
          </View>
        )}
      </View>
    );
  };

  const MyQuotesTab = () => {
    return (
      <View style={globle_Style.container}>
        {myQuoteData?.length > 0 ? (
          isLoading ? (
            <ActivityIndicator
              style={{
                // flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              size="large"
              color="#0000ff"
            />
          ) : (
            <View style={[globle_Style.newjob_sec, { paddingHorizontal: 0 }]}>
              <FlatList
                data={myQuoteData}
                renderItem={renderItemMyQuotes}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ marginBottom: 10 }}>
              <Image source={require('../../assets/images/dogWalking.png')} />
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '600',
                  lineHeight: 24.2,
                  fontFamily: 'Inter-SemiBold',
                  color: '#1D1D1D',
                }}
              >
                No Quotes{' '}
              </Text>
              {/* <Text  style={globle_style.wait_for_qua}>Your Request Submit Successfully</Text> */}
            </View>
          </View>
        )}
      </View>
    );
  };

  const ActiveJobsTab = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ActiveJobMyTabs />
      </View>
      // <View style={globle_Style.container}>
      //   {
      //     activeJobData.length > 0 ?

      //       isLoading ? (
      //         <ActivityIndicator style={{
      //           flex: 1,
      //           justifyContent: 'center',
      //           alignItems: 'center',
      //         }} size="large" color="#0000ff" />
      //       ) : (

      //         <View style={globle_Style.newjob_sec}>
      //           <FlatList
      //             data={activeJobData}
      //             renderItem={renderItemActiveJobs}
      //             keyExtractor={(item, index) => index.toString()} />

      //         </View>

      //       )
      //       :
      //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //          <View style={{marginBottom:10}}>
      //            <Image source={require('../../assets/images/dogWalking.png')} />
      //         </View>
      //         <View>
      //           <Text style={{
      //             textAlign: 'center', fontSize: 20,
      //             fontWeight: '600',
      //             lineHeight: 24.2,
      //             fontFamily: 'Inter-SemiBold',
      //             color: '#1D1D1D'
      //           }}>No Active Jobs </Text>
      //           {/* <Text  style={globle_style.wait_for_qua}>Your Request Submit Successfully</Text> */}
      //         </View>
      //       </View>
      //   }

      // </View>
    );
  };

  const MyTabs = () => {
    return (
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarStyle: {
            shadowRadius: 0,
            elevation: 0,
            backgroundColor: '#FBAB51',
            borderRadius: 66,
            paddingVertical: 6,
          },
          tabBarIndicatorStyle: {
            display: 'none', // Hide the indicator
          },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: '600',
            backgroundColor: '#fff',
            lineHeight: 44,
            borderRadius: 47,
            width: 100,
          },
          tabBarItemStyle: {
            padding: 0, // Remove padding for each tab item
          },
          tabBarActiveTintColor: '#1D1D1D',
          tabBarInactiveTintColor: '#fff',
          tabBarActiveBackgroundColor: '#4a90e2',
          tabBarInactiveBackgroundColor: '#FFFFFF33',
        }}
      >
        <Tab.Screen name="New Jobs" component={WalkNewJobs} />
        <Tab.Screen name="My Quotes" component={MyQuotesTab} />
        <Tab.Screen name="Active" component={ActiveJobsTab} />
      </Tab.Navigator>
    );
  };

  const handleTimeSelection = (index, time) => {
    setselectedRadio(index);
    setSelectedActiveTime(time);
  };

  const handleManageEndWalk = async (
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
        }),
      });

      const result = await response.json();

      if (result.status) {
        console.warn('result : ', result);
        fetchActiveJobsApiData();
      } else {
        console.warn('result : ', result);
      }
    } catch (error) {
      console.warn('Error :', error);
    }
  };

  const appendBookingDetails = (booking_id, service_time, petId) => {
    // Get today's date in the desired format
    const todaysDate = moment().format('YYYY-MM-DD');

    // Combine the details
    const appendedString = `${booking_id}_${service_time.trim()}_${todaysDate}_${petId}`;

    return appendedString;
  };

  const manageStartWalkApiCall = async () => {
    const data = {
      booking_id: selectedActiveBookingId,
      provider_id: userData.id,
      pet_id: selectedActivePetId,
      service_time: selectedActiveTime,
      action: 'start',
    };

    console.warn(
      'datadatadata : ',
      appendBookingDetails(
        selectedActiveBookingId,
        selectedActiveTime,
        selectedActivePetId,
      ),
    );
    // setEditDetail(false)
    // navination.navigate('WalkTracking', { uniqueKey1: appendBookingDetails(selectedActiveBookingId, selectedActiveTime), data: data });
    // return;

    try {
      const url = `${API_BASE_URL}provider/manageWalk`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: selectedActiveBookingId,
          provider_id: userData.id,
          pet_id: selectedActivePetId,
          service_time: selectedActiveTime,
          action: 'start',
        }),
      });

      const result = await response.json();

      if (result.status) {
        console.warn('result : ', result);

        navination.navigate('WalkTracking', {
          uniqueKey1: appendBookingDetails(
            selectedActiveBookingId,
            selectedActiveTime,
            selectedActivePetId,
          ),
          data: data,
          walk_duration: todayActiveJob.walk_duration,
        });

        fetchActiveJobsApiData();

        setEditDetail(false);
      } else {
        console.warn('result : ', result);
      }
    } catch (error) {
      console.warn('Error :', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MyTabs />
      </View>

      {/* start popup  */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={editDetail}
        onRequestClose={() => {
          setEditDetail(!editDetail);
        }}
      >
        <View style={globle_Style.popup}>
          <View style={[globle_Style.overlay]}>
            <View style={[globle_Style.detail_pop]}>
              <View style={globle_Style.filter_popup_sec}>
                <TouchableWithoutFeedback onPress={() => setEditDetail(false)}>
                  <View style={globle_Style.filter_popup_rgt}>
                    <ClosePopup />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={globle_Style.form_info}>
                {/* radio btn : */}
                <View style={[globle_Style.radio_con, globle_Style.serv_radio]}>
                  {selectedActiveJobTime.map((time, index) => (
                    <View key={index} style={globle_Style.serv_rad_wrapp}>
                      <TouchableWithoutFeedback
                        onPress={() => handleTimeSelection(index + 1, time)}
                      >
                        <View
                          style={[
                            globle_Style.radioWapper,
                            selectRadio === index + 1
                              ? globle_Style.active_wrapper
                              : globle_Style.radioWapper,
                          ]}
                        >
                          <View style={globle_Style.serv_chos_con}>
                            <Clockwalk style={{ marginRight: 11.5 }} />
                            <Text
                              style={[
                                globle_Style.rdo_txt,
                                globle_Style.clock_txt,
                              ]}
                            >
                              {time}
                            </Text>
                          </View>

                          <View
                            style={[
                              globle_Style.static_radio_circle,
                              globle_Style.radio_static,
                              selectRadio === index + 1
                                ? globle_Style.static_radio_circle
                                : globle_Style.radio_static,
                            ]}
                          >
                            {selectRadio === index + 1 ? (
                              <View style={globle_Style.radio_bg}></View>
                            ) : null}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  ))}
                </View>
              </View>
              {startwalkTimeValidate && (
                <Text style={[globle_Style.errorText]}>
                  Please select your preferable time
                </Text>
              )}

              <TouchableOpacity
                style={globle_Style.popup_btn}
                onPress={() => {
                  if (selectedActiveTime === '') {
                    setStartwalkTimeValidate(true);
                    return;
                  }
                  manageStartWalkApiCall();
                }}
              >
                <LinearGradient
                  colors={['#FBAB51', '#FE8705']}
                  start={{ x: 0, y: 1 }}
                  style={globle_Style.globle_btn}
                >
                  <Text style={globle_Style.gbl_btn}>Proceed</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();

  return (
    <LinearGradient colors={['#FBAB51', '#FE8705']} style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={label}
            onPress={onPress}
            style={[styles.tab, isFocused && styles.activeTab]}
          >
            <Text
              style={[
                styles.label,
                isFocused ? styles.activeLabel : styles.inactiveLabel,
              ]}
            >
              <Text
                style={[
                  styles.label,
                  isFocused ? styles.tabBar : styles.inactivetabBar,
                ]}
              ></Text>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FBAB51', // Background color of the tab bar
    borderRadius: 66,
    marginHorizontal: 12,
    paddingHorizontal: 7,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    // Optional: Add styles for the active tab container
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 44,
    borderRadius: 47,
    width: 100,
    textAlign: 'center',
  },
  activeLabel: {
    backgroundColor: '#fff', // Background color for active tab label
    color: '#1D1D1D', // Text color for active label
    // Adjust padding to match desired spacing
    paddingHorizontal: 15,
  },
  inactiveLabel: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF33',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff', // Background color behind the tab bar
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Safe area background color
    paddingTop: 20,
  },
});

export default NewJobs;
