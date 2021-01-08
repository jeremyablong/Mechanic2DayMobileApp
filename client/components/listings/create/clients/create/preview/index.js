import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Left, Button, Right, Title, Text as NativeText, List, ListItem } from 'native-base';
import styles from './styles.js';
import axios from 'axios';
import { connect } from 'react-redux';
import { Config } from "react-native-config";
import _ from "lodash";
import Dialog from "react-native-dialog";



class PreviewStepsBrokenVehicleListing extends Component {
constructor(props) {
    super(props);

    this.state = {
        user: null,
        showDialog: false
    }
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
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
    
        },  400);
    }
    render() {
        console.log("this.state. PREVIEW", this.state);
        const { user } = this.state;
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require('../../../../../../assets/icons/go-back.png')} style={styles.icon} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -20 }}>Let's set up your listing</Title>
                    </Left>
                    
                </Header>
                <ScrollView style={styles.container}>
                    <ListItem style={{ minHeight: 75 }}>
                        <Left>
                            <NativeText style={styles.normalFont}>Main Details</NativeText>
                        </Left>
                        
                        <View style={styles.rightRight}>
                            <Button onPress={() => {
                                if (_.has(user, "paypal_payment_address")) {
                                    this.props.props.navigation.navigate("create-vehicle-listing-one");
                                } else {
                                    this.setState({
                                        showDialog: true
                                    })
                                }
                            }} style={styles.continueButton}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Continue</NativeText>
                            </Button>
                        </View>
                     
                    </ListItem>
                    <List>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Location</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Details (description of issues)</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Specifications of vehicle</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Photos</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Title</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Booking Settings</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Avaliability</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Pricing</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={{ minHeight: 55 }}>
                            <Left>
                                <NativeText style={styles.normalFont}>Review</NativeText>
                            </Left>
                        </ListItem>
                    </List>
                </ScrollView>
                <View>
                    <Dialog.Container visible={this.state.showDialog}>
                    <Dialog.Title>Fill out PayPal email information before proceeding</Dialog.Title>
                    <Dialog.Description>
                        Would you like to go to the payments page to fill out your paypal email address? This is a requirement to post listings.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({ 
                            showDialog: false 
                        });
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showDialog: false
                        }, () => {
                            this.props.props.navigation.navigate("create-payment-paypal");
                        })
                    }} label="Redirect Me" />
                    </Dialog.Container>
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(PreviewStepsBrokenVehicleListing);