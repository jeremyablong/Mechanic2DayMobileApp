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


const { height, width } = Dimensions.get("window");

class ManageUponArrivalDepartureHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        isVisible: false,
        user: null
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
                            <AwesomeButtonBlue type={"secondary"} textColor={"black"} onPress={() => {}} width={width * 0.90}>Complete transaction</AwesomeButtonBlue>
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
                            <View style={styles.hr} />
                            <AwesomeButtonBlue type={"secondary"} textColor={"black"} onPress={() => {}} width={width * 0.90}>Complete transaction</AwesomeButtonBlue>
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
                <View style={styles.container}>
                    {this.renderConditional()}
                </View>
                <View>
                    <Dialog.Container visible={this.state.isVisible}>
                    <Dialog.Title>Complete roadside assistance request?</Dialog.Title>
                    <Dialog.Description>
                        Are you sure you want to complete this order? You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
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