import React, { Fragment, useState } from "react";
import styles from "./styles.js";
import { ScrollView, View, Text, ImageBackground } from "react-native";
import { AirbnbRating } from 'react-native-ratings';

const DesignedBoxScroll = (props) => {
    const [ data, setData ] = useState([{
        name: "Toms Towing",
        background: "https://picsum.photos/300/300",
        roadside_cost: 29.99,
        rating: 4.27
    }, {
        name: "Johnny Tow",
        background: "https://picsum.photos/300/300",
        roadside_cost: 19.99,
        rating: 5
    }, {
        name: "Tow Talent Inc.",
        background: "https://picsum.photos/300/300",
        roadside_cost: 24.99,
        rating: 2.4
    }, {
        name: "Handle Me Tows",
        background: "https://picsum.photos/300/300",
        roadside_cost: 60.99,
        rating: 4.5
    }, {
        name: "Jack Pack Tows",
        background: "https://picsum.photos/300/300",
        roadside_cost: 54.99,
        rating: 1.7
    }, {
        name: "Tow Tow's!",
        background: "https://picsum.photos/300/300",
        roadside_cost: 99.99,
        rating: 1.2
    }, {
        name: "Towed Back Inc.",
        background: "https://picsum.photos/300/300",
        roadside_cost: 39.99,
        rating: 4.1
    }, {
        name: "Showrtons Auto",
        background: "https://picsum.photos/300/300",
        roadside_cost: 24.99,
        rating: 3.9
    }, {
        name: "Auto Savior Inc.",
        background: "https://picsum.photos/300/300",
        roadside_cost: 19.99,
        rating: 3.3
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
                                            <AirbnbRating
                                                count={5}
                                                defaultRating={user.rating}
                                                size={20} 
                                                isDisabled={true} 
                                                selectedColor={"gold"} 
                                                showRating={false}
                                            />
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