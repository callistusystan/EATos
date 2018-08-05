import React, {Component} from 'react';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import {GridLoader} from 'react-spinners';
import Fade from "@material-ui/core/Fade/Fade"
import { withRouter} from 'react-router-dom';
import TopBar from "../components/TopBar";


class HomePage extends Component {

    state = {
        ready: false
    };

    componentDidMount() {
        setTimeout(() => this.setState({ready: true}), 1000);
    }

    renderLoading = () => {
        return (
            <LoadingView>
                <GridLoader color='#3B3B98' loading={!this.state.ready}/>
            </LoadingView>
        );
    };

    renderBody = () => {
        const {match:{params:{uid}}} = this.props
        console.log(uid)
        return (
            <ScrollView isDark>
                <div style={{minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: "center"}}>
                    <Fade in timeout={200}>
                        <button
                            style={{
                                background:"#FEA47F",
                                width: "90%",
                                minHeight: 100,
                                height:100,
                                display: "flex",
                                borderRadius: 5,
                                marginTop:10,
                                marginBottom:5,
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#fff",
                                textDecoration:"none"
                            }}
                        >
                            <h1>Scan QR</h1>
                        </button>
                    </Fade>
                    <Fade in timeout={400}>
                        <button
                            style={{
                                background:'#25CCF7',
                                width: "90%",
                                minHeight: 100,
                                height:100,
                                display: "flex",
                                borderRadius: 5,
                                marginTop: 5,
                                marginBottom: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#fff",
                                textDecoration:"none"

                            }}
                        >
                            <h1>Scan Item</h1>
                        </button>
                    </Fade>
                    {/*<Fade in timeout={800}>*/}
                    {/*<Link*/}
                    {/*to={'/'}*/}
                    {/*className={'whiteyellow'}*/}
                    {/*style={{*/}
                    {/*minHeight: 100,*/}
                    {/*flex:1,*/}
                    {/*width: "90%",*/}
                    {/*display: "flex",*/}
                    {/*borderRadius: 5,*/}
                    {/*marginTop: 5,*/}
                    {/*marginBottom: 5,*/}
                    {/*textDecoration:"none"*/}

                    {/*}}*/}
                    {/*>*/}

                    {/*</Link>*/}
                    {/*</Fade>*/}
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
        // backgroundImage: `url(${Background})`,
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed'
    }
};

export default  withRouter(HomePage);
