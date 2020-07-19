import React from 'react';
import {Container} from "semantic-ui-react";
import Image from "semantic-ui-react/dist/commonjs/elements/Image";
import axios from 'axios';
import {postDetailURL} from "../store/constants";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import {authLogin, logout} from "../store/actions/auth";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class PostDetail extends React.Component {
    state = {
        post: {},
        loader: false,
        active: false
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

    handleClick = () => {
        const {active} = this.state;
        if (this.props.authenticated) {
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
        const {post, loader, active} = this.state;
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
                <p>{post.description}</p>
                <Button onClick={this.handleClick} color='green'>Show contact</Button>
                {
                    active ? <Header class='h5'>Contact no. : 9671444861</Header> : ''
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

