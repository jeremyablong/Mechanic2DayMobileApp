import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Header, Left, Title, Button, Right, Text as NativeText, ListItem, Item, Label, Input } from 'native-base';
import styles from './styles.js';
import ReadMore from 'react-native-read-more-text';
import RBSheet from "react-native-raw-bottom-sheet";
import Gallery from 'react-native-image-gallery';
import Config from 'react-native-config';
import { connect } from "react-redux";
import axios from "axios";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Dialog from "react-native-dialog";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Toast from 'react-native-toast-message';
import { ToastConfig } from "../../../../toastConfig.js";
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import _ from "lodash";

const { width, height } = Dimensions.get("window");

class ViewPublicProfileHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        ready: false,
        images: [],
        workName: "",
        location: "",
        showDialog: false,
        profilePicBase64: "",
        visible: false,
        uri: "",
        description: ""
    }
}
    componentDidMount() {

        axios.post(`${Config.ngrok_url}/gather/general/info`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Found user!") {

                const { user } = res.data;

                const promiseee = new Promise((resolve, reject) => {
                    if (user.profilePics.length > 0) {
                        for (let index = 0; index < user.profilePics.length; index++) {
                            const obj = user.profilePics[index];
                            
                            this.setState({
                                images: [{ source: { uri: obj.full_url } }, ...this.state.images]
                            }, () => {
                                if ((user.profilePics.length - 1) === index) {
                                    resolve(user);
                                }
                            })
                        }
                    } else {
                        resolve(user);
                    }
                })

                promiseee.then((dataaa) => {
                    this.setState({
                        ready: true,
                        user: dataaa
                    })
                })
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ fontSize: 20, color: "darkblue", marginTop: 5}} onPress={handlePress}>
                Read more
            </Text>
        );
    }
 
    _renderRevealedFooter = (handlePress) => {
        return (
        <Text style={{ fontSize: 20, color: "darkblue", marginTop: 5}} onPress={handlePress}>
            Show less
        </Text>
        );
    }
 
    _handleTextReady = () => {
        console.log("text ready");
    }
    renderSlideContent = () => {
        const { user } = this.state;

        if (this.state.ready === true) {
            return (
                <Fragment>
                <Spinner
                visible={this.state.visible}
                textContent={'Loading...'} 
                color={"white"} 
                overlayColor={"rgba(0, 0, 0, 0.60)"} 
                textStyle={{ color: "white", margin: 20, textAlign: "center" }} 
                textContent={"We are processing your changes, please wait..."}
                />
                    <ScrollView showVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 75 }} style={{ flex: 1 }}>
                        <Gallery
                            style={{ flex: 1, backgroundColor: 'black', maxHeight: 250, minHeight: 250 }}
                            images={this.state.images}
                        />
                        <KeyboardAwareScrollView>
                            <View>
                                <TouchableOpacity style={styles.topRight} onPress={() => {
                                    this.setState({
                                        showDialog: true
                                    })
                                }}>
                                    <Image source={require("../../../../../assets/icons/camera.png")} style={{ maxWidth: 40, maxHeight: 40 }} />
                                </TouchableOpacity>
                                <View style={{ margin: 20 }}>
                                    <Text style={[styles.h6, { fontSize: 20, fontWeight: "bold", marginBottom: 20 }]}>Edit About Me</Text>
                                    <TextInput multiline={true} numberOfLines={5} onChangeText={(value) => {
                                        this.setState({
                                            description: value
                                        })
                                    }} value={this.state.description} style={{ fontSize: 18 }} placeholder={"Enter anything you'd like people to know about yourself!"} />
                                </View>
                                <View style={styles.hr} />
                                <View style={{ margin: 20 }}>
                                    <Text style={styles.h3}>Optional Details</Text>
                                </View>
                                <ListItem style={styles.listItemSpecial}>
                                    <Item stackedLabel>
                                        <Label>Location</Label>
                                        <Input onChangeText={(value) => {
                                            this.setState({
                                                location: value
                                            })
                                        }} style={styles.minWidthInput} placeholderTextColor={"grey"} placeholder={user !== null && user.general_information ? user.general_information.location : "Eg... Paris, FR / Brooklyn, NY / Chicago, IL"} />
                                    </Item>
                                    
                                </ListItem>
                                <ListItem style={styles.listItemSpecial}>
                                    <Item stackedLabel>
                                        <Label>Work</Label>
                                        <Input onChangeText={(value) => {
                                            this.setState({
                                                workName: value
                                            })
                                        }} style={styles.minWidthInput} placeholderTextColor={"grey"} placeholder={user !== null && user.general_information ? user.general_information.work : "Eg... Airbnb / Apple / Taco Stand"} />
                                    </Item>
                                    
                                </ListItem>
                                <ListItem style={styles.listItemSpecial}>
                                    <Text style={styles.smallerTextSub}>Languages {"\n"}<Text style={styles.biggerTextSub}>English</Text></Text>
                                    
                                </ListItem>
                            </View>
                        </KeyboardAwareScrollView>
                    </ScrollView>
                </Fragment>
            );
        } else {
            return (
                <ScrollView>
                    <SkeletonPlaceholder>
                        <View style={styles.box} />
                        <View style={styles.skelatonRow} />
                        <View style={styles.skelatonRow} />
                        <View style={styles.skelatonRow} />
                        <View style={styles.skelatonRow} />
                        <View style={styles.skelatonRow} />
                        <View style={styles.skelatonRow} />
                        <View style={styles.skelatonRow} />
                    </SkeletonPlaceholder>
                </ScrollView>
            );
        }
    }
    completed = (values) => {
        console.log("values", values);

        if (values.didCancel !== true) {
            this.setState({
                profilePicBase64: values.base64,
                uri: values.uri,
                images: [{ source: { uri: `data:${values.type};base64,${values.base64}` } }, ...this.state.images],
                showDialog: false
            })
        } else {
            this.setState({
                showDialog: false
            })
        }
    }
    launchCameraHelper = () => {
        console.log("launchCameraHelper clicked.")
        launchCamera({
            mediaType: "photo",
            includeBase64: true,
            saveToPhotos: true,
            quality: 1
        }, this.completed);
    }
    launchImageLibraryHelper = () => {
        launchImageLibrary({
            mediaType: "photo",
            includeBase64: true,
            quality: 1
        }, this.completedTwo)
    }
    completedTwo = (values) => {
        console.log("completedTwo values", values);

        if (values.didCancel !== true) {
            this.setState({
                profilePicBase64: values.base64,
                uri: values.uri,
                images: [{ source: { uri: `data:${values.type};base64,${values.base64}` } }, ...this.state.images],
                showDialog: false
            })
        } else {
            this.setState({
                showDialog: false
            })
        }
    }
    saveAllDetails = () => {
        console.log("saveAllDetails clicked.");
        
        const { profilePicBase64, description, workName, location } = this.state;

        this.setState({
            visible: true
        }, () => {
            axios.post(`${Config.ngrok_url}/save/details/personal/info/editted`, {
                profilePicBase64: typeof profilePicBase64 !== 'undefined' && profilePicBase64.length > 0 ? profilePicBase64 : null,
                id: this.props.unique_id,
                location: location.length > 0 ? location : null,
                description,
                work_name: workName.length > 0 ? workName : null
            }).then((res) => {
                if (res.data.message === "Successfully saved the changed data!") {
                    console.log(res.data);

                    const { user } = res.data;
    
                    this.setState({
                        visible: false,
                        user
                    }, () => {
                        this.RBSheet.close();
    
                        Toast.show({
                            type: "success",
                            position: "top",
                            text1: "SUCCESS!",
                            text2: "Successfully updated your information! 👌",
                            visibilityTime: 4500
                        })    
                    })            
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        });

        setTimeout(() => {
            this.setState({
                visible: false
            })
        }, 15000);
    }
    renderProfilePic = () => {
        const { user, ready } = this.state;

        if (ready === true && user !== null && typeof user.profilePics !== 'undefined' && user.profilePics.length > 0) {
            return (
                <Fragment>
                    <Image source={{ uri: user.profilePics[user.profilePics.length - 1].full_url }} style={styles.profilePicture} />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonPlaceholder>
                        <View style={styles.profilePicture} />
                    </SkeletonPlaceholder>
                </Fragment>
            );
        }
    }
    render() {
        console.log("this.state publicProfile", this.state);

        const { user } = this.state;
        return (
            <Fragment>
                <Toast style={{ zIndex: 9999999999999999999999999 }} config={ToastConfig} ref={(ref) => Toast.setRef(ref)} />
                <Header style={{ width }}>
                    <Left style={{ flexDirection: "row", flex: 1 }}>
                        <Button onPress={() => {
                            this.props.props.navigation.push("profile-main");
                        }} transparent>
                            <Image source={require("../../../../../assets/icons/go-back.png")} style={{ maxWidth: 25, maxHeight: 25 }} />
                        </Button>
                        <Title style={{ textAlign: "left", marginTop: 10 }}>Public Profile</Title>
                    </Left>
                    <Right style={styles.right}>
                        <Button onPress={() => {
                            this.RBSheet.open();
                        }} transparent>
                            <Image source={require("../../../../../assets/icons/pen.png")} style={styles.rightIcon} />
                        </Button>
                    </Right>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 25 }} style={styles.container}>
                    
                    <View style={styles.marginSpace}>
                        <View style={{ flexDirection: "row", maxHeight: height * 0.16 }}>
                            <View>
                                <Text style={styles.innerTextOne}>Hi, I'm Jeremy</Text>
                                <Text style={styles.secondText}>Joined in Feburary, 2019</Text>
                            </View>
                            <View>
                                {this.renderProfilePic()}
                            </View>
                        </View>
                        <View style={styles.nextContainer}>
                            <Image source={require("../../../../../assets/icons/verified.png")} style={styles.verified} /><Text style={{ marginTop: 8, marginLeft: 10 }}>Identity Verified</Text>
                        </View>
                        <View style={[styles.nextContainer, { marginTop: 15 }]}>
                            <Image source={require("../../../../../assets/icons/flying.png")} style={styles.verified} /><Text style={{ marginTop: 8, marginLeft: 10 }}>{_.has(user, "review_count") ? user.review_count : 0} Reviews</Text>
                        </View>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.marginSpace}>
                        <Text style={styles.h3}>About</Text>
                        <Image source={require("../../../../../assets/icons/quotes-small.png")} style={styles.quotesIcon} />
                        <ReadMore
                            numberOfLines={3}
                            renderTruncatedFooter={this._renderTruncatedFooter}
                            renderRevealedFooter={this._renderRevealedFooter}
                            onReady={this._handleTextReady}
                        >
                            <Text style={styles.descriptionText}>{user !== null && _.has(user, "general_information") ? user.general_information.about_me : "---------"}</Text>
                        </ReadMore>
                        <View style={styles.shortHr} />
                        <View style={styles.customRow}>
                            <Image source={require("../../../../../assets/icons/home.png")} style={styles.helperIcon} />
                            <Text style={styles.iconTextHelper}>Lives in {user !== null && _.has(user, "general_information") ? user.general_information.location : "---------"}</Text>
                        </View>
                        <View style={styles.customRow}>
                            <Image source={require("../../../../../assets/icons/chat.png")} style={styles.helperIcon} />
                            <Text style={styles.iconTextHelper}>Speaks English</Text>
                        </View>
                        <View style={styles.customRow}>
                            <Image source={require("../../../../../assets/icons/suitcase.png")} style={styles.helperIcon} />
                            <Text style={styles.iconTextHelper}>Works at {user !== null && _.has(user, "general_information") ? user.general_information.work : "---------"}</Text>
                        </View>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.marginSpace}>
                        <Text style={styles.h3}>Jeremy Confirmed</Text>
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.column}>
                                <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 6 }}>
                                    <Image source={require("../../../../../assets/icons/checked.png")} style={styles.helperIcon} />
                                    <Text style={styles.spaceLeftText}>Identity</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 6 }}>
                                    <Image source={require("../../../../../assets/icons/checked.png")} style={styles.helperIcon} />
                                    <Text style={styles.spaceLeftText}>Phone Number</Text>
                                </View>
                            </View>
                            <View style={styles.column}>
                                <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 6 }}>
                                    <Image source={require("../../../../../assets/icons/checked.png")} style={styles.helperIcon} />
                                    <Text style={styles.spaceLeftText}>Email Address</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 6 }}>
                                    <Image source={require("../../../../../assets/icons/checked.png")} style={styles.helperIcon} />
                                    <Text style={styles.spaceLeftText}>Payment Method</Text>
                                </View>
                            </View>
                            
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 14 }}><Text onPress={() => {
                                console.log("clicked!!!!");
                            }} style={{ fontSize: 14, color: "darkblue" }}>Learn More</Text> about how confirming account info helps keep the (Company Name) community secure.</Text>
                        </View>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.marginSpace}>
                        <Text style={styles.h3}>{_.has(user, "review_count") ? user.review_count : 0} Reviews</Text>
                    </View>
                </ScrollView>
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
                    <View>
                        <Dialog.Container onBackdropPress={() => {
                            this.setState({
                                showDialog: false
                            })
                        }} visible={this.state.showDialog}>
                        <Dialog.Title>Take Picture</Dialog.Title>
                        <Dialog.Description>
                            Take a new photo or select one from your existing photo library.
                        </Dialog.Description>
                        <Dialog.Button onPress={this.launchImageLibraryHelper} label="GALLERY" />
                        <Dialog.Button onPress={this.launchCameraHelper} label="CAMERA" />
                        </Dialog.Container>
                    </View>
                    <View style={styles.innerContainer}>
                        <Header style={{ width }}>
                            <Left style={{ flexDirection: "row", flex: 1 }}>
                                <Button onPress={() => {
                                    this.RBSheet.close();
                                }} transparent>
                                    <Image source={require("../../../../../assets/icons/x.png")} style={{ maxWidth: 25, maxHeight: 25 }} />
                                </Button>
                                <Title style={{ textAlign: "left", marginTop: 10 }}>Edit primary info</Title>
                            </Left>
                            <Right>
                                <Button transparent onPress={() => {
                                    this.saveAllDetails();
                                }}>
                                    <NativeText style={{ color: "blue" }}>Save</NativeText>
                                </Button>
                            </Right>
                        </Header>
                        <View style={{ flex: 1 }}>
                            {this.renderSlideContent()}
                        </View>
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
export default connect(mapStateToProps, {  })(ViewPublicProfileHelper);