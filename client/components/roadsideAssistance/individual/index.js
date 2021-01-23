import React, { Component, Fragment } from 'react';
import { View, Text, Image } from "react-native";
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Icon } from 'native-base';
import styles from './styles.js';

class IndividualListingTowCompanyHelper extends Component {
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
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Individual Listing</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            this.props.props.navigation.navigate("advertise-create-address-preview");
                        }} transparent>
                            <Image source={require("../../../assets/icons/plus.png")} style={styles.headerIcon} />
                        </Button>
                    </Right>
                </Header>
            </Fragment>
        )
    }
}
export default IndividualListingTowCompanyHelper;