import React, { Component } from "react";

import Board from './Board';
import TraitHand from './TraitHand';
import PlagueCard from './PlagueCard';
import CountryDraftZone from './CountryDraftZone';

var w = window.innerWidth;
var h = window.innerHeight;

class GameView extends Component{

    render() {
        var board = "orangebacteria";
        if(this.props.player.plague){
            board = this.props.player.plague.color.toLowerCase() + this.props.player.plague.diseaseType.toLowerCase();
        }
        return(
            <React.Fragment>{
                <div className="gameView" height={h} width={w}>
                    <div>
                        <CountryDraftZone state={this.props.state}/>
                    </div>
                    <div>
                        <Board state={this.props.state}/>
                    </div>
                    <div className="bottomBar">
                        <span className="plagueCard"><PlagueCard cardName={board}/></span><span className="hand"><TraitHand hand={this.props.player.hand}/></span>    
                    </div>
                </div> 
                }
            </React.Fragment>
        )
    }
}

export default GameView;