import React, { Component, Fragment } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, Dimensions, RefreshControl } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle, List, ListItem, Switch } from 'native-base';
import { AirbnbRating } from "react-native-ratings";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import axios from "axios";
import { Config } from "react-native-config";
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../../toastConfig.js";
import { connect } from "react-redux";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';


const { height, width } = Dimensions.get("window");

class ReviewClientFixedVehicleHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        accurate_pickup_location: false, 
        helpful: false,
        respectful: false, 
        quickResponses: false,
        descriptive: false,
        safe: false,
        expectation: "",
        user: null,
        refreshing: false,
        pickup_accurate_rating: 0, 
        communication_rating: 0, 
        informational_rating: 0, 
        safe_during_interaction: 0, 
        overall_interaction_rating: 0, 
        honest_polite_rating: 0, 
        as_described: 0,
        publicMessage: "",
        privateMessage: ""
    }
}
    componentDidMount() {
        console.log("mounted.");

        setTimeout(() => {
            axios.post(`${Config.ngrok_url}/gather/general/info`, {
                id: this.props.unique_id
            }).then((res) => { 
                if (res.data.message === "Found user!") {
                    console.log(res.data);
                    
                    const { user } = res.data;
    
                    this.setState({
                        user
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }, 500)
    }
    handleSubmission = () => {

        const { accurate_pickup_location, helpful, user, respectful, quickResponses, descriptive, expectation, safe, pickup_accurate_rating, communication_rating, informational_rating, safe_during_interaction, overall_interaction_rating, honest_polite_rating, as_described, privateMessage, publicMessage } = this.state;

        const agreement = this.props.props.route.params.agreement;

        if (pickup_accurate_rating !== 0 && communication_rating !== 0 && informational_rating !== 0 && safe_during_interaction !== 0 && overall_interaction_rating !== 0 && honest_polite_rating !== 0 && as_described !== 0 && typeof expectation !== "undefined" && expectation.length > 0 && (typeof publicMessage !== "undefined" && publicMessage.length > 0)) {
            console.log("submit!");

            axios.post(`${Config.ngrok_url}/submit/feedback/review/client/broken/vehicle/listing`, {
                id: this.props.unique_id,
                accurate_pickup_location, 
                helpful, 
                other_user_id: this.props.props.route.params.agreement.initiator,
                respectful, 
                agreement,
                quickResponses, 
                descriptive, 
                expectation, 
                safe, 
                pickup_accurate_rating, 
                communication_rating, 
                informational_rating, 
                safe_during_interaction,
                overall_interaction_rating, 
                honest_polite_rating, 
                as_described,
                fullName: this.props.fullName,
                profilePic: user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].full_url : null,
                privateMessage, 
                publicMessage
            }).then((res) => {
                if (res.data.message === "Successfully submitted review and completed job!") {
                    console.log(res.data);

                    this.props.props.navigation.replace("homepage-main");
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            Toast.show({
                text1: "Please complete each required field.",
                text2: "Please complete every field EXCLUDING compliments before proceeding...",
                visibilityTime: 4500,
                type: "error",
                position: "top"
            })
        }
    }
    renderConditional = () => {
        const { accurate_pickup_location, helpful, user, respectful, quickResponses, descriptive, expectation, safe, pickup_accurate_rating, communication_rating, informational_rating, safe_during_interaction, overall_interaction_rating, honest_polite_rating, as_described } = this.state;

        if (user !== null) {
            return (
                <Fragment>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Would you like to compliment this client on anything specifically?</Text>
                        <View style={[styles.row, { marginTop: 40 }]}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    accurate_pickup_location: !this.state.accurate_pickup_location
                                })
                            }}>
                                <View style={styles.column}>
                                    <View style={accurate_pickup_location === true ? styles.darkCircle : styles.circle}>
                                        <Image source={require("../../../../assets/icons/heart-2.png")} style={styles.icon} />
                                    </View>
                                    <Text style={styles.textText}>Client was at described location</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    helpful: !this.state.helpful
                                })
                            }}>
                                <View style={styles.column}>
                                    <View style={helpful === true ? styles.darkCircle : styles.circle}>
                                        <Image source={require("../../../../assets/icons/towww.png")} style={styles.icon} />
                                    </View>
                                    <Text style={styles.textText}>Client tried to help during interaction</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    respectful: !this.state.respectful
                                })
                            }}>
                                <View style={styles.column}>
                                    <View style={respectful === true ? styles.darkCircle : styles.circle}>
                                        <Image source={require("../../../../assets/icons/salute.png")}  style={styles.icon} />
                                    </View>
                                    <Text style={styles.textText}>Client was respectful/polite</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row, { marginTop: 40 }]}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    quickResponses: !this.state.quickResponses
                                })
                            }}>
                                <View style={styles.column}>
                                    <View style={quickResponses === true ? styles.darkCircle : styles.circle}>
                                        <Image source={require("../../../../assets/icons/chat-custom.png")} style={styles.icon} />
                                    </View>
                                    <Text style={styles.textText}>Quick responses before & after repair</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    descriptive: !this.state.descriptive
                                })
                            }}>
                                <View style={styles.column}>
                                    <View style={descriptive === true ? styles.darkCircle : styles.circle}>
                                        <Image source={require("../../../../assets/icons/informational.png")} style={styles.icon} />
                                    </View>
                                    <Text style={styles.textText}>Client was descriptive and informative</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    safe: !this.state.safe
                                })
                            }}>
                                <View style={styles.column}>
                                    <View style={safe === true ? styles.darkCircle : styles.circle}>
                                        <Image source={require("../../../../assets/icons/sheild-two.png")}  style={styles.icon} />
                                    </View>
                                    <Text style={styles.textText}>I felt safe with this client during the repair</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.hr} />
                        <Text style={styles.hugeText}>Describe your trip</Text>
                        <Text style={[styles.headerText, { marginTop: 35 }]}>Help other agents find the right client for their trip. You client will only see answers that multiple guests have selected - annoymously.</Text>
                        <View style={[styles.hrTwo, { marginTop: 50, marginBottom: 40 }]} />
                        <Text style={styles.headerText}>How did your service with [blank] compare to your expectations?</Text>
                        <List>
                            <ListItem style={styles.listitem}>
                                <Body>
                                <Text>Much better than I expected</Text>
                                </Body>
                                <Right>
                                <Switch onValueChange={(value) => {
                                    this.setState({
                                        expectation: "Much better than I expected"
                                    })
                                }} value={expectation === "Much better than I expected" ? true : false} />
                                </Right>
                            </ListItem>
                            <ListItem style={styles.listitem}>
                                <Body>
                                <Text>A bit better than I expected</Text>
                                </Body>
                                <Right>
                                <Switch onValueChange={(value) => {
                                    this.setState({
                                        expectation: "A bit better than I expected"
                                    })
                                }} value={expectation === "A bit better than I expected" ? true : false} />
                                </Right>
                            </ListItem>
                            <ListItem style={styles.listitem}>
                                <Body>
                                <Text>About the same that I expected</Text>
                                </Body>
                                <Right>
                                <Switch onValueChange={(value) => {
                                    this.setState({
                                        expectation: "About the same that I expected"
                                    })
                                }} value={expectation === "About the same that I expected" ? true : false} />
                                </Right>
                            </ListItem>
                            <ListItem style={styles.listitem}>
                                <Body>
                                <Text>A bit worse than I expected</Text>
                                </Body>
                                <Right>
                                <Switch onValueChange={(value) => {
                                    this.setState({
                                        expectation: "A bit worse than I expected"
                                    })
                                }} value={expectation === "A bit worse than I expected" ? true : false} />
                                </Right>
                            </ListItem>
                            <ListItem style={styles.listitem}>
                                <Body>
                                <Text>Much worse than I expected</Text>
                                </Body>
                                <Right>
                                <Switch onValueChange={(value) => {
                                    this.setState({
                                        expectation: "Much worse than I expected"
                                    })
                                }} value={expectation === "Much worse than I expected" ? true : false} />
                                </Right>
                            </ListItem>
                        </List>
                        <View style={styles.hr} />
                        <View style={{ marginTop: 30 }} />
                        <Text style={styles.headerText}>Please rate each category to the best of your ablitiy with 1 star being "bad" and 5 stars being "excellent".</Text>
                        <View style={{ marginTop: 30 }} />
                        <View style={styles.flexBeginning}>
                            <View style={{ marginTop: 15, justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start" }}>
                                <Text style={styles.title}>Communication</Text>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Terrible", "Ok", "Average", "Good", "Excellent"]}
                                    defaultRating={0}
                                    size={30}
                                    onFinishRating={(value) => {
                                        this.setState({
                                            communication_rating: value
                                        })
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 15, justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start" }}>
                                <Text style={styles.title}>Accurate repair location</Text>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Terrible", "Ok", "Average", "Good", "Excellent"]}
                                    defaultRating={0}
                                    size={30}
                                    onFinishRating={(value) => {
                                        this.setState({
                                            pickup_accurate_rating: value
                                        })
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 15, justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start" }}>
                                <Text style={styles.title}>Informational and/or descriptive of problems</Text>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Terrible", "Ok", "Average", "Good", "Excellent"]}
                                    defaultRating={0}
                                    size={30}
                                    onFinishRating={(value) => {
                                        this.setState({
                                            informational_rating: value
                                        })
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 15, justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start" }}>
                                <Text style={styles.title}>I felt safe during this interaction</Text>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Terrible", "Ok", "Average", "Good", "Excellent"]}
                                    defaultRating={0}
                                    size={30}
                                    onFinishRating={(value) => {
                                        this.setState({
                                            safe_during_interaction: value
                                        })
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 15, justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start" }}>
                                <Text style={styles.title}>Pleased with overall interaction</Text>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Terrible", "Ok", "Average", "Good", "Excellent"]}
                                    defaultRating={0}
                                    size={30}
                                    onFinishRating={(value) => {
                                        this.setState({
                                            overall_interaction_rating: value
                                        })
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 15, justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start" }}>
                                <Text style={styles.title}>Client was honest & genuine</Text>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Terrible", "Ok", "Average", "Good", "Excellent"]}
                                    defaultRating={0}
                                    size={30}
                                    onFinishRating={(value) => {
                                        this.setState({
                                            honest_polite_rating: value
                                        })
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 15, justifyContent: "flex-start", alignItems: "flex-start", alignContent: "flex-start" }}>
                                <Text style={styles.title}>Everything was as described in initial request</Text>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Terrible", "Ok", "Average", "Good", "Excellent"]}
                                    defaultRating={0}
                                    size={30}
                                    onFinishRating={(value) => {
                                        this.setState({
                                            as_described: value
                                        })
                                    }}
                                />
                            </View>
                        </View>
                        
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.margin}>
                        <Text style={styles.titleText}>Enter a <Text style={{ fontStyle: "italic", textDecorationLine: "underline" }}>private message</Text> to the client... You may skip this if you'd like.</Text>
                        <AutoGrowingTextInput
                            value={this.state.privateMessage}
                            onChangeText={(value) => {
                                this.setState({
                                    privateMessage: value
                                })
                            }}
                            style={styles.textInput}
                            placeholder={'Enter your PRIVATE message to the client here...'}
                            placeholderTextColor='#66737C'
                            minHeight={150}
                            enableScrollToCaret
                            ref={(r) => { this._textInput = r; }}
                        />
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.margin}>
                        <Text style={styles.titleText}>Enter a <Text style={{ fontStyle: "italic", textDecorationLine: "underline" }}>public review</Text> for the client. This is a <Text style={{ color: "red" }}>required</Text> step.</Text>
                        <AutoGrowingTextInput
                            value={this.state.publicMessage}
                            onChangeText={(value) => {
                                this.setState({
                                    publicMessage: value
                                })
                            }}
                            style={styles.textInput}
                            placeholder={'Enter your PUBLIC review for the client here...'}
                            placeholderTextColor='#66737C'
                            minHeight={150}
                            enableScrollToCaret
                            ref={(r) => { this._textInput = r; }}
                        />
                    </View>
                    <View style={styles.margin}>
                        <AwesomeButtonBlue width={width * 0.90} textColor={"black"} onPress={() => {
                            this.handleSubmission();
                        }} type={"secondary"}>Continue & Submit Feedback</AwesomeButtonBlue>
                    </View>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <View style={styles.margin}>
                        <Text style={{ marginBottom: 35, marginTop: 15, fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Drag the screen down to reload the information.</Text>
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
                    </View>
                </Fragment>
            );
        }
    }
    onRefresh = () => {
        console.log("refreshing.");

        this.setState({
            refreshing: true
        }, () => {
            axios.post(`${Config.ngrok_url}/gather/general/info`, {
                id: this.props.unique_id
            }).then((res) => { 
                if (res.data.message === "Found user!") {
                    console.log(res.data);
                    
                    const { user } = res.data;
    
                    this.setState({
                        user,
                        refreshing: false
                    })
                } else {
                    this.setState({
                        refreshing: false
                    }) 
                }
            }).catch((err) => {
                console.log(err);

                this.setState({
                    refreshing: false
                })
            })
        })
    }
    render() {

        console.log("This.state reviewRoadsideAsssistance this.state", this.state);
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.push("homepage-main");
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Review Client</Title>
                        <Subtitle>Time to review your client...</Subtitle>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                           this.props.props.navigation.push("profile-main")
                        }} transparent>
                            <Image source={require("../../../../assets/icons/profile.png")} style={[styles.headerIcon, { position: "absolute", right: 20 }]} />
                        </Button>
                    </Right>
                </Header>
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <ScrollView refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    } contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    {this.renderConditional()}
                </ScrollView>
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
export default connect(mapStateToProps, { })(ReviewClientFixedVehicleHelper);