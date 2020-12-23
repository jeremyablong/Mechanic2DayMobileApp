import React, { Fragment } from "react";
import { Image } from "react-native";
import { Content, Footer, FooterTab, Button, Badge, Text } from "native-base";
import styles from "./styles.js";

const FooterHelper = (props) => {
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
                        props.props.navigation.navigate("profile-main");
                    }} vertical>
                        <Image source={require("../../assets/icons/list.png")} style={styles.menuIcon} />
                    <Text>List</Text>
                    </Button>
                    <Button onPress={() => {
                        props.props.navigation.navigate("profile-main");
                    }} badge vertical>
                    <Badge style={styles.badge}><Text>51</Text></Badge>
                        <Image source={require("../../assets/icons/messages.png")} style={styles.menuIcon} />
                    <Text>Chat</Text>
                    </Button>
                    <Button onPress={() => {
                        props.props.navigation.navigate("profile-main");
                    }} vertical>
                        <Image source={require("../../assets/icons/account.png")} style={styles.menuIcon} />
                    <Text>Account</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Fragment>
    );
}
export default FooterHelper;