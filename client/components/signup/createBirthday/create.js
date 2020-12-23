import React, { Fragment, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';
import styles from "./styles.js";
import { connect } from "react-redux";
import { authenticated } from "../../../actions/signup/auth.js";
import DatePicker from 'react-native-date-picker';
import { Button as NativeBtn, Text as NativeText } from 'native-base';
import moment from "moment";

const CreateBirthdayHelper = (props) => {

    const [date, setDate] = useState(null)

    const continueToNextPage = () => {
        console.log("continueToNextPage");
        
        props.authenticated({
            ...props.previous,
                birthdate: moment(date).format("YYYY-MM-DD"),
                page: 5
        });

        setTimeout(() => {
            props.props.navigation.navigate("gender-selection");
        },  500);
    }
    console.log(date);
    return (
        <Fragment>
            <ImageBackground source={require("../../../assets/images/white-wood.jpg")} style={styles.container}>
                <View style={styles.backgroundBack}>
                    <View style={styles.topContainer}>
                        <Image source={require("../../../assets/icons/cake.png")} style={styles.cakeIcon} />
                        <Text style={styles.headerOne}>Add Your Birthday</Text>
                        <Text style={styles.headerTwo}>This won't be a part of your public profile, <Text style={{ color: "blue" }}>Why do I need to include this?</Text></Text>
                        <View style={styles.middle}>
                            {date !== null ? <Text style={styles.birthdayTextDisplay}>{moment(date).format("YYYY-MM-DD")}</Text> : null}
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                    <View style={styles.center}>
                        <NativeBtn onPress={continueToNextPage} style={styles.specialBtn} bordered>
                            <NativeText style={{ color: "black" }}>Continue</NativeText>
                        </NativeBtn>
                    </View>
                        <DatePicker 
                            mode="date"
                            date={date}
                            onDateChange={(date) => {
                                setDate(date);
                            }}
                        />
                        <TouchableOpacity onPress={() => {
                            props.props.navigation.navigate("create-name-password");
                        }}><Text style={styles.goBack}>Go Back...</Text></TouchableOpacity>
                    </View>
                </View>    
            </ImageBackground>
           
        </Fragment>
    );
}
const mapStateToProps = state => {
    return {
        previous: state.auth.authenticated
    }
}
export default connect(mapStateToProps, { authenticated })(CreateBirthdayHelper);