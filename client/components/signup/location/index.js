import React, { Component, Fragment } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Keyboard, Dimensions } from "react-native";
import styles from "./styles.js";
import Config from "react-native-config";
import Autocomplete from "react-native-autocomplete-input";
import axios from "axios";
import { Button, Text as NativeText } from "native-base";
import { authenticated } from "../../../actions/signup/auth.js";
import { connect } from "react-redux";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


const { width, height } = Dimensions.get("window");

class LocationCreateHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        results: [],
        query: "",
        selected: "",
        hideOrNot: false,
        full: null
    }
}
    handleSearch = () => {
        const configggg = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Content-Type': 'application/json'
            }
        }
        axios.get(`https://api.tomtom.com/search/2/search/${this.state.query}.json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV&language=en-US`).then((res) => {
            console.log(res.data);

            const { results } = res.data;

            this.setState({
                results
            })
        }).catch((err) => {
            console.log("ERRRRRRR", err);
        })
    }
    continueToNextPage = () => {

        const { selected, full } = this.state;

        this.props.authenticated({
            ...this.props.previous, address: selected, wholeAddress: full, page: 7
        })
        
        setTimeout(() => {
            this.props.props.navigation.navigate("mechanic-or-client");
        },  500);
    }
    renderConditional = () => {
        const { selected } = this.state;

        if (typeof selected !== "undefined" && selected.length > 0) {
            return (
                <View style={styles.btnContainer}>
                    <AwesomeButtonBlue stretch={true} style={{ marginTop: 10, marginBottom: 10 }} onPress={() => {
                        this.continueToNextPage();
                    }} type={"secondary"}>Continue</AwesomeButtonBlue>
                </View>
            );
        } 
    }
    render() {
        const { query, results } = this.state;
        return (
            <Fragment>
                <ImageBackground source={require("../../../assets/images/white-wood.jpg")} style={styles.background}>
                    <View style={styles.container}>
                        {/* <View style={styles.imgContainer}>
                            <Image source={require("../../../assets/icons/world.png")} style={styles.image} />
                        </View> */}
                        <View style={styles.textBox}>
                            <Text style={styles.titleText}>Please type and select your address - This is private information and will not be shared with anyone.</Text>
                        </View>
                        <Autocomplete   
                            containerStyle={styles.inputContainer}
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
                            renderItem={({ item, i }) => {
                                if (item.type === "Point Address") {
                                    return (
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
                                    );    
                                }
                                
                            }}
                        />
                        <View style={styles.bottom}>
                            {this.renderConditional()}
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.props.props.navigation.navigate("gender-selection");
                    }}>
                        <Text style={[styles.goBack, { marginBottom: 25 }]}>Go Back...</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        previous: state.auth.authenticated
    }
}
export default connect(mapStateToProps, { authenticated })(LocationCreateHelper);