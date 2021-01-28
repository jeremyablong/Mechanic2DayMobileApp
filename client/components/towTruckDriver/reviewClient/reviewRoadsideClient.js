import React, { Component, Fragment } from 'react';
import { Text, View, Image } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle } from 'native-base';


class ReviewRoadsideAssistanceClientHelper extends Component {
    render() {
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
                        <Title>Review Client</Title>
                        <Subtitle>Time to review your client...</Subtitle>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                           this.props.props.navigation.push("homepage-main")
                        }} transparent>
                            <Image source={require("../../../assets/icons/home.png")} style={[styles.headerIcon, { position: "absolute", right: 20 }]} />
                        </Button>
                    </Right>
                </Header>
            </Fragment>
        )
    }
}
export default ReviewRoadsideAssistanceClientHelper;