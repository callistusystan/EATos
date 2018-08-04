import React, { Component } from 'react';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import MarketPlacePage from './pages/Market';
import ScanPage from './pages/ScanPage';
import ProfilePage from './pages/ProfilePage'
import MobileHackathon from './components/react-mobile-hackathon';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <MobileHackathon appName='EOS' >
                <Switch>
                    <Route path='/inventory' component={InventoryPage} />
                    <Route path='/market' component={MarketPlacePage} />
                    <Route path='/scan' component={ScanPage} />
                    <Route path='/profile/:uid' component={ProfilePage} />
                    <Route path='/profile' component={ProfilePage} />
                    <Route path='/' component={HomePage} />
                </Switch>

            </MobileHackathon>
        );
    }
}

export default App;