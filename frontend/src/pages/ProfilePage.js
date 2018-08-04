import React, {Component} from 'react';
import DeviceBar from '../components/react-mobile-hackathon/devices/DeviceBar';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import {GridLoader} from 'react-spinners';
import Background from '../images/background.jpg';
import Fade from "@material-ui/core/Fade/Fade"
import { Link } from 'react-router-dom';
import BackIcon from "../images/back.svg"
import UserIcon from "../images/User-icon.svg"


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
        const {match:{params:{uid}}} = this.props
        console.log(uid)
        return (
            <ScrollView isDark>
                <div style={{minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: "center"}}>
                    <img src={UserIcon} style={{width:200,height:200,marginTop:100}} alt=""/>
                    <Fade in timeout={200}>
                        <button
                            className={'bluepurple'}
                            style={{
                                width: "90%",
                                minHeight: 100,
                                height:100,
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
                            <h1>Your name is {uid||'Jeff'}</h1>
                        </button>
                    </Fade>
                    {/*<Fade in timeout={800}>*/}
                    {/*<Link*/}
                    {/*to={'/'}*/}
                    {/*className={'whiteyellow'}*/}
                    {/*style={{*/}
                    {/*minHeight: 100,*/}
                    {/*flex:1,*/}
                    {/*width: "90%",*/}
                    {/*display: "flex",*/}
                    {/*borderRadius: 5,*/}
                    {/*marginTop: 5,*/}
                    {/*marginBottom: 5,*/}
                    {/*textDecoration:"none"*/}

                    {/*}}*/}
                    {/*>*/}

                    {/*</Link>*/}
                    {/*</Fade>*/}
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
                    <span style={{fontSize: 30, justifySelf: "center"}}>Profile</span>
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
        background:"#480a87"
        // backgroundImage: `url(${Background})`,
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed'
    }
};

export default HomePage;
