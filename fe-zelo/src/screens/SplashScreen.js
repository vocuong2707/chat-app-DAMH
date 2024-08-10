import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const SplashSCreen = () => {
  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.primary}}
      imageStyle={{ flex: 1 }}
    >
      <Image source={require("../assets/images/logo.png")} style={{
        width: '70%',
        resizeMode: "contain"
      }}/>
    </ImageBackground>
  );
};

export default SplashSCreen;
