import React, { Component, Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText } from 'native-base';


class NotificationsHelper extends Component {
constructor(props) {
    super(props);

    
}
    render() {
        return (
           <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                        <Image source={require("../../assets/icons/go-back.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
                        <NativeText style={{ color: "black" }}>Back</NativeText>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Notifications</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        <NativeText style={{ color: "black" }}>Cancel</NativeText>
                        </Button>
                    </Right>
                </Header>
           </Fragment>
        )
    }
}
export default NotificationsHelper;