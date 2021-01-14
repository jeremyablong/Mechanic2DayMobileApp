import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { Header, Left, Button, Title, Text as NativeText } from 'native-base';
import styles from './styles.js';
import axios from 'axios';
import { Config } from "react-native-config";
import { connect } from "react-redux";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const { height, width } = Dimensions.get("window");


class OrderDetailsPaypalPaymentHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        paypal_data: null
    }
}
    componentDidMount() {
        const item = this.props.props.route.params.item;

        setTimeout(() => {
            const { paypal_access_token } = this.props;

            console.log("paypal_access_token", paypal_access_token);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${paypal_access_token}`
                }
            }

            axios.get(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${item.paypal_order_id}`, config).then((res) => {
                if (res.data) {
                    console.log(res.data);

                    this.setState({
                        paypal_data: res.data
                    })
                }
            }).catch((err) => {
                console.log("errrrrrr", err);
            })
        }, 500);
    }
    renderConditionalWhenReady = () => {
        const item = this.props.props.route.params.item;

        const { paypal_data } = this.state;
        if (item.initiator !== this.props.unique_id) {
            if (paypal_data !== null) {
                const { amount, seller_protection, seller_receivable_breakdown } = paypal_data.purchase_units[0].payments.captures[0];
                return (
                    <Fragment>
                        <Text style={{ fontSize: 24 }}><Text style={{ fontWeight: "bold" }}>Payer</Text> (person that is sending funds)</Text>
                        <View style={styles.hr} />
                        <Text style={styles.midSized}>Address/Country Code: {paypal_data.payer.address.country_code}</Text>
                        <View style={styles.hr} />
                        <Text style={styles.midSized}>PayPal Email: {paypal_data.payer.email_address}</Text>
                        <View style={styles.hr} />
                        <Text style={styles.midSized}>Payer Name: {`${paypal_data.payer.name.given_name} ${paypal_data.payer.name.surname}`}</Text>
                        <View style={styles.hr} />
                        <Text style={styles.midSized}>Payer ID: {paypal_data.payer.payer_id}</Text>
                        <View style={styles.hr} />
                        

                        <Text style={{ fontSize: 24 }}><Text style={{ fontWeight: "bold" }}>Payee</Text> (person that is receiving the funds)</Text>
                        <View style={styles.hr} />
                        <Text style={styles.midSized}>PayPal Email: {paypal_data.purchase_units[0].payee.email_address}</Text>
                        <View style={styles.hr} />
                        <Text style={styles.midSized}>PayPal Mechant ID: {paypal_data.purchase_units[0].payee.merchant_id}</Text>
                        <View style={styles.hr} />


                        <Text style={styles.midSizedCustom}>STATUS</Text>
                        <Text style={styles.midSized}>Status is the current condition of whether or not the originating payer has completed payment yet...</Text>
                        <Text style={styles.midSizedCustomRed}>{paypal_data.status}</Text>
                        <View style={styles.hr} />
                        <Text style={styles.midSized}>Payment Protection: {seller_protection.status}</Text>
                        <View style={styles.hr} />
                        <Text style={styles.paymentOutter}>Initiated Payment Amount: <Text style={styles.payment}>{amount.value} {amount.currency_code}</Text></Text>
                        <View style={styles.hr} />
                        <Text style={[styles.midSizedCustom, { marginTop: 10, textDecorationLine: "underline" }]}>Fee's Breakdown</Text>
                        <Text style={styles.midSized}>Gross Amount: {`${seller_receivable_breakdown.gross_amount.value} ${seller_receivable_breakdown.gross_amount.currency_code}`}</Text>
                        <Text style={[styles.midSized, { marginTop: 10 }]}>Net Amount: {`${seller_receivable_breakdown.net_amount.value} ${seller_receivable_breakdown.net_amount.currency_code}`}</Text>
                        <Text style={[styles.midSized, { marginTop: 10 }]}>PayPal Fee's: {`${seller_receivable_breakdown.paypal_fee.value} ${seller_receivable_breakdown.paypal_fee.currency_code}`}</Text>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <SkeletonPlaceholder>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                <View style={{ marginLeft: 20 }}>
                                <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                                <View
                                    style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                                />
                                </View>
                            </View>
                            <View style={{ marginTop: 30 }}/>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                <View style={{ marginLeft: 20 }}>
                                <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                                <View
                                    style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                                />
                                </View>
                            </View>
                            <View style={{ marginTop: 30 }}/>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                <View style={{ marginLeft: 20 }}>
                                <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                                <View
                                    style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                                />
                                </View>
                            </View>
                            <View style={{ marginTop: 30 }}/>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                <View style={{ marginLeft: 20 }}>
                                <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                                <View
                                    style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                                />
                                </View>
                            </View>
                            <View style={{ marginTop: 30 }}/>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                <View style={{ marginLeft: 20 }}>
                                <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                                <View
                                    style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                                />
                                </View>
                            </View>
                            <View style={{ marginTop: 30 }}/>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                                <View style={{ marginLeft: 20 }}>
                                <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                                <View
                                    style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                                />
                                </View>
                            </View>
                            <View style={{ marginTop: 30 }}/>
                        </SkeletonPlaceholder>
                    </Fragment>
                );
            }
        } 
    }
    render() {
        const item = this.props.props.route.params.item;

        const { paypal_data } = this.state;

        const vehicle = this.props.props.route.params.vehicle;

        console.log("this.Props ORDER DETAILS", this.props);
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.push("view-individual-agreement", { vehicle, item });
                        }} transparent>
                            <Image style={styles.headerIcon} source={require('../../../assets/icons/go-back.png')} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -15 }}>Order Details / Receipt</Title>
                    </Left>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
                    <View style={[styles.margin, { flexDirection: "row", marginBottom: 0 }]}>
                        <Image source={require("../../../assets/icons/paypal-colored.png")} style={[styles.paypalIcon, { marginRight: 30 }]} />
                        <Text style={[styles.orderDetailsTitle, { marginTop: 25 }]}>Order Details</Text>
                        
                    </View>
                    <View style={{ margin: 20 }}>
                        <View style={styles.hr} />
                        {this.renderConditionalWhenReady()}
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("state", state);
    if (Object.keys(state.auth.authenticated).length > 0) {
        return {
            paypal_access_token: state.auth.authenticated.paypal_authorization.access_token
        }
    } else {
        return {
            paypal_access_token: null
        }
    }
}
export default connect(mapStateToProps, { })(OrderDetailsPaypalPaymentHelper);