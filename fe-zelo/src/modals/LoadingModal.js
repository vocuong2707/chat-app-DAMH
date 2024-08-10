import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants';
const LoadingModal = (props) => {
    const { isVisible, mess } = props;
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isVisible}
      onRequestClose={() => { console.log('close modal') }}>
      <View style={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
       
      }}>
        <ActivityIndicator
          animating={isVisible}
          color= {COLORS.primary}
          size="large"
          style={{ marginBottom: 50 }}
        />
      </View>
    </Modal>
  );
}

export default LoadingModal;