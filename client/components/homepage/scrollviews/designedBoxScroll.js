import React, { Fragment, useState } from "react";
import styles from "./styles.js";
import { ScrollView, View, Text, ImageBackground } from "react-native";

const DesignedBoxScroll = (props) => {
    const [ data, setData ] = useState([{
        name: "Toms Towing",
        background: "https://picsum.photos/300/300",
        roadside_cost: 29.99
    }, {
        name: "Johnny Tow",
        background: "https://picsum.photos/300/300",
        roadside_cost: 19.99
    }, {
        name: "Tow Talent Inc.",
        background: "https://picsum.photos/300/300",
        roadside_cost: 24.99
    }, {
        name: "Handle Me Tows",
        background: "https://picsum.photos/300/300",
        roadside_cost: 60.99
    }, {
        name: "Jack Pack Tows",
        background: "https://picsum.photos/300/300",
        roadside_cost: 54.99
    }, {
        name: "Tow Tow's!",
        background: "https://picsum.photos/300/300",
        roadside_cost: 99.99
    }, {
        name: "Towed Back Inc.",
        background: "https://picsum.photos/300/300",
        roadside_cost: 39.99
    }, {
        name: "Showrtons Auto",
        background: "https://picsum.photos/300/300",
        roadside_cost: 24.99
    }, {
        name: "Auto Savior Inc.",
        background: "https://picsum.photos/300/300",
        roadside_cost: 19.99
    }]);
    return (
        <Fragment>
            <View style={styles.container}>
                
                <View style={styles.outterContainer}>
                    <View style={styles.boxOne}>
                        <Text style={styles.mainText}>Roadside Assistance</Text>
                        <Text style={styles.clientsText}>Get roadside assistance from our vast network of mechanics and tow drivers!</Text>
                        
                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scrollViewTwo} contentContainerStyle={styles.contentContainerTwo}>
                            {data.map((user, index) => {
                                return (
                                    <ImageBackground key={index} source={{ uri: user.background }} style={styles.innerContainerTwo}>
                                        <View style={styles.innerBox}>
                                            <Text style={styles.mainTextTwo}>Company: {user.name}</Text>
                                            <Text style={styles.mainTextTwo}>Call Fee: ${user.roadside_cost.toString()}</Text>
                                        </View>
                                    </ImageBackground>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Fragment>
    );
}
export default DesignedBoxScroll;