import React from "react"
import {Dialog} from "@material-ui/core"
import DialogContent from '@material-ui/core/DialogContent';
import TextField from "@material-ui/core/es/TextField/TextField";


class SellModal extends React.Component {

    handleOnConfirm = () => {
        console.log("confirm")
    }

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
                        <TextField fullWidth label={'Enter price ($)'} value={type==="give"?0:undefined} disabled={type==='give'}/>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: "90%",
                            justifyContent:"center",
                            marginBottom:20
                        }}
                    >
                        <TextField fullWidth label={'Enter quantity'}/>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: "90%",
                            justifyContent:"center",
                            marginBottom:20
                        }}
                    >
                        <TextField fullWidth label={'Enter description'}/>
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

export default SellModal