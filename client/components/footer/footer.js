import React, { Fragment } from "react";
import { Image } from "react-native";
import { Content, Footer, FooterTab, Button, Badge, Text } from "native-base";
import styles from "./styles.js";
import { connect } from "react-redux";


const FooterHelper = (props) => {
    if (props.accountType === "PROVIDER") {
        return (
            <Fragment>
                <Footer>
                    <FooterTab>
                        
                        <Button onPress={() => {
                            // props.props.navigation.navigate("profile-main");
                        }} vertical>
                            <Image source={require("../../assets/icons/calendar.png")} style={styles.menuIcon} />
                        <Text>Calendar</Text>
                        </Button>
                        <Button onPress={() => {
                            props.props.navigation.push("providers-listing-homepage");
                        }} badge vertical>
                      
                            <Image source={require("../../assets/icons/3d.png")} style={styles.menuIcon} />
                        <Text>Listings</Text>
                        </Button>
                        <Button onPress={() => {
                            // props.props.navigation.navigate("homepage-main");
                        }} badge vertical>
                        <Badge style={styles.badge}><Text>51</Text></Badge>
                            <Image source={require("../../assets/icons/chat.png")} style={styles.menuIcon} />
                        <Text>Chat</Text>
                        </Button>
                        <Button onPress={() => {
                           props.props.navigation.push("profile-main");
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
                            props.props.navigation.navigate("homepage-main");
                        }} badge vertical>
                        <Badge style={styles.badge}><Text>2</Text></Badge>
                            <Image source={require("../../assets/icons/home.png")} style={styles.menuIcon} />
                        <Text>Home</Text>
                        </Button>
                        <Button onPress={() => {
                            // props.props.navigation.navigate("profile-main");
                        }} vertical>
                            <Image source={require("../../assets/icons/list.png")} style={styles.menuIcon} />
                        <Text>List</Text>
                        </Button>
                        <Button onPress={() => {
                            props.props.navigation.navigate("chat-conversations");
                        }} badge vertical>
                        <Badge style={styles.badge}><Text>51</Text></Badge>
                            <Image source={require("../../assets/icons/messages.png")} style={styles.menuIcon} />
                        <Text>Chat</Text>
                        </Button>
                        <Button onPress={() => {
                            if (props.finished === true) {
                                props.props.navigation.navigate("profile-main");
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
    if (state.accountType.type) {
        return {
            finished: state.auth.finished,
            accountType: state.accountType.type.type
        };
    } else {
        return {
            finished: state.auth.finished,
            accountType: null
        };
    }
}
export default connect(mapStateToProps, { })(FooterHelper);