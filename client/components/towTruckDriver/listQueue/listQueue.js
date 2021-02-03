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
import Dialog from "react-native-dialog";
import geodist from 'geodist';
import Modal from 'react-native-modal';
import io from 'socket.io-client';
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../toastConfig.js";

const socket = io('http://mental-health-mobile-app.ngrok.io', {transports: ['websocket', 'polling', 'flashsocket']});

class ListQueueHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        results: [],
        ready: false,
        selected: null,
        user: null,
        isVisible: false,
        isVisibleTwo: false,
        applied: false,
        unmounted: false
    }
}
    componentDidMount() {
        
        const promiseee = new Promise((resolve, reject) => {
            axios.post(`${Config.ngrok_url}/gather/general/info`, {
                id: this.props.unique_id
            }).then((res) => {
                if (res.data.message === "Found user!") {
                    console.log(res.data);
    
                    const { user } = res.data;
    
                    this.setState({
                        user
                    }, () => {
                        resolve();
                    })
                } else {
                    console.log("errrrroorrr", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        })

        promiseee.then(() => {
            const { user } = this.state;

            axios.get(`${Config.ngrok_url}/gather/queued/jobs`).then((res) => {
                console.log(res.data);
    
                const { results } = res.data;
    
                for (let index = 0; index < results.length; index++) {
                    const result = results[index];

                    if (_.has(result.initial_location, "position")) {
                        if (geodist({lat: user.current_location.coords.latitude, lon: user.current_location.coords.longitude}, {lat: result.initial_location.position.lat, lon: result.initial_location.position.lon}) < 50) {
                            console.log("LESS than 50 miles away!! TRUE CHUNK");

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
                        } else {
                            console.log("MORE than 50 miles away... TRUE CHUNK");

                            if ((results.length - 1) === index) {
                                this.setState({
                                    ready: true
                                })
                            }
                        }
                    } else {
                        if (geodist({lat: user.current_location.coords.latitude, lon: user.current_location.coords.longitude}, {lat: result.initial_location.latitude, lon: result.initial_location.longitude}) < 50) {
                            console.log("LESS than 50 miles away!! ELSE CHUNK");

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
                        } else {
                            // do nothing
                            console.log("MORE than 50 miles away... ELSE CHUNK");
                            // check if end of loop
                            if ((results.length - 1) === index) {
                                this.setState({
                                    ready: true
                                })
                            }
                        }
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        })
    }
    startJobAndContinue = () => {
        
        const { selected } = this.state;

        console.log("startJobAndContinue clicked", selected);

        this.setState({
            applied: true
        }, () => {
            axios.get(`${Config.ngrok_url}/check/if/able/to/apply`, {
                params: {
                    id: this.props.unique_id
                }
            }).then((resppppp) => {
                if (resppppp.data.active === false) {
                    console.log("resppppp", resppppp.data);

                    axios.post(`${Config.ngrok_url}/gather/tow/company/information/prices`, {
                        id: this.props.unique_id,
                        selected,
                        company_id: this.state.user.employed_by,
                        company_name: this.state.user.company_name
                    }).then((res) => {
                        if (res.data.message === "Gathered company info!") {
                            
                            console.log(res.data);
        
                            axios.post(`${Config.ngrok_url}/make/applied`, {
                                id: this.props.unique_id
                            }).then((resolution) => {
        
                                if (resolution.data.message === "Marked as complete.") {
        
                                    socket.emit("send-invitation-request", {
                                        user_id: selected.requested_by,
                                        company_informtion: res.data.listing,  
                                        selected,
                                        fullName: this.props.fullName,
                                        lengthInMeters: res.data.lengthInMeters,
                                        tow_driver_id: this.props.unique_id
                                    })
                    
                                    Toast.show({
                                        text1: "Successfully sent proposal/request to client!",
                                        text2: "We've sent the client your invitiation, if they 'accept' - you will be automatically redirect.",
                                        type: "success",
                                        position: "top",
                                        visibilityTime: 4500
                                    })
                                } else {
                                    console.log("err", res.data);
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
                } else {
                    console.log("ERRRRR", resppppp.data);

                    Toast.show({
                        text1: "We are still waiting for a response from the other user, please check back soon.",
                        text2: "Waiting for a response from the user... If no response is recieved in 1 min, we will let you apply again.",
                        type: "error",
                        position: "top",
                        visibilityTime: 4500
                    })
                }
            }).catch((errorrrrrrrrrr) => {
                console.log(errorrrrrrrrrr);
            })    
        });

        if (this.state.unmounted === false) {
            setTimeout(() => {
                this.setState({
                    applied: false
                });
            }, 20000);
        }
    }
    componentWillUnmount () {
        this.setState({
            unmounted: true
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
        const { results, ready, user, isVisible } = this.state;

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
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <View style={{ flex: 1 }}>
                    <Dialog.Container visible={isVisible}>
                    <Dialog.Title>You already have an ACTIVE open incomplete job!</Dialog.Title>
                    <Dialog.Description>
                        Do you want to redirect to the active listing or stay on this page?
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        })
                    }} label="STAY" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        }, () => {
                            if (user.active_roadside_assistance_job.current_page === "actively-on-site") {
                                this.props.props.navigation.push("settings-active-roadside-assistance-manage");
                            } else {
                                this.props.props.navigation.push("tow-activated-map-view");
                            }
                        })
                    }} label="REDIRECT ME" />
                    </Dialog.Container>
                </View>
                <View style={styles.centered}>
                    <Modal isVisible={this.state.isVisibleTwo}>
                        <View style={[styles.centered, { flex: 1, backgroundColor: "white", padding: 20, maxHeight: 300 }]}>
                        <Text style={styles.headModal}>You <Text style={{ color: "red", fontWeight: "bold" }}>MUST</Text> be approved before taking jobs...!</Text>
                        <Text style={[styles.subModal, { marginTop: 15 }]}>You need to be approved by your related company before taking gigs..</Text>
                        <View style={{ marginTop: 20 }} />
                        <View style={styles.centered}>
                            <View style={styles.centered}>
                                <Button danger onPress={() => {
                                    this.setState({
                                        isVisibleTwo: false
                                    })
                                }} style={styles.buttonButton}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Cancel/Exit</NativeText>
                                </Button>
                            </View>
                        </View>
                        </View>
                    </Modal>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <Text style={styles.lessThan}>We only show listings <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>WITHIN 50 MILES</Text> of your location... Anything greateer than 50 miles will be delagated to closer drivers.</Text>
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
                                                    if (this.state.applied === false) {
                                                        this.setState({
                                                            selected: result
                                                        }, () => {
                                                            this.RBSheet.open();
                                                        })
                                                    } else {
                                                        Toast.show({
                                                            text1: "You need to wait 20 seconds before applying for another job.",
                                                            text2: "We require 20 second intervals to prevent spam and fraud. Please try again soon.",
                                                            type: "error",
                                                            position: "top",
                                                            visibilityTime: 4500
                                                        })
                                                    }
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
                                                    if (this.state.applied === false) {
                                                        this.setState({
                                                            selected: result
                                                        }, () => {
                                                            this.RBSheet.open();
                                                        })
                                                    } else {
                                                        Toast.show({
                                                            text1: "You need to wait 20 seconds before applying for another job.",
                                                            text2: "We require 20 second intervals to prevent spam and fraud. Please try again soon.",
                                                            type: "error",
                                                            position: "top",
                                                            visibilityTime: 4500
                                                        })
                                                    }
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
                    height={250}
                    openDuration={250}
                    customStyles={{
                        container: {
                        justifyContent: "center",
                        alignItems: "center"
                        }
                    }}
                    >
                    <View style={styles.centered}>
                        <View style={{ margin: 20 }}>
                            <Button success onPress={() => {

                            this.RBSheet.close();

                            if (user !== null && user.active_employee === true) {
                                if (_.has(user, "active_roadside_assistance_job")) {
                                    if (Object.keys(user.active_roadside_assistance_job).length > 0) {
                                        if (user.active_roadside_assistance_job.active === false) {

                                            setTimeout(() => {
                                                
                                                this.startJobAndContinue();

                                                console.log("start");
                                            }, 500);
                                            } else {
                                            console.log("already on a job...");

                                            setTimeout(() => {
                                                this.setState({
                                                    isVisible: true
                                                })
                                            }, 1000);
                                        }
                                    } else {
                                        this.startJobAndContinue();

                                        console.log("Start job else ONE!!!1");
                                    }
                                } else {
                                    this.startJobAndContinue();

                                    console.log("Start job else");
                                }
                            } else {
                                setTimeout(() => {
                                    this.setState({
                                        isVisibleTwo: true
                                    })
                                }, 1000);
                            }
                            }} style={styles.customButton}>
                            <NativeText style={{ color: "white", fontWeight: "bold" }}>Accept Job & Send Proposal</NativeText>
                            </Button>
                            <View style={styles.hr} />
                            <Text style={{ fontWeight: "bold", fontSize: 22, textAlign: "center" }}>When you submit a proposal - you are <Text style={{ textDecorationLine: "underline", color: "blue" }}>REQUIRED</Text> to take the trip when and if it is accepted.</Text>
                        </View>
                    </View>
                </RBSheet>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id,
        fullName: state.auth.authenticated.fullName,
        employed_by: state.auth.authenticated.employed_by,
        company_name: state.auth.authenticated.company_name
    }
}
export default connect(mapStateToProps, { })(ListQueueHelper);