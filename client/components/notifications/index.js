import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle } from 'native-base';


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
                     
                        <NativeText>Back</NativeText>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Notifications</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        <NativeText>Cancel</NativeText>
                        </Button>
                    </Right>
                </Header>
           </Fragment>
        )
    }
}
export default NotificationsHelper;