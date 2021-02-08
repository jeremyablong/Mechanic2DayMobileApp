import React, { Component, Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText } from 'native-base';
import styles from './styles.js';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


class PayoutsManageOptionsMainHelper extends Component {
    render() {
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.goBack();
                        }}>
                            <Image source={require("../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Payout Options</Title>
                        <Subtitle>Payout menu & more...</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <AwesomeButtonBlue type={"primary"} backgroundShadow={"black"} onPress={() => {
                            // this.props.props.navigation.push(""); 
                        }} stretch={true}>Manual payouts</AwesomeButtonBlue>
                        <View style={styles.hr} />
                        <AwesomeButtonBlue type={"secondary"} backgroundShadow={"black"} onPress={() => {
                            // this.props.props.navigation.push("");
                        }} stretch={true}>Instant payouts</AwesomeButtonBlue>
                        <View style={styles.hr} />
                        <AwesomeButtonBlue type={"primary"} backgroundShadow={"black"} onPress={() => {
                            // this.props.props.navigation.push("");
                        }} stretch={true}>Payout reversals</AwesomeButtonBlue>
                    </View>
                </View>
            </Fragment>
        )
    }
}
export default PayoutsManageOptionsMainHelper;