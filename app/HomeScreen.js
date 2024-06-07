import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = ({ route }) => {
    const { token, groupId } = route.params;
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try { //    http://94.228.117.74:10023/pss/api/v1/table/get
                console.log("Start download station list")
                const response = await fetch(`http://94.228.117.74:10023/pss/api/v1/table/get?groupId=${groupId}`, {
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
                console.log("Downloaded from server:");
                console.log(result);
                setData(result.content);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [token, groupId]);

    //const go = function (item){navigation.navigate('Detail', item)}

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { navigation.navigate('Detail', { item, token}) }}>
            <View style={styles.item}>
                <Text style={styles.title}>{item.nickName}</Text>
                <Text>Model: {item.model}</Text>
                <Text>Charge Point ID: {item.chargePointId}</Text>
                <Text>Power: {item.powerCp}W</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#f9c2ff',
    },
    title: {
        fontSize: 16,
    },
});

export default HomeScreen;