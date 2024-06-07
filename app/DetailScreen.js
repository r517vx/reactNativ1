import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const DetailScreen = ({ route }) => {
    console.log("DetailScreen.route.param:");
    console.log(route.param);
    const { item } = route.params;
    const navigation = useNavigation();
    console.log("DetailScreen.item:");
    console.log(item);
    const {token} = route.param;
    console.log("DetailScreen.token:");
    console.log(item);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.nickName}</Text>
            <Text>Model: {item.model}</Text>
            <Text>Charge Point ID: {item.chargePointId}</Text>
            <Text>Power: {item.powerCp}W</Text>
            <Text>Firmware Version: {item.firmwareVersion}</Text>
            <Text>Heartbeat: {item.heartbeat}</Text>
            <Text>Address: {item.address}</Text>
            <Text>Address CS: {item.addressCs}</Text>
            {/*<Button title={'Go forward >>>'}  onPress={navigation.navigate('ConnectorScreen', {item} )}/>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
    },
});

export default DetailScreen;