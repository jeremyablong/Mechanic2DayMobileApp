import React, { Fragment, Component } from "react";
import { Text, View, Image, TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import styles from "./styles.js";
import { Item, Input, Label, Button, Text as NativeText } from "native-base";
import FooterHelper from "../footer/footer.js";
import Carousel from 'react-native-snap-carousel';
import ActiveClientsLookingHelper from "./scrollviews/clients.js";
import FillerContentMechanicsForHire from "./filler.js";
import PromotionWide from "./promotion/promo.js";
import DesignedBoxScroll from "./scrollviews/designedBoxScroll.js";
import SlidingUpPanel from 'rn-sliding-up-panel';
import HomepageInfoHelper from "./info/info.js";

const { width, height } = Dimensions.get("window");


class HomepageMainHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        data: [{
            title: "Engine Jobs",
            description: "Anything related to the main engine functionality",
            background: require("../../assets/images/car-3.jpg"),
            data: "engine",
            index: 1
        }, { 
            title: "Transmission Jobs",
            description: "Anything related to the exahust of the vehicle/bike",
            background: require("../../assets/images/car-2.jpg"),
            data: "transmission",
            index: 2
        }, { 
            title: "Maintenance",
            description: "Anything related to the maintenance of a vehicle/bike",
            background: require("../../assets/images/car-1.jpg"),
            index: 3,
            data: "maintenance"
        }, {
            title: "Exhaust Jobs",
            description: "Anything related to the main engine exhuast",
            background: require("../../assets/images/car-4.jpg"),
            index: 4,
            data: "exhaust"
        }, { 
            title: "Tire/Breaks Repair",
            description: "Anything related to the wheels/tires of a vehicle/bike",
            background: require("../../assets/images/car-5.jpg"),
            index: 5,
            data: "tire-breaks-wheels"
        }, {
            title: "Interior Design/Repair",
            description: "Anything related to the interior of a vehicle",
            background: require("../../assets/images/car-6.jpg"),
            index: 6,
            data: "interior-repair-design"
        }, { 
            title: "Electrical Work",
            description: "Fuses, lights, signals, and the main electrical components of any vehicle",
            background: require("../../assets/images/car-7.jpg"),
            index: 7,
            data: "electronics/electrical"
        }, {
            title: "Tuning/Sports Upgrades",
            description: "High-end vehicle upgrades and alternations",
            background: require("../../assets/images/car-8.jpg"),
            index: 8,
            data: "tuning-sports-upgrades"
        }, { 
            title: "Speciality Repairs",
            description: "Speciality vehicle repairs done by qualified professionals -  (BMW, Audi, Etc..)",
            background: require("../../assets/images/car-9.jpg"),
            index: 9,
            data: "speciality-repairs"
        }, {
            title: "Deisel Repairs",
            description: "Heavy machinery and deisel mechanics",
            background: require("../../assets/images/car-11.jpg"),
            index: 10,
            data: "deisel"
        }, { 
            title: "Motorcycle & Motorbike",
            description: "Designated specifically for motorbikes & motorcycles repairs and maintenance",
            background: require("../../assets/images/car-12.jpg"),
            index: 11,
            data: "motorcycle/motorbike"
        }, { 
            title: "Body Work & Alterations",
            description: "Anything body work related from dings to dents to collision repairs",
            background: require("../../assets/images/car-12.jpg"),
            index: 12,
            data: "body-work"
        }],
        searchValuePane: ""
    }
}
    _renderItem = ({item, index}) => {
        return (
            <Fragment>
                <ImageBackground source={item.background} style={styles.backgroundSlider}>
                    <View style={styles.bottomView}>
                        <Text style={styles.desc}>{item.description}</Text>
                        <Button onPress={() => {
                            this.props.props.navigation.navigate("categories-main", { type: item.data });
                        }} style={styles.slideshowBtn}><NativeText style={{ color: "black" }}> {item.title} </NativeText></Button>
                    </View>
                </ImageBackground>
            </Fragment>
        );
    }
    render () {
        return (
            <Fragment>
                
                <ParallaxScrollView 
                    backgroundColor="black"
                    contentBackgroundColor="white" 
                    parallaxHeaderHeight={275}  
                    contentContainerStyle={styles.containerStyle}
                    renderBackground={() => {
                        return (
                            <Image source={require("../../assets/images/car-7.jpg")} style={styles.background} />
                        );
                    }}
                    renderForeground={() => (
                        <View style={styles.topContainer}>
                            
                        </View>
                    )}>
                    <View style={styles.mainContain}>
                        <View style={styles.innerContainer}>
                            <Item style={styles.inputOne}>
                                <Input onFocus={() => {
                                    console.log("focussed.")
                                    this._panel.show();
                                }} style={styles.input} placeholderTextColor={"black"} placeholder={"What're you looking for ?"} />
                            </Item>
                            <View style={styles.centerContainer}>
                                <Button style={[styles.btnBtn, { marginTop: 50 }]} bordered dark>
                                    <NativeText>Hire a mechanic</NativeText>
                                </Button>
                                <Button onPress={() => {
                                    this.props.props.navigation.navigate("broken-vehicles-map");
                                }} style={styles.btnBtn} bordered>
                                    <NativeText>Browse Broken Vehicles</NativeText>
                                </Button>
                            </View>
                        </View>
                        <View style={styles.mainContent}>
                           
                            <View>
                                <Text style={styles.repairText}>Repair Categories</Text>
                                <Text style={styles.descriptionSmaller}>Browse different vehicle repair categories to find which area fits your needs best!</Text>
                            </View>
                            <View style={styles.rowCarousel}>
                            
                                <Carousel 
                                    layout={'stack'} 
                                    layoutCardOffset={`70`}
                                    ref={(c) => { 
                                        this._carousel = c; 
                                    }}
                                    data={this.state.data}
                                    renderItem={this._renderItem}
                                    sliderWidth={width}
                                    itemWidth={width * 0.90}
                                />
                                
                            </View>
                            <View style={styles.hr} />

                            <ActiveClientsLookingHelper props={this.props.props} />

                            <PromotionWide props={this.props.props} />

                            <HomepageInfoHelper props={this.props.props} />

                            <DesignedBoxScroll props={this.props.props} />

                            <FillerContentMechanicsForHire props={this.props.props} />
                            
                        </View>
                    </View>
                    </ParallaxScrollView>
                    
                    <FooterHelper props={this.props.props} />
                    <SlidingUpPanel height={500} ref={c => this._panel = c}>
                        <View style={styles.whiteBackground}>
                            <View style={styles.slideUpRow}>
                                <TouchableOpacity onPress={() => {
                                    this._panel.hide();
                                }}>
                                    <Image source={require("../../assets/icons/go-back.png")} style={styles.backButtonIcon} />
                                </TouchableOpacity>
                                <Item style={styles.customInput}>
                                    <Input 
                                        onChangeText={(text) => {
                                            this.setState({
                                                searchValuePane: text
                                            })
                                        }}
                                        placeholderTextColor={"grey"} 
                                        placeholder="How can we help you?" 
                                    />
                                </Item>
                            </View>
                        </View>
                    </SlidingUpPanel>
            </Fragment>
        );
    }
}
export default HomepageMainHelper;