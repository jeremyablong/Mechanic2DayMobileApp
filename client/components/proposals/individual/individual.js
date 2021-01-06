import React, { Component, Fragment } from 'react';
import styles from './styles.js';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Left, Header, Title, Text as NativeText, ListItem, Icon, Body, Right } from "native-base";
import axios from "axios";
import { Config } from "react-native-config";
import ReadMore from 'react-native-read-more-text';
import Dialog from "react-native-dialog";
import { connect } from "react-redux";

class IndividualProposalViewHelper extends Component {
constructor(props) {
    super(props);

    this.state = { 
        listing: null,
        declineTerms: false,
        acceptTermsModal: false
    }
}

    componentDidMount() {
        const passedData = this.props.props.route.params.proposal;

        console.log("mounted", passedData);

        axios.post(`${Config.ngrok_url}/find/related/post/by/id`, {
            id: passedData.related
        }).then((res) => {
            if (res.data.message === "Successfully gathered post!") {
                console.log(res.data);

                const { listing } = res.data;

                this.setState({
                    listing
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    acceptTermsAndProceed = () => {
        console.log("acceptTermsAndProceed clicked");

        const passedData = this.props.props.route.params.proposal;

        const { listing } = this.state;

        axios.post(`${Config.ngrok_url}/accept/proposal/vehicle/listing`, {
            passedData,
            listing,
            id: this.props.unique_id,
            fullName: this.props.fullName
        }).then((res) => {
            if (res.data.message === "Succesfully notfied other un-selected users and notified selected user!") {
                console.log(res.data);

                this.props.props.navigation.push("proposals");
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })

        this.setState({
            acceptTermsModal: false
        })
    }
    declineConditionsAndReject = () => {
        console.log("declineConditionsAndReject clicked");

        const passedData = this.props.props.route.params.proposal;

        const { listing } = this.state;

        axios.post(`${Config.ngrok_url}/reject/proposal/vehicle/listing`, {
            passedData,
            listing,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Successfully deleted proposal!") {
                console.log(res.data);

                this.props.props.navigation.push("proposals");
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })

        this.setState({
            declineTerms: false
        })
    }
    renderConditional = () => {
        const { listing } = this.state;

        const passedData = this.props.props.route.params.proposal;
        
        let initial = passedData.amount;
        const total = initial + (initial * 0.20) + (initial * 0.03);

        if (listing !== null) {
            return (
                <Fragment>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} style={{ margin: 20 }}>
                        <Text style={styles.header}>Job Details</Text>
                        <View style={styles.hr} />
                        <Text style={[styles.smallerHeader, { marginTop: 15, marginBottom: 15 }]}>{listing.title}</Text>
                        <ReadMore
                            numberOfLines={3}
                            renderTruncatedFooter={this._renderTruncatedFooter}
                            renderRevealedFooter={this._renderRevealedFooter}
                            onReady={this._handleTextReady}>
                            <Text style={styles.cardText}>
                                {listing.description}
                            </Text>
                        </ReadMore>
                        <TouchableOpacity onPress={() => {
                            this.props.props.navigation.navigate("individual-broken-listing", { listing })
                        }}>
                            <Text style={styles.link}>View Vehicle Listing</Text>
                        </TouchableOpacity>
                        <View style={styles.hr} />
                        <Text style={[styles.smallestHeader, { marginTop: 15, marginBottom: 15 }]}>Applicant Details</Text>
                        <View style={{ flexDirection: "row", marginBottom: 15 }}>
                            <Image source={{ uri: passedData.profilePic }} style={styles.minSize} />
                            <Text style={{ marginLeft: 15, marginTop: 10 }}>{passedData.fullName} {"\n"}{passedData.date}</Text>
                        </View>
                        <Text style={styles.marginTopBottom}><Text style={{ fontWeight: "bold" }}>Proposal Text:</Text> {"\n"}{passedData.description}</Text>
                        <View style={styles.hr} />
                        <Text style={[styles.smallestHeader, { marginBottom: 15}]}>The applicants proposed terms</Text>
                        <View style={styles.hr} />
                        <Text style={styles.marginTopMid}>Total amount the mechanic is willing to do the job for</Text>
                        <Text style={[styles.header, { marginTop: 10, color: "#8884FF", marginBottom: 15 }]}>${passedData.amount.toFixed(2)}</Text>
                        <View style={styles.hr} />
                        <Text style={styles.marginTopMid}>You'll need to pay the below total which includes service fee's, taxes and warrenty guarentees</Text>
                        <Text style={[styles.header, { marginTop: 10, color: "#8884FF", marginBottom: 15, textDecorationLine: "underline" }]}>${total.toFixed(2)}</Text>
                        <ListItem icon>
                            <Left>
                            <Button transparent>
                                <Image source={require("../../../assets/icons/cash.png")} style={{ maxWidth: 25, maxHeight: 25 }} />
                            </Button>
                            </Left>
                            <Body>
                            <Text>Base repair price</Text>
                            </Body>
                            <Right>
                            <Text>${initial.toFixed(2)}</Text>
                            <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                            <Button transparent>
                                <Image source={require("../../../assets/icons/fee.png")} style={{ maxWidth: 25, maxHeight: 25 }} />
                            </Button>
                            </Left>
                            <Body>
                            <Text>Service fee's</Text>
                            </Body>
                            <Right>
                            <Text>${Math.floor(initial * 0.20).toFixed(2)}</Text>
                            <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                            <Button transparent>
                                <Image source={require("../../../assets/icons/taxes.png")} style={{ maxWidth: 25, maxHeight: 25 }} />
                            </Button>
                            </Left>
                            <Body>
                            <Text>Taxes & associated fee's</Text>
                            </Body>
                            <Right>
                            <Text>${(initial * 0.03).toFixed(2)}</Text>
                            <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <View style={styles.hr} />
                        <Text style={styles.marginTopMid}>We do not allow taking payments outside of our platform. Taking payments outside of the MechanicToday platform will result in both parties being permanatly terminated and REVOCATION of any funds in both parties accounts. We also hold the right to pursue legal action contingent upon the price of the repair.</Text>
                        <Text></Text>
                        <View style={styles.marginTopMid}>
                            <View style={styles.centered}>
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.setState({
                                            acceptTermsModal: true
                                        })
                                    }} style={styles.specialButton}>
                                        <NativeText style={styles.boldWhite}>Accept Terms & Start Contract</NativeText>
                                    </Button>
                                </View>
                            </View>
                            <View style={[styles.centered, { marginTop: 20 }]}>
                                <View style={styles.centered}>
                                    <Button onPress={() => {
                                        this.setState({
                                            declineTerms: true
                                        })
                                    }} danger style={styles.specialButton}>
                                        <NativeText style={styles.boldWhite}>Decline Terms & Conditions</NativeText>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    
                </Fragment>
            );
        }
    }
    render() {
        const passedData = this.props.props.route.params.proposal;

        console.log("passedData", passedData);
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.navigate("proposals");
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                  
                        </Button>
                        <Title style={{ marginTop: 10 }}>Proposal Details</Title>
                    </Left>
                   
                </Header>
                <View style={styles.container}>
                    {this.renderConditional()}
                </View>
                <View>
                    <Dialog.Container visible={this.state.acceptTermsModal}>
                    <Dialog.Title>Accept Proposal</Dialog.Title>
                    <Dialog.Description>
                        Do you want accept this proposal? You will be locked in with this mechanic after accepting the terms.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            acceptTermsModal: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={this.acceptTermsAndProceed}  label="Accept" />
                    </Dialog.Container>
                </View>
                <View>
                    <Dialog.Container visible={this.state.declineTerms}>
                    <Dialog.Title>Decline Proposal</Dialog.Title>
                    <Dialog.Description>
                        Are you sure you'd like to DECLINE this proposal? This is permanant and you cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            declineTerms: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={this.declineConditionsAndReject}  label="Decline" />
                    </Dialog.Container>
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id,
        fullName: state.auth.authenticated.fullName
    }
}
export default connect(mapStateToProps, { })(IndividualProposalViewHelper);