import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddAddress from './AddAddress';
import AddressSearch from './AddressSearch';
import AddAddressDetail from './AddAddressDetail';

const Stack = createNativeStackNavigator();


const AddressScreen = () => {

    return (
            <Stack.Navigator initialRouteName={"AddAddress"}>
                <Stack.Screen name="AddAddress" component={AddAddress}
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen name="AddressSearch" component={AddressSearch}
                    screenOptions={{
                        headerTitleAlign: 'center', // Center the title
                    }}  />
                <Stack.Screen name="AddAddressDetail" component={AddAddressDetail}
                    options={{
                        headerShown: false
                    }} />

            </Stack.Navigator>
    );
}



export default AddressScreen;
