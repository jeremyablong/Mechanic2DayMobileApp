import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Left, Button, Title, Text as NativeText, Picker } from 'native-base';
import styles from './styles.js';
import { connect } from "react-redux";
import { Config } from "react-native-config";
import axios from "axios";

class PricingAdjustmentHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        selected: 0,
        repair_timespan: 0,
        min_reviews: null,
        listing: null,
        type_of_repair: null
    }
}
    onValueChange = (value) => {
        this.setState({
            selected: value
        });
    }
    submitAndContinue = () => {
        console.log("submitAndContinue clicked...!");

        const { min_reviews, repair_timespan, selected, type_of_repair } = this.state;

        const listinggg = this.props.props.route.params.listing;

        axios.post(`${Config.ngrok_url}/finale/post/broken/vehicle/make/live`, {
            selected,
            repair_timespan,
            min_reviews,
            listing: this.state.listing || listinggg,
            id: this.props.unique_id,
            type_of_repair
        }).then((res) => {
            if (res.data.message === "Successfully posted item, listing is now public!") {
                console.log(res.data);

                this.props.props.navigation.navigate("homepage-main");
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderButtons = () => {
        const { selected, repair_timespan, min_reviews } = this.state;

        if (selected !== 0 && repair_timespan !== 0 && min_reviews !== null) {
            return (
                <Fragment>
                    <Button info style={styles.buttonSpecial} onPress={() => {
                        this.submitAndContinue();
                    }}>
                        <NativeText style={{ color: "white", fontWeight: "bold" }}>Post Listing!</NativeText>
                    </Button>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Button info style={styles.greyButton}>
                        <NativeText style={{ color: "white", fontWeight: "bold" }}>Post Listing!</NativeText>
                    </Button>
                </Fragment>
            );
        }
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
        console.log("this.state pricing index.js", this.state);
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.push("providers-listing-homepage");
                        }} transparent>
                            <Image source={require('../../../../../../assets/icons/go-back.png')} style={styles.icon} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -30 }}>Price Range & Who can apply</Title>
                    </Left>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={styles.mediumText}>Select how much you'd like to budget for your repair</Text>
                        <Picker 
                            placeholder={"Select your ballpark budget..."} 
                            placeholderTextColor={"grey"}
                            note
                            mode="dropdown"
                            style={styles.picker}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange}
                            >
                                <Picker.Item label="$50-USD" value={50} />
                                <Picker.Item label="$100-USD" value={100} />
                                <Picker.Item label="$150-USD" value={150} />
                                <Picker.Item label="$200-USD" value={200} />
                                <Picker.Item label="$250-USD" value={250} />
                                <Picker.Item label="$300-USD" value={300} />
                                <Picker.Item label="$350-USD" value={350} />
                                <Picker.Item label="$400-USD" value={400} />
                                <Picker.Item label="$450-USD" value={450} />
                                <Picker.Item label="$500-USD" value={500} />
                                <Picker.Item label="$550-USD" value={550} />
                                <Picker.Item label="$600-USD" value={600} />
                                <Picker.Item label="$650-USD" value={650} />
                                <Picker.Item label="$700-USD" value={700} />
                                <Picker.Item label="$750-USD" value={750} />
                                <Picker.Item label="$800-USD" value={800} />
                                <Picker.Item label="$850-USD" value={850} />
                                <Picker.Item label="$900-USD" value={900} />
                                <Picker.Item label="$950-USD" value={950} />
                                <Picker.Item label="$1000-USD" value={1000} />
                                <Picker.Item label="$1250-USD" value={1250} />
                                <Picker.Item label="$1500-USD" value={1500} />
                                <Picker.Item label="$2000-USD" value={2000} />
                        </Picker>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.margin}>
                        <Text style={styles.mediumText}>How many reviews must a mechanic have to apply to your listing?</Text>
                        <Picker 
                            placeholder={"Select your minimum amount of reviews to apply..."} 
                            placeholderTextColor={"grey"}
                            note
                            mode="dropdown"
                            style={styles.picker}
                            selectedValue={this.state.min_reviews}
                            onValueChange={(value) => {
                                this.setState({
                                    min_reviews: value
                                })
                            }}
                            >
                                <Picker.Item label={"0 Reviews"} value={0} />
                                <Picker.Item label={"1 Review"} value={1} />
                                <Picker.Item label={"2 Reviews"} value={2} />
                                <Picker.Item label={"3 Reviews"} value={3} />
                                <Picker.Item label={"4 Reviews"} value={4} />
                                <Picker.Item label={"5 Reviews"} value={5} />
                                <Picker.Item label={"6 Reviews"} value={6} />
                                <Picker.Item label={"7 Reviews"} value={7} />
                                <Picker.Item label={"8 Reviews"} value={8} />
                                <Picker.Item label={"9 Reviews"} value={9} />
                                <Picker.Item label={"10 Reviews"} value={10} />
                        </Picker>
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.mediumText}>How urgent is this repair? When is the earliest you'd like it repaired?</Text>
                        <Picker 
                            placeholder={"I would like this repaired within..."} 
                            placeholderTextColor={"grey"}
                            note
                            mode="dropdown"
                            style={styles.picker}
                            selectedValue={this.state.repair_timespan}
                            onValueChange={(value) => {
                                this.setState({
                                    repair_timespan: value
                                })
                            }}
                            >
                                <Picker.Item label={"1 Day"} value={1} />
                                <Picker.Item label={"2 Days"} value={2} />
                                <Picker.Item label={"3 Days"} value={3} />
                                <Picker.Item label={"4 Days"} value={4} />
                                <Picker.Item label={"5 Days"} value={5} />
                                <Picker.Item label={"6 Days"} value={6} />
                                <Picker.Item label={"7 Days"} value={7} />
                                <Picker.Item label={"8 Days"} value={8} />
                                <Picker.Item label={"9 Days"} value={9} />
                                <Picker.Item label={"10 Days"} value={10} />
                                <Picker.Item label={"11 Days"} value={11} />
                                <Picker.Item label={"12 Days"} value={12} />
                                <Picker.Item label={"13 Days"} value={13} />
                                <Picker.Item label={"14 Days"} value={14} />
                        </Picker>
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.mediumText}>How urgent is this repair? When is the earliest you'd like it repaired?</Text>
                        <Picker 
                            placeholder={"Select the TYPE of repair you need..."} 
                            placeholderTextColor={"grey"}
                            note
                            mode="dropdown"
                            style={styles.picker}
                            selectedValue={this.state.type_of_repair}
                            onValueChange={(value) => {
                                this.setState({
                                    type_of_repair: value
                                })
                            }}
                            >
                                <Picker.Item label={"Engine Repair"} value={"engine"} />
                                <Picker.Item label={"Transmission Repair"} value={"transmission"} />
                                <Picker.Item label={"Exhaust Repair"} value={"exhaust"} />
                                <Picker.Item label={"Maintenance"} value={"maintenance"} />
                                <Picker.Item label={"Tire/Breaks & Wheel Related Repair"} value={"tire-breaks-wheels"} />
                                <Picker.Item label={"Interior Design/Repair"} value={"interior-repair-design"} />
                                <Picker.Item label={"Electronics/Electrical"} value={"electronics/electrical"} />
                                <Picker.Item label={"Tuning/Sports Upgrades"} value={"tuning-sports-upgrades"} />
                                <Picker.Item label={"Speciality Repairs (BMW, Audi, Etc..)"} value={"speciality-repairs"} />
                                <Picker.Item label={"Diesel Repair"} value={"deisel"} />
                                <Picker.Item label={"Body Work"} value={"body-work"} />
                                <Picker.Item label={"Motorcyles/Motorbike"} value={"motorcycle/motorbike"} />
                        </Picker>
                    </View>
                    <View style={styles.marginCentered}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Clicking the button below will make your listing visibile and live to the public.</Text>
                        {this.renderButtons()}
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    };
}
export default connect(mapStateToProps, { })(PricingAdjustmentHelper);