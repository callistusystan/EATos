import React, { Component } from 'react';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import MarketPlacePage from './pages/Market';
import UploadImagePage from './pages/UploadImagePage';
import ProfilePage from './pages/ProfilePage'
import MobileHackathon from './components/react-mobile-hackathon';
import {Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import SignInPage from './pages/SignInPage';
import openSocket from 'socket.io-client';

class App extends Component {
    constructor(props) {
        super(props);


    }

    componentDidMount(){
        this.socket= openSocket('http://172.16.96.85:3300');
        this.socket.on('getSales', res => {
            console.log('sales', res);
        });
        this.socket.on('getFoods', res => {
            console.log('res', res);
        });
    }

    componentWillUnmount(){
        this.socket.close()
    }

    // componentDidMount() {
    //     if (this.props.location.pathname !== '/' && this.props.profile.name === null) {
    //         this.props.history.push('/');
    //     }
    // }!
    //
    // componentDidUpdate() {
    //     if (this.props.location.pathname !== '/' && this.props.profile.name === null) {
    //         this.props.history.push('/');
    //     }
    // }

    render() {
        return (
            <MobileHackathon appName='EATos' >
                <Switch>
                    <Route path='/inventory' component={InventoryPage} />
                    <Route path='/market' component={MarketPlacePage} />
                    <Route path='/scan' component={UploadImagePage} />
                    <Route path='/profile/:uid' component={ProfilePage} />
                    <Route path='/profile' component={ProfilePage} />
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/' component={SignInPage} />
                </Switch>
            </MobileHackathon>
        );
    }
}

const mapStateToProps = ({ profile }) => ({
    profile
});

export default withRouter(connect(mapStateToProps, actions)(App));