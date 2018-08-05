import React from "react"
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

class BuyModal extends React.Component {

    handleOnConfirm = () => {
        console.log("confirm")
        console.log({
            ...this.props.sale
        });
        console.log(this.props.food);
        this.socket.emit('processTransaction', {
            ...this.props.food,
            seller: this.props.profile.name,
            type_of_sale: this.props.type === 'give'? 2 : 1,
            count: parseInt(this.state.count),
            price: parseInt(this.state.price) || 0,
            description: this.state.description
        });

        this.props.handleOnClose();
    }


    componentDidMount() {
        setTimeout(() => this.setState({ ready: true }), 1000);
        this.socket = openSocket('http://172.16.96.85:3300');
    }

    render() {
        console.log(this.props);
        const {type, food_name, units, price, sale} = this.props
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
                        minHeight: 100,
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
                        <span>{type} {food_name} x {units} for ${units*price}?</span>
                    </div>
                    <div style={{flex:1}}/>
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

export default connect(({profile}) =>({profile}))(BuyModal)