import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Title, Text as NativeText } from 'native-base';
import Gallery from 'react-native-image-gallery';
import ReadMore from 'react-native-read-more-text';
import { Config } from 'react-native-config';
import axios from "axios";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import _ from "lodash";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


const { height, width } = Dimensions.get("window");

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla lorem, dictum id metus at, euismod bibendum felis. Donec molestie varius ornare. Etiam suscipit fringilla diam non scelerisque. Proin vel enim sed leo hendrerit molestie. Cras rutrum lectus eu ultrices venenatis. Sed vitae fringilla lectus. Aenean ac sem eros. Sed tempor convallis ex et pellentesque. Nam sed felis finibus, eleifend ante at, posuere lacus. Maecenas vehicula mollis nib";

class MechanicListingHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        user: null,
        profilePics: [],
        ready: false,
        location: ""
    }
}
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: "blue", marginTop: 5, fontSize: 18 }} onPress={handlePress}>
                Read more
            </Text>
        );
    }
    
    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: "blue", marginTop: 5, fontSize: 18 }} onPress={handlePress}>
                Show less
            </Text>
        );
    }
    componentDidMount() {
        const mechanic = this.props.props.route.params.mechanic;

        console.log("mechanic", mechanic);

        axios.post(`${Config.ngrok_url}/gather/breif/data/two`, {
            id: mechanic.unique_id
        }).then((res) => {
            if (res.data.message === "Gathered user's data!") {
                console.log("RES.data:", res.data);

                const { user } = res.data;

                const headers = {
                    params: {
                        key: Config.mapquest_api_key,
                        location: `${user.current_location.coords.latitude},${user.current_location.coords.longitude}`
                    }
                };

                axios.get("http://www.mapquestapi.com/geocoding/v1/reverse", headers).then((res) => {
                    console.log(res.data);

                    if (res.data) {
                        this.setState({
                            location: `${res.data.results[0].locations[0].adminArea5}, ${res.data.results[0].locations[0].adminArea3} ${res.data.results[0].locations[0].adminArea1 === "US" ? "United States" : res.data.results[0].locations[0].adminArea1}`
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                })

                if (user.profilePics.length > 0) {
                    const reversed = user.profilePics.reverse();
                    for (let index = 0; index < reversed.length; index++) {
                        const picture = reversed[index];
                        
                        if ((reversed.length - 1) === index) {
                            this.setState({
                                profilePics: [...this.state.profilePics, { source: { uri: picture.full_url } }],
                                ready: true,
                                user
                            })
                        } else {
                            this.setState({
                                profilePics: [...this.state.profilePics, { source: { uri: picture.full_url } }],
                                user
                            })
                        }
                    }
                } else {
                    this.setState({
                        user,
                        profilePics: [{ source: { uri: Config.not_available } }],
                        ready: true
                    })
                }
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    
    }
    calculateReviewRating = () => {
        const { user } = this.state;

        let total = 0;

        if (_.has(user, "review_categories")) {
            for (const key in user.review_categories) {
                const num = user.review_categories[key];

                total = total + (num / user.review_count);
            }
            return (total / 7).toFixed(1);
        } else {
            return "5.0";
        }
    }
    renderContent = () => {
        const { ready, user } = this.state;

        const title = "Mechanic for hire with transmission & engine speciality";

        if (ready === true) {
            return (
                <View style={styles.margin}>
                    <Text style={styles.heading1}>{title.slice(0, 40)}{title.length > 40 ? "..." : ""}</Text>
                    <View style={[styles.row, { marginTop: 10 }]}>
                        <Image style={styles.starSmall} source={require("../../../assets/icons/small-star.png")} />
                        <Text>{this.calculateReviewRating(user.review_count)} ({user.review_count}) Review(s)  ~</Text>
                        <Text style={styles.location}>{this.state.location}</Text>
                    </View>
                    <View style={[styles.row, { marginTop: 10 }]}>
                        <Text>Part of our <Text style={styles.underline}>"Highly Ranked"</Text> community of mechanics</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.row}>
                        <View style={styles.largeColumn}>
                            <Text style={styles.heading1}>Mechanic Profile Hosted By {user.fullName}</Text>
                        </View>
                        <View style={styles.smallColumn}>
                            <Image style={styles.profilePicOne} source={{ uri: user.profilePics !== "undefined" && user.profilePics.length > 0 ? user.profilePics[user.profilePics.length - 1].full_url : Config.not_available }} />
                        </View>
                    </View>
                    <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>Occupation - {user !== null && _.has(user, "general_information") && _.has(user.general_information, "work") ? user.general_information.work : "-----------------------"}</Text>
                    <View style={{ marginTop: 25 }}>
                        <ReadMore
                            numberOfLines={3}
                            renderTruncatedFooter={this._renderTruncatedFooter}
                            renderRevealedFooter={this._renderRevealedFooter}
                            onReady={this._handleTextReady}>
                                <Text style={styles.cardText}>
                                    {user !== null && _.has(user, "general_information") ? user.general_information.about_me : "-----------------------"}
                                </Text>
                        </ReadMore>
                    </View>
                    <View style={{ marginTop: 15 }}>

                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.margin}>
                    <SkeletonPlaceholder>
                        <View style={styles.skelatonBox} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 15 }} />
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.50, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 15 }} />
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.50, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 15 }} />
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.50, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 15 }} />
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.50, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 15 }} />
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                            <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: width * 0.50, height: 20, borderRadius: 4 }}
                            />
                            </View>
                        </View>
                    </SkeletonPlaceholder>
                </View>
            );
        }
    }
    handleBooking = () => {
        console.log("handleBooking clicked.");
    }
    render() {
        const { ready } = this.state;
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require('../../../assets/icons/go-back.png')} style={styles.icon} />
                        </Button>
                        <Title style={{ marginTop: 6 }}>Mechanic(s) for hire</Title>
                    </Left>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    {ready === true ? <Gallery
                        style={{ flex: 1, minHeight: 250, maxHeight: 250, backgroundColor: 'black' }}
                        images={this.state.profilePics}
                    /> : null}
                    {this.renderContent()}
                </ScrollView>
                <View style={styles.bottomRowAbsolute}>
                    <AwesomeButtonBlue stretch={true} onPress={this.handleBooking} type={"secondary"}>Book this mechanic</AwesomeButtonBlue>
                </View>
            </Fragment>
        )
    }
}
export default MechanicListingHelper;