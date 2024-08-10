import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import {
    MessageScreen, SettingScreen, InfoScreen, DetailsScreen,
    EditScreen, ChangePasswordScreen, SearchScreen, CreateGroupScreen,
    GroupScreen, SettingChat, ListMember, AddMembers, ListGroupScreen,
    ContactScreen, RequestFriendScreen
} from '../screens';


const MainNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Main" component={TabNavigator} /> */}
            <Stack.Screen name='TabNavigator' component={TabNavigator} />
            <Stack.Screen name='MessageScreen' component={MessageScreen} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
            <Stack.Screen name="InfoScreen" component={InfoScreen} />
            <Stack.Screen name="EditScreen" component={EditScreen} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="CreateGroupScreen" component={CreateGroupScreen} />
            <Stack.Screen name="GroupScreen" component={GroupScreen} />
            <Stack.Screen name="SettingChat" component={SettingChat} />
            <Stack.Screen name="ListMember" component={ListMember} />
            <Stack.Screen name="AddMembers" component={AddMembers} />

            <Stack.Screen name="ListGroupScreen" component={ListGroupScreen} />
            <Stack.Screen name="ContactScreen" component={ContactScreen} />
            <Stack.Screen name="RequestFriendScreen" component={RequestFriendScreen} />

        </Stack.Navigator>
    );
}

export default MainNavigator