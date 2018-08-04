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
                <div
                    className={"darkbluepurp"}
                    style={{
                        // height: 72,
                        width: "100%",
                        paddingTop: 30,
                        display: "flex",
                        boxShadow: "0px 0px 5px 0px #bbb",
                        color: "#fff",
                        alignItems: "center",
                        paddingBottom:20
                    }}

                >
                    <div style={{flex: 1, marginLeft: 10}}>
                        <Link to={'/'}>
                            <img src={BackIcon} width={25} height={25} alt=""/>
                        </Link>
                    </div>
                    <span style={{fontSize: 30, justifySelf: "center"}}>Inventory</span>
                    <div style={{flex: 1}}></div>
                </div>
                {this.state.ready ? this.renderBody() : this.renderLoading()}
                {/*<DeviceBar*/}
                {/*title='Something'*/}
                {/*position='bottom'*/}
                {/*titleStyle={{*/}
                {/*color: 'rgb(250, 250, 255)'*/}
                {/*}}*/}
                {/*style={{*/}
                {/*borderColor: 'rgba(255, 255, 255, .2)'*/}
                {/*}}*/}
                {/*/>*/}
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
