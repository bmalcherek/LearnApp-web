import React, { Component } from "react";
import { Card, Button, Popconfirm, Rate } from "antd";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import QuestionList from "./QuestionList";

export class CollectionDetail extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      collection: {},
      deleted: false
    };
    this.handleCollectionDelete = this.handleCollectionDelete.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  componentDidMount() {
    const { match } = this.params;
    const { collectionID } = match.params;

    const token = localStorage.getItem("token");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    const url = `${process.env.REACT_APP_API_URL}api/collections/${collectionID}`;
    axios
      .get(url)
      .then(res =>
        this.setState({
          collection: res.data,
          loaded: true
        })
      )
      .catch(err => {
        console.log(err);
      });
  }

  handleCollectionDelete() {
    const { match } = this.props;
    const { collectionID } = match.params;
    const token = localStorage.getItem("token");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    const url = `${process.env.REACT_APP_API_URL}api/collections/${collectionID}/`;
    axios.delete(url);
    this.setState({
      deleted: true
    });
  }

  changeRating(event) {
    const { match } = this.props;
    const { collectionID } = match.params;
    const data = {
      rating: event
    };

    const url = `${process.env.REACT_APP_API_URL}api/collections/${collectionID}/rate/`;
    axios.put(url, data);
  }

  render() {
    const { loaded, deleted, collection } = this.state;
    const { match } = this.props;
    let redirect;

    if (deleted) {
      redirect = <Redirect to="/collections" />;
    } else {
      redirect = null;
    }

    let rate = null;
    if (loaded) {
      rate = (
        <div>
          <Rate
            defaultValue={collection.rating}
            onChange={this.changeRating}
            count={10}
          />
          Votes:
          {collection.ratings_count}
        </div>
      );
    }

    return (
      <div>
        <Link to={`${match.params.collectionID}/edit-collection`}>
          <Button>Edit Collection</Button>
        </Link>

        <Popconfirm
          title="Are you sure delete this collection? It will automatically delete all the questions inside this collection."
          onConfirm={this.handleCollectionDelete}
        >
          <Button type="danger">Delete Collection</Button>
        </Popconfirm>

        <Card title={collection.name}>
          {rate}
          {/* <p>Lorem ipsum</p> */}
        </Card>
        <br />
        <Link to={`${match.params.collectionID}/create-new-question`}>
          <Button>Create new question</Button>
        </Link>
        <QuestionList collectionID={match.params.collectionID} />
        {redirect}
      </div>
    );
  }
}

export default CollectionDetail;
