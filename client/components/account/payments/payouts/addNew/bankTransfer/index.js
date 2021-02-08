import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText } from 'native-base';
import styles from './styles.js';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


class BankTransferBeginHelper extends Component {
constructor(props) {
    super(props);

    this.state = {

    }
}
    render() {
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.goBack();
                        }}>
                            <Image source={require("../../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>New Payout</Title>
                        <Subtitle>Add a new payout method</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.mainHeaderText}>Bank Transfer</Text>
                        <View style={styles.hr} />
                        <Text style={styles.marginBottomText}>Get paid in 5-7 business days</Text>
                        <View style={{ marginTop: 10 }} />
                        <Text style={styles.marginBottomText}>Mechanic2Day relases payouts 24 hours after a completed listing</Text>
                        <View style={styles.hr} />
                        <Text style={{ fontSize: 18 }}>No fees</Text>
                        <View style={styles.hr} />
                    </View>
                    <View style={styles.bottom}>
                        <AwesomeButtonBlue style={{ marginTop: 10 }} type={"secondary"} onPress={() => {
                            this.props.props.navigation.push("add-bank-account-payout-information")
                        }} stretch={true}>Next/Continue</AwesomeButtonBlue>
                    </View>
                </View>
            </Fragment>
        )
    }
}
export default BankTransferBeginHelper;