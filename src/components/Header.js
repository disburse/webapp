import React from 'react'
import { Menu, Container } from 'semantic-ui-react';

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