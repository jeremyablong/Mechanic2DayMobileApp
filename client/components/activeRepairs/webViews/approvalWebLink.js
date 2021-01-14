import React, { Component, Fragment } from 'react';
import {
    Dimensions,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    ImageBackground
  } from 'react-native';
import styles from './styles.js';
import { WebView } from 'react-native-webview';
import { Header, Left, Button, Title, Text as NativeText } from 'native-base';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import moment from 'moment';
import axios from 'axios';
import { Config } from 'react-native-config';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get("window");

class ApprovalWebLinkHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        finished: false,
        webviewKey: 0
    }
}
    handleChangeNavigation = (data) => {
        console.log("handleChangeNavigation", data);

        if (data.title === "Google") {
            setTimeout(() => {
                this.setState({
                    finished: true
                })  
            }, 1000) 
        }
    }
    capureFunds = () => {
        console.log("capureFunds clicked");

        const passedData = this.props.props.route.params.data;

        const itemmmmmm = this.props.props.route.params.item;

        const self_link = this.props.props.route.params.self_link;

        const vehicle = this.props.props.route.params.vehicle;

        const other_userrrr = this.props.props.route.params.other_user;

        axios.post(`${Config.ngrok_url}/capture/paypal/payment/second/step`, {
            id: this.props.unique_id,
            paypal_access_token: this.props.paypalToken.access_token,
            order_id: passedData.other.id,
            job_id: itemmmmmm.accepted_job_id,
            other_user_id: other_userrrr.unique_id
        }).then((res) => {
            if (res.data.message === "Successfully added paypal order id to each users approved jobs...!") {
                console.log("approvalWebLink ----- response:", res.data);

                const { item } = res.data;

                this.props.props.navigation.push("paypal-view-order-details", { item, vehicle });
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderAftermathContent = () => {
        const other_user = this.props.props.route.params.other_user;
        return (
            <Fragment>
                <ScrollView>
                    <View style={styles.container}>
                    <ImageBackground source={require("../../../assets/images/thank-you.jpg")} style={styles.header}>
                        <Text style={styles.headerTitle}>
                            We will now process your payment.
                        </Text>
                    </ImageBackground>

                    <View style={styles.postContent}>
                        <Text style={styles.postTitle}>
                            We are now going to process your transaction and collect the funds to be kept on "hold".
                        </Text>

                        <Text style={styles.postDescription}>
                           This process is the most secure/reliable method of protecting both buyers and sellers. For your protection, we have implemented these features and payment styles to insure the highest quality service possible.
                        </Text>

                        <Text style={styles.date}>
                            {moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                        </Text>

                        <View style={styles.profile}>
                            <Image style={styles.avatar}
                            source={{uri: other_user.profilePics[other_user.profilePics.length - 1].full_url }}/>

                            <Text style={styles.name}>
                                {other_user.fullName}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.capureFunds();
                        }} style={styles.shareButton}>
                            <Text style={styles.shareButtonText}>Process/Capture Payment</Text>  
                        </TouchableOpacity> 
                    </View>
                    </View>
                </ScrollView>
            </Fragment>
        );
    }
    render() {
        console.log("this.PROPPPPPPPPPS APPROVAL", this.props);
        const passedData = this.props.props.route.params.data;

        const { finished } = this.state;
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image style={styles.headerIcon} source={require('../../../assets/icons/go-back.png')} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -35 }}>Deposit funds for later withdrawl</Title>
                    </Left>
                </Header>
                {finished === false ? <WebView
                    source={{
                        uri: passedData.href
                    }}
                    onContentProcessDidTerminate={() => {
                        this.setState({
                            webviewKey: this.state.webviewKey + 1
                        })
                    }} 
                    javaScriptEnabled = {true}
                    domStorageEnabled = {true}
                    key={this.state.webviewKey}
                    onNavigationStateChange={this.handleChangeNavigation}
                    style={styles.webViewContainer}
                /> : this.renderAftermathContent()}
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id,
        paypalToken: state.auth.authenticated.paypal_authorization
    };
}
export default connect(mapStateToProps, { })(ApprovalWebLinkHelper);