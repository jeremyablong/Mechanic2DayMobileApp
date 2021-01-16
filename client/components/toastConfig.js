import React from 'react';
import { View, Text } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';


export const ToastConfig = {
    success: ({ text1, text2, props, ...rest }) => {
        return (
                <BaseToast
                    {...rest}
                    style={{ borderLeftColor: 'green' , zIndex: 99999999999999999999999999999999999999 }}
                    contentContainerStyle={{ paddingHorizontal: 15, zIndex: 99999999999999999999999999999999999999 }}
                    text1Style={{
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}
                    text2Style={{
                        fontSize: 14
                    }}
                    text1={text1}
                    text2={text2}
                />
        );
    },
    error: ({ text1, text2, props, ...rest }) => {
        return (
            <BaseToast
                {...rest}
                style={{ borderLeftColor: 'red', zIndex: 99999999999999999999999999999999999999 }}
                contentContainerStyle={{ paddingHorizontal: 15, zIndex: 99999999999999999999999999999999999999 }}
                text1Style={{
                    fontSize: 16,
                    fontWeight: 'bold'
                }}
                text2Style={{
                    fontSize: 14
                }}
                text1={text1}
                text2={text2}
            />
        );
    },
    info: ({ text1, text2, props, ...rest }) => {
        return (
            <BaseToast
                {...rest}
                style={{ borderLeftColor: 'blue', zIndex: 99999999999999999999999999999999999999 }}
                contentContainerStyle={{ paddingHorizontal: 15, zIndex: 99999999999999999999999999999999999999 }}
                text1Style={{
                    fontSize: 16,
                    fontWeight: 'bold'
                }}
                text2Style={{
                    fontSize: 14
                }}
                text1={text1}
                text2={text2}
            />
        );
    },
    any_custom_type: () => {}
};