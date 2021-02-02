import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles.js";
import { Container, Content, List, Left, Right, ListItem, Text as NativeText } from 'native-base';
import FooterHelper from "../../footer/footer.js";
import { authenticated, finishedSignup } from "../../../actions/signup/auth.js";
import { connect } from "react-redux";
import { switchAccountType } from "../../../actions/accountType/type.js";
import axios from "axios";
import { Config } from "react-native-config";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { sendbirdLogin } from "../../../actions/sendbird/user.js";

class ProfileMainHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        mechanic: true,
        user: null
    }
}
    deauthenticate = () => {
        this.props.authenticated({});
        this.props.finishedSignup(false);
        this.props.sendbirdLogin({ userId: null, nickname: null });
        this.props.switchAccountType({
            type: "CLIENT"
        })


        setTimeout(() => {
            this.props.props.navigation.push("homepage-main");
        },  500);
    }
    componentDidMount() {
        setTimeout(() => {
            axios.post(`${Config.ngrok_url}/gather/general/info`, {
                id: this.props.unique_id
            }).then((res) => {
                if (res.data.message === "Found user!") {
                    console.log(res.data);
    
                    const { user } = res.data;
    
                    this.setState({
                        user
                    })
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }, 400);
    }   
    changeAccountType = () => {
        console.log("changeAccountType clicked.");

        if (this.props.accountType === "PROVIDER") {
            this.props.switchAccountType({
                type: "CLIENT"
            })
        } else {
            this.props.switchAccountType({
                type: "PROVIDER"
            })
        }

        // setTimeout(() => {
        //     this.props.props.navigation.push("homepage-main");
        // },  500);
    }
    renderConditionalAuth = () => {
        const { user } = this.state;

        if (user !== null && (user.accountType === "mechanic" || user.accountType === "client")) {
            if (this.props.accountType === "CLIENT") {
                return (
                    <Fragment>
                        <ListItem style={styles.divider} itemDivider>
                        <Left><NativeText>ACCOUNT TYPE (CURRENT TYPE - CLIENT)</NativeText></Left> 
                        </ListItem>  
                        <ListItem button onPress={() => {
                            this.changeAccountType();
                        }} style={styles.listItem}>
                        <Left><NativeText>{this.props.accountType === "PROVIDER" ? `Switch to "client" account` : `Switch to "provider" account`}</NativeText></Left><Right><Image source={require("../../../assets/icons/profile-two.png")} style={styles.inlineIcon} /></Right>
                        </ListItem>
                    </Fragment>
                )
            } else {
                return (
                    <Fragment>
                        <ListItem style={styles.divider} itemDivider>
                        <Left><NativeText>ACCOUNT TYPE (CURRENT TYPE - CLIENT)</NativeText></Left> 
                        </ListItem>  
                        <ListItem button onPress={() => {
                            this.changeAccountType();
                        }} style={styles.listItem}>
                        <Left><NativeText>{this.props.accountType === "PROVIDER" ? `Switch to "client" account` : `Switch to "provider" account`}</NativeText></Left><Right><Image source={require("../../../assets/icons/profile-two.png")} style={styles.inlineIcon} /></Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.props.props.navigation.push("list-vehicle-start");
                        }} style={styles.listItem}>
                        <Left><NativeText>Create a listing (need help/repair)</NativeText></Left><Right><Image source={require("../../../assets/icons/create.png")} style={styles.inlineIcon} /></Right>
                        </ListItem>
                    </Fragment>
                );
            }
        }
    }
    renderConditional = () => {
        const { user } = this.state;
        
        if (user !== null) {
            return (
                <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
                    <Content>
                        <List>
                            <ListItem style={styles.divider} itemDivider>
                             <Left><NativeText>QUICK LINKS</NativeText></Left>
                            </ListItem>                    
                            <ListItem button={true} onPress={() => {
                                this.props.props.navigation.push("homepage-main");
                            }} style={styles.listItem}>
                            <Left><NativeText>Main Homepage</NativeText></Left><Right><Image source={require("../../../assets/icons/home.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem style={styles.divider} itemDivider>
                             <Left><NativeText>ACCOUNT SETTINGS</NativeText></Left>
                            </ListItem>                    
                            <ListItem button={true} onPress={() => {
                                this.props.props.navigation.push("personal-info");
                            }} style={styles.listItem}>
                            <Left><NativeText>Personal information</NativeText></Left><Right><Image source={require("../../../assets/icons/info.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem button={true} onPress={() => {
                                this.props.props.navigation.push("payments-main");
                            }} style={styles.listItem}>
                            <Left><NativeText>Payments and payouts</NativeText></Left><Right><Image source={require("../../../assets/icons/payment.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            <ListItem button={true} onPress={() => {
                                this.props.props.navigation.push("notifications");
                            }} style={styles.listItem}>
                            <Left><NativeText>Notifications</NativeText></Left><Right><Image source={require("../../../assets/icons/bell.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            {user.accountType === "client" ? <ListItem button={true} onPress={() => {
                                this.props.props.navigation.push("providers-listing-homepage");
                            }} style={styles.listItem}>
                            <Left><NativeText>List your vehicle for repair</NativeText></Left><Right><Image source={require("../../../assets/icons/go.png")} style={styles.inlineIcon} /></Right>
                            </ListItem> : null}
                            <ListItem button={true} onPress={() => {
                                this.props.props.navigation.push("active-jobs");
                            }} style={styles.listItem}>
                            <Left><NativeText>Active repair jobs</NativeText></Left><Right><Image source={require("../../../assets/icons/go.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            {user.accountType === "tow-truck-driver" ? <ListItem button={true} onPress={() => {
                                this.props.props.navigation.push("tow-truck-driver-online-homepage");
                            }} style={styles.listItem}>
                            <Left><NativeText>Go ONLINE & more...</NativeText></Left><Right><Image source={require("../../../assets/icons/online.png")} style={styles.inlineIcon} /></Right>
                            </ListItem> : null}
                            {user.accountType === "tow-truck-company" ? <ListItem button={true} onPress={() => {
                            this.props.props.navigation.push("advertise-roadside-assistance-main");
                            }} style={styles.listItem}>
                            <Left><NativeText>Advertise Roadside Assistance</NativeText></Left><Right><Image source={require("../../../assets/icons/info.png")} style={styles.inlineIcon} /></Right>
                            </ListItem> : null}
                            {user.accountType === "client" ? <ListItem button={true} onPress={() => {
                                this.props.props.navigation.push("roadside-assistance-main-landing");
                            }} style={styles.listItem}>
                            <Left><NativeText>Roadside Assistance</NativeText></Left><Right><Image source={require("../../../assets/icons/tow-truck.png")} style={styles.inlineIcon} /></Right>
                            </ListItem> : null}
                            <ListItem button={true} onPress={() => {
                                this.props.props.navigation.push("verify-validate-account-stripe");
                            }} style={styles.listItem}>
                            <Left><NativeText numberOfLines={2}>Verify/Validate Account</NativeText></Left><Right><Image source={require("../../../assets/icons/approval.png")} style={styles.inlineIcon} /></Right>
                            </ListItem>
                            {user.accountType === "tow-truck-company" ?  <ListItem button={true} onPress={() => {
                                this.props.props.navigation.push("manage-tow-drivers");
                            }} style={styles.listItem}>
                            <Left><NativeText>Manage Tow Drivers</NativeText></Left><Right><Image source={require("../../../assets/icons/tow-truck.png")} style={styles.inlineIcon} /></Right>
                            </ListItem> : null}
                            {this.renderConditionalAuth()}
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
    renderProfilePic = () => {
        const { user } = this.state;

        if (user !== null && typeof user.profilePics !== 'undefined' && user.profilePics.length > 0) {
            return (
                <Fragment>
                    <Image source={{ uri: user.profilePics[user.profilePics.length - 1].full_url }} style={styles.profilePic} />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonPlaceholder>
                    <View style={styles.profilePic} />
                    </SkeletonPlaceholder>
                </Fragment>
            );
        }
    }
    render() {
        console.log("this.state profile main.js", this.state);
        return (
            <Fragment>
                <View style={styles.topContainer}>
                    <View>
                        {this.renderProfilePic()}
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{this.props.fullName}</Text>
                        <TouchableOpacity onPress={() => {
                            this.props.props.navigation.push("view-public-profile-page");
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
const mapStateToProps = (state) => {
    if (state.accountType.type) {
        return {
            accountType: state.accountType.type.type,
            unique_id: state.auth.authenticated.unique_id,
            fullName: state.auth.authenticated.fullName
        };
    } else {
        return {
            accountType: {},
            fullName: state.auth.authenticated.fullName,
            unique_id: state.auth.authenticated.unique_id
        };
    }
}
export default connect(mapStateToProps, { authenticated, finishedSignup, switchAccountType, sendbirdLogin })(ProfileMainHelper);