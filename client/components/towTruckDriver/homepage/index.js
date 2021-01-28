import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image
  } from 'react-native';
import styles from "./styles.js";
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, List, ListItem, Icon } from 'native-base';
import { connect } from 'react-redux';
import axios from "axios";
import { Config } from "react-native-config";
import Dialog from "react-native-dialog";
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../toastConfig.js";
import _ from "lodash";

class TowTruckDriverHomepageHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        data: [],
        user: null,
        isVisible: false
    }
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {
                console.log("Ta-dah!:", res.data);

                const { user } = res.data;

                this.setState({
                    user
                })
            } else {
                console.log("Errr", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    notifyEmployerOfWork = () => {
        console.log("notifyEmployerOfWork clicked.");

        const { user } = this.state;

        axios.post(`${Config.ngrok_url}/notify/business/activate/account`, {
            company_id: user.company_id,
            id: this.props.unique_id,
            profile_pic: user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].full_url : null,
            fullName: this.props.fullName
        }).then((res) => {
            if (res.data.message === "Successfully notified employer!") {
                console.log(res.data);

                Toast.show({
                    text1: "We've notified your employer!",
                    text2: "Succesfully notified your employer, check back soon for updates!",
                    type: "success",
                    visibilityTime: 4500,
                    position: "top"
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        const { user } = this.state;
        return (
            <View>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.push("homepage-main");
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Quick Links</Title>
                        <Subtitle>Manage jobs, account, and much more...</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <Dialog.Container visible={this.state.isVisible}>
                    <Dialog.Title>You are NOT authorized to take jobs yet!</Dialog.Title>
                    <Dialog.Description>
                        Would you like to notify the employer you registereed under to remind them to activate your account?
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        })
                    }} label="No, Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        }, () => {
                            this.notifyEmployerOfWork();
                        })
                    }}label="NOTIFY!" />
                    </Dialog.Container>
                </View>
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <List>
                        <ListItem button={true} onPress={() => {}} itemDivider>
                            <Left>
                                <NativeText>Functionality settings</NativeText>
                            </Left>
                        </ListItem>                    
                        <ListItem button={true} onPress={() => {
                            if (user.active_employee === true) {
                                this.props.props.navigation.push("list-roadside-assistance-queue");
                            } else {
                                this.setState({
                                    isVisible: true
                                })
                            }
                        }}>
                            <Left>
                                <NativeText><NativeText numberOfLines={2} style={{ color: "blue", fontWeight: "bold" }}>Go online</NativeText> & start making money {"\n"}Make money by towing vehicles and proividing roadside assistance</NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.props.props.navigation.push("roadside-assistance-main-landing");
                        }}>
                            <Left>
                                <NativeText>View Roadside Assistance Homepage</NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            if (user !== null && user.active_employee === true) {
                                if (_.has(user.active_roadside_assistance_job, "current_page") && user.active_roadside_assistance_job.current_page === "actively-on-site") {
                                    this.props.props.navigation.push("settings-active-roadside-assistance-manage");
                                } else if (_.has(user.active_roadside_assistance_job, "current_page") && user.active_roadside_assistance_job.current_page === "final-manage-dropoff") {
                                    this.props.props.navigation.push("driver-has-arrived-manage-listing-depatarture");
                                } else if (_.has(user.active_roadside_assistance_job, "current_page") && user.active_roadside_assistance_job.current_page === "finale-review") {
                                    this.props.props.navigation.push("review-roadside-assistance-client");
                                } else {
                                    this.props.props.navigation.push("tow-activated-map-view");
                                }
                            } else {
                                this.setState({
                                    isVisible: true
                                })
                            }
                        }}>
                            <Left>
                                <NativeText numberOfLines={2} style={{ color: "blue", fontWeight: "bold" }}>Manage an active tow/job {"\n"}<Text style={{ color: "black" }}>This is for active/current jobs</Text></NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            this.props.props.navigation.navigate("associate-with-tow-company");
                        }}>
                            <Left>
                                <NativeText>Associate with tow company</NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>   
                        <ListItem button={true} onPress={() => {}} itemDivider>
                            <NativeText>Payment settings</NativeText>
                        </ListItem>  
                        <ListItem button={true} onPress={() => {}}>
                            <Left>
                                <NativeText>View payment history</NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {}}>
                            <Left>
                                <NativeText>Payment analytics</NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {}} itemDivider>
                            <Left>
                                <NativeText>Profile/settings</NativeText>
                            </Left>
                        </ListItem>  
                        <ListItem button={true} onPress={() => {}}>
                            <Left>
                                <NativeText>Manage tow driver settings</NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {}}>
                            <Left>
                                <NativeText>Payment analytics</NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id,
        fullName: state.auth.authenticated.fullName
    }
}
export default connect(mapStateToProps, { })(TowTruckDriverHomepageHelper);