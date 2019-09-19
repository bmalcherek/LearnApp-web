import React, { Component } from "react";
import { Form, Button, Input } from "antd";
import axios from "axios";

export class CollectionEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionName: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    const { edit, match } = this.props;

    if (edit) {
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
            collectionName: res.data.name
          })
        )
        .catch(err => {
          console.log(err);
        });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { collectionName } = this.state;
    const { match, edit } = this.params;

    const collection = {
      collectionName
    };

    const { collectionID } = match.params;
    const token = localStorage.getItem("token");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    if (edit) {
      const url = `${process.env.REACT_APP_API_URL}api/collections/${collectionID}/`;
      axios.put(url, collection).then(res => this.redirect(res));
    } else {
      const url = `${process.env.REACT_APP_API_URL}api/collections/`;
      axios.post(url, collection).then(res => this.redirect(res));
    }
  }

  onChange(event) {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value
    });
  }

  redirect(res) {
    const { history } = this.props;
    history.push(`/collections/${res.data.id}`);
  }

  render() {
    const { collectionName } = this.state;

    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.Item label="Collection Name">
            <Input
              name="collectionName"
              placeholder="Name"
              value={collectionName}
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CollectionEditForm;
