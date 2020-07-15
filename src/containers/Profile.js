import React from 'react';
import {Container} from "semantic-ui-react";
import {Grid, Menu, Segment} from 'semantic-ui-react'

class Profile extends React.Component {
    componentDidMount() {

    }

    state = {activeItem: 'Profile'}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state
        return (
            <Container>
                <Grid>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            <Menu.Item
                                name='Profile'
                                active={activeItem === 'Profile'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Pending Post'
                                active={activeItem === 'Pending Post'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Active Post'
                                active={activeItem === 'Active Post'}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={12}>
                        {
                            activeItem === 'Profile' ? <Segment>
                                This is an stretched grid column. This segment will always match the
                                tab height
                            </Segment> : null
                        }
                        {
                            activeItem === 'Pending Post' ? <Segment>
                                pending
                            </Segment> : null
                        }
                        {
                            activeItem === 'Active Post' ? <Segment>
                                active
                            </Segment> : null
                        }
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default Profile;