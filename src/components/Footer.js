import React, { Component } from 'react';
import { Grid, Header, List, Segment, Container, Divider, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";
const logo = require('../images/pigeon.png');

// Header & Footer
//https://react.semantic-ui.com/layouts/fixed-menu
//https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/FixedMenuLayout.js

class DisburseFooter extends Component {

    render() {
        return (
            <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
                <Container textAlign='center'>
                    <Grid divided inverted stackable>
                        <Grid.Column width={3}>
                        <Header inverted as='h4' content='Developers' />
                        <List link inverted>
                            <a href="https://github.com/disburse">
                                <List.Item as='a'>GitHub</List.Item>
                            </a>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        <Header inverted as='h4' content='Community' />
                        <List link inverted>
                            <Link to='/contact'>
                                <List.Item>Contact Us</List.Item>
                            </Link>
                            <a href="https://twitter.com/DisburseHQ">
                                <List.Item as='a'>Twitter</List.Item>
                            </a>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={10}>
                        <Header inverted as='h4' content='Disburse' />
                            <p>The unstoppable way to guarantee future dated payments on ethereum!</p>
                        </Grid.Column>
                    </Grid>

                    <Divider inverted section />
                    <Image centered size='mini' src={logo} />

                </Container>
            </Segment>

        );
    }
}

export default DisburseFooter