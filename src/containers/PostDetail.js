import React from 'react';
import {Container} from "semantic-ui-react";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import axios from 'axios';
import {postContactURL, postDetailURL} from "../store/constants";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class PostDetail extends React.Component {
    state = {
        post: {},
        loader: false,
        active: false,
        contact: '',
        email: ''
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({loader: true})
        axios.get(postDetailURL(id)).then(res => {
            console.log(res.data)
            this.setState({post: res.data, loader: false})
        })
            .catch(err => {
                console.log(err)
                this.setState({loader: false})

            })
    }

    showContact = () => {
        const {id} = this.props.match.params;
        let headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        axios.post(postContactURL, {'post_id': id}, {headers: headers}).then(res => {
            console.log(res.data);
            this.setState({contact: res.data.contact, email: res.data.email})
        }).catch(err => [
            console.log(err)
        ])
    };

    handleClick = () => {
        const {active} = this.state;
        if (this.props.authenticated) {
            this.showContact();
            if (active === false) {
                this.setState({active: true})
            } else {
                this.setState({active: false})
            }
        } else {
            this.props.history.push('/login')
        }
    };

    render() {
        const {post, loader, active, contact, email} = this.state;
        if (loader) {
            return (
                <Loader active inline='centered'/>
            )
        }
        return (
            <Container>
                <Header as='h1'>{post.name}</Header>
                <Image src={`${post.image}`} size='big' centered/>
                <Header as='h3'>Description</Header>
                <p style={{'fontSize':'17px'}}>{post.description}</p>
                <Button onClick={this.handleClick} color='green'>Show contact details</Button>
                {
                    active ?
                        <div>
                            <Header></Header>
                            <Header class='h5'>Contact no. : {contact}</Header>
                            <Header class='h5'>Email : {email}</Header>
                        </div>
                        : ''
                }
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null
    };
};

export default withRouter(
    connect(
        mapStateToProps
    )(PostDetail)
);

