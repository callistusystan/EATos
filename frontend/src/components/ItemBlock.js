import React from "react"

class ItemBlock extends React.Component{
    state={
        open:false
    }
    render(){
        return(
            <div style={{display:"flex", width:"calc(100% - 10px)",marginTop:5,marginBottom:5,borderRadius:5,alignItems:"center",background:"#fff"}}>
                <div
                    style={{
                        background:"#000",
                        width:50,
                        height:50,
                        borderRadius:25,
                        marginLeft:20,
                        marginRight:10,
                        marginBottom:5,
                        marginTop:5,
                    }}
                />
                <div style={{display:"flex",flexDirection:"column",height:45,justifyContent:"space-between"}}>
                    <div style={{color:"#515961"}}>Free range extra large eggs</div>
                    <div style={{fontSize:14,color:"#d4d5d8"}}>Eggstreme Egg Co</div>
                </div>
                <div style={{flex:1}}/>
                <div style={{color:"#5d1ebe",fontSize:10,marginRight:20}}>
                    2 Days
                </div>
                <div>

                </div>
            </div>
        )
    }
}

export default ItemBlock