import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://94.228.117.74:10023/pss/api/v1/auth/authenticate', {
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

            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                //text2: `Token: ${token}`,
                text2: `GroupId: ${groupId}`
            });

            // Переход к следующему экрану
            navigation.navigate('Home', { token: token, groupId: groupId });
        } catch (error) {
            console.log(error.message);
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: error.message,
            });
        }
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
            />
            <Button title="Login" onPress={handleLogin} />
            <Toast />
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
});

export default LoginForm;