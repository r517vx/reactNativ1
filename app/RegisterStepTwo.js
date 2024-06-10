import React, {useState} from 'react';
import {Button, Platform, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useNavigation, useRoute} from '@react-navigation/native';

const RegisterStepTwo = () => {
    const [birthDate, setBirthDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [carModel, setCarModel] = useState('');
    const [chargingType, setChargingType] = useState('GB/T');
    const navigation = useNavigation();
    const route = useRoute();

    const {name, email, phone, password} = route.params;

    const handleContinue = async () => {
        const registrationData = {
            name,
            email,
            phone,
            password,
            birthDate: birthDate.toISOString().split('T')[0], // Преобразуем дату в формат YYYY-MM-DD
            carModel,
            chargingType,
        };

        try {
            const response = await fetch('https://example.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                // Регистрация успешна, можно перейти на страницу авторизации или другой экран
                navigation.navigate('Login');
            } else {
                // Обработка ошибок
                const result = await response.json();
                console.error('Ошибка регистрации', result.message);
            }
        } catch (error) {
            console.error('Ошибка сети', error);
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setShowDatePicker(false);
        setBirthDate(currentDate);
    };

    return (
        <View style={styles.container}>
            {Platform.OS === 'web' ? (
                <View style={styles.input}>
                    <DatePicker
                        selected={birthDate}
                        onChange={(date) => setBirthDate(date)}
                        dateFormat="yyyy-MM-dd"
                    />
                </View>
            ) : (
                <>
                    <TouchableOpacity onPress={showDatepicker}>
                        <TextInput
                            style={styles.input}
                            placeholder="Дата рождения"
                            value={birthDate.toISOString().split('T')[0]}
                            editable={false}
                        />
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={birthDate}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                            maximumDate={new Date()} // Опционально: установка максимальной даты на сегодня
                        />
                    )}
                </>
            )}
            <TextInput
                style={styles.input}
                placeholder="Модель автомобиля"
                value={carModel}
                onChangeText={setCarModel}
            />
            <Picker
                selectedValue={chargingType}
                style={styles.input}
                onValueChange={(itemValue) => setChargingType(itemValue)}
            >
                <Picker.Item label="GB/T" value="GB/T"/>
                <Picker.Item label="Type2" value="Type2"/>
                <Picker.Item label="CCS Combo2" value="CCS Combo2"/>
            </Picker>
            <Button title="Продолжить" onPress={handleContinue}/>
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
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default RegisterStepTwo;