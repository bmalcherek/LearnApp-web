import React, { Component } from 'react';
import { Button, Popconfirm } from 'antd';
import axios from 'axios';

export class MyCollectionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: {},
        };
        this.deleteCollection = this.deleteCollection.bind(this);
    }

    deleteCollection() {
        const collectionID = this.props.match.params.collectionID;
        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };

        const url = process.env.REACT_APP_API_URL + `api/my-collections/${collectionID}/`;
        axios.delete(url)
            .catch(err => console.log(err));
        this.props.history.push('/my-collections');
        window.location.reload();
    }

    componentDidMount() {
        const collectionID = this.props.match.params.collectionID;
        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };

        const url = process.env.REACT_APP_API_URL + `api/my-collections/${collectionID}/`;
        axios.get(url)
            .then(res => this.setState({
                collection: res.data,
                loading: false,
            }))
            .catch((err) => { console.log(err); });
    }

    render() {
        return (
            <div>
                <Popconfirm
                    title="Are you sure to delete this collection from your collections? You will lose all of your progress."
                    onConfirm={this.deleteCollection}>
                    <Button type="danger">Delete from My Collections</Button>
                </Popconfirm>
                <br />
                {this.state.collection.name}
            </div>
        );
    }
}

export default MyCollectionDetail;
