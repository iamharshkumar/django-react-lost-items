import React from "react";
import axios from 'axios';

import {Button, Icon, Image, Item, Label, Container, Grid, Segment, Menu, Input} from 'semantic-ui-react'
import {postListURL, URL} from "../store/constants";

class HomepageLayout extends React.Component {
    state = {
        activeItem: 'all',
        posts: [],
        all_count: 0,
        lost_count: 0,
        found_count: 0
    };

    componentDidMount() {
        this.loadPost()
    }

    loadPost = () => {
        const {activeItem} = this.state;
        axios.post(postListURL, {'type': activeItem}).then(res => {
            this.setState({
                posts: res.data.posts,
                all_count: res.data.all_count,
                lost_count: res.data.lost_count,
                found_count: res.data.found_count
            })
        })
            .catch(err => {
                console.log(err)
            })
    };


    handleItemClick = (e, {name}) => {
        setTimeout(() => {
            this.setState({activeItem: name});
            this.loadPost()
        }, 1);
    };

    render() {
        const {activeItem, posts, all_count, lost_count, found_count} = this.state
        return (
            <Container>
                <Grid>
                    <Grid.Column width={4}>
                        <Menu vertical>
                            <Menu.Item
                                name='all'
                                active={activeItem === 'all'}
                                onClick={this.handleItemClick}
                            >
                                <Label>{all_count}</Label>
                                All
                            </Menu.Item>
                            <Menu.Item
                                name='lost'
                                active={activeItem === 'lost'}
                                onClick={this.handleItemClick}
                            >
                                <Label color='teal'>{lost_count}</Label>
                                Lost
                            </Menu.Item>

                            <Menu.Item
                                name='found'
                                active={activeItem === 'found'}
                                onClick={this.handleItemClick}
                            >
                                <Label>{found_count}</Label>
                                Found
                            </Menu.Item>

                        </Menu>
                    </Grid.Column>
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

                </Grid>

            </Container>
        );
    }
}

export default HomepageLayout;
