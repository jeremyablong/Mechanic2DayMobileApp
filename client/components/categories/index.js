import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import styles from './styles.js';
import { Header, Left, Body, Right, Button, Icon, Title, Card, CardItem, Thumbnail, Text as NativeText } from 'native-base';
import FooterHelper from "../../components/footer/footer.js";
import ReadMore from 'react-native-read-more-text';


class CategoriesMainHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        data: [{
            title: "This is the title one",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut consequat lorem. Duis at quam quis nisl feugiat laoreet nec quis orci. Quisque consequat feugiat dui, non laoreet ligula consequat vitae. In hac habitasse platea dictumst. Pellentesque sodales nisl nibh, nec molestie arcu finibus vitae. ",
            image: require("../../assets/images/broken-1.jpg")
        }, {
            title: "This is the title two",
            description: "Mauris congue, neque et laoreet dignissim, arcu ipsum viverra sem, nec sollicitudin diam dolor id mi. Mauris eros erat, efficitur euismod arcu vel, luctus congue odio. Quisque et faucibus velit. Nunc tempus tortor at orci convallis mattis. Quisque pellentesque nunc urna, ut auctor nisl sollicitudin ac. Duis non tellus eu elit posuere aliquet. Nulla porttitor eros pellentesque venenatis viverra. Aliquam dictum nisi ut congue egestas. Morbi pharetra libero ac eros mollis volutpat.",
            image: require("../../assets/images/broken-2.jpg")
        }, {
            title: "This is the title three",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut consequat lorem. Duis at quam quis nisl feugiat laoreet nec quis orci. Quisque consequat feugiat dui, non laoreet ligula consequat vitae. In hac habitasse platea dictumst. Pellentesque sodales nisl nibh, nec molestie arcu finibus vitae. ",
            image: require("../../assets/images/broken-3.jpg")
        }, {
            title: "This is the title four",
            description: "Mauris congue, neque et laoreet dignissim, arcu ipsum viverra sem, nec sollicitudin diam dolor id mi. Mauris eros erat, efficitur euismod arcu vel, luctus congue odio. Quisque et faucibus velit. Nunc tempus tortor at orci convallis mattis. Quisque pellentesque nunc urna, ut auctor nisl sollicitudin ac. Duis non tellus eu elit posuere aliquet. Nulla porttitor eros pellentesque venenatis viverra. Aliquam dictum nisi ut congue egestas. Morbi pharetra libero ac eros mollis volutpat.",
            image: require("../../assets/images/broken-4.jpg")
        }, {
            title: "This is the title five",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut consequat lorem. Duis at quam quis nisl feugiat laoreet nec quis orci. Quisque consequat feugiat dui, non laoreet ligula consequat vitae. In hac habitasse platea dictumst. Pellentesque sodales nisl nibh, nec molestie arcu finibus vitae. ",
            image: require("../../assets/images/broken-5.jpg")
        }, {
            title: "This is the title six",
            description: "Mauris congue, neque et laoreet dignissim, arcu ipsum viverra sem, nec sollicitudin diam dolor id mi. Mauris eros erat, efficitur euismod arcu vel, luctus congue odio. Quisque et faucibus velit. Nunc tempus tortor at orci convallis mattis. Quisque pellentesque nunc urna, ut auctor nisl sollicitudin ac. Duis non tellus eu elit posuere aliquet. Nulla porttitor eros pellentesque venenatis viverra. Aliquam dictum nisi ut congue egestas. Morbi pharetra libero ac eros mollis volutpat.",
            image: require("../../assets/images/broken-6.jpg")
        }, {
            title: "This is the title seven",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut consequat lorem. Duis at quam quis nisl feugiat laoreet nec quis orci. Quisque consequat feugiat dui, non laoreet ligula consequat vitae. In hac habitasse platea dictumst. Pellentesque sodales nisl nibh, nec molestie arcu finibus vitae. ",
            image: require("../../assets/images/broken-2.jpg")
        }, {
            title: "This is the title eight",
            description: "Mauris congue, neque et laoreet dignissim, arcu ipsum viverra sem, nec sollicitudin diam dolor id mi. Mauris eros erat, efficitur euismod arcu vel, luctus congue odio. Quisque et faucibus velit. Nunc tempus tortor at orci convallis mattis. Quisque pellentesque nunc urna, ut auctor nisl sollicitudin ac. Duis non tellus eu elit posuere aliquet. Nulla porttitor eros pellentesque venenatis viverra. Aliquam dictum nisi ut congue egestas. Morbi pharetra libero ac eros mollis volutpat.",
            image: require("../../assets/images/broken-1.jpg")
        }, {
            title: "This is the title nine",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut consequat lorem. Duis at quam quis nisl feugiat laoreet nec quis orci. Quisque consequat feugiat dui, non laoreet ligula consequat vitae. In hac habitasse platea dictumst. Pellentesque sodales nisl nibh, nec molestie arcu finibus vitae. ",
            image: require("../../assets/images/broken-2.jpg")
        }, {
            title: "This is the title ten",
            description: "Mauris congue, neque et laoreet dignissim, arcu ipsum viverra sem, nec sollicitudin diam dolor id mi. Mauris eros erat, efficitur euismod arcu vel, luctus congue odio. Quisque et faucibus velit. Nunc tempus tortor at orci convallis mattis. Quisque pellentesque nunc urna, ut auctor nisl sollicitudin ac. Duis non tellus eu elit posuere aliquet. Nulla porttitor eros pellentesque venenatis viverra. Aliquam dictum nisi ut congue egestas. Morbi pharetra libero ac eros mollis volutpat.",
            image: require("../../assets/images/broken-5.jpg")
        }]
    }
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
                <ScrollView style={styles.container}>
                    <View style={styles.margin}>
                        <Text style={{ fontSize: 25, fontWeight: "bold" }}>300+ Vehicles availiable for repair</Text>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut consequat lorem. Duis at quam quis.</Text>
                    </View>
                    <View style={styles.margin}>
                        {typeof data !== "undefined" && data.length > 0 ? data.map((listing, index) => {
                            return (
                                <Fragment>
                                    <Card style={styles.cardie}>
                                        <CardItem>
                                            <Left>
                                                <Thumbnail source={listing.image} />
                                                <Body>
                                                <Text>{listing.title}</Text>
                                                <Text note>April 15, 2016</Text>
                                                </Body>
                                            </Left>
                                            </CardItem>
                                            <CardItem>
                                            <Body>
                                                <Image source={listing.image} style={{height: 250, width: "100%", flex: 1}}/>
                                                <View style={{ marginTop: 10 }}>
                                                    <View style={{ marginBottom: 15, flexDirection: "row" }}>
                                                        <Image source={require("../../assets/icons/small-star.png")} style={styles.starIcon} />
                                                        <Text> 4.92 (76)</Text>
                                                    </View>
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
                        }) : null}
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