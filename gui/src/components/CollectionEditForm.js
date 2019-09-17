import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import axios from 'axios';

export class CollectionEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            collectionName: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const name = this.state.collectionName;

        const collection = {
            name,
        };

        const collectionID = this.props.match.params.collectionID;
        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };

        if (this.props.edit) {
            const url = process.env.REACT_APP_API_URL + `api/collections/${collectionID}/`;
            axios.put(url, collection)
                .then(res => this.redirect(res));
        } else {
            const url = process.env.REACT_APP_API_URL + 'api/collections/';
            axios.post(url, collection)
                .then(res => this.redirect(res));
        }
    }

    redirect(res) {
        this.props.history.push(`/collections/${res.data.id}`)
    }

    componentDidMount() {
        if (this.props.edit) {
            const collectionID = this.props.match.params.collectionID;
            const token = localStorage.getItem('token');
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            };

            const url = process.env.REACT_APP_API_URL + `api/collections/${collectionID}`;
            axios.get(url)
                .then(res => this.setState({
                    collectionName: res.data.name,
                }))
                .catch((err) => { console.log(err); });
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Item label="Collection Name">
                        <Input name="collectionName" placeholder="Name" value={this.state.collectionName} onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default CollectionEditForm;
