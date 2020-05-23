import React, { Component } from 'react'
import Cookies from 'universal-cookie'
const cookies = new Cookies();
class Terminal extends Component {
    constructor(props, context){
        super(props, context);
        this.callApi = this.callApi.bind(this);
        this.state = {apiResponse : "" };
    }

    async callApi(){
        var data = {
            method: 'POST', 
            mode: 'cors', 
            //credentials : 'same-origin', 
            //headers : { 'Allow-Origin': '*' }, 
            body: JSON.stringify({sessid: cookies.get('sessid')}),
            headers:{
                'Content-Type': 'application/json'
            }
        };
        await fetch("http://157.245.241.100:9000/terminal/cookie", data)
            .then(res=>res.json())
            .then(res => { 
                console.log(res);
                this.setState({ apiResponse: res.message });
                
                cookies.set('sessid', res.sessid, {path: '/'});
                console.log(cookies.get('sessid'));

            })
    }

    componentWillMount(){
        this.callApi();
    }

    render(){
        return (
            <div className="Terminal">
                { this.state.apiResponse }
            </div>
        );
    }
}


export default Terminal;