import React from 'react';
import {Container} from "semantic-ui-react";
import {Button, Checkbox, Form, TextArea} from 'semantic-ui-react'

class Found extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <Container style={{'width': '40%'}}>
                <Form>
                    <Form.Field>
                        <label>Title</label>
                        <input placeholder='Title'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <TextArea placeholder='Description'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Image</label>
                        <input type='file' placeholder='Title'/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        )
    }
}

export default Found