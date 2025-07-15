import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Linking,
  Alert,
  NativeModules,
  Share,
} from 'react-native';
import Wallet from '../../assets/images/wallet.svg';
import PetsfolioLogo from '../../assets/images/Petsfolio_logo.svg';
import SideBar from '../../assets/images/side_bar.svg';
import Notify from '../../assets/images/notify.svg';
import RedNotify from '../../assets/images/RedNotify.svg';
import Coin from '../../assets/images/coin.svg';
import Whatsapp from '../../assets/images/whatsapp.svg';
import Share2 from '../../assets/images/share.svg';
import MessageImg from '../../assets/images/message_img.svg';
import RightArrow from '../../assets/images/right_arrow.svg';
import EarnOrder from '../../assets/images/earn_order.svg';
import EarnRate from '../../assets/images/earn_rate.svg';
import EarnCoin from '../../assets/images/earn_coin.svg';
import Verification from '../../assets/images/verification.svg';
import Logout from '../../assets/images/Logout.svg';
import Privacy from '../../assets/images/privacy.svg';
import Bank from '../../assets/images/bank.svg';
import Photos from '../../assets/images/photos.svg';
import TermCond from '../../assets/images/term_cond.svg';
import globle_Style from '../css/globle_Style';
import LinearGradient from 'react-native-linear-gradient';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constants/constant';
import { clearUserData } from '../constants/storageUtils';
// import RNRestart from 'react-native-restart';
import User from '../../assets/images/user.svg';
import DeviceInfo from 'react-native-device-info';

