import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Menu, Container, Image, Button } from 'semantic-ui-react';
const logo = require('../images/pigeon.png');

// Header & Footer
//https://react.semantic-ui.com/layouts/fixed-menu
//https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/FixedMenuLayout.js

class DisburseHeader extends Component {

    onLoadWallet = async () => {
        await this.props.loadWallet();
    }

    render() {
        return (
            <div>
            <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
                    <Link to='/'>Disburse</Link>
                </Menu.Item>
                <Menu.Item as='a' position='right'>
                    <Button inverted={true} onClick={this.onLoadWallet}>Load Wallet</Button>
                </Menu.Item>
            </Container>
            </Menu> 
            </div>
        );}
}

export default DisburseHeader