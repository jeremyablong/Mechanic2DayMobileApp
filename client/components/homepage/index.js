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
import { connect } from "react-redux";
import { checkToNavigatePushNotification } from "../../actions/push-notifications/push.js";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import { Config } from "react-native-config";
import axios from "axios";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


const { width, height } = Dimensions.get("window");


class HomepageMainHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        data: [{
            title: "Engine Jobs",
            description: "Anything related to the main engine functionality",
            background: require("../../assets/images/mech-1.jpg"),
            data: "engine",
            index: 1
        }, { 
            title: "Transmission Jobs",
            description: "Anything related to the exahust of the vehicle/bike",
            background: require("../../assets/images/mech-2.jpg"),
            data: "transmission",
            index: 2
        }, { 
            title: "Maintenance",
            description: "Anything related to the maintenance of a vehicle/bike",
            background: require("../../assets/images/mech-3.jpg"),
            index: 3,
            data: "maintenance"
        }, {
            title: "Exhaust Jobs",
            description: "Anything related to the main engine exhuast",
            background: require("../../assets/images/mech-4.jpg"),
            index: 4,
            data: "exhaust"
        }, { 
            title: "Tire/Breaks Repair",
            description: "Anything related to the wheels/tires of a vehicle/bike",
            background: require("../../assets/images/mech-5.jpg"),
            index: 5,
            data: "tire-breaks-wheels"
        }, {
            title: "Interior Design/Repair",
            description: "Anything related to the interior of a vehicle",
            background: require("../../assets/images/mech-6.jpg"),
            index: 6,
            data: "interior-repair-design"
        }, { 
            title: "Electrical Work",
            description: "Fuses, lights, signals, and the main electrical components of any vehicle",
            background: require("../../assets/images/mech-7.jpg"),
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
            background: require("../../assets/images/mech-3.jpg"),
            index: 11,
            data: "motorcycle/motorbike"
        }, { 
            title: "Body Work & Alterations",
            description: "Anything body work related from dings to dents to collision repairs",
            background: require("../../assets/images/car-12.jpg"),
            index: 12,
            data: "body-work"
        }],
        searchValuePane: "",
        user: null
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
    constantRender = () => {
        if (this.props.redirect === true) {
            console.log("this.props.route", this.props.route);
            this.props.props.navigation.navigate(this.props.route);

            this.props.checkToNavigatePushNotification({
                redirect: false,
                route: ""
            })
        }
    }
    componentDidMount() {
        if (this.props.unique_id !== null && typeof this.props.unique_id !== "undefined") {
            axios.post(`${Config.ngrok_url}/gather/general/info`, {
                id: this.props.unique_id
            }).then((res) => {
                if (res.data.message === "Found user!") {
                    console.log(res.data);

                    const { user } = res.data;

                    this.setState({
                        user
                    })
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    renderButtonsConditionally = () => {
        const { user } = this.state;

        if (user !== null && user.accountType) {
            console.log("user.accountType", user.accountType);
            switch (user.accountType) {
                case "tow-truck-driver":
                    return (
                        <Fragment>
                            <AwesomeButtonBlue width={width * 0.85} type={"secondary"} onPress={() => {
                                this.props.props.navigation.push("tow-truck-driver-online-homepage");
                            }}>Go ONLINE and more!</AwesomeButtonBlue>
                        </Fragment>
                    );
                    break;
                case "client":
                    return (
                        <Fragment>
                            <AwesomeButtonBlue onPress={() => {
                                this.props.props.navigation.push("providers-listing-homepage");
                            }} width={width * 0.85} type={"primary"}>List your vehicle for repair</AwesomeButtonBlue>
                            <View style={{ marginTop: 20 }} />
                            <AwesomeButtonBlue width={width * 0.85} type={"secondary"} onPress={() => {
                                this.props.props.navigation.push("roadside-assistance-main-landing");
                            }}>Get roadside assistance</AwesomeButtonBlue>
                        </Fragment>
                    );
                    break;
                case "mechanic":
                    return (
                        <Fragment>
                            <Button info onPress={() => {
                                this.props.props.navigation.push("roadside-assistance-main-landing");
                            }} style={styles.customButtonFive}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Roadside Assistance</NativeText>
                            </Button>
                        </Fragment>
                    );
                    break;
                case "tow-truck-company":
                    return (
                        <Fragment>
                            <AwesomeButtonBlue onPress={() => {
                                this.props.props.navigation.push("advertise-roadside-assistance-main");
                            }} width={width * 0.85} type={"primary"}>Advertise Roadside Assistance</AwesomeButtonBlue>
                            <View style={{ marginTop: 20 }} />
                            <AwesomeButtonBlue width={width * 0.85} type={"secondary"} onPress={() => {
                                this.props.props.navigation.push("manage-tow-drivers");
                            }}>Manage Tow Drivers/Employees</AwesomeButtonBlue>
                        </Fragment>
                    );
                    break;
                default:
                    break;
            }
        }
    }
    render () {
        console.log("homepage index.js state", this.state);
        return (
            <Fragment>
                {this.constantRender()}
                <ParallaxScrollView 
                    backgroundColor="black"
                    contentBackgroundColor="white" 
                    parallaxHeaderHeight={275}  
                    contentContainerStyle={styles.containerStyle}
                    renderBackground={() => {
                        return (
                            <Image source={require("../../assets/images/mech-4.jpg")} style={styles.background} />
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
                                <AwesomeButtonRick width={width * 0.70} style={{ marginTop: 50, marginBottom: 20 }}  backgroundShadow={"#E8CEE4"} onPress={() => {

                                }} type="secondary">
                                    <Image source={require("../../assets/icons/service.png")} style={{ maxWidth: 40, maxHeight: 40 }}/>
                                    <Text> Hire a mechanic</Text>
                                </AwesomeButtonRick>
                                <AwesomeButtonRick width={width * 0.70} backgroundShadow={"#E8CEE4"} onPress={() => {
                                    this.props.props.navigation.navigate("broken-vehicles-map");
                                }} type="primary">
                                    <Image source={require("../../assets/icons/engine.png")} style={{ maxWidth: 40, maxHeight: 40 }}/>
                                    <Text> Browse broken vehicles</Text>
                                </AwesomeButtonRick>
                                
                            </View>
                        </View>
                        <View style={styles.mainContent}>
                            <View style={[styles.centered, { marginBottom: 25 }]}>
                            <View style={styles.centered}>
                                {this.renderButtonsConditionally()}
                            </View>
                            </View>
                            <View>
                                <Text style={styles.repairText}>Repair Categories</Text>
                                <Text style={styles.descriptionSmaller}>Browse different vehicle repair categories to find which area fits your needs best!</Text>
                            </View>
                            <View style={styles.rowCarousel}>
                            
                                <Carousel 
                                    layout={'stack'} 
                                    layoutCardOffset={70}
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
const mapStateToProps = (state) => {
    console.log(state);
    return {
        redirect: state.redirect_push.redirect.redirect,
        route: state.redirect_push.redirect.route,
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { checkToNavigatePushNotification })(HomepageMainHelper);