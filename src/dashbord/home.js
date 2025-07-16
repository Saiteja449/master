import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  BackHandler,
  Linking,
} from 'react-native';

import globle_Style from '../css/globle_Style';

import Wallet from '../../assets/images/wallet.svg';
import PetsfolioLogo from '../../assets/images/Petsfolio_logo.svg';
import SideBar from '../../assets/images/side_bar.svg';
import Notify from '../../assets/images/notify.svg';
import RedNotify from '../../assets/images/RedNotify.svg';
import Rating from '../../assets/images/rating.svg';
import Range from '../../assets/images/range.svg';
import SercWalkingOne from '../../assets/images/serc_walking_one.svg';
import SercWalkingTwo from '../../assets/images/serc_walking_two.svg';
import SercWalkingThree from '../../assets/images/serc_walking_three.svg';
import SercWalkingFour from '../../assets/images/serc_walking_four.svg';
import Complete from '../../assets/images/complete.svg';
import MyservAdd from '../../assets/images/myserv_add.svg';
import DogWalking from '../../assets/images/dog_walking.svg';
import TutorialOne from '../../assets/images/tutorial_one.svg';
import TutorialTwo from '../../assets/images/tutorial_two.svg';
import PlayBtn from '../../assets/images/play_btn.svg';
import ArrowUp from '../../assets/images/arrrow_up.svg';
import DownPopup from '../../assets/images/down_popup.svg';
import Extenservc from '../../assets/images/exten_servc.svg';
import Inactive from '../../assets/images/inactice.svg';
import LinearGradient from 'react-native-linear-gradient';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { API_BASE_URL } from '../constants/constant';
import { UserContext } from '../common/AppContext';
import StarRating from 'react-native-star-rating-widget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Edit from '../../assets/images/edit.svg';
import ClosePopup from '../../assets/images/close_popup.svg';
import DownArrow from '../../assets/images/down_arrow.svg';
import Paws from '../../assets/images/paws.svg';
import Calan from '../../assets/images/calan.svg';
import Clock from '../../assets/images/clock.svg';
import Timer from '../../assets/images/timer.svg';
import { clearUserData } from '../constants/storageUtils';
// import RNRestart from 'react-native-restart';
import firestore from '@react-native-firebase/firestore';

