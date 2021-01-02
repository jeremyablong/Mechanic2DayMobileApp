import React, { Component, Fragment } from 'react'
import styles from "./styles.js";
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Left, Button, Right, Body, Title, Text as NativeText, Content, Card, CardItem, Thumbnail } from 'native-base';
import SearchBar from 'react-native-search-bar';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import axios from "axios";
import { Config } from "react-native-config";
import _ from "lodash";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Dialog from "react-native-dialog";


class HomepageListingsCreateHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        searchValue: "",
        user: null,
        isVisible: false,
        listing: null
    }
}
    handleSearch = () => {
        console.log("handleSearch");
    }
    handleCancelSearch = () => {
        console.log("handleCancelSearch");
    }
    componentDidMount() {
        setTimeout(() => {
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
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        },  400);
    }
    handleComplexRedirect = (listing) => {
        switch (listing.page) {
            case 2:
                this.props.props.navigation.navigate("create-vehicle-listing-two", { listing });
                break;
            case 3:
                this.props.props.navigation.navigate("create-vehicle-listing-three", { listing });
                break;
            case 4:     
                this.props.props.navigation.navigate("create-vehicle-listing-four", { listing });
                break;
            case 5:     
                this.props.props.navigation.navigate("create-vehicle-listing-five", { listing });
                break;
            default:
                break;
        }
    }
    renderProgressBarEach = (listing) => {
        switch (listing.page) {
            case 1:
                return <Progress.Bar progress={0.15} width={300} />;
                break;
            case 2:
                return <Progress.Bar progress={0.3} width={300} />;
                break;
            case 3:
                return <Progress.Bar progress={0.45} width={300} />;
                break;
            case 4:
                return <Progress.Bar progress={0.6} width={300} />;
                break;
            case 5:
                return <Progress.Bar progress={0.85} width={300} />;
                break;
            default:
                break;
        }
    }
    handleDeletion = () => {
        const { listing } = this.state;

        console.log("handleDeletion");

        axios.post(`${Config.ngrok_url}/delete/listing/broken/vehicle`, {
            listing,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Successfully deleted listing!") {
                console.log(res.data);

                const { user } = res.data;

                this.setState({
                    user,
                    isVisible: false
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    renderPercentage = (listing) => {
        switch (listing.page) {
            case 1:
                return "15%";
                break;
            case 2:
                return "30%";
                break;
            case 3:
                return "45%";
                break;
            case 4:
                return "60%";
                break;
            case 5: 
                return "85%";
                break;  
            default:
                break;
        }
    } 
    render() {
        const { user } = this.state;
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.navigate("homepage-main");
                        }} transparent>
                            <Image source={require('../../../../../../assets/icons/go-back.png')} style={styles.icon} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -20 }}>Listings - Homepage</Title>
                    </Left>
                    <Right>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.navigate("list-vehicle-start");
                        }}>
                            <Image source={require('../../../../../../assets/icons/plus.png')} style={styles.iconSmaller} />
                        </Button>
                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 150 }} style={styles.container}>
                    <SearchBar
                        ref="searchBar"
                        placeholder="Search"
                        onChangeText={(value) => {
                            this.setState({
                                searchValue: value
                            })
                        }}
                        onSearchButtonPress={this.handleSearch}
                        onCancelButtonPress={this.handleCancelSearch}
                    />
                    <View style={[styles.centered, { marginTop: 15 }]}>
                        <View style={styles.centered}>
                            <Button style={styles.borderedButton} bordered success onPress={() => {
                                this.props.props.navigation.navigate("list-vehicle-start");
                            }}>
                                <NativeText style={{ color: "black" }}>List another vehicle</NativeText>
                            </Button>
                        </View>
                    </View>
                    <Content style={{ padding: 20 }}>
                        <View style={{ margin: 20 }}>
                            <Text style={styles.activeListingText}>Active Listings</Text>
                            <Text>These listings are live and visible by other members on this app.</Text>
                        </View>
                        {user !== null && _.has(user, "broken_vehicles_listings") ? user.broken_vehicles_listings.map((listing, index) => {
                            console.log("listing", listing);
                            if (listing.live === true) {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        this.props.props.navigation.push("view-preview-listing-vehicle", { listing });
                                    }}>
                                        <Card style={styles.cardCustom}>
                                            <CardItem>
                                            <Left>
                                                <Body>
                                                <Text style={{ fontSize: 18, color: "blue", fontWeight: "bold" }}>{`${listing.year} ${listing.make} ${listing.model} ${listing.trim}`}</Text>
                                                <Text>{listing.description.slice(0, 125)}{typeof listing.description !== "undefined" && listing.description.length > 125 ? "..." : ""}</Text>
                                                </Body>
                                            </Left>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Image source={{ uri: listing.photos[0] }} style={{ width: "97.5%", height: 225 }} />
                                                    <View style={styles.centered}>
                                                        
                                                    </View>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </TouchableOpacity>
                                );
                            }
                        }) : <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                                <SkeletonPlaceholder.Item marginLeft={20}>
                                <SkeletonPlaceholder.Item width={250} height={20} borderRadius={4} />
                                <SkeletonPlaceholder.Item
                                    marginTop={6}
                                    width={80}
                                    height={20}
                                    borderRadius={4}
                                />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder.Item>
                            <View style={{ marginTop: 20 }} />
                            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                                <SkeletonPlaceholder.Item marginLeft={20}>
                                <SkeletonPlaceholder.Item width={250} height={20} borderRadius={4} />
                                <SkeletonPlaceholder.Item
                                    marginTop={6}
                                    width={80}
                                    height={20}
                                    borderRadius={4}
                                />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>}
                    </Content>
                    <Content style={{ padding: 20 }}>
                        <View style={{ margin: 20 }}>
                            <Text style={styles.activeListingText}>In progress</Text>
                            <Text>These listings aren't active yet and are saved from where you last left off.</Text>
                        </View>
                            {user !== null && _.has(user, "broken_vehicles_listings") ? user.broken_vehicles_listings.map((listing, index) => {
                                console.log("listing", listing);
                                if (listing.live === false) {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            this.handleComplexRedirect(listing)
                                        }}>
                                            <Card style={styles.cardCustom}>
                                                <CardItem>
                                                <Left>
                                                    <Thumbnail style={{ minWidth: 75, minHeight: 75 }} source={require("../../../../../../assets/images/placeholder.png")} />
                                                    <Body>
                                                    <Text style={{ fontSize: 18, color: "blue", fontWeight: "bold" }}>{`${listing.year} ${listing.make} ${listing.model} ${listing.trim}`}</Text>
                                                    </Body>
                                                </Left>
                                                </CardItem>
                                                <CardItem>
                                                <Body>
                                                    {_.has(listing, "photos") ? <Image source={{ uri: listing.photos[0] }} style={{ width: "95%", height: 250 }} /> : null}
                                                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>Finish your listing</Text>
                                                    <Text>You're {this.renderPercentage(listing)} of the way there!</Text>
                                                    <View style={{ marginTop: 15 }}>
                                                        {this.renderProgressBarEach(listing)}
                                                    </View>
                                                </Body>
                                                </CardItem>
                                                <CardItem>
                                                
                                                <Right>
                                                    <Button transparent textStyle={{color: '#87838B'}}>
                                                
                                                    <Text>Pick up where you left off</Text>
                                                    </Button>
                                                </Right>
                                                </CardItem>
                                            </Card>
                                        </TouchableOpacity>
                                    );
                                }
                            }) : <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                    <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                                    <SkeletonPlaceholder.Item marginLeft={20}>
                                    <SkeletonPlaceholder.Item width={250} height={20} borderRadius={4} />
                                    <SkeletonPlaceholder.Item
                                        marginTop={6}
                                        width={80}
                                        height={20}
                                        borderRadius={4}
                                    />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                                <View style={{ marginTop: 20 }} />
                                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                    <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                                    <SkeletonPlaceholder.Item marginLeft={20}>
                                    <SkeletonPlaceholder.Item width={250} height={20} borderRadius={4} />
                                    <SkeletonPlaceholder.Item
                                        marginTop={6}
                                        width={80}
                                        height={20}
                                        borderRadius={4}
                                    />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder>}
                            <View style={{ margin: 20 }}>
                                <Text style={styles.activeListingText}>Innactive Listings</Text>
                                <Text>Inactive listings are listings that are old, removed or deleted.</Text>
                                <View style={{ marginTop: 15 }} />
                                <SkeletonPlaceholder>
                                    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                                        <SkeletonPlaceholder.Item marginLeft={20}>
                                        <SkeletonPlaceholder.Item width={250} height={20} borderRadius={4} />
                                        <SkeletonPlaceholder.Item
                                            marginTop={6}
                                            width={80}
                                            height={20}
                                            borderRadius={4}
                                        />
                                        </SkeletonPlaceholder.Item>
                                    </SkeletonPlaceholder.Item>
                                    <View style={{ marginTop: 20 }} />
                                    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                                        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                                        <SkeletonPlaceholder.Item marginLeft={20}>
                                        <SkeletonPlaceholder.Item width={250} height={20} borderRadius={4} />
                                        <SkeletonPlaceholder.Item
                                            marginTop={6}
                                            width={80}
                                            height={20}
                                            borderRadius={4}
                                        />
                                        </SkeletonPlaceholder.Item>
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder>
                            </View>
                        </Content>
                        <View>
                            <Dialog.Container visible={this.state.isVisible}>
                            <Dialog.Title>Delete Listing</Dialog.Title>
                            <Dialog.Description>
                                Do you want to delete this listing? You cannot undo this action.
                            </Dialog.Description>
                            <Dialog.Button onPress={() => {
                                this.setState({
                                    isVisible: false
                                })
                            }} label="Cancel" />
                            <Dialog.Button onPress={this.handleDeletion} label="Delete" />
                            </Dialog.Container>
                        </View>
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    };
}
export default connect(mapStateToProps, { })(HomepageListingsCreateHelper);