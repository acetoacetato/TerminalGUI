import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import { trackPromise } from 'react-promise-tracker';
const cookies = new Cookies();





class Terminal extends Component {
    constructor(props, context){
        super(props, context);
        this.callApi = this.callApi.bind(this);
        this.state = {apiResponse : "", loaded: false };
    }

    async callApi(){
        var data = {
            method: 'POST', 
            mode: 'cors', 
            body: JSON.stringify({sessid: cookies.get('sessid')}),
            headers:{
                'Content-Type': 'application/json'
            }
        };
        trackPromise( 
            fetch("http://157.245.241.100:9000/terminal/cookie", data)
                .then(res=>res.json())
                .then(res => { 
                    console.log(res);
                    this.setState({ apiResponse: res.message, loaded: true });
                    if(cookies.get('sessid') === 'undefined')
                        cookies.set('sessid', res.sessid, {maxAge : 60 * 60 * 24 * 365});
                    console.log(cookies.get('sessid'));


                })
        );
    }

    componentDidMount(){
        this.callApi();
    }

    render(){
        console.log(cookies.getAll())
        if(this.state.loaded === true) {
            return (
                <div className="Terminal">
                    { this.state.apiResponse }
                </div>
            );
        } else{
            return <div className="Terminal">
                  <i className="fas fa-spinner fa-spin"> </i> cargando
            </div>
        }
    }
}


export default Terminal;