import React from "react"
import ShoppingBasket from "../images/shopping-basket.svg"
import Dislike from "../images/thumb-down-outline-symbol.svg"
import Smile from "../images/smile.svg"
import Dollar from "../images/coin.svg"
import Fade from "@material-ui/core/es/Fade/Fade";

class ItemBlock extends React.Component {
    state = {
        open: false,
        type: null
    }

    render() {
        const {food_name,expiry_date} = this.props
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "calc(100% - 10px)",
                marginTop: 5,
                marginBottom: 5,
                borderRadius: 5,
                alignItems: "center",
                background: this.state.open?'#fff':"#f9f7fa",
                boxShadow:this.state.open?'0px 1px 2px rgba(72,84,92,0.2)':undefined,
                paddingTop:15,
                transition:'0.5s',

            }}
                onClick={()=>this.setState({open:!this.state.open})}
            >
                <div style={{display: 'flex', width: "100%",alignItems:"center"}}>
                    <div
                        style={{
                            background: "#000",
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            marginLeft: 20,
                            marginRight: 10,
                            marginBottom: 5,
                            marginTop: 5,
                        }}
                    />
                    <div style={{color: "#515961"}}>{food_name}</div>
                    <div style={{flex: 1}}/>
                    <div style={{color: "#5d1ebe", fontSize: 10, marginRight: 20}}>
                        2 Days
                    </div>
                </div>
                {this.state.open&&
                    <Fade in out timeout={500}>
                <div
                    style={{
                        width:"100%",
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center"
                    }}
                    onClick={e=>e.stopPropagation()}
                >
                    <div
                        style={{
                            display: "flex",
                            width: "calc(100% - 50px)",
                            marginTop: 20

                        }}
                    >
                        <div>
                            <img src={ShoppingBasket} width={20} height={20} style={{marginRight: 5}} alt=""/>
                            4 August 2018
                        </div>
                        <div style={{flex: 1}}/>
                        <div>
                            <img src={Dislike} width={20} height={20} style={{marginRight: 5}} alt=""/>
                            {expiry_date}
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: "calc(100% - 50px)",
                            marginTop: 15,
                            marginBottom: 15,
                            justifyContent: "space-between",
                        }}
                    >
                        <button style={{
                            flex: 1,
                            fontSize: 18,
                            height: 40,
                            borderRadius: 25,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border:"1.5px solid #0b54ff"
                        }}
                            onClick={()=>this.props.handleOnSell('Free range extra large eggs')}
                        >
                            <img src={Dollar} style={{width: 25, height: 25}} alt=""/>
                            <span style={{marginLeft: 10, color:"#0b54ff"}}>Sell</span>
                        </button>
                        <div style={{width: 10}}/>
                        <button style={{
                            flex: 1,
                            fontSize: 18,
                            height: 40,
                            borderRadius: 25,
                            border:'1.5px solid #6a0bff',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                            onClick={()=>this.props.handleOnGive('Free range extra large eggs')}
                        >
                            <img src={Smile} style={{width: 25, height: 25}} alt=""/>
                            <span style={{marginLeft: 10,color:"#6a0bff"}}>Give</span>
                        </button>
                    </div>
                </div></Fade>}
            </div>
        )
    }
}

export default ItemBlock