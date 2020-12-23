import React, { Fragment } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Header, Left, Right, Button, Body, Title, Text as NativeText, ListItem } from 'native-base';
import styles from './styles.js';

const PaymentCardAddNewHelper =  (props) => {
    return (
        <Fragment>
            <View style={styles.container}>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                        <Title style={{ paddingTop: 10 }}>Add new payment form</Title>
                    </Left>
                </Header>
                <ListItem button={true} onPress={() => {
                    props.props.navigation.navigate("create-payment");
                }} style={styles.listItemCustom} icon>
                    <Left style={{ flexDirection: "row" }}>
                        
                        <Image source={require("../../../../assets/icons/payment-methods.png")} style={styles.specialIcon} />
                 
                        <Text style={{ padding: 8 }}>Credit or debit card</Text>
                    </Left>
                    <Right>
                        <Image source={require("../../../../assets/icons/forward.png")} style={styles.specialIcon} />
                    </Right>
                </ListItem>
                <ListItem button={true} onPress={() => {}} style={styles.listItemCustom} icon>
                    <Left style={{ flexDirection: "row" }}>
                       
                        <Image source={require("../../../../assets/icons/paypal-colored.png")} style={styles.specialIcon} />
                        
                        <Text style={{ padding: 8 }}>Paypal</Text>
                    </Left>
                    <Right>
                        <Image source={require("../../../../assets/icons/forward.png")} style={styles.specialIcon} />
                    </Right>
                </ListItem>
            </View>
        </Fragment>
    );
}
export default PaymentCardAddNewHelper;