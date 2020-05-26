import React, { Component } from 'react'
import styled from 'styled-components'
import { trackPromise } from 'react-promise-tracker';
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Input = styled.input`
            background-color: black; 
            color: green;
        `;

const Form = styled.form`
        background-color: black;
        color: green;
        float: left;
    `;

class TerminalInput extends Component{

    constructor(props){
        super(props);
        this.state = {value: '', path: props.path};
        this.funcion = props.resultado;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        this.setState({value: event.target.value});
    }

    

    handleSubmit(event){
        let input = this.state.value;
        this.setState({value: ''});
        var data = {
            method: 'POST', 
            mode: 'cors', 
            body: JSON.stringify({sessid: cookies.get('sessid'), comando: input}),
            headers:{
                'Content-Type': 'application/json'
            }
        };
        //TODO: mandar comando a la terminal
        fetch("http://157.245.241.100:9000/terminal/terminal", data)
            .then(res=>res.json())
            .then(res => { 
                this.setState({value: '', path: res.path})
                this.funcion({command: input, output: res.message});
                //event.preventDefault();
            })

        event.preventDefault();
        
    }

    render(){
        return(
            trackPromise && 
                (<Form onSubmit={this.handleSubmit}>
                    <span className="terminal-prompt">
                        {this.state.path + ' >'}
                    </span>
                    <Input type="text" className="terminal-main-input" value={this.state.value} onChange={this.handleChange} tabIndex="-1" />   
                </Form>)
        );
    }

}

export default TerminalInput;