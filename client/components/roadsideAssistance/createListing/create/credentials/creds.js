import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Input, Label, Item, Form, Picker, Icon, ListItem, List, Text as NativeText, Content, Card, CardItem } from 'native-base';
import styles from './styles.js';
import CountryPicker from 'react-native-country-picker-modal';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../../../toastConfig.js";
import axios from "axios";
import { Config } from "react-native-config";
import { connect } from "react-redux";
import SlidingUpPanel from 'rn-sliding-up-panel';
import moment from "moment";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import uuid from "react-native-uuid";

const { width, height } = Dimensions.get("window");

const states = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
];

class CredentialsCreateHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        driversLicenseNumber: "",
        isVisible: false,
        country: null,
        selectedState: "",
        issueDate: new Date(),
        driversLicenseFirstName: "",
        driversLicenseMiddleName: "",
        driversLicenseLastName: "",
        birthdate: null,
        birthModalVisible: false,
        issueDatePicked: false,
        drivers: []
    }
}
    handleCountrySelection = (country) => {
        console.log("country", country);

        this.setState({
            country
        })
    }
    handleSearch = () => {
        const configggg = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Content-Type': 'application/json'
            }
        }
        const { query } = this.state;

        axios.get(`https://api.tomtom.com/search/2/search/${query}.json?key=BJ1sWg1ns63unrKLwmPOOQz9GE4V1qpV&language=en-US`).then((res) => {
            console.log(res.data);

            const { results } = res.data;

            this.setState({
                results
            })
        }).catch((err) => {
            console.log("ERRRRRRR", err);
        })
    }
    onStateChange = (selectedState) => {
        this.setState({
            selectedState
        })
    }
    calculateReadiness = () => {
        const { driversLicenseNumber, country, selectedState, issueDate, driversLicenseFirstName, driversLicenseMiddleName, driversLicenseLastName, birthdate, issueDatePicked } = this.state;

        if ((typeof driversLicenseNumber !== "undefined" && driversLicenseNumber.length > 0) && (country !== null) && (typeof selectedState !== "undefined" && selectedState.length > 0) && (issueDatePicked === true) && (typeof driversLicenseFirstName !== "undefined" && driversLicenseFirstName.length > 0) && (typeof driversLicenseLastName !== "undefined" && driversLicenseLastName.length > 0) && (typeof driversLicenseMiddleName !== "undefined" && driversLicenseMiddleName.length > 0)) {
            return false;
        } else {
            return true;
        }
    }
    handleFinalSubmission = () => {
        console.log("handleFinalSubmission clicked");

        const passed_id = this.props.props.route.params.listing.id;

        const { drivers } = this.state;

        axios.post(`${Config.ngrok_url}/update/listing/drivers/license/info/roadside/assistance`, {
            drivers,
            id: this.props.unique_id,
            passed_id
        }).then((res) => {
            if (res.data.message === "Found user and updated DL info!") {
                console.log(res.data);

                const { listing } = res.data;

                this.props.props.navigation.replace("roadside-assistance-insurance-details" , { listing });
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateReadinessMain = () => {
        const { drivers } = this.state;
        if (typeof drivers !== "undefined" && drivers.length > 0) {
            return false;
        } else {
            return true;            
        }
    }
    addDriverInformation = () => {
        console.log("addDriverInformation");

        const { driversLicenseNumber, country, selectedState, issueDate, driversLicenseFirstName, driversLicenseMiddleName, driversLicenseLastName } = this.state;

        this.setState({
            drivers: [...this.state.drivers, {
                drivers_license_number: driversLicenseNumber,
                country,
                selected_state: selectedState,
                issue_date_unformatted: issueDate,
                issue_date: moment(issueDate).format("dddd, MMMM Do YYYY"),
                drivers_license_first_name: driversLicenseFirstName,
                drivers_license_last_name: driversLicenseLastName,
                drivers_license_middle_name: driversLicenseMiddleName,
                id: uuid.v4()
            }],
            driversLicenseFirstName: "",
            driversLicenseLastName: "",
            driversLicenseMiddleName: "",
            country: null,
            selectedState: "",
            issueDate: new Date(),
            driversLicenseNumber: ""
        }, () => {
            this._panel.hide();
        })
    }
    deleteItem = (driver) => {
        this.setState({
            drivers: this.state.drivers.filter((item) => {
                if (item.id !== driver.id) {
                    return item;
                }
            })
        })
    }
    render() {
        const { country, drivers } = this.state;
        console.log("credentials creds.js roadside state", this.state);

        console.log("this.PROPIES", this.props);
        return (
            <Fragment>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.push("roadside-assistance-display-listings");
                        }}>
                            <Image source={require("../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body style={{ left: 0 }}>
                        <Title>Driver's license</Title>
                        <Subtitle>License & more...</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            this._panel.show();
                        }}>
                            <Image source={require("../../../../../assets/icons/plus.png")} style={styles.headerIcon} />
                        </Button>
                    </Right>
                </Header>
                <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 125 }}>
                    <View style={{ backgroundColor: "white", padding: 20 }}>
                        <Text style={{ fontSize: 14 }}>Click the icon at the top right in the header to add new drivers or click the button below</Text>
                        <View style={styles.centered}>
                            <View style={styles.centered}>
                                <Button info onPress={() => {
                                    this._panel.show();
                                }} style={[styles.dateButton, { marginTop: 25 }]}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Add New Driver</NativeText>
                                </Button>
                            </View>
                        </View>
                        <View>
                            <Content padder>
                                {typeof drivers !== "undefined" && drivers.length > 0 ? drivers.map((driver, index) => {
                                    return (
                                        <Card key={index}>
                                            <CardItem header bordered>
                                            <Text>{`${driver.drivers_license_first_name} ${driver.drivers_license_middle_name} ${driver.drivers_license_last_name}`}</Text>
                                            <Right><TouchableOpacity onPress={() => {
                                                this.deleteItem(driver);
                                            }}><Image source={require("../../../../../assets/icons/trash.png")} style={{ maxWidth: 40, maxHeight: 40}} /></TouchableOpacity></Right>
                                            </CardItem>
                                            <CardItem bordered>
                                            <Body>
                                                <Text>
                                                    <List>
                                                        <ListItem style={styles.listitem}>
                                                            <Text>DL Issue Date: {driver.issue_date}</Text>
                                                        </ListItem>
                                                        <ListItem style={styles.listitem}>
                                                            <Text>DL State: {driver.selected_state}</Text>
                                                        </ListItem>
                                                        <ListItem style={styles.listitem}>
                                                            <Text>DL Country: {driver.country.name}</Text>
                                                        </ListItem>
                                                       
                                                    </List>
                                                </Text>
                                            </Body>
                                            </CardItem>
                                            <CardItem footer bordered>
                                                <Text>DL Number: {driver.drivers_license_number}</Text>
                                            </CardItem>
                                        </Card>
                                    );
                                }) : null}
                            </Content>
                        </View>
                    </View>
                    <View style={styles.customBoxer}>
                        <View style={styles.centered}>
                            <View style={styles.centered}>
                                {this.calculateReadinessMain() ? <Button light onPress={() => {
                                    Toast.show({
                                        text1: "Complete each field before continuing..",
                                        text2: "All fields are required and need to be filled out before proceeding",
                                        type: "error",
                                        visibilityTime: 4500,
                                        position: "bottom"
                                    })
                                }} style={styles.dateButton}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Continue To Next Page</NativeText>
                                </Button> : <Button success onPress={this.handleFinalSubmission} style={styles.dateButton}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Continue To Next Page</NativeText>
                                </Button>}
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <SlidingUpPanel allowDragging={false} ref={c => this._panel = c}>
                    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 125, paddingTop: 50 }}>
                        <KeyboardAwareScrollView>
                        <View style={styles.margin}>
                            <Form>
                                <CountryPicker preferredCountries={["US"]} withAlphaFilter={false} withCurrency={true} withCallingCode={true} onSelect={this.handleCountrySelection}/>
                                {country !== null ? <Text style={styles.selectedCountry}>You've selected {country.name}</Text> : null}
                                <Item style={{ width: width * 0.775 }} floatingLabel>
                                    <Label>Drivers License Number</Label>
                                    <Input keyboardType={"numeric"} onChangeText={(value) => {
                                        this.setState({
                                            driversLicenseNumber: value
                                        })
                                    }} value={this.state.driversLicenseNumber} />
                                </Item>
                                <View style={{ marginTop: 30 }}>
                                    <Picker
                                        mode="dropdown"
                                        iosHeader="Select your state"
                                        iosIcon={<Icon name="arrow-down" />} 
                                        placeholder={"Select your state"}
                                        placeholderTextColor={"grey"}
                                        style={{ width: width * 0.90 }}
                                        selectedValue={this.state.selectedState}
                                        onValueChange={this.onStateChange}
                                    >
                                        {states.map((state, index) => {
                                            return <Picker.Item key={index} label={state.name} value={state.name} />;
                                        })}
                                    </Picker>
                                </View>
                                <View style={styles.marginTop30}>
                                    <View style={styles.centered}>
                                    <View style={styles.centered}>
                                        <Button onPress={() => {
                                            this.setState({
                                                isVisible: true
                                            })
                                        }} style={styles.dateButton}>
                                            <NativeText style={{ color: "white", fontWeight: "bold" }}>Select DL Issue Date</NativeText>
                                        </Button>
                                    </View>
                                    </View>
                                </View>
                                <View style={styles.marginTop30}>
                                    <Item style={{ width: width * 0.775 }} floatingLabel>
                                        <Label>DL First Name</Label>
                                        <Input onChangeText={(value) => {
                                            this.setState({
                                                driversLicenseFirstName: value
                                            })
                                        }} value={this.state.driversLicenseFirstName} />
                                    </Item>
                                    <Item style={{ width: width * 0.775 }} floatingLabel>
                                        <Label>DL Middle Name</Label>
                                        <Input onChangeText={(value) => {
                                            this.setState({
                                                driversLicenseMiddleName: value
                                            })
                                        }} value={this.state.driversLicenseMiddleName} />
                                    </Item>
                                    <Item style={{ width: width * 0.775 }} floatingLabel>
                                        <Label>DL Last Name</Label>
                                        <Input onChangeText={(value) => {
                                            this.setState({
                                                driversLicenseLastName: value
                                            })
                                        }} value={this.state.driversLicenseLastName} />
                                    </Item>
                                </View>
                            </Form>
                        </View>
                        <View style={[styles.centered, { marginBottom: 30 }]}>
                            <View style={styles.centered}>
                                {this.calculateReadiness() ? <Button light onPress={() => {
                                    Toast.show({
                                        text1: "Complete each field before continuing..",
                                        text2: "All fields are required and need to be filled out before proceeding",
                                        type: "error",
                                        visibilityTime: 4500,
                                        position: "bottom"
                                    })
                                }} style={styles.dateButton}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Add Driver</NativeText>
                                </Button> : <Button success onPress={() => {
                                    this.addDriverInformation();
                                }} style={styles.dateButton}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Add Driver</NativeText>
                                </Button>}
                            </View>
                        </View>
                        <View style={styles.centered}>
                            <View style={styles.centered}>
                                <Button danger onPress={() => {
                                    this._panel.hide();
                                }} style={styles.dateButton}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Close/Exit</NativeText>
                                </Button>
                            </View>
                        </View>
                        </KeyboardAwareScrollView>
                    </ScrollView>
                </SlidingUpPanel>
                
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <View>
                <Modal onBackdropPress={() => {
                    this.setState({
                        isVisible: false
                    })
                }} isVisible={this.state.isVisible}>
                    <View style={[styles.centered, { backgroundColor: "white", padding: 15 }]}>
                        <Text style={styles.dlText}>Select your DL (Driver's license) issue date...</Text>
                        <DatePicker  
                            onDateChange={(date) => {
                                this.setState({
                                    issueDate: date,
                                    issueDatePicked: true
                                })
                            }}
                            mode="date"
                        />
                        <View style={styles.centered}>
                        <View style={styles.centered}>
                            <Button success onPress={() => {
                                this.setState({
                                    isVisible: false
                                })
                            }} style={[styles.dateButton, { marginBottom: 25 }]}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Accept & Close</NativeText>
                            </Button>
                            <Button danger onPress={() => {
                                this.setState({
                                    isVisible: false
                                })
                            }} style={styles.dateButton}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Close/Exit</NativeText>
                            </Button>
                        </View>
                        </View>
                    </View>
                </Modal>
                <Modal onBackdropPress={() => {
                    this.setState({
                        birthModalVisible: false
                    })
                }} isVisible={this.state.birthModalVisible}>
                    <View style={[styles.centered, { backgroundColor: "white", padding: 15 }]}>
                        <Text style={styles.dlText}>Select your DL (Driver's license) issue date...</Text>
                        <DatePicker  
                            onDateChange={(date) => {
                                this.setState({
                                    issueDate: date
                                })
                            }}
                            mode="date"
                        />
                        <View style={styles.centered}>
                        <View style={styles.centered}>
                            <Button success onPress={() => {
                                this.setState({
                                    birthModalVisible: false
                                })
                            }} style={[styles.dateButton, { marginBottom: 25 }]}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Accept & Close</NativeText>
                            </Button>
                            <Button danger onPress={() => {
                                this.setState({
                                    birthModalVisible: false
                                })
                            }} style={styles.dateButton}>
                                <NativeText style={{ color: "white", fontWeight: "bold" }}>Close/Exit</NativeText>
                            </Button>
                        </View>
                        </View>
                    </View>
                </Modal>
                
                </View>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(CredentialsCreateHelper);