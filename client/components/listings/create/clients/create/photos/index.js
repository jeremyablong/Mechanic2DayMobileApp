import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, PanResponder, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { Header, Left, Button, Title, Text as NativeText } from 'native-base';
import styles from './styles.js';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Gallery from 'react-native-image-gallery';
import { connect } from 'react-redux';
import axios from "axios";
import { Config } from "react-native-config";
import Spinner from 'react-native-loading-spinner-overlay';


const { width, height } = Dimensions.get("window");

class UploadPhotosVehicleListingHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        draggableRange: {
            top: height,
            topBreak: height * 0.80,
            middleUp: height * 0.45 + (height * 0.45 * 0.20),
            middle: height * 0.50,
            middleBreak: height * 0.45 * 0.80,
            bottom: 75
        },
        dragPanel: true,
        show: false,
        photos: [],
        currentIndex: 0,
        selected: null,
        spinner: false
    }

    this._panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: this._onGrant,
        onPanResponderRelease: this._onRelease,
        onPanResponderTerminate: this._onRelease,
    });
}
    componentDidMount() {
        this._panel.hide();

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
    reachedBottom = () => {
        this.setState({
            show: false
        })
    }
    dragEnd = (position, gestureState) => {

        const { draggableRange } = this.state;

        console.log("gestureState", gestureState, "position", position);
        // If panel was moving upwards, do upwards operations
        if (gestureState.vy < 0) {
            // If user moves the panel above middleUp, drag it to the top
            if (position >= draggableRange.middleUp) {
                this._panel.show(draggableRange.top);
            } else if (position >= draggableRange.middleBreak) {
                this._panel.show(draggableRange.middle);
            } else {
                this._panel.hide();
            }
        } else {
                // If panel was moving downwards, do downward operations
                if (position >= draggableRange.topBreak) {
                    this._panel.show(draggableRange.top);
                } else if (position >= draggableRange.middleBreak) {
                    this._panel.show(draggableRange.middle);
                } else {
                    this._panel.hide()
                }
        }
    }
    launchSelection = () => {
        console.log("launchSelection");

        launchImageLibrary({
            mediaType: "photo",
            includeBase64: true,
            quality: 1
        }, this.completedLaunch)
    }
    completedLaunch = (data) => {
        console.log("completedLaunch", data);

        this.setState({
            photos: [...this.state.photos, { source: { uri: `data:${data.type};base64,${data.base64}` } }]     
        })
    }
    handleChangeCustom = (value) => {
        console.log("value", value);

        this.setState({
            currentIndex: value
        })
    }
    longPress = () => {
        console.log("long pressed.");
        
        const duplicate = [...this.state.photos];

        duplicate.splice(this.state.currentIndex, 1);

        this.setState({
            photos: duplicate
        })
    }
    renderGallery = () => {

        const { photos } = this.state;

        if (typeof photos !== "undefined" && photos.length > 0) {
            return (
                <Fragment>
                    <Text style={{ fontSize: 18, color: "blue", fontWeight: "bold", marginBottom: 15 }}>Press and hold to remove a photo - Swipe to see all selected pictures</Text>
                    <Gallery
                        style={styles.gallery}
                        images={this.state.photos} 
                        onPageSelected={this.handleChangeCustom} 
                        onLongPress={this.longPress}
                    />
                    <View style={styles.customMargin}>
                        <Button bordered style={styles.buttonCustomThree} onPress={() => {
                            this.submitPhotosAndContinue()
                        }}>
                            <NativeText style={{ color: "white", fontWeight: "bold" }}>Add photo(s) & Continue</NativeText>
                        </Button>
                    </View>
                </Fragment>
            );
        }
    }
    submitPhotosAndContinue = () => {
        console.log("submitPhotosAndContinue clicked.");

        const { photos, selected } = this.state;

        const listinggg = this.props.props.route.params.listing;

        this.setState({
            spinner: true
        }, () => {
            axios.post(`${Config.ngrok_url}/post/pictures/listing/vehicle/signup`, {
                photos,
                id: this.props.unique_id,
                selected: selected || listinggg
            }).then((res) => {
                if (res.data.message === "Successfully updated/posted photos!") {
                    console.log(res.data); 

                    const { listing } = res.data;

                    this.setState({
                        spinner: false
                    }, () => {
                        this.props.props.navigation.replace("create-vehicle-listing-four", { listing });
                    })
                } else {
                    console.log("err", res.data);

                    this.setState({
                        spinner: false
                    })
                }
            }).catch((err) => {
                console.log(err);

                this.setState({
                    spinner: false
                })
            })
        })

        setTimeout(() => {
            this.setState({
                spinner: false
            })
        },  15000);
    }
    render() {
        console.log("this.state. photo index.js", this.state);
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.push("providers-listing-homepage");
                        }} transparent>
                            <Image source={require('../../../../../../assets/icons/go-back.png')} style={styles.icon} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -30 }}>Let's setup your listing photo's</Title>
                    </Left>
                    
                </Header>
                <View style={{ flexGrow: 1, minHeight: 1000 }}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 500, flexGrow: 1 }} style={styles.container}>
                        <View style={styles.margin}>
                            <Text style={styles.mainHeadingTwo}>Add photos to your listing</Text>
                        </View>
                        <View style={styles.margin}>
                            <Text style={styles.mediumSizeText}>Photos help mechanics imagine what could potentially be wrong with your vehicle. It is better to post as many photos as possible or the issue so give a better idea of whats wrong to our technicians.</Text>
                        </View>
                        <View style={styles.margin}>
                            <Button bordered style={styles.buttonCustomTwo} onPress={() => {
                                this.launchSelection()
                            }}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Add photo(s)</NativeText>
                            </Button>
                        </View>
                        <View style={styles.margin}>
                            {this.renderGallery()}
                        </View>
                    </ScrollView>
                </View>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle} 
                    overlayColor={"rgba(0, 0, 0, 0.75)"} 
                    textContent={"Processing your photo uploads... Overlay will timeout after 15 seconds."} 
                    textStyle={{ color: "white", margin: 10, textAlign: "center" }} 
                    cancelable={false}
                />
                <SlidingUpPanel 
                    allowDragging={this.state.dragPanel}
                    animatedValue={new Animated.Value(0)}
                    onDragEnd={(position, gestureState) => this.dragEnd(position, gestureState)}
                    draggableRange={{ top: this.state.draggableRange.top, bottom: this.state.draggableRange.bottom }}
                    onBottomReached={this.reachedBottom} 
                    showBackdrop={false} 
                    ref={c => this._panel = c}
                >
                    <View style={styles.customSlideUpContainer}>
                        <View style={{ margin: 20, flexDirection: "row" }}>
                            <View style={styles.longerColumn}>
                                <Text style={{ color: "white" }}>Great photos attract clients and/or potential mechanics. Check out some tips to help highlight your vehcile.</Text>
                            </View>
                            <View style={styles.shortColumn}>
                                <TouchableOpacity onPress={() => {
                                    this._panel.show(this.state.draggableRange.top);
                                }}>
                                    <Image source={require('../../../../../../assets/icons/up-up.png')} style={styles.iconWhite} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.margin}>
                            <Text style={styles.mainHeading}>Showcase your vehicle with some great photos</Text>
                            <Text style={styles.textMediumWhite}>Some easy tips to get great photos of your vehicle: </Text>
                        </View>
                        <View style={styles.margin}>
                            <View style={styles.rowRow}>
                                <Image source={require('../../../../../../assets/icons/tilt.png')} style={[styles.iconWhite, { marginRight: 10 }]} />
                                <Text style={styles.textMediumWhite}>Take photos in landscape mode to capture as much of your vehicle as possible. Shoot from corners to add perspective.</Text>
                            </View>
                            <View style={[styles.rowRow, { marginTop: 15 }]}>
                                <Image source={require('../../../../../../assets/icons/sun.png')} style={[styles.iconWhite, { marginRight: 10 }]} />
                                <Text style={styles.textMediumWhite}>Car/Vehicles look best in naturual light. If it's daytime, capture the image in a well-lit area with some sunshine. Avoid pictures at nighttime especially using flash.</Text>
                            </View>
                            <View style={[styles.rowRow, { marginTop: 15 }]}>
                                <Image source={require('../../../../../../assets/icons/transport.png')} style={[styles.iconWhite, { marginRight: 10 }]} />
                                <Text style={styles.textMediumWhite}>Include all spaces of your vehicle inside and out if need be, to give an accurate description of what is wrong with your vehicle.</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.absolutePosition} onPress={() => {
                        this._panel.hide();
                    }}>
                        <Image source={require('../../../../../../assets/icons/x.png')} style={[styles.iconWhite, { marginRight: 10 }]} />
                    </TouchableOpacity>
                </SlidingUpPanel>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    };
}
export default connect(mapStateToProps, { })(UploadPhotosVehicleListingHelper);