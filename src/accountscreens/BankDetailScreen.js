
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import globle_Style from '../css/globle_Style';
import BankDetail from '../../assets/images/bankDetail.svg'
import DeleteImg from '../../assets/images/del_img.svg';
import AddBank from '../../assets/images/add_bank.svg'
import LinearGradient from 'react-native-linear-gradient';
import { API_BASE_URL } from '../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const BankDetailScreen2 = ({ route }) => {

	const [bankDetails, setBankDetails] = useState([])
	const { name } = route.params;
	const [isLoading, setIsLoading] = useState(true)
	const [selectRadio, setselectedRadio] = useState(1)
	const navigation = useNavigation();

	useFocusEffect(
		React.useCallback(() => {
			fetchBankData()

			return () => console.log('Screen unfocused');
		}, [])
	);


	const fetchBankData = async () => {

		let userData = ""
		const userDataString = await AsyncStorage.getItem('userData');
		if (userDataString) {
			userData = JSON.parse(userDataString);
		}
		const url = `${API_BASE_URL}provider/${userData.id}/banks`;
		// const url = `https://cmschamps.com/petsfolio/api/provider/307/banks`;

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${userData.token}`,
					// 'Authorization': `Bearer 5df16843fb47041c63db73c8c3a99449`,
					'Content-Type': 'application/json'
				}
			});

			const result = await response.json();
			if (result.status) {

				setBankDetails(result.data)
				console.warn(result)
				setIsLoading(false)

				// setSPDetails(result.data);

			} else {
				setBankDetails([])
				setIsLoading(false)
				// setIsLoading(false)
				console.warn("ELSEEE :: ", result);
			}
		} catch (error) {
			console.warn('Network request failed :: ', error);
		}
	}

	const formatNumber = (number) => {
		const numString = number; // Convert the number to a string
		const lastFourDigits = numString.slice(-4); // Get the last 4 digits
		const maskedPart = 'X'.repeat(numString.length - 4); // Replace the rest with 'x'
		return `${maskedPart}${lastFourDigits}`;
	};

	const navigateToNewScreen = () => {

		navigation.navigate('Bank Details')
	}



	const BankView = (item) => {

		return (
			<View
				style={[
					globle_Style.radioWapper,
					{ height: 'auto', marginLeft: 16, marginBottom: 20 },
					selectRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper,
					{ height: 'auto', marginLeft: 16 },
				]}
			>
				{/* Delete Icon */}
				<TouchableOpacity
					style={{
						position: 'absolute',
						top: 8,
						right: 8,
						zIndex: 1,
					}}
					onPress={() => { DeleteDialog(item.id) }}
				>
					<DeleteImg width={20} height={20} />
				</TouchableOpacity>

				<View style={globle_Style.bank_info}>
					<View style={globle_Style.bank_infoname}>
						<View style={globle_Style.bank_img}>
							<BankDetail />
						</View>
						<View style={globle_Style.bank_accontname}>
							<Text style={globle_Style.bank_acconttxt}>
								{formatNumber(item.account_number)}
							</Text>
							<Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>
								{item.bank_name}
							</Text>
						</View>
					</View>
					<View style={globle_Style.bank_code}>
						<View style={globle_Style.bank_codelft}>
							<Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>IFSC</Text>
							<Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>Beneficiary</Text>
						</View>
						<View style={globle_Style.bank_codergt}>
							<Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>
								: {item.ifsc_code}
							</Text>
							<Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>
								: {item.account_holder_name}
							</Text>
						</View>
					</View>
				</View>
			</View>

		)


	}

	const DeleteDialog = (Id) => {
		Alert.alert("Delete", "Are you sure you want to delete?",
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Yes",
					onPress: () => {
						DeleteImgAPI(Id)
					}
				}
			]
		);
	}

	const DeleteImgAPI = async (Id) => {


		let userData = ""
		const userDataString = await AsyncStorage.getItem('userData');
		if (userDataString) {
			userData = JSON.parse(userDataString);
		}
		// ${userData.id}
		const url = `${API_BASE_URL}provider/deleteBank`;


		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${userData.token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					bank_id: Id,
					provider_id: userData.id
				})
			});
			const result = await response.json();

			if (result.status) {
				console.warn(result);
				fetchBankData();
				// setProfile({ url: result.data.profile, base64: null });
				// setIsLoading(false)

			} else {
				console.warn("ELSEEE :: ", response);
			}
		} catch (error) {
			console.warn('Network request failed :: ', error);
		}
	}


	return (
		<View style={globle_Style.container}>

			{isLoading ? (
				<ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
			) : (
				// <View style={globle_Style.bankdtl_card}>
				// 	<View style={globle_Style.bankdtl_info}>
				// 		<View style={globle_Style.bankdtl_image}>
				// 			<BankDetail style={{ maxWidth: 35, maxHeight: 35 }} />
				// 		</View>
				// 		<View style={globle_Style.bankdtl_number}>
				// 			<Text style={globle_Style.bankdtl_numtxt}>
				// 				{/* {formatNumber(bankDetails.account_number)} */}
				// 				Account number: {bankDetails[0].account_number}
				// 			</Text>
				// 		</View>
				// 	</View>
				// 	<View style={globle_Style.bank_info}>
				// 		<Text style={globle_Style.bankdtl_infotxt}>IFSC Code: {bankDetails[0].ifsc_code}</Text>
				// 		{/* <Text style={globle_Style.bankdtl_infotxt}>A/C Holder Name: {name}</Text> */}
				// 	</View>
				// </View>

				<View style={[globle_Style.quot_dtls_con, { borderWidth: 0 }]}>
					<View style={globle_Style.accrd_con}>
						<View style={[globle_Style.quot_dtls_accrd_itm, { borderBottomWidth: 0 }]}>
							{/* <Text style={globle_Style.quot_dtls_hd}>Select Bank Account</Text> */}
							{/* <TouchableOpacity onPress={() => setExtentServicedtl(false)}>
						<ClosePopup />
					</TouchableOpacity> */}
						</View>

						<ScrollView>

							<View style={{ flex: 1, flexDirection: 'column' }}>

								<FlatList
									data={bankDetails}
									renderItem={({ item, index }) => BankView(item)}
									keyExtractor={(item, index) => index.toString()}
									showsVerticalScrollIndicator={false}
									showsHorizontalScrollIndicator={false}
								/>

								{/* <View style={[globle_Style.radioWapper, { height: 'auto', marginLeft: 16 }, selectRadio === 2 ? globle_Style.active_wrapper : globle_Style.radioWapper, { height: 'auto', marginLeft: 16 }]}>
									<View style={globle_Style.bank_info}>
										<View style={globle_Style.bank_infoname}>
											<View style={globle_Style.bank_img}>
												< BankDetail />
											</View>
											<View style={globle_Style.bank_accontname}>
												<Text style={globle_Style.bank_acconttxt}>xxxxxxxx8768</Text>
												<Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>Punjab National Bank</Text>
											</View>
										</View>
										<View style={globle_Style.bank_code}>
											<View style={globle_Style.bank_codelft}>
												<Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>IFSC</Text>
												<Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>Beneficiary</Text>
											</View>
											<View style={globle_Style.bank_codergt}>
												<Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>: SBIN0013270</Text>
												<Text style={[globle_Style.bank_acconttxt, { fontSize: 11 }]}>: Sanjay</Text>
											</View>
										</View>
									</View>

									<View style={[globle_Style.static_radio_circle, globle_Style.radio_static, selectRadio === 2 ? globle_Style.static_radio_circle : globle_Style.radio_static]}>
										{
											selectRadio === 2 ? <View style={globle_Style.radio_bg}></View> : null
										}
									</View>
								</View> */}

								{bankDetails.length < 3 ? (

									<TouchableOpacity onPress={() => {
										navigateToNewScreen()
									}}>
										<View style={[globle_Style.add_bank, { marginTop: 30 }]}>
											<AddBank style={{ marginBottom: 10 }} />
											<Text style={globle_Style.add_bank_txt}>Add New Bank Account</Text>
										</View>
									</TouchableOpacity>
								) : (
									null)
								}




							</View>




						</ScrollView>




						{/* write here button code ok */}

					</View>
				</View>
			)}
		</View>
	);
}



export default BankDetailScreen2;
