/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react'
import { Link } from "react-router-dom";

const logo = require('../images/pigeon.png');

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Unstoppable Payments'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='The unstoppable way to guarantee future dated payments'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Link to='/pay'>
        <Button primary size='huge'>
        Get Started
        <Icon name='right arrow' />
        </Button>
    </Link>    
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Link to='/'>
                    <Menu.Item as='a' active>
                        Disburse
                    </Menu.Item>
                </Link>
                <Menu.Item position='right'>
                    <Link to='/pay'>
                        <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                            Launch App
                        </Button>
                    </Link>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Link to='/'>
              <Menu.Item as='a' active>
                Disburse
              </Menu.Item>
            </Link>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Link to='/pay'>
                      <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                        Launch App
                      </Button>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          The Problem
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          There are times when we need to promise a recipient to pay them at a specified 
          date in the future.  Unfortunately, a promise is often not a sufficient 
          guarantee, especially to recipients we do not know.  Ensuring that a promise of future 
          payment is guranteed and unstoppable is the problem that Disburse solves.
        </p>

        <br />
        <Divider />
        <br />

        <Header as='h3' style={{ fontSize: '2em' }}>
          Unstoppable Future Settlement
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Blockchain technology is able to elegantly settle transactions in near real time.  Unfortunately,
          sometimes we need to settle a transaction at a specified date in the future, with the same
          guarantees that instant settlements have.  The Disburse application makes this possible.
        </p>

        <br />
        <Divider />
        <br />

        <Header as='h3' style={{ fontSize: '2em' }}>
          Our Promise
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Once a recipient receives a future dated payment, they are guaranteed to
          receive the promised funds. Once the disburesement date passes, the promised funds are 
          delivered to the recipient. For the first time, recipients have 100% assurance that 
          payment promises will always be kept.
        </p>

      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
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
          </Grid.Row>
        </Grid>

        <Divider inverted section />
        <Image centered size='mini' src={logo} />

      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout;