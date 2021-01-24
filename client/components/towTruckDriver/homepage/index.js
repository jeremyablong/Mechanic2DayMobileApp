import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image
  } from 'react-native';
import styles from "./styles.js";
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, List, ListItem, Icon } from 'native-base';
import { connect } from 'react-redux';
import axios from "axios";
import { Config } from "react-native-config";

class TowTruckDriverHomepageHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        data: [],
        user: null
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
    render() {
        const { user } = this.state;
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
                        <Title>Quick Links</Title>
                        <Subtitle>Manage jobs, account, and much more...</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <List>
                        <ListItem button={true} onPress={() => {}} itemDivider>
                            <Left>
                                <NativeText>Functionality settings</NativeText>
                            </Left>
                        </ListItem>                    
                        <ListItem button={true} onPress={() => {
                            this.props.props.navigation.push("list-roadside-assistance-queue");
                        }}>
                            <Left>
                                <NativeText><NativeText numberOfLines={2} style={{ color: "blue", fontWeight: "bold" }}>Go online</NativeText> & start making money {"\n"}Make money by towing vehicles and proividing roadside assistance</NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {}}>
                            <Left>
                                <NativeText>Change driver settings</NativeText>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button={true} onPress={() => {
                            if (user.active_roadside_assistance_jobs.current_page === "actively-on-site") {
                                this.props.props.navigation.push("settings-active-roadside-assistance-manage");
                            } else {
                                this.props.props.navigation.push("tow-activated-map-view");
                            }
                        }}>
                            <Left>
                                <NativeText numberOfLines={2} style={{ color: "blue", fontWeight: "bold" }}>Manage an active tow/job {"\n"}<Text style={{ color: "black" }}>This is for active/current jobs</Text></NativeText>
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
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(TowTruckDriverHomepageHelper);