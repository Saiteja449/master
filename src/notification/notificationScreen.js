


import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, FlatList } from 'react-native';
import DogWalk from '../../assets/images/dogwalk.svg'
import DogGroom from '../../assets/images/doggroom.svg'
import globle_Style from '../css/globle_Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constants/constant';




const Notification = () => {

  const [notificationList, setNotificationList] = useState([])


  const data = [
    {
      id: '1',
      name: 'Shetty for dog walking',
      date: '01 Nov, 02:58 pm',
      amount: '+₹154',
    },
  ]

  useEffect(() => {
    fetchApiData()
  }, [])

  const fetchApiData = async () => {
    let userData = ""
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }
    const url = `${API_BASE_URL}provider/${userData.id}/notifications`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userData.token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      if (result.status) {
        setNotificationList(result.data);
        // console.warn("RESULT DATAAAAAAAA :: ", result.data)

      } else {
        console.warn("ELSEEE :: ", response);
      }
    } catch (error) {
      console.warn('Network request failed :: ', error);
    }

  }

  const DogWalkNotification = ({ item }) => {
    return (
      <View style={globle_Style.noti_lst}>
        <View style={globle_Style.noti_lst_lft}>
          {/* Assuming DogWalk is a component, use it here */}
          <DogWalk />
        </View>
        <View style={globle_Style.noti_lst_rgt}>
          <View style={globle_Style.noti_lst_info}>
            <Text style={globle_Style.noti_lst_txt}>{item.message}</Text>
            <Text style={globle_Style.noti_time_txt}>{item.created_at}</Text>
          </View>
          {/* <View style={globle_Style.noti_lst_amont}>
            <Text style={globle_Style.noti_amont_txt}>{item.amount}</Text>
          </View> */}
        </View>
      </View>
    );
  };




  return (
    <ScrollView style={globle_Style.container}>
      <View style={globle_Style.noti_sec}>
        <View style={globle_Style.noti_con}>
          {notificationList.length > 0 ? <FlatList
            data={notificationList}
            renderItem={({ item }) => <DogWalkNotification item={item} />}
            keyExtractor={(item, index) => index.toString()}
          /> : <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 250 }}>
            <View style={{ marginBottom: 10 }}>
              <Image source={require('../../assets/images/dogWalking.png')} />
            </View>
            <View>
              <Text style={{
                textAlign: 'center', fontSize: 20,
                fontWeight: '600',
                lineHeight: 24.2,
                fontFamily: 'Inter-SemiBold',
                color: '#1D1D1D'
              }}>No Notifications </Text>
              {/* <Text  style={globle_style.wait_for_qua}>Your Request Submit Successfully</Text> */}
            </View>
          </View>}

        </View>
      </View>
    </ScrollView>
  );
}



export default Notification;
