import React, { Component } from 'react'

export default class Ad extends Component {
    constructor(props) {
        super(props);
        this.state = {pocitadlo: 0, link: '', obrazok: ''}
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:8000/ad', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState(data);
            });
    }

    clickedAd(state) {
        console.log("ad clicked");
        console.log(state);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
          };
        fetch('http://localhost:8000/adP', requestOptions).then( res => {
            if (res.status === 200){
                var poc = this.state.pocitadlo + 1;
                this.setState(() => {
                    return {pocitadlo:poc+1}
                })
            } else {
                console.log("Something went wrong while updating clicks")
            }
        })
        
    }
    render() {
        return (
            <div>
                <h1>Dakujeme za objednavku</h1>
                <a href={this.state.link} onClick={() => this.clickedAd(this.state)} target="_blank">
                    <img src={this.state.obrazok} alt="Ad" />
                </a> 
                <p>Pocitadlo: {this.state.pocitadlo}</p>
            </div>
        )    
    }
}
