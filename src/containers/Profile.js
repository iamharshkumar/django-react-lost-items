import React from 'react';
import {Container, Item, Label} from "semantic-ui-react";
import {Grid, Menu, Segment, Button, Checkbox, Form} from 'semantic-ui-react'
import axios from "axios";
import {postListURL} from "../store/constants";

class Profile extends React.Component {
    state = {
        activeItem: 'Profile',
        posts: []
    };

    componentDidMount() {
        axios.get(postListURL).then(res => {
            this.setState({posts: res.data})
        })
            .catch(err => {
                console.log(err)
            })
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem, posts} = this.state

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

                    <Grid.Column stretched width={8}>
                        {
                            activeItem === 'Profile' ? <Form>
                                <Form.Field>
                                    <label> Username</label>
                                    <input/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Email</label>
                                    <input/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Phone number</label>
                                    <input/>
                                </Form.Field>
                                <Button type='submit'>Save</Button>
                            </Form> : null
                        }
                        {
                            activeItem === 'Pending Post' ? <Grid>
                                <Grid.Column width={8}>
                                    <Item.Group divided>
                                        {
                                            posts.map(post => {
                                                return (
                                                    <Item>
                                                        <Item.Image src={`${post.image}`}/>

                                                        <Item.Content>
                                                            <Item.Header as='a'>{post.name}</Item.Header>
                                                            <Item.Meta>
                                                                <span className='cinema'>{post.timestamp}</span>
                                                            </Item.Meta>
                                                            <Item.Description>{post.description}</Item.Description>
                                                            <Item.Extra>
                                                                <Label>{post.type}</Label>
                                                            </Item.Extra>
                                                        </Item.Content>
                                                    </Item>
                                                )
                                            })
                                        }

                                    </Item.Group>
                                </Grid.Column>

                            </Grid> : null
                        }
                        {
                            activeItem === 'Active Post' ? <Grid>
                                <Grid.Column width={8}>
                                    <Item.Group divided>
                                        {
                                            posts.map(post => {
                                                return (
                                                    <Item>
                                                        <Item.Image src={`${post.image}`}/>

                                                        <Item.Content>
                                                            <Item.Header as='a'>{post.name}</Item.Header>
                                                            <Item.Meta>
                                                                <span className='cinema'>{post.timestamp}</span>
                                                            </Item.Meta>
                                                            <Item.Description>{post.description}</Item.Description>
                                                            <Item.Extra>
                                                                <Label>{post.type}</Label>
                                                            </Item.Extra>
                                                        </Item.Content>
                                                    </Item>
                                                )
                                            })
                                        }

                                    </Item.Group>
                                </Grid.Column>

                            </Grid> : null
                        }
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default Profile;