const AccountScreens = () => {
  const navigation = useNavigation();
  const [spDetails, setSPDetails] = useState({});
  const { VersionModule } = NativeModules;
  const [version, setVersion] = useState('');

  useEffect(() => {
    getVeersion();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchApiData();

      return () => console.log('Screen unfocused');
    }, []),
  );

  const getVeersion = async () => {
    // VersionModule.getVersionName().then(versionName => {
    //   console.log('Version Name:', versionName);
    //   setVersion(versionName);
    // });
    const localVersionName = DeviceInfo.getVersion();
    setVersion(localVersionName);
  };

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
      if (result.status) {
        console.warn('BANKKKK :: ', result.data);

        setSPDetails(result.data);
      } else {
        console.warn('ELSEEE :: ', result);
      }
    } catch (error) {
      console.warn('Network request failed :: ', error);
    }
  };

  const openLink = url => {
    Linking.openURL(url);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          // Add your logout logic here
          // navigation.dispatch(
          //     CommonActions.reset({
          //         index: 0,
          //         routes: [{ name: 'LoginScreen' }], // Navigate back to the Splash Screen
          //     })
          // );

          clearUserData();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'SplashScreen' }], // Navigate back to the Splash Screen
            }),
          );

          // RNRestart.Restart();
        },
      },
    ]);
  };

  return (
    <ScrollView style={globle_Style.container}>
      <View style={globle_Style.home_sec}>
        <View style={globle_Style.home_con}>
          <View style={globle_Style.header_sec}>
            <View style={globle_Style.header_bar}>
              <PetsfolioLogo />
            </View>

            <View style={globle_Style.header_wal_noty}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Wallet')}
              >
                <View style={globle_Style.wall_con}>
                  <Wallet style={{ marginRight: 4 }} />
                  <Text>{spDetails?.totalWithdrawalAmount}</Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Notification')}
              >
                <View style={globle_Style.header_noty}>
                  <Notify />
                  <RedNotify style={globle_Style.redNotify} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <View style={globle_Style.accnt_shrlnk}>
          <LinearGradient
            colors={['#884CEB', '#4B35C8']}
            start={{ x: 0, y: 1 }}
            style={globle_Style.accnt_shr_con}
          >
            <View style={globle_Style.accnt_invit}>
              <View style={globle_Style.accnt_invit_lft}>
                <Text style={globle_Style.accnt_invit_txt}>
                  25% off for you, 25% off for them!
                </Text>
                <Text style={globle_Style.accnt_invit_para}>
                  Invite a pet parent get instant cashback
                </Text>
              </View>
              <View style={globle_Style.accnt_invit_rgt}>
                <Coin />
              </View>
            </View>
            <View style={globle_Style.share_btn_lst}>
              <LinearGradient
                colors={['#FBAB51', '#FE8705']}
                style={globle_Style.linear_share}
              >
                <View style={globle_Style.share_btn_lft}>
                  <Whatsapp />
                  <Text style={globle_Style.share_txt}>WhatsApp</Text>
                </View>
              </LinearGradient>
              <TouchableWithoutFeedback
                onPress={() => {
                  Share.share({
                    message:
                      'https://play.google.com/store/apps/details?id=com.petsfolio.employee&pli=1',
                    title: 'Petsfolio App',
                    url: 'https://play.google.com/store/apps/details?id=com.petsfolio.employee&pli=1', // Note: iOS supports `url`, Android uses `message`
                  });
                }}
              >
                <View style={globle_Style.share_btn_rgt}>
                  <Share2 />
                  <Text
                    style={[globle_Style.share_txt, globle_Style.shr_lnk_txt]}
                  >
                    Share Link
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </LinearGradient>
          <View style={globle_Style.accnt_edit_con}>
            <View style={globle_Style.accnt_edit_lft}>
              <View style={globle_Style.accnt_img}>
                <Image
                  source={
                    spDetails.profile
                      ? { uri: spDetails.profile }
                      : require('../../assets/images/Group.png')
                  }
                  style={[
                    globle_Style.img,
                    { width: 50, height: 50, borderRadius: 25 },
                  ]}
                />
              </View>
              <Text style={globle_Style.accnt_edit_txt}>{spDetails.name}</Text>
            </View>
            <View style={[globle_Style.accnt_edit_rgt, { marginLeft: 10 }]}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('EditProfile')}
              >
                <Text style={globle_Style.accnt_edit_btn}>Edit</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <LinearGradient
            colors={['#EBFFF8', '#FFEFDD']}
            start={{ x: 0, y: 1 }}
            style={globle_Style.earing_sec}
          >
            <View style={globle_Style.earing_con}>
              <View style={globle_Style.earing_itm}>
                <View style={globle_Style.earing_con_img}>
                  <EarnCoin />
                </View>
                <View style={globle_Style.earing_info}>
                  <Text style={globle_Style.earing_info_txt}>
                    {spDetails.totalWithdrawalAmount}
                  </Text>
                  <Text style={globle_Style.earing_txt}>Total Earning</Text>
                </View>
              </View>
              <View style={globle_Style.earing_itm}>
                <View style={globle_Style.earing_con_img}>
                  <EarnRate />
                </View>
                <View style={globle_Style.earing_info}>
                  <Text style={globle_Style.earing_info_txt}>
                    {spDetails.averageRating}
                  </Text>
                  <Text style={globle_Style.earing_txt}>My Rating</Text>
                </View>
              </View>
              <View style={[globle_Style.earing_itm, { marginRight: 0 }]}>
                <View style={globle_Style.earing_con_img}>
                  <EarnOrder />
                </View>
                <View style={globle_Style.earing_info}>
                  <Text style={globle_Style.earing_info_txt}>
                    {spDetails.totalOrders}
                  </Text>
                  <Text style={globle_Style.earing_txt}>Total Order</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
          <View style={globle_Style.account_list}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('My Verification', {
                  email: spDetails.email,
                  verification: spDetails.verifications,
                })
              }
            >
              <View style={globle_Style.account_list_itm}>
                <View style={globle_Style.account_list_lft}>
                  <View style={globle_Style.account_list_img}>
                    <Verification />
                  </View>
                  <Text style={globle_Style.accnt_edit_txt}>
                    {' '}
                    My Verification
                  </Text>
                </View>
                <View style={globle_Style.account_list_rgt}>
                  <RightArrow />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => {
                spDetails.banks
                  ? navigation.navigate('BankDetailScreen', {
                      name: spDetails.name,
                    })
                  : navigation.navigate('Bank Details');
              }}
            >
              <View style={globle_Style.account_list_itm}>
                <View style={globle_Style.account_list_lft}>
                  <View style={globle_Style.account_list_img}>
                    <Bank />
                  </View>
                  <Text style={globle_Style.accnt_edit_txt}> Bank Details</Text>
                </View>
                <View style={globle_Style.account_list_rgt}>
                  <RightArrow />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Photos & Videos')}
            >
              <View style={globle_Style.account_list_itm}>
                <View style={globle_Style.account_list_lft}>
                  <View style={globle_Style.account_list_img}>
                    <Photos />
                  </View>
                  <Text style={globle_Style.accnt_edit_txt}> Photos</Text>
                </View>
                <View style={globle_Style.account_list_rgt}>
                  <RightArrow />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Help & Support')}
            >
              <View style={globle_Style.account_list_itm}>
                <View style={globle_Style.account_list_lft}>
                  <View style={globle_Style.account_list_img}>
                    <Photos />
                  </View>
                  <Text style={globle_Style.accnt_edit_txt}>
                    {' '}
                    Help & Support
                  </Text>
                </View>
                <View style={globle_Style.account_list_rgt}>
                  <RightArrow />
                </View>
              </View>
            </TouchableWithoutFeedback>

            {/* <TouchableWithoutFeedback onPress={() => openLink('https://petsfolio.com/in/terms-of-service/')}> */}
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('TermsCondition')}
            >
              <View style={globle_Style.account_list_itm}>
                <View style={globle_Style.account_list_lft}>
                  <View style={globle_Style.account_list_img}>
                    <TermCond />
                  </View>
                  <Text style={globle_Style.accnt_edit_txt}>
                    {' '}
                    Terms & Condition
                  </Text>
                </View>
                <View style={globle_Style.account_list_rgt}>
                  <RightArrow />
                </View>
              </View>
            </TouchableWithoutFeedback>

            {/* <TouchableWithoutFeedback onPress={() => openLink('https://www.petsfolio.com/in/privacy-policy/')}> */}
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('PrivacyPolicy')}
            >
              <View style={globle_Style.account_list_itm}>
                <View style={globle_Style.account_list_lft}>
                  <View style={globle_Style.account_list_img}>
                    <Privacy />
                  </View>
                  <Text style={globle_Style.accnt_edit_txt}>
                    Privacy Policy
                  </Text>
                </View>
                <View style={globle_Style.account_list_rgt}>
                  <RightArrow />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={handleLogout}>
              <View
                style={[
                  globle_Style.account_list_itm,
                  { borderBottomWidth: 0 },
                ]}
              >
                <View style={globle_Style.account_list_lft}>
                  <View style={globle_Style.account_list_img}>
                    <Logout />
                  </View>
                  <Text style={globle_Style.accnt_edit_txt}> Logout </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontFamily: 'Inter-Regular',
              }}
            >
              Version {version}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountScreens;
