import React from 'react'
import { Link } from "react-router-dom";
import { Menu, Container } from 'semantic-ui-react';

// Header & Footer
//https://react.semantic-ui.com/layouts/fixed-menu
//https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/FixedMenuLayout.js

const DisburseHeader = () => (
    <div>
        <Menu fixed='top' inverted>
            <Container>
                <Link to='/'>
                    <Menu.Item header>Disburse.Finance</Menu.Item>
                </Link>
                <Link to='/pay'>
                    <Menu.Item>Launch App</Menu.Item>
                </Link>         
            </Container>
        </Menu>
    </div>
);

export default DisburseHeader