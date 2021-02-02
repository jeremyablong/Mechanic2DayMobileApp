import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle, Content, Card, CardItem, Thumbnail, ListItem, List } from 'native-base';
import styles from './styles.js';
import axios from 'axios';
import { Config } from "react-native-config";
import { connect } from "react-redux";
import Dialog from "react-native-dialog";
import _ from "lodash";


class ManageListingsRoadsideAssistanceHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        listings: [],
        completeListings: [],
        user: null
    }
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/listings/roadside/assistance`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Located user and displaying listings!") {
                console.log(res.data);

                const { listings } = res.data;

                for (let index = 0; index < listings.length; index++) {
                    const listing = listings[index];
                    
                    if (listing.page === "COMPLETE") {
                        this.setState({
                            completeListings: [...this.state.completeListings, listing]
                        })
                    } else {
                        this.setState({
                            listings: [...this.state.listings, listing]
                        })
                    }
                }
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })

        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {

                const { user } = res.data;

                this.setState({
                    user
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateRoute = (listing) => {
        console.log("calculateRoute clicked.", listing);

        switch (listing.page) {
            case 2:
                this.props.props.navigation.push("roadside-assistance-create-credentials", { listing });
                break;
            case 3:
                this.props.props.navigation.push("roadside-assistance-insurance-details", { listing });
                break;
            case 4:
                this.props.props.navigation.push("roadside-assistance-general-data", { listing });
                break;
            case 5:
                this.props.props.navigation.push("roadside-assistance-pricing", { listing });
                break;
            case 6:
                this.props.props.navigation.push("roadside-assistance-vehicle-information-tow", { listing });
                break;
            default:
                break;
        }
    }
    render() {
        const { listings, completeListings, user } = this.state;

        console.log("this.state manage.main.js", this.state);
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.push("advertise-roadside-assistance-main");
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Manage</Title>
                        <Subtitle>Manage Listings & More!</Subtitle>
                    </Body>
                    <Right>
                        <Button button={true} onPress={() => {
                            if (_.has(user, "completed_stripe_onboarding") && user.completed_stripe_onboarding === true) {
                                this.props.props.navigation.navigate("advertise-create-address-preview");
                            } else {
                                this.setState({
                                    showDialog: true
                                })
                            }
                        }} transparent>
                            <Image source={require("../../../assets/icons/plus.png")} style={styles.headerIcon} />
                        </Button>
                    </Right>
                </Header>
                <View>
                    <Dialog.Container visible={this.state.showDialog}>
                    <Dialog.Title>You MUST verify/validate your account before proceeding as payments are involved in later steps.</Dialog.Title>
                    <Dialog.Description>
                        Would you like to stay on this page or redirect to the verification section?
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showDialog: false
                        })
                    }} label="STAY" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            showDialog: false
                        }, () => {
                            this.props.props.navigation.push("verify-validate-account-stripe");
                        })
                    }} label="REDIRECT" />
                    </Dialog.Container>
                </View>
                <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 125 }}>
                    <Content style={{ padding: 20 }}>
                    <Text style={styles.title}>Continue where you left off (<Text style={styles.em}>UNLISTED</Text> listings)</Text>
                    {typeof listings !== 'undefined' && listings.length > 0 ? listings.map((listing, index) => {
                        console.log("listing", listing);
                        if (listing.page === 2) {
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.calculateRoute(listing);
                                }}>
                                    <Card style={styles.customCard}>
                                        <CardItem>
                                        <Left>
                                            <Thumbnail source={{ uri: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg" }} />
                                            <Body>
                                            <Text>Unknown Co. Name</Text>
                                            <Text note>{listing.date}</Text>
                                            </Body>
                                        </Left>
                                        </CardItem>
                                        <CardItem>
                                        <Body>
                                            <Image source={{uri: listing.company_image }} style={{height: 250, width: "100%", flex: 1}}/>
                                            <Text style={{ marginTop: 20 }}>
                                                {listing.location.address.freeformAddress}
                                            </Text>
                                        </Body>
                                        </CardItem>
                                        
                                    </Card>
                                </TouchableOpacity>
                            );
                        } else if (listing.page === 3) {
                            console.log("listing page 3", listing);
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.calculateRoute(listing);
                                }}>
                                    <Card style={styles.customCard}>
                                        <CardItem>
                                        <Left>
                                            <Thumbnail source={{ uri: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg" }} />
                                            <Body>
                                            <Text>Unknown Co. Name</Text>
                                            <Text note>{listing.date}</Text>
                                            </Body>
                                        </Left>
                                        </CardItem>
                                        <CardItem>
                                        <Body>
                                            <Image source={{uri: listing.company_image }} style={{height: 250, width: "100%", flex: 1}}/>
                                            <View style={{ marginTop: 20 }}>
                                                <Text style={styles.heavyHeader}>Driver Count - {listing.drivers.length.toString()}</Text>
                                                <Text style={styles.heavyHeader}>Location</Text>
                                                <Text style={{ marginTop: 8 }}>
                                                    {listing.location.address.freeformAddress}
                                                </Text>
                                            </View>
                                        </Body>
                                        </CardItem>
                                        
                                    </Card>
                                </TouchableOpacity>
                            );
                        } else if (listing.page === 4) {
                            console.log("listing page 4", listing);
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.calculateRoute(listing);
                                }}>
                                    <Card style={styles.customCard}>
                                        <CardItem>
                                        <Left>
                                            <Thumbnail source={{ uri: listing.company_image }} />
                                            <Body>
                                            <Text>Unknown Co. Name</Text>
                                            <Text note>{listing.date}</Text>
                                            </Body>
                                        </Left>
                                        </CardItem>
                                        <CardItem>
                                        <Body>
                                            <Image source={{uri: listing.insurance_info.insurance_proof_images[0] }} style={{height: 250, width: "100%", minWidth: 200, flex: 1}}/>
                                            <View style={{ marginTop: 20 }}>
                                                <Text style={styles.heavyHeader}>Driver Count - {listing.drivers.length.toString()}</Text>
                                                <Text style={styles.heavyHeader}>Location</Text>
                                                <Text style={{ marginTop: 8 }}>
                                                    {listing.location.address.freeformAddress}
                                                </Text>
                                                <Text style={styles.heavyHeader}>Insurance Info</Text>
                                                <Text style={styles.font15}>Policy #: {listing.insurance_info.policy_number}</Text>
                                            </View>
                                        </Body>
                                        </CardItem>
                                        
                                    </Card>
                                </TouchableOpacity>
                            );
                        } else if (listing.page === 5) {
                            console.log("listing page 5", listing);
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.calculateRoute(listing);
                                }}>
                                    <Card style={styles.customCard}>
                                        <CardItem>
                                        <Left>
                                            <Thumbnail source={{ uri: listing.company_image }} />
                                            <Body>
                                            <Text>{listing.company_name}</Text>
                                            <Text note>{listing.date}</Text>
                                            </Body>
                                        </Left>
                                        </CardItem>
                                        <CardItem>
                                        <Body>
                                            <Image source={{uri: listing.insurance_info.insurance_proof_images[0] }} style={{height: 250, width: "100%", flex: 1}}/>
                                            <View style={{ marginTop: 20 }}>
                                                <Text style={styles.heavyHeader}>Driver Count - {listing.drivers.length.toString()}</Text>
                                                <Text style={styles.heavyHeader}>Location</Text>
                                                <Text style={{ marginTop: 8 }}>
                                                    {listing.location.address.freeformAddress}
                                                </Text>
                                                <Text style={styles.heavyHeader}>Insurance Info</Text>
                                                <Text style={styles.font15}>Policy #: {listing.insurance_info.policy_number}</Text>
                                            </View>
                                        </Body>
                                        </CardItem>
                                        
                                    </Card>
                                </TouchableOpacity>
                            );
                        } else if (listing.page === 6) {
                            console.log("listing page 6", listing);
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.calculateRoute(listing);
                                }}>
                                    <Card style={styles.customCard}>
                                        <CardItem>
                                        <Left>
                                            <Thumbnail source={{ uri: listing.company_image }} />
                                            <Body>
                                            <Text>{listing.company_name}</Text>
                                            <Text note>{listing.date}</Text>
                                            </Body>
                                        </Left>
                                        </CardItem>
                                        <CardItem>
                                        <Body>
                                            <Image source={{uri: listing.insurance_info.insurance_proof_images[0] }} style={{height: 250, width: "100%", flex: 1}}/>
                                            <View style={{ marginTop: 20 }}>
                                                <Text style={styles.heavyHeader}>Driver Count - {listing.drivers.length.toString()}</Text>
                                                <Text style={styles.heavyHeader}>Location</Text>
                                                <Text style={{ marginTop: 8 }}>
                                                    {listing.location.address.freeformAddress}
                                                </Text>
                                                <Text style={styles.heavyHeader}>Insurance Info</Text>
                                                <Text style={styles.font15}>Policy #: {listing.insurance_info.policy_number}</Text>
                                            </View>
                                        </Body>
                                        </CardItem>
                                        
                                    </Card>
                                </TouchableOpacity>
                            );
                        }
                    }) : <View>
                        <List>
                            <ListItem style={{ marginTop: 15, marginBottom: 15 }}>
                                <NativeText>There are currently no listings in this category.</NativeText>
                            </ListItem>
                        </List>
                    </View>}
                    <Text style={[styles.title, { marginTop: 20 }]}>Manage your <Text style={styles.em}>active</Text> roadside assistance listings</Text>
                    {typeof completeListings !== 'undefined' && completeListings.length > 0 ? completeListings.map((listing, index) => {
                        if (listing.page === "COMPLETE") {
                            return (
                                <TouchableOpacity onPress={() => {
                                        
                                    }}>
                                        <Card style={styles.customCard}>
                                            <CardItem>
                                            <Left>
                                                <Thumbnail source={{ uri: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg" }} />
                                                <Body>
                                                <Text>{listing.company_name}</Text>
                                                <Text note>{listing.date}</Text>
                                                </Body>
                                            </Left>
                                            </CardItem>
                                            <CardItem>
                                            <Body>
                                                <Image source={{uri: listing.company_image }} style={{height: 250, width: "100%", flex: 1}}/>
                                                <View style={{ marginTop: 20 }}>
                                                    <Text style={styles.heavyHeader}>Driver Count - {listing.drivers.length.toString()}</Text>
                                                    <Text style={styles.heavyHeader}>Location</Text>
                                                    <Text style={{ marginTop: 8 }}>
                                                        {listing.location.address.freeformAddress}
                                                    </Text>
                                                    <Text style={styles.heavyHeader}>Insurance Info</Text>
                                                    <Text style={styles.font15}>Policy #: {listing.insurance_info.policy_number}</Text>
                                                </View>
                                            </Body>
                                            </CardItem>
                                            
                                        </Card>
                                    </TouchableOpacity>
                            );
                        }
                    }) : <View>
                        <List>
                            <ListItem style={{ marginTop: 15, marginBottom: 15 }}>
                                <NativeText>There are currently no listings in this category.</NativeText>
                            </ListItem>
                        </List>
                    </View>}
                    </Content>
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
export default connect(mapStateToProps, { })(ManageListingsRoadsideAssistanceHelper);