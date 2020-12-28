import React from 'react'
import { Grid, Header, List, Segment, Container, Divider } from 'semantic-ui-react';

// Header & Footer
//https://react.semantic-ui.com/layouts/fixed-menu
//https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/FixedMenuLayout.js

const DisburseFooter = () => (

    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign='center'>
            <Grid divided inverted stackable>
                <Grid.Column width={3}>
                <Header inverted as='h4' content='Group 1' />
                <List link inverted>
                    <List.Item as='a'>Link One</List.Item>
                    <List.Item as='a'>Link Two</List.Item>
                    <List.Item as='a'>Link Three</List.Item>
                </List>
                </Grid.Column>
                <Grid.Column width={3}>
                <Header inverted as='h4' content='Group 2' />
                <List link inverted>
                    <List.Item as='a'>Link One</List.Item>
                    <List.Item as='a'>Link Two</List.Item>
                    <List.Item as='a'>Link Three</List.Item>
                </List>
                </Grid.Column>
                <Grid.Column width={10}>
                <Header inverted as='h4' content='Footer Header' />
               <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </Grid.Column>
            </Grid>

            <Divider inverted section />

            <List horizontal inverted divided link size='small'>
                <List.Item as='a' href='#'>Site Map</List.Item>
                <List.Item as='a' href='#'>Contact Us</List.Item>
                <List.Item as='a' href='#'>Terms and Conditions</List.Item>
                <List.Item as='a' href='#'>Privacy Policy</List.Item>
            </List>
        </Container>
    </Segment>

);

export default DisburseFooter