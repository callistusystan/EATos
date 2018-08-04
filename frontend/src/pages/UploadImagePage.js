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
import { Button } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import Img from 'react-image';



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
                <div style={{minHeight: '100%', display: 'flex', flexDirection: 'column', padding: 16 }}>
                    <Fade in timeout={200}>
                        <h3>Scan Receipt</h3>
                    </Fade>
                    <Fade in timeout={400}>
                        <div style={{marginTop: 16}}>
                    {this.state.base64data ? <Fade in timeout={500}><img src={this.state.base64data} style={{width:"90%",height:"auto",marginTop:16}} alt=""/></Fade> : <p>No image</p>}
                        </div>
                    </Fade>

                    <input
                        type="file"
                        id="take-pic" accept="image/*"
                        onChange={e=>this.compressImage(e.target.files[0])}
                        style={{display: 'none'}}
                    />
                    <Fade in timeout={600}>
                        <label htmlFor="take-pic">
                            <Button component="span" style={{ marginTop: 16 }}>
                                <PhotoCamera />
                                Add Photo
                            </Button>
                        </label>
                    </Fade>
                    <Button
                        fullWidth
                        variant='outlined'
                        style={{
                            transition:'1s',
                            height:this.state.base64data?80:0,
                            display: "flex",
                            borderRadius: 5,
                            marginTop:10,
                            marginBottom:5,
                            justifyContent: "center",
                            alignItems: "center",
                            textDecoration:"none"
                        }}
                        onClick={()=>this.handleUpload()}
                    >
                        {this.state.base64data?<h3>Upload</h3>:undefined}
                    </Button>
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
        background:"#FFF"
        // backgroundImage: `url(${Background})`,
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed'
    }
};

export default HomePage;
