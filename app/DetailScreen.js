import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const DetailScreen = ({ route }) => {
    //console.log("DetailScreen.route.param:");
    //console.log(route.params);
    const { item } = route.params;
    const navigation = useNavigation();
    //console.log("DetailScreen.item:");
    //console.log(item);
    const {token} = route.params;
    //console.log("DetailScreen.token:");
    //console.log(token);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let intervalId;

        const fetchData = async () => {
            try { //    http://94.228.117.74:10023/pss/api/v1/info/connectors
                const response = await fetch(`http://94.228.117.74:10023/pss/api/v1/info/connectors?sn=${item.sn}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result);
                console.log("Fetched connector status: ");
                console.log(result);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
                setLoading(false);
            }
        };

        // Вызываем fetchData немедленно
        fetchData();

        // Устанавливаем интервал для вызова fetchData каждые 15 секунд
        intervalId = setInterval(fetchData, 15000);

        // Чистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, [token]);


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
            { data ? (<Text style={styles.title}>Connector status: {data[0]?.status}</Text>) : (<Text>No data</Text>)}


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