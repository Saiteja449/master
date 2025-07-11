






import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableWithoutFeedback, View, } from 'react-native';
import globle_Style from '../css/globle_Style';
import LinearGradient from 'react-native-linear-gradient';
import Downarrow from '../../assets/images/downarrow.svg'

import UploadPhoVdo from '../../assets/images/pho_vdo_upload.svg'
import { Colors } from 'react-native/Libraries/NewAppScreen';
const IdentityProof = () => {



    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={[globle_Style.container,]}>
            <View style={globle_Style.verify_form_sec} >
                <View style={globle_Style.verify_form_con}>
                    <Text style={globle_Style.input_lable}>Identity Proof</Text>
                </View>
                <View style={globle_Style.pend_verfy_con}>
                    <View style={globle_Style.pend_verfy_itm}>
                        <View style={globle_Style.very_email}>
                            <Text style={[globle_Style.very_email_txt, globle_Style.new_Verfiy_txt]}>Choose Document type</Text>
                        </View>
                        <Downarrow />
                    </View>

                </View>
                <View style={[globle_Style.pho_vdo_upload,{borderColor:'#0000001A'}]}>
                    <Text style={[globle_Style.upload_txt,{color:"#8A8A8A"}]}>Upload Document </Text>
                    <UploadPhoVdo />
                </View>
                <View style={{ flex: 1 }} />
                <View style={globle_Style.verify_form_btn}>
                    <TouchableWithoutFeedback>
                        <Text style={[globle_Style.gbl_btn, globle_Style.personal_detail]}>Submit Documents</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </ScrollView>
    );
}



export default IdentityProof;
