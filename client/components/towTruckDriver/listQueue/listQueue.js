import React, { Component, Fragment } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
import styles from "./styles.js";
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, List, ListItem, Thumbnail } from 'native-base';
import axios from "axios";
import { Config } from "react-native-config";
import RBSheet from "react-native-raw-bottom-sheet";
import { connect } from "react-redux";
import {
    BarIndicator
} from 'react-native-indicators';
import _ from "lodash";

class ListQueueHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        results: [],
        ready: false,
        selected: null
    }
}
    componentDidMount() {

        axios.get(`${Config.ngrok_url}/gather/queued/jobs`).then((res) => {
            console.log(res.data);

            const { results } = res.data;

            for (let index = 0; index < results.length; index++) {
                const result = results[index];
                
                axios.post(`${Config.ngrok_url}/gather/breif/data/two`, {
                    id: result.requested_by
                }).then((response) => {
                    if (response.data.message === "Gathered user's data!") {
                        console.log("USER", response.data);

                        const { user } = response.data;

                        result.profile_picture = user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].full_url : "https://s3.us-west-1.wasabisys.com/mechanic-mobile-app/not-availiable.jpg";

                        result.fullName = user.fullName;


                        if (_.has(result.initial_location, "position")) {

                            result.pickup_location = result.initial_location.address.freeformAddress;

                            this.setState({
                                results: [...this.state.results, result]
                            }, () => {
                                if ((results.length - 1) === index) {
                                    this.setState({
                                        ready: true
                                    })
                                }
                            })
                        } else {
                            axios.get(`https://api.tomtom.com/search/2/reverseGeocode/${result.initial_location.latitude},${result.initial_location.longitude}.json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV`).then((resp) => {
                                console.log("resp.data", resp.data);

                                const { addresses } = resp.data;


                                result.pickup_location = addresses[0].address.freeformAddress;
                                
                                this.setState({
                                    results: [...this.state.results, result]
                                }, () => {
                                    if ((results.length - 1) === index) {
                                        this.setState({
                                            ready: true
                                        })
                                    }
                                })
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                    } else {
                        console.log("Err", res.data);

                        if ((results.length - 1) === index) {
                            this.setState({
                                ready: true
                            })
                        }
                    }
                }).catch((err) => {
                    console.log(err);

                    if ((results.length - 1) === index) {
                        this.setState({
                            ready: true
                        })
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    startJobAndContinue = () => {
        console.log("startJobAndContinue clicked");
        
        const { selected } = this.state;

        axios.post(`${Config.ngrok_url}/assign/driver/roadside/assistance`, {
            id: this.props.unique_id,
            selected
        }).then((res) => {
            if (res.data.message === "Updated both users and started transaction!") {
                console.log(res.data);

                // this.props.props.navigation.navigate("tow-activated-map-view");
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateService = (passed) => {
        switch (passed) {
            case "door-unlocking":
                return "Door unlocking services";
                break;
            case "gas-delivery":
                return "Gas delivery services";
                break;
            case "jump-start":
                return "Jump-start services";
                break;
            case "tire-change":
                return "Tire changing services";
                break;
            case "stuck-vehicle": 
                return "Stuck vehicle - removal services";
                break;
            default:
                break;
        }
    }
    render() {
        const { results, ready } = this.state;

        console.log(this.state);
        return (
            <View>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Job Queue</Title>
                        <Subtitle>Select jobs & more...</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <List>
                        {typeof results !== "undefined" && results.length > 0 && ready === true ? results.map((result, index) => {
                            if (result.tow_required === true) {
                                return (
                                    <Fragment key={index}>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Thumbnail square source={{ uri: result.profile_picture }} />
                                            </Left>
                                            <Body>
                                                <Text>{result.fullName}</Text>
                                                <Text note numberOfLines={3}><Text style={{ fontWeight: "bold" }}>Pickup Location:</Text> {"\n"}{result.pickup_location}</Text>
                                                <Text note numberOfLines={3}><Text style={{ fontWeight: "bold" }}>Destination:</Text> {"\n"}{result.tow_desination_street_address}</Text>
                                            </Body>
                                            <Right>
                                                <Button onPress={() => {
                                                    this.setState({
                                                        selected: result
                                                    }, () => {
                                                        this.RBSheet.open();
                                                    })
                                                }} transparent>
                                                    <Text style={{ fontWeight: "bold", color: "blue" }}>View</Text>
                                                </Button>
                                            </Right>
                                        </ListItem>
                                    </Fragment>
                                );
                            } else {
                                return (
                                    <Fragment key={index}>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Thumbnail square source={{ uri: result.profile_picture }} />
                                            </Left>
                                            <Body>
                                                <Text>{result.fullName}</Text>
                                                <Text style={{ color: "blue" }}><Text style={{ fontWeight: "bold"}}>Roadside assistance</Text> ONLY (NO tow)</Text>
                                                <Text note numberOfLines={4}><Text style={{ fontWeight: "bold" }}>Pickup/Assistance Location:</Text> {"\n"}{result.pickup_location}</Text>
                                                <Text>{this.calculateService(result.roadside_service_required)}</Text>
                                            </Body>
                                            <Right>
                                                <Button onPress={() => {
                                                    this.setState({
                                                        selected: result
                                                    }, () => {
                                                        this.RBSheet.open();
                                                    })
                                                }} transparent>
                                                    <Text style={{ fontWeight: "bold", color: "blue" }}>View</Text>
                                                </Button>
                                            </Right>
                                        </ListItem>
                                    </Fragment>
                                );
                            }
                        }) : <View style={[styles.centered, { marginTop: 100 }]}>
                            <View style={styles.centered}>
                                <BarIndicator count={14} color='blue' />
                            </View>
                        </View>}  
                    </List>
                    
                </ScrollView>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={100}
                    openDuration={250}
                    customStyles={{
                        container: {
                        justifyContent: "center",
                        alignItems: "center"
                        }
                    }}
                    >
                    <View style={styles.centered}>
                        <Button success onPress={() => {
                            this.RBSheet.close();

                            setTimeout(() => {
                                this.startJobAndContinue();
                            }, 500);
                        }} style={styles.customButton}>
                            <NativeText style={{ color: "white", fontWeight: "bold" }}>Accept Job & Start</NativeText>
                        </Button>
                    </View>
                </RBSheet>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(ListQueueHelper);