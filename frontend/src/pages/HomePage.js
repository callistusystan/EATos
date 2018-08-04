import React, {Component} from 'react';
import DeviceBar from '../components/react-mobile-hackathon/devices/DeviceBar';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import {GridLoader} from 'react-spinners';
import Background from '../images/background.jpg';
import Fade from "@material-ui/core/Fade/Fade"
import { Link,withRouter } from 'react-router-dom';
import QR from "../images/qrcode.svg"
import fridge from '../images/fridge.svg'
import shop from '../images/shopping-basket (1).svg'
import users from '../images/users.svg'
import Logo from "../components/Logo"
import TopBar from '../components/TopBar';
import { connect } from 'react-redux';

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
                <div style={{minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: "center", padding: 16}}>
                    <Fade in timeout={200}>
                        <h3 style={{ alignSelf: 'flex-start' }}>Welcome, {this.props.profile.name}</h3>
                    </Fade>
                    <Fade in timeout={400}>
                    <Link
                        to={'/scan'}
                        style={{
                            width: "100%",
                            minHeight: 100,
                            height:100,
                            display: "flex",
                            borderRadius: 5,
                            marginTop:10,
                            marginBottom:5,
                            alignItems: "center",
                            color: "#fff",
                            textDecoration:"none",
                            background:'#F97F51'
                        }}
                    >
                        <h1 style={{textAlign:'left',marginLeft:20}}>Scan Receipt</h1>
                        <div style={{flex:1}}/>
                        <img src={QR} height={50} width={50} style={{marginRight:20}} alt=""/>
                    </Link>
                    </Fade>
                    <Fade in timeout={600}>
                    <Link
                        to={'/inventory'}
                        style={{
                            width: "100%",
                            minHeight: 100,
                            height:100,
                            display: "flex",
                            borderRadius: 5,
                            marginTop: 5,
                            marginBottom: 5,
                            alignItems: "center",
                            color: "#fff",
                            textDecoration:"none",
                            background:"#1B9CFC"

                        }}
                    >
                        <h1 style={{textAlign:'left',marginLeft:20}}>Inventory</h1>
                        <div style={{flex:1}}/>
                        <img src={fridge} height={50} width={50} style={{marginRight:20}} alt=""/>
                    </Link>
                    </Fade>
                    <Fade in timeout={800}>
                    <Link
                        to={'market'}
                        style={{
                            width: "100%",
                            minHeight: 100,
                            height:100,
                            display: "flex",
                            borderRadius: 5,
                            marginTop: 5,
                            marginBottom: 5,
                            alignItems: "center",
                            color: "#fff",
                            textDecoration:"none",
                            background:"#B33771"

                        }}
                    >
                        <h1 style={{textAlign:'left',marginLeft:20}}>Market Place</h1>
                        <div style={{flex:1}}/>
                        <img src={shop} height={50} width={50} style={{marginRight:20}} alt=""/>
                    </Link>
                    </Fade>
                    <Fade in timeout={1000}>
                        <Link
                            to={'profile'}
                            style={{
                                width: "100%",
                                minHeight: 100,
                                height:100,
                                display: "flex",
                                borderRadius: 5,
                                marginTop: 5,
                                marginBottom: 15,
                                alignItems: "center",
                                color: "#fff",
                                textDecoration:"none",
                                background:"#3B3B98"

                            }}
                        >
                            <h1 style={{textAlign:'left',marginLeft:20}}>My Profile</h1>
                            <div style={{flex:1}}/>
                            <img src={users} height={50} width={50} style={{marginRight:20}} alt=""/>
                        </Link>
                    </Fade>
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
        background:"#fff"
        // backgroundImage: `url(${Background})`,
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed'
    }
};

const mapStateToProps = ({profile}) => ({
    profile
});

export default withRouter(connect(mapStateToProps)(HomePage));
