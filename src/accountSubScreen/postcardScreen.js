






import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableWithoutFeedback, View, } from 'react-native';
import globle_Style from '../css/globle_Style';
import Mapmarker from '../../assets/images/mapmarker.svg'
import LinearGradient from 'react-native-linear-gradient';

const PostcardScreen = () => {



    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={globle_Style.container}>
            <View style={globle_Style.verify_form_sec}>
                <View style={globle_Style.verify_form_con}>
                    <Text style={globle_Style.input_lable}>Postcard Verification</Text>
                </View>
                <View style={globle_Style.postcars_con}>
                    <View style={globle_Style.postcars_itm}>
                        <Mapmarker style={{ marginRight: 9 }} />
                        <Text style={globle_Style.addresss_mark}>Bashreebagh</Text>
                    </View>
                    <View style={globle_Style.addresss_info_con}>
                        <Text style={globle_Style.addresss_info} numberOfLines={4} ellipsizeMode='tail'>3-6-326, Hyderguda Main Rd, Avanti Nagar, Basheer Bagh, Hyderabad, Telangana 500029, India</Text>
                    </View>
                    <View style={globle_Style.address_chang}>
                        <Text style={globle_Style.white_btn}>Change</Text>
                    </View>
                </View>
                <View style={globle_Style.post_card_note}>
                <Text style={{color:'#FE8705', marginRight:5}}>Note :</Text>
                    <Text style={globle_Style.post_note_txt} numberOfLines={3} ellipsizeMode='tail'>Once the postcard has been sent out, the address cannot be changed. Until the card is delivered.</Text>
                </View>
                <View style={{ flex: 1 }} />
                <View style={globle_Style.verify_form_btn}>
                    <TouchableWithoutFeedback>
                        <Text style={[globle_Style.gbl_btn, globle_Style.personal_detail]}>Send OTP</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            
        </ScrollView>
    );
}



export default PostcardScreen;
