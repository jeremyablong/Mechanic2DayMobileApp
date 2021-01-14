import React, { Component, Fragment } from 'react';
import { View, Tex, Image, Text, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Item, Label, Input } from 'native-base';
import styles from './styles.js';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import { connect } from 'react-redux';
import axios from "axios";
import { Config } from 'react-native-config';
import Toast from 'react-native-toast-message';
import { ToastConfig } from '../../../../components/toastConfig.js';
import { authenticated } from "../../../../actions/signup/auth.js";

const { width, height } = Dimensions.get("window"); 

class PaypalMenuHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        paypalEmailAddress: ""
    }
}
    handlePaypalEmailSubmission = () => {
        const { paypalEmailAddress } = this.state;

        if (typeof paypalEmailAddress !== "undefined" && paypalEmailAddress.length > 0) {
            axios.post(`${Config.ngrok_url}/update/payments/with/paypal/address`, {
                id: this.props.unique_id,
                paypal_email: paypalEmailAddress
            }).then((res) => {
                if (res.data.message === "Successfully updated paypal email!") {
                    console.log(res.data);

                    this.props.authenticated({
                        ...this.props.authenticatedData, 
                        paypal_payment_address: paypalEmailAddress
                    })

                    Toast.show({
                        text1: "Successfully updated your PayPal email address!",
                        text2: "You have successfully updated your information, if you didn't have some permissions before... you should now!",
                        visibilityTime: 4500,
                        position: "top",
                        type: "success"
                    })

                    this.setState({
                        paypalEmailAddress: ""
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            Toast.show({
                text1: "Please complete the email field.",
                text2: "You MUST complete the PayPal email address field before proceeding.",
                visibilityTime: 4500,
                position: "top",
                type: "error"
            })
        }
    }
    render() {
        return (
            <Fragment>
            
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                        <Title style={{ paddingTop: 10 }}>Edit your PayPal methods</Title>
                    </Left>
                </Header>
               
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <Text>You MUST complete your PayPal email address before listing an item OR accepting payment for a repair on our marketplace. We will need your email address to recieve funds from the host of the listing for the vehicle you're repairing.</Text>
                        <View style={styles.hrSpace} />
                        <Item floatingLabel>
                            <Label>PayPal Email Address</Label>
                            <Input value={this.state.paypalEmailAddress} placeholderTextColor={"grey"} placeholder={"Enter your PayPal email address"} onChangeText={(value) => {
                                this.setState({
                                    paypalEmailAddress: value
                                })
                            }} />
                        </Item>
                        <View style={{ marginTop: 20 }}>
                            <AwesomeButtonRick width={width * 0.90} type="secondary" onPress={() => {
                                this.handlePaypalEmailSubmission();
                            }}>Submit Changes</AwesomeButtonRick>
                        </View>
                    </View>
                </View>
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id,
        authenticatedData: state.auth.authenticated
    }
}
export default connect(mapStateToProps, { authenticated })(PaypalMenuHelper);