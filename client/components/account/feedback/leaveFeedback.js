import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { Button, Header, Left, Body, Right, Title, Subtitle, Icon, Picker, Form } from 'native-base';
import styles from './styles.js';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import Config from "react-native-config";
import { connect } from "react-redux";
import axios from "axios";


const { height, width } = Dimensions.get("window");

class LeaveFeedbackMechanic2DayHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        action: "",
        category: "",
        usage: false,
        message: ""
    }
}
    renderContentOne = () => {
        const { action, usage } = this.state;

        if (typeof action !== "undefined" && action.length > 0 && usage === true) {
            return (
                <Fragment>
                    <View style={styles.hr} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Please let us know what your feedback is about. We review all feedback but are unable to respond individually.</Text>
                    <Form>
                        <Picker
                            mode="dropdown"
                            iosHeader="Please select"
                            placeholderTextColor={"grey"}
                            placeholder={"Please select..."}
                            style={{ width: width * 0.80 }}
                            selectedValue={this.state.category}
                            onValueChange={(value) => {
                                this.setState({
                                    category: value
                                })
                            }}
                        >
                            <Picker.Item label="Messaging" value="messaging" />
                            <Picker.Item label="Getting paid" value="getting-paid" />
                            <Picker.Item label="Reviews" value="reviews" />
                            <Picker.Item label="Managing my listings" value="managing-my-listings" />
                            <Picker.Item label="Setting pricing" value="setting-pricing" />
                            <Picker.Item label="SuperMechanic account" value="supermechanic-account" />
                            <Picker.Item label="My account or profile" value="my-account-or-profile" />
                            <Picker.Item label="Host standards" value="host-standards" />
                            <Picker.Item label="Proposals" value="proposals" />
                            <Picker.Item label="Payments and payouts" value="payments-and-payouts" />
                            <Picker.Item label="Boosts/in-app purchases" value="boosts-and-inapp-purchases" />
                            <Picker.Item label="Refunds" value="refunds" />
                            <Picker.Item label="Notifications" value="notifications" />
                            <Picker.Item label="Active Repair Jobs" value="active-repair-jobs" />
                            <Picker.Item label="Stipe Verfication" value="stripe-verification" />
                            <Picker.Item label="Gift Cards" value="gift-cards" />
                            <Picker.Item label="Credits" value="credits" />
                            <Picker.Item label="Referrals" value="referrals" />
                            <Picker.Item label="Other" value="other" />
                        </Picker>
                    </Form>
                    {this.renderNext()}
                </Fragment>
            );
        } else {
            return null;
        }
    }
    renderNext = () => {
        const { category, message } = this.state;

        if (typeof category !== "undefined" && category.length > 0) {
            return (
                <Fragment>
                    <View style={styles.hr} />
                    <View style={{ marginTop: 15 }} />
                    <KeyboardAwareScrollView>
                        <AutoGrowingTextInput placeholderTextColor={"grey"} onChangeText={(value) => {
                            this.setState({
                                message: value
                            })
                        }} value={this.state.message} style={styles.textInput} placeholder={'Share your experience with us. What went well? What could have gone better...?'} />
                    </KeyboardAwareScrollView>
                    <View style={{ marginTop: 15 }} />
                    {typeof message !== "undefined" && message.length > 0 ? <AwesomeButtonBlue type={"secondary"} onPress={this.handleFeedbackSubmission} stretch={true}>Submit Feedback</AwesomeButtonBlue> : <AwesomeButtonBlue type={"disabled"} stretch={true}>Submit Feedback</AwesomeButtonBlue>}
                </Fragment>
            );
        }
    }
    handleFeedbackSubmission = () => {
        console.log("handleFeedbackSubmission clicked");

        const { action, category, message } = this.state;

        axios.post(`${Config.ngrok_url}/submit/general/feedback/company`, {
            id: this.props.unique_id,
            action,
            category,
            message
        }).then((res) => {
            if (res.data.message === "You've successfully notfied Mechanic2Day of your concerns!") {
                console.log(res.data);

                this.setState({
                    message: "",
                    action: "",
                    category: "",
                    usage: false
                }, () => {
                    this.RBSheet.close();
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { action } = this.state;
        return (
            <Fragment>
                 <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Co. Feedback</Title>
                        <Subtitle>Leave us feedback</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.mainText}>How are we doing?</Text>
                        <View style={styles.hr} />
                        <Text style={styles.smallerText}>We're always working to improve the Mechanic2Day experience, so we'd love to hear what's working and how we can do better.</Text>
                        <View style={{ marginTop: 15 }} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>This isn't a way to contact us, though.</Text>
                        <Text style={styles.smallerText}>We can't respond to feedback or bug reports individually. If you have a question or need help resolving a problem, you'll find answers in our <TouchableOpacity onPress={() => {}}><Text style={{ color: "blue", fontSize: 18, marginBottom: -3 }}>Help Center</Text></TouchableOpacity>, or you can <TouchableOpacity onPress={() => {}}><Text style={{ color: "blue", fontSize: 18, marginBottom: -3 }}>Contact Us</Text></TouchableOpacity>.</Text>
                        <View style={styles.hr} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>What would you like to do?</Text>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                usage: true,
                                action: "give-product-review"
                            })
                        }}>
                                <View style={action === "give-product-review" ? styles.boxedOutline : styles.boxed}>
                                    <View style={{ flexDirection: "column", width: width * 0.40 }}>
                                        <Text style={styles.productText}>Give product feedback</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.20 }}>
                                        <Image source={require("../../../assets/icons/chat.png")} style={{ maxHeight: 50, maxWidth: 50 }} />
                                    </View>
                                </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                usage: true,
                                action: "report-a-bug"
                            })
                        }}>
                                <View style={action === "report-a-bug" ? styles.boxedOutline : styles.boxed}>
                                    <View style={{ flexDirection: "column", width: width * 0.40 }}>
                                        <Text style={styles.productText}>Report a bug</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.20 }}>
                                        <Image source={require("../../../assets/icons/frown.png")} style={{ maxHeight: 50, maxWidth: 50 }} />
                                    </View>
                                </View>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20 }} />
                        {this.renderContentOne()}
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    };
}
export default connect(mapStateToProps, {  })(LeaveFeedbackMechanic2DayHelper);