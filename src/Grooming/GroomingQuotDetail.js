import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableWithoutFeedback, Modal, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import DownArrow from '../../assets/images/down_arrow.svg'
import globle_Style from '../css/globle_Style';
import Edit from '../../assets/images/edit.svg'
import ClosePopup from '../../assets/images/close_popup.svg'
import AfternoonWalk from '../../assets/images/afternoon_walk.svg'
import MorningWalk from '../../assets/images/morning_walk.svg'
import NightWalk from '../../assets/images/night_walk.svg'
import Pawprint from '../../assets/images/pawprint.svg'
import Age from '../../assets/images/age.svg'
import UpArrow from '../../assets/images/uparrow.svg'
import Genders from '../../assets/images/genders.svg'
import Vaccine from '../../assets/images/vaccine.svg'
import PetImage from '../../assets/images/petImage.svg'
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import { UserContext } from '../common/AppContext';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL, formatDate } from '../constants/constant';


// data os time 
const morning_walk_list = [
  {
    id: 31,
    date: '06:00 AM',
  },
  {
    id: 32,
    date: '06:30 AM',
  },
  {
    id: 33,
    date: '07:00 AM',
  },
  {
    id: 34,
    date: '07:30 AM',
  },
  {
    id: 35,
    date: '08:00 AM',
  },
  {
    id: 36,
    date: '08:30 AM',
  },
  {
    id: 37,
    date: '09:00 AM',
  },
  {
    id: 38,
    date: '09:30 AM',
  },
  {
    id: 39,
    date: '10:00 AM',
  },
  {
    id: 40,
    date: '10:30 AM',
  },
  {
    id: 41,
    date: '11:00 AM',
  },
  {
    id: 42,
    date: '11:30 AM',
  },
  {
    id: 43,
    date: '12:00 PM',
  },

]

const afternoon_walk_list = [
  {
    id: 44,
    date: '12:30 PM',
  },
  {
    id: 45,
    date: '01:00 PM',
  },
  {
    id: 33,
    date: '01:30 PM',
  },
  {
    id: 46,
    date: '02:00 PM',
  },
  {
    id: 47,
    date: '02:30 PM',
  },
  {
    id: 48,
    date: '03:00 PM',
  },
  {
    id: 49,
    date: '03:30 PM',
  },
  {
    id: 50,
    date: '04:00 PM',
  },
  {
    id: 51,
    date: '04:30 PM',
  },
  {
    id: 52,
    date: '05:00 PM',
  },
  {
    id: 53,
    date: '05:30 PM',
  },

]

const evening_walk_list = [
  {
    id: 56,
    date: '06:00 PM',
  },
  {
    id: 57,
    date: '06:30 PM',
  },
  {
    id: 58,
    date: '07:00 PM',
  },
  {
    id: 59,
    date: '07:30 PM',
  },
  {
    id: 60,
    date: '08:00 PM',
  },
  {
    id: 61,
    date: '08:30 PM',
  },
  {
    id: 62,
    date: '09:00 PM',
  },
  {
    id: 63,
    date: '09:30 PM',
  },
  {
    id: 64,
    date: '10:00 PM',
  },
  {
    id: 65,
    date: '10:30 PM',
  },
  {
    id: 66,
    date: '11:00 PM',
  },
  {
    id: 67,
    date: '11:30 PM',
  },
  {
    id: 68,
    date: '12:00 AM',
  },

]


