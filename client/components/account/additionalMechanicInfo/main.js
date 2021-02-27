import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Form, Item, Input, Label, Picker, Icon } from 'native-base';
import styles from './styles.js';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import RBSheet from "react-native-raw-bottom-sheet";


const { height, width } = Dimensions.get("window");


class AdditionalMechanicInformationMainHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        yearsOfExperience: 0,
        degree: "",
        employerName: "",
        lengthOfEmployment: 0,
        jobTitle: "",
        duties: "",
        jobs: []
    }
}
    addEmployer = () => {
        console.log("addEmployer");

        const { jobTitle, employerName, duties, lengthOfEmployment } = this.state;

        this.setState({
            jobs: [...this.state.jobs, {
                job_title: jobTitle,
                employer_name: employerName,
                duties_responsibilities: duties,
                length_of_employment_in_years: lengthOfEmployment
            }]
        }, () => {
            this.RBSheet.close();
        })
    }
    calculateReadinessOne = () => {
        const { jobTitle, employerName, duties, lengthOfEmployment } = this.state;

        if ((typeof jobTitle !== "undefined" && jobTitle.length > 0) && (typeof employerName !== "undefined" && employerName.length > 0) && (typeof duties !== "undefined" && duties.length > 0) && (lengthOfEmployment !== 0)) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const { jobs } = this.state;
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
                        <Title>Create Profile</Title>
                        <Subtitle>Online display information and more...</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <View style={styles.margin}>
                        <Form>
                            <Text>How many years of automotive repairs do you have?</Text>
                            <Item floatingLabel>
                                <Label>Years of experience?</Label>
                                <Input value={this.state.yearsOfExperience} keyboardType={"number-pad"} onChangeText={(value) => {
                                    this.setState({
                                        yearsOfExperience: Number(value)
                                    })
                                }} />
                            </Item>
                            <Text style={{ marginTop: 15 }}>What type of degree in the auto industry do you have?</Text>
                            <View style={{ marginTop: 15, marginBottom: 15 }}>
                                <Picker 
                                        placeholder={"Select your degree type..."}
                                        placeholderTextColor={"grey"}
                                        mode="dropdown"
                                        iosHeader="Select your education"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: width * 0.80 }}
                                        selectedValue={this.state.degree}
                                        defaultValue={this.state.degree}
                                        onValueChange={(value) => {
                                            this.setState({
                                                degree: value
                                            })
                                        }}
                                    >
                                    <Picker.Item label="No-Degree" value="no-degree" />
                                    <Picker.Item label="Self-Taught" value="self-taught" />
                                    <Picker.Item label="Technical-Trade School" value="technical-trade-school" />
                                    <Picker.Item label="Associates" value="associates" />
                                    <Picker.Item label="Bachelors" value="bachelors" />
                                </Picker>
                            </View>
                            
                        </Form>
                        <AwesomeButtonBlue type={"secondary"} stretch={true} onPress={() => {
                            this.RBSheet.open();
                        }}>Add employment history</AwesomeButtonBlue>
                        <View style={styles.marginBothWays}>
                                {typeof jobs !== "undefined" && jobs.length > 0 ? jobs.map((job, index) => {
                                    return (
                                        <Fragment>
                                            <View style={styles.boxed}>
                                                <Text style={styles.myText}><Text style={styles.bold}>Title</Text>: {job.job_title}</Text>
                                                <Text style={styles.myText}><Text style={styles.bold}>Co. Name</Text>: {job.employer_name}</Text>
                                                <Text style={styles.myText}><Text style={styles.bold}>Employed for</Text> {job.length_of_employment_in_years} <Text style={styles.bold}>Years</Text></Text>
                                                <Text style={styles.myText}><Text style={styles.bold}>Duties</Text>: {job.duties_responsibilities}</Text>
                                            </View>
                                            <View style={styles.hr} />
                                        </Fragment>
                                    );
                                }) : null}
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <AwesomeButtonBlue type={"disabled"} stretch={true} onPress={() => {}}>Submit & Continue</AwesomeButtonBlue>
                        </View>
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
                        <Text style={styles.header}>Please enter each employers imformation indvidually below...</Text>
                        <Form>
                            <Item style={styles.itemWidth} floatingLabel>
                            <Label>Employer name</Label>
                                <Input value={this.state.employerName} onChangeText={(value) => {
                                    this.setState({
                                        employerName: value
                                    })
                                }} />
                            </Item>
                            <Item style={styles.itemWidth} floatingLabel last>
                                <Label>Length of employment (in years)</Label>
                                <Input value={this.state.lengthOfEmployment} keyboardType={"number-pad"} onChangeText={(value) => {
                                    this.setState({
                                        lengthOfEmployment: Number(value)
                                    })
                                }} />
                            </Item>
                            <Item style={styles.itemWidth} floatingLabel last>
                                <Label>Job Title</Label>
                                <Input value={this.state.jobTitle} keyboardType={"number-pad"} onChangeText={(value) => {
                                    this.setState({
                                        jobTitle: value
                                    })
                                }} />
                            </Item>
                        </Form>
                        <View style={styles.margin}>
                            <AutoGrowingTextInput style={styles.itemWidth} value={this.state.duties} onChangeText={(value) => {
                                this.setState({
                                    duties: value
                                })
                            }} placeholderTextColor={"grey"} placeholder={'Enter your job duties and/or responsiblities...'} />
                        </View>
                        <View style={styles.margin}>
                            {this.calculateReadinessOne() ? <AwesomeButtonBlue type={"secondary"} stretch={true} onPress={this.addEmployer}>Add employer</AwesomeButtonBlue> : <AwesomeButtonBlue type={"disabled"} stretch={true}>Add employer</AwesomeButtonBlue>}
                            <View style={{ marginTop: 20 }}>
                                <AwesomeButtonBlue type={"primary"} stretch={true} onPress={() => {
                                    this.RBSheet.close();
                                }}>Close Panel</AwesomeButtonBlue>
                            </View>
                        </View>
                    </View>
                </RBSheet>
            </Fragment>
        )
    }
}
export default AdditionalMechanicInformationMainHelper;