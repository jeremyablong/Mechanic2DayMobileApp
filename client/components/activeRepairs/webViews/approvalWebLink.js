import React, { Component, Fragment } from 'react';
import {
    Dimensions,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
  } from 'react-native';
import styles from './styles.js';
import { WebView } from 'react-native-webview';
import { Header, Left, Button, Title, Text as NativeText } from 'native-base';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import moment from 'moment';


const { width, height } = Dimensions.get("window");

class ApprovalWebLinkHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        finished: false
    }
}
    handleChangeNavigation = (data) => {
        console.log("handleChangeNavigation", data);

        if (data.title === "PayPal Checkout" && data.navigationType === "other") {
            this.setState({
                finished: true
            })   
        }
    }
    renderAftermathContent = () => {
        const other_user = this.props.props.route.params.other_user;
        return (
            <Fragment>
                <ScrollView>
                    <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            We will now process your payment.
                        </Text>
                    </View>

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
                        <TouchableOpacity style={styles.shareButton}>
                            <Text style={styles.shareButtonText}>Like</Text>  
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
                    onNavigationStateChange={this.handleChangeNavigation}
                    style={styles.webViewContainer}
                /> : this.renderAftermathContent()}
            </Fragment>
        )
    }
}
export default ApprovalWebLinkHelper;