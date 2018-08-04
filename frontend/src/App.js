import React, { Component } from 'react';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import CalTestPage from './pages/CalTestPage';
import MarketPlacePage from './pages/Market';
import ScanPage from './pages/ScanPage';
import UploadImagePage from './pages/UploadImagePage';
import ProfilePage from './pages/ProfilePage'
import MobileHackathon from './components/react-mobile-hackathon';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3300');

class App extends Component {
    constructor(props) {
        super(props);

        socket.on('getSales', res => {
            console.log('sales', res);
        });
        socket.on('getFoods', res => {
            console.log('res', res);
        });
    }
    render() {
        return (
            <MobileHackathon appName='EOS' >
                <Switch>
                    <Route path='/caltest' component={CalTestPage} />
                    <Route path='/inventory' component={InventoryPage} />
                    <Route path='/market' component={MarketPlacePage} />
                    <Route path='/scan' component={ScanPage} />
                    <Route path='/profile/:uid' component={ProfilePage} />
                    <Route path='/profile' component={ProfilePage} />
                    <Route path='/UploadImagePage' component={UploadImagePage} />
                    <Route path='/' component={HomePage} />
                </Switch>

            </MobileHackathon>
        );
    }
}

export default connect(null, actions)(App);