import React, { Component, Fragment } from 'react';
import styles from "./styles.js";
import { View, Text, Image } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Text as NativeText } from 'native-base';



class MessagingConversationsHelper extends Component {
constructor(props) {
    super(props);


}
    render() {
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                        <Title style={{ marginTop: 10 }}>Conversations</Title>
                    </Left>
                   
                </Header>
            </Fragment>
        )
    }
}
export default MessagingConversationsHelper;