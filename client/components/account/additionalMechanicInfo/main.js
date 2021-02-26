import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { Header, Left, Body, Right, Title, Subtitle, Button, Form, Item, Input, Label, Picker, Icon } from 'native-base';
import styles from './styles.js';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';


const { height, width } = Dimensions.get("window");


class AdditionalMechanicInformationMainHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        yearsOfExperience: 0,
        degree: ""
    }
}
    render() {
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
                            <Item floatingLabel>
                                <Label>What degree do you have?</Label>
                                <Picker
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
                            </Item>
                            
                        </Form>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
export default AdditionalMechanicInformationMainHelper;