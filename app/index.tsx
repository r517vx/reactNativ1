import LoginForm from "@/app/LoginForm";
import HomeScreen from "@/app/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import DetailScreen from "@/app/DetailScreen";
import RegisterStepTwo from "@/app/RegisterStepTwo";
import RegisterStepOne from "@/app/RegisterStepOne";
import {AuthProvider} from "@/app/AuthContext";

const Stack = createStackNavigator();

export default function Index() {
    return (
        <AuthProvider>
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginForm}/>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="Detail" component={DetailScreen}/>
                    <Stack.Screen name="RegisterStepOne" component={RegisterStepOne}/>
                    <Stack.Screen name="RegisterStepTwo" component={RegisterStepTwo}/>
                    {/*<Stack.Screen name="Register" component={RegisterScreen} />*/}
                    {/* <Stack.Screen name="ConnectorScreen" component={ConnectorScreen} />*/}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    )
        ;
}