import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title, Text as NativeText } from 'native-base';
import styles from './styles.js';
import { connect } from "react-redux";
import { Config } from "react-native-config";
import axios from "axios";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';

const { height, width } = Dimensions.get("window");

class ManageActiveJobRoadsideAssistanceManageJobHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        user: null,
        roadside: null
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
                    user,
                    roadside: user.active_roadside_assistance_jobs
                })
            } else {
                console.log("Errr", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderConditional = () => {
        const { roadside } = this.state;

        if (roadside !== null && roadside.dropoff_location === "tow-not-required") {
            return (
                <Fragment>
                    <View style={styles.margin}>
                        <Text style={styles.header}>DROP-OFF is NOT required.</Text>
                        <Text style={{ fontSize: 16, fontStyle: "italic" }}>You can manage your job here regarding completing the roadside claim, contact support, and much more...</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.margin}>
                        <AwesomeButtonBlue width={width * 0.90} textColor={"black"} type="secondary" onPress={() => {}}>Complete trip & accept payment</AwesomeButtonBlue>
                        <View style={styles.hr} />
                        <AwesomeButtonBlue width={width * 0.90} textColor={"white"} type="primary" onPress={() => {}}>Contact Support</AwesomeButtonBlue>
                        <View style={styles.hr} />
                        <AwesomeButtonBlue width={width * 0.90} textColor={"black"} type="secondary" onPress={() => {}}>Manage Trip</AwesomeButtonBlue>
                    </View>
                    <View style={styles.hr} />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <View style={styles.margin}>
                        <Text>DROP-OFF is REQUIRED.</Text>    
                    </View>
                    
                </Fragment>
            );
        }
    }
    render() {
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Drop-off</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <NativeText>Cancel</NativeText>
                        </Button>
                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    {this.renderConditional()}
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
export default connect(mapStateToProps, { })(ManageActiveJobRoadsideAssistanceManageJobHelper);