import {StyleSheet, Text, View} from "react-native";
import App from "@/app/App";
import LoginForm from "@/app/LoginForm";
import HomeScreen from "@/app/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import DetailScreen from "@/app/DetailScreen";
import ConnectorScreen from "@/app/ConnectorScreen";

const Stack = createStackNavigator();

export default function Index() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginForm} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
               {/* <Stack.Screen name="ConnectorScreen" component={ConnectorScreen} />*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
}