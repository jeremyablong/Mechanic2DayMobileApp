import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Right, Title, Subtitle, Button, Text as NativeText, Form, Item, Input, Label, Picker } from 'native-base';
import axios from "axios";
import { Config } from "react-native-config";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-number-input";



const timessss = ["12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm"]

class GeneralInfoRoadsideAssistanceCreateHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        owner: "",
        owners: [],
        selected: "",
        companyName: "",
        phoneNumber: "",
        mondayClosing: null,
        mondayOpening: null,
        tuesdayOpening: null,
        tuesdayClosing: null,
        wednesdayOpening: null,
        wednesdayClosing: null,
        thursdayOpening: null,
        thursdayClosing: null,
        fridayOpening: null,
        fridayClosing: null,
        saturdayOpening: null,
        saturdayClosing: null,
        sundayOpening: null,
        sundayClosing: null
    }
}
    addToList =  () => {
        console.log("addToList");
        
        this.setState({
            owners: [...this.state.owners, this.state.owner],
            owner: ""
        })
    }
    delete = () => {
        const { selected } = this.state;

        this.setState({
            owners: this.state.owners.filter((item) => {
                if (selected !== item) {
                    return item;
                }
            })
        })
    }
    handleSubmissionGeneralDetails = () => {
        console.log("handleSubmissionGeneralDetails clicked.");

        const { mondayClosing, tuesdayOpening, tuesdayClosing, wednesdayOpening, wednesdayClosing, thursdayOpening, thursdayClosing, fridayOpening, fridayClosing, mondayOpening, saturdayOpening, saturdayClosing, sundayOpening, sundayClosing, owners, companyName, phoneNumber } = this.state;

        const passed_listing = this.props.props.route.params.listing;
        
        axios.post(`${Config.ngrok_url}/update/listing/roadside/assistance/general/details`, {
            mondayClosing, 
            tuesdayOpening, 
            tuesdayClosing, 
            wednesdayOpening, 
            wednesdayClosing, 
            thursdayOpening, 
            thursdayClosing, 
            fridayOpening, 
            fridayClosing, 
            mondayOpening, 
            saturdayOpening, 
            saturdayClosing, 
            sundayOpening, 
            sundayClosing, 
            owners, 
            companyName, 
            phoneNumber,
            id: this.props.unique_id,
            passed_listing_id: passed_listing.id
        }).then((res) => {
            if (res.data.message === "Successfully updated general listing information!") {
                console.log(res.data);

                const { listing } = res.data;

                this.props.props.navigation.replace("roadside-assistance-pricing", { listing });
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateWhetherToShow = () => {
        const { mondayClosing, tuesdayOpening, tuesdayClosing, wednesdayOpening, wednesdayClosing, thursdayOpening, thursdayClosing, fridayOpening, fridayClosing, mondayOpening, saturdayOpening, saturdayClosing, sundayOpening, sundayClosing, owners, companyName, phoneNumber } = this.state;



        if (mondayClosing !== null && mondayOpening !== null && tuesdayOpening !== null && tuesdayClosing !== null && wednesdayOpening !== null && wednesdayClosing !== null && thursdayOpening !== null && thursdayClosing !== null && fridayOpening !== null && fridayClosing && saturdayOpening !== null && saturdayClosing !== null && sundayOpening !== null && sundayClosing !== null && (typeof owners !== "undefined" && owners.length > 0) && (typeof phoneNumber !== "undefined" && phoneNumber.length > 0) && (typeof companyName !== "undefined" && companyName.length > 0)) {
            return false;
        } else {
            return true;
        }
    }
    render() {
        const { owners } = this.state;

        console.log("this.,statteeee generalInfo", this.state);
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.push("roadside-assistance-display-listings");
                        }}>
                            <Image source={require("../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body style={{ left: -80 }}>
                        <Title>General Details</Title>
                        <Subtitle>Owners, title & more...</Subtitle>
                    </Body>
               
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <View style={styles.threeSideMargin}>
                        <Text style={styles.companyNames}>Enter your company owner's names</Text>
                    </View>
                    <View style={[styles.margin, { flexDirection: "row" }]}>
                    <Form>
                        <Item style={styles.item} floatingLabel>
                            <Label>Owner Name</Label>
                            <Input value={this.state.owner} onChangeText={(value) => {
                                this.setState({
                                    owner: value
                                })
                            }} />
                        </Item>
                    </Form>
                    <TouchableOpacity style={{ position: "absolute", right: 20, top: 25 }} onPress={this.addToList}>
                        <Image source={require("../../../../../assets/icons/submit.png")} style={styles.headerIcon} />
                    </TouchableOpacity>
                    </View>
                    <View style={styles.margin}>
                    
                        {typeof owners !== "undefined" && owners.length > 0 ? owners.map((owner, index) => {
                            return (
                               <View key={index} style={{ flexDirection: "row", maxHeight: 40 }}>
                                    <Text style={styles.textDriver}>{owner}</Text>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            selected: owner
                                        }, () => {
                                            this.delete(owner);
                                        })
                                    }}>
                                        <Image source={require("../../../../../assets/icons/blue-x.png")} style={styles.headerIcon} />
                                    </TouchableOpacity>
                               </View>
                            );
                        }) : null}
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.margin}>
                        <Form>
                            <Item style={styles.itemFull} floatingLabel>
                                <Label>Company Name</Label>
                                <Input value={this.state.companyName} onChangeText={(value) => {
                                    this.setState({
                                        companyName: value
                                    })
                                }} />
                            </Item>
                            <View style={{ marginTop: 30 }}>
                                <PhoneInput
                                    ref={(ref) => this.phoneInput = ref}
                                    defaultValue={this.state.phoneNumber}
                                    defaultCode="US"
                                    layout="first"
                                    onChangeText={(text) => {
                                        this.setState({
                                            phoneNumber: text
                                        })
                                    }}
                                    onChangeFormattedText={(text) => {
                                        this.setState({
                                            formattedPhoneNumber: text
                                        })
                                    }}
                                    withDarkTheme
                                    withShadow
                                />
                            </View>
                        </Form>
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.mainText}>Enter your standard business & operating hours</Text>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Monday - Opening Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.mondayOpening}
                                    onValueChange={(value) => {
                                        this.setState({
                                            mondayOpening: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Monday - Closing Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.mondayClosing}
                                    onValueChange={(value) => {
                                        this.setState({
                                            mondayClosing: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Tuesday - Opening Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.tuesdayOpening}
                                    onValueChange={(value) => {
                                        this.setState({
                                            tuesdayOpening: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Tuesday - Closing Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.tuesdayClosing}
                                    onValueChange={(value) => {
                                        this.setState({
                                            tuesdayClosing: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Wednesday - Opening Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.wednesdayOpening}
                                    onValueChange={(value) => {
                                        this.setState({
                                            wednesdayOpening: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Wednesday - Closing Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.wednesdayClosing}
                                    onValueChange={(value) => {
                                        this.setState({
                                            wednesdayClosing: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Thursday - Opening Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.thursdayOpening}
                                    onValueChange={(value) => {
                                        this.setState({
                                            thursdayOpening: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Thursday - Closing Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.thursdayClosing}
                                    onValueChange={(value) => {
                                        this.setState({
                                            thursdayClosing: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Friday - Opening Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.fridayOpening}
                                    onValueChange={(value) => {
                                        this.setState({
                                            fridayOpening: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Friday - Closing Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.fridayClosing}
                                    onValueChange={(value) => {
                                        this.setState({
                                            fridayClosing: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Saturday - Opening Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.saturdayOpening}
                                    onValueChange={(value) => {
                                        this.setState({
                                            saturdayOpening: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Saturday - Closing Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.saturdayClosing}
                                    onValueChange={(value) => {
                                        this.setState({
                                            saturdayClosing: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Sunday - Opening Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.sundayOpening}
                                    onValueChange={(value) => {
                                        this.setState({
                                            sundayOpening: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.minorMargin}>
                                <Picker 
                                    placeholderTextColor={"grey"}
                                    placeholder={"Sunday - Closing Time"}
                                    note
                                    mode="dropdown"
                                    style={styles.selector}
                                    selectedValue={this.state.sundayClosing}
                                    onValueChange={(value) => {
                                        this.setState({
                                            sundayClosing: value
                                        })
                                    }}
                                >
                                    {timessss.map((time, index) => {
                                        return <Picker.Item label={time} value={time} />
                                    })}
                                </Picker>
                            </View>
                    </View>
                    <View style={styles.margin}>
                        <View style={styles.centered}>
                            <View style={styles.centered}>
                                {this.calculateWhetherToShow() ? <Button light style={styles.myCustomBtn}>
                                    <NativeText style={{ fontWeight: "bold", color: "white" }}>Submit & Continue</NativeText>
                                </Button> : <Button success onPress={this.handleSubmissionGeneralDetails} style={styles.myCustomBtn}>
                                    <NativeText style={{ fontWeight: "bold", color: "white" }}>Submit & Continue</NativeText>
                                </Button>}
                            </View>
                        </View>
                    </View>
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
export default connect(mapStateToProps, { })(GeneralInfoRoadsideAssistanceCreateHelper);