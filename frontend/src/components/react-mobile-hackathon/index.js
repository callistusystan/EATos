import React, { Component } from 'react';
import IPhoneX from './devices/IPhoneX';
import QRCODE from "../../images/eosqr.png"
import Logo from "../Logo"

let is_safari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
let is_chrome = /Chrome|CriOS/.test(navigator.userAgent);
is_safari = is_safari && ! is_chrome;

class MobileHackathon extends Component {

    render() {
        return (
            <div
                className='react-app-container'
                style={{
                    width: '100%',
                    height: is_safari ? 'calc(100vh - 72px)' : '100vh',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <IPhoneX>
                    {this.props.children}
                </IPhoneX>
                <div
                    className='react-app-link-container'
                    style={{
                        marginLeft: '8%',
                        backgroundColor: '#FFF',
                        borderRadius: 20,
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                        width: 400,
                        display: 'none',
                        flexDirection: 'column',
                        justifyContent:"center",
                        alignItems:"center",
                        padding: 16
                    }}
                >
                    <Logo/>
                    <p style={{ fontSize: 28, color: '#555' }}>Try it out!</p>
                    <img src={QRCODE} style={{width:350,height:350}} alt=""/>
                    <a href={this.props.url || 'http://172.16.96.85:3000'} style={{ fontSize:15, letterSpacing: 2, color: '#007BFF', marginTop: 16, alignSelf: 'center' }}>{this.props.displayUrl || 'http://172.16.96.85:3000'}</a>
                </div>
            </div>
        );
    }
}

export default MobileHackathon;