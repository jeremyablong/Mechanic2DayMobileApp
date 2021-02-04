import React, { Fragment } from "react";
import { Image } from "react-native";
import { Content, Footer, FooterTab, Button, Badge, Text } from "native-base";
import styles from "./styles.js";
import { connect } from "react-redux";
import { useRoute } from '@react-navigation/native';

const FooterHelper = (props) => {
    const route = useRoute();
    if (props.accountType === "PROVIDER") {
        return (
            <Fragment>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => {
                            props.props.navigation.push("proposals");
                        }} vertical>
                            <Image source={require("../../assets/icons/apply.png")} style={styles.menuIcon} />
                        <Text>Proposal</Text>
                        </Button>
                        <Button onPress={() => {
                            props.props.navigation.push("providers-listing-homepage");
                        }} badge vertical>
                      
                            <Image source={require("../../assets/icons/3d.png")} style={styles.menuIcon} />
                        <Text>Listings</Text>
                        </Button>
                        <Button onPress={() => {
                            props.props.navigation.push("chat-conversations");
                        }} badge vertical>
                        <Badge style={styles.badge}><Text>51</Text></Badge>
                            <Image source={require("../../assets/icons/chat.png")} style={styles.menuIcon} />
                        <Text>Chat</Text>
                        </Button>
                        <Button onPress={() => {
                            if (route.name !== "profile-main") {
                                props.props.navigation.push("profile-main");
                            }
                        }} vertical>
                            <Image source={require("../../assets/icons/account.png")} style={styles.menuIcon} />
                        <Text>Account</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => {
                            if (route.name !== "homepage-main") {
                                props.props.navigation.push("homepage-main");
                            }
                        }} badge vertical>
                            <Image source={require("../../assets/icons/home.png")} style={styles.menuIcon} />
                            <Text>Home</Text>
                        </Button>
                        <Button onPress={() => {
                            props.props.navigation.push("active-jobs");
                        }} vertical>
                            <Image source={require("../../assets/icons/list.png")} style={styles.menuIcon} />
                            <Text>Active</Text>
                        </Button>
                        <Button onPress={() => {
                            props.props.navigation.navigate("chat-conversations");
                        }} badge vertical>
                        <Badge style={styles.badge}><Text>51</Text></Badge>
                            <Image source={require("../../assets/icons/messages.png")} style={styles.menuIcon} />
                            <Text>Chat</Text>
                        </Button>
                        <Button onPress={() => {
                            if (typeof props.authenticateddd !== "undefined" && props.authenticateddd !== null && Object.keys(props.authenticateddd).length > 0 && !props.authenticateddd.page) {
                                if (route.name !== "profile-main") {
                                    props.props.navigation.push("profile-main");
                                }
                            } else {
                                props.props.navigation.navigate("homepage");
                            }
                        }} vertical>
                            <Image source={require("../../assets/icons/account.png")} style={styles.menuIcon} />
                        <Text>Account</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    console.log("STATTTTTTTTT", state);
    if (state.accountType.type) {
        return {
            finished: state.auth.finished,
            accountType: state.accountType.type.type,
            authenticateddd: state.auth.authenticated
        };
    } else {
        return {
            finished: state.auth.finished,
            accountType: null,
            authenticateddd: state.auth.authenticated
        };
    }
}
export default connect(mapStateToProps, { })(FooterHelper);