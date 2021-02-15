import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView } from "react-native";
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Icon, ListItem, List, Thumbnail } from 'native-base';
import styles from './styles.js';
import {
    BarIndicator
} from 'react-native-indicators';
import axios from 'axios';
import { Config } from "react-native-config";
import { connect } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import _ from "lodash";


class WaitingRoomRoadsideAssistanceHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        people_before: 9,
        data: null,
        address: "",
        streetNameNumber: "",
        queuedData: [],
        dropoff_location: ""
    }
}
    componentDidMount() {

        axios.post(`${Config.ngrok_url}/gather/requested/tow/information`, {
            unique_id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Gathered requested tow info!") {
                console.log(res.data);

                const { data } = res.data;

                this.setState({
                    data
                })

                if (_.has(data.initial_location, "accuracy")) {
                    axios.get(`https://api.tomtom.com/search/2/reverseGeocode/${data.initial_location.latitude},${data.initial_location.longitude}.json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV`).then((resp) => {
                        console.log("resp.data", resp.data);

                        const { addresses } = resp.data;

                        this.setState({
                            address: addresses[0].address.freeformAddress,
                            streetNameNumber: addresses[0].address.streetNameAndNumber ? addresses[0].address.streetNameAndNumber : `${addresses[0].position}`
                        })
                    }).catch((err) => {
                        console.log(err);
                    })
                };

                const configgg = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                axios.get(`https://api.tomtom.com/search/2/reverseGeocode/${data.tow_desination_information.position.lat},${data.tow_desination_information.position.lon}.json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV`, configgg).then((res) => {
                    if (res.data) {
                        console.log("This is the response im looking for:", res.data);

                        this.setState({
                            dropoff_location: res.data.addresses[0].address.freeformAddress
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                })
                
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })


        axios.get(`${Config.ngrok_url}/gather/queued/jobs`).then((res) => {
            console.log(res.data);

            const { results } = res.data;

            this.setState({
                queuedData: results
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    renderPickupDropoff = () => {
        const { data } = this.state;

        if (_.has(data, "tow_desination_information")) {
            if (_.has(data, "initial_location") && _.has(data.initial_location, "address")) {
                return (
                    <List style={{ marginTop: 25 }}>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail style={{ maxWidth: 35, maxHeight: 35, marginTop: 10 }} source={require("../../../../assets/icons/marker.png")} />
                            </Left>
                            <Body>
                                <NativeText>{`${data.initial_location.address.streetNumber} ${data.initial_location.address.streetName}`}</NativeText>
                                <NativeText note style={{ color: "black" }}>{data.initial_location.address.freeformAddress}</NativeText>
                            </Body>
                            <Right>
                                <NativeText note style={{ color: "blue" }}>Pickup</NativeText>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail style={{ maxWidth: 35, maxHeight: 35, marginTop: 10 }} source={require("../../../../assets/icons/finish.png")} />
                            </Left>
                            <Body>
                                <NativeText>{`${data.tow_desination_information.address.streetNumber} ${data.tow_desination_information.address.streetName}`}</NativeText>
                                <NativeText note style={{ color: "black" }}>{data.tow_desination_information.address.freeformAddress}</NativeText>
                            </Body>
                            <Right>
                                <NativeText note style={{ color: "blue" }}>Drop-off</NativeText>
                            </Right>
                        </ListItem>
                    </List>
                );
            } else {
                if (_.has(data, "initial_location") && _.has(data.initial_location, "latitude") && data.tow_desination_information !== null) {
                    return (
                        <List style={{ marginTop: 25 }}>
                            <ListItem avatar>
                                <Left>
                                    <Thumbnail style={{ maxWidth: 35, maxHeight: 35, marginTop: 10 }} source={require("../../../../assets/icons/marker.png")} />
                                </Left>
                                <Body>
                                    <NativeText>{`${this.state.streetNameNumber}`}</NativeText>
                                    <NativeText note style={{ color: "black" }}>{this.state.address}</NativeText>
                                </Body>
                                <Right>
                                    <NativeText note style={{ color: "blue" }}>Pickup</NativeText>
                                </Right>
                            </ListItem>
                            <ListItem avatar>
                                <Left>
                                    <Thumbnail style={{ maxWidth: 35, maxHeight: 35, marginTop: 10 }} source={require("../../../../assets/icons/finish.png")} />
                                </Left>
                                <Body>
                                    <NativeText>{`${data.tow_desination_information.position.lat} ${data.tow_desination_information.position.lon}`}</NativeText>
                                    <NativeText note style={{ color: "black" }}>{data.tow_desination_information.address.freeformAddress}</NativeText>
                                </Body>
                                <Right>
                                    <NativeText note style={{ color: "blue" }}>Drop-off</NativeText>
                                </Right>
                            </ListItem>
                        </List>
                    );
                }
            }   
        } else {
            if (_.has(data, "initial_location") && _.has(data.initial_location, "accuracy")) {
                return (
                    <List style={{ marginTop: 25 }}>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail style={{ maxWidth: 35, maxHeight: 35, marginTop: 10 }} source={require("../../../../assets/icons/marker.png")} />
                            </Left>
                            <Body>
                                <NativeText>{`${this.state.streetNameNumber}`}</NativeText>
                                <NativeText note style={{ color: "black" }}>{this.state.address}</NativeText>
                            </Body>
                            <Right>
                                <NativeText note style={{ color: "blue" }}>Pickup</NativeText>
                            </Right>
                        </ListItem>
                    </List>
                );
            } else {
                if (_.has(data, "initial_location") && _.has(data.initial_location, "address")) {
                    return (
                        <List style={{ marginTop: 25 }}>
                            <ListItem avatar>
                                <Left>
                                    <Thumbnail style={{ maxWidth: 35, maxHeight: 35, marginTop: 10 }} source={require("../../../../assets/icons/marker.png")} />
                                </Left>
                                <Body>
                                    <NativeText>{`${data.initial_location.address.streetNumber} ${data.initial_location.address.streetName}`}</NativeText>
                                    <NativeText note style={{ color: "black" }}>{data.initial_location.address.freeformAddress}</NativeText>
                                </Body>
                                <Right>
                                    <NativeText note style={{ color: "blue" }}>Pickup</NativeText>
                                </Right>
                            </ListItem>
                        </List>
                    );
                }
            }
        }
    }
    cancelRequest = () => {
        console.log("cancelRequest clicked");
        
        axios.post(`${Config.ngrok_url}/cancel/roadside/assistance/claim`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Deleted!") {
                console.log(res.data);

                this.props.props.navigation.replace("homepage-main");
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { data } = this.state;
        console.log("wait.js", this.state);
        return (
           <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.push("roadside-assistance-main-landing");
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Waiting Room</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            this.props.props.navigation.navigate("homepage-main");
                        }} transparent>
                            <Text style={{ fontSize: 18 }}>Exit</Text>
                        </Button>
                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <View style={styles.margin}>
                        <View style={[styles.centered, { marginTop: 40, marginBottom: 40 }]}>
                            <Text style={{ marginBottom: 20, fontSize: 14 }}>Searching for roadside assistance experts...</Text>
                            <BarIndicator count={14} color='blue' />
                        </View>
                        <View style={styles.hr} />
                        <View style={{ marginTop: 50 }}>
                            <Text style={styles.header}>Waiting for someone to accept your requested roadside assistance call... We are notifying our drivers.</Text>
                        </View>
                        <View style={styles.hr} />
                        <Text style={[styles.header, { marginTop: 25, color: "blue", fontWeight: "bold" }]}>There are <Text style={{ color: "black", fontWeight: "bold", fontSize: 30 }}>{this.state.queuedData.length}</Text> people currently waiting for roadside assistance...</Text>
                        <Text style={{ fontStyle: "italic", marginTop: 20, textAlign: "center" }}>There is no specific order, it just depends on when someone accepts your order...</Text>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.nameText}>{this.props.fullName}'s trip</Text>
                            {this.renderPickupDropoff()}
                        </View>
                    </View>
                    
                </ScrollView>
                <View style={styles.bottom}>
                    <View style={[styles.centered, { marginTop: 25 }]}>
                        <View style={styles.centered}>
                            <Button onPress={() => {
                                this.RBSheet.open();
                            }} info style={styles.width75}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Manage Request</NativeText>
                            </Button>
                        </View>
                    </View>
                </View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={150}
                    openDuration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                    >
                        <List>
                            <ListItem onPress={() => {
                                this.RBSheet.close();

                                setTimeout(() => {
                                    this.cancelRequest();
                                }, 1000);
                            }} button={true} style={styles.listitemCustom} icon>
                                <Left>
                                    <Button transparent style={{  }}>
                                        <Image source={require('../../../../assets/icons/cancel-2.png')} style={styles.listIcon} />
                                    </Button>
                                </Left>
                                <Body>
                                    <NativeText>Cancel roadside assistance</NativeText>
                                </Body>
                                <Right>
                                    
                                    <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem onPress={() => {

                            }} button={true} style={styles.listitemCustom} icon>
                                <Left>
                                    <Button transparent style={{  }}>
                                        <Image source={require('../../../../assets/icons/plus.png')} style={styles.listIcon} />
                                    </Button>
                                </Left>
                                <Body>
                                    <NativeText>Add stop</NativeText>
                                </Body>
                                <Right>
                                    
                                    <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem onPress={() => {

                            }} button={true} style={styles.listitemCustom} icon>
                                <Left>
                                    <Button transparent style={{  }}>
                                        <Image source={require('../../../../assets/icons/pen.png')} style={styles.listIcon} />
                                    </Button>
                                </Left>
                                <Body>
                                    <NativeText>Edit drop-off</NativeText>
                                </Body>
                                <Right>
                                    
                                    <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>
                        </List>
                </RBSheet>
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
export default connect(mapStateToProps, { })(WaitingRoomRoadsideAssistanceHelper);