

import React, { useState } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import globle_Style from '../css/globle_Style';
import LinearGradient from 'react-native-linear-gradient';
import Right from '../../assets/images/right.svg'
import DogWalking from '../../assets/images/dog_walking.svg'
import DogGrooming from '../../assets/images/dog_grooming.svg'
import DogTraining from '../../assets/images/dog_training.svg'
import DogBoarding from '../../assets/images/dog_boarding.svg'
import { useNavigation } from '@react-navigation/native';



const SelectServiceScreens = () => {
    const navigation = useNavigation()
    const [selectRadio, setselectedRadio] = useState(-1)
    const [selectServiceValidate, setSelectServiceValidate] = useState(false)



    const goToDetailScreen = () => {

        if (selectRadio == -1) {
            setSelectServiceValidate(true)
            return
        }
        let service_id;
        if (selectRadio == 1) {
            service_id = '4'
            navigation.navigate('Service Detail', {
                service_id
            })
        } else if (selectRadio == 2) {
            service_id = '2'
            navigation.navigate('Service Detail Grooming', {
                service_id
            })
        } else if (selectRadio == 3) {
            service_id = '3'
            navigation.navigate('Service Detail Training', {
                service_id
            })
        } else if (selectRadio == 4) {
            service_id = '1'
            navigation.navigate('Service Detail Boarding', {
                service_id
            })
        }


    }



    return (

        <ScrollView style={globle_Style.container}>
            <View style={globle_Style.per_dtl_sec}>
                <View style={globle_Style.per_dtl_con}>
                    <View style={globle_Style.border}></View>
                    <View style={globle_Style.per_dtl_lst}>

                        <TouchableWithoutFeedback>
                            <View style={globle_Style.per_dtl_itm}>

                                <View style={globle_Style.nav_con}>
                                    <LinearGradient colors={['#03A878', '#03A878']} start={{ x: 0, y: 1 }} style={globle_Style.pers_nav}>
                                        {/* <Text style={[globle_Style.pers_navnot_act_itm, globle_Style.pers_navactive_itm]}>1</Text> */}
                                        <Right />
                                    </LinearGradient>
                                </View>
                                <View style={{ textAlign: 'center' }}>
                                    <Text style={[globle_Style.pers_nav_txt, globle_Style.pers_nav_complete]}>Personal</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={globle_Style.per_dtl_itm}>

                                <View style={globle_Style.nav_con}>
                                    <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={globle_Style.pers_nav}>
                                        <Text style={[globle_Style.pers_navnot_act_itm, globle_Style.pers_navactive_itm]}>2</Text>
                                    </LinearGradient>
                                </View>
                                <View style={{ textAlign: 'center' }}>
                                    <Text style={[globle_Style.pers_nav_txt, globle_Style.pers_nav_txt_act]}>Service</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={globle_Style.per_dtl_itm}>

                                <View style={globle_Style.nav_con}>
                                    <LinearGradient colors={['#D9D9D9', '#D9D9D9']} start={{ x: 0, y: 1 }} style={globle_Style.pers_nav}>
                                        <Text style={globle_Style.pers_navnot_act_itm}>3</Text>
                                    </LinearGradient>
                                </View>
                                <View style={{ textAlign: 'center' }}>
                                    <Text style={globle_Style.pers_nav_txt}>ID Verification</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={globle_Style.per_dtl_itm}>

                                <View style={globle_Style.nav_con}>
                                    <LinearGradient colors={['#D9D9D9', '#D9D9D9']} start={{ x: 0, y: 1 }} style={globle_Style.pers_nav}>
                                        <Text style={globle_Style.pers_navnot_act_itm}>4</Text>
                                    </LinearGradient>
                                </View>
                                <View style={{ textAlign: 'center' }}>
                                    <Text style={globle_Style.pers_nav_txt}>Start</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={globle_Style.serv_con}>
                    <Text style={globle_Style.login_hd_txt}>Choose Your Preferred Service</Text>
                    <Text style={[globle_Style.login_para, globle_Style.serv_txt]}>Pick the option that suits you best.</Text>
                </View>
                <View style={globle_Style.form_info}>
                    {/* radio btn : */}
                    <View style={[globle_Style.radio_con, globle_Style.serv_radio]}>
                        <View style={globle_Style.serv_rad_wrapp}>
                            <TouchableWithoutFeedback onPress={() => setselectedRadio(1)}>
                                <View style={[globle_Style.radioWapper, selectRadio === 1 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                    <View style={globle_Style.serv_chos_con}>
                                        <DogWalking style={{ marginRight: 11.5 }} />
                                        <Text style={globle_Style.rdo_txt}>Dog Walking</Text>
                                    </View>

                                    <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, selectRadio === 1 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                        {
                                            selectRadio === 1 ? <View style={globle_Style.radio_bg}></View> : null
                                        }
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={globle_Style.serv_rad_wrapp}>
                            <TouchableWithoutFeedback onPress={() => setselectedRadio(2)}>
                                {/* <TouchableWithoutFeedback> */}
                                <View style={[globle_Style.radioWapper, selectRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                    <View style={globle_Style.serv_chos_con}>
                                        <DogGrooming style={{ marginRight: 11.5 }} />
                                        <Text style={globle_Style.rdo_txt}>Dog Grooming</Text>
                                    </View>

                                    <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, selectRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                        {
                                            selectRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
                                        }
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={globle_Style.serv_rad_wrapp}>
                            <TouchableWithoutFeedback onPress={() => setselectedRadio(3)}>
                            {/* <TouchableWithoutFeedback> */}
                                <View style={[globle_Style.radioWapper, selectRadio === 3 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                    <View style={globle_Style.serv_chos_con}>
                                        <DogTraining style={{ marginRight: 11.5 }} />
                                        <Text style={globle_Style.rdo_txt}>Dog Training</Text>
                                    </View>

                                    <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, selectRadio === 3 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                        {
                                            selectRadio === 3 ? <View style={globle_Style.radio_bg}></View> : null
                                        }
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={globle_Style.serv_rad_wrapp}>
                            {/* <TouchableWithoutFeedback onPress={() => setselectedRadio(4)}> */}
                            <TouchableWithoutFeedback>
                                <View style={[globle_Style.radioWapper, selectRadio === 4 ? globle_Style.active_wrapper : globle_Style.radioWapper]}>
                                    <View style={globle_Style.serv_chos_con}>
                                        <DogBoarding style={{ marginRight: 11.5 }} />
                                        <Text style={globle_Style.rdo_txt}>Dog Boarding</Text>
                                    </View>

                                    <View style={[globle_Style.static_radio_circle, globle_Style.radio_static, selectRadio === 4 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
                                        {
                                            selectRadio === 4 ? <View style={globle_Style.radio_bg}></View> : null
                                        }
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>

            </View>
            {selectServiceValidate && <Text style={[globle_Style.error, { marginBottom: 10 }]}>Please select a service</Text>}

            <View style={[globle_Style.serv_btn,]}>
                <TouchableWithoutFeedback onPress={() => goToDetailScreen()}>
                    <LinearGradient colors={['#FBAB51', '#FE8705']} start={{ x: 0, y: 1 }} style={globle_Style.globle_btn}>
                        <Text style={[globle_Style.gbl_btn]}>Continue</Text>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>

    );
}



export default SelectServiceScreens;
