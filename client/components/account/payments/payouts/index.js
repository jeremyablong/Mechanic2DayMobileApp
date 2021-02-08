import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Header, Left, Body, Right, Title, Subtitle, Button, Form, Item, Input, Label, Text as NativeText } from 'native-base';
import styles from './styles.js';
import axios from "axios";
import { Config } from "react-native-config";
import { connect } from "react-redux";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import RBSheet from "react-native-raw-bottom-sheet";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../../toastConfig.js";
import Autocomplete from "react-native-autocomplete-input";


const { height, width } = Dimensions.get("window");

class PayoutsHomepageHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        cards: [],
        banks: [],
        query: "",
        ready: false,
        hideResults: true,
        selected: null
    }
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/list/all/payouts`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Successfully gathered cards!") {
                console.log(res.data);

                const { cards, banks } = res.data;

                this.setState({
                    cards,
                    banks: banks.data,
                    ready: true
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateType = (type) => {
        switch (type) {
            case "bank_account": 
                return " Bank Account";
            break;
            default: 
                return "Unknown";
        }
    }
    cashoutAmount = () => {
        console.log("cashoutAmount clicked");

        const { cashout, selected } = this.state;

        axios.post(`${Config.ngrok_url}/cashout/payout/instant`, {
            id: this.props.unique_id,
            cashout,
            selected
        }).then((res) => {
            if (res.data.message === "Successfully created payout!") {
                console.log(res.data);

                this.RBSheet.close();

                setTimeout(() => {
                    Toast.show({
                        text1: "Successfully cashed out and payment is on the way!",
                        text2: "Payout/payment is on the way! Check your account in a few minutes for your funds.",
                        type: "success",
                        visibilityTime: 4500,
                        position: "top",
                    })
                }, 1500);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateReadiness = () => {
        console.log("calculateReadiness");

        const { selected, cashout } = this.state;

        if (selected !== null && typeof cashout !== "undefined" && cashout.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const { cards, banks, query, ready, hideResults } = this.state;

        console.log("payouts.index.js", this.state);
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.goBack();
                        }}>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Payout Homepage</Title>
                        <Subtitle>Manage payouts, payments & more...</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.mainHeaderText}>Edit your payout methods</Text>
                        <View style={{ marginTop: 15 }}>
                            {typeof banks !== 'undefined' && banks.length > 0 ? banks.map((bank, index) => {
                                console.log("bank", bank);
                                    return (
                                        <Fragment>
                                            <TouchableOpacity onPress={() => {}} style={styles.listitem}>
                                                <NativeText numberOfLines={5}><NativeText style={{ fontWeight: "bold" }}>Type:</NativeText>{this.calculateType(bank.object)} {"\n"}<NativeText style={{ fontWeight: "bold" }}>Bank Name:</NativeText> {bank.bank_name} {"\n"}<NativeText style={{ fontWeight: "bold" }}>Routing:</NativeText> {bank.routing_number}{"\n"}<NativeText style={{ fontWeight: "bold" }}>Account Last 4:</NativeText> {bank.last4}</NativeText>
                                                {bank.default_for_currency === true ? <View style={styles.default}>
                                                    <Text style={styles.defaultText}>Default</Text>
                                                </View> : null}
                                            </TouchableOpacity>
                                            <View style={styles.hr} />
                                        </Fragment>
                                    ); 
                            }) : null}
                        </View>
                        <TouchableOpacity style={{ marginTop: 35 }} onPress={() => {
                            this.props.props.navigation.push("add-payout-method-new");
                        }}>
                            <Text style={styles.headerText}>Add a payout method</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 35 }} onPress={() => {
                            this.props.props.navigation.push("manage-payout-options-menu-main");
                        }}>
                            <Text style={styles.headerText}>Manage payout schedule & more</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {ready === true ? <View style={styles.bottomContainer}>
                    <View style={styles.hr} />
                    <AwesomeButtonBlue type={"secondary"} onPress={() => {
                        this.RBSheet.open();
                    }} stretch={true}>Cash-Out - Standard Hold Time</AwesomeButtonBlue>
                </View> : null}
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={height}
                    openDuration={250}
                    customStyles={{
                        container: {
                            
                        }
                    }}
                    >
                    <ScrollView style={{ margin: 20 }}>
                        <Text style={styles.topText}>You <Text style={{ color: "blue", fontStyle: "italic" }}>MUST</Text> wait 7 days on your <Text style={{ color: "blue", fontStyle: "italic" }}>FIRST</Text> payout for your funds to be credited to your preferred payout method. All "cash-outs" after the first initial payout are immediate and will be avaliable within minutes <Text style={{ color: "blue", fontStyle: "italic" }}>IF</Text> transfering to a card while <Text style={{ color: "blue", fontStyle: "italic" }}>STANDARD</Text> time rates apply to <Text style={{ color: "blue", fontStyle: "italic" }}>BANK</Text> transfers.</Text>
                        <View style={styles.hr} />
                        <KeyboardAwareScrollView>
                        <View style={{ marginTop: 25, backgroundColor: "white", zIndex: 9999 }}>
                            <Autocomplete
                                data={banks}
                                containerStyle={styles.inputContainer} 
                                listStyle={styles.listStyle}
                                hideResults={hideResults}
                                listContainerStyle={styles.listContainer}
                                defaultValue={query}
                                placeholderTextColor={"grey"}
                                placeholder={"Search for your bank name..."}
                                onChangeText={text => {
                                    this.setState({ 
                                        query: text,
                                        hideResults: false
                                    })
                                }}
                                renderItem={({ item, i }) => {
                                    if (item.bank_name.toLowerCase().includes(this.state.query.toLowerCase())) {
                                        return (
                                            <TouchableOpacity style={{ padding: 8 }} onPress={() => {
                                                this.setState({ 
                                                    selected: item,
                                                    hideResults: true
                                                })
                                            }}>
                                                <Text numberOfLines={3}><Text style={{ color: "blue" }}>{item.bank_name}</Text>{"\n"}Last 4: {item.last4} {"\n"}Routing Number: {item.routing_number}</Text>
                                            </TouchableOpacity>
                                        );
                                    }
                                }}
                            />
                        </View>
                        <Form>
                            <Text style={styles.label}>How much money would you like to withdrawl?</Text>
                            <Item style={{ maxWidth: width * 0.80 }} floatingLabel>
                                <Label>Withdrawl Amount (USD)</Label>
                                <Input keyboardType={"number-pad"} onChangeText={(value) => {
                                    this.setState({
                                        cashout: value
                                    })
                                }} value={this.state.cashout} />
                            </Item>
                        </Form>
                        </KeyboardAwareScrollView>
                        <View style={styles.hr} />
                        {this.calculateReadiness() ? <AwesomeButtonBlue type={"secondary"} backgroundShadow={"black"} onPress={this.cashoutAmount} stretch={true}>Submit Cashout</AwesomeButtonBlue> : <AwesomeButtonBlue type={"disabled"} backgroundShadow={"black"} stretch={true}>Submit Cashout</AwesomeButtonBlue>}
                    </ScrollView>
                    <View style={styles.bottomContainer}>
                        <View style={styles.hr} />
                        <AwesomeButtonCartman backgroundDarker={"black"} borderColor={"black"} textColor={"white"} type={"secondary"} onPress={() => {
                            this.RBSheet.close();
                        }} stretch={true}>Close/Exit</AwesomeButtonCartman>
                    </View>
                </RBSheet>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(PayoutsHomepageHelper);