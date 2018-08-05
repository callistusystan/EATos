import React, {Component} from 'react';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import {GridLoader} from 'react-spinners';
import Fade from "@material-ui/core/Fade/Fade"
import {withRouter} from 'react-router-dom';
import ItemBlock from "../components/ItemBlock"
import SellModal from "../components/SellModal"
import TopBar from "../components/TopBar";
import io from 'socket.io-client';
import { connect } from 'react-redux';
import moment from 'moment';

import egg from "../images/egg.png"
import kitkat from "../images/kitkat.jpeg"
import heinzbeans from "../images/heinz.png"
import peanutbutter from "../images/peanutbutter.jpeg"
import chocolatepowder from "../images/chocolatepowder.png"


const products = new Map([100,heinzbeans],[101,egg],[102,kitkat],[103,chocolatepowder],[104,peanutbutter])

class HomePage extends Component {

    constructor(props) {
        super(props);


        this.state = {
            ready: false,
            sellModalOpen: false,
            giveModalOpen: false,
            currentItemName: null,
            foods: []
        };
    }

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
        setTimeout(() => this.setState({ ready: true }), 1000);
        this.socket = io('http://localhost:3300');
        this.socket.emit('getFoods', this.props.profile.name);
        this.socket.on('getFoods', (res) => {
            console.log(res);
            this.setState({ foods: res });
        });
    }

    componentWillUnmount() {
        this.socket.close();
    }

    renderLoading = () => {
        return (
            <LoadingView>
                <GridLoader color='#ffb432' loading={!this.state.ready}/>
            </LoadingView>
        );
    };

    renderAboutToExpire = () => {
        const expiringFood = this.state.foods.filter(food => {

            const noOfDays = moment(food.expiry_date, 'YYYY-MM-DD').diff(moment(), 'days');
            console.log(food.expiryDate, noOfDays);
            return noOfDays <= 3;
        });
        return expiringFood.map(food => (
            <ItemBlock
                key={food.qr_code}
                expiry_date={moment(food.expiry_date, 'YYYY-MM-DD').format('DD MON YYYY')}
                food_name={food.name}
                handleOnSell={this.handleOnSell}
                handleOnGive={this.handleOnGive}
            />
        ));
    };

    renderBody = () => {
        return (
            <ScrollView isDark>
                <div style={{minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: "center", padding: 16}}>
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
                    {this.renderAboutToExpire()}
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
                    {new Array(14).fill().map(_=><ItemBlock expiry_date={"6 August 2018"} food_name={"Food Name"} handleOnSell={this.handleOnSell} handleOnGive={this.handleOnGive}/>)}
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

const mapStateToProps = ({ profile }) => ({ profile });

export default  withRouter(connect(mapStateToProps)(HomePage));
