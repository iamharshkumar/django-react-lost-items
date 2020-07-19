import React from 'react';
import {Container, Item, Label} from "semantic-ui-react";
import {Grid, Menu, Segment, Button, Checkbox, Form} from 'semantic-ui-react'
import axios from "axios";
import {postListURL, userPostsURL, userProfileURL} from "../store/constants";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import {URL} from "../store/constants";

class Profile extends React.Component {
    state = {
        activeItem: 'Profile',
        posts: [],
        loader: false,
        userProfile: {}
    };

    componentDidMount() {
        this.loadUserProfile()
    }

    loadUserPosts = () => {
        const {activeItem} = this.state;
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };

        this.setState({loader: true})
        axios.post(userPostsURL, {'type': activeItem}, {headers: headers}).then(res => {
            this.setState({loader: false, posts: res.data})
        })
            .catch(err => {
                console.log(err)
                this.setState({loader: false})
            })
    }

    loadUserProfile = () => {
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };

        this.setState({loader: true})
        axios.get(userProfileURL, {headers: headers}).then(res => {
            this.setState({loader: false, userProfile: res.data})
        })
            .catch(err => {
                console.log(err)
                this.setState({loader: false})
            })
    };

    handleItemClick = (e, {name}) => {
        setTimeout(() => {
            this.setState({activeItem: name});
            this.loadUserPosts()
        }, 1);
    };

    render() {
        const {activeItem, posts, loader, userProfile} = this.state
        if (loader) {
            return (
                <Loader active inline='centered'/>
            )
        }
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
                                    <input value={userProfile.username}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Email</label>
                                    <input value={userProfile.email}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Phone number</label>
                                    <input value={userProfile.contact}/>
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
                                                        <Item.Image src={`${URL}${post.image}`}/>

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
                                                        <Item.Image src={`${URL}${post.image}`}/>

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