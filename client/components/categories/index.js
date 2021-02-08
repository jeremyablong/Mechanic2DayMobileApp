import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Button, Icon, Title, Card, CardItem, Thumbnail, Text as NativeText } from 'native-base';
import FooterHelper from "../../components/footer/footer.js";
import ReadMore from 'react-native-read-more-text';
import axios from "axios";
import { Config } from 'react-native-config';
import Gallery from 'react-native-image-gallery';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import _ from 'lodash';

const { height, width } = Dimensions.get("window");

class CategoriesMainHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        data: []
    }
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/category/listings`, {
            params: {
                type: this.props.props.route.params.type
            }
        }).then((res) => {
            if (res.data.message === "Gathered the selected category!") {
                console.log(res.data);

                const { results } = res.data;

                this.setState({
                    data: results
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    
    calculateType = (type) => {
        switch (type) {
            case "body-work":
                return "Body Work & Modifications"
                break;
            case "motorcycle/motorbike": 
                return "Motorcycle's & Motorbike Repairs";
                break;
            case "deisel":
                return "Deisel Repairs & Modifications"
                break;
            case "speciality-repairs": 
                return "Speciality Repairs e.g. BMW";
                break;
            case "tuning-sports-upgrades":
                return "Tuning/Sports Upgrades"
                break;
            case "electronics/electrical": 
                return "Electronics/Electrical Repairs";
                break;
            case "interior-repair-design":
                return "Interior Repair/Design"
                break;
            case "tire-breaks-wheels": 
                return "Tire & Brake Repairs";
                break;
            case "exhaust":
                return "Exhaust Repair & Modification"
                break;
            case "maintenance": 
                return "General Maintenance";
                break;
            case "engine":
                return "Engine Repair & Maintenance"
                break;
            case "transmission": 
                return "Transmission Repair";
                break;
            default:
                break;
        }
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{ color: "blue", fontSize: 18, marginTop: 5}} onPress={handlePress}>
            Read more
          </Text>
        );
    }
     
    _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{ color: "blue", fontSize: 18, marginTop: 5}} onPress={handlePress}>
            Show less
          </Text>
        );
    }
    renderSwitchImages = (photos) => {
        console.log("photos", photos.length);

        switch (photos.length) {
            case 1:
                return (
                    [
                        { source: { uri: photos[0] } }
                    ]
                );
                break;
            case 2:
                return (
                    [
                        { source: { uri: photos[0] } },
                        { source: { uri: photos[1] } }
                    ]
                );
                break;
            case 3:
                return (
                    [
                        { source: { uri: photos[0] } },
                        { source: { uri: photos[1] } },
                        { source: { uri: photos[2] } }
                    ]
                );
                break;
            case 4:
                return (
                    [
                        { source: { uri: photos[0] } },
                        { source: { uri: photos[1] } },
                        { source: { uri: photos[2] } },
                        { source: { uri: photos[3] } }
                    ]
                );
                break;
            case 5:
                return (
                    [
                        { source: { uri: photos[0] } },
                        { source: { uri: photos[1] } },
                        { source: { uri: photos[2] } },
                        { source: { uri: photos[3] } },
                        { source: { uri: photos[4] } }
                    ]
                );
                break;
            case 6:
                return (
                    [
                        { source: { uri: photos[0] } },
                        { source: { uri: photos[1] } },
                        { source: { uri: photos[2] } },
                        { source: { uri: photos[3] } },
                        { source: { uri: photos[4] } },
                        { source: { uri: photos[5] } }
                    ]
                );
                break;
            default:
                break;
        }
    }
    render() {
        console.log("this.props categories main helper", this.props);

        const TYPE = this.props.props.route.params.type;

        const { data } = this.state;

        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image style={styles.headerIcon} source={require('../../assets/icons/go-back.png')} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -15 }}>{this.calculateType(TYPE)}</Title>
                    </Left>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 200 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>{this.state.data.length}+ Vehicles availiable for repair</Text>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut consequat lorem. Duis at quam quis.</Text>
                    </View>
                    <View style={styles.margin}>
                        {typeof data !== "undefined" && data.length > 0 ? data.map((listing, index) => {
                            console.log("listing", listing);
                            return (
                                <Fragment>
                                    <Card style={styles.cardie}>
                                        <CardItem>
                                            <Left>
                                                <Thumbnail source={require("../../assets/images/placeholder.png")} />
                                                <Body>
                                                    <Text>{`${listing.year} ${listing.make} ${listing.model}`}</Text>
                                                    <Text>{listing.title}</Text>
                                                </Body>
                                            </Left>
                                            </CardItem>
                                            <CardItem>
                                            <Body>
                                                <Gallery
                                                    style={{ height: 250, width: "100%", flex: 1 }}
                                                    images={this.renderSwitchImages(listing.photos)}
                                                />
                                                <View style={{ marginTop: 10 }}>
                                                    <View style={{ marginBottom: 15, flexDirection: "row" }}>
                                                        <Image source={require("../../assets/icons/small-star.png")} style={styles.starIcon} />
                                                        <Text style={styles.reviewText}> 4.92 (76)</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.cardText}><Text style={{ color: "blue", fontWeight: "bold"}}>{_.has(listing, "applicants_proposals") && listing.applicants_proposals.length ? listing.applicants_proposals.length : 0}</Text> person(s) have already applied</Text>
                                                    </View>
                                                    <View style={styles.hr} />
                                                    <ReadMore
                                                        numberOfLines={3}
                                                        renderTruncatedFooter={this._renderTruncatedFooter}
                                                        renderRevealedFooter={this._renderRevealedFooter}
                                                        onReady={this._handleTextReady}>
                                                        <Text style={styles.cardText}>
                                                            {listing.description}
                                                        </Text>
                                                    </ReadMore>
                                                </View>
                                            </Body>
                                            </CardItem>
                                            <CardItem>
                                            <Left>
                                                <Button transparent textStyle={{ color: '#87838B' }}>
                                               
                                                <Text style={{ fontSize: 24 }}><Text style={{ fontWeight: "bold" }}>Budget:</Text> ${Math.floor(Math.random() * 500) + 1}</Text>
                                                </Button>
                                            </Left>
                                        </CardItem>
                                    </Card>
                                </Fragment>
                            );
                        }) : <SkeletonPlaceholder>
                                <View style={{ width: "100%", height: 250 }}>

                                </View>
                                <View style={{ marginTop: 30 }} />
                                <View style={{ width: "100%", height: 250 }}>

                                </View>
                                <View style={{ marginTop: 30 }} />
                                <View style={{ width: "100%", height: 250 }}>

                                </View>
                                <View style={{ marginTop: 30 }} />
                                <View style={{ width: "100%", height: 250 }}>

                                </View>
                                <View style={{ marginTop: 30 }} />
                                <View style={{ width: "100%", height: 250 }}>

                                </View>
                                <View style={{ marginTop: 30 }} />
                                <View style={{ width: "100%", height: 250 }}>

                                </View>
                                <View style={{ marginTop: 30 }} />
                                <View style={{ width: "100%", height: 250 }}>

                                </View>
                                <View style={{ marginTop: 30 }} />
                                <View style={{ width: "100%", height: 250 }}>

                                </View>
                                <View style={{ marginTop: 30 }} />
                            </SkeletonPlaceholder>}
                    </View>
                </ScrollView>
                <View style={styles.bottom}>
                    <FooterHelper props={this.props.props} />
                </View>
            </Fragment>
        )
    }
}
export default CategoriesMainHelper;