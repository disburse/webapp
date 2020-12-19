import React from 'react'
import { Menu, Container } from 'semantic-ui-react';

// Header & Footer
//https://react.semantic-ui.com/layouts/fixed-menu
//https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/FixedMenuLayout.js

const DisburseHeader = () => (
    <div>
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>Disburse.Finance</Menu.Item>
                <Menu.Item as='a'>Home</Menu.Item>
                <Menu.Item as='a'>About</Menu.Item>
            </Container>
        </Menu>
    </div>
);

export default DisburseHeader