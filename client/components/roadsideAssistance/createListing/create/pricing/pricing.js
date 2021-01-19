import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Button, Right, Title, Subtitle, ListItem, List, Text as NativeText, Picker } from 'native-base';
import styles from './styles.js';
import { connect } from "react-redux";
import { Config } from "react-native-config";
import axios from "axios";

const prices = ["Not Applicable - N/A", 9.99, 14.99, 19.99, 24.99, 29.99, 39.99, 49.99, 59.99, 69.99, 79.99, 89.99, 99.99];
const prices_jump_start = ["Not Applicable - N/A", 9.99, 14.99, 19.99, 24.99, 29.99, 39.99, 49.99, 59.99, 69.99, 79.99, 89.99, 99.99, 124.99, 144.99, 159.99];

class PricingRoadsideAssistanceListingHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        choices: [{
            towPrice: 49.99,
            tier: "Tier 1",
            perMileFee: 0.49,
            index: 0
        }, {
            towPrice: 74.99,
            perMileFee: 1.49,
            tier: "Tier 2",
            index: 1
        }, {
            towPrice: 99.99,
            tier: "Tier 3",
            perMileFee: 2.49,
            index: 2
        }, {
            towPrice: 124.99,
            tier: "Tier 4",
            perMileFee: 3.49,
            index: 3
        }, {
            towPrice: 149.99,
            tier: "Tier 5",
            perMileFee: 4.49,
            index: 4
        }, {
            towPrice: 174.99,
            tier: "Tier 6",
            perMileFee: 5.49,
            index: 5
        }, {
            towPrice: 199.99,
            tier: "Tier 7",
            perMileFee: 6.49,
            index: 6
        }],
        selected: null,
        gasDeliveryCost: null,
        jumpStartCost: null,
        unlockDoorCost: null,
        stuckCarRemovalCost: null,
        changeTireCost: null
    }
}
    calculateReadiness = () => {
        const { gasDeliveryCost, jumpStartCost, unlockDoorCost, changeTireCost, stuckCarRemovalCost, selected } = this.state;


        if (gasDeliveryCost !== null && jumpStartCost !== null && unlockDoorCost !== null && changeTireCost !== null && stuckCarRemovalCost !== null && selected !== null) {
            return false;
        } else {
            return true;
        }
    }
    handleFinalSubmission = () => {
        const { gasDeliveryCost, jumpStartCost, unlockDoorCost, changeTireCost, stuckCarRemovalCost, selected } = this.state;

        console.log("handleFinalSubmission clicked.");

        const passed_data = this.props.props.route.params.listing;

        axios.post(`${Config.ngrok_url}/update/pricing/services/roadside/assistance`, {
            id: this.props.unique_id,
            gas_delivery_cost: gasDeliveryCost, 
            jumpstart_cost: jumpStartCost, 
            unlock_locked_door_cost: unlockDoorCost, 
            change_tire_cost: changeTireCost, 
            remove_stuck_vehicle: stuckCarRemovalCost, 
            price_tier: selected,
            passed_listing_id: passed_data.id
        }).then((res) => {
            if (res.data.message === "Successfully updated listing pricing information!") {
                console.log(res.data);

                const { listing } = res.data;

                this.props.props.navigation.replace("roadside-assistance-vehicle-information-tow", { listing });
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { choices, selected } = this.state;
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.push("roadside-assistance-display-listings");
                        }}>
                            <Image source={require("../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body style={{ left: -80 }}>
                        <Title>Pricing</Title>
                        <Subtitle>Set your pricing & rates...</Subtitle>
                    </Body>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    
                    <View style={styles.margin}>
                        <Text style={styles.textMain}>Tow prices & roadside services</Text>
                        <Text style={styles.midSizeText}>Select the price you charge for an *average* tow as well as different roadside services</Text>
                    </View>
                    <Text style={{ marginLeft: 20, fontSize: 16 }}>*Tap a price/box to select*</Text>
                    <ScrollView style={styles.horizontalScroll} horizontal={true}>
                        
                        {choices.map((choice, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => {
                                    this.setState({
                                        selected: choice
                                    })
                                }}>
                                    <View style={selected === choice ? styles.customViewSelected : styles.customView}>
                                        <Image source={require("../../../../../assets/icons/cash.png")} style={styles.boxIcon} />
                                        <Text style={styles.price}>${choice.towPrice.toString()}</Text>
                                        <Text style={{ fontSize: 18, color: "blue", fontWeight: "bold" }}>{choice.tier}</Text>
                                        <Text style={styles.helperText}>Plus ${choice.perMileFee.toString()} Per Mile</Text>
                                        <Text>Plus $20 storage fee per day</Text>
                                        <Text style={{ textDecorationLine: "underline" }}>More fees may be applicable</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                    <View style={styles.threeSideMargin}>
                        <Text style={styles.textMain}>Select your roadside assistance prices</Text>
                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.pickerHeader}>Service fee for gas delivery</Text>
                            <Picker 
                                placeholderTextColor={"grey"}
                                placeholder={"Service fee for 'gas delivery'"}
                                note
                                mode="dropdown"
                                style={styles.picker}
                                selectedValue={this.state.gasDeliveryCost}
                                onValueChange={(value) => {
                                    this.setState({
                                        gasDeliveryCost: value
                                    })
                                }}
                            >
                                {prices.map((price, index) => {
                                    return <Picker.Item label={price !== "Not Applicable - N/A" ? `$${price.toString()}` : price.toString()} value={price} />;
                                })}
                            </Picker>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.pickerHeader}>Service fee for jump start services</Text>
                            <Picker 
                                placeholderTextColor={"grey"}
                                placeholder={"Service fee for a 'jump start'"}
                                note
                                mode="dropdown"
                                style={styles.picker}
                                selectedValue={this.state.jumpStartCost}
                                onValueChange={(value) => {
                                    this.setState({
                                        jumpStartCost: value
                                    })
                                }}
                            >
                                {prices_jump_start.map((price, index) => {
                                    return <Picker.Item label={price !== "Not Applicable - N/A" ? `$${price.toString()}` : price.toString()} value={price} />;
                                })}
                            </Picker>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.pickerHeader}>Service fee for 'unlocking' services</Text>
                            <Picker 
                                placeholderTextColor={"grey"}
                                placeholder={"Service fee to 'unlock' a door(s)"}
                                note
                                mode="dropdown"
                                style={styles.picker}
                                selectedValue={this.state.unlockDoorCost}
                                onValueChange={(value) => {
                                    this.setState({
                                        unlockDoorCost: value
                                    })
                                }}
                            >
                                {prices.map((price, index) => {
                                    return <Picker.Item label={price !== "Not Applicable - N/A" ? `$${price.toString()}` : price.toString()} value={price} />;
                                })}
                            </Picker>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.pickerHeader}>Service fee for 'tire change(s)' service</Text>
                            <Picker 
                                placeholderTextColor={"grey"}
                                placeholder={"Service fee to change a tire(s)"}
                                note
                                mode="dropdown"
                                style={styles.picker}
                                selectedValue={this.state.changeTireCost}
                                onValueChange={(value) => {
                                    this.setState({
                                        changeTireCost: value
                                    })
                                }}
                            >
                                {prices.map((price, index) => {
                                    return <Picker.Item label={price !== "Not Applicable - N/A" ? `$${price.toString()}` : price.toString()} value={price} />;
                                })}
                            </Picker>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.pickerHeader}>Service fee for 'stuck car removal' service</Text>
                            <Picker 
                                placeholderTextColor={"grey"}
                                placeholder={"Select fee to remove a stuck vehicle"}
                                note
                                mode="dropdown"
                                style={styles.picker}
                                selectedValue={this.state.stuckCarRemovalCost}
                                onValueChange={(value) => {
                                    this.setState({
                                        stuckCarRemovalCost: value
                                    })
                                }}
                            >
                                {prices_jump_start.map((price, index) => {
                                    return <Picker.Item label={price !== "Not Applicable - N/A" ? `$${price.toString()}` : price.toString()} value={price} />;
                                })}
                            </Picker>
                        </View>
                        <View style={styles.centered}>
                            <View style={styles.centered}>
                                {this.calculateReadiness() ? <Button light style={styles.customEndButton} onPress={() => {}}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Submit & Continue</NativeText>
                                </Button> : <Button success style={styles.customEndButton} onPress={this.handleFinalSubmission}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Submit & Continue</NativeText>
                                </Button>}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(PricingRoadsideAssistanceListingHelper);