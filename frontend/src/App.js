import React, { Component } from 'react';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import MarketPlacePage from './pages/MarketPlacePage';
import ScanPage from './pages/ScanPage';
import MobileHackathon from './components/react-mobile-hackathon';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <MobileHackathon appName='EOS' >
                <Switch>
                    <Route path='/inventory' component={InventoryPage} />
                    <Route path='/marketplace' component={MarketPlacePage} />
                    <Route path='/scanpage' component={ScanPage} />
                    <Route path='/' component={HomePage} />
                </Switch>

            </MobileHackathon>
        );
    }
}

export default App;