

import React, { useState } from 'react';
import { Text, View, Image, ScrollView, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import globle_Style from '../css/globle_Style';

import BackArrow from '../../assets/images/back_arrow.svg'
import MessageImg from '../../assets/images/message_img.svg'
import { useNavigation } from '@react-navigation/native';

const MessageChat = () => {
    const navigation = useNavigation()

    const [inputHeight2, setInputHeight2] = useState(40); // Initial height




    const CustomHeader = () => {
        return (
            <View style={globle_Style.custm_hdr_sec}>
                <View style={globle_Style.custm_hdr_con}>
                    <TouchableOpacity onPress={() => navigation.navigate('Message')}>
                        <View style={globle_Style.custm_hdr_lft}>
                            <BackArrow />
                        </View>
                    </TouchableOpacity>
                    <View style={globle_Style.custm_hdr_rgt}>
                        <View style={globle_Style.mesngr_img}>
                            <MessageImg />
                        </View>
                        <View style={globle_Style.mesngr_nme}>
                            <Text style={globle_Style.messgr_name}>Angel Curtis</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }



    return (
        <ScrollView style={globle_Style.container}>
            <View style={globle_Style.chat_con}>
                <CustomHeader />
                <View style={globle_Style.communi_sec}>
                    <View style={globle_Style.communi_con}>
                        <View style={globle_Style.communi_con_lft}>
                            <Text style={globle_Style.communi_name}>P</Text>
                        </View>
                        <View style={globle_Style.communi_con_rgt}>
                            <TextInput style={globle_Style.communi_chat} multiline numberOfLines={2} placeholderTextColor={'#1D1D1D'} placeholder='Please tell me what option you want to start with'></TextInput>
                        </View>
                    </View>
                    <View style={globle_Style.communi_con}>
                        <View style={globle_Style.communi_con_lft}>
                            <Text style={globle_Style.communi_name}>P</Text>
                        </View>
                        <View style={globle_Style.communi_con_rgt}>
                            <TextInput style={globle_Style.communi_chat}
                                multiline
                                numberOfLines={5}
                                placeholderTextColor={'#1D1D1D'}
                                placeholder='Please select the order below'
                            
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>

    );
}



export default MessageChat;
