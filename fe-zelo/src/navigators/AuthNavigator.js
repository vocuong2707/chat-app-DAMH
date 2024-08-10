import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SignUpScreen, VerificationScreen, PasswordRetrievalScreen, UpdatePasswordScreen } from '../screens';
import OnboardingScreen from '../screens/auth/OnbroadingScreen';
import MainNavigator from './MainNavigator';

const AuthNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
            <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
            <Stack.Screen name="PasswordRetrievalScreen" component={PasswordRetrievalScreen} />
            <Stack.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
