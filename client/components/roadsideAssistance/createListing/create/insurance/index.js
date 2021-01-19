import React, { Component, Fragment } from 'react';
import { Text, View, Image, ScrollView } from "react-native";
import { Header, Left, Body, Button, Title, Subtitle, Text as NativeText, Item, Label, Input, Form } from 'native-base';
import styles from './styles.js';
import MultiSelect from 'react-native-multiple-select';
import {
    launchCamera, 
    launchImageLibrary
} from 'react-native-image-picker';
import Gallery from 'react-native-image-gallery';
import { ToastConfig } from "../../../../toastConfig.js";
import Toast from 'react-native-toast-message';
import axios from "axios";
import { Config } from "react-native-config";
import { connect } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';


const items = [{
    id: 'Garagekeepers',
    name: 'Garagekeepers'
  }, {
    id: 'On-Hook Towing',
    name: 'On-Hook Towing'
  }, {
    id: 'Commercial General Liability',
    name: 'Commercial General Liability'
  }, {
    id: 'Auto Liability',
    name: 'Auto Liability'
  }, {
    id: 'Physical Damage',
    name: 'Physical Damage'
  }
];
 

class RoadsideAssistanceInsuranceFormHelper extends Component {
constructor(props) {
    super(props);


    this.state = {
        selectedInsurances: [],
        policyNumber: "",
        pictures: [],
        takenPhotos: [],
        index: 0,
        spinner: false
    }
}
    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedInsurances: selectedItems });
    };
    launchCameraRoll = () => {
        console.log("launchCameraRoll");

        launchImageLibrary({
            mediaType: "photo",
            quality: 1,
            includeBase64: true,
            saveToPhotos: true
        }, this.completedCameraRollProcess)
    }
    completedCameraRollProcess = (data) => {
        console.log("completedCameraRollProcess", data);
        
        this.setState({
            pictures: [...this.state.pictures, { source: { uri: data.uri } }],
            takenPhotos: [...this.state.takenPhotos, data.base64]
        })
    }
    launchCamera = () => {
        console.log("launchCamera");

        launchCamera({
            mediaType: "photo",
            quality: 1,
            includeBase64: true,
            saveToPhotos: true
        }, this.completedLaunchCamera)
    }
    completedLaunchCamera = (data) => {
        console.log("completedLaunchCamera", data);

        this.setState({
            pictures: [...this.state.pictures, { source: { uri: data.uri } }],
            takenPhotos: [...this.state.takenPhotos, data.base64]
        })
    }
    handleFinalSubmission = () => {
        console.log("handleFinalSubmission clicked");

        this.setState({
            spinner: true
        }, () => {
            const { policyNumber, selectedInsurances, takenPhotos } = this.state;

            const passed_data = this.props.props.route.params.listing;

            axios.post(`${Config.ngrok_url}/save/insurance/info/roadside/assistance`, {
                policy_number: policyNumber,
                selected_insurance_policies: selectedInsurances,
                insurance_photos: takenPhotos,
                id: this.props.unique_id,
                listing_id: passed_data.id
            }).then((res) => {
                if (res.data.message === "Successfully updated listing with insurance information!") {
                    console.log(res.data);

                    const { listing } = res.data;

                    this.setState({
                        spinner: false
                    }, () => { 
                        this.props.props.navigation.push("roadside-assistance-general-data", { listing })
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
            if (this.state.spinner === true) {
                setTimeout(() => {
                    this.setState({
                        spinner: false
                    })
                }, 20000);
            }
        })
    }
    calculateReadiness = () => {
        const { policyNumber, selectedInsurances, takenPhotos } = this.state;

        if ((typeof policyNumber !== "undefined" && policyNumber.length > 0) && (typeof selectedInsurances !== "undefined" && selectedInsurances.length > 0) && (typeof takenPhotos !== "undefined" && takenPhotos.length > 0)) {
            return false;
        } else {
            return true;
        }
    }
    handleDeletion = () => {
        const { pictures, index, takenPhotos } = this.state;

        const mutated = [...pictures];
        const secondMutated = [...takenPhotos];

        mutated.splice(index, 1);
        secondMutated.splice(index, 1);

        this.setState({
            pictures: mutated,
            takenPhotos: secondMutated
        })
    }
    render() {
        const { pictures } = this.state;
        console.log("this.STATE!!!", this.state);
        return (
            <Fragment>
            <Toast style={{ zIndex: 9999999999999999999999999 }} config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button transparent onPress={() => {
                            this.props.props.navigation.goBack();
                        }}>
                            <Image source={require("../../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body style={{ left: -80 }}>
                        <Title>Insurance</Title>
                        <Subtitle>Fill out insurance details...</Subtitle>
                    </Body>
                </Header>
                <Spinner    
                    overlayColor={"rgba(0 ,0 , 0, 0.5)"}
                    visible={this.state.spinner}
                    textContent={'Uploading your content, please wait...'}
                    textStyle={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                />
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                
                    <View style={styles.margin}>
                    <Text style={{ marginBottom: 10 }}>Select your insurance policy (Select multiple if applicable)</Text>
                    <MultiSelect
                    
                        hideTags={false}
                        items={items}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedInsurances}
                        onChangeInput={ (text)=> console.log(text)}
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="black"
                        selectedItemTextColor="#8884FF"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: 'blue' }}
                        submitButtonColor="#8884FF"
                        submitButtonText="Submit"
                        />
                        <Form>
                            <Item style={styles.item} floatingLabel>
                                <Label>Policy Number</Label>
                                <Input value={this.state.policyNumber} onChangeText={(value) => {
                                    this.setState({
                                        policyNumber: value
                                    })
                                }} />
                            </Item>
                        </Form>
                    </View>
                    <View>
                    <View style={styles.margin}>
                        <Text style={{ fontSize: 18 }}>Please upload pictures of your insurance information</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Button onPress={this.launchCamera} style={[styles.cameraButton, { marginRight: 5 }]} info>
                                <NativeText style={styles.innerButtonText}>Take a picture</NativeText>
                            </Button>
                        </View>
                        <View style={styles.column}>
                            <Button onPress={this.launchCameraRoll} style={[styles.cameraButton, { marginLeft: 5 }]}>
                                <NativeText style={styles.innerButtonText}>Camera Roll</NativeText>
                            </Button>
                        </View>
                    </View>
                    {typeof pictures !== 'undefined' && pictures.length > 0 ? <View>
                    <View style={styles.margin}>
                        <Text style={styles.customText}>Press & hold to remove a photo from the queue</Text>
                    </View>
                    <Gallery
                        onPageSelected={(index) => {

                            console.log("index", index);

                            this.setState({
                                index
                            })
                        }}
                        onLongPress={this.handleDeletion}
                        style={styles.gallery}
                        images={pictures}
                    />
                    </View>: null}
                    <View style={[styles.centered, { marginTop: 25 }]}>
                        <View style={styles.centered}>
                            {this.calculateReadiness() ? <Button light onPress={() => {
                                Toast.show({
                                    text1: 'You must complete each field 🚫',
                                    text2: 'You must complete each field including uploading your insurance documents before proceeding...',
                                    position: "top",
                                    visibilityTime: 4500,
                                    type: "error"
                                });
                            }} style={styles.finalButton}>
                                <NativeText style={styles.innerButtonText}>Submit & Continue</NativeText>
                            </Button> : <Button success onPress={this.handleFinalSubmission} style={styles.finalButton}>
                                <NativeText style={styles.innerButtonText}>Submit & Continue</NativeText>
                            </Button>}
                        </View>
                    </View>
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
export default connect(mapStateToProps, { })(RoadsideAssistanceInsuranceFormHelper);