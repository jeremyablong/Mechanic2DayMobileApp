import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Header, Left, Body, Right, Title, Subtitle, Button, ListItem, List, Icon, Text as NativeText } from 'native-base';
import styles from './styles.js';

class PayoutMethodAddNewPayoutHelper extends Component {
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
                            <Image source={require("../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
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
                        <Text style={styles.mainHeaderText}>Choose how to get paid</Text>
                        <List>
                            <ListItem button={true} onPress={() => {
                                this.props.props.navigation.push("bank-account-start-verifcation");
                            }} style={styles.listitem}>
                            <Left>
                                <NativeText numberOfLines={3}><NativeText style={{ color: "blue", fontWeight: "bold" }}>Bank Transfer</NativeText> {"\n"}- Get paid in 5-7 business days {"\n"}- No fees</NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                            </ListItem>
                            <ListItem button={true} onPress={() => {}} style={styles.listitem}>
                            <Left>
                                <NativeText numberOfLines={3}><NativeText style={{ color: "blue", fontWeight: "bold" }}>Paypal</NativeText> {"\n"}- Get paid in 3-4 hours {"\n"}- May include fees</NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                            </ListItem>
                            <ListItem button={true} onPress={() => {}} style={styles.listitem}>
                            <Left>
                                <NativeText numberOfLines={3}><NativeText style={{ color: "blue", fontWeight: "bold" }}>Mechanic2Day Cash Card</NativeText> {"\n"}- Get paid instantly {"\n"}- May include fees</NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                            </ListItem>
                        </List>
                    </View>
                </View>
            </Fragment>
        )
    }
}
export default PayoutMethodAddNewPayoutHelper;