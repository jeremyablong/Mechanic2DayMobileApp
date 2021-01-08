import React, { Component, Fragment } from 'react'
import { Header, Left, Button, Title, Text as NativeText, Subtitle } from 'native-base';
import { View, Text, Image } from 'react-native';
import styles from './styles.js';

class ManageActiveRepairHelper extends Component {
    render() {
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image style={styles.headerIcon} source={require('../../../assets/icons/go-back.png')} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -15 }}>Manage/Edit Listing Details</Title>
                    </Left>
                </Header>
                <View style={styles.container}>
                    
                </View>
            </Fragment>
        )
    }
}
export default ManageActiveRepairHelper;