import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle, Content, Card, CardItem, Thumbnail } from 'native-base';
import styles from './styles.js';
import axios from 'axios';
import { Config } from "react-native-config";
import { connect } from "react-redux";

class ManageListingsRoadsideAssistanceHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        listings: []
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

                const { listings } = res.data

                this.setState({
                    listings
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
            default:
                break;
        }
    }
    render() {
        const { listings } = this.state;
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
                            this.props.props.navigation.navigate("advertise-create-address-preview");
                        }} transparent>
                            <Image source={require("../../../assets/icons/plus.png")} style={styles.headerIcon} />
                        </Button>
                    </Right>
                </Header>
                <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 125 }}>
                    <Content style={{ padding: 20 }}>
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
                                            <Text>Unknown Title</Text>
                                            <Text note>{listing.date}</Text>
                                            </Body>
                                        </Left>
                                        </CardItem>
                                        <CardItem>
                                        <Body>
                                            <Image source={{uri: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg" }} style={{height: 250, width: "100%", flex: 1}}/>
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
                                            <Text>Unknown Title</Text>
                                            <Text note>{listing.date}</Text>
                                            </Body>
                                        </Left>
                                        </CardItem>
                                        <CardItem>
                                        <Body>
                                            <Image source={{uri: "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg" }} style={{height: 250, width: "100%", flex: 1}}/>
                                            <View style={{ marginTop: 20 }}>
                                                <Text style={styles.heavyHeader}>Location</Text>
                                                <Text style={styles.font15}>{listing.location.address.freeformAddress}</Text>
                                                <Text style={styles.heavyHeader}>DL Info (Drivers License)</Text>
                                                <Text style={styles.font15}>DL Full Name: {`${listing.dl_info.dl_first_name} ${listing.dl_info.dl_middle_name} ${listing.dl_info.dl_last_name}`}</Text>
                                                <Text style={styles.font15}>DL #: {listing.dl_info.dl_number}</Text>
                                                <Text style={styles.font15}>Issue Date: {listing.dl_info.issue_date}</Text>
                                            </View>
                                        </Body>
                                        </CardItem>
                                        
                                    </Card>
                                </TouchableOpacity>
                            );
                        }
                    }) : null}
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