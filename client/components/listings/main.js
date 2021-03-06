import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions, Image, Animated, TouchableOpacity, ScrollView, PanResponder, ImageBackground } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './styles.js';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Card, CardItem, Thumbnail, Text as NativeText, Left, Body, Button } from 'native-base';
import SearchBar from 'react-native-search-bar';
import axios from 'axios';
import { connect } from 'react-redux';
import { Config } from 'react-native-config';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import _ from 'lodash';
import geodist from "geodist";

const { width, height } = Dimensions.get("window");


class MapViewAllListingsHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        listings: [],
        initialRegion: {},
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
        dragPanel: true,
        latLng: {},
        destroyMap: true
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
        this._panel.show(this.state.draggableRange.middle);

        this.setState({
            initialRegion: {
                latitude: this.props.location !== null ? this.props.location.latitude : 37.78825,
                longitude: this.props.location !== null ? this.props.location.longitude : -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        })

        axios.post(`${Config.ngrok_url}/gather/live/listings/vehicles`, {
            current_location: {
                latitude: this.props.latitude,
                longitude: this.props.longitude
            }
        }).then((res) => {
            if (res.data.message === "Successfully gathered the desired listings!") {


                const { listings } = res.data;

                console.log("LISTINGS", listings);


                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < listings.length; index++) {
                        const element = listings[index];
                        
                        if (element.location_manual_entry === true) {
                            console.log("elem ent", element);

                            element.location = element.location_coordinates;

                            if ((listings.length - 1) === index) {
                                resolve(listings);
                            }
                        } else {
                            if ((listings.length - 1) === index) {
                                resolve(listings);
                            }
                        }
                    }
                })

                promiseee.then((passedData) => {

                    this.setState({
                        listings: passedData
                    })
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
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
        // console.log("gestureState", gestureState, "position", position);
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

            const { results } = res.data;

            this.setState({
                results
            })
        }).catch((err) => {
            console.log("ERRRRRRR", err);
        })
    }
    componentWillUnmount() {

        this.setState({
            destroyMap: false
        });
    }
    regionChangeCompleted = (location) => {
        console.log("regionChangeCompleted clicked", location);

        axios.post(`${Config.ngrok_url}/gather/live/listings/vehicles`, {
            current_location: {
                latitude: location.latitude,
                longitude: location.longitude
            }
        }).then((res) => {
            if (res.data.message === "Successfully gathered the desired listings!") {
                console.log(res.data);

                const { listings } = res.data;

                this.setState({
                    listings
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })

        console.log(geodist({ lat: location.latitude, lon: location.longitude }, { lat: 33.7489, lon: -84.3881 }))
    }
    renderMapLogic = () => {
        const { listings } = this.state;

        if (this.state.destroyMap === true) {
            return (
                <MapView  
                    onRegionChangeComplete={this.regionChangeCompleted} 
                    provider={PROVIDER_GOOGLE}
                    ref={(ref) => this.customMap = ref}
                    style={styles.mapCustom} 
                    initialRegion={this.state.initialRegion}
                    showsUserLocation={true}
                >
                    {typeof listings !== "undefined" && listings.length > 0 ? listings.map((marker, index) => {
                        console.log("MARKER", marker);
                        return (
                            <Fragment key={index}>
                                <Marker 
                                    coordinate={marker.location_manual_entry === true ? marker.location_coordinates : marker.location} 
                                    title={`${marker.year} ${marker.make} ${marker.model}`} 
                                    description={marker.description.slice(0, 40)} 
                                    image={require('../../assets/icons/car-marker.png')} 
                                    onCalloutPress={() => {
                                        console.log("callout pressed.");

                                        this.props.props.navigation.push("individual-broken-listing", { listing: marker });
                                    }}
                                >
                                        <Callout onPress={() => {
                                            this.props.props.navigation.push("individual-broken-listing", { listing: marker });
                                        }}>
                                            <View style={styles.callout}>
                                                <Card style={{ flex: 0 }}>
                                                    <CardItem>
                                                    <Left>
                                                        <Thumbnail source={{uri: marker.photos[0] }} />
                                                        <Body>
                                                            <NativeText>{`${marker.year} ${marker.make} ${marker.model}`}</NativeText>
                                                            <NativeText note>{marker.title.slice(0, 60)}{typeof marker.title !== "undefined" && marker.title.length > 60 ? "..." : ""}</NativeText>
                                                        </Body>
                                                    </Left>
                                                    </CardItem>
                                                    <CardItem>
                                                    <Body>
                                                        <Image source={{uri: marker.photos[0] }} style={styles.innerPicture}/>
                                                        <NativeText>
                                                            {marker.description.slice(0, 75)}{typeof marker.description !== "undefined" && marker.description.length > 75 ? "..." : ""}
                                                        </NativeText>
                                                    </Body>
                                                    </CardItem>
                                                </Card>
                                            </View>
                                        </Callout>
                                </Marker>
                            </Fragment>
                        );
                    }) : null}
                </MapView>
            );
        }
    }
    render() {
        console.log("this.state main.js", this.state);

        const { results, listings } = this.state;
        return (
            <Fragment>
                {this.renderMapLogic()}
                <View style={styles.topper}>
                    <View style={styles.circledView}>
                        <TouchableOpacity style={{ flexDirection: "column", maxHeight: 45 }} onPress={() => {
                            this.props.props.navigation.goBack();
                        }}>
                            <Image source={require("../../assets/icons/backk.png")} style={{ maxHeight: 45, marginLeft: 5, maxWidth: 45, width: 45 }} />
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
                {this.state.destroyMap === true ? <SlidingUpPanel 
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
                                <Image source={require("../../assets/icons/dotted.png")} style={{ maxHeight: 20, maxWidth: 100 }} />
                                {this.state.show === true ? <Text style={{ marginTop: 5, fontSize: 20 }}>1-16 of {this.state.listings.length}+ Broken Vehicles</Text> : <Text style={{ marginTop: 5, fontSize: 25 }}>{this.state.listings.length}+ Broken Vehicles</Text>}
                            </View>
                            
                        </View>
                        <View style={styles.nextContainer}>
                            <Text style={styles.h3}>Mechanics in Big Bear Lake</Text>
                            <ScrollView onScrollEndDrag={this._onRelease} {...this._panResponder.panHandlers} horizontal={true} style={styles.horizontalScroller} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                                {typeof listings !== "undefined" && listings.length > 0 ? listings.slice(0, 6).map((listing, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => {
                                            this.props.props.navigation.navigate("individual-broken-listing", { listing });
                                        }} style={styles.listingItem}>
                                            <ImageBackground source={{ uri: listing.photos[0] }} style={styles.wideImage}>
                                                <View style={styles.label}>
                                                    <Text>SuperMechanic</Text>
                                                </View>
                                            </ImageBackground>
                                            <View style={styles.rowCustom}>
                                                <Image source={require("../../assets/icons/small-star.png")} style={{ maxHeight: 25, maxWidth: 25, width: 25, height: 25 }} />
                                                <Text style={[styles.p, { marginTop: 5, fontSize: 18 }]}><Text style={{ fontWeight: "bold" }}>{listing.min_reviews_to_apply.min}</Text> review required to apply</Text>
                                            </View>
                                            <View style={[styles.rowCustom, { marginTop: -4 }]}>
                                                <Text style={[styles.biggerP, { fontWeight: "bold", color: "blue" }]}>{`${listing.year} ${listing.make} ${listing.model} ${listing.trim !== "unknown" ? listing.trim : ""}`}</Text>
                                            </View>
                                            <View style={[styles.rowCustom, { marginTop: -4 }]}>
                                                <Text style={styles.biggerP}>{listing.title}</Text>
                                            </View>
                                            <View style={[styles.rowCustom, { marginTop: -4 }]}>
                                                <Text style={styles.biggerP}><Text style={{ fontWeight: "bold" }}>${listing.budget.translation}</Text> Maximum Budget</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }) : <SkeletonPlaceholder>
                                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                        </SkeletonPlaceholder.Item>
                                    </SkeletonPlaceholder>} 
                            </ScrollView>
                        </View>
                        <View style={styles.nextContainer}>
                            <Text style={styles.h3}>Mechanics in Big Bear Lake</Text>
                            <ScrollView onScrollEndDrag={this._onRelease} {...this._panResponder.panHandlers} horizontal={true} style={styles.horizontalScroller} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                                {typeof listings !== "undefined" && listings.length > 0 ? listings.slice(7, 14).map((listing, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => {
                                            this.props.props.navigation.navigate("individual-broken-listing", { listing });
                                        }} style={styles.listingItem}>
                                            <ImageBackground source={{ uri: listing.photos[0] }} style={styles.wideImage}>
                                                <View style={styles.label}>
                                                    <Text>SuperMechanic</Text>
                                                </View>
                                            </ImageBackground>
                                           
                                            <View style={styles.rowCustom}>
                                                <Image source={require("../../assets/icons/small-star.png")} style={{ maxHeight: 25, maxWidth: 25, width: 25, height: 25 }} />
                                                <Text style={[styles.p, { marginTop: 5, fontSize: 18 }]}><Text style={{ fontWeight: "bold" }}>{listing.min_reviews_to_apply.min}</Text> review required to apply</Text>
                                            </View>
                                            <View style={[styles.rowCustom, { marginTop: -4 }]}>
                                                <Text style={[styles.biggerP, { fontWeight: "bold", color: "blue" }]}>{`${listing.year} ${listing.make} ${listing.model} ${listing.trim !== "unknown" ? listing.trim : ""}`}</Text>
                                            </View>
                                            <View style={[styles.rowCustom, { marginTop: -4 }]}>
                                                <Text style={styles.biggerP}>{listing.title}</Text>
                                            </View>
                                            <View style={[styles.rowCustom, { marginTop: -4 }]}>
                                                <Text style={styles.biggerP}><Text style={{ fontWeight: "bold" }}>${listing.price}</Text> Maximum Budget</Text>
                                            </View>
                                        
                                        </TouchableOpacity>
                                    );
                                }) : <SkeletonPlaceholder>
                                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                        </SkeletonPlaceholder.Item>
                                    </SkeletonPlaceholder>} 
                            </ScrollView>
                        </View>
                        <View style={styles.nextContainer}>
                            <Text style={styles.h3}>Mechanics in Big Bear Lake</Text>
                            <ScrollView onScrollEndDrag={this._onRelease} {...this._panResponder.panHandlers} horizontal={true} style={styles.horizontalScroller} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                                {typeof listings !== "undefined" && listings.length > 0 ? listings.slice(15, 22).map((listing, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => {
                                            this.props.props.navigation.navigate("individual-broken-listing", { listing });
                                        }} style={styles.listingItem}>
                                            <ImageBackground source={{ uri: listing.photos[0] }} style={styles.wideImage}>
                                                <View style={styles.label}>
                                                    <Text>SuperMechanic</Text>
                                                </View>
                                            </ImageBackground>
                                            <View style={styles.rowCustom}>
                                                <Image source={require("../../assets/icons/small-star.png")} style={{ maxHeight: 25, maxWidth: 25, width: 25, height: 25 }} />
                                                <Text style={[styles.p, { marginTop: 5, fontSize: 18 }]}><Text style={{ fontWeight: "bold" }}>{listing.min_reviews_to_apply.min}</Text> review required to apply</Text>
                                            </View>
                                            <View style={[styles.rowCustom, { marginTop: -4 }]}>
                                                <Text style={[styles.biggerP, { fontWeight: "bold", color: "blue" }]}>{`${listing.year} ${listing.make} ${listing.model} ${listing.trim !== "unknown" ? listing.trim : ""}`}</Text>
                                            </View>
                                            <View style={[styles.rowCustom, { marginTop: -4 }]}>
                                                <Text style={styles.biggerP}>{listing.title}</Text>
                                            </View>
                                            <View style={[styles.rowCustom, { marginTop: -4 }]}>
                                                <Text style={styles.biggerP}><Text style={{ fontWeight: "bold" }}>${listing.price}</Text> Maximum Budget</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }) : <SkeletonPlaceholder>
                                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                            <SkeletonPlaceholder.Item width={width * 0.75} height={250} borderRadius={50} />
                                            <View style={{ marginRight: 30 }} />
                                        </SkeletonPlaceholder.Item>
                                    </SkeletonPlaceholder>} 
                            </ScrollView>
                        </View>
                    </ScrollView>
                </SlidingUpPanel> : null}
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
                            onSearchButtonPress={this.handleSearchAddresses}
                            onCancelButtonPress={this.handleLocationCancel}
                        />
                    </View>
                    <View style={styles.results}>
                        {typeof results !== 'undefined' && results.length > 0 ? results.map((item, index) => {
                            if (item.type === "Point Address" || item.type === "Geography") {
                                    return (
                                        <TouchableOpacity key={index} style={styles.listItemTwo} onPress={() => {
                                            this.setState({
                                                selected: item
                                            }, () => {
                                                const newRegion = {
                                                    latitude: item.position.lat,
                                                    longitude: item.position.lon,
                                                    latitudeDelta: 0.0922,
                                                    longitudeDelta: 0.0421
                                                }

                                                this.customMap.animateToRegion(newRegion, 1000);

                                                this._panel_two.hide();

                                                this.refs.searchBar.unFocus();
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
            location: state.location.location_initial,
            latitude: state.location.current_location_user.latitude,
            longitude: state.location.current_location_user.longitude
        };
    } else {
        return {
            location: null
        };
    }
}
export default connect(mapStateToProps, { })(MapViewAllListingsHelper);