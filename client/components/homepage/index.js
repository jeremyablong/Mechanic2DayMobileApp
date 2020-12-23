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

const { width, height } = Dimensions.get("window");


class HomepageMainHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        data: [{
            title: "Engine Jobs",
            description: "Anything related to the main engine functionality",
            background: require("../../assets/images/car-3.jpg"),
            index: 1
        }, { 
            title: "Exhaust Jobs",
            description: "Anything related to the exahust of the vehicle/bike",
            background: require("../../assets/images/car-2.jpg"),
            index: 2
        }, { 
            title: "Maintenance",
            description: "This category is strictly for general maintenance jobs",
            background: require("../../assets/images/car-1.jpg"),
            index: 3
        }, {
            title: "Tire/Brakes",
            description: "This is strictly for JUST tire and break jobs of all varieties",
            background: require("../../assets/images/car-4.jpg"),
            index: 4
        }, { 
            title: "Interior Design",
            description: "Design and re-design of the interior of a vehicle",
            background: require("../../assets/images/car-5.jpg"),
            index: 5
        }, {
            title: "Oil Changes",
            description: "Oil changes, we all need em!",
            background: require("../../assets/images/car-6.jpg"),
            index: 6
        }, { 
            title: "Electrical Work",
            description: "Fuses, lights, signals, and the main electrical components of any vehicle",
            background: require("../../assets/images/car-7.jpg"),
            index: 7
        }, {
            title: "Speciality Repairs",
            description: "Bmw, Infiniti, Etc... foreign vehicle repairs",
            background: require("../../assets/images/car-8.jpg"),
            index: 8
        }, { 
            title: "Speciality Upgrades",
            description: "This category is strictly for high-end vehicle upgrades...",
            background: require("../../assets/images/car-9.jpg"),
            index: 9
        }, {
            title: "Transmission Repairs",
            description: "Transmission repairs - anything tranny related!",
            background: require("../../assets/images/car-11.jpg"),
            index: 10
        }, { 
            title: "Diagnostics",
            description: "Find out what's wrong with your vehicle",
            background: require("../../assets/images/car-12.jpg"),
            index: 11
        }],
        searchValuePane: ""
    }
}

    _renderItem = ({item, index}) => {
        return (
            <Fragment key={index}>
                <ImageBackground source={item.background} style={styles.backgroundSlider}>
                    <View style={styles.bottomView}>
                        <Text style={styles.desc}>{item.description}</Text>
                        <Button style={styles.slideshowBtn}><NativeText style={{ color: "black" }}> {item.title} </NativeText></Button>
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
                            <Image source={require("../../assets/images/tools-1.jpg")} style={styles.background} />
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
                                <Button style={styles.btnBtn} bordered>
                                    <NativeText>Fix a vehicle</NativeText>
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

                            <ActiveClientsLookingHelper />

                            <PromotionWide />

                            <DesignedBoxScroll />

                            <FillerContentMechanicsForHire />
                            
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