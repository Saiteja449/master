import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  FlatList,
  Alert,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';
import globle_Style from '../css/globle_Style';
import Wallet from '../../assets/images/wallet_img .svg';
import WalletFilter from '../../assets/images/wallet_filter.svg';
import DogWalk from '../../assets/images/dogwalk.svg';
import DogGroom from '../../assets/images/doggroom.svg';
import BankDetail from '../../assets/images/bankDetail.svg';
import AddBank from '../../assets/images/add_bank.svg';
import ClosePopup from '../../assets/images/close_popup.svg';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constants/constant';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const walletTransaction = [
  {
    id: '1',
    icon: <DogWalk />,
    title: 'Shetty for dog walking',
    time: '01 Nov, 02:58 pm',
    amount: '+₹154',
    backgroundColor: '#F5D3C8',
  },
  {
    id: '2',
    icon: <DogGroom />,
    title: 'Manisha for dog grooming',
    time: '01 Nov, 02:58 pm',
    amount: '+₹230',
    backgroundColor: '#D7FDFF',
  },
  {
    id: '3',
    icon: <DogWalk />,
    title: 'Shetty for dog walking',
    time: '01 Nov, 02:58 pm',
    amount: '+₹154',
    backgroundColor: '#F5D3C8',
  },
  {
    id: '4',
    icon: <DogGroom />,
    title: 'Shetty for dog walking',
    time: '01 Nov, 02:58 pm',
    amount: '+₹230',
    backgroundColor: '#D7FDFF',
  },
];

const WalletTransactionItem = ({ title, time, amount, item }) => {
  return (
    <View style={globle_Style.noti_lst}>
      <View
        style={[
          globle_Style.noti_lst_lft,
          { backgroundColor: '#F5D3C8', marginLeft: 0 },
        ]}
      >
        {/* {icon} */}
        <DogWalk />
      </View>
      <View style={globle_Style.noti_lst_rgt}>
        <View style={globle_Style.noti_lst_info}>
          <Text style={[globle_Style.noti_lst_txt, { fontSize: 12 }]}>
            {title}
          </Text>
          <Text style={globle_Style.noti_time_txt}>{time}</Text>
        </View>
        <View style={globle_Style.noti_lst_amont}>
          <Text
            style={[
              globle_Style.noti_amont_txt,
              {
                color:
                  item.transaction_type === 'debit' ? '#EC131F' : '#00BC71',
              },
              { fontSize: 13 },
            ]}
          >
            {item.transaction_type === 'debit' ? '-' : '+'} {amount}
          </Text>
        </View>
      </View>
    </View>
  );
};

