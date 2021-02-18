import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Text as NativeText, ListItem, List } from 'native-base';
import styles from './styles.js';
import axios from "axios";
import { connect } from "react-redux";
import { Config } from "react-native-config";

const PaymentMainPageHelper =  (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {
                console.log("RES.data:", res.data);

                const { user } = res.data;

                setUser(user);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])
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
                    {user !== null && user.accountType === "client" ? <ListItem button={true} onPress={() => {
                        props.props.navigation.push("payments-cards");
                    }} style={styles.listItem}>
                        <Left>
                            <NativeText>Payment Methods</NativeText>
                        </Left>
                        <Right>
                            <Image source={require("../../../assets/icons/payment-methods.png")} style={styles.icon} />
                        </Right>
                    </ListItem> : null}
                    {user !== null && (user.accountType === "mechanic" || user.accountType === "tow-truck-company" || user.accountType === "tow-truck-driver") ? <ListItem button={true} onPress={() => {
                        props.props.navigation.push("payouts-main-homepage");
                    }}style={styles.listItem}>
                        <Left>
                            <NativeText>Payout Preferences</NativeText>
                        </Left>
                        <Right>
                            <Image source={require("../../../assets/icons/request.png")} style={styles.icon} />
                        </Right>
                    </ListItem> : null}
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
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    };
}
export default connect(mapStateToProps, {  })(PaymentMainPageHelper);