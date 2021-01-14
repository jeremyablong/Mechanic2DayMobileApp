import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, Keyboard, Dimensions } from 'react-native';
import { Header, Left, Body, Button, Right, Title, Subtitle } from 'native-base';
import styles from './styles.js';
import Autocomplete from "react-native-autocomplete-input";
import GetLocation from 'react-native-get-location';
import axios from "axios";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import { Config } from 'react-native-config';
import { connect } from "react-redux";


const { width, height } = Dimensions.get("window");

class RoadsideAssistanceAddressHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        results: [],
        query: "",
        hideOrNot: true,
        selected: null,
        full: null
    }
}
    handleContinuation = () => {
        console.log("handleContinuation clicked.");

        const { full } = this.state;

        axios.post(`${Config.ngrok_url}/start/listing/location/roadside/assistance`, {
            location: full,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Successfully updated and generated roadside assistance listing!") {
                console.log(res.data);
                
                this.props.props.navigation.replace("roadside-assistance-create-credentials");
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handleSearch = () => {
        const configggg = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Content-Type': 'application/json'
            }
        }
        const { query } = this.state;

        axios.get(`https://api.tomtom.com/search/2/search/${query}.json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV&language=en-US`).then((res) => {
            console.log(res.data);

            const { results } = res.data;

            this.setState({
                results
            })
        }).catch((err) => {
            console.log("ERRRRRRR", err);
        })
    }
    render() {
        console.log("this.state location create roadside assitance", this.state);
        const { results, query, selected } = this.state;
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.goBack();
                        }}>
                            <Image source={require("../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body style={{ left: -80 }}>
                        <Title>Create Listing</Title>
                        <Subtitle>Create roadside assistance listing</Subtitle>
                    </Body>
                </Header>
                <View style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.header}>Tell us more about your roadside assistance company</Text>
                        <View style={styles.hr} />
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ marginBottom: 10, fontWeight: "bold" }}>Enter your company location</Text>
                            <Autocomplete   
                                placeholder={"Search for your location"}
                                placeholderTextColor={"grey"}
                                data={results}
                                defaultValue={query}
                                listStyle={styles.listStyle} 
                                hideResults={this.state.hideOrNot}
                                onChangeText={text => {
                                    console.log(text);
                                    this.setState({ 
                                        query: text,
                                        hideOrNot: false
                                    }, () => {
                                        this.handleSearch();
                                    })
                                }}
                                renderItem={({ item, i }) => (
                                    <TouchableOpacity style={styles.listItemTwo} onPress={() => {
                                        this.setState({
                                            selected: item.address.freeformAddress,
                                            hideOrNot: true,
                                            full: item
                                        }, () => {
                                            Keyboard.dismiss();
                                        })
                                    }}>
                                        <Text style={{ color: "black", fontWeight: "bold" }}>{item.address.freeformAddress}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            {selected !== null ? <View style={{ marginTop: 20 }}>
                                <Text style={styles.selectedArea}>Selected Area</Text>
                                <Text style={styles.selected}>{selected}</Text>
                            </View> : null}
                        </View>
                    </View>
                </View>
                {selected !== null ? <View style={styles.absoluteBottom}>
                    <View style={styles.centered}>
                        <AwesomeButtonRick onPress={this.handleContinuation} width={width * 0.90} type="secondary">Continue</AwesomeButtonRick>
                    </View>
                </View> : null}
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(RoadsideAssistanceAddressHelper);