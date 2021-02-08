import React, { Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Text as NativeText, ListItem, List } from 'native-base';
import styles from './styles.js';

const PaymentMainPageHelper =  (props) => {
    return (
        <Fragment>
            <View style={styles.container}>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            props.props.navigation.push("profile-main");
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                        <Title style={{ paddingTop: 10 }}>Payments & Payouts</Title>
                    </Left>
                </Header>
                <List>
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.push("payments-cards");
                    }} style={styles.listItem}>
                        <Left>
                            <NativeText>Payment Methods</NativeText>
                        </Left>
                        <Right>
                            <Image source={require("../../../assets/icons/payment-methods.png")} style={styles.icon} />
                        </Right>
                    </ListItem>
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.push("payouts-main-homepage");
                    }}style={styles.listItem}>
                        <Left>
                            <NativeText>Payout Preferences</NativeText>
                        </Left>
                        <Right>
                            <Image source={require("../../../assets/icons/request.png")} style={styles.icon} />
                        </Right>
                    </ListItem>
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.push("payout-analytics-data");
                    }}style={styles.listItem}>
                        <Left>
                            <NativeText>Payout Analytics & More</NativeText>
                        </Left>
                        <Right>
                            <Image source={require("../../../assets/icons/analytics.png")} style={styles.icon} />
                        </Right>
                    </ListItem>
                    <ListItem button={true} onPress={() => {
                        props.props.navigation.navigate("credits-coupons");
                    }} style={styles.listItem}>
                        <Left>
                            <NativeText>Credits & Coupons</NativeText>
                        </Left>
                        <Right>
                            <Image source={require("../../../assets/icons/payout.png")} style={styles.icon} />
                        </Right>
                    </ListItem>
                    <ListItem style={styles.lastListItem}>
                        <Left>
                            <NativeText>Currency</NativeText>
                        </Left>
                        <Right>
                            <NativeText style={{ color: "darkblue" }}>USD-$</NativeText>
                        </Right>
                    </ListItem>
                </List>
            </View>
        </Fragment>
    );
}
export default PaymentMainPageHelper;