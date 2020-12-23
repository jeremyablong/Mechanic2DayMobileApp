import React, { Fragment, Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Header, Left, Button, Title, Text as NativeText } from 'native-base';
import styles from './styles.js';
import { CreditCardInput } from "react-native-credit-card-input";
import Config from "react-native-config";
import { connect } from "react-redux";
import axios from "axios";

class AddCardHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        ready: false,
        postal: false,
        payment: null
    }
}

    _onChange =  (value) => {
        console.log("value", value);

        this.setState({
            payment: value.values
        })

        if (value.valid === true && value.values.postalCode.length === 5) {
            this.setState({
                ready: true
            })
        } else {
            this.setState({
                ready: false
            })
        }
    }
    handleCardAddition = () => {
        console.log("handleCardAddition");

        const { payment } = this.state;

        axios.post(`${Config.ngrok_url}/add/card/payments`, {
            cvc: payment.cvc,
            expiration: payment.expiry,
            card_number: payment.number,
            postal_code: payment.postalCode,
            type: payment.type,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Successfully added a new card!") {
                console.log(res.data);

                this.props.props.navigation.push("payments-cards");
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    renderButtons = () => {
        if (this.state.ready === false) {
            return (
                <View style={styles.btnContainer}>
                    <Button onPress={() => {

                    }} style={styles.greyButton}>
                        <NativeText style={{ color: "white" }}>Continue</NativeText>
                    </Button>
                </View>
            );
        } else {
            return (
                <View style={styles.btnContainer}>
                    <Button onPress={() => {
                        this.handleCardAddition();
                    }} style={styles.greenButton}>
                        <NativeText style={{ color: "white" }}>Continue</NativeText>
                    </Button>
                </View>
            );
        }
    }
    render () {
        console.log("this.state payments page", this.state);
        return (
            <Fragment>
                <View style={styles.container}>
                    <Header>
                        <Left style={{ flexDirection: "row" }}>
                            <Button onPress={() => {
                                this.props.props.navigation.goBack();
                            }} transparent>
                                <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                            </Button>
                            <Title style={{ paddingTop: 10 }}>Add card details</Title>
                        </Left>
                    </Header>
                    <View style={{ marginTop: 40 }}>
                        <CreditCardInput validatePostalCode={() => {
                            return "valid";
                        }} requiresPostalCode={true} allowScroll={true} onChange={this._onChange} />
                    </View>
                    <View style={styles.center}>
                        {this.renderButtons()}
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
export default connect(mapStateToProps, {  })(AddCardHelper);