const Home = ({ route }) => {
  const [moreService, setMoreService] = useState(false);
  const { userData } = useContext(UserContext);
  const navigation = useNavigation();
  const [value, setValue] = useState(30);
  const [spDetails, setSPDetails] = useState({});
  const [serviceDetails, setServiceDetails] = useState({});
  const [todayWalkDetails, setTodayWalkDetails] = useState([]);
  const [extendList, setExtendList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ExtentServicedtl, setExtentServicedtl] = useState(false);
  // const { item, isEdit } = route.params;
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedExtendPets, setSelectedExtendPets] = useState([]);
  const [selectedExtend, setSelectedExtend] = useState({});
  const [totalAmount, setTotalAmount] = useState(selectedExtend.total_price);
  const [bidingAmount, setBidingAmount] = useState(selectedExtend.total_price);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  let platformPercentage = 10;
  const [platformChargeAmount, setPlatformChargeAmount] = useState(
    (selectedExtend.total_price * platformPercentage) / 100,
  );
  const [receivableAmount, setReceivableAmount] = useState(
    bidingAmount - platformChargeAmount,
  );

  const [selectedAddOns, setSelectedAddOns] = useState(
    selectedExtend.addons ? selectedExtend.addons : [],
  );
  const [addOnPrices, setAddOnPrices] = useState(
    selectedExtend.addons ? selectedExtend.addons : [],
  );
  const [isDisabledReject, setIsDisabledReject] = useState(false);
  const [isDisabledAccept, setIsDisabledAccept] = useState(false);
  const [preferable_time, setPreferableTime] = useState(
    selectedExtend.preferable_time,
  );

  const [averageRating, setAverageRating] = useState(0.0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [inacticePopup, setInacticePopup] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  // useEffect(() => {
  //     fetchApiData()
  //     fetchTodaysData()
  //     fetchExtendedData()
  // }, [])

  useFocusEffect(
    React.useCallback(() => {
      fetchApiData();
      fetchTodaysData();
      fetchExtendedData();
    }, []),
  );

  // useFocusEffect(
  //     React.useCallback(() => {
  //         const onBackPress = () => {
  //             // Returning true disables back button
  //             return true;
  //         };

  //         BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //         return () => {
  //             BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //         };
  //     }, [])
  // );

  useEffect(() => {
    const initialPrices = selectedAddOns
      .map(addon => {
        return {
          name: addon.name,
          price:
            addon.price !== undefined &&
            addon.price !== null &&
            addon.price !== ''
              ? addon.price
              : '00',
        };
      })
      .filter(price =>
        addOnPrices.some(selected => selected.name === price.name),
      ); // Keep only the initially selected add-ons

    setAddOnPrices(initialPrices);
  }, [selectedAddOns]);

  const toggleCheckbox = name => {
    setAddOnPrices(prevSelected => {
      const isSelected = prevSelected.some(addon => addon.name === name);

      if (isSelected) {
        // Remove the addon if it is already selected
        return prevSelected.filter(addon => addon.name !== name);
      } else {
        // Find the price for the addon by looking it up in selectedAddOns
        const addon = selectedAddOns.find(addon => addon.name === name);
        const price = addon ? addon.price : '00'; // Default to '00' if not found

        // Check if the price is undefined and set it to '00' if so
        const finalPrice = price === undefined ? '00' : price;

        // Add the selected addon with the determined price
        return [...prevSelected, { name, price: finalPrice }];
      }
    });
  };

  const updatePrice = (name, newPrice) => {
    setAddOnPrices(prevPrices =>
      prevPrices.map(
        addon =>
          addon.name === name
            ? { ...addon, price: newPrice } // Update the price while keeping the other properties
            : addon, // Keep the other addons unchanged
      ),
    );
  };

  useEffect(() => {
    // Calculate the total add-on prices
    const addOnsTotal = addOnPrices.reduce((sum, addon) => {
      return sum + (parseFloat(addon.price) || 0); // Use parseFloat to ensure numbers are summed correctly
    }, 0);

    const updatedTotalAmount = (
      parseInt(selectedExtend.total_price, 10) + parseInt(addOnsTotal, 10)
    ).toFixed(2);
    setTotalAmount(updatedTotalAmount);

    const updatedBidingAmount = (
      updatedTotalAmount -
      updatedTotalAmount * (parseInt(discountPercentage) / 100)
    ).toFixed(2);
    setBidingAmount(updatedBidingAmount);

    const discountPrice = (
      updatedTotalAmount *
      (parseInt(discountPercentage) / 100)
    ).toFixed(2);
    setDiscountPrice(discountPrice);

    const updatedPlatformChargeAmount = (
      (updatedBidingAmount * platformPercentage) /
      100
    ).toFixed(2);
    setPlatformChargeAmount(updatedPlatformChargeAmount);

    const updatedReceivableAmount = (
      updatedBidingAmount - updatedPlatformChargeAmount
    ).toFixed(2);
    setReceivableAmount(updatedReceivableAmount);
  }, [addOnPrices, selectedServices, discountPercentage]);

  useEffect(() => {
    console.log(selectedAddOns); // Verify add-ons data
    console.log(addOnPrices); // Verify add-on prices state
  }, [selectedAddOns, addOnPrices]);
  // Update price function, keeping price in string format

  const fetchApiData = async () => {
    let userData = '';
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }
    const url = `${API_BASE_URL}provider/${userData.id}/profile`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.status == true) {
        setSPDetails(result.data);
        console.warn('RESULT DATAAAAAAAA :: ', result.data);
        const ratingString = result.data.averageRating.split(' ')[0]; // Extracts "0.0"
        const numericRating = Number(ratingString); // Convert to a number using Number()

        if (!isNaN(numericRating)) {
          setAverageRating(numericRating); // Valid number
        } else {
          setAverageRating(0); // Fallback if not a valid number
        }

        setServiceDetails(result.data.services);
        if (result.data.account_status === 'inactive') {
          setInacticePopup(true);
        }
        setIsLoading(false);
      } else if (result.status == 401) {
        clearUserData();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'SplashScreen' }], // Navigate back to the Splash Screen
          }),
        );
        // RNRestart.Restart();
      } else {
        console.warn('ELSEEE :: ', result);
      }
    } catch (error) {
      console.warn('Network request failed :: ', error);
    }
  };

  const fetchTodaysData = async () => {
    setIsLoading(true);
    let userData = '';
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }
    const url = `${API_BASE_URL}provider/${userData.id}/myWalks/4`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.warn('TODAYS WALK ::: ', result);
      if (result.status == true) {
        console.warn(result);
        setTodayWalkDetails(result.data);
        setIsLoading(false);
      } else {
        console.warn('ELSEEE TODAYS WALK :: ', result);
      }
    } catch (error) {
      console.warn('Network request failed :: ', error);
    }
  };

  const fetchExtendedData = async () => {
    let userData = '';
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }
    const url = `${API_BASE_URL}provider/extendRequest/${userData.id}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.status == true) {
        console.warn('EXTENDDDDDDDDDD ::: ', result);
        setExtendList(result.data);
      } else if (result.status == 401) {
        clearUserData();
        // RNRestart.Restart();
      } else {
        console.warn('ELSEEE11111 :: ', result);
      }
    } catch (error) {
      console.warn('Network request failed :: ', error);
    }
  };
  const createQuotationApi = async () => {
    console.warn('ADDONSSSSSS ::: ', selectedExtend.booking_id);

    try {
      const url = `${API_BASE_URL}provider/createQotation`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: selectedExtend.booking_id,
          provider_id: userData.id,
          service_id: '4',
          actual_amount: totalAmount,
          bid_amount: bidingAmount,
          discount: discountPercentage,
          extra_price: '',
          addons: addOnPrices,
          platform_charges: platformChargeAmount,
          sp_timings: preferable_time,
          type: 'extend',
          action: 'accepted',
          discount_amount: discountPrice,
        }),
      });

      const result = await response.json();

      if (result.status == true) {
        setExtentServicedtl(false);
        setIsDisabledAccept(false);
        fetchExtendedData();
        console.warn('SAHILLL222', result);
      } else {
        setIsDisabledAccept(false);
        console.warn('SAHILLL222', result);
      }
    } catch (error) {
      console.warn('SAHILLL222', error);
    }
  };

  const ExtentCarddata = [
    {
      id: '1',
      name: 'Karthika',
      service: 'Dog Walking',
      details: '1 Pet | 2 Times Walk',
      duration: '30 Days',
      amount: '₹6000',
      backgroundColor: '#FEAD54',
    },
    {
      id: '2',
      name: 'Karthika',
      service: 'Dog Walking',
      details: '1 Pet | 2 Times Walk',
      duration: '30 Days',
      amount: '₹10000',
      backgroundColor: '#B3BEFB',
    },
    {
      id: '3',
      name: 'Karthika',
      service: 'Dog Walking',
      details: '1 Pet | 2 Times Walk',
      duration: '30 Days',
      amount: '₹5000',
      backgroundColor: '#FEAD54',
    },
  ];

  const handleRespond = item => {
    console.warn('ITEMMMMITEMMMMITEMMMM ::: ', item.addons);
    setSelectedExtendPets(item.pets);
    setSelectedExtend(item);
    setSelectedAddOns(item.addons);
    setAddOnPrices(item.addons);
    setPreferableTime(item.preferable_time.split(','));
    console.warn('TIMEEEEEEEEEE ::: ', item.preferable_time.split(','));
    setExtentServicedtl(true);
  };

  const ExtentCard = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => handleRespond(item)}>
      <View style={globle_Style.Extend_srvc_con}>
        <View
          style={[
            globle_Style.Extend_srvc_info,
            { backgroundColor: '#FEAD54' },
          ]}
        >
          <View style={globle_Style.Extend_srvc_itm}>
            <View style={globle_Style.Extend_srvc_lft}>
              {/* <Extenservc /> */}
              <Image
                source={{ uri: item.pets[0]?.image }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            </View>
            <View style={globle_Style.Extend_srvc_rgt}>
              <View style={globle_Style.Extend__rgt_con}>
                <Text style={globle_Style.Extend__rgt_txt}>
                  {item.pets
                    ?.map(pet => pet.name)
                    .join(', ')
                    .trim()}
                </Text>
                <View style={globle_Style.Extend__rgt_btn}>
                  <Text style={globle_Style.Extend__rgt_btntxt}>Walking</Text>
                </View>
              </View>
              <View style={globle_Style.Extend_srvc_add}>
                <Text style={globle_Style.Extend_srvc_addtxt}>{item.city}</Text>
                <Text style={globle_Style.Extend_srvc_addtxt}>
                  {item.pets.length} pet | {item.walk_duration}
                </Text>
                <Text style={globle_Style.Extend_srvc_addtxt}>
                  {item.days} days
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={globle_Style.Extend_amnt}>
          <Text style={globle_Style.Extend_srvc_amnttxt}>
            {item.total_price}
          </Text>
          <View>
            {/* <TouchableWithoutFeedback> */}
            <Text style={[globle_Style.gbl_btn, globle_Style.ext_accpt_btn]}>
              Respond
            </Text>
            {/* </TouchableWithoutFeedback> */}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const handleExtendAcceptReject = async status => {
    if (status) {
      if (isDisabledAccept) return;
      setIsDisabledAccept(true);

      createQuotationApi();
    } else {
      if (isDisabledReject) return;
      setIsDisabledReject(true);

      let userData = '';
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        userData = JSON.parse(userDataString);
      }

      try {
        const url = `${API_BASE_URL}provider/manageRequest`;
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${userData.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            booking_id: selectedExtend.booking_id,
            service_id: '4',
            provider_id: userData.id,
            action: 'rejected',
          }),
        });
        result = await response.json();
        if (result.status == true) {
          fetchExtendedData();
          setIsDisabledReject(false);
          setExtentServicedtl(false);
          console.warn('SUCCESSS :: ', result);
        } else {
          setIsDisabledReject(false);
          console.error('Failed', result);
        }
      } catch (error) {
        setIsDisabledReject(false);
        console.error('Error:', error);
      }
    }
  };

  const renderTodaysItem = ({ item }) => (
    <View style={[globle_Style.opt_mor_con, globle_Style.popup_more_opt]}>
      <DogWalking style={{ marginRight: 17 }} />
      <Text style={[globle_Style.my_serc_itm_txt, { marginBottom: 0 }]}>
        Dog {item.service} In {item.location} at {item.preferable_time}{' '}
      </Text>
    </View>
  );

  const addQuestionsToFirestore = async () => {
    try {
      for (const q of questions) {
        await firestore().collection('questions').add(q);
        console.log(`Added question: ${q.question}`);
      }
      console.log('All questions added successfully!');
    } catch (error) {
      console.error('Error adding questions: ', error);
    }
  };

  const questions = [
    {
      question: 'What is the capital of France?',
      answers: ['Paris', 'London', 'Berlin', 'Madrid'],
    },
    {
      question: 'Which planet is known as the Red Planet?',
      answers: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      answers: ['Harper Lee', 'Mark Twain', 'J.K. Rowling', 'Ernest Hemingway'],
    },
  ];

  const sendMail = () => {
    const email = 'sahil.infasta@gmail.com';
    Linking.openURL(`mailto:${email}`);
  };

  const saveReport = async () => {
    // const selectedGender = gender.find(g => g.id === selectRadio);

    if (isDisable) return;

    // if (msg === '') {
    //   setMsgError(true);
    //   return
    // }

    setIsDisable(true);

    let userData = '';
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }

    const data = {
      user_id: userData.id,
      message: 'Please reactivate my account',
      type: 'provider',
    };

    console.warn(data);
    // return

    try {
      const url = `${API_BASE_URL}support`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.id,
          message: 'Please reactivate my account',
          type: 'provider',
        }),
      });

      const result = await response.json();

      if (result.status) {
        // setIsDisabled(false);
        console.warn('Saved Successfully!!');
        // navigation.goBack();
      } else {
        // setIsDisabled(false);
        console.error('Update data Failed:', result);
      }
    } catch (error) {
      console.error('Error :', error);
    }
  };

  return (
    <View style={[globle_Style.container]}>
      {isLoading ? (
        // Show loader when isLoading is true
        <ActivityIndicator size="large" color="#03A878" style={{ flex: 1 }} />
      ) : (
        <ScrollView>
          <View style={globle_Style.home_sec}>
            <View style={globle_Style.home_con}>
              <View style={globle_Style.header_sec}>
                <TouchableOpacity>
                  {/* <TouchableOpacity onPress={() => navigation.navigate('WalkTracking', { uniqueKey1: '1234567', data: '', walk_duration:'30 min walk' })}> */}
                  {/* <TouchableOpacity onPress={() => navigation.navigate('ChatPage', { userId: "user2", otherUserId: "user4" })}> */}
                  <View style={globle_Style.header_bar}>
                    <PetsfolioLogo />
                  </View>
                </TouchableOpacity>
                <View style={globle_Style.header_wal_noty}>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Wallet')}
                  >
                    <View style={globle_Style.wall_con}>
                      <Wallet style={{ marginRight: 4 }} />
                      <Text>{spDetails.totalWithdrawalAmount}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Notification')}
                  >
                    <View style={globle_Style.header_noty}>
                      <Notify />
                      {/* <RedNotify style={globle_Style.redNotify} /> */}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            <View style={globle_Style.home_info}>
              <TouchableOpacity
                onPress={() => {
                  addQuestionsToFirestore();
                }}
              >
                <View style={globle_Style.hom_heading}>
                  <Text style={globle_Style.hom_head_txt}>
                    Hi {spDetails.name},
                  </Text>
                  <Text style={globle_Style.hom_job_txt}>
                    Find your <Text style={{ color: '#03A878' }}>job</Text> here
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={globle_Style.rate_sec}>
                <View style={globle_Style.rate_con}>
                  <StarRating
                    rating={averageRating}
                    starSize={20}
                    color={'gold'}
                    onChange={() => {}}
                  />
                  <Text style={globle_Style.rate_txt}>
                    {spDetails.totalRatings} clients rating
                  </Text>
                </View>
              </View>
              <View style={globle_Style.verify_sec}>
                <Text style={globle_Style.verify_hdtxt}>Verification</Text>
                <View style={globle_Style.verify_con}>
                  <View style={globle_Style.verfy_lft}>
                    <Text
                      style={[
                        globle_Style.hom_head_txt,
                        globle_Style.verfy_com,
                      ]}
                    >
                      {' '}
                      {spDetails.completionPercentage?.toFixed(2)} % Completed
                    </Text>
                    <View pointerEvents="none">
                      <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        value={spDetails.completionPercentage}
                        minimumTrackTintColor="#FBAB51"
                        maximumTrackTintColor="#415E84"
                        thumbTintColor="transparent"
                      />
                    </View>
                    <Text style={globle_Style.verify_led}>
                      For more leads complete all verification
                    </Text>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate('My Verification', {
                        email: spDetails.email,
                        verification: spDetails.verifications,
                      })
                    }
                  >
                    <View style={globle_Style.verfy_rgt}>
                      <Text style={globle_Style.verfy_rgt_txt}>Verify</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={globle_Style.verify_sec}>
                <Text style={globle_Style.verify_hdtxt}>My Services</Text>
                <View style={globle_Style.my_serc_con}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      serviceDetails.Walking
                        ? navigation.navigate('Newjob')
                        : navigation.navigate('Service Detail', {
                            service_id: '4',
                          });
                    }}
                  >
                    <View style={globle_Style.my_serc_itm}>
                      <SercWalkingOne style={{ marginVertical: 21 }} />
                      <Text style={globle_Style.my_serc_itm_txt}>
                        Dog Walking
                      </Text>
                      <Text style={[globle_Style.my_sercno_txt]}>
                        {spDetails.walkingLeads} new leads
                      </Text>
                      <TouchableWithoutFeedback>
                        <View style={globle_Style.my_serc_itm_img}>
                          {serviceDetails.Walking ? (
                            <Complete />
                          ) : (
                            <MyservAdd />
                          )}
                        </View>
                      </TouchableWithoutFeedback>
                      {serviceDetails.Walking ? (
                        <LinearGradient
                          colors={['#1F37B9', '#CC2EE5']}
                          start={{ x: 0, y: 1 }}
                          style={globle_Style.my_serc_itm_active}
                        >
                          <Text style={globle_Style.my_serc_itm_actv_txt}>
                            ACTIVE
                          </Text>
                        </LinearGradient>
                      ) : null}
                    </View>
                  </TouchableWithoutFeedback>

                  {/* <TouchableWithoutFeedback onPress={() => { !serviceDetails.Grooming ? navigation.navigate('Grooming') : navigation.navigate('GroomingNewJob', { service_id: '2' }) }}> */}
                  <TouchableWithoutFeedback
                    onPress={() => {
                      serviceDetails.Grooming
                        ? navigation.navigate('GroomingNewJob')
                        : navigation.navigate('Service Detail Grooming', {
                            service_id: '2',
                          });
                    }}
                  >
                    {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('Grooming')}> */}
                    {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('Service Detail Grooming', { service_id: '2' })}> */}
                    <View style={globle_Style.my_serc_itm}>
                      <SercWalkingTwo style={{ marginVertical: 21 }} />
                      <Text style={globle_Style.my_serc_itm_txt}>
                        Dog Grooming
                      </Text>
                      <Text
                        style={[
                          globle_Style.my_sercno_txt,
                          {
                            color:
                              serviceDetails && serviceDetails.Grooming
                                ? '#03A878'
                                : 'red',
                          },
                        ]}
                      >
                        {serviceDetails && serviceDetails.Grooming
                          ? `${spDetails.groomingLeads} new leads`
                          : // ? `0 new leads`
                            '0 new leads'}
                      </Text>
                      <View style={globle_Style.my_serc_itm_img}>
                        {serviceDetails.Grooming ? <Complete /> : <MyservAdd />}
                      </View>

                      {serviceDetails.Grooming ? (
                        <LinearGradient
                          colors={['#1F37B9', '#CC2EE5']}
                          start={{ x: 0, y: 1 }}
                          style={globle_Style.my_serc_itm_active}
                        >
                          <Text style={globle_Style.my_serc_itm_actv_txt}>
                            ACTIVE
                          </Text>
                        </LinearGradient>
                      ) : null}
                    </View>
                  </TouchableWithoutFeedback>

                  {/* <TouchableWithoutFeedback onPress={() => { serviceDetails.Boarding ? null : navigation.navigate('Service Detail Boarding', { service_id: '1' }) }}> */}
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Boarding')}
                  >
                    <View style={globle_Style.my_serc_itm}>
                      <SercWalkingThree style={{ marginVertical: 21 }} />
                      <Text style={globle_Style.my_serc_itm_txt}>
                        Dog Boarding
                      </Text>
                      <Text
                        style={[
                          globle_Style.my_sercno_txt,
                          {
                            color:
                              serviceDetails && serviceDetails.Boarding
                                ? '#03A878'
                                : 'red',
                          },
                        ]}
                      >
                        {serviceDetails && serviceDetails.Boarding
                          ? `${serviceDetails.Boarding} new leads`
                          : '0 new leads'}
                      </Text>
                      <View
                        style={[
                          globle_Style.my_serc_itm_img,
                          globle_Style.my_serc_itm_add,
                        ]}
                      >
                        {serviceDetails.Boarding ? <Complete /> : <MyservAdd />}
                      </View>
                      {serviceDetails.Boarding ? (
                        <LinearGradient
                          colors={['#1F37B9', '#CC2EE5']}
                          start={{ x: 0, y: 1 }}
                          style={globle_Style.my_serc_itm_active}
                        >
                          <Text style={globle_Style.my_serc_itm_actv_txt}>
                            ACTIVE
                          </Text>
                        </LinearGradient>
                      ) : null}
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback
                    onPress={() => {
                      serviceDetails.Training
                        ? navigation.navigate('TrainingNewJob')
                        : navigation.navigate('Service Detail Traning', {
                            service_id: '3',
                          });
                    }}
                  >
                    <View style={globle_Style.my_serc_itm}>
                      <SercWalkingTwo style={{ marginVertical: 21 }} />
                      <Text style={globle_Style.my_serc_itm_txt}>
                        Dog Training
                      </Text>
                      <Text
                        style={[
                          globle_Style.my_sercno_txt,
                          {
                            color:
                              serviceDetails && serviceDetails.Training
                                ? '#03A878'
                                : 'red',
                          },
                        ]}
                      >
                        {serviceDetails && serviceDetails.Training
                          ? `${spDetails.trainingLeads} new leads`
                          : // ? `0 new leads`
                            '0 new leads'}
                      </Text>
                      <View style={globle_Style.my_serc_itm_img}>
                        {serviceDetails.Training ? <Complete /> : <MyservAdd />}
                      </View>

                      {serviceDetails.Training ? (
                        <LinearGradient
                          colors={['#1F37B9', '#CC2EE5']}
                          start={{ x: 0, y: 1 }}
                          style={globle_Style.my_serc_itm_active}
                        >
                          <Text style={globle_Style.my_serc_itm_actv_txt}>
                            ACTIVE
                          </Text>
                        </LinearGradient>
                      ) : null}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              {/* extented card screen here */}
              {extendList.length > 0 ? (
                <View style={globle_Style.extented_sec}>
                  <View style={globle_Style.verify_sec}>
                    <Text style={globle_Style.verify_hdtxt}>
                      Extend Service
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <FlatList
                        data={extendList}
                        renderItem={ExtentCard}
                        keyExtractor={item => item.booking_id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      />
                    </ScrollView>
                  </View>
                </View>
              ) : null}

              <View style={globle_Style.verify_sec}>
                <Text style={globle_Style.verify_hdtxt}>Tutorials</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={globle_Style.tutor_con}>
                    <View style={globle_Style.tutor_itm}>
                      <TutorialOne style={{ marginBottom: 10 }} />
                      <Text
                        style={[
                          globle_Style.my_serc_itm_txt,
                          { textAlign: 'center' },
                        ]}
                      >
                        Dog Walking
                      </Text>
                      <View style={globle_Style.tutor_itm_img}>
                        <PlayBtn />
                      </View>
                    </View>
                    <View style={globle_Style.tutor_itm}>
                      <TutorialTwo style={{ marginBottom: 10 }} />
                      <Text
                        style={[
                          globle_Style.my_serc_itm_txt,
                          { textAlign: 'center' },
                        ]}
                      >
                        Dog Training
                      </Text>
                      <View style={globle_Style.tutor_itm_img}>
                        <PlayBtn />
                      </View>
                    </View>
                    <View style={globle_Style.tutor_itm}>
                      <TutorialTwo style={{ marginBottom: 10 }} />
                      <Text
                        style={[
                          globle_Style.my_serc_itm_txt,
                          { textAlign: 'center' },
                        ]}
                      >
                        Dog Boarding
                      </Text>
                      <View style={globle_Style.tutor_itm_img}>
                        <PlayBtn />
                      </View>
                    </View>
                    <View style={globle_Style.tutor_itm}>
                      <TutorialTwo style={{ marginBottom: 10 }} />
                      <Text
                        style={[
                          globle_Style.my_serc_itm_txt,
                          { textAlign: 'center' },
                        ]}
                      >
                        Dog Grooming
                      </Text>
                      <View style={globle_Style.tutor_itm_img}>
                        <PlayBtn />
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
          {/* extend service popup  */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={ExtentServicedtl}
            onRequestClose={() => {
              setExtentServicedtl(!ExtentServicedtl);
            }}
          >
            <View style={globle_Style.popup}>
              <View style={[globle_Style.overlay]}>
                <View style={globle_Style.extent_popup}>
                  <View
                    style={[globle_Style.quot_dtls_con, { marginBottom: 0 }]}
                  >
                    <View style={globle_Style.accrd_con}>
                      <View style={globle_Style.quot_dtls_accrd_itm}>
                        <Text style={globle_Style.quot_dtls_hd}>
                          Package Details
                        </Text>
                        <TouchableOpacity
                          onPress={() => setExtentServicedtl(false)}
                        >
                          <ClosePopup />
                        </TouchableOpacity>
                      </View>
                      <View style={globle_Style.pakg_time_con}>
                        <View style={globle_Style.pakg_time_lst}>
                          <View
                            style={[
                              globle_Style.pakg_time_itm,
                              {
                                justifyContent: 'space-between',
                                paddingHorizontal: 0,
                              },
                            ]}
                          >
                            <View style={globle_Style.pakg_time_itm}>
                              <Paws style={{ marginRight: 5 }} />
                              <Text style={globle_Style.lst_dots_txt}>
                                No of Pet- {selectedExtendPets.length}
                              </Text>
                            </View>
                            <LinearGradient
                              colors={['#CC2EE5', '#1F37B9']}
                              start={{ x: 0, y: 1 }}
                              style={globle_Style.extented_labelsec}
                            >
                              <Text style={globle_Style.extented_label}>
                                Extended Service
                              </Text>
                            </LinearGradient>
                          </View>
                          <View style={globle_Style.pakg_time_itm}>
                            <Calan style={{ marginRight: 5 }} />
                            <Text style={globle_Style.lst_dots_txt}>
                              {selectedExtend.service_frequency},{' '}
                              {selectedExtend.days} days
                            </Text>
                          </View>
                          <View style={globle_Style.packg_tmedit}>
                            <Clock style={{ marginRight: 5 }} />
                            {/* <Text style={globle_Style.lst_dots_txt}>{preferable_time}</Text> */}
                            <Text style={globle_Style.lst_dots_txt}>
                              {selectedExtend.preferable_time}
                            </Text>
                          </View>
                          <View
                            style={[
                              globle_Style.pakg_time_itm,
                              globle_Style.edit_optn,
                            ]}
                          >
                            <View style={globle_Style.packg_tmedit}>
                              <Timer style={{ marginRight: 5 }} />
                              <Text style={globle_Style.lst_dots_txt}>
                                {selectedExtend.walk_duration}
                              </Text>
                            </View>
                            <View style={globle_Style.packg_edit_img}>
                              <Text
                                style={[
                                  globle_Style.lst_dots_txt,
                                  globle_Style.exmtimr_amnt,
                                ]}
                              >
                                ₹{selectedExtend.total_price}
                              </Text>
                            </View>
                          </View>
                        </View>
                        {/* popup start  */}
                        {/* <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={recePopup}
                                        onRequestClose={() => {
                                        setrecePopup(!recePopup);
                                        }}>
                                        <View style={globle_Style.popup}>
                                        <View style={[globle_Style.overlay]}>
                                            <View style={globle_Style.walk_type_popup}>
                                            <View style={globle_Style.walk_typ_pop_hd}>
                                                <Text style={[globle_Style.my_prof_txt, globle_Style.popup_txt_hd]}>Select Time</Text>
                                                <Text style={globle_Style.popup_txt_para}>Walk Type: {service_frequency}</Text>
                                            </View>
                                            Morning Walk
                                            <View>
                                                <View style={globle_Style.walk_morn_time}>
                                                <View style={globle_Style.morn_logo}>
                                                    <MorningWalk style={globle_Style.img} />
                                                </View>
                                                <View>
                                                    <Text style={globle_Style.popup_txt_para}>Morning</Text>
                                                </View>
                                                </View>
                                                <FlatList
                                                data={morning_walk_list}
                                                renderItem={({ item }) => (
                                                    <Morning_walk
                                                    item={item}
                                                    selectedDates={preferable_time}
                                                    onSelectItem={handleSelectItem}
                                                    />
                                                )}
                                                keyExtractor={item => item.id.toString()}
                                                horizontal
                                                pagingEnabled
                                                showsHorizontalScrollIndicator={false}
                                                />
                                            </View>
                                            Afternoon Walk
                                            <View>
                                                <View style={globle_Style.walk_morn_time}>
                                                <View style={[globle_Style.morn_logo, globle_Style.aftr_nun_logo]}>
                                                    <AfternoonWalk style={globle_Style.img} />
                                                </View>
                                                <View>
                                                    <Text style={globle_Style.popup_txt_para}>Afternoon</Text>
                                                </View>
                                                </View>
                                                <FlatList
                                                data={afternoon_walk_list}
                                                renderItem={({ item }) => (
                                                    <Afternoon_walk
                                                    item={item}
                                                    selectedDates={preferable_time}
                                                    onSelectItem={handleSelectItem}
                                                    />
                                                )}
                                                keyExtractor={item => item.id.toString()}
                                                horizontal
                                                pagingEnabled
                                                showsHorizontalScrollIndicator={false}
                                                />
                                            </View>
                                            Evening Walk
                                            <View>
                                                <View style={globle_Style.walk_morn_time}>
                                                <View style={[globle_Style.morn_logo, globle_Style.even_logo]}>
                                                    <NightWalk style={globle_Style.img} />
                                                </View>
                                                <View>
                                                    <Text style={globle_Style.popup_txt_para}>Evening</Text>
                                                </View>
                                                </View>
                                                <FlatList
                                                data={evening_walk_list}
                                                renderItem={({ item }) => (
                                                    <Evening_walk
                                                    item={item}
                                                    selectedDates={preferable_time}
                                                    onSelectItem={handleSelectItem}
                                                    />
                                                )}
                                                keyExtractor={item => item.id.toString()}
                                                horizontal
                                                pagingEnabled
                                                showsHorizontalScrollIndicator={false}
                                                />
                                            </View>
                                            </View>
                                            Cancel and OK Buttons
                                            <View style={globle_Style.pet_prof_btn_sec}>
                                            <TouchableWithoutFeedback onPress={() => setrecePopup(false)}>
                                                <View style={globle_Style.popup_detl_btn}>
                                                <Text style={[globle_Style.gbl_btn, globle_Style.personal_detail]}>Cancel</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback onPress={() => setrecePopup(false)}>
                                                <View style={globle_Style.popup_detl_btn}>
                                                <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={globle_Style.globle_btn}>
                                                    <Text style={globle_Style.gbl_btn}>Ok</Text>
                                                </LinearGradient>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                        </View>
                                    </Modal> */}
                      </View>

                      {/* <View style={globle_Style.pakg_incld_con}>
                                        <View style={globle_Style.pakg_incld}>
                                            <Text style={[globle_Style.quot_dtls_hd, { fontSize: 14, marginBottom: 18 }]}>Package Details</Text>
                                            <View style={globle_Style.pakg_incld_lst}>

                                            <View style={[globle_Style.pakg_time_itm, globle_Style.edit_optn]}>
                                                <View style={globle_Style.packg_tmedit}>
                                                <Text style={globle_Style.lst_dots}>•</Text>
                                                <Text style={globle_Style.lst_dots_txt}>Live Tracking</Text>
                                                </View>
                                                <View style={globle_Style.pakg_time_itm}>
                                                <Text style={globle_Style.lst_dots}>•</Text>
                                                <Text style={globle_Style.lst_dots_txt}>Each Walk Distance {item.walk_duration}</Text>

                                                </View>
                                                <View style={globle_Style.packg_edit_img}>
                                                <Text style={globle_Style.quot_dtls_hd}>{item.total_price}</Text>
                                                </View>

                                            </View>
                                            </View>
                                        </View>
                                    </View> */}

                      <View style={globle_Style.pakg_incld}>
                        <Text
                          style={[
                            globle_Style.quot_dtls_hd,
                            { fontSize: 14, marginBottom: 18 },
                          ]}
                        >
                          Add Ons
                        </Text>
                        {selectedAddOns.map((addon, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => toggleCheckbox(addon.name)} // Toggle selection
                            style={globle_Style.packg_addon}
                          >
                            <View style={globle_Style.packg_addon_lft}>
                              <Text
                                style={[
                                  globle_Style.lst_dots_txt,
                                  { marginEnd: 12 },
                                ]}
                              >
                                {addon.name}
                              </Text>
                              {addOnPrices.some(
                                price => price.name === addon.name,
                              ) ? ( // Check if the add-on is selected
                                <Image
                                  source={require('../../assets/images/green_tick.png')}
                                />
                              ) : (
                                <View style={globle_Style.unchecked_checkbox}>
                                  <Image
                                    source={require('../../assets/images/add-on.png')}
                                  />
                                </View>
                              )}
                            </View>

                            <View style={globle_Style.packg_addon_rgt}>
                              {addOnPrices.some(
                                price => price.name === addon.name,
                              ) && ( // Show TextInput if selected
                                <TextInput
                                  style={globle_Style.apackg_addon_txt}
                                  value={
                                    addOnPrices.find(
                                      item => item.name === addon.name,
                                    )?.price || '00' // Find price based on addon name
                                  }
                                  editable={false}
                                  // onChangeText={(newPrice) => {
                                  //     if (newPrice !== '') {
                                  //         updatePrice(addon.name, newPrice); // Update price using the updatePrice function
                                  //     }
                                  // }}
                                  maxLength={6} // Adjust length based on price format
                                  keyboardType="numeric"
                                />
                              )}
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>

                      <View style={globle_Style.pakg_totl_amt}>
                        <View style={globle_Style.pakg_totl_con}>
                          <Text style={globle_Style.quot_dtls_hd}>
                            Total Package Cost
                          </Text>
                          <Text style={globle_Style.quot_dtls_hd}>
                            {totalAmount}
                          </Text>
                        </View>
                        <View style={globle_Style.pakg_totl_con}>
                          <View>
                            <Text style={globle_Style.quot_dtls_hd}>
                              Do you want to offer a discount
                            </Text>
                            <Text style={globle_Style.discont_txt}>
                              Discount can help to win a job
                            </Text>
                          </View>
                          <View style={globle_Style.discont_opt}>
                            {/* <Text style={globle_Style.discont_opttxt}>30%</Text> */}
                            <TextInput
                              style={globle_Style.discont_opttxt}
                              placeholder="00"
                              editable={true}
                              keyboardType="numeric"
                              value={discountPercentage}
                              onChangeText={setDiscountPercentage}
                              maxLength={2}
                            />
                            <Text
                              style={[
                                globle_Style.discont_opttxt,
                                { marginEnd: 5 },
                              ]}
                            >
                              %
                            </Text>
                            {/* <DownArrow /> */}
                          </View>
                        </View>
                        <View style={globle_Style.pakg_totl_con}>
                          <Text style={globle_Style.quot_dtls_hd}>
                            Your Bidding Amount
                          </Text>
                          <Text style={globle_Style.quot_dtls_hd}>
                            {bidingAmount}
                          </Text>
                        </View>
                        <View style={globle_Style.pakg_totl_con}>
                          <Text style={globle_Style.quot_dtls_hd}>
                            Platform Charges({platformPercentage}%)
                          </Text>
                          <Text style={globle_Style.quot_dtls_hd}>
                            {platformChargeAmount}
                          </Text>
                        </View>
                        <View style={globle_Style.pakg_totl_con}>
                          <Text style={globle_Style.quot_dtls_hd}>
                            Your Receivable Amount
                          </Text>
                          <Text style={globle_Style.quot_dtls_hd}>
                            {receivableAmount}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        globle_Style.globle_btn,
                        { marginBottom: 10, flexDirection: 'row' },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => handleExtendAcceptReject(false)}
                      >
                        <View
                          style={[
                            globle_Style.exten_btn,
                            { paddingHorizontal: 20 },
                          ]}
                        >
                          <Text
                            style={[
                              globle_Style.gbl_btn,
                              { color: '#222222' },
                              { opacity: isDisabledReject ? 0.5 : 1 },
                            ]}
                          >
                            Reject
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => handleExtendAcceptReject(true)}
                      >
                        <View>
                          <LinearGradient
                            colors={['#FBAB51', '#FE8705']}
                            start={{ x: 0, y: 1 }}
                            style={[
                              globle_Style.globle_btn,
                              { paddingHorizontal: 20 },
                            ]}
                          >
                            <Text
                              style={[
                                globle_Style.gbl_btn,
                                {},
                                { opacity: isDisabledAccept ? 0.5 : 1 },
                              ]}
                            >
                              Accept
                            </Text>
                          </LinearGradient>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}

      {todayWalkDetails.length > 0 ? (
        <View style={globle_Style.opt_mor}>
          <TouchableOpacity onPress={() => setMoreService(true)}>
            <View style={globle_Style.popup_con}>
              {todayWalkDetails.length > 1 ? (
                <>
                  <ArrowUp
                    style={{
                      marginBottom: 3,
                      postion: 'absolute',
                      top: -5,
                      zIndex: 9,
                    }}
                  />
                  <Text style={globle_Style.opt_mor_txt}>
                    {todayWalkDetails.length - 1} more
                  </Text>
                  <View style={globle_Style.circle}>
                    <Image source={require('../../assets/images/cond.png')} />
                  </View>
                </>
              ) : null}
            </View>
          </TouchableOpacity>
          {todayWalkDetails.length > 0 ? (
            <View style={globle_Style.opt_mor_con}>
              <DogWalking style={{ marginRight: 17 }} />
              <Text
                style={[
                  globle_Style.my_serc_itm_txt,
                  { marginBottom: 0, lineHeight: 15 },
                ]}
              >
                Dog {todayWalkDetails[0].service} In{' '}
                {todayWalkDetails[0].location} at{' '}
                {todayWalkDetails[0].preferable_time}{' '}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={moreService}
        onRequestClose={() => {
          setMoreService(!moreService);
        }}
      >
        <View style={globle_Style.popup}>
          <View style={[globle_Style.overlay]}>
            <View style={globle_Style.popup_con}>
              <TouchableOpacity onPress={() => setMoreService(false)}>
                <DownPopup
                  style={{
                    marginBottom: 3,
                    postion: 'absolute',
                    top: -4,
                    zIndex: 9,
                    left: -2,
                  }}
                />
              </TouchableOpacity>
              <TouchableWithoutFeedback onPress={() => setMoreService(false)}>
                <View style={[globle_Style.circle, globle_Style.close_popup]}>
                  <Image source={require('../../assets/images/cond.png')} />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <ScrollView style={[globle_Style.walking_more, { height: 304 }]}>
              <View>
                {/* <View style={[globle_Style.opt_mor_con, globle_Style.popup_more_opt]} >
                                    <DogWalking style={{ marginRight: 17 }} />
                                    <Text style={[globle_Style.my_serc_itm_txt, { marginBottom: 0 }]}>Dog Walking In banjara hill at 7:00 pm </Text>
                                </View> */}

                <FlatList
                  data={todayWalkDetails}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderTodaysItem}
                />

                {/* <View style={[globle_Style.opt_mor_con, globle_Style.popup_more_opt]} >
                                    <DogWalking style={{ marginRight: 17 }} />
                                    <Text style={[globle_Style.my_serc_itm_txt, { marginBottom: 0 }]}>Dog Walking In banjara hill at 7:00 pm </Text>
                                </View>
                                <View style={[globle_Style.opt_mor_con, globle_Style.popup_more_opt]} >
                                    <DogWalking style={{ marginRight: 17 }} />
                                    <Text style={[globle_Style.my_serc_itm_txt, { marginBottom: 0 }]}>Dog Walking In banjara hill at 7:00 pm </Text>
                                </View>
                                <View style={[globle_Style.opt_mor_con, globle_Style.popup_more_opt]} >
                                    <DogWalking style={{ marginRight: 17 }} />
                                    <Text style={[globle_Style.my_serc_itm_txt, { marginBottom: 0 }]}>Dog Walking In banjara hill at 7:00 pm </Text>
                                </View> */}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* update Profile popup  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={inacticePopup}
        onRequestClose={() => {
          // setInacticePopup(!inacticePopup);
        }}
      >
        <View style={[styles.popup3, { backgroundColor: '#28282842' }]}>
          <View style={[styles.overlay3]}>
            <View style={[styles.aut_fail_sec, { paddingBottom: 30 }]}>
              <View style={styles.aut_fail_con}>
                <View style={styles.close_sign}>
                  {/* <Image source={require('../../../assets/images/updateProfile.png')} /> */}

                  <Inactive />
                </View>
                <View style={[styles.aut_fail_hd, { marginHorizontal: 20 }]}>
                  <Text style={styles.aut_fail_hd_txt}>
                    Your account is{' '}
                    <Text style={[styles.aut_fail_hd_txt, { color: 'red' }]}>
                      currently
                    </Text>{' '}
                    inactive
                  </Text>
                  <Text
                    style={[
                      styles.aut_fail_txt,
                      { color: isDisable ? '#FE8705' : '#3D3D3D' },
                    ]}
                  >
                    {isDisable
                      ? 'Your request has been sent successfully. Will reach out soon.'
                      : 'Please contact our support team to reactivate your account.'}
                  </Text>
                </View>
              </View>

              <TouchableWithoutFeedback
                onPress={() => {
                  // if (isDisable) return;
                  // setIsDisable(true)
                  saveReport();
                  // sendMail()
                  // setInacticePopup(false)
                  // navigation.navigate('MyProfile')
                }}
              >
                <View style={[globle_Style.globle_btn, { marginBottom: 0 }]}>
                  <LinearGradient
                    colors={['#FBAB51', '#FE8705']}
                    start={{ x: 0, y: 1 }}
                    style={[
                      globle_Style.globle_btn,
                      { marginBottom: 0 },
                      { opacity: isDisable ? 0.5 : 1 },
                    ]}
                  >
                    <Text style={globle_Style.gbl_btn}> Contact </Text>
                  </LinearGradient>
                </View>
              </TouchableWithoutFeedback>

              {/* <Text style={  [styles.aut_fail_txt, {marginHorizontal:20, marginTop:10}]}></Text> */}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 15,
    borderRadius: 6,
  },
  popup3: {
    backgroundColor: '#000000E0',
    width: '100%',
    height: '100%',
    position: 'static',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay3: {
    position: 'absolute',
    width: '100%',
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
});
export default Home;
