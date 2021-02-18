import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText, Subtitle } from 'native-base';
import styles from './styles.js';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import Dialog from "react-native-dialog";
import { connect } from "react-redux";
import axios from "axios";
import { Config } from "react-native-config";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import io from 'socket.io-client';
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../../toastConfig.js";


const socket = io(Config.ngrok_url, {transports: ['websocket', 'polling', 'flashsocket']});

const { height, width } = Dimensions.get("window");

class ManageUponArrivalDepartureHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        isVisibleClient: false,
        user: null,
        isVisibleAgent: false,
        completed: false
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

                if (user.accountType === "client" || user.accountType === "mechanic") {
                    this.setState({
                        user,
                        completed: user.towing_services_start.agree_job_completed
                    })
                } else {
                    this.setState({
                        user,
                        completed: user.active_roadside_assistance_job.agree_job_completed
                    })
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    } 
    renderConditional = () => {
        const { user } = this.state;

        if (user !== null) {
            if (user.accountType === "tow-truck-driver") {
                return (
                    <Fragment>
                        <View style={styles.margin}>
                            <Text style={[styles.headerMain, { marginBottom: 15, marginTop: 15 }]}>Tow Truck Driver - Manage Job</Text>
                            <Text style={[styles.p, { marginBottom: 15 }]}>Is your tow and/or roadside assistance job completed? Accepting this job will release the funds to the provider.</Text>
                            <View style={styles.hr} />
                            {this.state.completed === false ? <AwesomeButtonBlue type={"secondary"} textColor={"black"} onPress={() => {
                                this.setState({
                                    isVisibleAgent: true
                                })
                            }} width={width * 0.90}>Complete transaction</AwesomeButtonBlue> : null}
                            <View style={styles.hr} />
                            <AwesomeButtonBlue type={"primary"} textColor={"white"} onPress={() => {}} width={width * 0.90}>Contact support</AwesomeButtonBlue>
                            <View style={styles.hr} />
                            <Text style={[styles.p, { fontStyle: "italic", textDecorationLine: "underline" }]}>Support is not capable of releasing funds from an already completed job</Text>
                        </View>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <View style={styles.margin}>
                            <Text style={[styles.headerMain, { marginBottom: 15, marginTop: 15 }]}>Roadside Assistance Client - Manage Job</Text>
                            <Text style={[styles.p, { marginBottom: 15 }]}>Is your tow and/or roadside assistance job completed? Accepting this job will release the funds to the provider.</Text>
                            
                            {this.state.completed === false ? <Fragment><View style={styles.hr} /><AwesomeButtonBlue type={"secondary"} textColor={"black"} onPress={() => {
                                this.setState({
                                    isVisibleClient: true
                                })
                            }} width={width * 0.90}>Complete transaction</AwesomeButtonBlue></Fragment> : null}
                            <View style={styles.hr} />
                            <AwesomeButtonBlue type={"primary"} textColor={"white"} onPress={() => {}} width={width * 0.90}>Contact support</AwesomeButtonBlue>
                            <View style={styles.hr} />
                            <Text style={[styles.p, { fontStyle: "italic", textDecorationLine: "underline" }]}>Support is not capable of releasing funds from an already completed job</Text>
                        </View>
                    </Fragment>
                );
            }
        } else {
            return (
                <Fragment>
                    <View style={styles.margin}>
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
    handleClientSubmission = () => {
        const { user } = this.state;

        console.log("handleClientSubmission clicked", user.towing_services_start.tow_driver_infomation.unique_id);

        axios.post(`${Config.ngrok_url}/mark/trip/complete/finale/half/one`, {
            id: this.props.unique_id,
            tow_driver_id: user.towing_services_start.tow_driver_infomation.unique_id
        }).then((res) => {
            if (res.data.message === "Marked as complete!") {
                console.log(res.data);

                this.setState({
                    completed: true
                })

                socket.emit("mark-trip-complete", {
                    complete: true,
                    user_id: user.towing_services_start.tow_driver_infomation.unique_id
                })

                Toast.show({
                    text1: "Successfully marked job as complete!",
                    text2: "We have notified the other user of your marking of completion. Please wait for them to respond.",
                    type: "success",
                    visibilityTime: 4500,
                    position: "top"
                })

            } else if (res.data.message === "Both users have agreed the job is complete!") {

                socket.emit("handle-redirection-agent", {
                    redirect: true,
                    user_id: user.towing_services_start.tow_driver_infomation.unique_id
                })
                setTimeout(() => {
                    this.props.props.navigation.replace("review-roadside-assistance-agent");
                }, 750);
            } else {
                console.log("Er", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleCompletionTowDriverAgent = () => {
        console.log("handleCompletionTowDriverAgent clicked");

        const { user } = this.state;

        axios.post(`${Config.ngrok_url}/mark/trip/complete/finale/half/two/agent`, {
            id: this.props.unique_id,
            requestee_id: user.active_roadside_assistance_job.requestee_id
        }).then((res) => {
            console.log(res.data);
            if (res.data.message === "Marked as complete!") {
                console.log(res.data);

                this.setState({
                    completed: true
                })

                socket.emit("mark-trip-complete", {
                    complete: true,
                    user_id: user.active_roadside_assistance_job.requestee_id
                })

                Toast.show({
                    text1: "Successfully marked job as complete!",
                    text2: "We have notified the other user of your marking of completion. Please wait for them to respond.",
                    type: "success",
                    visibilityTime: 4500,
                    position: "top"
                })
            } else if (res.data.message === "Both users have agreed the job is complete!") {
                
                socket.emit("handle-redirection", {
                    redirect: true,
                    user_id: user.active_roadside_assistance_job.requestee_id
                })

                setTimeout(() => {
                    this.props.props.navigation.replace("review-roadside-assistance-client");
                }, 750)
            } else {
                console.log("Er", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log("this.state. mangage upon arrival", this.state);

        const { user } = this.state;
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            if (user !== null) {
                                if (user.accountType === "client" || user.accountType === "mechanic") {
                                    this.props.props.navigation.goBack();
                                } else if (user.accountType === "tow-truck-driver") {
                                    this.props.props.navigation.push("tow-truck-driver-online-homepage");
                                }
                            } else {
                                this.props.props.navigation.goBack();
                            }
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Drop-off</Title>
                        <Subtitle>Manage & more...!</Subtitle>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                           this.props.props.navigation.push("homepage-main")
                        }} transparent>
                            <Image source={require("../../../../assets/icons/home.png")} style={[styles.headerIcon, { position: "absolute", right: 20 }]} />
                        </Button>
                    </Right>
                </Header>
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <View style={styles.container}>
                    {this.renderConditional()}
                </View>
                <View>
                    <Dialog.Container visible={this.state.isVisibleAgent}>
                    <Dialog.Title>Complete roadside assistance request?</Dialog.Title>
                    <Dialog.Description>
                        Are you sure you want to complete this order? You cannot undo this action. The other user will also have to mark the trip as complete.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisibleAgent: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisibleAgent: false
                        }, () => {
                            this.handleCompletionTowDriverAgent();
                        })
                    }} label="COMPLETE!" />
                    </Dialog.Container>
                </View>
                <View>
                    <Dialog.Container visible={this.state.isVisibleClient}>
                    <Dialog.Title>Complete roadside assistance request?</Dialog.Title>
                    <Dialog.Description>
                        Are you sure you want to complete this order? You cannot undo this action. The other user will also have to mark the trip as complete.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisibleClient: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisibleClient: false
                        }, () => {
                            this.handleClientSubmission();
                        })
                    }} label="COMPLETE" />
                    </Dialog.Container>
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(ManageUponArrivalDepartureHelper);