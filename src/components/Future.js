import React, { Component } from 'react';
import { Grid, Header, Container, Divider, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import FutureBuy from './FutureBuy';
import FutureSell from './FutureSell';
import FutureBuyList from './FutureBuyList';
import FutureSellList from './FutureSellList';
import DisburseHeader from './Header';
import DisburseFooter from './Footer';

class Future extends Component {

    state = {
        errorMessage: ''
    } 

    // The constructor for a React component is called before it is mounted. When implementing 
    // the constructor for a React.Component subclass, you should call super(props) before any 
    // other statement. Otherwise, this.props will be undefined in the constructor, which can 
    // lead to bugs.
    //constructor(props){
    //    super(props);
    //}

    componentDidMount = async () => {        
        
    }

    displayError() {
        if (this.state.errorMessage.length > 0) {
            return (<Message error header="Oops!" content={this.state.errorMessage} />);
        }
    }

    render() {
        return (
        <div>
            <DisburseHeader loadWallet = {this.callbackLoadWallet}/>
            <Container style={{ marginTop: '4em' }}>
            <Grid textAlign='left' columns={1}>
                <Grid.Column>  
                    <Divider horizontal>
                    Testing In-Progress: Goerli Testnet Network
                    </Divider>
                    {this.displayError()}
                </Grid.Column>
            </Grid>
            <Grid textAlign='left' columns={1}>
                <Grid.Column>  
                    <Header size='medium'>Future Contracts</Header>
                </Grid.Column>
            </Grid>
            <Grid textAlign='left' columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <FutureBuy />
                    </Grid.Column>
                    <Grid.Column>
                        <FutureSell />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <br />
            <br />
            <br />
            <Grid textAlign='left' columns={1}>
                <Grid.Row>
                    <Grid.Column>
                        <Header size='medium'>Available Future Contracts</Header>
                        <br />
                        <FutureBuyList />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <br />
            <br />
            <br />
            <Grid textAlign='left' columns={1}>
                <Grid.Row> 
                    <Grid.Column>
                       <FutureSellList />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </Container>
            <DisburseFooter />
        </div>
        );
    }
}

export default Future;