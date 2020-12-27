import React, { Fragment, useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ImageBackground, 
    SafeAreaView
} from 'react-native';
import styles from "./styles.js";
import axios from "axios";
import { connect } from "react-redux";
import Config from "react-native-config";
import AwesomeAlert from 'react-native-awesome-alerts';
import { authenticated } from "../../../actions/signup/auth.js";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 7;

const VerfiyPhoneNumberHelper = (props) => {
    const [code, setCode] = useState("");
    const [showAlert, setAlert] = useState(false);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [propsss, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const handleSubmission = () => {
        console.log("clicked handleSubmission.");

        const { authyID } = props;

        axios.post(`${Config.ngrok_url}/validate/phone/number/code`, {
            code,
            authyID
        }).then((res) => {
            if (res.data.message === "Successfully authenticated!") {
                console.log(res.data);

                props.authenticated({
                    ...props.previous, page: 3
                })

                setTimeout(() => {
                    props.props.navigation.navigate("create-name-password");
                },  500);
            } else {
                console.log("err", res.data);

                setAlert(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const resendCode = () => {
        
        const { authyID } = props;

        axios.post(`${Config.ngrok_url}/resend/code/auth`, {
            authyID
        }).then((res) => {
            if (res.data.message === "Code was successfully re-sent!") {
                console.log(res.data);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Fragment>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Error!"
                message="Your code entry did NOT match the code sent to your phone, please check your phone and try again."
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false} 
                onDismiss={() => {
                    setAlert(false);
                }}
            />
            <ImageBackground source={require("../../../assets/images/white-wood.jpg")} style={styles.container}>
                <View style={styles.outterContainer}>
                    <Text style={styles.textMain}>Enter your confirmation code that was sent to your phone</Text>
                    <View style={styles.innerInner}>
                        <SafeAreaView style={styles.root}>
                            <Text style={styles.title}>Verification</Text>
                            <CodeField
                                ref={ref}
                                {...propsss}
                                value={value}
                                onChangeText={(value) => {
                                    setCode(value);
                                }}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={({index, symbol, isFocused}) => (
                                    <Text
                                        key={index}
                                        style={[styles.cell, isFocused && styles.focusCell]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                        </SafeAreaView>
                    </View>
                    <TouchableOpacity style={{ marginBottom: 15 }} onPress={() => {
                        resendCode();
                    }}>
                        <Text>Re-Send Code...</Text>
                    </TouchableOpacity>
                    <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={handleSubmission}>
                    <Text style={styles.buttonText}>Send</Text>
                    </TouchableHighlight>
                    <TouchableOpacity onPress={() => {
                        props.props.navigation.goBack();
                    }}>
                        <Text style={styles.goBack}>Go Back...</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        previous: state.auth.authenticated,
        authyID: state.auth.authenticated.authyID
    }
}
export default connect(mapStateToProps, { authenticated })(VerfiyPhoneNumberHelper);