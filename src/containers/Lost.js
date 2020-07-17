import React from 'react';
import {Container} from "semantic-ui-react";
import {Button, Checkbox, Form, TextArea} from 'semantic-ui-react'
import axios from "axios";
import {postListURL, postLostURL} from "../store/constants";

class Lost extends React.Component {
    state = {
        name: '',
        description: '',
        image: ''
    };

    componentDidMount() {
    }

    submit = () => {
        const {name, description, image} = this.state;
        let form_data = new FormData();
        form_data.append('name', name);
        form_data.append('description', description);
        form_data.append('image', image, image.name);
        form_data.append('type', 'lost');
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };

        axios.post(postLostURL, form_data, {headers: headers}).then(res => {
            console.log(res.data)
            // this.setState({posts: res.data})
        })
            .catch(err => {
                console.log(err)
            })
    };

    handleChange = (e) => {
        this.setState(({[e.target.name]: e.target.value}))
    };

    handleImage = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    render() {
        return (
            <Container style={{'width': '40%'}}>
                <Form onSubmit={this.submit}>
                    <Form.Field>
                        <label>Title</label>
                        <input name='name' onChange={this.handleChange} placeholder='Title' required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <TextArea name='description' onChange={this.handleChange} placeholder='Description' required/>
                    </Form.Field>
                    <Form.Field>
                        <label>Image</label>
                        <input type='file' name='image' onChange={this.handleImage} required/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        )
    }
}

export default Lost