const GroomingQuoteDetails = ({ route }) => {
  const [recePopup, setrecePopup] = useState(false)
  const { item, isEdit } = route.params;
  const { userData } = useContext(UserContext);

  const [selectedAddOns, setSelectedAddOns] = useState(item.addons);
  const [services, setServices] = useState(item.service);
  const [service_frequency, setServiceFrequency] = useState(item.service_frequency);
  const [preferable_time, setPreferableTime] = useState(item.preferable_time.split(','));
  const [selectedServices, setSelectedServices] = useState([]);

  const [addOnPrices, setAddOnPrices] = useState(item.addons);
  const [servicePrices, setServicePrices] = useState(item.service.find(item => item.type == true));
  const [totalAmount, setTotalAmount] = useState(item.total_price);
  const [bidingAmount, setBidingAmount] = useState(item.total_price);
  const [discountPercentage, setDiscountPercentage] = useState(item.discount ?? 0);
  let platformPercentage = 10;
  const [platformChargeAmount, setPlatformChargeAmount] = useState((item.total_price * platformPercentage) / 100);
  const [receivableAmount, setReceivableAmount] = useState((bidingAmount - platformChargeAmount));
  const navigation = useNavigation();
  const [isDisabled, setIsDisabled] = useState(false);

  const [ispetDetail, setIspetDetail] = useState(false);
  const [packageDetail, setPackageDetail] = useState(true);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [addOnsValidation, setAddOnsValidation] = useState(false);
  const [discountValidation, setDiscountValidation] = useState(false);


  const showPetDetail = () => {
    setIspetDetail(!ispetDetail)
  };
  const showPackageDetail = () => {
    setPackageDetail(!packageDetail)
  }

  // useEffect(() => {
  //   const seelecteed = item.service.find(item => item.type == true)

  //   console.warn("SLLCCTTDDDDD :: ", seelecteed)
  //   setServicePrices(seelecteed)
  // }, [])


  const handleSelectItem = (date) => {
    setPreferableTime(() => [date]); // Always replace with the new date
  };


  // const handleSelectItem = (date) => {
  //   setPreferableTime((prevSelectedDates = []) => {
  //     // Ensure prevSelectedDates is always an array
  //     if (!Array.isArray(prevSelectedDates)) {
  //       prevSelectedDates = [];
  //     }

  //     let maxSelections = 1;
  //     // switch (service_frequency) {
  //     //   case 'once a day':
  //     //     maxSelections = 1;
  //     //     break;
  //     //   case 'twice a day':
  //     //     maxSelections = 2;
  //     //     break;
  //     //   case 'thrice a day':
  //     //     maxSelections = 3;
  //     //     break;
  //     //   default:
  //     //     maxSelections = 0;
  //     //     break;
  //     // }

  //     if (prevSelectedDates.includes(date)) {
  //       // Deselect if the same date is clicked again
  //       return prevSelectedDates.filter((selectedDate) => selectedDate !== date);
  //     } else if (prevSelectedDates.length < maxSelections) {
  //       // Select new date only if we haven't reached the max selections
  //       return [...prevSelectedDates, date];
  //     }

  //     // If max selections are reached, return the previous state without changes
  //     return prevSelectedDates;
  //   });
  // };


  useEffect(() => {
    console.warn("ITEMMMMMMMMMMM :: ", item)
    // setPreferableTime(item.preferable_time)
  }, [])


  // useEffect(() => {
  //   const initialPrices = selectedAddOns.map(addon => {
  //     return {
  //       name: addon.name,
  //       price: addon.price !== undefined && addon.price !== null && addon.price !== ''
  //         ? addon.price
  //         : '00'
  //     };
  //   }).filter(price => addOnPrices.some(selected => selected.name === price.name)); // Keep only the initially selected add-ons

  //   setAddOnPrices(initialPrices);
  // }, [selectedAddOns]);

  // const toggleCheckbox = (name) => {
  //   setAddOnPrices(prevSelected => {
  //     const isSelected = prevSelected.some(addon => addon.name === name);

  //     if (isSelected) {
  //       // Remove the addon if it is already selected
  //       return prevSelected.filter(addon => addon.name !== name);
  //     } else {
  //       // Find the price for the addon by looking it up in selectedAddOns
  //       const addon = selectedAddOns.find(addon => addon.name === name);
  //       const price = addon ? addon.price : '00'; // Default to '00' if not found

  //       // Check if the price is undefined and set it to '00' if so
  //       const finalPrice = price === undefined ? '00' : price;

  //       // Add the selected addon with the determined price
  //       return [...prevSelected, { name, price: finalPrice }];
  //     }
  //   });
  // };

  // // Update price function, keeping price in string format
  // const updatePrice = (name, newPrice) => {
  //   setAddOnPrices(prevPrices =>
  //     prevPrices.map(addon =>
  //       addon.name === name
  //         ? { ...addon, price: newPrice } // Update the price while keeping the other properties
  //         : addon // Keep the other addons unchanged
  //     )
  //   );
  // };


  useEffect(() => {
    // Map through bookingAddOns and set initial prices based on selectedAddOns
    const initialPrices = selectedAddOns.map(bookingAddOn => {
      const selectedAddon = selectedAddOns.find(addon => addon.name === bookingAddOn.name);

      return {
        name: bookingAddOn.name,
        price: selectedAddon && selectedAddon.price !== undefined && selectedAddon.price !== null && selectedAddon.price !== ''
          ? selectedAddon.price
          : '00'
      };
    }).filter(price => addOnPrices.some(selected => selected.name === price.name)); // Keep only initially selected add-ons

    setAddOnPrices(initialPrices);
  }, [selectedAddOns]);


  const toggleCheckbox = (name) => {
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

  const handleSelectService = (service) => {
    // setSelectedService(service.name); // Set selected radio button
    setServicePrices({ name: service.name, price: service.price }); // Update price
  };

  const updatePrice = (name, newPrice) => {
    setAddOnPrices(prevPrices =>
      prevPrices.map(addon =>
        addon.name === name
          ? { ...addon, price: newPrice } // Update the price while keeping the other properties
          : addon // Keep the other addons unchanged
      )
    );
  };



  useEffect(() => {
    console.log(selectedAddOns); // Verify add-ons data
    console.log(addOnPrices); // Verify add-on prices state
  }, [selectedAddOns, addOnPrices]);


  useEffect(() => {
    // Calculate the total add-on prices
    const addOnsTotal = addOnPrices.reduce((sum, addon) => {
      return sum + (parseFloat(addon.price) || 0); // Use parseFloat to ensure numbers are summed correctly
    }, 0);

    const servicePricceee = servicePrices.price

    const updatedTotalAmount = (parseInt(item.total_price, 10) + parseInt(servicePricceee, 10) + parseInt((addOnsTotal * item.pets.length), 10)).toFixed(2);
    setTotalAmount(updatedTotalAmount);

    const updatedBidingAmount = (updatedTotalAmount - (updatedTotalAmount * (parseInt(discountPercentage || 0) / 100))).toFixed(2);
    setBidingAmount(updatedBidingAmount);

    const discountPrice = (updatedTotalAmount * (parseInt(discountPercentage || 0) / 100)).toFixed(2);
    setDiscountPrice(discountPrice);

    const updatedPlatformChargeAmount = ((updatedBidingAmount * platformPercentage) / 100).toFixed(2);
    setPlatformChargeAmount(updatedPlatformChargeAmount);

    const updatedReceivableAmount = (updatedBidingAmount - updatedPlatformChargeAmount).toFixed(2);
    setReceivableAmount(updatedReceivableAmount);


  }, [addOnPrices, selectedServices, discountPercentage, servicePrices]);

  const Morning_walk = ({ item, selectedDates, onSelectItem }) => {
    const isSelected = selectedDates.includes(item.date);

    return (
      <View>
        <View style={globle_Style.walk_selt_time}>
          <TouchableOpacity
            style={[
              globle_Style.walk_selt_time_itm,
              isSelected && { backgroundColor: '#E96169' }
            ]}
            onPress={() => onSelectItem(item.date)}
          >
            <Text style={[
              globle_Style.popup_txt_para,
              isSelected && { color: 'white' }
            ]}>
              {item.date}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Afternoon_walk = ({ item, selectedDates, onSelectItem }) => {
    const isSelected = selectedDates.includes(item.date);

    return (
      <View>
        <View style={globle_Style.walk_selt_time}>
          <TouchableOpacity
            style={[
              globle_Style.walk_selt_time_itm,
              isSelected && { backgroundColor: '#E96169' }
            ]}
            onPress={() => onSelectItem(item.date)}
          >
            <Text style={[
              globle_Style.popup_txt_para,
              isSelected && { color: 'white' }
            ]}>
              {item.date}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Evening_walk = ({ item, selectedDates, onSelectItem }) => {
    const isSelected = selectedDates.includes(item.date);

    return (
      <View>
        <View style={globle_Style.walk_selt_time}>
          <TouchableOpacity
            style={[
              globle_Style.walk_selt_time_itm,
              isSelected && { backgroundColor: '#E96169' }
            ]}
            onPress={() => onSelectItem(item.date)}
          >
            <Text style={[
              globle_Style.popup_txt_para,
              isSelected && { color: 'white' }
            ]}>
              {item.date}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const validatePrices = (services) => {
    const invalidServices = services.filter(
      (service) =>
        !service.price || // Check for empty, null, or undefined
        parseFloat(service.price) <= 0 // Check for invalid prices
    );

    if (invalidServices.length > 0) {
      console.log("Invalid prices found:", invalidServices);
      return false;
    }

    console.log("All prices are valid.");
    return true;
  };



  const createQuotationApi = async () => {

    console.warn("ADDONSSSSSS ::: ", addOnPrices)
    //M22IQ6Z3VQQHT
    // return
    if (isDisabled) return; // Prevent the action if disabled

    if (!validatePrices(addOnPrices)) {
      setAddOnsValidation(true);
      console.error("Validation failed: Prices must be greater than 0.");
      return
    }

    if (discountPercentage > 30) {
      // console.warn("Discount percentage cannot exceed 30%");
      setDiscountValidation(true)
      return
    }

    // return
    setIsDisabled(true);

    if (isEdit) {

      try {
        const url = `${API_BASE_URL}provider/updateQotation`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${userData.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quotation_id: item.quotation_id,
            booking_id: item.booking_id,
            provider_id: userData.id,
            service_id: '4',
            actual_amount: totalAmount,
            bid_amount: bidingAmount,
            discount: discountPercentage,
            extra_price: '',
            addons: addOnPrices,
            platform_charges: platformChargeAmount,
            sp_timings: preferable_time,
            discount_amount: discountPrice
          }),
        });

        const result = await response.json();

        if (result.status == true) {
          Alert.alert("Success!!", "Quotation has been edited successfully.", [
            { text: "OK", onPress: () => navigation.goBack() }
          ]);
          setIsDisabled(false);
          console.warn("SAHILLL222", result)
        } else {

          setIsDisabled(false);
          Alert.alert("OOPS!!", "Quotation already exists.", [
            { text: "OK", onPress: () => navigation.goBack() }
          ]);
          console.warn("SAHILLL222", result)
        }

      } catch (error) {
        setIsDisabled(false);
        console.warn("SAHILLL111", error)
      }

    } else {

      const data = {
        booking_id: item.booking_id,
        provider_id: userData.id,
        service_id: '2',
        actual_amount: totalAmount,
        bid_amount: bidingAmount,
        discount: discountPercentage,
        extra_price: '',
        addons: addOnPrices,
        platform_charges: platformChargeAmount,
        sp_timings: preferable_time,
        type: "",
        discount_amount: discountPrice,
        service_mode: servicePrices.name
      }

      console.warn("PAYLOAADD :::: ", data)
      // return

      try {
        const url = `${API_BASE_URL}provider/createQotation`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${userData.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            booking_id: item.booking_id,
            provider_id: userData.id,
            service_id: '2',
            actual_amount: totalAmount,
            bid_amount: bidingAmount,
            discount: discountPercentage,
            extra_price: '',
            addons: addOnPrices,
            platform_charges: platformChargeAmount,
            sp_timings: preferable_time,
            type: "",
            discount_amount: discountPrice,
            service_mode: servicePrices.name
          }),
        });

        const result = await response.json();

        if (result.status == true) {
          Alert.alert("Success!!", "Quotation has been sent successfully.", [
            { text: "OK", onPress: () => navigation.goBack() }
          ]);
          setIsDisabled(false);
          console.warn("SAHILLL222", result)
        } else {
          Alert.alert("OOPS!!", "Quotation already exists.", [
            { text: "OK", onPress: () => navigation.goBack() }
          ]);
          setIsDisabled(false);
          console.warn("SAHILLL222", result)
        }

      } catch (error) {
        setIsDisabled(false);
        console.warn("SAHILLL222", error)
      }

    }

  };

  // pet detail render
  const petRenderItem = ({ item }) => {
    return (
      <View style={[globle_Style.acnt_con, globle_Style.walk_info_con2, { borderTopWidth: 1, }]}>
        <View style={[globle_Style.acnt_lst, globle_Style.walk_con_lst, { marginTop: 10 }]}>
          <View style={[globle_Style.acnt_itm, globle_Style.ser_dtl_lst]}>
            <Pawprint />
            <Text style={globle_Style.servc_pac_itm_txt}>Name : {item.name}</Text>
          </View>
          <View >
            {item.image ? <Image source={{ uri: item.image }}
              style={[globle_Style.my_profl_img, { width: 50, height: 50, borderRadius: 25 }]}
              resizeMode="cover" /> :
              <PetProfile style={{ width: 50, height: 50, borderRadius: 25 }} />
            }
          </View>
        </View>
        <View style={[globle_Style.acnt_lst, globle_Style.walk_con_lst]}>
          <View style={[globle_Style.acnt_itm, globle_Style.ser_dtl_lst]}>
            <Age />
            <Text style={globle_Style.servc_pac_itm_txt}>Age : {item.age}</Text>
          </View>
        </View>
        <View style={[globle_Style.acnt_lst, globle_Style.walk_con_lst]}>
          <View style={[globle_Style.acnt_itm, globle_Style.ser_dtl_lst]}>
            <Genders />
            <Text style={globle_Style.servc_pac_itm_txt}>Gender : {item.gender}</Text>
          </View>
        </View>
        <View style={[globle_Style.acnt_lst, globle_Style.walk_con_lst]}>
          <View style={[globle_Style.acnt_itm, globle_Style.ser_dtl_lst]}>
            <Vaccine />
            <Text style={globle_Style.servc_pac_itm_txt}>Vaccination : {item.vaccinated}</Text>
          </View>
        </View>
        <View style={[globle_Style.acnt_lst, globle_Style.walk_con_lst]}>
          <View style={[globle_Style.acnt_itm, globle_Style.ser_dtl_lst]}>
            <Pawprint />
            <Text style={globle_Style.servc_pac_itm_txt}>Aggression : {item.aggressiveness_level}</Text>
          </View>
        </View>
      </View>
    );
  }




  return (
    <ScrollView style={globle_Style.container}>
      <View style={globle_Style.quot_dtls_sec}>
        <View style={globle_Style.walk_info_sec}>
          <View style={[globle_Style.receive_info_sec, globle_Style.walk_con_top]}>
            <TouchableWithoutFeedback onPress={showPetDetail}>
              <View style={[globle_Style.receive_info_con, globle_Style.walk_info_con, { borderBottomWidth: 0, }]}>
                <View style={[globle_Style.receive_info_lft, globle_Style.serv_dtl_lft]}>
                  <Text style={[globle_Style.quot_dtls_hd]}>Pet Details</Text>
                </View>
                <View style={[globle_Style.receive_info_rgt]}>
                  {ispetDetail ? <UpArrow /> : <DownArrow />}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {ispetDetail && (
            <FlatList
              data={item.pets}
              renderItem={petRenderItem}
              keyExtractor={item => item.pet_id} />
          )}
        </View>


        <View style={globle_Style.quot_dtls_con}>
          <View style={globle_Style.accrd_con}>
            <TouchableWithoutFeedback onPress={showPackageDetail}>
              <View style={[globle_Style.quot_dtls_accrd_itm, { borderBottomWidth: 0, }]}>
                <Text style={globle_Style.quot_dtls_hd}>Package Detail</Text>
                {packageDetail ? <UpArrow /> : <DownArrow />}
              </View>
            </TouchableWithoutFeedback>
            {packageDetail && (
              <View>
                <View style={[globle_Style.pakg_time_con, { borderTopWidth: 1, }]}>
                  <View style={globle_Style.pakg_time_lst}>
                    {/* <View style={globle_Style.pakg_time_itm}>
                      <Text style={globle_Style.lst_dots}>•</Text>
                      <Text style={globle_Style.lst_dots_txt}> {item.service_frequency}, {item.days} days</Text>

                    </View> */}
                    <View style={globle_Style.pakg_time_itm}>
                      <Text style={globle_Style.lst_dots}>•</Text>
                      <Text style={globle_Style.lst_dots_txt}>{formatDate(item.service_start_date)}</Text>
                    </View>
                    <View style={[globle_Style.pakg_time_itm, globle_Style.edit_optn, { justifyContent: 'flexStart' }]}>
                      <View style={[globle_Style.packg_tmedit, { marginRight: 15 }]}>
                        <Text style={globle_Style.lst_dots}>•</Text>
                        <Text style={globle_Style.lst_dots_txt}>{preferable_time}</Text>
                      </View>
                      <TouchableWithoutFeedback onPress={() => setrecePopup(true)}>
                        <View style={globle_Style.packg_edit_img}>
                          <Edit />
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    {/* <View style={[globle_Style.pakg_time_itm, globle_Style.edit_optn]}>
                      <View style={globle_Style.pakg_time_itm}>
                        <Text style={globle_Style.lst_dots}>•</Text>
                        <Text style={globle_Style.lst_dots_txt}>{item.packages.map(pkg => pkg.package_name)
                          .map((name, index) => index === 2 ? '\n' + name : name) // Add newline before the third package
                          .join(', ')}</Text>
                      </View>
                      <View style={globle_Style.packg_edit_img}>
                        <Text style={globle_Style.quot_dtls_hd}>{item.total_price}</Text>
                      </View>
                    </View> */}

                  </View>


                  {/* popup start  */}
                  <Modal
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
                            <Text style={globle_Style.popup_txt_para}>Grooming Time</Text>
                          </View>
                          {/* Morning Walk */}
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
                          {/* Afternoon Walk */}
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
                          {/* Evening Walk */}
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
                        {/* Cancel and OK Buttons */}
                        <View style={globle_Style.pet_prof_btn_sec}>
                          {/* <TouchableWithoutFeedback onPress={() => setrecePopup(false)}>
                          <View style={globle_Style.popup_detl_btn}>
                            <Text style={[globle_Style.gbl_btn, globle_Style.personal_detail]}>Cancel</Text>
                          </View>
                        </TouchableWithoutFeedback> */}
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
                  </Modal>
                </View>

                {/* <View style={[globle_Style.pakg_time_con, { borderTopWidth: 0, borderBottomWidth: 1 }]}>

                  <View style={[globle_Style.pakg_time_itm, globle_Style.edit_optn, { justifyContent: 'flexStart' }]}>
                    <View style={globle_Style.pakg_time_lst}>
                      <Text style={globle_Style.quot_dtls_hd}>Package Include</Text>
                    </View>
                    
                  </View>
                  <View style={globle_Style.pakg_time_itm}>
                      <Text style={globle_Style.lst_dots}>•</Text>
                      <Text style={globle_Style.lst_dots_txt}>{formatDate(item.service_start_date)}</Text>
                    </View>
                </View> */}


                <FlatList
                  data={item.packages}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={[globle_Style.pakg_time_con, { borderTopWidth: 0, borderBottomWidth: 1 }]}>
                      <View style={[globle_Style.pakg_time_itm, globle_Style.edit_optn, { justifyContent: 'flex-start' }]}>
                        <View style={[globle_Style.pakg_time_lst, { flexDirection: 'row', justifyContent: 'space-between', }]}>
                          <Text style={[globle_Style.quot_dtls_hd, { flex: 1 }]}>{item.package_name}</Text>
                          <Text style={globle_Style.quot_dtls_hd}>{item.price}</Text>
                        </View>
                      </View>

                      {/* Nested FlatList */}
                      <FlatList
                        data={item.included_addons} // Ensure item.subItems is an array
                        keyExtractor={(subItem, subIndex) => subIndex.toString()}
                        renderItem={({ item: subItem }) => (
                          <View style={globle_Style.pakg_time_itm}>
                            <Text style={globle_Style.lst_dots}>•</Text>
                            <Text style={globle_Style.lst_dots_txt}>{subItem}</Text>
                          </View>
                        )}
                      />
                    </View>
                  )}
                />


                <View style={globle_Style.pakg_incld}>
                  <Text style={[globle_Style.quot_dtls_hd, { fontSize: 14, marginBottom: 18 }]}>
                  Add-ons requested by the client {item.pets.length > 1 ? ` (Addons cost * ${item.pets.length})` : ''}
                  </Text>



                  {selectedAddOns.map((addon, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => toggleCheckbox(addon.name)} // Toggle selection
                      style={globle_Style.packg_addon}
                    >
                      <View style={[globle_Style.packg_addon_lft, { flexDirection: 'row-reverse' }]}>
                        <Text style={[globle_Style.lst_dots_txt, { marginLeft: 12 }]}>{addon.name}</Text>
                        {addOnPrices.some(price => price.name === addon.name) ? ( // Check if the add-on is selected
                          <Image source={require('../../assets/images/green_tick.png')} />
                        ) : (
                          <View style={globle_Style.unchecked_checkbox}>
                            <Image source={require('../../assets/images/add-on.png')} />
                          </View>
                        )}
                      </View>

                      {/* <View style={globle_Style.packg_addon_rgt}>
                        {addOnPrices.some(price => price.name === addon.name) && ( // Show TextInput if selected
                          <TextInput
                            style={globle_Style.apackg_addon_txt}
                            value={addOnPrices.find(item => item.name === addon.name)?.price || ''} // Set default to empty string
                            onChangeText={(newPrice) => {
                              if (newPrice !== '') {
                                updatePrice(addon.name, newPrice); // Update price when newPrice is not empty
                              } else {
                                updatePrice(addon.name, ''); // Optionally clear price when input is empty
                              }
                            }}
                            maxLength={6}
                            keyboardType="numeric"
                          />
                        )}
                      </View> */}
                      <View style={globle_Style.packg_addon_rgt}>
                        {addOnPrices.some(price => price.name === addon.name) && ( // Show TextInput if selected
                          <TextInput
                            style={globle_Style.apackg_addon_txt}
                            value={addOnPrices.find(item => item.name === addon.name)?.price || ''} // Set default to empty string
                            onChangeText={(newPrice) => {
                              if (newPrice !== '') {
                                updatePrice(addon.name, newPrice); // Update price when newPrice is not empty
                              } else {
                                updatePrice(addon.name, ''); // Optionally clear price when input is empty
                              }
                            }}
                            editable={false}
                            maxLength={6}
                            keyboardType="numeric"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                  {addOnsValidation && <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>please add add-ons cost or deselect</Text>}

                </View>

                <View style={[globle_Style.pakg_time_con, { marginBottom: 18 }]}>
                  <Text style={[globle_Style.quot_dtls_hd, { fontSize: 14, marginBottom: 18 }]}>
                    Service:
                  </Text>

                  {/* {services.map((service, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSelectService(service)} // Toggle selection
                      style={globle_Style.packg_addon}
                    >
                      <View style={[globle_Style.packg_addon_lft, { flexDirection: 'row-reverse' }]}>
                        <Text style={[globle_Style.lst_dots_txt, { marginLeft: 12 }]}>{service.name}</Text>
                        {servicePrices.some(price => price.name === service.name) ? ( // Check if the add-on is selected
                          <Image source={require('../../assets/images/green_tick.png')} />
                        ) : (
                          <View style={globle_Style.unchecked_checkbox}>
                            <Image source={require('../../assets/images/add-on.png')} />
                          </View>
                        )}
                      </View>

                      <View style={globle_Style.packg_addon_rgt}>
                        {servicePrices.some(price => price.name === service.name) && ( // Show TextInput if selected
                          <TextInput
                            style={globle_Style.apackg_addon_txt}
                            value={servicePrices.find(item => item.name === service.name)?.price || ''} // Set default to empty string
                            editable={false}
                            maxLength={6}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))} */}


                  {services.map((service, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSelectService(service)} // Toggle selection
                      style={globle_Style.packg_addon}
                    >
                      <View style={[globle_Style.packg_addon_lft, { flexDirection: 'row-reverse' }]}>
                        <Text style={[globle_Style.lst_dots_txt, { marginLeft: 12 }]}>{service.name.charAt(0).toUpperCase() + service.name.slice(1).replace('_', ' ')}</Text>
                        {servicePrices?.name === service.name ? ( // Check if selected
                          <Image source={require('../../assets/images/green_tick.png')} />
                        ) : (
                          <View style={globle_Style.unchecked_checkbox}>
                            <Image source={require('../../assets/images/add-on.png')} />
                          </View>
                        )}
                      </View>

                      <View style={globle_Style.packg_addon_rgt}>
                        {servicePrices?.name === service.name && ( // Show TextInput only for selected service
                          <TextInput
                            style={globle_Style.apackg_addon_txt}
                            value={servicePrices?.price === '0' ? '00' : servicePrices?.price || ''} // Set default to empty string
                            editable={false}
                            maxLength={6}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}


                </View>


                <View style={[globle_Style.pakg_totl_amt, { paddingTop: 0 }]}>
                  <View style={globle_Style.pakg_totl_con}>
                    <Text style={globle_Style.quot_dtls_hd}>Total Package Cost</Text>
                    <Text style={globle_Style.quot_dtls_hd}>{totalAmount}</Text>
                  </View>
                  <View style={globle_Style.pakg_totl_con}>
                    <View>
                      <Text style={globle_Style.quot_dtls_hd}>Do you want to offer a discount</Text>
                      <Text style={globle_Style.discont_txt}>Discount can help to win a job</Text>
                    </View>
                    <View style={globle_Style.discont_opt}>
                      {/* <Text style={globle_Style.discont_opttxt}>30%</Text> */}
                      <TextInput
                        style={[globle_Style.discont_opttxt, { postion: 'absolute', top: 2.9 }]}
                        placeholder="00"
                        editable={true}
                        keyboardType="numeric"
                        value={discountPercentage}
                        onChangeText={(text) => {
                          const cleanedText = text.replace(/[^0-9]/g, ''); 
                          setDiscountPercentage(cleanedText);
                        }}
                        maxLength={2}
                      />
                      <Text style={[globle_Style.discont_opttxt, { marginEnd: 5 }]}>%</Text>
                      {/* <DownArrow /> */}
                    </View>

                  </View>
                  <View style={globle_Style.pakg_totl_con}>
                    <Text style={globle_Style.quot_dtls_hd}>Your Bidding Amount</Text>
                    <Text style={globle_Style.quot_dtls_hd}>{bidingAmount}</Text>
                  </View>
                  <View style={globle_Style.pakg_totl_con}>
                    <Text style={globle_Style.quot_dtls_hd}>Platform Charges({platformPercentage}%)</Text>
                    <Text style={globle_Style.quot_dtls_hd}>{platformChargeAmount}</Text>
                  </View>
                  <View style={globle_Style.pakg_totl_con}>
                    <Text style={globle_Style.quot_dtls_hd}>Your Receivable Amount</Text>
                    <Text style={globle_Style.quot_dtls_hd}>{receivableAmount}</Text>
                  </View>
                </View>

              </View>
            )}
          </View>
        </View>

        {discountValidation && <Text style={[globle_Style.errorText, { paddingHorizontal: 5, }]}>The discount cannot exceed 30%.</Text>}


        <TouchableWithoutFeedback onPress={() => createQuotationApi()}>
          <View style={globle_Style.globle_btn}>
            <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.globle_btn, , { opacity: isDisabled ? 0.5 : 1 }]}>
              <Text style={globle_Style.gbl_btn}>Submit</Text>
            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>


      </View >

    </ScrollView >
  );
}



export default GroomingQuoteDetails;
