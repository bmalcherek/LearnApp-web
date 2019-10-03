import React, { Component } from "react";
import { List, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

export default class CollectionList extends Component {
  static addCollection(event) {
    const collectionId = event.target.id;
    const data = {
      collection: collectionId
    };
    const url = `${process.env.REACT_APP_API_URL}api/my-collections/`;
    axios.post(url, data);
  }

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const { myCollections } = this.props;
    const token = localStorage.getItem("token");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    if (myCollections) {
      const url = `${process.env.REACT_APP_API_URL}api/my-collections/`;
      axios
        .get(url)
        .then(res =>
          this.setState({
            data: res.data
          })
        )
        .catch(err => console.log(err));
    } else {
      const url = `${process.env.REACT_APP_API_URL}api/collections/`;
      axios.get(url).then(res =>
        this.setState({
          data: res.data
        })
      );
    }
  }

  render() {
    const { myCollections } = this.props;
    const { data } = this.state;

    let createNewCollectionButton = null;
    if (!myCollections) {
      createNewCollectionButton = (
        <Link to="collections/create-new-collection">
          <Button>Create new Collection</Button>
        </Link>
      );
    }

    return (
      <div>
        {createNewCollectionButton}
        <List
          itemLayout="horizontal"
          pagination={{
            pageSize: 10
          }}
          dataSource={data}
          renderItem={item => (
            <List.Item
              actions={[
                myCollections ? (
                  <div>
                    {item.to_learn}
                    to learn
                    <Link
                      to={`collections/${item.id}/learn`}
                      style={{ paddingLeft: "5px" }}
                    >
                      {item.to_learn > 0 ? (
                        <Button>Learn</Button>
                      ) : (
                        <Button disabled>Learn</Button>
                      )}
                    </Link>
                  </div>
                ) : (
                  <Button onClick={this.addCollection} id={item.id}>
                    Add to My Collections
                  </Button>
                )
              ]}
            >
              <List.Item.Meta
                title={
                  myCollections ? (
                    <a href={`/my-collections/${item.id}`}>{item.name}</a>
                  ) : (
                    <a href={`/collections/${item.id}`}>{item.name}</a>
                  )
                }
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

// export default CollectionList;
