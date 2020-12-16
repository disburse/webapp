import React, { Component } from 'react';
import { Form, Grid, Header } from 'semantic-ui-react'

class About extends Component {

   //state = {}

   //handleChange = (e, { value }) => this.setState({ value })
    
   render() {
      //const { value } = this.state
      return (

         <Grid textAlign='left' columns={3}>
                <Grid.Row>
                    <Grid.Column></Grid.Column>
                    <Grid.Column></Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column></Grid.Column>
                    <Grid.Column>

                     <Form>
                        <Header size='medium'>Have a Question?</Header>
                        <Form.Group widths='equal'>
                           <Form.Input fluid label='First name' placeholder='First name' />
                           <Form.Input fluid label='Last name' placeholder='Last name' />
                        </Form.Group>
                        <Form.TextArea label='About' placeholder='Tell us more about you...' />
                        <Form.Button primary>Submit</Form.Button>
                     </Form>

                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
         </Grid>

      )
    }
}

export default About;
