import React, { Fragment, useState } from "react";
import styles from "./styles.js";
import { ScrollView, View, Text, ImageBackground } from "react-native";

const ActiveClientsLookingHelper = (props) => {
    const [data, setData] = useState([{
        name: "Johnny Despora",
        background: "https://i.pravatar.cc/300",
        budget: 150
    }, {
        name: "Jeremy Smithino",
        background: "https://i.pravatar.cc/300",
        budget: 550
    }, {
        name: "Sarah benckencs",
        background: "https://i.pravatar.cc/300",
        budget: 350
    }, {
        name: "Adam Weloncho",
        background: "https://i.pravatar.cc/300",
        budget: 700
    }, {
        name: "Tiffany Belca",
        background: "https://i.pravatar.cc/300",
        budget: 900
    }, {
        name: "Rodreguez Alszo",
        background: "https://i.pravatar.cc/300",
        budget: 100
    }, {
        name: "Timmothy Smith",
        background: "https://i.pravatar.cc/300",
        budget: 75
    }, {
        name: "Alex Frenchehan",
        background: "https://i.pravatar.cc/300",
        budget: 875
    }, {
        name: "Tilda Becenns",
        background: "https://i.pravatar.cc/300",
        budget: 260
    }])
    return (
        <Fragment>
            <View style={styles.container}>
                <Text style={[styles.mainText, { color: "black" }]}>Client Jobs/Repairs - Need to be done</Text>
                <Text style={[styles.clientsText, { color: "black" }]}>Client's that need work done on their vehicles...</Text>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                    {data.map((user, index) => {
                        return (
                            <ImageBackground key={index} source={{ uri: user.background }} style={styles.innerContainer}>
                                <View style={styles.middleContent}>
                                    <Text style={styles.firstText}>{user.name}</Text>
                                    <Text style={styles.secondText}>Budget: ${user.budget.toString()}</Text>
                                </View>
                            </ImageBackground>
                        );
                    })}
                </ScrollView>
            </View>
        </Fragment>
    );
}
export default ActiveClientsLookingHelper;