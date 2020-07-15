import React from "react";

import {Button, Icon, Image, Item, Label, Container, Grid, Segment, Menu, Input} from 'semantic-ui-react'

class HomepageLayout extends React.Component {
    state = {activeItem: 'inbox'}

    componentDidMount() {
    }


    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state
        return (
            <Container>
                <Grid>
                    <Grid.Column width={4}>
                        <Menu vertical>
                          <Menu.Item
                                name='spam'
                                active={activeItem === 'spam'}
                                onClick={this.handleItemClick}
                            >
                                <Label>51</Label>
                                All
                            </Menu.Item>
                            <Menu.Item
                                name='inbox'
                                active={activeItem === 'inbox'}
                                onClick={this.handleItemClick}
                            >
                                <Label color='teal'>1</Label>
                                Lost
                            </Menu.Item>

                            <Menu.Item
                                name='spam'
                                active={activeItem === 'spam'}
                                onClick={this.handleItemClick}
                            >
                                <Label>51</Label>
                                Found
                            </Menu.Item>

                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Item.Group divided>
                            <Item>
                                <Item.Image src='/images/wireframe/image.png'/>

                                <Item.Content>
                                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                                    <Item.Meta>
                                        <span className='cinema'>Union Square 14</span>
                                    </Item.Meta>
                                    <Item.Description>Cool item</Item.Description>
                                    <Item.Extra>
                                        <Label>LOST</Label>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                            <Item>
                                <Item.Image src='/images/wireframe/image.png'/>

                                <Item.Content>
                                    <Item.Header as='a'>12 Years a Slave</Item.Header>
                                    <Item.Meta>
                                        <span className='cinema'>Union Square 14</span>
                                    </Item.Meta>
                                    <Item.Description>Cool item</Item.Description>
                                    <Item.Extra>
                                        <Label>FOUND</Label>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Grid.Column>

                </Grid>

            </Container>
        );
    }
}

export default HomepageLayout;
