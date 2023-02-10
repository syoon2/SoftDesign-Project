import React, { Component } from "react";
import CountryCard from "./CountryCard";

class BoardCountrySlot extends Component{

    render() {
        return(
            <React.Fragment>{
                <div>
                    <CountryCard cardName={this.props.name}/>
                </div>   
    }       </React.Fragment>
        )
    }
}

export default BoardCountrySlot;