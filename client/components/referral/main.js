import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Subtitle, List, ListItem, Icon } from 'native-base';
import styles from "./styles.js";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import RBSheet from "react-native-raw-bottom-sheet";
import { connect } from "react-redux";
import axios from "axios";
import { Config } from "react-native-config";
import { sendEmail } from './helpers/gmail.js';

const { height, width } = Dimensions.get("window");

class ReferralSystemMainHelper extends Component {
constructor(props) {
    super(props);

    this.state = {

    }
}
    sendGmailEmailMessage = () => {
        console.log("sendGmailEmailMessage clicked");

        this.RBSheet.close();

        setTimeout(() => {
            sendEmail(
                '',
                   'Join Mechanic2Day to get up to $34.99 off your first claim!',
                `I'm giving you up to $34.99 off your first trip
                
                Hey,
                If you sign up for Mechanic2Day with my link, we'll both recieve up to $34.99 off a roadside assistance claim or mechanical repair. Give it a try! Just click the link or paste the address in your browser.`,
             { cc: "" }
            ).then(() => {
                console.log('Your message was successfully sent!');
            }).catch((err) => {
                console.log(err);
            });
        }, 750)

        // axios.post(`${Config.ngrok_url}/send/gmail/referral/email`, {
        //     id: this.props.unique_id
        // }).then((res) => {
        //     if (res.data.message === "") {
        //         console.log(res.data);
        //     } else {
        //         console.log("Err", res.data);
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // })
    }
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
                    height={height * 0.40}
                    openDuration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                    >
                    <TouchableOpacity style={styles.absolute} onPress={() => {
                        this.RBSheet.close();
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Close</Text>
                    </TouchableOpacity>
                    <View>
                        <List>
                            <ListItem style={styles.listitem} button={true} onPress={this.sendGmailEmailMessage} icon>
                                <Left>
                                <Button transparent>
                                    <Image source={require("../../assets/icons/gmail.png")} style={styles.innerIcon} />
                                </Button>
                                </Left>
                                <Body>
                                <Text>Gmail</Text>
                                </Body>
                                <Right>
                                <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem style={styles.listitem} button={true} onPress={() => {}} icon>
                                <Left>
                                <Button transparent>
                                    <Image source={require("../../assets/icons/facebook.png")} style={styles.innerIcon} />
                                </Button>
                                </Left>
                                <Body>
                                <Text>News Feed</Text>
                                </Body>
                                <Right>
                                <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem style={styles.listitem} button={true} onPress={() => {}} icon>
                                <Left>
                                <Button transparent>
                                    <Image source={require("../../assets/icons/whatsapp.png")} style={styles.innerIcon} />
                                </Button>
                                </Left>
                                <Body>
                                <Text>WhatsApp</Text>
                                </Body>
                                <Right>
                                <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem style={styles.listitem} button={true} onPress={() => {}} icon>
                                <Left>
                                <Button transparent>
                                    <Image source={require("../../assets/icons/facebook-messenger.png")} style={styles.innerIcon} />
                                </Button>
                                </Left>
                                <Body>
                                <Text>Chats</Text>
                                </Body>
                                <Right>
                                <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>

                        </List>
                    </View>
                </RBSheet>
            </Fragment>
        )
    }
}
export default ReferralSystemMainHelper;