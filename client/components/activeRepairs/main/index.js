import React, { Component, Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { Header, Left, Button, Title, Text as NativeText } from 'native-base';
import styles from './styles.js';
import axios from 'axios';
import { Config } from 'react-native-config';
import { connect } from 'react-redux';

class ActiveJobsMainHelper extends Component {
constructor(props) {
    super(props);

}
    componentDidMount() {
        axios.post(`${Config.ngrok_url}/gather/active/jobs`, {
            id: this.props.unique_id
        }).then((res) => {
            if (res.data.message === "Gathered active info!") {
                console.log(res.data);
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (
            <Fragment>
                <Header>
                    <Left style={{ flexDirection: "row" }}>
                        <Button onPress={() => {
                            this.props.props.navigation.goBack();
                        }} transparent>
                            <Image style={styles.headerIcon} source={require('../../../assets/icons/go-back.png')} />
                        </Button>
                        <Title style={{ marginTop: 10, left: -15 }}>Active Vehicle Repairs</Title>
                    </Left>
                </Header>
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