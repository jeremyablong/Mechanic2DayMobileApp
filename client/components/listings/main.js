import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions, Image, Animated, TouchableOpacity, ScrollView, PanResponder, ImageBackground } from 'react-native';
import MapView from 'react-native-maps';
import styles from './styles.js';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Button, Text as NativeText } from "native-base";
import RBSheet from "react-native-raw-bottom-sheet";
import SearchBar from 'react-native-search-bar';
import axios from 'axios';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get("window");

class MapViewAllListingsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        listings: [{
            image: require("../../assets/images/tools-1.jpg"),
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            index: 1,
            price: "149.99"
        }, {
            image: require("../../assets/images/broken-1.jpg"),
            title: "Nunc faucibus eleifend tellus eu fringilla",
            index: 2,
            price: "39.99"
        }, {
            image: require("../../assets/images/broken-2.jpg"),
            title: "Integer nec malesuada nunc. Proin imperdiet",
            index: 3,
            price: "99.99"
        }, {
            image: require("../../assets/images/broken-3.jpg"),
            title: "Orci varius natoque penatibus et magnis dis parturient montes",
            index: 4,
            price: "105.99"
        }, {
            image: require("../../assets/images/broken-4.jpg"),
            title: "Fusce euismod nisi sed tellus consequat",
            index: 5,
            price: "90.85"
        }, {
            image: require("../../assets/images/broken-5.jpg"),
            title: "Nunc faucibus eleifend tellus eu fringilla",
            index: 6,
            price: "356.99"
        }, {
            image: require("../../assets/images/broken-6.jpg"),
            title: "Fusce euismod nisi sed tellus consequat",
            index: 7,
            price: "679.99"
        }],
        region: {
            latitude: this.props.location !== null ? this.props.location.latitude : 37.78825,
            longitude: this.props.location !== null ? this.props.location.longitude : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        show: false,
        draggableRange: {
            top: height,
            topBreak: height * 0.80,
            middleUp: height * 0.45 + (height * 0.45 * 0.20),
            middle: height * 0.50,
            middleBreak: height * 0.45 * 0.80,
            bottom: 75
        },
        results: [],
        selected: null,
        dragPanel: true
    }
    this.animatedValue = new Animated.Value(0);
    this.animatedValueTwo = new Animated.Value(0);

    this._panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: this._onGrant,
        onPanResponderRelease: this._onRelease,
        onPanResponderTerminate: this._onRelease,
    });
}
    componentDidMount() {
        this._panel.show(this.state.draggableRange.middle)
    }
    onRegionChange = (region) => {
        this.setState({ region });
    }
    reachedBottom = () => {
        this.setState({
            show: true
        })
    }
    handleOpen = () => {
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

                this.setState({
                    show: false
                }, () => {
                    this._panel.show(draggableRange.top);
                })
            } else if (position >= draggableRange.middleBreak) {
                // If not above middleUp but is above middleBreak, drag it to middle
                this.setState({
                    show: false
                }, () => {
                    this._panel.show(draggableRange.middle);
                })

            } else {
                // Else, hide it

                this.setState({
                    show: true
                }, () => {
                    this._panel.hide();
                })
            }
        } else {
                // If panel was moving downwards, do downward operations
                if (position >= draggableRange.topBreak) {
                    this.setState({
                        show: false
                    }, () => {
                        this._panel.show(draggableRange.top);
                    })

                } else if (position >= draggableRange.middleBreak) {

                    this.setState({
                        show: false
                    }, () => {
                        this._panel.show(draggableRange.middle);
                    })
                } else {

                    this.setState({
                        show: true
                    })

                    this._panel.hide()
                }
        }
    }
    customDragEnd = (position, gestureState) => {
        console.log("gestureState", gestureState, "position", position);
    }
    handleSearchLocationChange = () => {
        console.log("handleSearchLocationChange");
    }
    handleLocationCancel = () => {
        console.log("handleLocationCancel");
    }
    _onGrant = () => {
        this.setState({ dragPanel: false });
        return true;
    }
    _onRelease = () => {
        this.setState({ dragPanel: true });
    }
    handleSearchAddresses = () => {
        console.log("handleSearchAddresses");

        const configggg = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Content-Type': 'application/json'
            }
        }
        axios.get(`https://api.tomtom.com/search/2/search/${this.state.searchValue}.json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV&language=en-US`).then((res) => {
            console.log(res.data);

            const { results } = res.data;

            this.setState({
                results
            })
        }).catch((err) => {
            console.log("ERRRRRRR", err);
        })
    }
    render() {
        console.log("this.state main.js", this.state);

        const { results, listings } = this.state;
        return (
            <Fragment>
                <MapView
                    style={styles.mapCustom}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                />
                <View style={styles.topper}>
                    <View style={styles.circledView}>
                        <TouchableOpacity style={{ flexDirection: "column", maxHeight: 45 }} onPress={() => {
                            this.props.props.navigation.goBack();
                        }}>
                            <Image source={require("../../assets/icons/backk.png")} style={{ maxHeight: 45, marginLeft: 5, maxWdith: 45, width: 45 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "column", maxHeight: 45 }} onPress={() => {

                            this._panel.hide()

                            this._panel_two.show();

                            this.refs.searchBar.focus();

                        }}>
                            <Text style={styles.innerText}>{this.state.selected !== null ? this.state.selected.address.freeformAddress.slice(0, 18) : "Selected map area..."}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <SlidingUpPanel 
                    allowDragging={this.state.dragPanel}
                    animatedValue={this.animatedValue}
                    onDragEnd={(position, gestureState) => this.dragEnd(position, gestureState)}
                    draggableRange={{ top: this.state.draggableRange.top, bottom: this.state.draggableRange.bottom }}
                    onBottomReached={this.reachedBottom} 
                    showBackdrop={false} 
                    ref={c => this._panel = c}
                >
                    <ScrollView onScrollBeginDrag={this._onGrant} onScrollEndDrag={this._onRelease} contentContainerStyle={{ paddingBottom: 150 }} style={styles.container}>
                        <View style={styles.topContainer}>
                            <View style={styles.justifyCentered}>
                                <Image source={require("../../assets/icons/dotted.png")} style={{ maxHeight: 20, maxWdith: 100 }} />
                                {this.state.show === true ? <Text style={{ marginTop: 5, fontSize: 20 }}>1-16 of 300+ Mechanics</Text> : <Text style={{ marginTop: 5, fontSize: 25 }}>300+ Mechanics</Text>}
                            </View>
                            
                        </View>
                        <View style={styles.nextContainer}>
                            <Text style={styles.h3}>Mechanics in Big Bear Lake</Text>
                            <ScrollView onScrollEndDrag={this._onRelease} {...this._panResponder.panHandlers} horizontal={true} style={styles.horizontalScroller} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                                {typeof listings !== "undefined" && listings.length > 0 ? listings.map((listing, index) => {
                                    return (
                                        <View style={styles.listingItem}>
                                            <ImageBackground source={listing.image} style={styles.wideImage}>
                                                <View style={styles.label}>
                                                    <Text>SuperMechanic</Text>
                                                </View>
                                            </ImageBackground>
                                            <View style={styles.rowCustom}>
                                                <Image source={require("../../assets/icons/small-star.png")} style={{ maxHeight: 25, maxWdith: 25, width: 25, height: 25 }} />
                                                <Text style={[styles.p], { marginTop: 5 }}>4.79 (156)</Text>
                                            </View>
                                            <View style={[styles.rowCustom, { marginTop: -4 }]}>
                                                <Text style={styles.biggerP}>{listing.title}</Text>
                                            </View>
                                            <View style={[styles.rowCustom, { marginTop: -4 }]}>
                                                <Text style={styles.biggerP}><Text style={{ fontWeight: "bold" }}>${listing.price}</Text> Maximum Budget</Text>
                                            </View>
                                        </View>
                                    );
                                }) : null} 
                            </ScrollView>
                        </View>
                    </ScrollView>
                </SlidingUpPanel>
                <SlidingUpPanel animatedValue={this.animatedValueTwo} ref={c => this._panel_two = c}>
                <View style={styles.container}>
                    <View style={styles.searchbarContainer}>
                        <SearchBar
                            ref="searchBar"
                            placeholder="Search for an address"
                            onChangeText={(value) => {
                                this.setState({
                                    searchValue: value
                                }, () => {
                                    this.handleSearchAddresses();
                                })
                            }}
                            onSearchButtonPress={this.handleSearchLocationChange}
                            onCancelButtonPress={this.handleLocationCancel}
                        />
                    </View>
                    <View style={styles.results}>
                        {typeof results !== 'undefined' && results.length > 0 ? results.map((item, index) => {
                            console.log("itemmmmmmmm........:", item);
                            if (item.type === "Point Address" || item.type === "Geography") {
                                    return (
                                        <TouchableOpacity style={styles.listItemTwo} onPress={() => {
                                            this.setState({
                                                selected: item,
                                                region: {
                                                    latitude: item.position.lat,
                                                    longitude: item.position.lon,
                                                    latitudeDelta: 0.0922,
                                                    longitudeDelta: 0.0421,
                                                }
                                            }, () => {
                                                this._panel_two.hide();
                                            })
                                        }}>
                                            <Text style={styles.specialText}>{item.address.freeformAddress}</Text>
                                        </TouchableOpacity>
                                    );    
                                }
                        }) : null}
                    </View>
                </View>
                </SlidingUpPanel>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    if (Object.keys(state.location.location_initial).length > 0) {
        return {
            location: state.location.location_initial
        };
    } else {
        return {
            location: null
        };
    }
}
export default connect(mapStateToProps, { })(MapViewAllListingsHelper);