


import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { globalStyles } from '../styles/globalStyle';
import { ContactScreen, ListGroupScreen, RequestFriendScreen } from '../screens';
import { useState } from 'react';
import HeaderComponent from '../components/HeaderComponet';
import { COLORS, APPINFOS } from '../constants';
import { useNavigation } from "@react-navigation/native";



const renderScene = SceneMap({
    ContactScreen: ContactScreen,
    ListGroupScreen: ListGroupScreen,
    RequestFriendScreen: RequestFriendScreen,
});



function TopNavigator() {
    const navigation = useNavigation();

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'ContactScreen', title: 'Bạn bè' },
        { key: 'ListGroupScreen', title: 'Nhóm' },
        { key: 'RequestFriendScreen', title: 'Yêu cầu' },
    ]);

    return (
        <View style={globalStyles.container}>
            <HeaderComponent
                style={{
                    flexDirection: "row",
                    backgroundColor: COLORS.primary,
                    height: APPINFOS.sizes.HEIGHT * 0.06,
                    alignItems: "center",
                    paddingLeft: 16,
                }}
                iconsSearch={true}
                search={() => navigation.navigate("SearchScreen")}
                add={() => navigation.navigate("CreateGroupScreen")}
                fontFamily={"medium"}
                color={COLORS.white}
                size={18}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    );
}

export default TopNavigator;
