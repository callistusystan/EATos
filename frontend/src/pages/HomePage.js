import React, {Component} from 'react';
import DeviceBar from '../components/react-mobile-hackathon/devices/DeviceBar';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import {GridLoader} from 'react-spinners';
import Background from '../images/background.jpg';
import Fade from "@material-ui/core/Fade/Fade"
import { Link,withRouter } from 'react-router-dom';


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
                    <Fade in timeout={200}>
                    <Link
                        to={'/scan'}
                        className={'bluepurple'}
                        style={{
                            width: "90%",
                            minHeight: 100,
                            flex:1,
                            display: "flex",
                            borderRadius: 5,
                            marginTop:10,
                            marginBottom:5,
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                            textDecoration:"none"
                        }}
                    >
                        <h1>Scan</h1>
                    </Link>
                    </Fade>
                    <Fade in timeout={400}>
                    <Link
                        to={'/inventory'}
                        className={'bluegreen'}
                        style={{
                            width: "90%",
                            minHeight: 100,
                            flex:1,
                            display: "flex",
                            borderRadius: 5,
                            marginTop: 5,
                            marginBottom: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                            textDecoration:"none"

                        }}
                    >
                        <h1>My Inventory</h1>
                    </Link>
                    </Fade>
                    <Fade in timeout={600}>
                    <Link
                        to={'market'}
                        className={'realbluegreen'}
                        style={{
                            width: "90%",
                            minHeight: 100,
                            flex:1,
                            display: "flex",
                            borderRadius: 5,
                            marginTop: 5,
                            marginBottom: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                            textDecoration:"none"

                        }}
                    >
                        <h1>Market Place</h1>
                    </Link>
                    </Fade>
                    <Fade in timeout={600}>
                        <Link
                            to={'profile'}
                            className={'orangeyellow'}
                            style={{
                                width: "90%",
                                minHeight: 100,
                                flex:1,
                                display: "flex",
                                borderRadius: 5,
                                marginTop: 5,
                                marginBottom: 15,
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#fff",
                                textDecoration:"none"

                            }}
                        >
                            <h1>My Profile</h1>
                        </Link>
                    </Fade>
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
                        boxShadow:"0px 0px 5px 0px #bbb",
                        color:"#fff",
                        paddingBottom:20
                    }}

                >
                    <div style={{flex:1}}></div>
                    <span style={{fontSize:30,justifySelf: "center"}}>Home</span>
                    <div style={{flex:1}}></div>
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
        background:"#480a87"
        // backgroundImage: `url(${Background})`,
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed'
    }
};

export default withRouter(HomePage);
