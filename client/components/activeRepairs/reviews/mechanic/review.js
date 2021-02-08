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

class ReviewMechanicFixedVehicleHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        hospitality: false,
        communicative: false,
        respectful: false,
        quickResponses: false,
        informational: false,
        knowledgable: false,
        expectation: "",
        user: null,
        arrived_when_expected: 0,
        communication_rating: 0,
        speed_and_careful: 0,
        informational_rating: 0,
        honest_polite_rating: 0,
        overall_interaction_rating: 0,
        happy_with_repair: 0,
        refreshing: false
    }
}
    componentDidMount() {
        console.log("mounted.");

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
    }
    handleSubmission = () => {
        const { hospitality, communicative, respectful, quickResponses, informational, knowledgable, expectation, user, arrived_when_expected, communication_rating, speed_and_careful, informational_rating, honest_polite_rating, overall_interaction_rating, happy_with_repair, privateMessage, publicMessage } = this.state;

        const agreement = this.props.props.route.params.agreement;

        if (arrived_when_expected !== 0 && communication_rating !== 0 && speed_and_careful !== 0 && informational_rating !== 0 && honest_polite_rating !== 0 && overall_interaction_rating !== 0 && happy_with_repair && typeof expectation !== "undefined" && expectation.length > 0 && typeof publicMessage !== "undefined" && publicMessage.length > 0) {
            console.log("submit!");

            axios.post(`${Config.ngrok_url}/submit/feedback/review/mechanic/broken/vehicle`, {
                arrived_when_expected, 
                communication_rating, 
                expectation,
                speed_and_careful, 
                informational_rating, 
                honest_polite_rating, 
                overall_interaction_rating, 
                happy_with_repair,
                hospitality, 
                communicative, 
                respectful,
                quickResponses, 
                informational, 
                knowledgable,
                agreement,
                id: this.props.unique_id,
                fullName: this.props.fullName,
                other_user: this.props.props.route.params.agreement.other_user,
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
        const { hospitality, communicative, respectful, quickResponses, informational, knowledgable, expectation, user } = this.state;

        if (user !== null) {
            return (
                <Fragment>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Would you like to compliment this driver/agent on anything specifically?</Text>
                        <View style={[styles.row, { marginTop: 40 }]}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    hospitality: !this.state.hospitality
                                })
                            }}>
                                <View style={styles.column}>
                                    <View style={hospitality === true ? styles.darkCircle : styles.circle}>
                                        <Image source={require("../../../../assets/icons/heart-2.png")} style={styles.icon} />
                                    </View>
                                    <Text style={styles.textText}>Outstanding hospitality</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    communicative: !this.state.communicative
                                })
                            }}>
                                <View style={styles.column}>
                                    <View style={communicative === true ? styles.darkCircle : styles.circle}>
                                        <Image source={require("../../../../assets/icons/towww.png")} style={styles.icon} />
                                    </View>
                                    <Text style={styles.textText}>Good communi- cation skills</Text>
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
                                    <Text style={styles.textText}>Mechanic was respectful</Text>
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
                                    <Text style={styles.textText}>Quick responses</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    informational: !this.state.informational
                                })
                            }}>
                                <View style={styles.column}>
                                    <View style={informational === true ? styles.darkCircle : styles.circle}>
                                        <Image source={require("../../../../assets/icons/informational.png")} style={styles.icon} />
                                    </View>
                                    <Text style={styles.textText}>Informational/helpful</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    knowledgable: !this.state.knowledgable
                                })
                            }}>
                                <View style={styles.column}>
                                    <View style={knowledgable === true ? styles.darkCircle : styles.circle}>
                                        <Image source={require("../../../../assets/icons/knowledge.png")}  style={styles.icon} />
                                    </View>
                                    <Text style={styles.textText}>Mechanic was knowledgable</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.hr} />
                        <Text style={styles.hugeText}>Describe your trip</Text>
                        <Text style={[styles.headerText, { marginTop: 35 }]}>Help other guests find the right agent for their trip. You agent will only see answers that multiple guests have selected - annoymously.</Text>
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
                        <View style={styles.flexStartCustom}>
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
                        <View style={styles.flexStartCustom}>
                            <Text style={styles.title}>Arrived when expected</Text>
                            <AirbnbRating
                                count={5}
                                reviews={["Terrible", "Ok", "Average", "Good", "Excellent"]}
                                defaultRating={0}
                                size={30}
                                onFinishRating={(value) => {
                                    this.setState({
                                        arrived_when_expected: value
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.flexStartCustom}>
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
                        <View style={styles.flexStartCustom}>
                            <Text style={styles.title}>Mechanic was speedy yet careful with the repair</Text>
                            <AirbnbRating
                                count={5}
                                reviews={["Terrible", "Ok", "Average", "Good", "Excellent"]}
                                defaultRating={0}
                                size={30}
                                onFinishRating={(value) => {
                                    this.setState({
                                        speed_and_careful: value
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.flexStartCustom}>
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
                        <View style={styles.flexStartCustom}>
                            <Text style={styles.title}>Mechanic was honest & genuine</Text>
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
                        <View style={styles.flexStartCustom}>
                            <Text style={styles.title}>I am happy with the repair and/or end result</Text>
                            <AirbnbRating
                                count={5}
                                reviews={["Terrible", "Ok", "Average", "Good", "Excellent"]}
                                defaultRating={0}
                                size={30}
                                onFinishRating={(value) => {
                                    this.setState({
                                        happy_with_repair: value
                                    })
                                }}
                            />
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
                        <Title>Review Mechanic</Title>
                        <Subtitle>Time to review your agent...</Subtitle>
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
export default connect(mapStateToProps, { })(ReviewMechanicFixedVehicleHelper);