import React, {Component} from 'react';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import {GridLoader} from 'react-spinners';
import Fade from "@material-ui/core/Fade/Fade"
import TopBar from '../components/TopBar';
import { TextField, Button } from '@material-ui/core';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import * as actions from '../actions';
const socket = openSocket('http://172.16.96.85:3300');

class SignInPage extends Component {

    state = {
        ready: false,
        name: '',
        error: false
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

    createAccount = (e) => {
        socket.emit('createAcc', this.state.name, (data) => {
            console.log(data);
            if (data) {
                this.props.setProfile({ name: this.state.name });
                this.props.history.push('/home');
            } else {
                this.setState({ error: true });
            }
        });
    };

    renderBody = () => {
        return (
            <ScrollView isDark>
                <div style={{minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '16px'}}>
                    <Fade in timeout={1000}>
                        <h2>Welcome to EATos!</h2>
                    </Fade>
                    <Fade in timeout={1500}>
                        <div
                            style={{ marginTop: 16 }}
                        >
                            <h1 style={{ letterSpacing: 4, marginBottom: 8 }}>My name is</h1>
                            <TextField fullWidth value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                            <div style={{ display: 'flex', marginTop: 8, justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#555' }}>Enter at least 6 characters <br />(lower case letters or digits)</span>
                                <Button type='submit' variant="outlined"  disabled={this.state.name === '' || !this.state.name.match(/[a-z0-9]{6,}/)} onClick={this.createAccount} style={{ alignSelf: 'flex-end' }}>START</Button>
                            </div>
                            {this.state.error && <p style={{ marginTop: 4, color: 'red' }}>Error: Username has been taken!</p>}
                        </div>
                    </Fade>
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
        background:"#fff"
    }
};

export default connect(null, actions)(SignInPage);