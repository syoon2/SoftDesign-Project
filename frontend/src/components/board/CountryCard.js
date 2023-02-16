import React, { Component } from "react";
import Dice from 'react-dice-roll';

class CountryCard extends Component{
    state = {
        dice: null
    }

    async afterRoll(val) {
        await new Promise(r => setTimeout(r, 2000));
        this.setState((prevState) => {
            return {
                dice: null
            }
        })
    };

    render() {
        // 2 slot countries:
        // greenland, iceland, libya, panama
        const cardName = this.props.country.countryName;
        
        var countrySlots = [null, 
                            null,
                            //2 slot country 
                            [
                                {top:'22%', left:'16.5%'},
                                {top:'61.5%', left:'66.0%'}
                            ],
                            //3 slot country
                            [
                                {top:'22%', left:'40.5%'},
                                {top:'61.5%', left:'15.5%'},
                                {top:'61.5%', left:'64.0%'}
                            ],
                            //4 slot country
                            [
                                {top:'20%', left:'15.5%'},
                                {top:'20%', left:'66%'},
                                {top:'61.0%', left:'16%'},
                                {top:'60.5%', left:'66.0%'}
                            ],
                            //5 slot country
                            [
                                {top:'20%', left:'24.5%'},
                                {top:'20%', left:'57%'},
                                {top:'60.0%', left:'7%'},
                                {top:'60.0%', left:'40%'},
                                {top:'60.0%', left:'74.0%'}
                            ],
                            //6 slot country
                            [
                                {top:'21%', left:'8%'},
                                {top:'21%', left:'40.5%'},
                                {top:'21%', left:'75%'},
                                {top:'60.5%', left:'7.5%'},
                                {top:'60.5%', left:'40.5%'},
                                {top:'60.5%', left:'74.5%'}
                            ],
                            //7 slot country
                            [
                                {top:'20.5%', left:'25%'},
                                {top:'21%', left:'57%'},
                                {top:'40%', left:'9%'},
                                {top:'40%', left:'72.5%'},
                                {top:'60%', left:'8.5%'},
                                {top:'60%', left:'41.5%'},
                                {top:'60%', left:'72.5%'}
                            ],
                            //8 slot country
                            [
                                {top:'21%', left:'8%'},
                                {top:'21.5%', left:'42%'},
                                {top:'21%', left:'75%'},
                                {top:'41%', left:'7.5%'},
                                {top:'41.5%', left:'74.5%'},
                                {top:'61.%', left:'7%'},
                                {top:'61%', left:'41.5%'},
                                {top:'61%', left:'75%'}
                            ]
                           ];
        
        var hexagons = [];
        const colors = {
            RED: "red",
            BLUE: "blue",
            YELLOW: "yellow",
            PURPLE: "purple",

        }

        for(let i = 0; i < this.props.country.cities.length; i++){
            var color = this.props.country.cities[i];
            var background = color === "EMPTY" ? {} : {backgroundImage: "url(/plague_tokens/token_" + colors[color] + ".png)"};
            hexagons.push(<div style={{...countrySlots[this.props.country.cities.length][i], ...background}}  className="hexagon"/>)
        }
        

        let click = () => {
            switch(this.props.state.game.playState){
                case "INFECT":
                    this.props.infect(this.props.country.countryName);
                    break;
                case "DEATH":
                    this.props.kill(this.props.country.countryName).then(resp => {
                        if(resp.ok){
                            resp.text().then((text) => {
                                this.setState((prevState) => {
                                    return {
                                        dice: <Dice cheatValue={parseInt(text)} onRoll={this.afterRoll}/>
                                    };
                                }, () => {
                                    this.state.dice.rollDice();
                                });
                            });
                        }
                    });
                    break;
            }
            
        }

        let renderDice = () => {
            if(this.state.dice != null){
                return this.state.dice;
            }
        }

        return(
            <React.Fragment>{
                <div onClick={click}>
                    <img src={`/countries/${cardName}.png`} className="card" alt="img"/>
                    {renderDice()}
                    {hexagons}
                    </div>
            
            }       
            </React.Fragment>
        )


    }
}

export default CountryCard;