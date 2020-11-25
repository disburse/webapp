import React, { Component } from 'react';
import { Button, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Disburse extends Component {

    state = {
        message: '',
        errorMessage: 'default error',
        loading: false
    }

    //constructor(props){
    //    super(props);
    //}

    // Event handler with async to be able to call ethereum
    onClick = async (event) => {

        // This prevents form from being submitted to the server
        event.preventDefault();
        this.setState({loading: true});

        try {
            // perform some work
            this.setState({ message: "Button clicked!" });
        }
        catch(err)
        {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});
    };

    render() {
        return (
        <div>
            <Button loading={this.state.loading} primary onClick={this.onClick}>Save</Button>
            <Message header="" content={this.state.message}/>
            <Message error header="Oops!" content={this.state.errorMessage} />
        </div>
            // Retrieve the value of a state variable
            //value = {this.state.variableName}

            // Set the value of a state variable on a form element
            //onChange = {event => this.setState({variableName: event.target.value})}
        );
    }
}

export default Disburse;
