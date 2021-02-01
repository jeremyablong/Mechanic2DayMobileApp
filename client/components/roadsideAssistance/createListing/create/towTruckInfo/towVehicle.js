import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Button, Title, Subtitle, Text as NativeText, Picker, Form, Item, Label, Input, Right, Card, CardItem, List, ListItem } from 'native-base';
import styles from './styles.js';
import { Config } from "react-native-config";
import { connect } from "react-redux";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../../../toastConfig.js";
import uuid from "react-native-uuid";

const colors = ["blue", "green", "beige", "brown", "black", "orange", "purple", "red", "yellow", "pink", "grey"];

class TowVehicleDetailsRoadsideAssistanceHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        engines: [],
        transmissions: [],
        trims: [],
        makes: [],
        years: [],
        models: [],
        selectedMake: "",
        selectedYear: "",
        selectedModel: "",
        selectedTransmission: "",
        selectedTrim: "",
        selectedEngine: "",
        selectedColor: "",
        manually: false,
        carList: []
    }
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
    calculateReadiness = () => {
        const { carList } = this.state;

        if (typeof carList !== "undefined" && carList.length > 0) {
            return false;
        } else {
            return true;
        }
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
    handleFinalSubmission = () => {
        console.log("handleFinalSubmission clicked");

        const passed_data = this.props.props.route.params.listing;

        const { carList } = this.state;

        axios.post(`${Config.ngrok_url}/submit/vehicle/details/roadside/assistance`, {
            id: this.props.unique_id,
            vehicle_list: carList,
            passed_data_id: passed_data.id
        }).then((res) => {
            if (res.data.message === "Successfully updated listing vehicle information!") {
                console.log(res.data);

                const { listing } = res.data;

                Toast.show({
                    text1: "Successfully listed your company!",
                    text2: "Your company information is now live and public so anyone can see it...",
                    type: "success",
                    visibilityTime: 4500,
                    position: "top"
                })
                
                setTimeout(() => {
                    this.props.props.navigation.replace("roadside-assistance-display-listings");
                }, 4500)
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    throwError = () => {
        Toast.show({
            text1: "You must complete the required fields before proceeding...",
            text2: "Please complete year, make, model & color before continuing...",
            type: "error",
            visibilityTime: 4500,
            position: "top"
        })
    }
    deleteItem = (passedCar) => {
        this.setState({
            carList: this.state.carList.filter((car) => {
                if (car.id !== passedCar.id) {
                    return car;
                }
            })
        })
    }
    addToList = () => {
        const { selectedYear, selectedMake, selectedModel, selectedColor, selectedTrim, selectedEngine, selectedTransmission } = this.state;
        this.setState({
            carList: [...this.state.carList, {
                selected_year: selectedYear,
                selected_make: selectedMake,
                selected_model: selectedModel,
                selected_color: selectedColor,
                selected_trim: selectedTrim.length > 0 ? selectedTrim : null,
                selected_engine: selectedEngine.length > 0 ? selectedEngine : null,
                selected_transmission: selectedTransmission.length > 0 ? selectedTransmission : null,
                id: uuid()
            }],
            selectedYear: "",
            selectedModel: "",
            selectedTrim: "",
            selectedTransmission: "",
            selectedEngine: "",
            selectedColor: "",
            selectedMake: ""
        })
    }
    renderScrollViewContent = () => {

        const { engines, manually, transmissions, trims, makes, years, models, selectedYear, selectedModel, selectedMake, selectedColor, carList, selectedEngine, selectedTransmission } = this.state;

        if (manually === false) {
            return (
                <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Enter your vehicle details</Text>
                        
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
                                    return <Picker.Item label={trim.trim === "NaN" ? "": trim.trim} value={trim.trim === "NaN" ? "": trim.trim} />;
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
                        <View style={[styles.centered, { marginBottom: 25 }]}>
                            <View style={styles.centered}>
                                <Button warning onPress={() => {
                                    this.setState({
                                        manually: true,
                                        selectedModel: "",
                                        selectedTrim: "",
                                        selectedTransmission: "",
                                        selectedEngine: "",
                                    })
                                }} style={styles.submitButton}>
                                    <NativeText style={{ fontWeight: "bold", color: "white" }}>I can't find my vehicle</NativeText>
                                </Button>
                            </View>
                        </View>
                        {(typeof selectedYear !== "undefined" && selectedYear.length > 0) && (typeof selectedModel !== "undefined" && selectedModel.length > 0) && (selectedMake !== "undefined" && selectedMake.length > 0) && (typeof selectedColor !== "undefined" && selectedColor.length > 0) ? <View style={styles.centered}>
                            <View style={[styles.centered, { marginTop: 20 }]}>
                                <Button info onPress={() => {
                                    this.addToList();
                                }} style={styles.submitButton}>
                                    <NativeText style={{ fontWeight: "bold", color: "white" }}>Submit Vehicle</NativeText>
                                </Button>
                            </View>
                        </View> : null}
                        <View style={styles.centered}>
                            {typeof carList !== "undefined" && carList.length > 0 ? carList.map((car, index) => {
                                return (
                                    <Card style={styles.specialCard} key={index}>
                                        <CardItem header bordered>
                                            <Text>{`${car.selected_year} ${car.selected_make}`}</Text>
                                            <Right><TouchableOpacity onPress={() => {
                                                this.deleteItem(car);
                                            }}><Image source={require("../../../../../assets/icons/trash.png")} style={{ maxWidth: 40, maxHeight: 40}} /></TouchableOpacity></Right>
                                        </CardItem>
                                        <CardItem bordered>
                                        <Body>
                                            <Text>
                                                <List>
                                                    <ListItem style={styles.listitem}>
                                                        <Text>Model: {car.selected_model}</Text>
                                                    </ListItem>
                                                    {car.selected_engine != null ?<ListItem style={styles.listitem}>
                                                        <Text>Engine: {car.selected_engine}</Text>
                                                    </ListItem> : null}
                                                    {car.selected_transmission !== null ? <ListItem style={styles.listitem}>
                                                        <Text>Transmission: {car.selected_transmission}</Text>
                                                    </ListItem> : null}
                                                    {car.selected_trim !== null ? <ListItem style={styles.listitem}>
                                                        <Text>Trim: {car.selected_trim}</Text>
                                                    </ListItem> : null}
                                                </List>
                                            </Text>
                                        </Body>
                                        </CardItem>
                                        <CardItem footer bordered>
                                            <Text>Color: {car.selected_color}</Text>
                                        </CardItem>
                                    </Card>
                                );
                            }) : null}
                        </View>
                    </View>
            );
        } else {
            return (
                <View>
                    <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Enter your vehicle details</Text>
                        
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
                        <View style={{ marginTop: 20, marginBottom: 34  }}>
                            {typeof models !== "undefined" && models.length > 0 ? <Form>
                                <Item floatingLabel>
                                    <Label>Model of vehicle</Label>
                                    <Input value={this.state.selectedModel} onChangeText={(value) => {
                                        this.setState({
                                            selectedModel: value
                                        })
                                    }} />
                                </Item>
                            </Form> : null}
                        </View>
                       
                        <View style={[styles.centered, { marginBottom: 25 }]}>
                            <View style={styles.centered}>
                                <Button warning onPress={() => {
                                    this.setState({
                                        manually: false
                                    })
                                }} style={styles.submitButton}>
                                    <NativeText style={{ fontWeight: "bold", color: "white" }}>I want to lookup my vehicle</NativeText>
                            </Button>
                        </View>
                    </View>
                    </View>
                    {(typeof selectedYear !== "undefined" && selectedYear.length > 0) && (typeof selectedModel !== "undefined" && selectedModel.length > 0) && (selectedMake !== "undefined" && selectedMake.length > 0) && (typeof selectedColor !== "undefined" && selectedColor.length > 0) ? <View style={styles.centered}>
                        <View style={[styles.centered, { marginTop: 20 }]}>
                            <Button info onPress={() => {
                                this.addToList();
                            }} style={styles.submitButton}>
                                <NativeText style={{ fontWeight: "bold", color: "white" }}>Submit Vehicle</NativeText>
                            </Button>
                        </View>
                    </View> : null}
                    <View style={styles.centered}>
                    {typeof carList !== "undefined" && carList.length > 0 ? carList.map((car, index) => {
                            return (
                                <Card style={styles.specialCard} key={index}>
                                    <CardItem header bordered>
                                        <Text>{`${car.selected_year} ${car.selected_make}`}</Text>
                                        <Right><TouchableOpacity onPress={() => {
                                            this.deleteItem(car);
                                        }}><Image source={require("../../../../../assets/icons/trash.png")} style={{ maxWidth: 40, maxHeight: 40}} /></TouchableOpacity></Right>
                                    </CardItem>
                                    <CardItem bordered>
                                    <Body>
                                        <Text>
                                            <List>
                                                <ListItem style={styles.listitem}>
                                                    <Text>Model: {car.selected_model}</Text>
                                                </ListItem>
                                                {car.selected_engine != null ?<ListItem style={styles.listitem}>
                                                    <Text>Engine: {car.selected_engine}</Text>
                                                </ListItem> : null}
                                                {car.selected_transmission !== null ? <ListItem style={styles.listitem}>
                                                    <Text>Transmission: {car.selected_transmission}</Text>
                                                </ListItem> : null}
                                                {car.selected_trim !== null ? <ListItem style={styles.listitem}>
                                                    <Text>Trim: {car.selected_trim}</Text>
                                                </ListItem> : null}
                                            </List>
                                        </Text>
                                    </Body>
                                    </CardItem>
                                    <CardItem footer bordered>
                                        <Text>Color: {car.selected_color}</Text>
                                    </CardItem>
                                </Card>
                            );
                        }) : null}
                    </View>
                </View>
            );
        }
    }
    render() {
        console.log("thisSTATEEEEEE towVehicle", this.state);
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
                        <Title>Tow Vehicle Info</Title>
                        <Subtitle>We need to collect your vehicle details...</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            
                        }}>
                            <Image source={require("../../../../../assets/icons/plus.png")} style={styles.headerIcon} />
                        </Button>
                    </Right>
                </Header>
                <Toast config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <ScrollView style={{ zIndex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
                    {this.renderScrollViewContent()}
                </ScrollView>
                <View style={styles.margin}>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Select the color of your tow vehicle</Text>
                        <Picker 
                            selectedValue={this.state.selectedColor}
                            onValueChange={(itemValue) =>
                                this.setState({
                                    selectedColor: itemValue
                                })
                            }
                            style={styles.pickerPicker}
                            placeholder={"Select the COLOR of your vehicle..."}
                            placeholderTextColor={"grey"}
                        >
                            {colors.map((color, index) => {
                                return <Picker.Item label={color} value={color} />;
                            })} 
                        </Picker>
                    </View>
                    <View style={styles.centered}>
                        <View style={styles.centered}>
                            {this.calculateReadiness() ? <Button light onPress={this.throwError} style={styles.submitButton}>
                                <NativeText style={{ fontWeight: "bold", color: "white" }}>Submit & Continue</NativeText>
                            </Button> : <Button success onPress={this.handleFinalSubmission} style={styles.submitButton}>
                                <NativeText style={{ fontWeight: "bold", color: "white" }}>Submit & Continue</NativeText>
                            </Button>}
                        </View>
                    </View>
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
export default connect(mapStateToProps, {  })(TowVehicleDetailsRoadsideAssistanceHelper);