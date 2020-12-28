import React from 'react';
import { Link } from "react-router-dom";
import { Header, Grid, Button } from 'semantic-ui-react';
import Faq from './Faq';
 
const Home = () => {
    return (
       <div>

            <Grid textAlign='center' columns={1}>
                <Grid.Column>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Header>Unstoppable Payments</Header>
                        <p>The unstoppable way to guarantee future dated payments on ethereum!</p>
                        <Link to='/pay'>
                            <Button basic color='teal'>Launch App</Button>
                        </Link>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Faq />
                </Grid.Column>
            </Grid>

       </div>
    );
}
 
export default Home;