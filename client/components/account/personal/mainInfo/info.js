import React, { Fragment, Component } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Animated, Dimensions } from "react-native";
import { Header, Left, Body, Right, Title, Button, Text as NativeText, ListItem, Form, Item, Input, Label, Picker } from 'native-base';
import styles from "./styles.js";
import SlidingUpPanel from 'rn-sliding-up-panel';
import Config from "react-native-config";
import { connect } from "react-redux";
import axios from "axios";
import PhoneInput from "react-native-phone-number-input";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../../toastConfig.js";
import AwesomeAlert from 'react-native-awesome-alerts';
import CodeInput from 'react-native-confirmation-code-input';

const  { width, height } = Dimensions.get("window");

class EditPersonalInfoHelper extends Component {
constructor(props) {
    super(props);
    
    this.state = {
        gender: "",
        firstName: "",
        lastName: "",
        user: null,
        phoneNumber: "",
        formattedValue: "",
        fullName: "",
        page: 1,
        email: "",
        authyID: null
    }
    this.phoneInput = React.createRef(null);
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {
                console.log("RES.data:", res.data);

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
    }
    registerPhoneNumber = () => {

        const { phoneNumber } = this.state;

        axios.post(`${Config.ngrok_url}/send/code/new/phone/number`, {
            callingCode: this.phoneInput.current.getCallingCode(),
            phoneNumber,
            email: this.state.user.email
        }).then((res) => {
            if (res.data.message === "Code was successfully sent!") {

                const { authyID } = res.data;
                
                this.setState({
                    page: 2,
                    authyID
                })
            } else if (res.data.message === "You must complete your email before adding a new phone number...") {
                console.log("Err", res.data);

                this.RBSheet.close();

                Toast.show({
                    text1: 'ERROR!',
                    text2: 'You must complete your email before adding another number! 📲',
                    position: "top",
                    type: "error",
                    visibilityTime: 6000
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    handlePhoneNumberAddition = () => {

        const { phoneNumber, formattedValue, user } = this.state;

        const promiseee = new Promise((resolve, reject) => {
            if (typeof user.phoneNumber !== "undefined" && user.phoneNumber !== null && user.phoneNumber.length > 0) {
                for (let index = 0; index < user.phoneNumber.length; index++) {
                    const number = user.phoneNumber[index];
                    console.log("number", number);
    
                    if (number.number === this.state.formattedValue) {
                        resolve(true);
                    }
    
                    if ((user.phoneNumber.length - 1) === index) {
                        resolve(false);
                    }
                }
            } else {
                resolve(false);
            }
        })

        promiseee.then((data) => {
            if (data === true) {

                this.setState({
                    formattedValue: "",
                    phoneNumber: ""
                }, () => {
                    this.RBSheet.close();
                })

                Toast.show({
                    text1: 'ERROR!',
                    text2: 'You have already registered this phone number... 👋',
                    position: "top",
                    type: "error",
                    visibilityTime: 5000
                });
            } else {
                this.registerPhoneNumber();
            }
        })
    }
    renderContinueButtons = () => {
        const { phoneNumber } = this.state;

        if (typeof phoneNumber !== "undefined" && phoneNumber.length === 10) {
            return (
                <View style={{ flex: 1 }}>
                    <Button onPress={() => {
                        this.handlePhoneNumberAddition();
                    }} style={styles.blackButton}>
                        <NativeText style={styles.blackButtonText}>Continue</NativeText>
                    </Button>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Button onPress={() => {

                    }} style={styles.greyButton}>
                        <NativeText style={styles.greyButtonText}>Continue</NativeText>
                    </Button>
                </View>
            );
        }
    }
    renderSteps = () => {
        if (this.state.page === 1) {
            return (
                <View style={{ flex: 1 }}>
                    <Header style={{ width }}>
                        <Left style={{ flexDirection: "row", flex: 1 }}>
                            <Button onPress={() => {
                                this.RBSheet.close();
                            }} transparent>
                                <Image source={require("../../../../assets/icons/x.png")} style={{ maxWidth: 25, maxHeight: 25 }} />
                            </Button>
                            <Title style={{ textAlign: "left", marginTop: 10 }}>Add Phone Number</Title>
                        </Left>
                    </Header>
                    <View style={styles.slideUpOne}>
                    <View style={styles.upperText}>
                        <Text style={styles.upText}>For notifications, reminders, and help loggin in.</Text>
                    </View>
                        <PhoneInput 
                            ref={this.phoneInput}
                            containerStyle={styles.inputPhone}
                            defaultValue={this.state.phoneNumber}
                            defaultCode="US"
                            layout="first"
                            onChangeText={(text) => {
                                this.setState({
                                    phoneNumber: text
                                })
                            }}
                            onChangeFormattedText={(text) => {
                                this.setState({
                                    formattedValue: text
                                })
                            }}
                            withDarkTheme
                            withShadow
                        />
                        <View style={styles.upperText}>
                            <Text style={styles.upText}>We'll call or text you to confirm your number. Standard message and data rates apply.</Text>
                        </View>
                        {this.renderContinueButtons()}
                    </View>
                </View>
            );
        } else if (this.state.page === 2) {
            return (
                <View style={{ flex: 1 }}>
                    <Header style={{ width }}>
                        <Left style={{ flexDirection: "row", flex: 1 }}>
                            <Button onPress={() => {
                                this.setState({ 
                                    page: 1 
                                });
                            }} transparent>
                                <Image source={require("../../../../assets/icons/go-back.png")} style={{ maxWidth: 40, maxHeight: 40 }} />
                            </Button>
                            <Title style={{ textAlign: "left", marginTop: 10 }}>Confirm Phone Number</Title>
                            
                        </Left>
                    </Header>
                    <View style={{ flex: 1, padding: 15 }}>
                    <View style={styles.lockIconContainer}>
                        <Image source={require('../../../../assets/icons/lock.png')} style={styles.locker} />
                    </View>
                    <Text style={styles.title}>Verification</Text>
                        <CodeInput
                            ref="codeInputRef2"
                            secureTextEntry
                            activeColor='rgba(49, 180, 4, 1)'
                            inactiveColor='rgba(49, 180, 4, 1.3)'
                            autoFocus={false}
                            ignoreCase={true}
                            inputPosition='center'
                            size={35} 
                            codeLength={7}
                            onFulfill={(isValid) => {
                                this.submitCode(isValid);
                            }}
                            containerStyle={{ marginTop: 30 }}
                            codeInputStyle={{ borderWidth: 1.5 }}
                        />
                        
                    </View>
                </View>
            );
        } else {
            
        }
    }
    submitCode = (code) => {
        console.log("submitCode");

        const { phoneNumber, formattedValue } = this.state;

        axios.post(`${Config.ngrok_url}/check/code/second/validate`, {
            code,
            authyID: this.state.authyID
        }).then((res) => {
            if (res.data.message === "Successfully authenticated!") {
                console.log(res.data);

                axios.post(`${Config.ngrok_url}/add/phone/number`,{
                    formattedValue,
                    phoneNumber,
                    id: this.props.unique_id
                }).then((resolution) => {
                    if (resolution.data) {
                        const { user } = resolution.data;
                        
                        this.setState({
                            user
                        }, () => {
                            this.RBSheet.close();
                        })
                    } else {
                        console.log("Err", resolution.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    saveAllContent = () => {
        const { fullName, gender, email } = this.state;

        axios.post(`${Config.ngrok_url}/save/data/general`, {
            fullName,
            gender, 
            email,
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Successfully saved the changed data!") {
                console.log(res.data);

                const { user } = res.data;

                this.setState({
                    user,
                    gender: "",
                    fullName: "",
                    email: ""
                }, () => {
                    Toast.show({
                        text1: 'SUCCESS!',
                        text2: 'We updated your account! 👌',
                        position: "top",
                        type: "success",
                        visibilityTime: 5000
                    });
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render () {
        const { user, page } = this.state;

        console.log(this.state);
        return (
            <Fragment>
                
                <Header>
                    <Left>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={{ maxWidth: 40, maxHeight: 40 }} />
                        </Button>
                    </Left>
                    <Body>
                    
                    </Body>
                    <Right>
                        <Button onPress={() => {
                            this.saveAllContent();
                        }} transparent>
                            <NativeText>Save</NativeText>
                        </Button>
                    </Right>
                </Header>
                
                <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                    <Text style={styles.bigText}>Edit personal info</Text>
                    <View style={styles.stackedContainer}>
                        <Form>
                            <Item stackedLabel last>
                            <Label>Full Name</Label>
                            <Input value={this.state.fullName} onChangeText={(value) => {
                                this.setState({
                                    fullName: value
                                })
                            }} placeholderTextColor={"grey"} placeholder={user !== null ? user.fullName : "-------"} />
                            </Item>
                            
                            <View style={styles.pickerContainer}>
                                <Picker 
                                    note 
                                    placeholder="Select your gender"
                                    placeholderStyle={{ color: "black" }}
                                    style={styles.picker} 
                                    value={this.state.gender}
                                    selectedValue={this.state.gender}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({
                                            gender: itemValue
                                        })
                                    }
                                }>
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                    <Picker.Item label="Trans" value="trans" />
                                    <Picker.Item label="Gender Neutral" value="gender-neutral" />
                                    <Picker.Item label="Non-Binary" value="non-binary" />
                                    <Picker.Item label="Agender" value="agender" />
                                    <Picker.Item label="Pangender" value="pangender" />
                                    <Picker.Item label="Gender-Queer" value="gender-queer" />
                                    <Picker.Item label="Two-Spirit" value="two-spirit" />
                                    <Picker.Item label="Third-Gender" value="third-gender" />
                                    <Picker.Item label="Prefer Not To Answer" value="perfer-not-to-answer" />
                                    <Picker.Item label="Female" value="female" />
                                </Picker>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Item style={{ maxWidth: width, minWidth: width }} stackedLabel last>
                                <Label>Email</Label>
                                    <Input value={this.state.email} onChangeText={(value) => {
                                        this.setState({ 
                                            email: value 
                                        })
                                    }} style={{ maxWidth: width }} placeholderTextColor={"grey"} placeholder={user !== null && user.email ? user.email : "---------"} />
                                </Item>
                                
                            </View>
                            <Text style={styles.phoneNumberText}>Phone Number(s)</Text>
                            <Text style={{ paddingLeft: 15 }}>For notifications, reminders and help logging in</Text>
                            {user !== null && typeof user.phoneNumber !== "undefined" && user.phoneNumber.length > 0 ? user.phoneNumber.map((number, index) => {
                                return (
                                    <ListItem key={index}>
                                        <Left>
                                            <NativeText>{number.number}</NativeText>
                                        </Left>
                                        <Right>
                                            <TouchableOpacity onPress={() => {
                                                console.log("clicked!");
                                                this._panel_two.show();
                                            }}>
                                                <NativeText>Remove</NativeText>
                                            </TouchableOpacity>
                                        </Right>
                                    </ListItem>
                                );
                            }) : null}
                            <View style={styles.buttonContainerPhone}>
                                <Button onPress={() => {
                                    this.RBSheet.open();
                                }} style={styles.phoneNumberButton} bordered info>
                                    <Text style={styles.phoneNumberTextTwo}>Add another phone number</Text>
                                </Button>
                                
                                    <ListItem>
                                        <Left>
                                            <NativeText>Emergency Contact</NativeText>
                                        </Left>
                                        <Right>
                                        <TouchableOpacity onPress={() => {
                                            this.props.props.navigation.navigate("emergency-contact-home");
                                        }}>
                                            <NativeText>Add</NativeText>
                                        </TouchableOpacity>
                                        </Right>
                                    </ListItem>
                               
                            </View>
                       
                        </Form>
                    </View>
                </ScrollView>
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
                    {this.renderSteps()}
                </RBSheet>
                
                <SlidingUpPanel animatedValue={new Animated.Value(0)} ref={c => this._panel_two = c}>
                    <View style={styles.slideUpContainer}>
                        <Text>Here is the content TWO inside panel</Text>
                        
                    </View>
                </SlidingUpPanel>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    };
}
export default connect(mapStateToProps, {  })(EditPersonalInfoHelper);