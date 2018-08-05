import React, {Component} from 'react';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import {GridLoader} from 'react-spinners';
import Fade from "@material-ui/core/Fade/Fade"
import {withRouter} from 'react-router-dom';
import UserIcon from "../images/User-icon.svg"
import TopBar from "../components/TopBar";
import {connect} from "react-redux"
import ItemBlock from "../components/ItemBlock";


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
                    <img src={UserIcon} style={{width:200,height:200,marginTop:100}} alt=""/>
                    <Fade in timeout={200}>
                        <button
                            style={{
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
                                textDecoration:"none",
                                background:"#FC427B"
                            }}
                        >
                            <h1>{this.props.username||'Unknown'}</h1>
                        </button>
                    </Fade>
                    <h2 style={{width:"100%"}}>Carbon Footprint Saved</h2>
                    <ItemBlock food_name={"Egg x 10 - Carbon Emission: 0.3kg"} disableClick qr_code={101}/>
                    <ItemBlock food_name={"Kitkat x 3 - Carbon Emission: 0.13kg"} disableClick qr_code={102}/>
                    <ItemBlock food_name={"Peanut Butter x 2 - Carbon Emission: 0.1kg "} disableClick qr_code={104}/>
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

const mapStateToProps = state =>({
    username:state.profile.name
})

export default  withRouter(connect(mapStateToProps)(HomePage))
