
import React, { useContext, useEffect, useState } from 'react';

import { ScrollView, Text, TouchableWithoutFeedback, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import NewjobOne from '../../assets/images/newjob_one.svg'
import DummyDog from '../../assets/images/dog 1.svg'
import User from '../../assets/images/user copy.svg'
import DistaneMap from '../../assets/images/distance_map.svg'
import Edit from '../../assets/images/edit.svg'
import globle_Style from '../css/globle_Style';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../common/AppContext';
import { API_BASE_URL } from '../constants/constant';

const TrainingAllQuotes = ({ route }) => {
  const navigation = useNavigation()

  const { userData } = useContext(UserContext);
  const { item, showmyquote } = route.params;
  const [quoteData, setQuoteData] = useState([])

  useEffect(() => {
    console.warn("RESULTTTTTTT000 :: ", item)
    fetchApiData();
  }, [])


  const fetchApiData = async () => {
    const url = `${API_BASE_URL}provider/getBookingProviders`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userData.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          booking_id: item.booking_id,
          service_id: '2',
          provider_id: userData.id,
        })
      });

      if (response.ok) {
        const result = await response.json();

        console.warn("RESULTTTTTTT :: ", result.data)
        setQuoteData(result.data)


      } else {
        console.warn("Elseseeee :: ", response);
      }
    } catch (error) {
      console.warn('Network request failed', error);
    }
  };


  return (
    <ScrollView style={globle_Style.container}>
      <View style={globle_Style.newjob_sec}>

        {showmyquote ? <View style={globle_Style.newjob_con}>
          <View style={[globle_Style.newjob_lst, globle_Style.all_quotes]}>
            <View style={globle_Style.newjob_itm_lft}>
              {/* < DummyDog /> */}
              {item.provider_profile ? <Image source={{ uri: item.provider_profile }} style={{ width: 60, height: 60, borderRadius: 30 }} /> : <DummyDog />}
            </View>
            <View style={globle_Style.newjob_itm_rgt}>
              <View style={globle_Style.newjob_txt_con}>
                <View style={[globle_Style.newjob_txt_lft, globle_Style.all_quotes_lft]}>
                  <Text style={globle_Style.job_exp}>{item.provider_name}</Text>
                  <View style={globle_Style.job_distc}>
                    <Text style={[globle_Style.distc_txt, globle_Style.all_quotes_lft_txt]}>{item.service_frequency}</Text>
                  </View>
                </View>
                <View style={globle_Style.newjob_rate_con}>
                  <View style={[globle_Style.job_distc, globle_Style.all_quot_edit,]}>
                    <View style={[globle_Style.newjob_txt_rgt, {}]}>
                      <TouchableWithoutFeedback onPress={() => navigation.navigate('TrainingQuoteDetailEdit', { item: item, isEdit: true })}>
                        <Edit style={{}} />
                      </TouchableWithoutFeedback>
                      <Text style={[globle_Style.newjob_itm_rate, { fontSize: 14, marginLeft: 16 }]}>₹{item.bid_amount}</Text>
                    </View>
                  </View>

                  <Text style={[globle_Style.newjob_rate_day, globle_Style.all_quot_amount]}>Quoted Amount</Text>
                </View>
              </View>
            </View>
          </View>

        </View> : null}
      </View>
      <View style={[globle_Style.othr_qout_list]}>
        <Text style={globle_Style.othr_quot_hd}>Other Quotes</Text>
        <View style={globle_Style.othr_qout_con}>
          {quoteData.length > 0 ? <FlatList
            data={quoteData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 20 }} // Ensure there's padding at the bottom
          />
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ marginBottom: 10, marginTop: 30 }}>
                <Image source={require('../../assets/images/dogWalking.png')} />
              </View>
              <View>
                <Text style={{
                  textAlign: 'center', fontSize: 20,
                  fontWeight: '600',
                  lineHeight: 24.2,
                  fontFamily: 'Inter-SemiBold',
                  color: '#1D1D1D'
                }}>Great News!</Text>

                <Text style={{
                  textAlign: 'center', fontSize: 16,
                  fontWeight: '600',
                  lineHeight: 24.2,
                  color: '#1D1D1D'
                }}>No Competition exists for you right now</Text>
                {/* <Text  style={globle_style.wait_for_qua}>Your Request Submit Successfully</Text> */}
              </View>
            </View>}

        </View>
      </View>
    </ScrollView>
  );





};

const renderItem = ({ item }) => (
  <View style={[globle_Style.newjob_sec, globle_Style.othr_qout_sec, { marginTop: 10, }]}>
    <View style={globle_Style.newjob_con}>
      <View style={[globle_Style.newjob_lst, globle_Style.all_quotes]}>
        <View style={globle_Style.newjob_itm_lft}>
          {item.profile ? <Image source={{ uri: item.profile }} style={{ width: 60, height: 60, borderRadius: 30 }} /> : <User />}
          {/* <User style={{ width: 60, height: 60, borderRadius: 30 }}/> */}
        </View>
        <View style={globle_Style.newjob_itm_rgt}>
          <View style={globle_Style.newjob_txt_con}>
            <View style={[globle_Style.newjob_txt_lft, globle_Style.all_quotes_lft]}>
              <Text style={globle_Style.job_exp}>{item.name}</Text>
              <View style={globle_Style.job_distc}>
                <Text style={[globle_Style.distc_txt, globle_Style.all_quotes_lft_txt]}>{item.service_frequency}</Text>
              </View>
            </View>
            <View style={globle_Style.newjob_rate_con}>
              <View style={[globle_Style.job_distc, globle_Style.all_quot_edit]}>
                <View style={globle_Style.newjob_txt_rgt}>
                  <Text style={globle_Style.newjob_itm_rate}>{item.bid_amount}</Text>
                </View>
              </View>
              <Text style={[globle_Style.newjob_rate_day, globle_Style.all_quot_amount]}>Quoted Amount</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default TrainingAllQuotes;
