import React, {Component} from 'react';
import DeviceBar from '../components/react-mobile-hackathon/devices/DeviceBar';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import {GridLoader} from 'react-spinners';
import Background from '../images/background.jpg';
import Fade from "@material-ui/core/Fade/Fade"
import {Link, withRouter} from 'react-router-dom';
import BackIcon from "../images/back.svg"
import ItemBlock from "../components/ItemBlock"
import SellModal from "../components/SellModal"
import TopBar from "../components/TopBar";

class HomePage extends Component {

    state = {
        ready: false,
        sellModalOpen: false,
        giveModalOpen: false,
        currentItemName: null,
    };


    handleOnSell = (currentItemName) => {
        this.setState({sellModalOpen: true,currentItemName, type:'sell'})
    }

    handleOnGive = (currentItemName) => {
        this.setState({sellModalOpen: true,currentItemName, type:'give'})
    }

    handleOnClose = () => {
        this.setState({sellModalOpen: false, giveModalOpen:false})
    }


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
                    {this.state.sellModalOpen &&
                    <SellModal handleOnClose={this.handleOnClose} itemName={this.state.currentItemName} type={this.state.type}/>
                    }
                    <Fade in timeout={200}>
                        <div
                            style={{
                                display: "flex",
                                width: "100%"
                            }}
                        >
                            <h4 style={{paddingLeft: 10, color: "#515961"}}>About to expire</h4>
                            <span style={{flex: 1}}/>
                            <h4 style={{paddingRight: 10, color: "#a2a3a6", fontWeight: 500}}>14 items</h4>
                        </div>
                    </Fade>
                    {new Array(14).fill().map(_=><ItemBlock handleOnSell={this.handleOnSell} handleOnGive={this.handleOnGive}/>)}
                    <Fade in timeout={200}>
                        <div
                            style={{
                                display: "flex",
                                width: "100%"
                            }}
                        >
                            <h4 style={{paddingLeft: 10, color: "#515961"}}>Other inventory</h4>
                            <span style={{flex: 1}}/>
                            <h4 style={{paddingRight: 10, color: "#a2a3a6", fontWeight: 500}}>14 items</h4>
                        </div>
                    </Fade>
                    {new Array(14).fill().map(_=><ItemBlock handleOnSell={this.handleOnSell} handleOnGive={this.handleOnGive}/>)}
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

export default  withRouter(HomePage);
