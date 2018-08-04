import React, {Component} from 'react';
import DeviceBar from '../components/react-mobile-hackathon/devices/DeviceBar';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import {GridLoader} from 'react-spinners';
import ImageCompressor from "image-compressor.js"
import Fade from "@material-ui/core/Fade/Fade"
import { Link } from 'react-router-dom';
import BackIcon from "../images/back.svg"
import UserIcon from "../images/User-icon.svg"
import TopBar from "../components/TopBar";



class HomePage extends Component {

    state = {
        ready: false,
        base64data: null
    };

    compressImage = image => {
        if(typeof(image) !== typeof new Blob()){
            return
        }
        const imageCompressor = new ImageCompressor();
        imageCompressor.compress(image,{
            maxHeight:320,
            maxWidth:320,
        }).then(compressedImage=>{
            const reader = new FileReader();
            reader.readAsDataURL(compressedImage);
            reader.onloadend = () => {
                const base64data = reader.result;
                this.setState({base64data:base64data})
            }
        })
    }

    handleUpload = () => {
        //handle upload
        console.log(this.state.base64data)
    }

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

    renderBody = () => {
        const {match:{params:{uid}}} = this.props
        console.log(uid)
        return (
            <ScrollView isDark>
                <div style={{minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: "center"}}>
                    {this.state.base64data&&<Fade in timeout={500}><img src={this.state.base64data} style={{width:"90%",height:"auto",marginTop:100}} alt=""/></Fade>}
                    <Fade in timeout={200}>
                        <div
                            className={'bluepurple'}
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
                                textDecoration:"none"
                            }}
                        >
                            <input type="file" onChange={e=>this.compressImage(e.target.files[0])} accept="image/*"/>
                        </div>
                    </Fade>
                    <button
                        className={'orangeyellow'}
                        style={{
                            width: "90%",
                            transition:'1s',
                            height:this.state.base64data?100:0,
                            display: "flex",
                            borderRadius: 5,
                            marginTop:10,
                            marginBottom:5,
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                            textDecoration:"none"
                        }}
                        onClick={()=>this.handleUpload()}
                    >
                        {this.state.base64data?<h3>Upload</h3>:undefined}
                    </button>
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
        background:"#480a87"
        // backgroundImage: `url(${Background})`,
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed'
    }
};

export default HomePage;
