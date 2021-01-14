import React from 'react';
import { View, Text } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';


export const ToastConfig = {
    success: ({ text1, text2, props, ...rest }) => {
        return (
                <BaseToast
                    {...rest}
                    style={{ borderLeftColor: 'green' }}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
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
                style={{ borderLeftColor: 'red' }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
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
                style={{ borderLeftColor: 'blue' }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
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