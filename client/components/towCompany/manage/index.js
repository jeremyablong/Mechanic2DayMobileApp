import React, { Fragment, Component } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Text as NativeText, Button, List, ListItem, Thumbnail } from 'native-base';
import styles from './styles.js';
import axios from "axios";
import { Config } from "react-native-config";
import { connect } from "react-redux";
import Dialog from "react-native-dialog";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


const { width, height } = Dimensions.get("window");

class TowCompanyManageDriversHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        drivers: [],
        isVisible: false,
        selected: null,
        error: false,
        isVisibleTwo: false,
        selectedTwo: null
    }
}
    componentDidMount() {
        axios.get(`${Config.ngrok_url}/gather/tow/drivers/pending`, {
            params: {
                id: this.props.unique_id
            }
        }).then((res) => {
            if (res.data.message === "Gathered Pending Drivers!") {
                console.log(res.data);

                const { drivers } = res.data;

                const driver_array = [];

                const promiseee = new Promise((resolve, reject) => {
                    if (typeof drivers !== "undefined" && drivers.length > 0) {
                        for (let index = 0; index < drivers.length; index++) {
                            const driver = drivers[index];
                            
                            axios.post(`${Config.ngrok_url}/gather/breif/data/two`, {
                                id: driver.user_id
                            }).then((response) => {
                                if (response.data.message === "Gathered user's data!") {
                                    console.log(response.data);
    
                                    const { user } = response.data;
    
                                    driver.fullName = user.fullName;
                                    driver.profilePics = user.profilePics;
                                    driver.gender = user.gender;
                                    driver.register_date = user.register_date;
    
                                    driver_array.push(driver);
    
                                    if (driver_array.length === drivers.length) {
                                        resolve(driver_array);
                                    }
                                } else { 
                                    console.log("Err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } 
                    } else {
                        this.setState({
                            error: true
                        })
                    }
                })

                promiseee.then((passedData) => {
                    this.setState({
                        drivers: passedData
                    })
                })
            } else { 
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    addToTeam = () => {
        console.log("addToTeam clicked");

        const { selected } = this.state;

        axios.post(`${Config.ngrok_url}/approve/driver/for/team`, {
            selected,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Driver approved!") {
                console.log(res.data);

                const { drivers } = res.data;
                
                const driver_array = [];

                const promiseee = new Promise((resolve, reject) => {
                    if (typeof drivers !== "undefined" && drivers.length > 0) {
                        for (let index = 0; index < drivers.length; index++) {
                            const driver = drivers[index];
                            
                            axios.post(`${Config.ngrok_url}/gather/breif/data/two`, {
                                id: driver.user_id
                            }).then((response) => {
                                if (response.data.message === "Gathered user's data!") {
                                    console.log(response.data);
    
                                    const { user } = response.data;
    
                                    driver.fullName = user.fullName;
                                    driver.profilePics = user.profilePics;
                                    driver.gender = user.gender;
                                    driver.register_date = user.register_date;
    
                                    driver_array.push(driver);
    
                                    if (driver_array.length === drivers.length) {
                                        resolve(driver_array);
                                    }
                                } else { 
                                    console.log("Err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        } 
                    } else {
                        this.setState({
                            error: true
                        })
                    }
                })

                promiseee.then((passedData) => {
                    this.setState({
                        drivers: passedData
                    })
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })

        this.setState({
            isVisible: false
        })
    }
    render() {
        const { drivers, error } = this.state;

        console.log("towCompanies manage: ", this.state);
        return (
            <Fragment>
                <Header>
                    <Left>  
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left> 
                    <Body>
                        <Title>Manage</Title>
                        <Subtitle>Manage Tow Drivers</Subtitle>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <View style={styles.centered}>
                        <View style={styles.centered}>
                            <View style={{ marginTop: 20, marginBottom: 20 }}>
                                <AwesomeButtonBlue onPress={() => {
                                    this.props.props.navigation.navigate("advertise-roadside-assistance-main");
                                }} width={width * 0.90} type={"secondary"}>List your company today!</AwesomeButtonBlue>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.topText}>Pending drivers...</Text>
                    {typeof drivers !== "undefined" && drivers.length > 0 ? drivers.map((driver, index) => {
                        if (driver.approved === false) {
                            return (
                                <Fragment>
                                    <ListItem thumbnail>
                                        <Left>
                                            <Thumbnail square source={driver.profilePics.length > 0 ? { uri: driver.profilePics[driver.profilePics.length - 1].full_url } : require("../../../assets/images/not-availiable.jpg")} />
                                        </Left>
                                        <Body>
                                            <NativeText>{driver.fullName}</NativeText>
                                            <NativeText note numberOfLines={2}>Registered on: {"\n"}{driver.register_date}</NativeText>
                                        </Body>
                                        <Right>
                                            <Button onPress={() => {
                                                this.setState({
                                                    isVisible: true,
                                                    selected: driver
                                                })
                                            }} transparent>
                                                <NativeText>Approve</NativeText>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                </Fragment>
                            );
                        }
                    }) : <View style={{ margin: 20 }}><SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}/>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}/>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    
                    <View style={{ marginTop: 30 }}/>
                </SkeletonPlaceholder></View>}
                    <View style={styles.hr} />
                    {error === true ? <View style={styles.margin}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 30, textAlign: "center" }}>There are currently no pending requests to join your team...</Text>
                    <View style={{ marginTop: 20 }}>
                        <AwesomeButtonBlue onPress={() => {
                            this.props.props.navigation.navigate("advertise-roadside-assistance-main");
                        }} width={width * 0.90} type={"secondary"}>List your company today!</AwesomeButtonBlue>
                    </View>
                    <View style={styles.hr} />
                    </View> : null}
                    
                    <Text style={styles.topText}>Already approved drivers...</Text>
                    {typeof drivers !== "undefined" && drivers.length > 0 ? drivers.map((driver, index) => {
                        if (driver.approved === true) {
                            console.log("driver:", driver);
                            return (
                                <Fragment>
                                    <ListItem thumbnail>
                                        <Left>
                                            <Thumbnail square source={driver.profilePics.length > 0 ? { uri: driver.profilePics[driver.profilePics.length - 1].full_url } : require("../../../assets/images/not-availiable.jpg")} />
                                        </Left>
                                        <Body>
                                            <NativeText>{driver.fullName}</NativeText>
                                            <NativeText note numberOfLines={2}>Registered on: {"\n"}{driver.register_date}</NativeText>
                                        </Body>
                                        <Right>
                                            <Button onPress={() => {
                                                this.setState({
                                                    isVisibleTwo: true,
                                                    selectedTwo: driver
                                                })
                                            }} transparent>
                                                <NativeText>REMOVE</NativeText>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                </Fragment>
                            );
                        }
                    }) : <View style={{ margin: 20 }}><SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}/>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}/>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                        <View style={{ width: width * 0.70, height: 20, borderRadius: 4 }} />
                        <View
                            style={{ marginTop: 6, width: width * 0.60, height: 20, borderRadius: 4 }}
                        />
                        </View>
                    </View>
                    
                </SkeletonPlaceholder></View>}
                    
                    <View>
                        <Dialog.Container visible={this.state.isVisible}>
                        <Dialog.Title>Approve Driver?</Dialog.Title>
                        <Dialog.Description>
                            Are you sure you want to approve this driver? They will be added to your team.
                        </Dialog.Description>
                        <Dialog.Button onPress={() => {
                            this.setState({
                                isVisible: false
                            })
                        }} label="Cancel" />
                        <Dialog.Button onPress={this.addToTeam} label="Add To Team" />
                        </Dialog.Container>
                    </View>
                    <View>
                        <Dialog.Container visible={this.state.isVisibleTwo}>
                        <Dialog.Title>REMOVE Driver from team?</Dialog.Title>
                        <Dialog.Description>
                            Are you sure you want to delete this driver? This is a permanant action.
                        </Dialog.Description>
                        <Dialog.Button onPress={() => {
                            this.setState({
                                isVisibleTwo: false
                            })
                        }} label="Cancel" />
                        <Dialog.Button onPress={this.addToTeam} label="Remove from team" />
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
    }
}
export default connect(mapStateToProps, {  })(TowCompanyManageDriversHelper);