import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions } from "react-native";
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Subtitle, List, ListItem, Icon } from 'native-base';
import styles from "./styles.js";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import RBSheet from "react-native-raw-bottom-sheet";


const { height, width } = Dimensions.get("window");

class ReferralSystemMainHelper extends Component {
    render() {
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Promotions</Title>
                        <Subtitle>Links, Credits & more...</Subtitle>
                    </Body>
                    <Right>
                    
                    </Right>
                </Header>
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.header}>Give friends up to $65 toward a qualifying booking</Text>
                        <View style={styles.hr} />
                        <Text style={styles.smallerText}>Share your link with people new to Mechanic2Day. We'll give them up to $35 off a qualifying booking and you'll get $35 towards your next interaction.</Text>
                        <View style={styles.hr} />
                        <AwesomeButtonBlue type={"secondary"} onPress={() => {
                            this.RBSheet.open();
                        }} stretch={true}>Share your link</AwesomeButtonBlue>
                        <View style={styles.hr} />
                        <List>
                            <ListItem button={true} onPress={() => {}}> 
                                <Left>
                                    <NativeText>Your account credits</NativeText>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem button={true} onPress={() => {}}> 
                                <Left>
                                    <NativeText>Read terms and conditions</NativeText>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        </List>
                    </View>
                </View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={height * 0.50}
                    openDuration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                    >
                    <View>

                    </View>
                </RBSheet>
            </Fragment>
        )
    }
}
export default ReferralSystemMainHelper;