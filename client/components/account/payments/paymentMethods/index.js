import React, { Fragment, Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Header, Left, Right, Button, Title, Text as NativeText, Body, ListItem } from 'native-base';
import styles from './styles.js';
import axios from 'axios';
import { connect } from "react-redux";
import Config from "react-native-config";

class EditPaymentMethodsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        cards: []
    }
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/credit/debit/cards`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Gathered cards successfully!") {

                const { cards } = res.data;

                this.setState({ 
                    cards 
                });
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render () { 
        const { cards } = this.state;
        return (
            <Fragment>
                <View style={styles.container}>
                    <Header>
                        <Left style={{ flexDirection: "row" }}>
                            <Button onPress={() => {
                                this.props.props.navigation.navigate("payments-main");
                            }} transparent>
                                <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                            </Button>
                            <Title style={{ paddingTop: 10 }}>Edit your payment methods</Title>
                        </Left>
                    </Header>
                    <ListItem button={true} onPress={() => {
                        this.props.props.navigation.navigate("add-payment-card");
                    }} style={styles.listItem}>
                        <Left>
                            <NativeText style={{ color: "darkblue" }}>Add payment method</NativeText>
                        </Left>
                    </ListItem>
                    {typeof cards !== "undefined" && cards.length > 0 ? cards.map((card, index) => {
                        console.log(card);
                        if (card.type === "master-card") {
                            return (
                                <ListItem onPress={() => {
                                    this.props.props.navigation.push("view-individual-card-info", { card });
                                }} button={true} style={styles.listItem} icon>
                                    <Left style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Image source={require("../../../../assets/icons/mastercard.png")} style={styles.paymentIcon} />
                                        </TouchableOpacity>
                                        <NativeText style={{ marginLeft: 20 }}>Visa {card.last_four}</NativeText>
                                    </Left>
                                    <Right>
                                        {card.primary === true ? <Text style={styles.default}>Default</Text> : null}
                                    </Right>
                                </ListItem>
                            );
                        } else if (card.type === "visa") {
                            return (
                                <ListItem onPress={() => {
                                    this.props.props.navigation.push("view-individual-card-info", { card });
                                }} button={true} style={styles.listItem} icon>
                                    <Left style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Image source={require("../../../../assets/icons/visa.png")} style={styles.paymentIcon} />
                                        </TouchableOpacity>
                                        <NativeText style={{ marginLeft: 20 }}>Visa {card.last_four}</NativeText>
                                    </Left>
                                     <Right>
                                        {card.primary === true ? <Text style={styles.default}>Default</Text> : null}
                                    </Right>
                                </ListItem>
                            );
                        }
                    }) : null}
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
export default connect(mapStateToProps, {  })(EditPaymentMethodsHelper);