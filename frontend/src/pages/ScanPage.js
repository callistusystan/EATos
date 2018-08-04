import React, { Component } from 'react';
import DeviceBar from '../components/react-mobile-hackathon/devices/DeviceBar';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import { GridLoader } from 'react-spinners';
import Background from '../images/background.jpg';

class HomePage extends Component {

    state = {
        ready: false
    };

    componentDidMount() {
        setTimeout(() => this.setState({ ready: true }), 2000);
    }

    renderLoading = () => {
        return (
            <LoadingView>
                <GridLoader color='#ffb432' loading={!this.state.ready} />
            </LoadingView>
        );
    };

    renderBody = () => {
        return (
            <ScrollView isDark>
                <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems:"center" }}>
                    <div
                        className={'bluepurple'}
                        style={{
                            width:"90%",
                            minHeight:100,
                            display:"flex",
                            borderRadius:10,
                            // marginTop:5,
                            // marginBottom:5,
                            justifyContent:"center",
                            alignItems:"center",
                            color:"#fff"
                        }}
                    >
                        <h1>Scan</h1>
                    </div>
                    <div
                        className={'bluegreen'}
                        style={{
                            width:"90%",
                            minHeight:100,
                            display:"flex",
                            borderRadius:10,
                            marginTop:5,
                            marginBottom:5,
                            justifyContent:"center",
                            alignItems:"center",
                            color:"#fff"
                        }}
                    >
                        <h1>My Inventory</h1>
                    </div>
                    <div
                        className={'orangeyellow'}
                        style={{
                            width:"90%",
                            minHeight:100,
                            display:"flex",
                            borderRadius:10,
                            marginTop:5,
                            marginBottom:5,
                            justifyContent:"center",
                            alignItems:"center",
                            color:"#fff"
                        }}
                    >
                        <h1>Market Place</h1>
                    </div>
                    <div
                        className={'whiteyellow'}
                        style={{
                            minHeight:100,
                            width:"90%",
                            display:"flex",
                            borderRadius:10,
                            marginTop:5,
                            marginBottom:5
                        }}
                    >

                    </div>

                </div>
            </ScrollView>
        );
    };

    render() {
        return (
            <div style={styles.container}>
                <DeviceBar
                    class={'darkpurpblue'}
                    title='Home'
                    position='top'
                    noBorder
                    isAppBar
                    titleStyle={{
                        color: 'rgb(0,0,0)',
                        fontFamily:"Kollektif"
                    }}
                    style={{
                        borderColor: 'rgba(255, 255, 255, .2)'
                    }}
                />
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
        // backgroundImage: `url(${Background})`,
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed'
    }
};

export default HomePage;