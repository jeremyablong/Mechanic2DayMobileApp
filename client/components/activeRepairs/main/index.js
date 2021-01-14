import React, { Component, Fragment } from 'react';
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Header, Left, Button, Title, Text as NativeText } from 'native-base';
import styles from './styles.js';
import axios from 'axios';
import { Config } from 'react-native-config';
import { connect } from 'react-redux';
import Gallery from 'react-native-image-gallery';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';


const { height, width } = Dimensions.get("window");

class ActiveJobsMainHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        accepted_jobs: [],
        ready: false
    }
}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/active/jobs`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Gathered active info!") {
                console.log("!!!!!:", res.data);

                const { accepted_jobs } = res.data;

                this.setState({
                    accepted_jobs,
                    ready: true
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    redirect = () => {
        console.log("clicked");
    }
    renderImages = (images) => {
        switch (images.length) {
            case 1:
                return (
                    [
                        { source: { uri: images[0] } }
                    ]
                );
                break;
            case 2:
                return (
                    [
                        { source: { uri: images[0] } },
                        { source: { uri: images[1] } }
                    ]
                );
                break;    
            case 3:
                return (
                    [
                        { source: { uri: images[0] } },
                        { source: { uri: images[1] } },
                        { source: { uri: images[2] } }
                    ]
                );
                break;
            case 4:
                return (
                    [
                        { source: { uri: images[0] } },
                        { source: { uri: images[1] } },
                        { source: { uri: images[2] } }, 
                        { source: { uri: images[3] } }
                    ]
                );
                break; 
            case 5:
                return (
                    [
                        { source: { uri: images[0] } },
                        { source: { uri: images[1] } },
                        { source: { uri: images[2] } },
                        { source: { uri: images[3] } },
                        { source: { uri: images[4] } }
                    ]
                );
                break; 
            case 6:
                return (
                    [
                        { source: { uri: images[0] } },
                        { source: { uri: images[1] } },
                        { source: { uri: images[2] } },
                        { source: { uri: images[3] } },
                        { source: { uri: images[4] } },
                        { source: { uri: images[5] } }
                    ]
                );
                break;     
            default:
                return (
                    [
                        { source: { uri: images[0] } },
                        { source: { uri: images[1] } },
                        { source: { uri: images[2] } },
                        { source: { uri: images[3] } },
                        { source: { uri: images[4] } },
                        { source: { uri: images[5] } }
                    ]
                );
                break;
        }
    }
    componentWillUnmount () {
        this.setState({
            ready: false
        })
    }
    render() {
        const { accepted_jobs, ready } = this.state;
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.push("homepage-main");
                        }} transparent>
                            <Image style={styles.headerIcon} source={require('../../../assets/icons/go-back.png')} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -15 }}>Active Vehicle Repairs</Title>
                    </Left>
                </Header>
                <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 125 }}>
                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>These are your ACTIVE/PENDING jobs. You have been selected out of a variety of candidates to complete the below jobs! Congrats!</Text>
                </View>
                {ready === true ? <FlatList style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    data={accepted_jobs}
                    horizontal={false}
                    numColumns={1}
                    keyExtractor= {(item) => {
                        return item.id;
                    }}
                    renderItem={({item}) => {
                        console.log(item);
                        const { title, description, make, model, year } = item.vehicle_data;
                        return (
                        <View style={styles.background}>
                            <View style={styles.cardHeader}>
                                <Image style={styles.icon} source={require("../../../assets/images/not-availiable.jpg")}/>
                                <Text style={{ maxWidth: width * 0.70 }}>{title}</Text>
                            </View>
                            <Gallery
                                style={{ flex: 1, resizeMode: "cover", backgroundColor: 'black', maxHeight: 180, minHeight: 180 }}
                                images={this.renderImages(item.vehicle_data.photos)}
                            />
                            <View style={styles.cardFooter}>
                            <View style={{alignItems:"center", justifyContent:"center"}}>
                                <Text>{description}</Text>
                                <Text style={styles.name}>Agreed Price: ${item.agreed_amount}</Text>
                                <Text style={styles.position}>{`${year} ${make} ${model}`}</Text>
                                <AwesomeButtonRick width={width * 0.75} backgroundShadow={"#E8CEE4"} onPress={() => {
                                    console.log("clicked");

                                    this.props.props.navigation.push("view-individual-agreement", { vehicle: item.vehicle_data, item });
                                }} type="secondary">
                                    <Image source={require("../../../assets/icons/info.png")} style={{ maxWidth: 40, maxHeight: 40 }}/>
                                    <Text>View Individual Listing</Text>
                                </AwesomeButtonRick>
                            </View>
                            </View>
                        </View>
                        )
                    }}/> : null}
                </ScrollView>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.authenticated.unique_id
    }
}
export default connect(mapStateToProps, { })(ActiveJobsMainHelper);