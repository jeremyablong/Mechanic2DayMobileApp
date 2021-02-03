import React, { Component, Fragment } from 'react';
import { View, Text, Image, Animated, TouchableOpacity, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Header, Left, Button, Item, Label, Input, List, Text as NativeText, Picker, Right, Body, ListItem } from 'native-base';
import styles from './styles.js';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import SlidingUpPanel from 'rn-sliding-up-panel';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Switch } from 'react-native-switch';
import RBSheet from "react-native-raw-bottom-sheet";
import axios from "axios";
import Modal from 'react-native-modal';
import { Config } from "react-native-config";
import { connect } from "react-redux";
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../../../../../components/toastConfig.js";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


const { width, height } = Dimensions.get("window");

class PageOneVehicleFormHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        olderThan1981: false,
        vin: "",
        vinAccepted: false,
        selectedVehicle: null,
        isVisible: false,
        odemeter: "",
        makes: [],
        selectedYear: "",
        selectedMake: "",
        showCustomization: false,
        models: [],
        trims: [],
        selectedTrim: "",
        transmissions: [],
        selectedTransmission: "",
        selectedEngine: "",
        engines: [],
        showAlernative: false
    }
}
    onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    }
    componentDidMount() {
        axios.get(`https://carmakemodeldb.com/api/v1/car-lists/get/years/desc?api_token=${Config.carmakemodeldb_api_token}`).then((res) => {
            if (res.data) {
                console.log("THE GET ALL YEARS MAGIC: ", res.data);

                this.setState({
                    years: res.data
                })
            }
        }).catch((err) => {
            console.log("THE ERR MAGIC: ", err);
        })
    }
    handleGeneralInfoSubmission = () => {
        const { selectedYear, selectedMake, selectedModel, selectedTrim, selectedTransmission, selectedEngine } = this.state;

        this.setState({
            selectedVehicle: {
                make: selectedMake,
                model: selectedModel,
                year: selectedYear,
                fuelType: "unknown",
                body: "unknown",
                trim: selectedTrim,
                transmission: selectedTransmission,
                vehicleType: "unknown",
                selectedEngine: selectedEngine.length > 0 ? selectedEngine : "unknown",
            },
            vinAccepted: true
        }, () => {
            this.RBSheet.close();
        })
    }
    handleVinSubmission = () => {
        const configgg = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${this.state.vin}?format=json`, {}, configgg).then((res) => {
            if (res.data) {
                console.log("THE MAGIC: ", res.data);

                const { Results } = res.data;

                if (Results[0].ErrorText !== "0 - VIN decoded clean. Check Digit (9th position) is correct") {
                    this.setState({
                        vinAccepted: true,
                        selectedVehicle: {
                            make: Results[0].Make,
                            model: Results[0].Model,
                            year: Results[0].ModelYear,
                            fuelType: Results[0].FuelTypePrimary,
                            body: Results[0].BodyClass,
                            trim: Results[0].Trim,
                            vehicleType: Results[0].VehicleType,
                            transmission: "unknown",
                            selectedEngine: "unknown"
                        }
                    }, () => {
                        this.RBSheet.close();

                        Toast.show({
                            text1: "ERROR! 🚫",
                            position: "top",
                            type: "error",
                            text2: "VIN did not match any results - INVALID VIN NUMBER.",
                            visibilityTime: 5000
                        })
                    })   
                } else {
                    this.setState({
                        vinAccepted: true,
                        selectedVehicle: {
                            make: Results[0].Make,
                            model: Results[0].Model,
                            year: Results[0].ModelYear,
                            fuelType: Results[0].FuelTypePrimary,
                            body: Results[0].BodyClass,
                            trim: Results[0].Trim,
                            vehicleType: Results[0].VehicleType,
                            transmission: "unknown",
                            selectedEngine: "unknown"
                        }
                    }, () => {
                        this.RBSheet.close();
                    })
                }
            }
        }).catch((err) => {
            console.log("THE ERR MAGIC: ", err);
        });
    }
    proceedToNextPage = () => {
        console.log("proceedToNextPage");
    }
    renderSecondSetButtons = () => {
        const { showAlernative, selectedTrim, odemeter } = this.state;

        if (showAlernative === false) {
            if (odemeter.length > 0) {
                return (
                    <Fragment>
                        <Button info style={[styles.submitBtnContinue, { marginTop: 30 }]} onPress={() => {
                            this.proceedToNextPage()
                        }}>
                            <NativeText style={{ color: "white", fontWeight: "bold" }}>Next</NativeText>
                        </Button>
                    </Fragment>
                );
            } 
        } else {
            
            if (typeof selectedTrim !== "undefined" && selectedTrim.length > 0) {
                return (
                    <Fragment>
                        <Button info style={[styles.submitBtnContinue, { marginTop: 30, marginBottom: 20 }]} onPress={() => {
                            
                        }}>
                            <NativeText style={{ color: "white", fontWeight: "bold" }}>Next</NativeText>
                        </Button>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <Button info style={[styles.greyButton, { marginTop: 30 }]} onPress={() => {}}>
                            <NativeText style={{ color: "white", fontWeight: "bold" }}>Next</NativeText>
                        </Button>
                    </Fragment>
                );
            }
        }
    }
    renderInfo = () => {
        const { vin, vinAccepted, selectedVehicle, olderThan1981, selectedTransmission, selectedEngine, odemeter } = this.state;

        if (vinAccepted === true && selectedVehicle !== null) {
            return (
                <Fragment>
                <Text style={{ fontSize: 18, marginTop: 20 }}>What car do you have?</Text>
                    <ListItem style={styles.bordered}>
                        <Left>
                            <NativeText style={{ color: "black" }}>{`${selectedVehicle.make} ${selectedVehicle.model} ${selectedVehicle.year}`} {"\n"}<NativeText style={{ color: "grey" }}>VIN #{vin}</NativeText></NativeText>
                        </Left>
     
                        <Right>
                            <TouchableOpacity onPress={() => {
                                this.RBSheet.open();
                            }}>
                                <NativeText style={{ color: "#6441A4", fontSize: 18, fontWeight: "bold" }}>EDIT</NativeText>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            isVisible: true
                        })
                    }}>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <Image style={{ maxWidth: 40, maxHeight: 40, marginRight: 10 }} source={require("../../../../../../assets/icons/info-two.png")} />
                            <Text style={{ fontSize: 18, marginTop: 10 }}>View Vehicle Information</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.margin}>
                        <Item style={[styles.minWidthItem, { marginTop: 30 }]} stackedLabel>
                            <Label style={{ left: 0, position: "absolute", paddingBottom: 10, top: -12 }}>Odometer (mileage)</Label>
                            <Input keyboardType={"numeric"} style={styles.minWidthItem} value={this.state.odemeter} placeholderTextColor={"grey"} placeholder={"190000"} onChangeText={(value) => {
                                this.setState({
                                    odemeter: value
                                })
                            }} />
                        </Item>
                        {typeof this.state.selectedVehicle.trim !== 'undefined' && this.state.selectedVehicle.trim !== null && this.state.selectedVehicle.trim.length > 0 ? <View style={styles.itemItemTwo} stackedLabel>
                            <Text>Trim: {this.state.selectedVehicle.trim}</Text>
                        </View> : null}
                        {typeof this.state.selectedVehicle.body !== 'undefined' && this.state.selectedVehicle.body !== null && this.state.selectedVehicle.body.length > 0 ? <View style={styles.itemItemTwo} stackedLabel>
                            <Text>Style: {this.state.selectedVehicle.body}</Text>
                        </View> : null}
                        {typeof selectedTransmission !== 'undefined' && selectedTransmission !== null && selectedTransmission.length > 0 ? <View style={styles.itemItemTwo} stackedLabel>
                            <Text>Transmission: {this.state.selectedVehicle.transmission}</Text>
                        </View> : null}
                        {typeof selectedEngine !== 'undefined' && selectedEngine !== null && selectedEngine.length > 0 ? <View style={styles.itemItemTwo} stackedLabel>
                            <Text>Engine: {this.state.selectedVehicle.selectedEngine}</Text>
                        </View> : null}
                    </View>

                    {typeof odemeter !== "undefined" && odemeter.length >= 3 ? <Button info style={[styles.submitBtnContinue, { marginTop: 20, marginBottom: 20 }]} onPress={() => {
                        this.handleFinalSubmissionToDB();
                    }}>
                        <NativeText style={{ color: "white", fontWeight: "bold" }}>Next</NativeText>
                    </Button> : null}
                </Fragment>
            );
        }
    }
    handleFinalSubmissionToDB = () => {
        const { selectedVehicle, vin, olderThan1981, odemeter} = this.state;

        axios.post(`${Config.ngrok_url}/add/new/information/vehicle/listing/page/one`, {
            olderThan81: olderThan1981,
            selectedVehicle,
            vin,
            id: this.props.unique_id,
            odemeter
        }).then((res) => {
            if (res.data.message === "Successfully posted new information to DB!") {

                console.log(res.data);

                this.props.props.navigation.replace("create-vehicle-listing-two", { listing: res.data.listing });
                
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    calculateMakes = () => {
        console.log("calculateMakes");

        const { selectedYear } = this.state;

        axios.get(`https://carmakemodeldb.com/api/v1/car-lists/get/makes/${selectedYear}?api_token=${Config.carmakemodeldb_api_token}`).then((res) => {
            if (res.data) {
                console.log("THE GET ALL MAKES FOR YEAR SELECTED - MAGIC: ", res.data);

                this.setState({
                    makes: res.data
                })
            }
        }).catch((err) => {
            console.log("THE ERR MAGIC: ", err);
        })
    }
    calculateModels = () => {
        console.log("calculateModels");

        const { selectedYear, selectedMake } = this.state;

        axios.get(`https://carmakemodeldb.com/api/v1/car-lists/get/models/${selectedYear}/${selectedMake}?api_token=${Config.carmakemodeldb_api_token}`).then((res) => {
            if (res.data) {
                console.log("MODELS: ", res.data);

                this.setState({
                    models: res.data
                })
            }
        }).catch((err) => {
            console.log("THE ERR MAGIC: ", err);
        })
    }
    calculateTrims = () => {
        console.log("calculateModels");

        const { selectedYear, selectedMake, selectedModel } = this.state;

        axios.get(`https://carmakemodeldb.com/api/v1/car-lists/get/trims/${selectedYear}/${selectedMake}/${selectedModel}?api_token=${Config.carmakemodeldb_api_token}`).then((res) => {
            if (res.data) {
                console.log("TRIMS: ", res.data);

                this.setState({
                    trims: res.data
                })
            }
        }).catch((err) => {
            console.log("THE ERR MAGIC: ", err);
        })
    }
    calculateTransmissions = () => {
        const { selectedYear, selectedMake, selectedModel, selectedTrim } = this.state;

        axios.get(`https://carmakemodeldb.com/api/v1/car-lists/get/car/transmissions/${selectedYear}/${selectedMake}/${selectedModel}/${selectedTrim}?api_token=${Config.carmakemodeldb_api_token}`).then((res) => {
            if (res.data) {
                console.log("TRIMS: ", res.data);

                this.setState({
                    transmissions: res.data
                })
            }
        }).catch((err) => {
            console.log("THE ERR MAGIC: ", err);
        })
    }
    calculateEngines = () => {
        console.log("calculateEngines");

        const { selectedYear, selectedMake, selectedModel, selectedTrim, selectedTransmission } = this.state;

        axios.get(`https://carmakemodeldb.com/api/v1/car-lists/get/car/engines/${selectedYear}/${selectedMake}/${selectedModel}/${selectedTrim}/${selectedTransmission}?api_token=${Config.carmakemodeldb_api_token}`).then((res) => {
            if (res.data) {
                console.log("ENGINES: ", res.data);

                this.setState({
                    engines: res.data
                })
            }
        }).catch((err) => {
            console.log("THE ERR MAGIC: ", err);
        })
    }
    renderConditionalSwitch = () => {
        const { years, makes, models, trims, transmissions, engines } = this.state;
        
        if (this.state.showCustomization === true) {
            return (
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }}>
                <View style={{ marginLeft: 20, marginTop: 15 }}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            showAlernative: false,
                            showCustomization: false
                        })
                    }}>
                        <Text style={{ fontSize: 18, color: "blue" }}>I found my VIN</Text>
                    </TouchableOpacity>
                </View>
                    <View style={{ marginTop: 40, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Enter your vehicle details manually</Text>
                        
                        {typeof years !== "undefined" && years.length > 0 ? <Picker 
                            selectedValue={this.state.selectedYear}
                            onValueChange={(itemValue) =>
                                this.setState({
                                    selectedYear: itemValue,
                                    selectedModel: "",
                                    selectedTrim: "",
                                    selectedTransmission: "",
                                    models: [],
                                    trims: [],
                                    transmissions: [],
                                    selectedEngine: "",
                                    engines: [],
                                    makes: []
                                }, () => {
                                    this.calculateMakes();
                                })
                            }
                            style={styles.pickerPicker}
                            placeholder={"Select the YEAR of your vehicle..."}
                            placeholderTextColor={"grey"}
                        >
                            {years.map((year, index) => {
                                return <Picker.Item label={year.year} value={year.year} />;
                            })} 
                        </Picker> : null}

                        <View style={{ marginTop: 20 }}>
                            {typeof makes !== "undefined" && makes.length > 0 ? <Picker 
                                selectedValue={this.state.selectedMake}
                                onValueChange={(itemValue) =>
                                    this.setState({
                                        selectedMake: itemValue,
                                        selectedModel: "",
                                        selectedTrim: "",
                                        selectedTransmission: "",
                                        models: [],
                                        trims: [],
                                        transmissions: [],
                                        selectedEngine: "",
                                        engines: []
                                    }, () => {
                                        this.calculateModels();
                                    })
                                }
                                style={styles.pickerPicker}
                                placeholder={"Select the MAKE of your vehicle..."}
                                placeholderTextColor={"grey"}
                            >
                                {makes.map((make, index) => {
                                    return <Picker.Item label={make.make} value={make.make} />;
                                })} 
                            </Picker> : null}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            {typeof models !== "undefined" && models.length > 0 ? <Picker 
                                selectedValue={this.state.selectedModel}
                                onValueChange={(itemValue) =>
                                    this.setState({
                                        selectedModel: itemValue,
                                        selectedTrim: "",
                                        selectedTransmission: "",
                                        trims: [],
                                        transmissions: [],
                                        selectedEngine: "",
                                        engines: []
                                    }, () => {
                                        this.calculateTrims();
                                    })
                                }
                                style={styles.pickerPicker}
                                placeholder={"Select the MODEL of your vehicle..."}
                                placeholderTextColor={"grey"}
                            >
                                {models.map((model, index) => {
                                    return <Picker.Item label={model.model} value={model.model} />;
                                })} 
                            </Picker> : null}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            {typeof trims !== "undefined" && trims.length > 0 ? <Picker 
                                selectedValue={this.state.selectedTrim}
                                onValueChange={(itemValue) =>
                                    this.setState({
                                        selectedTrim: itemValue,
                                        selectedTransmission: "",
                                        transmissions: [],
                                        selectedEngine: "",
                                        engines: []
                                    }, () => {
                                        this.calculateTransmissions();
                                    })
                                }
                                style={styles.pickerPicker}
                                placeholder={"Select the TRIM of your vehicle..."}
                                placeholderTextColor={"grey"}
                            >
                                {trims.map((trim, index) => {
                                    return <Picker.Item label={trim.trim} value={trim.trim} />;
                                })} 
                            </Picker> : null}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            {typeof transmissions !== "undefined" && transmissions.length > 0 ? <Picker 
                                selectedValue={this.state.selectedTransmission}
                                onValueChange={(itemValue) =>
                                    this.setState({
                                        selectedTransmission: itemValue,
                                        selectedEngine: "",
                                        engines: []
                                    }, () => {
                                        this.calculateEngines();
                                    })
                                }
                                style={styles.pickerPicker}
                                placeholder={"Select the TRANSMISSION of your vehicle..."}
                                placeholderTextColor={"grey"}
                            >
                                {transmissions.map((transmission, index) => {
                                    return <Picker.Item label={transmission.transmission} value={transmission.transmission} />;
                                })} 
                            </Picker> : null}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            {typeof engines !== "undefined" && engines.length > 0 ? <Picker 
                                selectedValue={this.state.selectedEngine}
                                onValueChange={(itemValue) =>
                                    this.setState({
                                        selectedEngine: itemValue
                                    })
                                }
                                style={styles.pickerPicker}
                                placeholder={"Select the ENGINE of your vehicle..."}
                                placeholderTextColor={"grey"}
                            >
                                {engines.map((engine, index) => {
                                    return <Picker.Item label={engine.engine} value={engine.engine} />;
                                })} 
                            </Picker> : null}
                        </View>
                        
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <Fragment>
                    <View style={{ margin: 20 }}>
                        <Item floatingLabel>
                            <Label>VIN (Identification number)</Label>
                            <Input  
                                style={{ color: "#6441a5" }}
                                autoCapitalize="characters" 
                                placeholderTextColor={"grey"} 
                                placeholder={"H3KLSM4K2L0SKSL10"} 
                                value={this.state.vin} 
                                onChangeText={(value) => {
                                    this.setState({
                                        vin: value.toUpperCase()
                                    })
                                }} 
                            />
                        </Item>
                        
                    </View>
                    <View style={{ margin: 20 }}>
                        <TouchableOpacity onPress={() => {
                        
                            this.setState({
                                showCustomization: true,
                                showAlernative: true,
                                vin: ""
                            })
                        }}>
                            <Text style={{ fontSize: 18, color: "#6441a5" }}>I can't find my VIN number?</Text>
                        </TouchableOpacity>
                    </View>
                </Fragment>
            );
        }
    }
    renderbottomButton = () => {
        const { selectedYear, selectedModel, selectedMake, selectedTrim } = this.state;
        
        if (typeof this.state.vin !== "undefined" && this.state.vin.length === 17 || (typeof selectedYear !== undefined && selectedYear.length > 0 && typeof selectedModel !== undefined && selectedModel.length > 0 && typeof selectedMake !== "undefined" && selectedMake.length > 0 && typeof selectedTrim !== undefined && selectedTrim.length > 0)) {
            if (typeof this.state.vin !== "undefined" && this.state.vin.length === 17) {
                console.log("handlevinsubmission");
                return (
                    <Fragment>
                        <View style={styles.bottomPosition}>
                            <View style={styles.justify}>
                                <Button onPress={this.handleVinSubmission} style={styles.greenButton} success><NativeText>Submit</NativeText></Button>
                            </View>
                        </View>
                    </Fragment>
                );
            } else {
                console.log("handleGeneralInfoSubmission");
                return (
                    <Fragment>
                        <View style={styles.bottomPosition}>
                            <View style={styles.justify}>
                                <Button onPress={this.handleGeneralInfoSubmission} style={styles.greenButton} success><NativeText>Submit</NativeText></Button>
                            </View>
                        </View>
                    </Fragment>
                );
            }
        } else {
            return (
                 <Fragment>
                    <View style={styles.bottomPosition}>
                        <View style={styles.justify}>
                            <Button style={styles.greyButton}><NativeText>Submit</NativeText></Button>
                        </View>
                    </View>
                </Fragment>
            );
        }
    }
    render() {
        const { isVisible, selectedVehicle, years, selectedYear } = this.state;

        console.log("this.state ONE INDEX.JS", this.state);
        return (
            <Fragment>
                
                <ParallaxScrollView
                    backgroundColor="black"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={300}
                    renderForeground={() => (
                        <Fragment>
                            
                            <ImageBackground style={{ minWidth: 100, minHeight: 300, maxWidth: "100%", maxHeight: 300 }} source={require("../../../../../../assets/images/drive.jpg")}>
                            <Text style={styles.innerText}>Tell us about your vehicle</Text>
                            <TouchableOpacity style={styles.absoluteIconContainer} onPress={() => {
                                this.props.props.navigation.goBack();
                            }}>
                                <Image style={styles.absoluteIcon} source={require("../../../../../../assets/icons/back-back.png")} />
                            </TouchableOpacity>
                            </ImageBackground>
                        </Fragment>
                    )}>
                    
                    <View style={{ height: "100%" }}>
                        <View style={styles.container}>
                                <View style={{ margin: 20 }}>
                                    <Text style={{ fontSize: 18 }}>What type of car do you have?</Text>
                                    <ListItem style={{ marginTop: 15 }}>
                                        <Left>
                                            <NativeText>Identify your car</NativeText>
                                        </Left>
                                        <TouchableOpacity onPress={() => {
                                            this._panel.show();
                                        }}>
                                            <NativeText style={{ color: "#6441A4", fontWeight: "bold" }}>START</NativeText>
                                        </TouchableOpacity>
                                    </ListItem>
                                    {this.renderInfo()}
                                </View>
                        </View>
                    </View>
                    
                </ParallaxScrollView>
                {selectedVehicle !== null ? <Modal onBackdropPress={() => {
                    this.setState({
                        isVisible: false
                    })
                }} isVisible={isVisible}>
                    <View style={styles.modalContent}>
                        <List>
                            <ListItem style={styles.minWidthListItem}>
                            <Text>Make: {selectedVehicle.make}</Text>
                            </ListItem>
                            <ListItem >
                            <Text>Model: {selectedVehicle.model}</Text>
                            </ListItem>
                            <ListItem style={styles.minWidthListItem}>
                            <Text>Year: {selectedVehicle.year}</Text>
                            </ListItem>
                            <ListItem style={styles.minWidthListItem}>
                            <Text>Fuel Type: {selectedVehicle.fuelType}</Text>
                            </ListItem>
                            <ListItem style={styles.minWidthListItem}>
                            <Text>Body Type: {selectedVehicle.body}</Text>
                            </ListItem>
                            <ListItem style={styles.minWidthListItem}>
                            <Text>Trim: {selectedVehicle.trim}</Text>
                            </ListItem>
                            <ListItem style={styles.minWidthListItem}>
                            <Text>Vehicle Type: {selectedVehicle.vehicleType}</Text>
                            </ListItem>
                        </List>
                    </View>
                </Modal> : null}
                <SlidingUpPanel animatedValue={new Animated.Value(0)} allowDragging={false} ref={c => this._panel_two = c}>
                    <View style={styles.containerSlideUp}>
                        <QRCodeScanner  
                            cameraType="back"
                            containerStyle={styles.containerStyleScanner}
                            reactivate={true}
                            showMarker={true}
                            onRead={this.onSuccess} 
                            topViewStyle={styles.topView} 
                            bottomViewStyle={styles.bottomSheet}
                            flashMode={RNCamera.Constants.FlashMode.torch}
                            topContent={
                                <View style={{ flexDirection: "row", flex: 1, position: "absolute", left: 10 }}>
                                    <View style={{ flexDirection: "row", marginTop: 40 }}>
                                        <TouchableOpacity onPress={() => {
                                            this._panel_two.hide();
                                        }}>
                                            <Image style={{ maxWidth: 40, maxHeight: 40, marginTop: 25 }} source={require("../../../../../../assets/icons/back-back.png")} />
                                        </TouchableOpacity>
                                        <Text style={styles.centerText}>
                                            Please scan your VIN barcode
                                        </Text>
                                    </View>
                                </View>
                            }
                            bottomContent={
                                <AwesomeButtonBlue onPress={() => {
                                    this._panel_two.hide();

                                    this.RBSheet.open();
                                }} stretch={true} type={"secondary"}>Type VIN instead</AwesomeButtonBlue>
                            }
                        />
                    </View>
                </SlidingUpPanel>
                <SlidingUpPanel animatedValue={new Animated.Value(0)} allowDragging={false} ref={c => this._panel = c}>
                    <View style={styles.containerSlideUp}>
                        <View style={{ flexDirection: "row", margin: 20 }}>
                            <TouchableOpacity onPress={() => {
                                this._panel.hide();
                            }}>
                                <Image style={{ maxWidth: 45, minHeight: 25 }} source={require("../../../../../../assets/icons/small-left.png")} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 18, margin: 13, fontWeight: "bold" }}>Your Car</Text>
                        </View>
                        <View style={{ margin: 20 }}>
                            <Text>We'll use your Vehicle Identification Number (VIN) to identify your specific car. A VIN usually consists of 17 letters and numbers and has a barcode. It can be found in a few spots:</Text>
                            <View style={styles.maxWidthRow}>
                                <Image style={{ maxWidth: 45, maxHeight: 45, tintColor: "blue", marginRight: 8 }} source={require("../../../../../../assets/icons/1.png")} />
                                <Text><Text style={{ fontWeight: "bold" }}>Driver-Side door</Text>{"\n"}With the door open, look on the edge of the door or doorpost (where the door latches when it's closed).</Text>
                            </View>
                            <View style={styles.maxWidthRow}>
                                <Image style={{ maxWidth: 45, maxHeight: 45, tintColor: "blue", marginRight: 8 }} source={require("../../../../../../assets/icons/2.png")} />
                                <Text><Text style={{ fontWeight: "bold" }}>Driver-Side dashboard</Text>{"\n"}Stand outside the car and look through the windsheild at the bottom corner of your dashboard.</Text>
                            </View>
                            <View style={styles.maxWidthRow}>
                                <Image style={{ maxWidth: 45, maxHeight: 45, tintColor: "blue", marginRight: 8 }} source={require("../../../../../../assets/icons/3.png")} />
                                <Text><Text style={{ fontWeight: "bold" }}>Documentation</Text>{"\n"}Check your car title, registration, or insurance documents.</Text>
                            </View>
                            <Text style={{ marginTop: 15 }}>If you still can't find your VIN number, check your car manual or manufacturer's website for instructions.</Text>
                        </View>
                        <View style={styles.centered}>
                            <View>
                                <Button bordered info onPress={() => {
                                    this._panel.hide();
                                    
                                    this._panel_two.show();
                                }} style={styles.continueButton}>
                                    <NativeText style={{ color: "white", fontWeight: "bold" }}>Continue</NativeText>
                                </Button>
                            </View>
                        </View>
                    </View>
                </SlidingUpPanel>
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={height}
                    openDuration={250}
                    customStyles={{
                        container: {
                        justifyContent: "center",
                        alignItems: "center"
                        }
                    }}
                >
                    <View style={styles.containerSlideUp}>
                        <View style={{ flexDirection: "row", margin: 20 }}>
                            <TouchableOpacity onPress={() => {
                                this.RBSheet.close();
                            }}>
                                <Image style={{ maxWidth: 45, minHeight: 25 }} source={require("../../../../../../assets/icons/small-left.png")} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 18, margin: 13, fontWeight: "bold" }}>VIN (Vehicle identification)</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.olderOrNewText}>My model year is 1981 or later</Text>
                            <Switch
                                value={this.state.olderThan1981}
                                onValueChange={(value) => {
                                    this.setState({
                                        olderThan1981: value
                                    })
                                }}
                                style={styles.switchButton}
                                disabled={false}
                                changeValueImmediately={true}
                                activeText={'Yes'}
                                inActiveText={'No'}
                                circleSize={30}
                            />
                        </View>
                        {this.renderConditionalSwitch()}
                        {/* <View style={styles.submitBtnContainerView}>
                            <View style={styles.submitBtnContainerView}>
                                {this.renderSecondSetButtons()}
                            </View>
                        </View> */}
                        {this.renderbottomButton()}
                    </View>
                </RBSheet>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    };
}
export default connect(mapStateToProps, { })(PageOneVehicleFormHelper);