const WalletScreen = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [inServiceAmount, setInServiceAmount] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [bank, setBank] = useState(true);
  const [paymntStatus, setPaymntStatus] = useState('');
  const navigation = useNavigation();
  const [bankSelectPopup, setBankSelectPopup] = useState(false);
  const [selectRadio, setselectedRadio] = useState(-1);
  const [bankDetails, setBankDetails] = useState([]);
  const [bankId, setBankId] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      fetchApiData();
      fetchBankData();
      setBankSelectPopup(false);
      return () => console.log('Screen unfocused');
    }, []),
  );

  const fetchApiData = async () => {
    let userData = '';
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }
    const url = `${API_BASE_URL}provider/${userData.id}/wallet`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result) {
        console.warn(result);
        setWithdrawalAmount(result.withdrawal_amount);
        setInServiceAmount(result.service_wallet);
        setTransactions(result.transactions);
        setBank(result.banks);
        setPaymntStatus(result.withdrawal_status);
      } else {
        console.warn('ELSEEE :: ', result);
      }
    } catch (error) {
      console.warn('Network request failed :: ', error);
    }
  };

  const fetchBankData = async () => {
    let userData = '';
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }
    const url = `${API_BASE_URL}provider/${userData.id}/banks`;
    // const url = `https://cmschamps.com/petsfolio/api/provider/307/banks`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          // 'Authorization': `Bearer 5df16843fb47041c63db73c8c3a99449`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.status) {
        setBankDetails(result.data);
        console.warn(result);

        // setSPDetails(result.data);
      } else {
        // setIsLoading(false)
        console.warn('ELSEEE :: ', result);
      }
    } catch (error) {
      console.warn('Network request failed :: ', error);
    }
  };

  const withdrawAmount = async () => {
    if (!bank) {
      Alert.alert(
        'Add bank account to withdraw!!',
        'Please add bank details to withdraw.',
        [{ text: 'Add', onPress: () => navigation.navigate('Bank Details') }],
      );
      return;
    }

    if (bankId === '') {
      Alert.alert(
        'Select bank account!!',
        'Please select bank account to withdraw.',
        [{ text: 'OK' }],
      );
      return;
    }

    if (withdrawalAmount <= 0) {
      Alert.alert('Insufficient balance!!', 'You can not withdraw amount.', [
        { text: 'OK' },
      ]);
      return;
    }

    if (paymntStatus === 'in_progress') {
      Alert.alert(
        'Withdrawal is in progress!!',
        'It will be initiated within 24-48hrs to your bank account.',
        [{ text: 'OK' }],
      );
      return;
    }

    let userData = '';
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }

    try {
      const url = `${API_BASE_URL}provider/withdrawAmount`;
      let result = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: withdrawalAmount,
          provider_id: userData.id,
          bank_id: bankId,
        }),
      });
      result = await result.json();
      if (result.status == true) {
        setBankSelectPopup(false);
        navigation.navigate('verifyBankOtp', {
          amount: withdrawalAmount,
          number: userData.phone,
        });
        console.warn('Withraw request sent successfully!!');
      } else {
        console.error('Error ', 'Enable to withdrawSSSS', result);
      }
    } catch (error) {
      console.error('Error during withdraw:', error);
    }
  };

  const BankView = ({ item, index }) => {
    return (
      <View style={globle_Style.serv_rad_wrapp}>
        <TouchableWithoutFeedback onPress={() => handleSelectBank(item.id)}>
          <View
            style={[
              globle_Style.radioWapper,
              { height: 'auto', marginLeft: 16 },
              selectRadio === item.id
                ? globle_Style.active_wrapper
                : globle_Style.radioWapper,
              { height: 'auto', marginLeft: 16 },
            ]}
          >
            <View style={globle_Style.bank_info}>
              <View style={globle_Style.bank_infoname}>
                <View style={globle_Style.bank_img}>
                  <BankDetail />
                </View>
                <View style={globle_Style.bank_accontname}>
                  <Text style={globle_Style.bank_acconttxt}>
                    {formatNumber(item.account_number)}
                  </Text>
                  <Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>
                    {item.bank_name}
                  </Text>
                </View>
              </View>
              <View style={globle_Style.bank_code}>
                <View style={globle_Style.bank_codelft}>
                  <Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>
                    IFSC
                  </Text>
                  <Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>
                    Beneficiary
                  </Text>
                </View>
                <View style={globle_Style.bank_codergt}>
                  <Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>
                    : {item.ifsc_code}
                  </Text>
                  <Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>
                    : {item.account_holder_name}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                globle_Style.static_radio_circle,
                globle_Style.radio_static,
                selectRadio === item.id
                  ? globle_Style.static_radio_circle
                  : globle_Style.radio_static,
              ]}
            >
              {selectRadio === item.id ? (
                <View style={globle_Style.radio_bg}></View>
              ) : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const handleSelectBank = bankId => {
    setselectedRadio(bankId);
    setBankId(bankId);
    console.warn('Bank ID :: ', bankId);
  };

  const formatNumber = number => {
    const numString = number; // Convert the number to a string
    const lastFourDigits = numString.slice(-4); // Get the last 4 digits
    const maskedPart = 'X'.repeat(numString.length - 4); // Replace the rest with 'x'
    return `${maskedPart}${lastFourDigits}`;
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={globle_Style.container}
    >
      <View
        style={[
          globle_Style.wallet_sec,
          Platform.OS === 'android'
            ? { paddingVertical: 20, paddingHorizontal: 16 }
            : {},
        ]}
      >
        <View style={globle_Style.wallet_con}>
          <LinearGradient
            colors={['#2455D8', '#8244E2', '#E732EC']}
            start={{ x: 1, y: 0 }}
            style={globle_Style.wallet_grad}
          >
            <View style={globle_Style.wallet_lin_con}>
              <View style={globle_Style.wallet_lin_lft}>
                <Text style={globle_Style.wallet_balnc_txt}>Total Balance</Text>
                <Text style={globle_Style.wallet_amont_txt}>
                  ₹{' '}
                  {(
                    parseFloat(withdrawalAmount) +
                    parseFloat(inServiceAmount.service_amount)
                  ).toFixed(2)}
                </Text>

                <Text style={globle_Style.wallet_balnc_txt}>
                  In Service Balance
                </Text>
                <Text style={globle_Style.wallet_amont_txt}>
                  ₹ {parseFloat(inServiceAmount.service_amount).toFixed(2)}
                </Text>

                <Text style={globle_Style.wallet_balnc_txt}>
                  Wallet Balance
                </Text>
                <Text style={globle_Style.wallet_amont_txt}>
                  ₹ {parseFloat(withdrawalAmount).toFixed(2)}
                </Text>

                <TouchableWithoutFeedback
                  onPress={() => {
                    if (!bank) {
                      Alert.alert(
                        'Add bank account to withdraw!!',
                        'Please add bank details to withdraw.',
                        [
                          {
                            text: 'Add',
                            onPress: () => navigation.navigate('Bank Details'),
                          },
                          {
                            text: 'Later',
                            style: 'cancel',
                          },
                        ],
                        {
                          cancelable: true, // <--- this is the key part for Android
                        },
                      );
                      return;
                    }

                    if (paymntStatus === 'in_progress') {
                      Alert.alert(
                        'Withdrawal is in progress!!',
                        'It will be initiated within 24-48hrs to your bank account.',
                        [{ text: 'OK' }],
                      );
                      return;
                    }
                    setBankSelectPopup(true);
                  }}
                >
                  <View
                    style={[
                      globle_Style.walleet_withdral_btn,
                      { opacity: paymntStatus === 'in_progress' ? 0.7 : 1 },
                      Platform.OS === 'ios' ? { marginBottom: 20 } : {},
                    ]}
                  >
                    <Text style={globle_Style.wallet_widral_txt}>Withdraw</Text>
                  </View>
                </TouchableWithoutFeedback>

                {/* <Text style={globle_Style.wallet_balnc_txt}>{paymntStatus}</Text> */}
              </View>
              <View
                style={[
                  globle_Style.wallet_lin_rgt,
                  Platform.OS === 'ios' ? { marginRight: 30 } : {},
                ]}
              >
                <Wallet />
              </View>
            </View>
          </LinearGradient>
          <View style={globle_Style.wallet_trans}>
            <View style={globle_Style.wallet_filter}>
              <View style={globle_Style.wallet_filtr_lft}>
                <Text style={globle_Style.wallet_filte_txt}>
                  All Transaction
                </Text>
              </View>
              {/* <View style={globle_Style.wallet_filtr_rgt}>
                                <WalletFilter />
                            </View> */}
            </View>
            <FlatList
              data={transactions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <WalletTransactionItem
                  // icon={item.icon}
                  backgroundColor={item.backgroundColor}
                  title={item.description}
                  time={item.created_at}
                  amount={item.amount}
                  item={item}
                />
              )}
            />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={bankSelectPopup}
          onRequestClose={() => {
            setBankSelectPopup(!bankSelectPopup);
          }}
        >
          <View style={globle_Style.popup}>
            <View style={[globle_Style.overlay]}>
              <View style={[globle_Style.quot_dtls_con, { borderWidth: 0 }]}>
                <View style={globle_Style.accrd_con}>
                  <View
                    style={[
                      globle_Style.quot_dtls_accrd_itm,
                      { borderBottomWidth: 0 },
                    ]}
                  >
                    <Text style={globle_Style.quot_dtls_hd}>
                      Select Bank Account
                    </Text>
                    <TouchableOpacity onPress={() => setBankSelectPopup(false)}>
                      <ClosePopup />
                    </TouchableOpacity>
                  </View>
                  <View style={globle_Style.bank_data}>
                    <FlatList
                      data={bankDetails}
                      renderItem={({ item, index }) => (
                        <BankView item={item} index={index} />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                  {bankDetails.length < 3 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setBankSelectPopup(false);
                        navigation.navigate('Bank Details');
                      }}
                    >
                      <View style={globle_Style.add_bank}>
                        <AddBank style={{ marginBottom: 10 }} />
                        <View style={{ marginBottom: 36 }}>
                          <Text
                            style={[
                              globle_Style.add_bank_txt,
                              { marginBottom: 0 },
                            ]}
                          >
                            Add New Bank Account
                          </Text>
                          <View
                            style={{ height: 1, backgroundColor: '#1D1D1D' }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : null}

                  {/* write here button code ok */}

                  <TouchableWithoutFeedback
                    onPress={() => {
                      withdrawAmount();
                    }}
                  >
                    <View style={[globle_Style.globle_btn]}>
                      <LinearGradient
                        colors={['#FBAB51', '#FE8705']}
                        start={{ x: 0, y: 1 }}
                        style={[globle_Style.globle_btn]}
                      >
                        <Text style={globle_Style.gbl_btn}>Withdraw</Text>
                      </LinearGradient>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default WalletScreen;
