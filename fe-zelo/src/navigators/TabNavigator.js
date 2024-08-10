import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, AllContactsScreen } from '../screens';
import User from '../screens/user/UserScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { APPINFOS, COLORS } from '../constants';
import TopNavigator from './TopNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Tin nhắn') {
                        iconName = focused ? 'envelope' : 'envelope-o'; // 'envelope' for filled, 'envelope-o' for outlined
                    } else if (route.name === 'Danh bạ') {
                        iconName = focused ? 'address-book' : 'address-book-o'; // 'address-book' for filled, 'address-book-o' for outlined
                    } else if (route.name === 'Cá nhân') {
                        iconName = focused ? 'user' : 'user-o'; // 'user' for filled, 'user-o' for outlined
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarStyle: {
                    height: 60 // Adjust this value to make the tab bar taller
                },
            })}
        >
            <Tab.Screen name="Tin nhắn" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Danh bạ" component={TopNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Cá nhân" component={User} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
