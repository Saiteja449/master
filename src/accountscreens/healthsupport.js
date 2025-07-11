






import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import globle_Style from '../css/globle_Style';
import RightArrow from '../../assets/images/right_arrow.svg'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constants/constant';
import { useNavigation } from '@react-navigation/native';

const HealthSupportScreen = () => {

  const [msg, setMsg] = useState('');
  const [msgError, setMsgError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigation = useNavigation();

  const saveReport = async () => {
    // const selectedGender = gender.find(g => g.id === selectRadio);

    if (isDisabled) return;

    if (msg === '') {
      setMsgError(true);
      return
    }

    setIsDisabled(true);

    let userData = ""
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }

    const data = {
      user_id: userData.id,
      message: msg,
      type: 'provider'

    }

    console.warn(data)
    // return

    try {
      const url = `${API_BASE_URL}support`;
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Authorization': `Bearer ${userData.token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userData.id,
          message: msg,
          type: 'provider'

        }),
      });

      const result = await response.json();

      if (result.status) {
        setIsDisabled(false);
        console.warn("Saved Successfully!!")
        navigation.goBack();
      } else {
        setIsDisabled(false);
        console.error('Update data Failed:', result);

      }
    } catch (error) {
      console.error('Error :', error);
    }
  };

  return (
    <ScrollView style={globle_Style.container}>
      <View style={globle_Style.account_list}>
        {/* <TouchableWithoutFeedback >
          <View style={globle_Style.account_list_itm}>
            <View style={globle_Style.account_list_lft}>
              <Text style={globle_Style.accnt_edit_txt}>Offers & Coupons</Text>
            </View>
            <View style={globle_Style.account_list_rgt}>
              <RightArrow />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={globle_Style.account_list_itm}>
          <View style={globle_Style.account_list_lft}>
            <Text style={globle_Style.accnt_edit_txt}> General Inquiry</Text>
          </View>
          <View style={globle_Style.account_list_rgt}>
            <RightArrow />
          </View>
        </View>
        <View style={globle_Style.account_list_itm}>
          <View style={globle_Style.account_list_lft}>
            <Text style={globle_Style.accnt_edit_txt}>Payment Related</Text>
          </View>
          <View style={globle_Style.account_list_rgt}>
            <RightArrow />
          </View>
        </View>
        <View style={globle_Style.account_list_itm}>
          <View style={globle_Style.account_list_lft}>
            <Text style={globle_Style.accnt_edit_txt}>Feedback & Suggestions</Text>
          </View>
          <View style={globle_Style.account_list_rgt}>
            <RightArrow />
          </View>
        </View>
        <View style={globle_Style.account_list_itm}>
          <View style={globle_Style.account_list_lft}>
            <Text style={globle_Style.accnt_edit_txt}>Service Related</Text>
          </View>
          <View style={globle_Style.account_list_rgt}>
            <RightArrow />
          </View>
        </View> */}

        <View style={{ marginVertical: 40, }}>
          <TextInput style={{ backgroundColor: '#F7F7F7', borderRadius: 16, padding: 8, height: 120, flex: 1, justifyContent: 'flex-start' }} multiline numberOfLines={1} placeholderTextColor={'#1D1D1D'} placeholder='Write here...' value={msg} onChangeText={setMsg}></TextInput>
          {
            msgError ? <Text style={[globle_Style.errorText, { paddingHorizontal: 5, marginBottom: 0 }]}>Message is required.</Text> : null
          }
        </View>

        <TouchableOpacity onPress={() => saveReport()}>
          <View style={globle_Style.globle_btn}>
            <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 1, y: 0 }} style={[globle_Style.globle_btn, { opacity: isDisabled ? 0.5 : 1 }]} end={{ x: 0, y: 1 }} >
              <Text style={globle_Style.gbl_btn}>Save</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}



export default HealthSupportScreen;
