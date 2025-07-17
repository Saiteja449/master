import { Platform, StyleSheet } from 'react-native';

export default globle_Style = StyleSheet.create({
  // globle style
  gbl_btn: {
    textAlign: 'center',
    lineHeight: 54,
    borderRadius: 12,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
  },
  gbl_btn_two: {
    borderRadius: 25,
    lineHeight: 30,
    color: '#fff',
    paddingHorizontal: 10,
  },
  white_btn: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    color: '#1D1D1D',
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    borderRadius: 25,
    paddingHorizontal: 17,
    lineHeight: 30,
  },
  personal_detail: {
    backgroundColor: '#D9D9D9',
    alignItems: 'flex-end',
  },
  input_lable: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    lineHeight: 19.94,
    color: '#1D1D1D',
    marginBottom: 12,
    paddingLeft: 3,
  },
  // input_txt: {
  //   fontSize: 14,
  //   fontWeight: '500',
  //   fontFamily: 'Inter-Medium',
  //   lineHeight: 19.94,
  //   color: '#979797',
  //   paddingHorizontal: 16,
  //   borderWidth: 1.2,
  //   borderColor: '#0000001A',
  //   borderRadius: 12,
  //   width: '100%',
  // },
  input_txt: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Inter-Medium' : 'Inter-Medium', // Explicit platform fonts
    lineHeight: 19.94,
    color: '#979797',
    paddingHorizontal: 16,
    borderWidth: Platform.OS === 'ios' ? 0.8 : 1.2, // Thinner border on iOS
    borderColor: '#0000001A',
    borderRadius: 12,
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 12 : 10, // Adjust vertical padding
    backgroundColor: Platform.OS === 'ios' ? '#FFFFFF' : undefined, // Explicit bg for iOS
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // logo style
  logo_img: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 44,
  },
  // logo style

  chekbox: {
    borderRadius: 2,
  },

  // globle style

  //  ================ Radio button start ===================
  staticradio_btn: {
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderColor: '#0000001A',
  },
  radio_con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  radioWapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#0000001A',
    height: 54,
    marginRight: 15,
    flexBasis: 156.5,
    flexShrink: 0,
    flexGrow: 1,
  },
  active_wrapper: {
    borderColor: '#03A878',
  },
  stardp_con: {
    // marginRight:50
  },
  rdo_txt: {
    fontSize: 14,
    lineHeight: 16.94,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: '#1D1D1D',
    alignItems: 'center',
  },
  static_radio_circle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    backgroundColor: '#03A878',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio_static: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0000001A',
  },
  radio_bg: {
    height: 12,
    width: 12,
    backgroundColor: '#fff',
    borderRadius: 50,
    margin: 4,
  },

  //  ================ Radio button end==================

  // login_sec start here

  login_sec: {
    paddingTop: 41,
    backgroundColor: '#fff',
    flex: 1,
  },
  login_con: {
    marginBottom: 27,
    paddingHorizontal: 16,
  },

  login_hd_txt: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    lineHeight: 24,
    // marginBottom: 10,
    color: '#1D1D1D',
  },
  login_para: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    color: '#8C8C8C',
  },

  login_frm: {
    marginBottom: 25,
    paddingHorizontal: 16,
  },
  login_frm_con: {
    height: 54,
    borderWidth: 1.2,
    borderColor: '#0000001A',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  frm_img: {
    backgroundColor: '#ECF5F4',
    paddingVertical: 17,
    marginRight: 8,
    paddingHorizontal: 13,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  login_frm_txt: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: '#8C8C8C',
  },
  _frm_txt_fld: {
    fontSize: 14,
    lineHeight: 16.94,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: '#8C8C8C',
  },
  globle_btn: {
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  backgrd_img: {
    position: 'relative',
    flex: 1,
  },
  back_img: {
    position: 'absolute',
    right: 0,
    top: 45,
  },
  back_img_one: {
    position: 'absolute',
    left: 0,
    top: 25,
  },

  // start here

  serv_form: {
    position: 'relative',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    height: 54,
    borderWidth: 1.2,
    borderColor: '#0000001A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    flexDirection: 'row',
    width: 50,
  },
  image: {
    height: 18,
    width: 28,
    position: 'absolute',
    top: 18,
    left: 12,
  },

  input_phone: {
    width: 225,
    borderWidth: 1.2,
    borderColor: '#0000001A',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 50,
    borderRadius: 12,
    color: '#1D1D1D',
    flex: 1,
  },
  back_grd_img: {
    position: 'absolute',
    top: 25,
    left: 24,
    color: '#000',
  },
  print_img: {
    position: 'absolute',
    top: 70,
    right: 0,
  },
  input_email: {
    width: 225,
    borderWidth: 1.2,
    borderColor: '#0000001A',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 45,
    borderRadius: 12,
    color: '#1D1D1D',
    flex: 1,
  },
  email_img: {
    position: 'absolute',
    alignItems: 'center',
    top: 17,
    left: 15,
  },

  // =======tp section start here ============

  otp_sec: {
    flexDirection: 'row',
    marginBottom: 37,
    paddingHorizontal: 20,
    justifyContent: 'space-between',

    width: '100%',
  },
  inputfieldError: {
    width: 225,
    borderWidth: 1.2,
    borderColor: '#E7385A',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 47,
    borderRadius: 12,
    color: '#000',
    flex: 1,
  },
  otp_lst: {
    width: 68,
    height: 54,
    borderColor: '#0000001A',
    borderRadius: 12,
    borderWidth: 1.2,
  },
  otp_txt_filled: {
    borderColor: '#000000',
  },
  otp_txt_empty: {
    borderColor: '#0000001A',
  },
  otp_txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%', // Fill parent height to center better
    width: '100%',
  },

  resend_code: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  re_link: {
    color: '#03A878',
  },

  // ============= personal Detail screen start here ================

  per_dtl_sec: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  per_dtl_con: {
    paddingHorizontal: 1,
    marginBottom: 21,
  },
  per_dtl_lst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  border: {
    position: 'relative',
    borderBottomWidth: 4,
    borderColor: '#F3F3F3',
    width: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    left: 27,
    top: 16,
  },
  per_dtl_itm: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  pers_nav: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  pers_navnot_act_itm: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    color: '#727272',
    lineHeight: 16.94,
  },
  pers_navactive_itm: {
    color: '#fff',
  },
  pers_nav_txt: {
    color: '#1D1D1D66',
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    lineHeight: 15.73,
  },
  pers_nav_txt_act: {
    color: '#FE8705',
  },
  form_info: {
    marginBottom: 20,
  },
  address_info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#0000001A',
  },
  other_way: {
    borderWidth: 0,
    borderRadius: 0,
    flexBasis: '100%',
    flexShrink: 1,
    flexGrow: 0,
  },
  loc_icon: {
    marginRight: 15,
  },

  ser_add_abo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  same_asabv: {
    color: '#1D1D1D',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14.52,
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 17,
    lineHeight: 29,
    backgroundColor: '#D9D9D9',
    borderRadius: 39,
  },

  // =================== select services screen ===============

  pers_nav_complete: {
    color: '#1D1D1D',
  },
  serv_con: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  serv_txt: {
    paddingHorizontal: 41,
    textAlign: 'center',
  },
  serv_radio: {
    flexDirection: 'column',
  },
  serv_rad_wrapp: {
    marginBottom: 10,
  },
  serv_btn: {
    flexDirection: 'column',
    height: '100%',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  serv_chos_con: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serv_del_rdo: {
    flexBasis: 105,
    marginRight: 7,
  },
  serv_checkbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox_txt: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 9,
  },

  // ====================Verify id screen ====================
  adhar_con: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // ===================== home screen start =================
  home_con: {
    paddingHorizontal: 16,
    borderBottomWidth: 4,
    borderColor: '#F3F3F3',
    marginBottom: 14,
  },
  header_sec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 61,
  },
  header_wal_noty: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_noty: {
    marginLeft: 17.38,
    position: 'relative',
  },
  wall_con: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redNotify: {
    position: 'absolute',
    top: 3,
    right: 2,
  },

  home_info: {
    paddingHorizontal: 16,
  },
  hom_head_txt: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: '#1D1D1D',
    lineHeight: 20,
    marginBottom: 6,
  },
  hom_job_txt: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    lineHeight: 20,
    color: '#1D1D1D',
  },

  hom_heading: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  rate_con: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 18,
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rate_txt: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    color: '#1D1D1D',
    fontFamily: 'Inter-Medium',
  },
  verify_sec: {
    marginBottom: 20,
  },
  verify_hdtxt: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    lineHeight: 19.36,
    color: '#1D1D1D',
    marginBottom: 12,
  },
  verify_con: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#113766',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verfy_com: {
    color: '#fff',
    marginBottom: 7,
  },
  verify_led: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: 'Inter-Medium',
    color: '#B0CAE9',
  },
  verfy_rgt_txt: {
    backgroundColor: '#415E84',
    lineHeight: 40,
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },

  my_serc_con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  my_serc_itm: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    borderRadius: 10,
    marginBottom: 15,
    flexBasis: '47%',
    flexShrink: 1,
    flexGrow: 0,
  },
  my_serc_itm_txt: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    lineHeight: 19.36,
    color: '#1D1D1D',
    marginBottom: 20,
  },
  my_sercno_txt: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    lineHeight: 14.52,
    color: '#03A878',
    marginBottom: 20,
  },
  my_serc_itm_img: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  my_serc_itm_add: {
    top: 0,
    right: 0,
  },
  my_serc_itm_active: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // paddingHorizontal: 5,
    // paddingVertical: 3,
    // borderTopRightRadius: 15,
    // borderBottomRightRadius: 15,
    // borderTopLeftRadius: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    // paddingHorizontal: 5,
    // paddingVertical: 3,
    marginLeft: 2,
    marginTop: 2,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  my_serc_itm_actv_txt: {
    // fontSize: 8,
    // fontFamily: 'Inter-SemiBold',
    // lineHeight: 9.68,
    // fontWeight: '600',
    // color: '#fff',
    fontSize: 8,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 9.68,
    fontWeight: '600',
    margin: 3,
    color: '#fff',
  },
  tutor_con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tutor_itm: {
    position: 'relative',
    marginRight: 12,
    flexBasis: 160,
    flexGrow: 1,
    flexShrink: 0,
  },
  tutor_itm_img: {
    position: 'absolute',
    left: 59,
    top: 31,
  },

  opt_mor: {
    shadowColor: '#00001FFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
    backgroundColor: '#fff',
    paddingBottom: 23,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  },
  opt_mor_con: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opt_mor_txt: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    lineHeight: 12.1,
    fontWeight: '500',
    color: '#FE8705',
    textAlign: 'center',
  },
  circle: {
    width: 48,
    height: 12,
    position: 'absolute',
    top: 3,
    left: 7,
    transform: [
      {
        translateX: -20,
      },
      {
        translateY: -20,
      },
    ],
    opacity: 1,
    zIndex: 1,
  },
  close_popup: {
    left: '47%',
    top: 4,
    zIndex: -1,
    position: 'absolute',
  },
  popup_con: {
    marginBottom: 17,
    alignItems: 'center',
    position: 'relative',
  },

  popup: {
    backgroundColor: '#24242466',
    width: '100%',
    height: '100%',
    position: 'static',
    top: 0,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopRightRadius: 23,
    borderTopLeftRadius: 23,
  },
  walking_more: {
    backgroundColor: '#fff',
    paddingTop: 30,
    borderBottomWidth: 1,
    borderColor: '#0000001A',
    position: 'relative',
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    marginBottom: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  popup_more_opt: {
    marginBottom: 8,
    backgroundColor: '#F4F4F4',
    borderRadius: 38,
    paddingVertical: 11,
  },

  // new cards extented

  Extend_srvc_con: {
    marginRight: 15,
    borderRadius: 10, // Optional: smooth edges
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: 'transparent',
    marginBottom: 20,
    width: 250,
    flexBasis: 250,
    flexGrow: 1,
    flexShrink: 0,
  },
  Extend_srvc_info: {
    backgroundColor: '#FEAD54',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  Extend_srvc_itm: {
    flexDirection: 'row',
  },
  Extend_srvc_lft: {
    marginRight: 10,
  },
  Extend__rgt_con: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  Extend__rgt_txt: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 14.52,
    fontWeight: '600',
    color: '#1D1D1D',
  },
  Extend__rgt_btntxt: {
    fontSize: 8,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 9.68,
    fontWeight: '600',
    color: '#E96169',
  },
  Extend__rgt_btn: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderRadius: 20,
    paddingVertical: 4,
    marginLeft: 4.67,
  },
  Extend_srvc_addtxt: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    lineHeight: 12.1,
    fontWeight: '400',
    color: '#1D1D1D',
    marginBottom: 7,
  },
  Extend_amnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  Extend_srvc_amnttxt: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    lineHeight: 21.78,
    fontWeight: '700',
    color: '#FE8705',
  },
  ext_accpt_btn: {
    lineHeight: 37,
    backgroundColor: '#FE8705',
    paddingHorizontal: 11,
  },
  exmtimr_amnt: {
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  extented_labelsec: {
    paddingHorizontal: 18,
    borderTopLeftRadius: 48,
    borderBottomLeftRadius: 48,
  },

  extented_label: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  exten_btn: {
    borderWidth: 1,
    color: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
    // flexBasis: 150,
    // flexGrow: 1,
    // flexShrink: 0,
    borderColor: '#00000033',
    borderRadius: 6,
    marginRight: 15,
    // height: 36
  },
  exten_accpt_btn: {
    flexBasis: 165,
    flexGrow: 1,
    flexShrink: 0,
  },
  exten_btn_rejct: {
    color: '#222222',
    fontSize: 13,
    lineHeight: 36,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },

  //   ================New job tas screen ======================
  newjobs_tab: {},
  newjob_sec: {
    paddingHorizontal: 16,
    marginTop: 19,
  },
  newjob_con: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingLeft: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingBottom: 12,
    paddingTop: 18,
    marginBottom: 18,
  },
  newjob_txt_con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newjob_lst: {
    flexDirection: 'row',
    marginBottom: 9,
  },
  newjob_itm_lft: {
    marginRight: 11,
  },
  newjob_txt_lft: {
    flexBasis: 178,
    flexGrow: 1,
    flexShrink: 0,
  },
  job_exp: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 20,
    fontWeight: '600',
    color: '#1D1D1D',
    marginBottom: 4,
  },
  job_day: {
    color: '#8C8C8C',
  },
  job_distc: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distc_txt: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    lineHeight: 24,
    fontWeight: '500',
    color: '#1D1D1D',
    marginLeft: 5,
  },
  newjob_itm_rate: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    lineHeight: 20,
    fontWeight: '500',
    color: '#1D1D1D',
    marginBottom: 4,
  },
  newjob_rate_day: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    lineHeight: 24,
    fontWeight: '500',
    color: '#8C8C8C',
  },
  newjob_txt_rgt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newjob_btn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  newjob_btn_con: {
    marginLeft: 12,
  },

  newquta_btn: {
    borderColor: '#03A878',
    paddingHorizontal: 40,
    color: '#1D1D1D',
  },
  newquta_btn_con: {
    marginLeft: 12,
  },
  actjob_btn: {
    justifyContent: 'space-between',
    paddingRight: 0,
  },
  newactjob_btn: {
    paddingHorizontal: 35,
    lineHeight: 40,
  },
  actjob_btn_lin: {
    borderRadius: 25,
  },
  actjob_lft: {
    flexBasis: 135,
    flexGrow: 1,
    flexShrink: 0,
  },
  actjob_time: {
    lineHeight: 14.52,
    color: '#8C8C8C',
    marginBottom: 11,
  },
  actjob_view: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    lineHeight: 20,
    fontWeight: '500',
    color: '#8C8C8C',
    textAlign: 'right',
  },
  actjob_viewact: {
    color: '#FE8705',
  },
  all_quotes: {
    alignItems: 'center',
  },
  all_quotes_lft: {
    flexBasis: 145,
  },
  all_quotes_lft_txt: {
    marginLeft: 0,
  },
  all_quot_edit: {
    justifyContent: 'flex-end',
  },
  othr_quot_hd: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 19.34,
    fontWeight: '600',
    color: '#1D1D1D',
  },

  othr_qout_sec: {
    // paddingVertical: 10,
    paddingHorizontal: 16,
  },

  // ====================== quotes detail screen ===============
  quot_dtls_sec: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  quot_dtls_con: {
    borderWidth: 1,
    borderColor: '#0000001A',
    backgroundColor: '#fff',
    paddingTop: 21,
    borderRadius: 12,
    marginBottom: 20,
  },
  quot_dtls_accrd_itm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#00000033',
    paddingHorizontal: 19,
    paddingBottom: 20,
  },
  quot_dtls_hd: {
    fontSize: 16,
    color: '#1D1D1D',
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    lineHeight: 19.34,
  },
  pakg_time_con: {
    paddingHorizontal: 19,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#00000033',
  },
  pakg_time_lst: {
    paddingTop: 18,
    paddingBottom: 20,
  },
  pakg_time_itm: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lst_dots: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    color: '#1D1D1D',
    marginRight: 10,
  },
  lst_dots_txt: {
    fontSize: 14,
    color: '#1D1D1D',
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    lineHeight: 36,
  },
  pakg_time_itmedit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  edit_optn: {
    justifyContent: 'space-between',
  },

  pakg_incld_con: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#00000033',
  },

  packg_tmedit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pakg_incld: {
    paddingHorizontal: 12,
    paddingTop: 19,
    marginBottom: 22,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D9D9D9',
  },
  pakg_incld_lst: {
    paddingHorizontal: 7,
  },
  packg_addon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flex: 1,
  },
  packg_addon_lft: {
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 48,
    paddingHorizontal: 14,
  },
  packg_addon_rgt: {
    height: 36,
  },
  apackg_addon_txt: {
    borderWidth: 1,
    borderColor: '#0000001A',
    paddingHorizontal: 20,
    color: '#393939',
    fontSize: 13,
    lineHeight: 15,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    borderRadius: 8,
  },
  pakg_totl_amt: {
    paddingTop: 19,
    paddingHorizontal: 12,
  },
  pakg_totl_con: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  discont_txt: {
    color: '#979797',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
  },
  discont_opt: {
    borderWidth: 1,
    borderColor: '#FE8705',
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    height: 38,
  },
  discont_opttxt: {
    color: '#1D1D1D',
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  pakg_charg: {
    color: '#1D1D1D',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    lineHeight: 15.37,
  },
  //============== popup=================
  detail_pop: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  filter_popup_sec: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  filter_popup_rgt: {
    marginBottom: 7,
  },
  clock_time_img: {
    marginBottom: 24,
  },
  prefr_time_txt: {
    color: '#1D1D1D',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    lineHeight: 24.2,
    marginBottom: 27,
  },
  // ====================== notification screen ==============
  noti_sec: {
    paddingTop: 4,
  },
  noti_lst: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  noti_lst_lft: {
    Height: 41,
    Width: 41,
    backgroundColor: '#F5D3C8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 13,
    marginLeft: 17,
  },
  noti_lst_rgt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#0000001A',
    paddingVertical: 16,
  },
  noti_lst_amont: {
    marginRight: 16,
  },
  noti_amont_txt: {
    color: '#03A878',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    lineHeight: 18.15,
  },
  noti_lst_txt: {
    color: '#1D1D1D',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    lineHeight: 19.94,
  },
  noti_time_txt: {
    color: '#7E7E7E',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    lineHeight: 14.52,
  },

  // ====================== Message screen ==============
  messg_sec: {},
  messg_con: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 17,
    borderBottomWidth: 1,
    paddingVertical: 21,
    borderColor: '#0000001A',
  },
  messg_con_lft: {
    marginRight: 17,
    borderRadius: 28,
    width: 56,
    height: 56,
  },
  messg_con_rgt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  messgr_name: {
    color: '#1D1D1D',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    lineHeight: 16.94,
    marginBottom: 11,
  },
  messgr_text: {
    color: '#1D1D1D',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    lineHeight: 15.73,
    marginRight: 13,
  },
  messgr_time: {
    color: '#1D1D1D',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    lineHeight: 13.31,
  },
  messgr_notif: {
    backgroundColor: '#E4B405',
    width: 18,
    height: 18,
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 9,
    marginTop: 11,
  },
  messgr_notif_num: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    lineHeight: 13.31,
  },
  // =============custom header ===========
  custm_hdr_con: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderColor: '#F3F3F3',
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  custm_hdr_lft: {
    marginRight: 21,
  },
  custm_hdr_rgt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mesngr_img: {
    marginRight: 8,
  },
  communi_sec: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  communi_con: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  communi_con_lft: {
    width: 38,
    height: 38,
    backgroundColor: '#03A878',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
    borderRadius: 19,
    marginRight: 22,
  },
  communi_name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    color: '#fff',
  },
  communi_chat: {
    paddingRight: 10,
    paddingLeft: 13,
    paddingBottom: 10,
    paddingTop: 9,
    backgroundColor: '#F7F7F7',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    color: '#1D1D1D',
    width: '100%',
    textAlign: 'justify',
    lineHeight: 20,
  },
  communi_con_rgt: {
    flex: 1,
    height: '100%',
  },

  // =========================account screen ================================

  accnt_shrlnk: {
    paddingHorizontal: 16,
  },
  accnt_shr_con: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 10,
    marginBottom: 20,
  },
  accnt_invit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  accnt_invit_lft: {
    maxWidth: 187,
  },
  accnt_invit_rgt: {
    paddingRight: 14,
  },
  accnt_invit_txt: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    color: '#fff',
    lineHeight: 26.63,
    marginBottom: 9,
  },
  accnt_invit_para: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: '#fff',
    lineHeight: 15.73,
  },
  share_btn_lst: {
    flexDirection: 'row',
  },
  linear_share: {
    borderRadius: 25,
  },
  share_btn_lft: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 19,
    paddingRight: 22,
  },
  share_btn_rgt: {
    borderRadius: 25,
    paddingLeft: 19,
    paddingRight: 22,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 13,
  },
  share_txt: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    color: '#fff',
    marginLeft: 9,
  },
  shr_lnk_txt: {
    color: '#1D1D1D',
  },
  accnt_edit_con: {
    backgroundColor: '#F7F7F7',
    paddingVertical: 17,
    paddingLeft: 15,
    paddingRight: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginBottom: 20,
  },
  accnt_edit_lft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  accnt_edit_rgt: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  accnt_img: {
    marginRight: 11,
  },
  accnt_edit_txt: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: '#1D1D1D',
    lineHeight: 16.94,
  },
  accnt_edit_btn: {
    lineHeight: 40,
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    color: '#fff',
    paddingHorizontal: 28,
    backgroundColor: '#03A878',
    borderRadius: 25,
    marginRight: 19,
  },
  earing_sec: {
    padding: 7,
    marginBottom: 20,
  },

  earing_con: {
    flexDirection: 'row',
  },
  earing_itm: {
    paddingVertical: 17,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 7,
    // width: 100
    flexBasis: 100,
    flexGrow: 1,
    flexShrink: 0,
  },
  earing_con_img: {
    marginBottom: 18,
  },
  earing_info_txt: {
    lineHeight: 19.36,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    color: '#FA9700',
    textAlign: 'center',
    marginBottom: 5,
  },
  earing_txt: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: '#1D1D1D',
    lineHeight: 14.52,
  },
  account_list: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  account_list_itm: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#0000001A',
  },
  account_list_lft: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 83,
    flex: 1,
  },
  account_list_img: {
    marginRight: 17,
    width: 23.41,
    height: 23.5,
  },
  account_list_rgt: {
    paddingRight: 23,
  },

  // =========================profile screen of sp==============

  edit_prof_con: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  edit_profimg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  edit_add_img: {
    position: 'absolute',
    bottom: 0,
    left: '55%',
  },
  edit_frm_itm: {
    marginBottom: 20,
  },
  edit_frm_input: {
    flexDirection: 'row',
    borderWidth: 1.2,
    borderColor: '#0000001A',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  prof_txt: {
    borderWidth: 0,
  },
  address_lable: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 25,
    maxWidth: 107,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 33,
    marginBottom: 20,
  },
  address_lable_txt: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    lineHeight: 29,
    color: '#4E4E4E',
  },
  pin_code_con: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pin_code_itm: {
    flexBasis: 155,
    flexGrow: 1,
    flexShrink: 0,
    marginRight: 15,
  },

  // ============================verification screen =====================
  vrfy_con: {
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
    marginBottom: 206,
  },
  pend_line: {
    borderBottomWidth: 1.2,
    position: 'relative',
    top: 12,
    borderColor: '#0000001A',
  },
  pend_hd: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pend_hd_txt: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    lineHeight: 19.38,
    color: '#4E4E4E',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  pending_con: {
    marginBottom: 20,
  },
  pend_verfy_itm: {
    borderWidth: 1,
    borderColor: '#0000001A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 23,
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 10,
  },
  very_email: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  very_email_img: {
    backgroundColor: '#F9F9F9',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },
  very_email_txt: {
    fontSize: 14,
    color: '#1D1D1D',
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  pend_verfy_con: {
    marginBottom: 20,
  },
  complete_con: {
    marginBottom: 20,
  },

  verfy_pet: {
    backgroundColor: '#FAEEE0',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flex: 1,
    marginBottom: 17,
  },
  verfy_pet_txt: {
    fontSize: 13,
    color: '#1D1D1D',
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    color: '#575757',
  },

  // search location page start here
  srch_loct: {},
  srch_loct_sec: {
    marginHorizontal: 16,
    // position: 'relative',
    borderWidth: 1.2,
    borderColor: '#0000001A',
    marginTop: 20,
    borderRadius: 12,
    height: 46,
    flexDirection: 'row',
    marginBottom: 21,
    paddingHorizontal: 16,
  },
  loct_srch_img: {
    marginRight: 10,
    justifyContent: 'center',
  },
  srch_txt: {
    color: '#4E4E4E',
    fontFamily: 'Inter',
    width: '100%',
    paddingRight: 47,
  },
  navig: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#0000001A',
    marginBottom: 10,
  },
  navig_txt: {
    color: '#E96169',
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  srch_detl: {
    marginHorizontal: 16,
  },
  srch_add_info: {
    marginBottom: 20,
  },
  srch_detl_txt: {
    fontSize: 13,
    color: '#979797',
    fontFamily: 'Inter-Medium',
    marginBottom: 18,
    fontWeight: '500',
  },
  srch_con: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  srch_con_txt: {
    fontSize: 14,
    color: '#1D1D1D',
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    marginLeft: 8,
  },
  srch_add_con: {},
  srch_add_txt: {
    fontSize: 13,
    color: '#808080',
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
  },

  // search location page end here

  // ===============================photo & video screen ===========================
  pho_vdo_sec: {
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  pho_vdo_tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pho_vdo_tab_itm: {
    borderWidth: 1,
    borderColor: '#0000001A',
    borderRadius: 48,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    flexBasis: 200,
    flexGrow: 1,
    flexShrink: 1,
    marginRight: 9,
    justifyContent: 'center',
    marginBottom: 15,
  },
  pho_vdo_tab_txt: {
    fontSize: 12,
    color: '#1D1D1D',
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    lineHeight: 14.52,
  },
  pho_vdo_upload: {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderRadius: 12,
    borderColor: '#03A878',
    height: 54,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  upload_txt: {
    color: '#03A878',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    lineHeight: 16.94,
  },
  pho_con_hd: {
    color: '#1D1D1D',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    lineHeight: 16.94,
    marginLeft: 3,
    marginBottom: 10,
  },
  pho_lst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    // backgroundColor: '#f00',
  },
  pho_itm: {
    flexBasis: 130,
    flexGrow: 1,
    flexShrink: 0,
    // position: 'relative',
    marginRight: 8,
    marginBottom: 10,
    // justifyContent: 'center',
  },
  pho_itm_two: {
    maxHeight: 219,
  },
  photos: {
    maxWidth: '100%',
  },
  vdo_play_btn: {
    position: 'absolute',
    transform: [
      {
        translateX: 50,
      },
      {
        translateY: 50,
      },
    ],
  },

  //========= new job screen==============
  walk_time_txt_strt: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    color: '#00000052',
    lineHeight: 20,
  },
  walk_time_txt: {
    color: '#FF9700',
  },
  act_serv_exted: {
    backgroundColor: '#F2F2F2',
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  actv_serv_rgt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  call_menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actv_track_btn: {
    lineHeight: 37,
    borderWidth: 1.2,
    paddingHorizontal: 49,
    borderRadius: 66,
    borderColor: '#03A878',
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1D',
    backgroundColor: '#fff',
  },
  active_job_sec: {
    backgroundColor: '#fff',
  },

  active_servc_sec: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#0000001A',
    borderRadius: 12,
    borderBottomEndRadius: 12,
  },
  view_all: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#8C8C8C',
    fontWeight: '500',
    lineHeight: 20,
  },
  serv_walk_act: {
    paddingTop: 18,
  },
  job_lst_con: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderColor: '#00000033',
  },
  clock_txt: {
    color: '#8C8C8C',
    fontSize: 12,
    lineHeight: 14.52,
  },

  // ====================deatis new job popup===================
  // select walking type page  popup start here
  walk_type_popup: {
    backgroundColor: '#fff',
    paddingTop: 27,
    borderBottomWidth: 1,
    borderColor: '#0000001A',
    position: 'relative',
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    marginBottom: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  walk_typ_pop_hd: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  walk_morn_time: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  morn_logo: {
    width: 32,
    height: 32,
    backgroundColor: '#DDE8F8',
    borderRadius: 50,
    marginRight: 8,
    paddingLeft: 10,
    paddingRight: 9,
    paddingTop: 9,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walk_selt_time: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  walk_selt_time_itm: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 48,
    marginRight: 8,
  },

  popup_txt_hd: {
    fontWeight: '600',
    marginBottom: 6,
  },
  popup_txt_para: {
    fontSize: 13,
    fontWeight: '400',
    color: '#1D1D1D',
    lineHeight: 15.74,
    fontFamily: 'Inter-Regular',
  },

  offr_ava: {
    lineHeight: 18,
    color: '#3D3D3D',
    backgroundColor: '#E9F4EE',
    paddingLeft: 6.5,
    borderRadius: 32,
    width: 58,
    fontSize: 8,
  },
  offer_ava_active: {
    backgroundColor: '#E96169',
    color: '#fff',
  },
  my_prof_txt: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1D1D1D',
  },
  aftr_nun_logo: {
    backgroundColor: '#FAEBD6',
  },
  even_logo: {
    backgroundColor: '#E0E0EA',
  },
  pet_prof_btn_sec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  popup_detl_btn: {
    marginRight: 15,
    flexBasis: 152,
    flexGrow: 1,
    flexShrink: 0,
  },

  // bank deatsils screen
  bank_detl_sec: {
    marginTop: 20,
  },
  bank_con: {
    paddingHorizontal: 16,
  },
  bank_detl_itm: {
    marginBottom: 30,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  bank_detl_lst: {
    borderWidth: 1.2,
    borderColor: '#0000001A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  bank_detl__txt: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14.52,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1D',
  },

  // new screen verification
  verify_form_sec: {
    paddingTop: 20,
    paddingHorizontal: 16,
    flex: 1,
  },

  input_newfield: {
    height: 63,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#0000001A',
    paddingLeft: 10,
    color: '#1F1F1F',
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
  verify_form_btn: {
    marginBottom: 24,
  },
  new_Verfiy_txt: {
    color: '#8A8A8A',
  },

  postcars_con: {
    borderWidth: 1,
    borderColor: '#0000001A',
    backgroundColor: '#fff',
    paddingHorizontal: 7,
    paddingVertical: 17,
    borderRadius: 12,
    marginBottom: 35,
  },
  postcars_itm: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addresss_mark: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14.52,
    fontFamily: 'Inter-SemiBold',
    color: '#1D1D1D',
  },
  addresss_info_con: {
    marginLeft: 30,
    maxWidth: 206,
    marginBottom: 10,
  },
  addresss_info: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
    color: ' #8C8C8C',
  },
  address_chang: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 30,
  },
  post_card_note: {
    flexDirection: 'row',
    maxWidth: 300,
    marginRight: 16,
  },
  post_note_txt: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 17.52,
    fontFamily: 'Inter-Regular',
    color: '#1D1D1D',
  },

  // ==============wallet screen start ======================
  wallet_sec: {
    // paddingVertical: 20,
    // paddingHorizontal: 16,
  },
  wallet_trans: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  wallet_grad: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 20,
    borderRadius: 10,
  },
  wallet_lin_con: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wallet_balnc_txt: {
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Inter-Medium',
    lineHeight: 15.73,
    fontWeight: '500',
    marginBottom: 3,
  },
  wallet_amont_txt: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Inter-Bold',
    lineHeight: 26.63,
    fontWeight: '700',
    marginBottom: 8,
  },
  walleet_withdral_btn: {
    maxWidth: 90,
  },
  wallet_widral_txt: {
    fontSize: 12,
    color: '#5044E4',
    fontFamily: 'Inter-Medium',
    lineHeight: 44,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 6,
  },
  wallet_filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wallet_filte_txt: {
    color: '#4E4E4E',
    fontFamily: 'Inter-SemiBold',
    lineHeight: 19.63,
    fontWeight: '600',
    flex: 1,
  },

  // new css for validation
  errorContainer: {
    position: 'absolute',
    top: 20, // Position error text right below input
    left: 100,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontStyle: 'Inter-Regular',
    fontWeight: '400',
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  errorstrip: {
    backgroundColor: '#facddb',
    paddingVertical: 5,
    marginHorizontal: 16,
    alignItems: 'center',
    borderRadius: 4,
  },

  // pet detail screen

  // walking summary page
  walk_section: {
    marginHorizontal: 16,
  },
  walk_hd: {
    marginBottom: 12,
    marginTop: 20,
  },
  walk_info_sec: {
    borderWidth: 1,
    borderColor: '#0000001A',
    borderRadius: 12,
    marginBottom: 20,
  },
  walk_con_top: {
    borderWidth: 0,
    marginHorizontal: 0,
  },
  walk_info_con: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    paddingHorizontal: 16,
    borderColor: '#00000033',
  },
  walk_info_con2: {
    // borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#00000033',
  },
  walk_info_lft: {
    alignItems: 'center',
  },

  walk_con_lst: {
    borderBottomWidth: 0,
    paddingLeft: 16,
    alignItems: 'center',
  },
  walk_con_lst_txt: {
    color: '#1D1D1D',
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },

  walk_con: {
    borderColor: '#00000033',
  },
  walk_saves: {
    backgroundColor: '#D7FFE7',
    padding: 0,
  },
  walk_sav_con: {
    justifyContent: 'space-between',
    height: 69,
    paddingTop: 22,
  },
  walk_sav_con_txt: {
    marginLeft: 8,
  },
  walk_sav_con_btn: {
    borderWidth: 1,
    lineHeight: 29,
    paddingHorizontal: 10,
    borderColor: '#E96169',
  },
  walk_sav_con_btn_txt: {
    color: '#E96169',
    fontWeight: '600',
  },
  walk_bill_lst: {
    borderBottomWidth: 1,
    paddingBottom: 0,
    borderStyle: 'dashed',
    paddingHorizontal: -11,
    marginHorizontal: 15,
  },
  walk_bill_txt: {
    color: '#979797',
  },
  walk_check: {
    marginRight: 44,
    color: '#464646',
  },
  walk_checkcon: {
    backgroundColor: '#F7FBFE',
    paddingBottom: 14,
    paddingVertical: 22,
    borderRadius: 12,
  },
  protect: {
    color: '#E96169',
  },
  walk_totl_grnd: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 19,
  },
  walk_totl_btn: {
    paddingHorizontal: 44,
  },
  walk_totl_grnd_lft: {},
  walk_totl_grnd_rgt: {},
  grand_totl_txt: {
    color: '#1D1D1D',
    fontSize: 15,
    lineHeight: 18.15,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  grand_totl_: {
    color: '#464646',
    fontSize: 13,
    lineHeight: 15.73,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  linear_exprs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lin_expack: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderTopLeftRadius: 48,
    borderBottomLeftRadius: 48,
    marginLeft: 20,
  },
  lin_expack_txt: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  othr_qout_con: {
    marginBottom: 10,
  },
  acnt_itm: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 22,
  },
  acnt_lst: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    borderBottomWidth: 1,
    borderColor: '#0000001A',
  },
  servc_pac_itm_txt: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.94,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1D',
    marginLeft: 7,
  },
  receive_info_con: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user_pro: {
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: 107,
    flexGrow: 1,
    flexShrink: 0,
    marginBottom: 20,
  },
  ser_dtl_lst: {
    alignItems: 'center',
  },

  // dummynew screen
  coming_Soon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boarding_coming_con: {
    paddingHorizontal: 26,
    marginTop: 20,
  },
  boarding_coming_txt: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24.4,
    fontFamily: 'Inter-SemiBold',
    color: '#1D1D1D',
    textAlign: 'center',
  },
  boarding_coming_para: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.9,
    fontFamily: 'Inter-Medium',
    color: '#808080',
    textAlign: 'center',
    marginBottom: 37,
    marginTop: 20,
  },
  error: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    paddingHorizontal: 16,
  },

  bankdtl_card: {
    borderWidth: 1,
    borderColor: '#0000001A',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 20,
    marginHorizontal: 15,
    paddingTop: 20,
  },
  bankdtl_info: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#0000001A',
    marginBottom: 10,
    paddingBottom: 10,
  },
  bankdtl_numtxt: {
    color: '#1D1D1D',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    paddingHorizontal: 16,
  },
  bankdtl_infotxt: {
    marginBottom: 10,
    color: '#1D1D1D',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
  },
  dele_img: {
    postion: 'abolute',
    top: 0,
    right: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 12,
  },
  // dele_imgstyl:{
  //     backgroundColor:'#fff',
  //     paddingHorizontal:15,
  //     paddingVertical:20,
  // }

  goormTrack_sec: {
    // marginHorizontal: 16,
    // marginVertical: 20
  },
  goormTrack_con: {
    borderWidth: 1,
    borderColor: '#0000001A',
    paddingTop: 19,
    paddingBottom: 13,
    borderRadius: 12,
    marginBottom: 16,
  },
  groomSer_comptrak: {
    paddingLeft: 20,
    flexDirection: 'row',
    paddingBottom: 18,
  },
  goormTrack_txt: {
    color: '#1D1D1D',
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    lineHeight: 24.2,
    fontWeight: '600',
    marginBottom: 7,
  },
  goormTrack_para: {
    color: '#7E7E7E',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 14.52,
    fontWeight: '500',
    maxWidth: 232,
  },
  complt_mark: {
    backgroundColor: '#D3FFDA',
    paddingHorizontal: 6,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  complt_marktxt: {
    color: '#4BAF4F',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 14.52,
    fontWeight: '500',
  },
  goormTrack_item: {
    marginHorizontal: 20,
    borderTopWidth: 1.2,
    paddingTop: 13,
    borderColor: '#EBEBEB',
    marginBottom: 15,
    borderBottomWidth: 1,
  },
  goormTrack_pagname: {
    color: '#1D1D1D',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '500',
    // marginBottom:10
  },
  goormTrack_time: {
    marginBottom: 10,
  },

  goormTrack_list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goormTrack_timetxt: {
    color: '#1D1D1D',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 14.52,
    fontWeight: '500',
  },

  goormTrack_listtxt: {
    color: '#1D1D1D',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 16.94,
    fontWeight: '500',
  },
  checkboxgroom: {
    width: 30,
    height: 30,
    borderRadius: 15, // Makes it a circle
    borderWidth: 2,
    borderColor: '#aaa', // Default border color
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_more_inktxt: {
    color: '#E96169',
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    lineHeight: 15.73,
    fontWeight: '500',
    textAlign: 'center',
  },
  view_more_ink: {
    marginTop: 15,
    paddingBottom: 21,
  },
  goormTrack_itembtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groom_video: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 20,
    borderColor: '#0000001A',
    borderRadius: 12,
  },
  groom_video_lft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groom_video_lfttxt: {
    color: '#1D1D1D',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 16.96,
    fontWeight: '500',
  },
  circleContainer: {
    width: 30, // Adjust the size of the circle
    height: 30, // Same height to maintain the circular shape
    borderRadius: 20, // Make it a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#EBEBEB', // Border color for the circle
    marginBottom: 13,
  },
  checkedCircle: {
    backgroundColor: '#4BAF4F', // Change background color when checked
  },
  hiddenCheckBox: {
    position: 'absolute',
    opacity: 0, // Hides the default checkbox
  },
  checkmark: {
    fontSize: 13, // Size of the checkmark
    color: '#fff', // Color of the checkmark (white)
    justifyContent: 'center',
    alignItems: 'center',
  },
  pet_shop_header: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderColor: '#0000001A',
    alignItems: 'center',
  },

  //   new bank detail screen

  bank_info: {
    paddingVertical: 15,
  },
  bank_infoname: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bank_img: {
    width: 35,
    height: 35,
    // backgroundColor: '#FFECD8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 13,
  },
  bank_acconttxt: {
    fontSize: 14,
    color: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  bank_code: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bank_codelft: {
    marginRight: 10,
  },
  bank_data: {
    borderBottomWidth: 1,
    borderColor: '#0000001A',
    paddingBottom: 20,
    marginBottom: 30,
  },
  add_bank: {
    alignItems: 'center',
  },
  add_bank_txt: {
    fontSize: 14,
    color: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 36,
  },

  // skill popup sction
  skillpopup_con: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 23,
  },
  skillpopup_hd: {
    fontSize: 20,
    color: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 10,
    textAlign: 'center',
  },
  skillpopup_para: {
    fontSize: 13,
    color: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    marginBottom: 18,
    textAlign: 'center',
  },
  skillpopup_lst: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  skillpopup_itm: {
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 44,
    paddingVertical: 7,
    paddingHorizontal: 16,
    marginBottom: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
  skillpopup_itmtxt: {
    fontSize: 12,
    color: '#1D1D1D',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    marginRight: 13,
  },
  skilltrain: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
    marginHorizontal: 16,
  },
  skill_update: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popbtn: {
    flexBasis: 143,
    flexGrow: 1,
    flexShrink: 0,
  },
  // Training Tracking screen
  train_trckcon: {
    marginHorizontal: 16,
    marginBottom: 250,
  },
  train_trckhd: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
    color: '#1D1D1D',
    marginBottom: 15,
  },
  tack_commandcon: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },

  commnd_pro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#0000000F',
    paddingBottom: 12,
    marginBottom: 10,
  },
  in_progress: {
    backgroundColor: '#FFE0A4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#B7821B',
    borderRadius: 30,
    fontSize: 9,
    marginRight: 5,
  },
  tack_command: {
    marginBottom: 20,
  },
  app_rejt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  app_rejtlft: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexBasis: 140,
    flexGrow: 1,
    flexShrink: 0,
    height: 32,
    borderRadius: 48,
  },
  track_updatecon: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 23,
    borderColor: '#0000001A',
    paddingBottom: 23,
    paddingTop: 13,
  },
  track_updateitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  track_updatelft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track_updatergt: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  session_itm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  session_itmlft: {
    borderWidth: 1,
    borderColor: '#00BC71',
    backgroundColor: '#00BC7126',
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 20,
  },
  sessionlft_txt: {
    fontSize: 11,
    fontWeight: '500',
    color: '#00BC71',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
  sessionrgt_txt: {
    fontSize: 14,
    fontWeight: '400',
    color: '#00000052',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  track_updatelfttxt: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1D1D1D',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    marginLeft: 12,
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 12,
    marginBottom: 12,
    borderStyle: 'dotted',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1D1D1D',
    fontFamily: 'Inter-SemiBold',
  },
  price: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1D1D1D',
    fontFamily: 'Inter-SemiBold',
  },
  commandsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  commandItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  tickIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  commandText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#1D1D1D',
    fontFamily: 'Inter-Regular',
  },
});
