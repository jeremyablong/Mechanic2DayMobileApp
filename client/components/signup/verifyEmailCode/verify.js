import React, { Fragment, useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
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

const CELL_COUNT = 8;

const VerifyCodeEmailHelper = (props) => {
    const [code, setCode] = useState("");
    const [ value, setValue ] = useState("");
    const [showAlert, setAlert] = useState(false);
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [propsss, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    const handleSubmission = () => {
        console.log("clicked handleSubmission.");

        axios.post(`${Config.ngrok_url}/check/email/code`, {
            code: value.toLowerCase(),
            reduxCode: props.reduxCode
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
    return (
        <Fragment>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Error!"
                message="Your code entry did NOT match the code sent to your email, please check your email and try again."
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false} 
                onDismiss={() => {
                    setAlert(false);
                }}
            />
            <ImageBackground source={require("../../../assets/images/white-wood.jpg")} style={styles.container}>
                <View style={styles.outterContainer}>
                    <Text style={styles.textMain}>Enter your confirmation code we sent to {props.email}</Text>
                        <SafeAreaView style={styles.root}>
                            <Text style={styles.title}>Verification</Text>
                            <View style={styles.centerMe}>
                                <Image source={require("../../../assets/icons/lock.png")} style={{ maxWidth: 150, maxHeight: 150 }} />
                            </View>
                            <CodeField
                                ref={ref}
                                {...propsss}
                                value={value}
                                onChangeText={(value) => {
                                    setValue(value);
                                }}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
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

                    <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={handleSubmission}>
                    <Text style={styles.buttonText}>Send</Text>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        reduxCode: state.auth.authenticated.code,
        email: state.auth.authenticated.email,
        previous: state.auth.authenticated
    }
}
export default connect(mapStateToProps, { authenticated })(VerifyCodeEmailHelper);