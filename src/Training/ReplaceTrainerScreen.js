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
import PetProfile from '../../assets/images/petProfile.svg'
import CloseSkill from '../../assets/images/closeskill.svg'
import Tick from '../../assets/images/tick.svg'
import AddSkill from '../../assets/images/addskill.svg'
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
const dog1Commands = ['Come', 'Down', 'Leash Walk', 'Potty'];
const dog2command = ['Come', 'Down', 'Leash Walk', 'Potty', 'Down', 'Leash Walk', 'Potty']

const ReplaceTrainerScreen = ({ route }) => {
    const [recePopup, setrecePopup] = useState(false)
    const { item, isEdit } = route.params;
    const { userData } = useContext(UserContext);

    const [selectedAddOns, setSelectedAddOns] = useState(item.addons);
    const [service_frequency, setServiceFrequency] = useState(item.service_frequency);
    const [preferable_time, setPreferableTime] = useState(item.preferable_time.split(','));
    const [selectedServices, setSelectedServices] = useState([]);

    const [addOnPrices, setAddOnPrices] = useState(item.addons);
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
    const [slotError, setSlotError] = useState(false);

    // skill popup 
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skillpopup, setSkillpopup] = useState(false)
    const [missingSkills, setMissingSkills] = useState(item.missingSkills);
    const [extraDays, setExtraDays] = useState(item.extra_sessions);
    const skills = [
        { name: 'Over Excitement' },
        { name: 'Socilazitation' },
        { name: 'Jumping Control' },
        { name: 'Puppy Biting' },
        { name: 'Excessive Barking' },
        { name: 'Hi Fi' },
        { name: 'Create Training' },
        { name: 'Shake Hand' },
    ];

    const toggleSkill = (index) => {
        if (selectedSkills.includes(index)) {
            setSelectedSkills(selectedSkills.filter(i => i !== index));
        } else {
            setSelectedSkills([...selectedSkills, index]);
        }
    };





    const showPetDetail = () => {
        setIspetDetail(!ispetDetail)
    };
    const showPackageDetail = () => {
        setPackageDetail(!packageDetail)
    }

    const handleSelectItem = (date) => {
        setPreferableTime(() => [date]);
    };


    const handleTimeSlot = () => {
        // switch (service_frequency) {
        //     case 'once a day':
        //         walkPerDay = 1;
        //         break;
        //     case 'twice a day':
        //         walkPerDay = 2;
        //         break;
        //     case 'thrice a day':
        //         walkPerDay = 3;
        //         break;
        //     default:
        //         walkPerDay = 0;
        //         break;
        // }
        walkPerDay = 1

        if (walkPerDay == 1) {
            if (preferable_time.length != 1) {
                setSlotError(true)
                return
            }
        } else if (walkPerDay == 2) {
            if (preferable_time.length != 2) {
                setSlotError(true)
                return
            }
        } else if (walkPerDay == 3) {
            if (preferable_time.length != 3) {
                setSlotError(true)
                return
            }
        }

        setrecePopup(false)



        // Helper function to generate range of weekdays (Mon-Sat)


    }


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
                setExtraDays(extraDays - 2)
                // Remove the addon if it is already selected
                return prevSelected.filter(addon => addon.name !== name);
            } else {
                // Find the price for the addon by looking it up in selectedAddOns
                const addon = selectedAddOns.find(addon => addon.name === name);
                const price = addon ? addon.price : '00'; // Default to '00' if not found

                // Check if the price is undefined and set it to '00' if so
                const finalPrice = price === undefined ? '00' : price;

                setExtraDays(extraDays + 2)
                // Add the selected addon with the determined price
                return [...prevSelected, { name, price: finalPrice }];
            }
        });
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

        const updatedTotalAmount = (parseInt(item.total_price, 10) + parseInt((addOnsTotal * item.pets.length), 10)).toFixed(2);
        setTotalAmount(updatedTotalAmount);

        const updatedBidingAmount = (updatedTotalAmount - (updatedTotalAmount * (parseInt(discountPercentage || 0) / 100))).toFixed(2);
        setBidingAmount(updatedBidingAmount);

        const discountPrice = (updatedTotalAmount * (parseInt(discountPercentage || 0) / 100)).toFixed(2);
        setDiscountPrice(discountPrice);

        const updatedPlatformChargeAmount = ((updatedBidingAmount * platformPercentage) / 100).toFixed(2);
        setPlatformChargeAmount(updatedPlatformChargeAmount);

        const updatedReceivableAmount = (updatedBidingAmount - updatedPlatformChargeAmount).toFixed(2);
        setReceivableAmount(updatedReceivableAmount);


    }, [addOnPrices, selectedServices, discountPercentage]);

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
        // setSkillpopup(true)
        // return
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
                        service_id: '3',
                        actual_amount: totalAmount,
                        bid_amount: bidingAmount,
                        discount: discountPercentage,
                        extra_price: '',
                        addons: addOnPrices,
                        platform_charges: platformChargeAmount,
                        sp_timings: preferable_time,
                        type: "",
                        discount_amount: discountPrice,
                        extra_sessions: extraDays,
                        service_mode: trainingMethod
                    }),
                });

                const result = await response.json();

                if (result.status == true) {
                    const remainingSkills = missingSkills.filter(skill => !selectedSkills.includes(skill));
                    setMissingSkills(remainingSkills)
                    setSelectedSkills([])
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

    const [trainingmethodRadio, setTrainingMethodRadio] = useState(0)
    const [trainingMethod, setTrainingMethod] = useState('')
    const handleRadio = (index, value, setState, setStateValue) => {
        setState(index)
        setStateValue(value)
    }

    useEffect(() => {
        const selected = item.service.find(item => item.type === true);
        if (selected) {
            if (selected.name === 'every_day') {
                setTrainingMethodRadio(1);
                setTrainingMethod('every_day');
            } else if (selected.name === 'alternative_day') {
                setTrainingMethodRadio(2);
                setTrainingMethod('alternative_day');
            }
        }
    }, [item]);



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
                                        <View style={globle_Style.pakg_time_itm}>
                                            <Text style={globle_Style.lst_dots}>•</Text>
                                            <Text style={globle_Style.lst_dots_txt}>{item.package_name}</Text>

                                        </View>
                                        <View style={globle_Style.pakg_time_itm}>
                                            <Text style={globle_Style.lst_dots}>•</Text>
                                            <Text style={globle_Style.lst_dots_txt}>{formatDate(item.service_start_date)}</Text>
                                        </View>
                                        <View style={[globle_Style.pakg_time_itm, globle_Style.edit_optn, { justifyContent: 'flexStart' }]}>
                                            <View style={[globle_Style.packg_tmedit, { marginRight: 15 }]}>
                                                <Text style={globle_Style.lst_dots}>•</Text>
                                                <Text style={globle_Style.lst_dots_txt}>{preferable_time.join(', ')}</Text>
                                            </View>
                                            <TouchableWithoutFeedback onPress={() => {
                                                setSlotError(false)
                                                setrecePopup(true)
                                            }}>
                                                <View style={globle_Style.packg_edit_img}>
                                                    <Edit />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                        <View style={[globle_Style.pakg_time_itm, globle_Style.edit_optn]}>
                                            {/* <View style={globle_Style.packg_tmedit}>
                        <Text style={globle_Style.lst_dots}>•</Text>
                        <Text style={globle_Style.lst_dots_txt}>Live Tracking</Text>
                        </View> */}
                                            {/* <View style={globle_Style.pakg_time_itm}>
                        <Text style={globle_Style.lst_dots}>•</Text>
                        <Text style={globle_Style.lst_dots_txt}>Each Walk -{item.walk_duration}</Text>

                      </View>
                      <View style={globle_Style.packg_edit_img}>
                        <Text style={globle_Style.quot_dtls_hd}>{item.total_price}</Text>
                      </View> */}
                                        </View>
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
                                                        <Text style={globle_Style.popup_txt_para}>Training time</Text>
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
                                                    {slotError && <Text style={[globle_Style.errorText, { marginBottom: 10, textAlign: 'center' }]}>Please choose time slots based on frequency</Text>
                                                    }
                                                </View>
                                                {/* Cancel and OK Buttons */}
                                                <View style={globle_Style.pet_prof_btn_sec}>
                                                    {/* <TouchableWithoutFeedback onPress={() => setrecePopup(false)}>
                          <View style={globle_Style.popup_detl_btn}>
                            <Text style={[globle_Style.gbl_btn, globle_Style.personal_detail]}>Cancel</Text>
                          </View>
                        </TouchableWithoutFeedback> */}
                                                    <TouchableWithoutFeedback onPress={() => handleTimeSlot()}>
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

                                <View style={[globle_Style.pakg_time_con, { borderTopWidth: 0, borderBottomWidth: 1 }]}>
                                    <View style={[globle_Style.pakg_time_itm, globle_Style.edit_optn, { justifyContent: 'flex-start' }]}>
                                        <View style={[globle_Style.pakg_time_lst, { flexDirection: 'row', justifyContent: 'space-between', }]}>
                                            <Text style={[globle_Style.quot_dtls_hd, { fontSize: 14, flex: 1 }]}>Package Includes</Text>
                                            <Text style={globle_Style.quot_dtls_hd}>{item.total_price}</Text>
                                        </View>
                                    </View>
                                    {/* dog command 1  */}
                                    <View>
                                        {/* <View style={globle_Style.card}>
                                            <View style={globle_Style.header}>
                                                <Text style={globle_Style.title}>Dog 1 Commands</Text>
                                                <Text style={globle_Style.price}>1999</Text>
                                            </View>
                                            <View style={globle_Style.commandsRow}>
                                                {dog1Commands.map((cmd, index) => (
                                                    <View key={index} style={globle_Style.commandItem}>
                                                        <Image source={require('../../assets/images/green-ticks.png')} style={{marginRight:4}} />
                                                        <Text style={globle_Style.commandText}>{cmd}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View> */}

                                        <FlatList
                                            data={item.pets}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => (
                                                <View style={globle_Style.card}>
                                                    <View style={globle_Style.header}>
                                                        <Text style={globle_Style.title}>{item.name} Commands</Text>
                                                        {/* <Text style={globle_Style.price}>{item.price}</Text> */}
                                                    </View>
                                                    <View style={globle_Style.commandsRow}>
                                                        {item.included_addons.map((cmd, index) => (
                                                            <View key={index} style={globle_Style.commandItem}>
                                                                <Image source={require('../../assets/images/green-ticks.png')} style={{ marginRight: 4 }} />
                                                                <Text style={globle_Style.commandText}>{cmd}</Text>
                                                            </View>
                                                        ))}
                                                    </View>
                                                </View>
                                            )}
                                        />

                                    </View>
                                    {/* Nested FlatList */}
                                    {/* <FlatList
                                        data={item.included_addons} // Ensure item.subItems is an array
                                        keyExtractor={(subItem, subIndex) => subIndex.toString()}
                                        renderItem={({ item: subItem }) => (
                                            <View style={globle_Style.pakg_time_itm}>
                                                <Text style={globle_Style.lst_dots}>•</Text>
                                                <Text style={globle_Style.lst_dots_txt}>{subItem}</Text>
                                            </View>
                                        )}
                                    /> */}
                                </View>



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
                                                <Text style={[globle_Style.lst_dots_txt, { marginLeft: 12, }, addon.name.length > 15 && { maxWidth: 180, flexShrink: 1 }]} numberOfLines={1} ellipsizeMode='tail' >{addon.name}</Text>
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

                                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: "center", alignItems: 'center' }} >
                                        <Text style={[globle_Style.quot_dtls_hd, { fontSize: 14, }]}>
                                            No of extra days
                                        </Text>

                                        <TextInput
                                            style={[globle_Style.apackg_addon_txt, { width: 80, height: 40, textAlign: 'center', borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 5 }]}
                                            value={extraDays.toString()} // Set default to empty string
                                            editable={false}
                                        />

                                    </View>


                                    {/* <View style={[globle_Style.radio_con, { marginVertical: 20 }]}>
                    <TouchableWithoutFeedback onPress={() => handleRadio(1, 'every_day', setTrainingMethodRadio, setTrainingMethod)}>
                      <View style={[globle_Style.radioWapper, trainingmethodRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                        <View style={globle_Style.stardp_con}>
                          <Text style={globle_Style.rdo_txt}>Every day</Text>
                        </View>

                        <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, trainingmethodRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                          {
                            trainingmethodRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                          }
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleRadio(2, 'alternative_day', setTrainingMethodRadio, setTrainingMethod)}>
                      <View style={[globle_Style.radioWapper, trainingmethodRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                        <View style={globle_Style.stardp_con}>
                          <Text style={globle_Style.rdo_txt}>Alternate days</Text>
                        </View>

                        <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, trainingmethodRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                          {
                            trainingmethodRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                          }
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View> */}
                                    <View style={[globle_Style.radio_con, { marginVertical: 20 }]}>
                                        <TouchableWithoutFeedback onPress={() => handleRadio(1, 'every_day', setTrainingMethodRadio, setTrainingMethod)}>
                                            <View style={[globle_Style.radioWapper, { borderRadius: 40 }, trainingmethodRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper, { borderRadius: 40, flexDirection: 'column', justifyContent: 'center' }]}>
                                                <View style={globle_Style.stardp_con}>
                                                    <Text style={globle_Style.rdo_txt}>Every day</Text>
                                                </View>

                                                {/* <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, trainingmethodRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
              {
                trainingmethodRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
              }
            </View> */}
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => handleRadio(2, 'alternative_day', setTrainingMethodRadio, setTrainingMethod)}>
                                            <View style={[globle_Style.radioWapper, trainingmethodRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper, { borderRadius: 40, flexDirection: 'column', justifyContent: 'center' }]}>
                                                <View style={globle_Style.stardp_con}>
                                                    <Text style={globle_Style.rdo_txt}>Alternate days</Text>
                                                </View>

                                                {/* <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, trainingmethodRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
              {
                trainingmethodRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
              }
            </View> */}
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>


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

            {/* skill popup content  */}
            <Modal animationType="slide"
                transparent={true}
                visible={skillpopup} onRequestClose={() => {
                    setSkillpopup(!skillpopup);
                }}
            >
                <View style={[globle_Style.popup, { backgroundColor: '#000000E0' }]}>
                    <View style={[globle_Style.skilltrain]}>
                        <View style={globle_Style.skillpopup}>
                            <View style={globle_Style.skillpopup_con}>
                                <Text style={globle_Style.skillpopup_hd}>This skill isn’t in your profile</Text>
                                <Text style={globle_Style.skillpopup_para}>
                                    Add this skill to your profile or remove it before sending the quotation.
                                </Text>

                                <View style={globle_Style.skill_info}>
                                    <FlatList
                                        data={missingSkills}
                                        keyExtractor={(item, index) => index.toString()}
                                        numColumns={2}
                                        contentContainerStyle={globle_Style.skillpopup_lst}
                                        renderItem={({ item, index }) => {
                                            const isActive = selectedSkills.includes(index);
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => toggleSkill(index)}
                                                    style={[
                                                        globle_Style.skillpopup_itm,
                                                        index % 2 === 1 && { marginRight: 0 },
                                                        isActive && { backgroundColor: '#FE8705' }
                                                    ]}
                                                >
                                                    <Text style={[
                                                        globle_Style.skillpopup_itmtxt,
                                                        isActive && { color: 'white' }, item.name.length > 18 && { maxWidth: 80, flexShrink: 1 }
                                                    ]} >
                                                        {item.name}
                                                    </Text>
                                                    <Image
                                                        source={
                                                            isActive
                                                                ? require('../../assets/images/closeskill.png')
                                                                : require('../../assets/images/addskill.png')
                                                        }
                                                        style={{ width: 16, height: 16, resizeMode: 'contain' }}
                                                    />
                                                </TouchableOpacity>
                                            );
                                        }}
                                    />
                                </View>
                                <View style={[]}>

                                    <View style={globle_Style.skill_update}>
                                        {/* <View style={globle_Style.popbtn}>
                      <TouchableOpacity onPress={() => setSkillpopup(false)}>
                        <View style={[globle_Style.globle_btn, globle_Style.popbtn, { backgroundColor: '#D9D9D9' }]}>
                          <Text style={[globle_Style.gbl_btn]}>Cancel</Text>
                        </View>
                      </TouchableOpacity>
                    </View> */}
                                        <View style={[globle_Style.popbtn, { marginRight: 20 }]}>
                                            <TouchableOpacity onPress={() => setSkillpopup(false)}>
                                                <View style={[globle_Style.globle_btn, { backgroundColor: '#D9D9D9', }]}>
                                                    <Text style={[globle_Style.gbl_btn]}>Cancel</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={globle_Style.popbtn}>
                                            <TouchableOpacity>
                                                {/* <View style={[globle_Style.globle_btn, { backgroundColor: '#FBAB51', }]}> */}
                                                <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={[globle_Style.globle_btn,]}>

                                                    <Text style={[globle_Style.gbl_btn]}>Update</Text>
                                                </LinearGradient>
                                                {/* </View> */}
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                </View >
            </Modal >




        </ScrollView >
    );
}



export default ReplaceTrainerScreen;
