import React, { Component, Fragment } from 'react';
import { View, Text, Image, Keyboard } from "react-native";
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, Icon, List, ListItem, Thumbnail } from 'native-base';
import styles from './styles.js';
import { Config } from 'react-native-config';
import axios from "axios";
import Autocomplete from "react-native-autocomplete-input";
import { connect } from "react-redux";
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../toastConfig.js";


class AssociateWithTowCompanyHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        listings: [],
        query: "",
        selected: null,
        hideOrNot: true,
        full: null,
        user: null,
        error: ""
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
            }
        }).catch((err) => {
            console.log(err);
        });


        axios.get(`${Config.ngrok_url}/associate/with/tow/truck/company`).then((res) => {
            if (res.data.message === "Found all the desired listings!" ) {
                console.log(res.data);

                const { listings } = res.data;

                this.setState({
                    listings
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateAlreadyAssociated = (text) => {
        axios.post(`${Config.ngrok_url}/gather/breif/data/two`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Gathered user's data!") {

                const { user } = res.data;

                if (user.company_id || user.employed_by) {
                    this.setState({
                        error: "You've already sent a request or associated with a company. You cannot associate with multiple companies."
                    })
                } else {
                    this.setState({ 
                        query: text,
                        hideOrNot: false
                    })
                }
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    renderConditionalButtons = () => {
        if (this.state.full !== null) {
            return (
                <Fragment>
                    <View style={styles.centered}>
                        <View style={styles.centered}>
                            <Button onPress={this.handleSubmission} style={styles.customButton} success>
                                <NativeText style={{ fontWeight: "bold", color: "white" }}>Continue & Associate</NativeText>
                            </Button>
                        </View>
                    </View>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <View style={styles.centered}>
                        <View style={styles.centered}>
                            <Button style={styles.customButton} light>
                                <NativeText style={{ fontWeight: "bold", color: "white" }}>Continue & Associate</NativeText>
                            </Button>
                        </View>
                    </View>
                </Fragment>
            );
        }
    }
    handleSubmission = () => {
        console.log("handleSubmission clicked");

        const { full } = this.state;

        axios.post(`${Config.ngrok_url}/associate/user/tow/company/send/request`, {
            id: this.props.unique_id,
            company_id: full.poster
        }).then((res) => {
            if (res.data.message === "Associated and notified tow company of your request!") {
                console.log(res.data);

                this.setState({
                   query: "",
                   full: null
                }, () => {
                    Toast.show({
                        text1: "Successfully sent your request!",
                        text2: "Successfully notified your employer asking to be approved to drive...",
                        type: "success",
                        visibilityTime: 4500,
                        position: "top"
                    })
               })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        console.log("associate this.state", this.state);

        const { query, hideOrNot, listings, error } = this.state;
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
                        <Title>Associate Company</Title>
                        <Subtitle>Associate W/Company</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <View style={styles.container}>
                        
                    <View style={styles.margin}>
                        {this.renderConditionalButtons()}
                        <Text style={styles.mainText}>Select the company you work for...</Text>
                            <List>
                            <Autocomplete   
                                containerStyle={styles.inputContainer}
                                data={listings}
                                value={query}
                                placeholderTextColor={"grey"}
                                placeholder={"Search for your company name..."}
                                defaultValue={query} 
                                listStyle={styles.listStyle} 
                                hideResults={hideOrNot}
                                onChangeText={text => {
                                    console.log(text);
                                    
                                    this.calculateAlreadyAssociated(text);
                                }}
                                renderItem={({ item, i }) => {
                                    console.log("item", item);
                                    if (item.live === true) {
                                        if (item.company_name.toLowerCase().includes(query.toLowerCase())) {
                                            return (
                                                <ListItem button={true} onPress={() => {
                                                    this.setState({
                                                        selected: item.company_name,
                                                        hideOrNot: true,
                                                        full: item
                                                    }, () => {
                                                        Keyboard.dismiss();
                                                    })
                                                }} avatar>
                                                    <Left>
                                                        <Thumbnail source={{ uri: item.company_image }} />
                                                    </Left>
                                                    <Body>
                                                        <NativeText>{item.company_name}</NativeText>
                                                        <NativeText style={{ color: "grey" }}>{item.location.address.freeformAddress}</NativeText>
                                                        <NativeText style={{ color: "black" }}>{item.company_phone_number}</NativeText>
                                                    </Body>                                            
                                                </ListItem>
                                            );  
                                        }  
                                    }                                
                                }}
                            />
                        </List>
                        <View style={styles.margin}>
                            {typeof error !== "undefined" && error.length > 0 ? <Text style={styles.errorText}>{error}</Text> : null}
                        </View>
                    </View>
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
export default connect(mapStateToProps, { })(AssociateWithTowCompanyHelper);