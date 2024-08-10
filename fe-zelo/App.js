import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {Provider} from 'react-redux';
import AppRouter from './src/navigators/AppRouter';
import store from './src/redux/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
      <StatusBar style="light" backgroundColor="#1C86EE" translucent = {false}/>
        <NavigationContainer>
          <AppRouter />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
