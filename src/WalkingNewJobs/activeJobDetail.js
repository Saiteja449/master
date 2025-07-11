

import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';
import DownArrow from '../../assets/images/down_arrow.svg'
import globle_Style from '../css/globle_Style';
import Edit from '../../assets/images/edit.svg'
import GreenTick from '../../assets/images/greentick.svg'
import LinearGradient from 'react-native-linear-gradient';

import UpArrow from '../../assets/images/uparrow.svg'

import Pawprint from '../../assets/images/pawprint.svg'
import Age from '../../assets/images/age.svg'
import Genders from '../../assets/images/genders.svg'
import Vaccine from '../../assets/images/vaccine.svg'
import PetImage from '../../assets/images/petImage.svg'
import Phone from '../../assets/images/phone.svg'
import Map from '../../assets/images/map.svg'
import Username from '../../assets/images/username.svg'
import Userimage from '../../assets/images/userimage.svg'
import PetProfile from '../../assets/images/petProfile.svg'
import { formatDate } from '../constants/constant';
const ActiveJobDetail = ({ route }) => {

    const [isclientDetail, setIsclientDetail] = useState(false);
    const [ispetDetail, setIspetDetail] = useState(false);
    const [packageDetail, setPackageDetail] = useState(true);

    const { item } = route.params;


    useEffect(() => {

        console.warn(item)
    }, [])

    const showPetDetail = () => {
        setIspetDetail(!ispetDetail)
    };
    const showClientDetail = () => {
        setIsclientDetail(!isclientDetail);
    };
    const showPackageDetail = () => {
        setPackageDetail(!packageDetail)
    }
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


    // client detail render
    const clientRenderItem = ({ item }) => {
        return (
            <View style={[globle_Style.acnt_con, globle_Style.walk_info_con2, { borderTopWidth: 1, }]}>
                <View style={[globle_Style.acnt_lst, globle_Style.walk_con_lst, { marginTop: 10, }]}>
                    <View style={[globle_Style.acnt_itm, globle_Style.ser_dtl_lst]}>
                        <Username />
                        <Text style={globle_Style.servc_pac_itm_txt}>Name : {item.name}</Text>
                    </View>
                    <View >
                        <Userimage style={{ width: 50, height: 50, borderRadius: 25 }} />

                    </View>
                </View>
                <View style={[globle_Style.acnt_lst, globle_Style.walk_con_lst]}>
                    <View style={[globle_Style.acnt_itm, globle_Style.ser_dtl_lst]}>
                        <Phone />
                        <Text style={globle_Style.servc_pac_itm_txt}>Phone : {item.phone}</Text>
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
                        <Map />
                        <Text style={globle_Style.servc_pac_itm_txt}>map : {item.map}</Text>
                    </View>
                </View>
                <View style={globle_Style.user_pro}>
                    <Text style={globle_Style.white_btn}>View Profile</Text>
                </View>
            </View>
        );
    }


    return (
        <ScrollView style={[globle_Style.container]}>
            <View style={globle_Style.quot_dtls_sec}>
                <View style={globle_Style.walk_info_sec}>
                    <View style={[globle_Style.receive_info_sec, globle_Style.walk_con_top]}>
                        <TouchableWithoutFeedback onPress={showPetDetail}>
                            <View style={[globle_Style.receive_info_con, globle_Style.walk_info_con, { borderBottomWidth: 0, }]}>
                                <View style={[globle_Style.receive_info_lft, globle_Style.serv_dtl_lft]}>
                                    <Text style={[globle_Style.rdo_txt]}>Pet Details</Text>
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
                                <Text style={globle_Style.quot_dtls_hd}>Package Details</Text>
                                {packageDetail ? <UpArrow /> : <DownArrow />}
                            </View>
                        </TouchableWithoutFeedback>
                        {packageDetail && (
                            <View>
                                <View style={[globle_Style.pakg_time_con, { borderTopWidth: 1, }]}>
                                    <View style={globle_Style.pakg_time_lst}>
                                        <View style={globle_Style.pakg_time_itm}>
                                            <Text style={globle_Style.lst_dots}>•</Text>
                                            <Text style={globle_Style.lst_dots_txt}>{item.service_days}, {item.service_frequency}, {item.days} days</Text>
                                        </View>
                                        <View style={globle_Style.pakg_time_itm}>
                                            <Text style={globle_Style.lst_dots}>•</Text>
                                            <Text style={globle_Style.lst_dots_txt}>{formatDate(item.service_start_date)} to {formatDate(item.service_end_date)}</Text>
                                        </View>
                                        <View style={[globle_Style.pakg_time_itm, globle_Style.edit_optn]}>
                                            <View style={globle_Style.packg_tmedit}>
                                                <Text style={globle_Style.lst_dots}>•</Text>
                                                <Text style={globle_Style.lst_dots_txt}>{item.preferable_time}</Text>
                                            </View>
                                        </View>
                                        <View style={globle_Style.pakg_time_itm}>
                                            <Text style={globle_Style.lst_dots}>•</Text>
                                            <Text style={globle_Style.lst_dots_txt}>Daily Walk Report</Text>
                                        </View>
                                        <View style={[globle_Style.pakg_time_itm, globle_Style.edit_optn]}>
                                            <View style={globle_Style.packg_tmedit}>
                                                <Text style={globle_Style.lst_dots}>•</Text>
                                                <Text style={globle_Style.lst_dots_txt}>Secure Payment</Text>
                                            </View>
                                        </View>
                                        <View style={[globle_Style.pakg_time_itm, globle_Style.edit_optn]}>
                                            <View style={globle_Style.packg_tmedit}>
                                                <Text style={globle_Style.lst_dots}>•</Text>
                                                <Text style={globle_Style.lst_dots_txt}>Walk duration - {item.walk_duration}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[globle_Style.pakg_incld_con, { borderBottomWidth: 0 }]}>
                                    <View style={[globle_Style.pakg_incld, { borderBottomWidth: 0 }]}>
                                        <Text style={[globle_Style.quot_dtls_hd, { fontSize: 14, marginBottom: 18 }]}>Add Ons</Text>
                                        {item.addons.map((addOn) => (
                                            <View key={addOn.id} style={globle_Style.packg_addon}>
                                                <View style={globle_Style.packg_addon_lft}>
                                                    <Text style={globle_Style.lst_dots_txt}>{addOn.name}</Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
                <View style={globle_Style.walk_info_sec}>
                    <TouchableWithoutFeedback onPress={showClientDetail}>
                        <View style={[globle_Style.receive_info_sec, globle_Style.walk_con_top,]}>
                            <View style={[globle_Style.receive_info_con, globle_Style.walk_info_con, { borderBottomWidth: 0, }]}>
                                <View style={[globle_Style.receive_info_lft, globle_Style.serv_dtl_lft]}>
                                    <Text style={[globle_Style.rdo_txt]}>Client Details</Text>
                                </View>
                                <View style={[globle_Style.receive_info_rgt]}>
                                    {isclientDetail ? <UpArrow /> : <DownArrow />}
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {isclientDetail && (
                        <View style={[globle_Style.acnt_con, globle_Style.walk_info_con2, { borderTopWidth: 1, }]}>
                            <View style={[globle_Style.acnt_lst, globle_Style.walk_con_lst, { marginTop: 10, }]}>
                                <View style={[globle_Style.acnt_itm, globle_Style.ser_dtl_lst]}>
                                    <Username />
                                    <Text style={globle_Style.servc_pac_itm_txt}>Name : {item.name}</Text>
                                </View>
                                <View >

                                    {item.profile ? <Image source={{ uri: item.profile }}
                                        style={[globle_Style.my_profl_img, { width: 50, height: 50, borderRadius: 25 }]}
                                        resizeMode="cover" /> :
                                        <Userimage style={{ width: 50, height: 50, borderRadius: 25 }} />
                                    }

                                </View>
                            </View>
                            <View style={[globle_Style.acnt_lst, globle_Style.walk_con_lst]}>
                                <View style={[globle_Style.acnt_itm, globle_Style.ser_dtl_lst]}>
                                    <Phone />
                                    <Text style={globle_Style.servc_pac_itm_txt}>Phone : {item.phone}</Text>
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
                                    <Map />
                                    <Text style={globle_Style.servc_pac_itm_txt}>map : {item.address}</Text>
                                </View>
                            </View>
                            {/* <View style={globle_Style.user_pro}>
                                <Text style={globle_Style.white_btn}>View Profile</Text>
                            </View> */}
                        </View>
                    )}
                </View>
                {/* <TouchableWithoutFeedback >
                    <View style={globle_Style.globle_btn}>
                        <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={globle_Style.globle_btn}>
                            <Text style={globle_Style.gbl_btn}>Start Walk</Text>
                        </LinearGradient>
                    </View>
                </TouchableWithoutFeedback> */}
            </View>
        </ScrollView>
    );
}



export default ActiveJobDetail;
