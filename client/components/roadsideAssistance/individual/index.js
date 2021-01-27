import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, ScrollView, Linking } from "react-native";
import { Header, Left, Body, Right, Button, Title, Text as NativeText, Icon } from 'native-base';
import styles from './styles.js';
import Gallery from 'react-native-image-gallery';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import MapView, { Marker } from 'react-native-maps';
import _ from "lodash";

const { height, width } = Dimensions.get("window");

class IndividualListingTowCompanyHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        region: null,
        location: null,
        ready: false
    }
}
    componentDidMount() {
        console.log("this passed data", this.props.props.route.params.company);
       
        const company = this.props.props.route.params.company;

        if (_.has(company.location, "position")) {
            this.setState({
                region: {
                    latitude: company.location.position.lat, 
                    longitude: company.location.position.lon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                },
                location: {
                    latitude: company.location.position.lat,
                    longitude: company.location.position.lon
                },
                ready: true
            })   
        } else if (_.has(company.location, "verticalAccuracy")) {
            console.log("has vertical accuracy");
        } else {
            console.log("else");
        }
    }
    render() {
        const company = this.props.props.route.params.company;

        const { region, location, ready } = this.state;

        console.log("individual index.js state", this.state);
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
                        <Title>Individual Listing</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            // this.props.props.navigation.navigate("advertise-create-address-preview");
                        }} transparent>
                            <Image source={require("../../../assets/icons/plus.png")} style={styles.headerIcon} />
                        </Button>
                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <View>
                        <Image style={{ height: 250, width: "100%", flex: 1 }} source={{ uri: company.company_image }} />
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.headerText}>Company - {company.company_name}</Text>
                        <Text style={styles.underlinedMedium}>Underhill, Vermont, United States</Text>
                        <View style={styles.hr} />
                        <View style={{ marginTop: 10 }}>
                            <AwesomeButtonBlue width={width * 0.90} type={"secondary"} onPress={() => {
                                Linking.openURL(`tel:${company.company_phone_number}`)
                            }}>
                                <Image source={require("../../../assets/icons/call.png")} style={{ maxWidth: 40, maxHeight: 40 }}/>
                                <Text> Call company</Text>
                            </AwesomeButtonBlue>
                        </View>
                        <View style={[styles.hr, { marginTop: 20 }]} />
                        <View>
                            <Text style={styles.driverHeader}>Driver(s)</Text>
                            {company.drivers.map((driver, index) => {
                                return (
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{`${driver.drivers_license_first_name} ${driver.drivers_license_middle_name} ${driver.drivers_license_last_name}`}</Text>
                                );
                            })}
                        </View>
                        <View style={styles.hr} />
                        <View>
                            <Text style={styles.driverHeader}>Owner(s)</Text>
                            {company.owners.map((owner, index) => {
                                return (
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{owner}</Text>
                                );
                            })}
                        </View>
                        <View style={styles.hr} />
                        <View>
                            <Text style={styles.driverHeader}>Tow Company Service Rates</Text>
                                <Text style={styles.postDescription}>
                                    Tire Change: ${company.services.change_tire_cost} {"\n"}
                                    Gas Delivery: ${company.services.gas_delivery_cost} {"\n"}
                                    Jumpstart Services: ${company.services.jumpstart_cost} {"\n"}
                                    Stuck Vehicle Removal: ${company.services.remove_stuck_vehicle} {"\n"}
                                    Unlock Door(s) Service: ${company.services.unlock_locked_door_cost}
                                </Text>
                            <View style={styles.hr}/>
                                <Text style={styles.postDescription}>
                                    Flat Rate Assistance Fee: ${company.standard_tow_fees.tow_price} {company.standard_tow_fees.currency} {"\n"}
                                    Cost Per Mile: ${company.standard_tow_fees.per_mile_fee} {company.standard_tow_fees.currency} {"\n"}
                                </Text>
                        </View>
                        <View>
                            <Text style={styles.insuranceHeader}>Insurance information</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: "row", maxWidth: width }}>
                                {company.insurance_info.selected_insurance_policies.map((policy, index) => {
                                    return (
                                        <View style={styles.tag}>
                                            <Text style={styles.innerTag}>{policy}</Text>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        </View>
                        <View style={styles.hr} />
                        <View>
                        {ready === true ? <MapView   
                            style={styles.map} 
                            showsPointsOfInterest={true}
                            showsUserLocation={true}
                            showsTraffic={true}
                            initialRegion={region}
                        >
                            <Marker style={{ }} coordinate={location}>
                                <Image source={require("../../../assets/icons/lifted.png")} style={{ maxWidth: 40, maxHeight: 40 }} />
                            </Marker>    
                        </MapView> : null}
                        </View>
                        <View>
                        <Text style={[styles.driverHeader, { marginTop: 30 }]}>Operational Hours</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Sunday open: {"\n"}{company.operational_hours.sunday_opening}</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Sunday close: {"\n"}{company.operational_hours.sunday_closing}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Monday open: {"\n"}{company.operational_hours.monday_opening}</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Monday close: {"\n"}{company.operational_hours.monday_closing}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Tuesday open: {"\n"}{company.operational_hours.tuesday_opening}</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Tuesday close: {"\n"}{company.operational_hours.tuesday_closing}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Wednesday open: {"\n"}{company.operational_hours.wednesday_opening}</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Wednesday close: {"\n"}{company.operational_hours.wendesday_closing}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Thursday open: {"\n"}{company.operational_hours.thursday_opening}</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Thursday close: {"\n"}{company.operational_hours.thursday_closing}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Friday open: {"\n"}{company.operational_hours.friday_opening}</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Friday close: {"\n"}{company.operational_hours.friday_closing}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", width, height: 75 }}>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left" }}>Saturday open: {"\n"}{company.operational_hours.saturday_opening}</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: width * 0.50 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "left", marginLeft: -10 }}>Saturday close: {"\n"}{company.operational_hours.saturday_closing}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
export default IndividualListingTowCompanyHelper;