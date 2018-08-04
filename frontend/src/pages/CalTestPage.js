import React, {Component} from 'react';
import DeviceBar from '../components/react-mobile-hackathon/devices/DeviceBar';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import {GridLoader} from 'react-spinners';
import Background from '../images/background.jpg';
import Fade from "@material-ui/core/Fade/Fade"
import {Link} from 'react-router-dom';
import BackIcon from "../images/back.svg"
import ItemBlock from "../components/ItemBlock"
import SellModal from "../components/SellModal"
import { Button } from '@material-ui/core';
import openSocket from 'socket.io-client';
import TopBar from "../components/TopBar";
const socket = openSocket('http://localhost:3300');

class HomePage extends Component {

    state = {
        ready: false
    };


    componentDidMount() {
        setTimeout(() => this.setState({ready: true}), 1000);
    }

    renderLoading = () => {
        return (
            <LoadingView>
                <GridLoader color='#ffb432' loading={!this.state.ready}/>
            </LoadingView>
        );
    };

    renderBody = () => {
        return (
            <ScrollView isDark>
                <div style={{minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: "center"}}>
                    <Button
                        onClick={() => {
                            socket.emit('createAcc', 'qwer', (data) => {
                                if (data) {
                                    this.props.setAccount('qwer');
                                } else {
                                    // account already exists
                                }
                            });
                        }}
                    >
                        Create Account
                    </Button>
                </div>
            </ScrollView>
        );
    };

    render() {
        return (
            <div style={styles.container}>
                <TopBar />
                {this.state.ready ? this.renderBody() : this.renderLoading()}
                {/*<BottomBar />*/}
            </div>
        );
    }
}

const styles = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: "#f9f7fa"
        // backgroundImage: `url(${Background})`,
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed'
    }
};

export default HomePage;
