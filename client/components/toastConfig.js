import React from 'react';
import { View, Text } from 'react-native';

export const ToastConfig = {
    success: ({ text1, text2, props, ...rest }) => {
        return (
            <View style={{ height: "100%", width: '85%', backgroundColor: "#00ad5f", padding: 10, borderWidth: 2, borderColor: "grey", zIndex: 999999999999 }}>
                <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{text1}</Text>
                <Text style={{ fontsize: 16, color: "white", fontWeight: "bold" }}>{text2}</Text>
            </View>
        );
    },
    error: ({ text1, text2, props, ...rest }) => {
        return (
            <View style={{ height: "100%", width: '85%', backgroundColor: "#8c010d", padding: 10, borderWidth: 5, borderColor: "lightgrey", zIndex: 999999999999 }}>
                <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{text1}</Text>
                <Text style={{ fontsize: 16, color: "white", fontWeight: "bold" }}>{text2}</Text>
            </View>
        );
    },
    info: () => {},
    any_custom_type: () => {}
};