import React, { Component } from 'react'
import { Form, Container, Grid, Header, Message } from 'semantic-ui-react'
import DisburseHeader from './Header';
import DisburseFooter from './Footer';
import validator from 'validator';
import emailjs from 'emailjs-com';

class Contact extends Component {
    
    state = {
        firstname: '',
        lastname: '',
        email: '',
        subject: '',
        message: '',
        successMessage: '',
        errorMessage: '',
        loading: false
    }

    validate = () => {

        var valid = true;

        // Clear previous error message
        this.setState({errorMessage: ''});

        if (validator.isEmpty(this.state.firstname) ||
            validator.isEmpty(this.state.email) ||
            validator.isEmpty(this.state.message)){
            
            valid = false;
            this.setState({errorMessage: 'Please complete all form fields.'});
            console.log('error length: ' + this.state.errorMessage.length)
        }

        return valid;
    }

    sendEmail = (e) => {
        
        e.preventDefault();

        if (this.validate()){

            var SERVICE_ID = 'disburse.service.id';
            var TEMPLATE_ID = 'disburse.template.id';
            var USER_ID = 'user_JcaegEb4fI3fqPHumIaxG';
        
            // These parameters are found in the template
            let templateParams = {
                subject: this.state.subject,
                name: 'Name: ' + this.state.firstname + ' ' + this.state.lastname,
                email: 'From: ' + this.state.email,
                message: this.state.message,
            }

            emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                USER_ID
            )

            this.setState({ successMessage: 'Thank you, your message has been received.' });  

            this.resetForm();
        }
    }

    displayError() {       
        if (this.state.errorMessage.length > 0) {
            return (<Message error header="Oops!" content={this.state.errorMessage} />);
        }
    }

    displaySuccess() {     

        if (this.state.successMessage.length > 0) {
            return (<Message positive header="Message Sent" content={this.state.successMessage} />);
        }
    }

    resetForm() {
        this.setState({
          firstname: '',
          lastname: '',
          email: '',
          subject: '',
          message: '',
        })
    }

    componentDidMount = async () => {}

    render() {
        return (
        <div>
            <DisburseHeader loadWallet = {this.callbackLoadWallet}/>
            <Container style={{ marginTop: '4em' }}>
            <br />
            <br />
            {this.displayError()}
            {this.displaySuccess()}
            <Grid textAlign='left' columns={1}>
                <Grid.Column>  
                    <Header size='medium'>Contact Us</Header>
                </Grid.Column>
            </Grid>
            <Grid textAlign='left' columns={1}>
                <Grid.Column>  

                    <Form onSubmit={this.sendEmail}>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='First name' placeholder='First name' onChange={event => this.setState({firstname: event.target.value})} />
                            <Form.Input fluid label='Last name' placeholder='Last name' onChange={event => this.setState({lastname: event.target.value})} />
                        </Form.Group>
                        <Form.Input type="email" fluid label='Email' placeholder='Email' onChange={event => this.setState({email: event.target.value})} />
                        <Form.Input fluid label='Subject' placeholder='Subject' onChange={event => this.setState({subject: event.target.value})} />
                        <Form.TextArea name="message" label='Message' placeholder='Please let us know what is on your mind...' onChange={event => this.setState({message: event.target.value})} />
                        <Form.Button primary>Submit</Form.Button>
                    </Form>

                </Grid.Column>
            </Grid>     

            </Container>
            <DisburseFooter />
        </div>);
    }
}

export default Contact;
