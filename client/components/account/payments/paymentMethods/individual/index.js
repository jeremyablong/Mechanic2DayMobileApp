import React, { Fragment, Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Header, Left, Button, Title, Right, Text as NativeText, ListItem, List } from 'native-base';
import styles from './styles.js';
import Config from "react-native-config";
import { connect } from "react-redux";
import axios from "axios";
import { Switch } from 'react-native-switch';
import Dialog from "react-native-dialog";

class IndividualCreditDebitCardHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        card: null,
        switch: false,
        showDialog: false,
        deleteModal: false
    }
}
    componentDidMount() {
        const card = this.props.props.route.params.card;

        console.log("mounted...", card);

        this.setState({
            switch: card.primary
        })
    }
    handleDelete = () => {
        console.log("handle delete.");

        const card = this.props.props.route.params.card;

        axios.post(`${Config.ngrok_url}/edit/card/individual`, {
            card,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Successfully deleted the desired card!") {
                console.log(res.data);

                this.setState({
                    deleteModal: false
                }, () => {
                    this.props.props.navigation.push("payments-cards");
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleChangeSwitch = () => {
        if (this.state.switch === false) {
            this.setState({
                showDialog: true
            })
        }
    }
    switchPaymentPrimary = () => {
        console.log("switchPaymentPrimary", this.props.props.route.params.card);

        const card = this.props.props.route.params.card;

        axios.post(`${Config.ngrok_url}/update/payment/primary`, {
            card,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Changed to primary!") {
                console.log(res.data);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render () {
        console.log("this.state individual debit/credit card page", this.state);
        
        const card = this.props.props.route.params.card;
        return (
            <Fragment>
                <View style={styles.container}>
                    <Header>
                        <Left style={{ flexDirection: "row" }}>
                            <Button onPress={() => {
                                this.props.props.navigation.push("payments-cards");
                            }} transparent>
                                <Image source={require("../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                            </Button>
                            <Title style={{ paddingTop: 10 }}>Credit Card</Title>
                        </Left>
                    </Header>
                    <List>
                        <ListItem onPress={() => {
                            
                        }} button={true} style={styles.listItem}>
                            <Left style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => {}}>
                                    <Image source={card.type === "master-card" ? require("../../../../../assets/icons/mastercard.png") : require("../../../../../assets/icons/visa.png")} style={styles.paymentIcon} />
                                </TouchableOpacity>
                                <NativeText style={{ marginLeft: 20 }}>{card.type === "master-card" ? "Master-Card" : "Visa"} {card.last_four}</NativeText>
                            </Left>
                        </ListItem>
                        <ListItem style={styles.listItem}>
                            <Left style={{ flexDirection: "row" }}>
                                <NativeText>Set as default</NativeText>
                            </Left>
                            <Right>
                            <View style={{ marginRight: 20 }}>
                                <Switch
                                    value={this.state.switch}
                                    onValueChange={(val) => {
                                        if (this.state.switch === false) {
                                            this.handleChangeSwitch();
                                        }
                                    }} 
                                    disabled={this.state.switch}
                                    activeText={'On'}
                                    inActiveText={'Off'}
                                    circleSize={30}
                                />
                            </View>
                            </Right>
                        </ListItem>
                    </List>
                    <View style={styles.deleteContainer}>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                deleteModal: true
                            })
                        }}>
                            <Text style={{ fontSize: 20, color: "darkblue" }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Dialog.Container visible={this.state.deleteModal}>
                        <Dialog.Title>Card Delete</Dialog.Title>
                        <Dialog.Description>
                            Do you want to delete this card? You cannot undo this action.
                        </Dialog.Description>
                        <Dialog.Button onPress={() => {
                            this.setState({
                                deleteModal: false
                            })
                        }} label="Cancel" />
                        <Dialog.Button onPress={this.handleDelete} label="Delete Card" />
                        </Dialog.Container>
                    </View>
                    <View>
                        <Dialog.Container visible={this.state.showDialog}>
                        <Dialog.Title>Make Primary Payment Method</Dialog.Title>
                        <Dialog.Description>
                            Are you sure you would like to make this your primary payment method?
                        </Dialog.Description>
                        <Dialog.Button onPress={() => {
                            this.setState({
                                showDialog: false
                            })
                        }} label="Cancel" />
                        <Dialog.Button onPress={() => {
                            this.setState({
                                switch: true,
                                showDialog: false
                            }, () => {
                                this.switchPaymentPrimary();
                            })
                        }} label="Change" />
                        </Dialog.Container>
                    </View>
                </View>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    };
}
export default connect(mapStateToProps, {  })(IndividualCreditDebitCardHelper);