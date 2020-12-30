import React from 'react'
import { Grid, Header, List, Segment, Container } from 'semantic-ui-react';

// Header & Footer
//https://react.semantic-ui.com/layouts/fixed-menu
//https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/FixedMenuLayout.js

const DisburseFooter = () => (

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

        </Container>
    </Segment>

);

export default DisburseFooter