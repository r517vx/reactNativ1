import React, {useContext, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from "./AuthContext";

// Тестовая страница регистрации, в навигационном стеке не используется
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const {setToken} = useContext(AuthContext);


    const handleLogin = async () => {

        try {
            const response = await fetch('http://94.228.117.74:10023/pss/api/v1/auth/authenticate', {
                // const response = await fetch('http://10.10.254.14:10023/pss/api/v1/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (!response.ok) {
                console.log(response);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const token = data.token;
            const groupId = data.groupId;
            localStorage.setItem('token', data.token);
            localStorage.setItem('groupId', data.groupId);
            localStorage.setItem('allObj', JSON.stringify(data));
            setToken(data.token);
            debugger;

            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                //text2: `Token: ${token}`,
                text2: `GroupId: ${groupId}`
            });

            // Переход к следующему экрану
            navigation.navigate('Home', {token: token, groupId: groupId});
        } catch (error) {
            console.log(error.message);
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: error.message,
            });
        }
    };

    const handleRegisterPress = () => {
        navigation.navigate('RegisterStepOne');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <Button title="Login" onPress={handleLogin}/>
            <TouchableOpacity onPress={handleRegisterPress}>
                <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
            <Toast/>
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
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    registerText: {
        marginTop: 50,
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
});

export default LoginForm;