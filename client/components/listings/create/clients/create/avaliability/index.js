import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, PanResponder, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { Header, Left, Button, Title, Text as NativeText } from 'native-base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import styles from './styles.js';
import moment from 'moment';
import axios from "axios";
import { Config } from "react-native-config";
import { connect } from "react-redux";

class AvailablityCreationHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        day: new Date(),
        month: null,
        selectedMonth: null,
        selectedDays: {},
        listing: null
    }
}
    handleTack = () => {

        const { selectedDays } = this.state;
            
        this.setState({
            selectedDays: {
                ...this.state.selectedDays, 
                [this.state.day]: {
                    selected: true
                }
            }
        })
    }
    continueAndProceed = () => {
        console.log("continueAndProceed");

        const days = Object.keys(this.state.selectedDays);

        console.log("days", days);

        const listinggg = this.props.props.route.params.listing;

        axios.post(`${Config.ngrok_url}/update/days/avaliable/list/vehicle`, {
            avaliable_days: days,
            id: this.props.unique_id,
            listing: this.state.listing || listinggg,
            days: this.state.selectedDays
        }).then((res) => {
            if (res.data.message === "Successfully added days to listing!") {
                console.log(res.data);

                const { listing } = res.data;

                this.props.props.navigation.replace("create-vehicle-listing-five", { listing });
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    componentDidMount() {
        const listing = this.props.props.route.params.listing;

        setTimeout(() => {
            axios.post(`${Config.ngrok_url}/gather/listing/specific/vehicle/listing`, {
                listing_id: this.props.props.route.params.listing.id,
                id: this.props.unique_id
            }).then((res) => {
                if (res.data.message === "Successfully gathered listing!") {
                    console.log(res.data);
    
                    const { listing } = res.data;
    
                    this.setState({
                        listing
                    })
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        },  400);
    }
    
    render() {
        console.log("this.state.availablility", this.state);
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.push("providers-listing-homepage");
                        }} transparent>
                            <Image source={require('../../../../../../assets/icons/go-back.png')} style={styles.icon} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -30 }}>Let's select your availability</Title>
                    </Left>
                    
                </Header>
                <View style={styles.container}>
                    <View style={{ margin: 20 }}>
                        <Text>We will now need to select what days you have avaliable time to allow our mechanics to come to your vehicle to make the repair. Please select days that you have at least 4 hours avaliable and our mechanics will choose from these days.</Text>
                        <Button onPress={() => {
                            this.continueAndProceed();
                        }} bordered info style={styles.submitButton}>
                            <NativeText style={{ color: "black" }}>Submit & Continue</NativeText>
                        </Button>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            selectedDays: {}
                        })
                    }}>
                        <Text style={{ fontSize: 18, textAlign: "center", marginTop: 10, marginBottom: 10 }}>Clear Selected Dates / Restart</Text>
                    </TouchableOpacity>
                    <CalendarList   
                        markedDates={this.state.selectedDays}
                        markingType={'multi-period'}
                        firstDay={1}
                        hideDayNames={false}
                        disableAllTouchEventsForDisabledDays={true}
                        // Callback which gets executed when visible months change in scroll view. Default = undefined
                        onVisibleMonthsChange={(months) => {
                            console.log('now these months are visible', months);
                        }}
                        // Max amount of months allowed to scroll to the past. Default = 50
                        // Enable or disable scrolling of calendar list
                        scrollEnabled={true} 
                        minDate={new Date()}
                        // Enable or disable vertical scroll indicator. Default = false
                        showScrollIndicator={true} 
                        onDayPress={(day) => {
                            console.log('selected day', day);

                            this.setState({
                                day: day.dateString
                            }, () => {
                                this.handleTack()
                            })
                        }}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => {
                            console.log('selected day', day);

                            this.setState({
                                longDayPress: day.dateString
                            })
                        }}
                    />
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    };
}
export default connect(mapStateToProps, { })(AvailablityCreationHelper);