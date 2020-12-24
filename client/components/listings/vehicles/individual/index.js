import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Title, Text as NativeText } from 'native-base';
import Gallery from 'react-native-image-gallery';
import ReadMore from 'react-native-read-more-text';


const title = "Broken exhaust pipe on a 2016 honda civic touring";

class IndividualBrokenVehicleHelper extends Component {
constructor(props) {
    super(props);


}
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: "blue", fontSize: 20, marginTop: 5}} onPress={handlePress}>
                Read more
            </Text>
        );
    }
    
    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: "blue", fontSize: 20, marginTop: 5}} onPress={handlePress}>
                Show less
            </Text>
        );
    }
    render() {
        return (
            <ScrollView style={{ height: "100%", flex: 1, backgroundColor: "white", minHeight: "100%" }} contentContainerStyle={{ paddingBottom: 300 }}>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require("../../../../assets/icons/go-back.png")} style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Right>
                        <Button style={styles.heartButton} onPress={() => {
                           
                        }} transparent>
                            <Image source={require("../../../../assets/icons/heart.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
                        </Button>
                    </Right>
                </Header>
                <View style={styles.container}>
                    <View style={{ maxHeight: 250, flex: 1 }}>
                        <Gallery
                            style={{ maxHeight: 250, minHeight: 250, top: 0, position: 'absolute', backgroundColor: 'black' }}
                            images={[
                                { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                                { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                                { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                                { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                            ]}
                        />
                    </View>
                    <View style={{ top: 175 }}>
                        <View style={{ marginLeft: 20, marginRight: 20 }}>
                            <Text style={styles.title}>{title}</Text>
                            <View style={styles.row}>
                                <Image source={require("../../../../assets/icons/small-star.png")} style={{ maxWidth: 15, maxHeight: 15 }} />
                                <Text>4.3 ({Math.floor(Math.random() * 40) + 1 })</Text>
                                <Image source={require("../../../../assets/icons/medal.png")} style={styles.medal} />
                                <Text>SuperMechanic</Text>
                            </View>
                            <View style={[styles.row, { marginTop: 5 }]}>
                                <Text style={styles.location}>Monterey Park, California, United States</Text>
                            </View>
                            <View style={styles.hr} />
                        </View>
                        <View style={styles.containerTwo}>
                            <Text style={styles.category}>Transmission Work</Text>
                            <Text style={{ fontSize: 16 }}>hosted by Jeremy</Text>
                        </View>
                        {/* <View style={styles.rowMargin}>
                            <Text style={{ fontSize: 20 }}>2016 Nissan Sentra Sedan 4-door 145,000 miles</Text>
                        </View> */}
                        <View style={styles.hrTwo} />
                        <View style={styles.marginMargin}>
                            <Text style={styles.mildBoldText}>Vehicle Location</Text>
                            <View style={styles.rowCustomTwo}>
                                <View style={{ marginTop: 20 }}>
                                    <Image source={require("../../../../assets/icons/world.png")} style={{ maxWidth: 60, maxHeight: 60 }} />
                                </View>
                                <View style={{ margin: 10, marginTop: 20 }}>
                                    <Text> Los Angeles, CA 90015 {"\n"}<Text> Free "Come to you" service or drop it off</Text></Text>
                                    <TouchableOpacity onPress={() => {}}><Text style={styles.customTextThree}>See on map</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.hrTwo} />
                        <View style={styles.rowMargin}>
                            <View style={styles.column}>
                                <Image source={require("../../../../assets/icons/seat.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={styles.centeredText}>5 Seats</Text>
                            </View>
                            <View style={styles.column}>
                                <Image source={require("../../../../assets/icons/door.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={styles.centeredText}>4 Doors</Text>
                            </View>
                            <View style={styles.column}>
                                <Image source={require("../../../../assets/icons/gas.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={styles.centeredText}>Gas (Premium)</Text>
                            </View>
                            <View style={styles.column}>
                                <Image source={require("../../../../assets/icons/gas-tank.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                <Text style={styles.centeredText}>20 MPG</Text>
                            </View>
                        </View>
                        <View style={styles.hrThree} />
                        <View style={styles.marginMargin}>
                            <Text style={styles.descriptionTitle}>Description</Text>
                            <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                <Text style={styles.p}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lorem turpis, tempus nec est sagittis, sodales cursus leo. Vestibulum placerat eget lorem nec lobortis. Morbi eu libero et nisi feugiat dictum. Duis sed lorem quis tellus iaculis mollis. Nunc vitae libero tempus, consectetur mi quis, sollicitudin magna. Praesent enim eros, sodales quis dictum et, lacinia quis arcu. Vivamus fringilla sem eu suscipit tempus. Curabitur volutpat elit magna, porttitor aliquam turpis placerat sit amet. Quisque pulvinar elementum dolor eget porttitor. Integer in mauris id quam eleifend fringilla. Maecenas non faucibus dui, rhoncus egestas velit.
                                </Text>
                            </ReadMore>
                            
                        </View>
                        <View style={styles.hrFour} />
                        <View style={[styles.marginMargin, { flexDirection: "row" }]}>
                            <View style={styles.columnCustom}>
                                <Image source={require("../../../../assets/icons/car-1.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                                
                            </View>
                            <View style={styles.columnCustom}>
                                <Image source={require("../../../../assets/icons/car-2.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                               
                            </View>
                            <View style={styles.columnCustom}>
                                <Image source={require("../../../../assets/icons/car-3.png")} style={{ maxWidth: 30, maxHeight: 30 }} />
                               
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.centeredTextCustom}>View All Symptoms</Text>
                            </View>
                        </View>
                        <View style={styles.hrFour} />
                    </View>
                </View>
                
            </ScrollView>
        )
    }
}
export default IndividualBrokenVehicleHelper;