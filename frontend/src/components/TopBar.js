import React, { Component } from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import Sausage from "../images/sausage-icon-purple.svg"
class TopBar extends Component {
    render() {
        return (
            <div
                className={`device-bar top`}
                style={{
                    width: '100%',
                    height: '60px !important',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid',
                    borderColor: 'rgba(0,0,0,.12)',
                    padding: '8px 8px 6px 8px',
                    zIndex: 100,
                    ...this.props.style
                }}
            >
                <Link to='/home' style={{ position: 'absolute' }}>
                    <img src={Sausage} style={{ width: 32, height: 32 }} />
                </Link>
                <Logo />
            </div>
        );
    }
}

export default TopBar;