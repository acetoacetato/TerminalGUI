import React, { Component } from 'react'
import TerminalInput from './terminal-input'
import Cookies from 'universal-cookie'
import { trackPromise } from 'react-promise-tracker';
import styled from 'styled-components'

const cookies = new Cookies();

const Pre = styled.pre`
    color: green;
    text-align: left;
`


class TerminalWrapper extends Component{
    constructor(props){
        super(props);
        this.state = {loaded: false}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.callApi = this.callApi.bind(this);
        this.displayData = []
    }

    componentDidMount(){
        this.callApi();
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
                    this.setState({ apiResponse: res.message, loaded: true, path: res.path });
                    if(cookies.get('sessid') === 'undefined')
                        cookies.set('sessid', res.sessid, {maxAge : 60 * 60 * 24 * 365});
                })
        );
    }

    getPath(){
        console.log(this.state.path)
        return this.state.path;
    }

    handleSubmit(data){
        //alert(data);
        console.log(data)
        this.displayData.push(<Pre className="terminal-output-line" key={new Date().getTime() + 'i'}> {data.command} </Pre>);
        this.displayData.push(<Pre className="terminal-output-line" key={new Date().getTime() + 'o'}> {data.output} </Pre>);
        this.setState({showData: this.displayData, postVal: ""})
    }

    render(){
        if(this.state.loaded){
            console.log(this.state.path);
            return(
                <div className="terminal-container terminal-container-main">
                    <div className="terminal-holder">
                        <div className="terminal-content">
                            <div className="terminal-input-area">
                                {this.displayData}
                            </div>
                            <TerminalInput resultado={this.handleSubmit} path={this.state.path}/>
                        </div>
                    </div>
                    
                </div>
            );
        } else{
            return (
                <div >
                  <i className="fas fa-spinner fa-spin"> </i> cargando
                </div>)
        }
        
    }

}

export default TerminalWrapper;