import React from "react"
import TextField from "@material-ui/core/es/TextField/TextField";
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';

class SellModal extends React.Component {

    state = {
        count: '',
        price: '',
        description: ''
    };

    componentDidMount(){
        this.socket= openSocket('http://172.16.96.85:3300');
    }

    componentWillUnmount(){
        this.socket.close()
    }

    handleOnConfirm = () => {
        console.log("confirm")
        console.log({
            ...this.props.food,
            seller: this.props.profile.name,
            type_of_sale: this.props.type === 'give'? 2 : 1,
            count: this.state.count,
            price: this.state.price,
            description: this.state.description
        });
        this.socket.emit('createSale', {
            ...this.props.food,
            seller: 1,
            type_of_sale: this.props.type === 'give'? 2 : 1,
            count: parseInt(this.state.count),
            price: parseInt(this.state.price),
            description: this.state.description
        });
    };

    render() {
        const {type} = this.props
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    background: "rgba(0,0,0,0.4)",
                    zIndex: 1,
                    justifyContent: "center"
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "calc(30% - 100px)",
                        width: "90%",
                        minHeight: 200,
                        background: "#fff",
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: 5,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            width: "90%",
                            marginTop:20,
                            marginBottom:20,
                            color:"#999999"
                        }}
                    >
                        <span>List {this.props.itemName} for {type}?</span>
                    </div>
                    <div style={{flex:1}}/>
                    <div
                        style={{
                            display: "flex",
                            width: "90%",
                            justifyContent:"center",
                            marginBottom:20
                        }}
                    >
                        <TextField type='number' min='0' step='1' value={this.state.price} onChange={e => this.setState({ price: e.target.value })} fullWidth label={'Enter price ($)'} value={type==="give"?0:undefined} disabled={type==='give'}/>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: "90%",
                            justifyContent:"center",
                            marginBottom:20
                        }}
                    >
                        <TextField type='number' min='0' step='1' value={this.state.count} onChange={e => this.setState({ count: e.target.value })} fullWidth label={'Enter quantity'}/>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: "90%",
                            justifyContent:"center",
                            marginBottom:20
                        }}
                    >
                        <TextField fullWidth value={this.state.description} onChange={e => this.setState({ description: e.target.value })} label={'Enter description'}/>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: "90%",
                            marginBottom:20
                        }}
                    >
                        <button

                            style={{
                                flex: 1,
                                fontSize: 15,
                                height: 40,
                                borderRadius: 25,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "1.5px solid rgb(200,200,200)",
                                background: "#fff"
                            }}
                            onClick={e => {
                                this.props.handleOnClose();
                                console.log(e)
                            }}
                        >
                            <span style={{marginLeft: 10, color: "rgb(200,200,200)"}}>Cancel</span>
                        </button>
                        <div style={{width: 10}}/>
                        <button

                            style={{
                                flex: 1,
                                fontSize: 15,
                                height: 40,
                                borderRadius: 25,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "none",
                                background: "linear-gradient(90deg,rgb(80, 114, 249) 0%, rgb(186, 162, 232))"
                            }}
                            onClick={()=>this.handleOnConfirm()}
                        >
                            <span style={{marginLeft: 10, color: "#fff"}}>Confirm</span>
                        </button>
                    </div>

                </div>
            </div
            >

        )
    }
}

const mapState = ({ profile }) => ({ profile });

export default connect(mapState)(SellModal);