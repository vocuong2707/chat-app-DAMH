import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

const TextComponent = ({ text, size, color, fontFamily,fontWeight, style}) => {
  // Tải font sử dụng useFonts
  const [fontsLoaded] = useFonts({
    regular: require('../../assets/fonts/AirbnbCereal_W_Lt.otf'),
    medium: require('../../assets/fonts/AirbnbCereal_W_Md.otf'),
    semiBold: require('../../assets/fonts/AirbnbCereal_W_Bd.otf'),
    bold: require('../../assets/fonts/AirbnbCereal_W_XBd.otf'),
  });
 
 // Kiểm tra xem font đã tải thành công chưa
  if (!fontsLoaded) {
    return null; // Trả về null nếu font chưa được tải
  }

  return (
    <Text
      style={[
        {
          fontFamily: fontFamily, // Sử dụng font đã tải
          fontSize: size,
          color: color,
          fontWeight: fontWeight,
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
};

export default TextComponent;
