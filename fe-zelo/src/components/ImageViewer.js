import { StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

    return <Avatar.Image size={100} source={imageSource} />;
}

const styles = StyleSheet.create({

});
