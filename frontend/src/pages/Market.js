import React, {Component} from 'react';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import {GridLoader} from 'react-spinners';
import Fade from "@material-ui/core/Fade/Fade"
import {withRouter} from 'react-router-dom';
import ItemBlockGive from "../components/MarketItemBlockGive"
import ItemBlockSell from "../components/MarketItemBlockSell"
import SellModal from "../components/BuyModal"
import TopBar from "../components/TopBar";
import openSocket from 'socket.io-client';
import moment from 'moment/moment';

class HomePage extends Component {

    state = {
        ready: false,
        sellModalOpen: false,
        giveModalOpen: false,
        currentItemName: null,
        type: null,
        sales: [],
        sale: null
    };


    handleOnBuy = (sale) => {
        console.log('ON BUY', sale);
        this.setState({sellModalOpen: true, type: "Buy", sale})
    }

    handleOnClaim = (sale) => {
        console.log('ON BUY', sale);

        this.setState({sellModalOpen: true, type: "Claim", sale})
    }


    handleOnClose = () => {
        this.setState({sellModalOpen: false, giveModalOpen: false})
    }

    componentDidMount(){
        this.socket= openSocket('http://172.16.96.85:3300');
        this.socket.emit('getSales', {});
        this.socket.on('getSales', sales => {
            this.setState({ sales });
        });
        setTimeout(() => this.setState({ready: true}), 1000);
    }

    componentWillUnmount(){
        this.socket.close()
    }

    renderLoading = () => {
        return (
            <LoadingView>
                <GridLoader color='#ffb432' loading={!this.state.ready}/>
            </LoadingView>
        );
    };

    renderDonations = () => {
        console.log(this.state.sales);
        const donations = this.state.sales.filter(sale => sale.type_of_sale === 2);

        return (
            <div style={{ width: '100%' }}>
                <Fade in timeout={200}>
                    <div
                        style={{
                            display: "flex",
                            width: "100%"
                        }}
                    >
                        <h4 style={{paddingLeft: 10, color: "#515961"}}>Free Items</h4>
                        <span style={{flex: 1}}/>
                        <h4 style={{paddingRight: 10, color: "#a2a3a6", fontWeight: 500}}>{donations.length} items</h4>
                    </div>
                </Fade>
                {donations.map(sale =>
                    <ItemBlockGive
                        handler={this.handleOnClaim}
                        sale={sale}
                        qr_code={sale.qr_code}
                        units={sale.units}
                        expiry_date={moment(sale.expiry_date, 'YYYY-MM-DD').format('DD MMM YYYY')}
                        count={sale.count}
                        price={0}
                        seller={sale.seller}
                        food_name={sale.food_name}
                    />
                )}
            </div>
        );
    };

    renderSales = () => {
        console.log(this.state.sales);
        const sales = this.state.sales.filter(sale => sale.type_of_sale === 1);

        return (
            <div style={{ width: '100%' }}>
                <Fade in timeout={200}>
                    <div
                        style={{
                            display: "flex",
                            width: "100%"
                        }}
                    >
                        <h4 style={{paddingLeft: 10, color: "#515961"}}>Items on the market</h4>
                        <span style={{flex: 1}}/>
                        <h4 style={{paddingRight: 10, color: "#a2a3a6", fontWeight: 500}}>{sales.length} items</h4>
                    </div>
                </Fade>
                {sales.map(sale =>
                    <ItemBlockSell
                        handler={this.handleOnBuy}
                        sale={sale}
                        units={sale.units}
                        qr_code={sale.qr_code}
                        expiry_date={moment(sale.expiry_date, 'YYYY-MM-DD').format('DD MMM YYYY')}
                        price={sale.price}
                        count={sale.count}
                        seller={sale.seller}
                        food_name={sale.food_name}
                    />
                )}
            </div>
        );
    };

    renderBody = () => {
        return (
            <ScrollView isDark>
                <div style={{minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: "center", padding: 8}}>
                    {this.state.sellModalOpen &&
                    <SellModal
                        handleOnClose={this.handleOnClose}
                        sale={this.state.sale}
                        qr_code={this.state.qr_code}
                        itemName={this.state.currentItemName}
                        type={this.state.type}
                        food_name={this.state.food_name}
                        units={this.state.units}
                        price={this.state.price}
                        seller={this.state.seller}
                    />
                    }
                    {this.renderDonations()}
                    {this.renderSales()}
                </div>
            </ScrollView>
        );
    };

    render() {
        console.log(this.state);
        return (
            <div style={styles.container}>
                <TopBar/>
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

export default withRouter(HomePage);
