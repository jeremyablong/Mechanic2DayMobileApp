import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styles from "./styles.js";
import { Header, Left, Body, Right, Button, Title, Text as NativeText } from 'native-base';
import Gallery from 'react-native-image-gallery';
import ReadMore from 'react-native-read-more-text';


const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla lorem, dictum id metus at, euismod bibendum felis. Donec molestie varius ornare. Etiam suscipit fringilla diam non scelerisque. Proin vel enim sed leo hendrerit molestie. Cras rutrum lectus eu ultrices venenatis. Sed vitae fringilla lectus. Aenean ac sem eros. Sed tempor convallis ex et pellentesque. Nam sed felis finibus, eleifend ante at, posuere lacus. Maecenas vehicula mollis nib";

class MechanicListingHelper extends Component {
constructor(props) {
    super(props);

}
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: "blue", marginTop: 5, fontSize: 18 }} onPress={handlePress}>
                Read more
            </Text>
        );
    }
    
    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: "blue", marginTop: 5, fontSize: 18 }} onPress={handlePress}>
                Show less
            </Text>
        );
    }
    render() {
        const title = "Mechanic for hire with transmission & engine speciality";
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image source={require('../../../assets/icons/go-back.png')} style={styles.icon} />
                        </Button>
                        <Title style={{ marginTop: 6 }}>Mechanic(s) for hire</Title>
                    </Left>
                </Header>
                <ScrollView contentContainerStyle={{ paddingBottom: 125 }} style={styles.container}>
                    <Gallery
                        style={{ flex: 1, minHeight: 250, maxHeight: 250, backgroundColor: 'black' }}
                        images={[
                            { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                            { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                            { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                            { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                        ]}
                    />
                    <View style={styles.margin}>
                        <Text style={styles.heading1}>{title.slice(0, 40)}{title.length > 40 ? "..." : ""}</Text>
                        <View style={[styles.row, { marginTop: 10 }]}>
                            <Image style={styles.starSmall} source={require("../../../assets/icons/small-star.png")} />
                            <Text>5.0 (97)   ~</Text>
                            <Text style={styles.location}>New York, United States</Text>
                        </View>
                        <View style={[styles.row, { marginTop: 10 }]}>
                            <Text>Part of our <Text style={styles.underline}>"Highly Ranked"</Text> community of mechanics</Text>
                        </View>
                        <View style={styles.hr} />
                        <View style={styles.row}>
                            <View style={styles.largeColumn}>
                                <Text style={styles.heading1}>Mechanic Profile Hosted By Jeremy</Text>
                            </View>
                            <View style={styles.smallColumn}>
                                <Image style={styles.profilePicOne} source={require("../../../assets/images/me.jpg")} />
                            </View>
                        </View>
                        <View style={{ marginTop: 25 }}>
                            <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                    <Text style={styles.cardText}>
                                        {description}
                                    </Text>
                            </ReadMore>
                        </View>
                    </View>
                </ScrollView>
            </Fragment>
        )
    }
}
export default MechanicListingHelper;