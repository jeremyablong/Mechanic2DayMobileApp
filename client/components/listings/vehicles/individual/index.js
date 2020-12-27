import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Card, CardItem, Thumbnail, Content } from 'native-base';
import Gallery from 'react-native-image-gallery';
import ReadMore from 'react-native-read-more-text';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';


const { width, height  } = Dimensions.get('window');

const title = "Broken exhaust pipe on a 2016 honda civic touring";

const dataaa = [{
    title: "Engine Jobs",
    description: "Anything related to the main engine functionality",
    background: require("../../../../assets/images/car-11.jpg"),
    index: 1
}, { 
    title: "Exhaust Jobs",
    description: "Anything related to the exahust of the vehicle/bike",
    background: require("../../../../assets/images/car-10.jpg"),
    index: 2
}, { 
    title: "Maintenance",
    description: "This category is strictly for general maintenance jobs",
    background: require("../../../../assets/images/car-9.jpg"),
    index: 3
}, {
    title: "Tire/Brakes",
    description: "This is strictly for JUST tire and break jobs of all varieties",
    background: require("../../../../assets/images/car-8.jpg"),
    index: 4
}, { 
    title: "Interior Design",
    description: "Design and re-design of the interior of a vehicle",
    background: require("../../../../assets/images/car-7.jpg"),
    index: 5
}, {
    title: "Oil Changes",
    description: "Oil changes, we all need em!",
    background: require("../../../../assets/images/car-6.jpg"),
    index: 6
}, { 
    title: "Electrical Work",
    description: "Fuses, lights, signals, and the main electrical components of any vehicle",
    background: require("../../../../assets/images/car-5.jpg"),
    index: 7
}, {
    title: "Speciality Repairs",
    description: "Bmw, Infiniti, Etc... foreign vehicle repairs",
    background: require("../../../../assets/images/car-4.jpg"),
    index: 8
}, { 
    title: "Speciality Upgrades",
    description: "This category is strictly for high-end vehicle upgrades...",
    background: require("../../../../assets/images/car-1.jpg"),
    index: 9
}, {
    title: "Transmission Repairs",
    description: "Transmission repairs - anything tranny related!",
    background: require("../../../../assets/images/car-2.jpg"),
    index: 10
}, { 
    title: "Diagnostics",
    description: "Find out what's wrong with your vehicle",
    background: require("../../../../assets/images/car-3.jpg"),
    index: 11
}];

class IndividualBrokenVehicleHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        reviews: [{
            name: "James Blogno",
            profilePic: "https://picsum.photos/200/200",
            memberSince: "December 2020",
            review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lorem turpis, tempus nec est sagittis, sodales cursus leo. Vestibulum placerat eget lorem nec lobortis. Morbi eu libero et nisi feugiat dictum. Duis sed lorem quis tellus iaculis mollis. Nunc vitae libero tempus, consectetur mi quis, sollicitudin magna. Praesent enim eros, sodales quis dictum et, lacinia quis arcu. Vivamus fringilla sem eu suscipit tempus. Curabitur volutpat elit magna, porttitor aliquam turpis placerat sit amet. Quisque pulvinar elementum dolor eget porttitor. Integer in mauris id quam eleifend fringilla. Maecenas non faucibus dui, rhoncus egestas velit.",
            index: 1
        }, {
            name: "Becca Simithon",
            profilePic: "https://picsum.photos/200/200",
            memberSince: "January 2019",
            review: "Etiam nunc nunc, ultricies at dolor consectetur, vestibulum molestie nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed in erat non sapien ultricies vehicula quis vitae tortor. Ut rutrum tristique urna, ac molestie urna semper non. Donec molestie accumsan sem eu fringilla. Phasellus et nisi sem. Praesent a velit convallis, eleifend ex eu, laoreet mi. Fusce posuere dapibus posuere. Fusce eleifend egestas finibus. Phasellus sed augue suscipit, gravida ipsum quis, fermentum magna. Aenean rhoncus, magna sit amet feugiat ultrices, quam risus imperdiet sem, pulvinar luctus sem velit cursus tellus",
            index: 2
        }, {
            name: "Marrybeth Agneton",
            profilePic: "https://picsum.photos/200/200",
            memberSince: "November 2015",
            review: "Sed ornare a ligula vel accumsan. Nunc ex erat, bibendum nec interdum mollis, accumsan eget ante. Nulla porta metus maximus dictum venenatis. Phasellus congue elementum tincidunt. Donec iaculis mauris vel leo porttitor, in convallis ante faucibus. Curabitur eget lacus nisi. Donec sed sapien ac orci varius mattis. Sed nec justo nec neque scelerisque varius. In nec dui odio. Donec porttitor aliquet lectus ut maximus. Nunc sodales felis semper bibendum tempor. Aenean vel massa dignissim, ullamcorper lorem a, egestas lectus. Donec libero erat, sodales at tellus ut, sollicitudin dignissim ante. Curabitur sollicitudin nunc vitae lacinia ullamcorper.",
            index: 3
        }, {
            name: "Sarah Juleitte",
            profilePic: "https://picsum.photos/200/200",
            memberSince: "August 2020",
            review: "Sed tristique blandit scelerisque. Fusce at feugiat nisi, quis ultrices magna. Cras eu orci sollicitudin, porttitor risus ac, convallis justo. Donec massa arcu, auctor vel erat eu, dignissim pellentesque nulla. Curabitur rutrum erat diam, eget vestibulum velit accumsan in. Sed facilisis arcu a metus facilisis feugiat. Ut vulputate tellus ante, a tempor dui condimentum quis. Aenean porttitor sodales fermentum. Etiam eu est in nulla consectetur lacinia. Vestibulum consectetur turpis mauris, id tempus magna vehicula eget. Donec facilisis interdum nisi sit amet mollis. Donec malesuada quis nulla ac pretium.",
            index: 4
        }, {
            name: "Robert Adams",
            profilePic: "https://picsum.photos/200/200",
            memberSince: "May 2018",
            review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lorem turpis, tempus nec est sagittis, sodales cursus leo. Vestibulum placerat eget lorem nec lobortis. Morbi eu libero et nisi feugiat dictum. Duis sed lorem quis tellus iaculis mollis. Nunc vitae libero tempus, consectetur mi quis, sollicitudin magna. Praesent enim eros, sodales quis dictum et, lacinia quis arcu. Vivamus fringilla sem eu suscipit tempus. Curabitur volutpat elit magna, porttitor aliquam turpis placerat sit amet. Quisque pulvinar elementum dolor eget porttitor. Integer in mauris id quam eleifend fringilla. Maecenas non faucibus dui, rhoncus egestas velit.",
            index: 5
        }, {
            name: "Obama Smithy",
            profilePic: "https://picsum.photos/200/200",
            memberSince: "January 2016",
            review: "Fusce nulla enim, efficitur vel velit non, volutpat ornare magna. Phasellus et velit est. Nulla maximus maximus dapibus. Aliquam vel sapien non magna consequat ornare vel ac felis. Ut commodo enim aliquet venenatis finibus. Integer pellentesque, tellus vitae bibendum molestie, leo massa accumsan purus, convallis volutpat felis libero vel neque. Integer ac malesuada elit. Sed non odio in lectus volutpat tristique non porta nisi.",
            index: 6
        }]
    }
}
    _renderItem = ({item, index}) => {
        return (
            <Fragment key={index}>
                <ImageBackground source={item.background} style={styles.backgroundSlider}>
                    <View style={styles.bottomView}>
                        <Text style={styles.desc}>{item.description}</Text>
                        <Button onPress={() => {
                            this.props.props.navigation.navigate("individual-broken-listing");
                        }} style={styles.slideshowBtn}><NativeText style={{ color: "black" }}> {item.title} </NativeText></Button>
                    </View>
                </ImageBackground>
            </Fragment>
        );
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: "blue", fontSize: 20, marginTop: 5}} onPress={handlePress}>
                Read more
            </Text>
        );
    }
    
    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: "blue", fontSize: 20, marginTop: 5}} onPress={handlePress}>
                Show less
            </Text>
        );
    }
    render() {
        const { reviews } = this.state;
        return (
            <ScrollView style={{ height: "100%", flex: 1, backgroundColor: "white", minHeight: "100%" }} contentContainerStyle={{ paddingBottom: 300 }}>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Right>
                        <Button style={styles.heartButton} onPress={() => {
                           
                        }} transparent>
                            <Image source={require("../../../../assets/icons/heart.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container}>
                    <View style={{ maxHeight: 250, flex: 1 }}>
                        <Gallery
                            style={{ maxHeight: 250, minHeight: 250, top: 0, position: 'absolute', backgroundColor: 'black' }}
                            images={[
                                { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                                { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                                { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                                { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                            ]}
                        />
                    </View>
                    <View style={{ top: 175 }}>
                        <View style={{ marginLeft: 20, marginRight: 20 }}>
                            <Text style={styles.title}>{title}</Text>
                            <View style={styles.row}>
                                <Image source={require("../../../../assets/icons/small-star.png")} style={{ maxWidth: 15, maxHeight: 15 }} />
                                <Text>4.3 ({Math.floor(Math.random() * 40) + 1})</Text>
                                <Image source={require("../../../../assets/icons/medal.png")} style={styles.medal} />
                                <Text>SuperMechanic</Text>
                            </View>
                            <View style={[styles.row, { marginTop: 5 }]}>
                                <Text style={styles.location}>Monterey Park, California, United States</Text>
                            </View>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.containerTwo}>
                            <Text style={styles.category}>Transmission Work</Text>
                            <Text style={{ fontSize: 16 }}>hosted by Jeremy</Text>
                        </View>
                        {/* <View style={styles.rowMargin}>
                            <Text style={{ fontSize: 20 }}>2016 Nissan Sentra Sedan 4-door 145,000 miles</Text>
                        </View> */}
                        <View style={styles.hrTwo} />
                        <View style={styles.marginMargin}>
                            <Text style={styles.mildBoldText}>Vehicle Location</Text>
                            <View style={styles.rowCustomTwo}>
                                <View style={{ marginTop: 20 }}>
                                    <Image source={require("../../../../assets/icons/world.png")} style={{ maxWidth: 60, maxHeight: 60 }} />
                                </View>
                                <View style={{ margin: 10, marginTop: 20 }}>
                                    <Text> Los Angeles, CA 90015 {"\n"}<Text> Free "Come to you" service or drop it off</Text></Text>
                                    <TouchableOpacity onPress={() => {}}><Text style={styles.customTextThree}>See on map</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.hrTwo} />
                        <View style={styles.rowMargin}>
                            <View style={styles.column}>
                                <Image source={require("../../../../assets/icons/seat.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={styles.centeredText}>5 Seats</Text>
                            </View>
                            <View style={styles.column}>
                                <Image source={require("../../../../assets/icons/door.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={styles.centeredText}>4 Doors</Text>
                            </View>
                            <View style={styles.column}>
                                <Image source={require("../../../../assets/icons/gas.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={styles.centeredText}>Gas (Premium)</Text>
                            </View>
                            <View style={styles.column}>
                                <Image source={require("../../../../assets/icons/gas-tank.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={styles.centeredText}>20 MPG</Text>
                            </View>
                        </View>
                        <View style={styles.hrThree} />
                        <View style={styles.marginMargin}>
                            <Text style={styles.descriptionTitle}>Description</Text>
                            <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                <Text style={styles.p}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lorem turpis, tempus nec est sagittis, sodales cursus leo. Vestibulum placerat eget lorem nec lobortis. Morbi eu libero et nisi feugiat dictum. Duis sed lorem quis tellus iaculis mollis. Nunc vitae libero tempus, consectetur mi quis, sollicitudin magna. Praesent enim eros, sodales quis dictum et, lacinia quis arcu. Vivamus fringilla sem eu suscipit tempus. Curabitur volutpat elit magna, porttitor aliquam turpis placerat sit amet. Quisque pulvinar elementum dolor eget porttitor. Integer in mauris id quam eleifend fringilla. Maecenas non faucibus dui, rhoncus egestas velit.
                                </Text>
                            </ReadMore>
                            
                        </View>
                        <View style={styles.hrFour} />
                        <View style={[styles.marginMargin, { flexDirection: "row" }]}>
                            <View style={styles.columnCustom}>
                                <Image source={require("../../../../assets/icons/car-1.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                
                            </View>
                            <View style={styles.columnCustom}>
                                <Image source={require("../../../../assets/icons/car-2.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                               
                            </View>
                            <View style={styles.columnCustom}>
                                <Image source={require("../../../../assets/icons/car-3.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                               
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.centeredTextCustom}>View All Symptoms</Text>
                            </View>
                        </View>
                        <View style={styles.hrFour} />
                        <View style={styles.marginMargin}>
                            <Text style={styles.descriptionTitle}>Location</Text>
                            <Text style={{ fontSize: 18 }}>Monterey Park, California, United States</Text>
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                region={{
                                    latitude: 37.78825,
                                    longitude: -122.4324,
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.0121,
                                }}
                            >
                            </MapView>
                        </View>
                        <View style={styles.marginMargin}>
                            <View style={styles.row}>
                                <Image source={require("../../../../assets/icons/small-star.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={{ fontSize: 18, marginTop: 6 }}>4.3 ({Math.floor(Math.random() * 40) + 1} Reviews)</Text>
                            </View>
                            <View style={styles.noMargin}>
                                {typeof reviews !== 'undefined' && reviews.length > 0 ? reviews.slice(0, 2).map((review, index) => {
                                    return (
                                        <Fragment>
                                            <Content style={styles.contentContent} padder>
                                                <Card>
                                                    <CardItem>
                                                    <Left>
                                                        <Thumbnail source={{ uri: review.profilePic }} />
                                                        <Body>
                                                        <Text>{review.name}</Text>
                                                        <Text note>{review.memberSince}</Text>
                                                        </Body>
                                                    </Left>
                                                    </CardItem>
                                                    <CardItem style={{ margin: 20 }} cardBody>
                                                        <ReadMore
                                                            numberOfLines={3}
                                                            renderTruncatedFooter={this._renderTruncatedFooter}
                                                            renderRevealedFooter={this._renderRevealedFooter}
                                                            onReady={this._handleTextReady}>
                                                                <Text style={{ fontSize: 18 }}>
                                                                    {review.review}
                                                                </Text>
                                                        </ReadMore>
                                                    </CardItem>
                                                </Card>
                                            </Content>
                                            
                                        </Fragment>
                                    );
                                }) : null}
                            </View>
                            <View style={styles.rowMargin}>
                                <View style={styles.columnColumnLeft}>
                                    <Text style={styles.mildBoldText}>Posted by Jeremy</Text>
                                    <Text style={{ marginTop: 10 }}>Joined in May 2017</Text>
                                </View>
                                <View style={styles.columnColumn}>
                                    <Image source={require("../../../../assets/images/me.jpg")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                </View>
                                
                            </View>
                            <View style={[styles.rowRow, { marginTop: -30 }]}>
                                <Image source={require("../../../../assets/icons/small-star.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={{ margin: 5 }}>{Math.floor(Math.random() * 70) + 1} Reviews</Text>
                            </View>
                            <View style={[styles.rowRow, { marginTop: 10 }]}>
                                <Image source={require("../../../../assets/icons/shield.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={{ margin: 5 }}>Identity Confirmed</Text>
                            </View>
                            <View style={[styles.rowRow, { marginTop: 10 }]}>
                                <Image source={require("../../../../assets/icons/medal.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={{ margin: 5 }}>SuperGuest</Text>
                            </View>
                            <View style={[styles.margin, { marginTop: 20 }]}>
                                <Text style={{ fontSize: 18, fontWeight: "bold"}}>During your stay</Text>
                                <Text>If you need anything you can contact me at 213-248-8623</Text>
                            </View>
                            <View style={[styles.margin, { marginTop: 20 }]}>
                                <Text style={{ fontSize: 18, fontWeight: "bold"}}>Jeremy is a SuperGuest</Text>
                                <Text>SuperGuest's are experienced, highly rated customers who are committed to providing fluent and consistent experiences for all vehicle repairs.</Text>
                            </View>
                            <View style={[styles.margin, { marginTop: 20 }]}>
                                <Text style={{ fontSize: 18 }}>Response Rate - 100%</Text>
                                <Text style={{ fontSize: 18, marginTop: 10 }}>Response Time - Within one hour</Text>
                            </View>
                            <View style={styles.marginCentered}>
                                <Button style={{ width: "100%", justifyContent: "center" }} bordered onPress={() => {

                                }}>
                                    <NativeText>Contact Mechanic</NativeText>
                                </Button>
                                
                            </View>
                            <View style={styles.margin}>
                                <Text style={{ marginTop: 10, textAlign: "left" }}>To protect your payment, never transfer money or communicate outside the (Company Name) website or app.</Text>
                            </View>
                            <View style={{ marginTop: 25 }}>
                                <Carousel 
                                    layout={'stack'} 
                                    layoutCardOffset={`70`}
                                    ref={(c) => { 
                                        this._carousel = c; 
                                    }}
                                    data={dataaa}
                                    renderItem={this._renderItem}
                                    sliderWidth={width}
                                    itemWidth={width * 0.90}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                
            </ScrollView>
        )
    }
}
export default IndividualBrokenVehicleHelper;