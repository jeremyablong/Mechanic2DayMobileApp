import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles.js";
import { Container, Content, List, Left, Right, ListItem, Text as NativeText } from 'native-base';
import FooterHelper from "../../footer/footer.js";
import { authenticated, finishedSignup } from "../../../actions/signup/auth.js";
import { connect } from "react-redux";


class ProfileMainHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        mechanic: true
    }
}
    deauthenticate = () => {
        this.props.authenticated({});
        this.props.finishedSignup(false);

        setTimeout(() => {
            this.props.props.navigation.navigate("homepage");
        },  500);
    }
    renderConditional = () => {
        if (this.state.mechanic) {
            return (
                <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
                    <Content>
                        <List>
                            <ListItem style={styles.divider} itemDivider>
                             <Left><NativeText>ACCOUNT SETTINGS</NativeText></Left>
                            </ListItem>                    
                            <ListItem button={true} onPress={() => {
                                this.props.props.navigation.navigate("personal-info");
                            }} style={styles.listItem}>
                            <Left><NativeText>Personal information</NativeText></Left><Right><Image source={require("../../../assets/icons/info.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem button={true} onPress={() => {
                                this.props.props.navigation.navigate("payments-main");
                            }} style={styles.listItem}>
                            <Left><NativeText>Payments and payouts</NativeText></Left><Right><Image source={require("../../../assets/icons/payment.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={styles.listItem}>
                            <Left><NativeText>Notifications</NativeText></Left><Right><Image source={require("../../../assets/icons/bell.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={styles.listItem}>
                            <Left><NativeText>On the go</NativeText></Left><Right><Image source={require("../../../assets/icons/go.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={styles.divider} itemDivider>
                            <Left><NativeText>ACCOUNT TYPE (CURRENT TYPE - CLIENT)</NativeText></Left> 
                            </ListItem>  
                            <ListItem style={styles.listItem}>
                            <Left><NativeText>Switch to "provider" account</NativeText></Left><Right><Image source={require("../../../assets/icons/profile-two.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={styles.listItem}>
                            <Left><NativeText>Create a listing (need help/repair)</NativeText></Left><Right><Image source={require("../../../assets/icons/create.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={styles.divider} itemDivider>
                            <Left><NativeText>REFERRALS & CREDITS</NativeText></Left> 
                            </ListItem> 
                            <ListItem style={styles.listItem}>
                            <Left><NativeText><Text style={styles.bigger}>Gift cards</Text> {"\n"}Send or redeem gift card</NativeText></Left><Right><Image source={require("../../../assets/icons/gift-card.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={[styles.listItem, { minHeight: 100 }]}>
                            <Left><NativeText><Text style={styles.bigger}>Invite friends</Text> {"\n"}When they join, your friends will get up to $65 off a qualifying repair.</NativeText></Left><Right><Image source={require("../../../assets/icons/invite.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={styles.divider} itemDivider>
                            <Left><NativeText>SUPPORT & HELP</NativeText></Left>
                            </ListItem> 
                            <ListItem style={styles.listItem}>
                            <Left><NativeText>How (company name) works</NativeText></Left><Right><Image source={require("../../../assets/icons/outline.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={[styles.listItem, { minHeight: 100 }]}>
                            <Left><NativeText><Text style={styles.bigger}>Support center</Text> {"\n"}Get the support, tools, and information you need to be safe.</NativeText></Left><Right><Image source={require("../../../assets/icons/help.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={[styles.listItem, { minHeight: 100 }]}>
                            <Left><NativeText><Text style={styles.bigger}>Report scams/fraud</Text> {"\n"}Let our team know if you encounter a scam or any suspicious behavior.</NativeText></Left><Right><Image source={require("../../../assets/icons/fraud.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={styles.listItem}>
                            <Left><NativeText>Get help</NativeText></Left><Right><Image source={require("../../../assets/icons/outline.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={styles.listItem}>
                            <Left><NativeText>Give us feedback</NativeText></Left><Right><Image source={require("../../../assets/icons/feedback.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={styles.divider} itemDivider>
                            <Left><NativeText>LEGAL</NativeText></Left> 
                            </ListItem> 
                            <ListItem style={styles.listItem}>
                            <Left><NativeText>Terms of service</NativeText></Left><Right><Image source={require("../../../assets/icons/terms.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem onPress={this.deauthenticate} style={styles.listItem}>
                            <Left><NativeText>Log out</NativeText></Left><Right><Image source={require("../../../assets/icons/log-out.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={styles.listItem}>
                            <Left><NativeText>VERSION 20.48.1(2394829)</NativeText></Left><Right><Image source={require("../../../assets/icons/version.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                        </List>
                    </Content>
                </ScrollView>
            );
        } else {
            
        }
    }
    render() {
        const firstName = "Jeremy";
        return (
            <Fragment>
                <View style={styles.topContainer}>
                    <View>
                        <Image source={require("../../../assets/images/me.jpg")} style={styles.profilePic} />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{firstName}</Text>
                        <TouchableOpacity onPress={() => {
                            this.props.props.navigation.navigate("view-public-profile-page");
                        }}>
                            <Text style={styles.subText}>View Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    {this.renderConditional()}
                </View>
                <FooterHelper props={this.props.props} />
            </Fragment>
        )
    }
}
export default connect(null, { authenticated, finishedSignup })(ProfileMainHelper);