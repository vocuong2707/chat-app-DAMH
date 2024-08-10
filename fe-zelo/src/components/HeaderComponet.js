import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextComponent from './TextComponent';
import { COLORS } from '../constants';
import { Icon } from 'react-native-vector-icons/FontAwesome';

const HeaderComponent = ({ title, onBackPress, icons = [], search, iconsSearch, placeholder, add, style, color, settings, SettingChat, fontFamily, size }) => {
    return (
        <View style={[styles.container, style]}>
            {onBackPress && (
                <TouchableOpacity onPress={onBackPress}>
                    <Ionicons name="arrow-back" size={24} color={color} />
                </TouchableOpacity>
            )}
            {iconsSearch && (
                <Ionicons name="search" size={24} color={color} />
            )}
            {search && (
                <TouchableOpacity onPress={search} style={{ marginLeft: 10 }} >
                    <TextComponent text="Tìm kiếm" color={COLORS.gray2} fontFamily={fontFamily} size={size} />
                </TouchableOpacity>
            )}
            <TextComponent text={title} color={COLORS.white} fontFamily={fontFamily} size={size} />
            {icons.map((icon, index) => (
                <Ionicons key={index} name={icon.name} size={24} color="black" />
            ))}

            {add && (
                <TouchableOpacity onPress={add} style={{ marginLeft: 'auto' }}>
                    <Ionicons name="add" size={24} color={color} />
                </TouchableOpacity>
            )}

            {settings && (
                <TouchableOpacity onPress={settings} style={{ marginLeft: 'auto', }}>
                    <Ionicons name="settings" size={24} color={color} />
                </TouchableOpacity>
            )}

            {placeholder && (
                <TextInput
                    placeholder={placeholder}
                    style={{ color: COLORS.white, marginLeft: 10, width: '80%' }}
                />
            )
            }

            {SettingChat && (
                <TouchableOpacity onPress={SettingChat} style={{ marginLeft: 'auto', }}>
                    <Ionicons name="ellipsis-vertical-circle-outline" size={25} color={color} />
                </TouchableOpacity>
            )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
});

export default HeaderComponent;